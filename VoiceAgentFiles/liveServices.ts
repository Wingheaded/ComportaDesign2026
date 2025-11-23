import { GoogleGenAI, LiveSession, LiveServerMessage, Modality } from "@google/genai";

// --- State Management ---
let activeSession: LiveSession | null = null;
let audioContext: AudioContext | null = null;
let mediaStream: MediaStream | null = null;
let audioProcessor: ScriptProcessorNode | null = null;
let audioInput: MediaStreamAudioSourceNode | null = null;

// --- Audio Playback State ---
let outputAudioContext: AudioContext | null = null;
let nextStartTime = 0;
const playbackSources = new Set<AudioBufferSourceNode>();

// --- Helper: API Key ---
const getApiKey = () => {
  try {
    if (typeof process !== 'undefined' && process && process.env) {
      return process.env.API_KEY;
    }
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      // @ts-ignore
      return import.meta.env.VITE_API_KEY || import.meta.env.API_KEY;
    }
  } catch (e) {
    console.warn("Environment variable access failed", e);
  }
  return undefined;
};

// --- Helper: Base64 Encoding/Decoding ---
function encodeBase64(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function decodeBase64(base64: string) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// --- Connection ---

export const connectToLiveAPI = async (systemInstruction: string): Promise<void> => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("API Key not found");

  const ai = new GoogleGenAI({ apiKey });

  // Reset playback state on new connection
  nextStartTime = 0;
  if (outputAudioContext) {
    try { await outputAudioContext.close(); } catch(e) {}
    outputAudioContext = null;
  }

  activeSession = await ai.live.connect({
    model: 'gemini-2.5-flash-native-audio-preview-09-2025',
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: {
            voiceName: "Kore",
          },
        },
      },
      systemInstruction: systemInstruction,
    },
    callbacks: {
      onopen: () => {
        console.log("Live API Connected");
      },
      onmessage: async (msg: LiveServerMessage) => {
        await handleServerMessage(msg);
      },
      onclose: () => {
        console.log("Live API Disconnected");
      },
      onerror: (err) => {
        console.error("Live API Error:", err);
      }
    }
  });
};

export const disconnectLiveAPI = () => {
  stopRecording();
  stopPlayback();
  if (activeSession) {
    // There isn't a direct 'close' method on the session object in some versions,
    // but stopping the client side inputs essentially ends the interaction.
    // If the SDK exposes a close method we would use it.
    // For now, we rely on dropping the reference and stopping media.
    activeSession = null;
  }
};

// --- Audio Recording (Input) ---

export const startRecording = async () => {
  if (!activeSession) return;

  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        sampleRate: 16000,
        channelCount: 1,
        echoCancellation: true
      }
    });

    audioContext = new AudioContext({ sampleRate: 16000 });
    audioInput = audioContext.createMediaStreamSource(mediaStream);
    
    // Process audio in chunks
    audioProcessor = audioContext.createScriptProcessor(4096, 1, 1);
    
    audioProcessor.onaudioprocess = (e) => {
      if (!activeSession) return;

      const inputData = e.inputBuffer.getChannelData(0);
      
      // Convert Float32 to Int16 (PCM)
      const l = inputData.length;
      const int16 = new Int16Array(l);
      for (let i = 0; i < l; i++) {
        int16[i] = inputData[i] * 32768;
      }
      
      const base64Data = encodeBase64(new Uint8Array(int16.buffer));

      activeSession.sendRealtimeInput({
        media: {
          mimeType: "audio/pcm;rate=16000",
          data: base64Data
        }
      });
    };

    audioInput.connect(audioProcessor);
    audioProcessor.connect(audioContext.destination);

  } catch (err) {
    console.error("Error starting audio recording:", err);
    throw err;
  }
};

export const stopRecording = () => {
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop());
    mediaStream = null;
  }
  if (audioProcessor && audioInput) {
    audioInput.disconnect();
    audioProcessor.disconnect();
    audioProcessor = null;
    audioInput = null;
  }
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
};

// --- Audio Playback (Output) ---

const handleServerMessage = async (message: LiveServerMessage) => {
  // Handle Interruption
  if (message.serverContent?.interrupted) {
     stopPlayback();
     return;
  }

  // Handle Audio Data
  const parts = message.serverContent?.modelTurn?.parts;
  if (parts) {
    for (const part of parts) {
      if (part.inlineData && part.inlineData.mimeType.startsWith("audio/pcm")) {
        await playAudioChunk(part.inlineData.data);
      }
    }
  }
};

const playAudioChunk = async (base64Audio: string) => {
  if (!outputAudioContext) {
    outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    nextStartTime = outputAudioContext.currentTime;
  }

  const bytes = decodeBase64(base64Audio);
  
  // Decode PCM16 to AudioBuffer
  // Data is Int16, we need to convert to Float32 for AudioBuffer
  const int16Data = new Int16Array(bytes.buffer);
  const float32Data = new Float32Array(int16Data.length);
  for (let i = 0; i < int16Data.length; i++) {
    float32Data[i] = int16Data[i] / 32768.0;
  }

  const audioBuffer = outputAudioContext.createBuffer(1, float32Data.length, 24000);
  audioBuffer.copyToChannel(float32Data, 0);

  const source = outputAudioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(outputAudioContext.destination);
  
  source.onended = () => {
    playbackSources.delete(source);
  };

  // Schedule playback
  const startTime = Math.max(outputAudioContext.currentTime, nextStartTime);
  source.start(startTime);
  
  nextStartTime = startTime + audioBuffer.duration;
  playbackSources.add(source);
};

const stopPlayback = () => {
    playbackSources.forEach(source => {
        try { source.stop(); } catch (e) {}
    });
    playbackSources.clear();
    
    if (outputAudioContext) {
        nextStartTime = outputAudioContext.currentTime;
    }
};