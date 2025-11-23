import { GoogleGenAI } from "@google/genai";
import type { Message } from '../types';
import { getSystemInstruction } from './knowledgeBase';

// Get API key from Vite environment variables
const getApiKey = (): string | undefined => {
  // In Vite, environment variables are accessed via import.meta.env
  // Variables must be prefixed with VITE_ to be exposed to the client
  // We also check process.env for variables defined in vite.config.ts
  return import.meta.env.VITE_API_KEY || process.env.GEMINI_API_KEY || process.env.API_KEY;
};

const API_KEY = getApiKey();

if (!API_KEY) {
  console.warn("Gemini API key not found. Chatbot will not function.");
}

// Initialize with a check for API_KEY to avoid crashes if it's missing.
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const transformHistoryForGemini = (history: Message[]) => {
  // We remove the very first message which is the initial greeting from the bot
  // as it doesn't need to be part of the conversational history sent to the model.
  return history.slice(1).map(msg => ({
    role: msg.sender === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));
};

export const runChat = async (prompt: string, history: Message[]): Promise<string> => {
  if (!ai) {
    return "The chatbot is currently unavailable. Please try again later.";
  }

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      history: transformHistoryForGemini(history),
      config: {
        systemInstruction: getSystemInstruction(),
      }
    });

    const response = await chat.sendMessage({ message: prompt });
    return response.text || "Desculpe, não consegui gerar uma resposta.";
  } catch (error) {
    console.error("Error running chat with Gemini:", error);
    if (error instanceof Error) {
      return `Desculpe, ocorreu um erro: ${error.message}`;
    }
    return "Desculpe, não foi possível obter uma resposta. Por favor, tente novamente mais tarde.";
  }
};
