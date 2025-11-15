import { GoogleGenAI } from "@google/genai";
import type { Message } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real production app, you might want to disable the chat feature
  // or show a message to the user if the key is not available.
  // For this example, we throw an error during development.
  console.error("Gemini API key not found. Chatbot will not function.");
}

// Initialize with a check for API_KEY to avoid crashes if it's missing.
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const transformHistoryForGemini = (history: Message[]) => {
  // We remove the very first message which is the initial greeting from the bot
  // as it doesn't need to be part of the conversational history sent to the model.
  return history.slice(1).map(msg => ({
    // FIX: The user role for the Gemini API should be 'user', not 'user's'.
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
        systemInstruction: `You are a helpful assistant for the Comporta Design 2026 event. Your knowledge base is: The event is named 'Comporta Design 2026' and takes place in April-May 2026 at Casa da Cultura da Comporta. Its motto is 'Where authenticity meets the future.' The event includes exhibitions and author cinema curated by Francisco Ferreira. Main sponsors are Thilburg, Passa ao Futuro, Poolins, MorDesign, and Wewood. Other partners include Fundação Herdade da Comporta, Tróia Design Hotel, Dils, Huître, Polestar, TUU, CÊ Studio Comporta, Câmara Municipal de Alcácer do Sal, Cinemateca, and Home-tec. The event is organized by CÊ Studio Comporta. When asked a question, use this information to answer. Keep answers concise and friendly. If a question is outside this scope, politely state that you only have information about the Comporta Design 2026 event.`,
      }
    });

    const response = await chat.sendMessage({ message: prompt });
    return response.text;
  } catch (error) {
    console.error("Error running chat with Gemini:", error);
    if (error instanceof Error) {
        return `I'm sorry, I encountered an error: ${error.message}`;
    }
    return "I'm sorry, I was unable to get a response. Please try again later.";
  }
};