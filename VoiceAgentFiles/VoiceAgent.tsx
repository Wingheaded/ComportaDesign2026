
import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { connectToLiveAPI, disconnectLiveAPI, startRecording, stopRecording } from '../services/liveService';

interface VoiceAgentProps {
  language: Language;
}

const VoiceAgent: React.FC<VoiceAgentProps> = ({ language }) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSystemInstruction = (lang: Language) => {
    const base = "You are a helpful, friendly voice assistant for the 'Comporta Design 2026' event. Keep your answers concise and natural for speech (short sentences). The event is in April-May 2026 at Casa da Cultura da Comporta. Motto: 'Where authenticity meets the future'.";
    if (lang === Language.PT) {
        return base + " You MUST speak in European Portuguese.";
    }
    return base + " You MUST speak in English.";
  };

  const toggleVoice = async () => {
    setError(null);
    if (isActive) {
      // Stop everything
      setIsActive(false);
      stopRecording();
      disconnectLiveAPI();
    } else {
      // Start
      setIsConnecting(true);
      try {
        await connectToLiveAPI(getSystemInstruction(language));
        await startRecording();
        setIsActive(true);
      } catch (err) {
        console.error(err);
        setError("Failed to connect. Microphone access needed.");
        disconnectLiveAPI();
      } finally {
        setIsConnecting(false);
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnectLiveAPI();
    };
  }, []);

  return (
    <div className="fixed bottom-24 right-4 sm:right-6 z-40 flex flex-col items-end gap-2">
      {error && (
        <div className="bg-red-100 text-red-800 text-xs px-3 py-2 rounded-lg shadow-md mb-2 max-w-[200px]">
          {error}
        </div>
      )}
      
      {isActive && (
         <div className="bg-white px-4 py-2 rounded-full shadow-lg border border-soft-gray flex items-center gap-3 mb-2 animate-in slide-in-from-bottom-4 fade-in duration-300">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-sm font-medium text-soft-black">
                {language === Language.PT ? "A ouvir..." : "Listening..."}
            </span>
         </div>
      )}

      <button
        onClick={toggleVoice}
        disabled={isConnecting}
        className={`
            p-4 rounded-full shadow-xl transition-all transform hover:scale-105 flex items-center justify-center
            ${isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-soft-black hover:bg-soft-black/90'}
            ${isConnecting ? 'opacity-70 cursor-wait' : ''}
        `}
        aria-label={isActive ? "Stop Voice Chat" : "Start Voice Chat"}
      >
        {isConnecting ? (
             <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        ) : isActive ? (
            // Stop/Mic Off Icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                 <path fillRule="evenodd" d="M3.59 2.59a1 1 0 010 1.41l2.77 2.77A6.963 6.963 0 005.5 9.5c0 3.32 2.52 6.04 5.75 6.44V20H9.5a1 1 0 100 2h5a1 1 0 100-2h-1.75v-4.06c1.3-.16 2.52-.6 3.57-1.23l3.09 3.09a1 1 0 11-1.41 1.41l-14.41-14.41a1 1 0 011.41 0zM12 14c-1.61 0-3.03-.86-3.86-2.13l4.44 4.44c-.19.05-.39.09-.6.12V14zM9.17 5.17l2.12 2.12c.04-.1.08-.21.12-.31a4 4 0 115.65 5.66l1.45 1.45A5.996 5.996 0 008.83 6.83l.34-1.66z" clipRule="evenodd" />
            </svg>
        ) : (
            // Mic Icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
                <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
            </svg>
        )}
      </button>
    </div>
  );
};

export default VoiceAgent;
