import { CONTENT } from '../constants';

const GOOGLE_TTS_API_URL = 'https://texttospeech.googleapis.com/v1/text:synthesize';

export class GoogleTTSService {
    private apiKey: string;
    private currentAudio: HTMLAudioElement | null = null;
    private englishTerms: string[] = [];

    constructor() {
        // We use a specific environment variable for the Google Cloud API Key
        this.apiKey = import.meta.env.VITE_GOOGLE_CLOUD_API_KEY || '';

        if (!this.apiKey) {
            console.warn('Google Cloud API Key is missing. TTS will not work.');
        }

        this.initializeEnglishTerms();
    }

    private initializeEnglishTerms() {
        // Extract exhibitor names
        const exhibitorNames = CONTENT.exhibitions.schedule.map(ex => ex.name);

        // Extract movie titles
        const movieTitles = CONTENT.cinema.schedule.map(movie => movie.title);

        // Add other known English terms
        const otherTerms = [
            "Comporta Design",
            "Lisbon Design Week",
            "Home-tec",
            "Polestar",
            "Huître",
            "Dils",
            "Poolins",
            "WeWood",
            "Vondom",
            "Thilburg",
            "Mordesign"
        ];

        // Combine and deduplicate, filter out short words that might cause false positives
        this.englishTerms = Array.from(new Set([
            ...exhibitorNames,
            ...movieTitles,
            ...otherTerms
        ])).filter(term => term.length > 2);
    }

    private preprocessText(text: string): string {
        let processed = text;

        // Remove markdown formatting
        processed = processed.replace(/\*\*/g, ''); // Remove bold markers (**)
        // Clean up extra spaces
        processed = processed.replace(/\s+/g, ' ').trim();

        // Wrap English terms in SSML <lang> tags
        // We use a regex to find these terms (case insensitive) and wrap them
        // We sort by length descending to match longer phrases first (e.g. "The Fountainhead" before "The")
        const sortedTerms = [...this.englishTerms].sort((a, b) => b.length - a.length);

        // Escape special regex characters in terms
        const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        sortedTerms.forEach(term => {
            const regex = new RegExp(`\\b${escapeRegExp(term)}\\b`, 'gi');
            // Only replace if not already inside a tag (simple heuristic)
            processed = processed.replace(regex, (match) => `<lang xml:lang="en-US">${match}</lang>`);
        });

        // Wrap the whole text in <speak> to enable SSML
        return `<speak>${processed}</speak>`;
    }

    public async speak(text: string): Promise<void> {
        if (!this.apiKey) {
            console.error('Cannot speak: Google Cloud API Key is missing');
            return;
        }

        const ssmlText = this.preprocessText(text);

        try {
            const response = await fetch(`${GOOGLE_TTS_API_URL}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    input: { ssml: ssmlText }, // Changed from 'text' to 'ssml'
                    voice: {
                        languageCode: 'pt-PT',
                        name: 'pt-PT-Wavenet-A', // Female, WaveNet (High Quality)
                        ssmlGender: 'FEMALE'
                    },
                    audioConfig: {
                        audioEncoding: 'MP3',
                        speakingRate: 0.85, // Even slower for deeper ASMR effect
                        pitch: -4.0,       // Lower pitch for more calming/whisper-like effect
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Google TTS API Error: ${errorData.error?.message || response.statusText}`);
            }

            const data = await response.json();
            if (data.audioContent) {
                await this.playAudio(data.audioContent);
            }
        } catch (error) {
            console.error('Error synthesizing speech:', error);
            throw error;
        }
    }

    private async playAudio(base64Audio: string): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                // Stop any currently playing audio
                this.stop();

                const binaryString = window.atob(base64Audio);
                const len = binaryString.length;
                const bytes = new Uint8Array(len);
                for (let i = 0; i < len; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }

                const blob = new Blob([bytes.buffer], { type: 'audio/mp3' });
                const url = URL.createObjectURL(blob);
                this.currentAudio = new Audio(url);

                this.currentAudio.onended = () => {
                    this.currentAudio = null;
                    URL.revokeObjectURL(url); // Clean up
                    resolve();
                };

                this.currentAudio.onerror = (e) => {
                    console.error('Audio playback error:', e);
                    this.currentAudio = null;
                    URL.revokeObjectURL(url); // Clean up
                    reject(e);
                };

                this.currentAudio.play().catch(reject);
            } catch (e) {
                reject(e);
            }
        });
    }

    public stop(): void {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.currentAudio = null;
        }
    }
}
