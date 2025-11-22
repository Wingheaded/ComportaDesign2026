
import { Language } from '../types';

// Browser compatibility check
export const isVoiceSupported = (): boolean => {
    return (
        'SpeechRecognition' in window ||
        'webkitSpeechRecognition' in window
    ) && 'speechSynthesis' in window;
};

// Get SpeechRecognition constructor (with webkit prefix fallback)
const getSpeechRecognition = (): any => {
    if ('SpeechRecognition' in window) {
        return window.SpeechRecognition;
    }
    if ('webkitSpeechRecognition' in window) {
        return (window as any).webkitSpeechRecognition;
    }
    return null;
};

export interface VoiceRecognitionCallbacks {
    onResult: (transcript: string, isFinal: boolean) => void;
    onError: (error: string) => void;
    onEnd: () => void;
}

export class VoiceRecognitionService {
    private recognition: any = null;
    private isListening = false;

    constructor(private language: Language) {
        const SpeechRecognitionConstructor = getSpeechRecognition();
        if (SpeechRecognitionConstructor) {
            this.recognition = new SpeechRecognitionConstructor();
            this.setupRecognition();
        }
    }

    private setupRecognition() {
        if (!this.recognition) return;

        // Configure recognition for Portuguese only
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.maxAlternatives = 1;
        // Always use Portuguese for voice input
        this.recognition.lang = 'pt-PT';
    }

    public updateLanguage(language: Language) {
        if (!this.recognition) return;
        // Always use Portuguese
        this.recognition.lang = 'pt-PT';
    }

    public start(callbacks: VoiceRecognitionCallbacks): boolean {
        if (!this.recognition || this.isListening) {
            return false;
        }

        // Set up event handlers
        this.recognition.onresult = (event) => {
            const result = event.results[event.results.length - 1];
            const transcript = result[0].transcript;
            const isFinal = result.isFinal;
            callbacks.onResult(transcript, isFinal);
        };

        this.recognition.onerror = (event) => {
            let errorMessage = 'Speech recognition error';

            switch (event.error) {
                case 'no-speech':
                    errorMessage = 'No speech detected';
                    break;
                case 'audio-capture':
                    errorMessage = 'No microphone found';
                    break;
                case 'not-allowed':
                    errorMessage = 'Microphone permission denied';
                    break;
                case 'network':
                    errorMessage = 'Network error';
                    break;
                default:
                    errorMessage = `Error: ${event.error}`;
            }

            callbacks.onError(errorMessage);
            this.isListening = false;
        };

        this.recognition.onend = () => {
            this.isListening = false;
            callbacks.onEnd();
        };

        // Start recognition
        try {
            this.recognition.start();
            this.isListening = true;
            return true;
        } catch (error) {
            callbacks.onError('Failed to start speech recognition');
            return false;
        }
    }

    public stop() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
            this.isListening = false;
        }
    }

    public isActive(): boolean {
        return this.isListening;
    }
}

export class VoiceSynthesisService {
    private synth: SpeechSynthesis;
    private currentUtterance: SpeechSynthesisUtterance | null = null;

    constructor() {
        this.synth = window.speechSynthesis;
    }

    private getPortugueseVoice(): SpeechSynthesisVoice | null {
        const voices = this.synth.getVoices();

        // Priority order for European Portuguese voice selection
        const voicePriorities = [
            // European Portuguese (highest priority)
            { lang: 'pt-PT', keywords: ['Google', 'portugal', 'português de portugal'] },
            { lang: 'pt-PT', keywords: ['Microsoft', 'Helia'] },
            { lang: 'pt-PT', keywords: ['enhanced', 'premium', 'natural'] },
            { lang: 'pt-PT', keywords: [] }, // Any pt-PT voice

            // Brazilian Portuguese (fallback)
            { lang: 'pt-BR', keywords: ['Google'] },
            { lang: 'pt-BR', keywords: ['Microsoft'] },
            { lang: 'pt-BR', keywords: [] }, // Any pt-BR voice

            // Generic Portuguese (last resort)
            { lang: 'pt', keywords: [] },
        ];

        // Try to find the best voice based on priority
        for (const priority of voicePriorities) {
            const voice = voices.find(v => {
                const matchesLang = priority.lang
                    ? v.lang.startsWith(priority.lang)
                    : v.lang.startsWith('pt');

                if (!matchesLang) return false;

                if (priority.keywords.length === 0) return true;

                return priority.keywords.some(keyword =>
                    v.name.toLowerCase().includes(keyword.toLowerCase()) ||
                    v.voiceURI.toLowerCase().includes(keyword.toLowerCase())
                );
            });

            if (voice) {
                console.log(`Selected Portuguese voice: ${voice.name} (${voice.lang})`);
                return voice;
            }
        }

        console.warn('No Portuguese voice found, using default');
        return null;
    }

    private preprocessTextForSpeech(text: string): string {
        let processed = text;

        // Remove markdown formatting
        processed = processed.replace(/\*\*/g, ''); // Remove bold markers (**)
        processed = processed.replace(/\*/g, '');   // Remove italic/bullet markers (*)
        processed = processed.replace(/#{1,6}\s/g, ''); // Remove heading markers (# ## ###)
        processed = processed.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1'); // Remove links, keep text
        processed = processed.replace(/`([^`]+)`/g, '$1'); // Remove code markers

        // Improve number pronunciation
        // Replace years like "2026" with "dois mil e vinte e seis" for better pronunciation
        processed = processed.replace(/\b2026\b/g, 'dois mil e vinte e seis');
        processed = processed.replace(/\b2025\b/g, 'dois mil e vinte e cinco');
        processed = processed.replace(/\b2024\b/g, 'dois mil e vinte e quatro');

        // Clean up extra spaces
        processed = processed.replace(/\s+/g, ' ').trim();

        return processed;
    }

    public speak(text: string, language: Language, onEnd?: () => void): boolean {
        // Cancel any ongoing speech
        this.stop();

        try {
            // Preprocess text to remove markdown and improve pronunciation
            const cleanText = this.preprocessTextForSpeech(text);

            const utterance = new SpeechSynthesisUtterance(cleanText);

            // Always use Portuguese voice
            const voice = this.getPortugueseVoice();
            if (voice) {
                utterance.voice = voice;
            }

            // Set language to European Portuguese
            utterance.lang = 'pt-PT';

            // Configure speech parameters for European Portuguese
            utterance.rate = 1.0;    // Normal speed
            utterance.pitch = 1.0;   // Normal pitch
            utterance.volume = 1.0;  // Full volume

            // Set up event handlers
            if (onEnd) {
                utterance.onend = onEnd;
            }

            utterance.onerror = (event) => {
                console.error('Speech synthesis error:', event);
                if (onEnd) onEnd();
            };

            this.currentUtterance = utterance;
            this.synth.speak(utterance);
            return true;
        } catch (error) {
            console.error('Failed to start speech synthesis:', error);
            return false;
        }
    }

    public stop() {
        if (this.synth.speaking) {
            this.synth.cancel();
        }
        this.currentUtterance = null;
    }

    public isSpeaking(): boolean {
        return this.synth.speaking;
    }

    // Load voices (some browsers need this to be called)
    public loadVoices(): Promise<void> {
        return new Promise((resolve) => {
            const voices = this.synth.getVoices();
            if (voices.length > 0) {
                resolve();
            } else {
                this.synth.onvoiceschanged = () => {
                    resolve();
                };
            }
        });
    }
}
