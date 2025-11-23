
export enum Language {
  PT = 'PT',
  EN = 'EN',
}

export type Message = {
  sender: 'user' | 'bot';
  text: string;
};

// Live API Types
export type LiveConfig = {
  model: string;
  generationConfig: {
    responseModalities: "audio"[];
    speechConfig: {
      voiceConfig: {
        prebuiltVoiceConfig: {
          voiceName: string;
        };
      };
    };
  };
  systemInstruction?: {
    parts: { text: string }[];
  };
};

export type RealtimeInputMessage = {
  realtimeInput: {
    mediaChunks: {
      mimeType: string;
      data: string;
    }[];
  };
};

export type ClientContentMessage = {
  clientContent: {
    turns: {
      role: string;
      parts: { text: string }[];
    }[];
    turnComplete: boolean;
  };
};

export type LiveClientMessage = RealtimeInputMessage | ClientContentMessage;

export type LiveServerMessage = {
  serverContent?: {
    modelTurn?: {
      parts?: {
        inlineData?: {
          mimeType: string;
          data: string;
        };
      }[];
    };
    turnComplete?: boolean;
    interrupted?: boolean;
  };
};
