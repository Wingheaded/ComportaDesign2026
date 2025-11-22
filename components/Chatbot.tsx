
import React, { useState, useRef, useEffect } from 'react';
import { Language, Message } from '../types';
import { CONTENT } from '../constants';
import { runChat } from '../services/geminiService';
import { VoiceRecognitionService, isVoiceSupported } from '../services/voiceService';
import { GoogleTTSService } from '../services/googleTTSService';

interface ChatbotProps {
  language: Language;
  isChatOpen: boolean;
  setIsChatOpen: (isOpen: boolean) => void;
}

const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const MicrophoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
  </svg>
);

const Chatbot: React.FC<ChatbotProps> = ({ language, isChatOpen, setIsChatOpen }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const voiceRecognitionRef = useRef<VoiceRecognitionService | null>(null);
  const googleTTSRef = useRef<GoogleTTSService | null>(null);

  // Initialize voice services
  useEffect(() => {
    const supported = isVoiceSupported();
    setVoiceSupported(supported);

    if (supported) {
      voiceRecognitionRef.current = new VoiceRecognitionService(language);
    }

    // Always initialize Google TTS as it uses Audio API which is widely supported
    googleTTSRef.current = new GoogleTTSService();

    return () => {
      if (googleTTSRef.current) {
        googleTTSRef.current.stop();
      }
    };
  }, []);

  // Update language when it changes
  useEffect(() => {
    if (voiceRecognitionRef.current) {
      voiceRecognitionRef.current.updateLanguage(language);
    }
  }, [language]);

  useEffect(() => {
    setMessages([{ sender: 'bot', text: CONTENT.chat.initialMessage[language] }]);
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e?: React.FormEvent, messageText?: string) => {
    if (e) e.preventDefault();

    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: textToSend };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setInterimTranscript('');
    setIsLoading(true);

    // Stop any current speech when sending new message
    if (googleTTSRef.current) {
      googleTTSRef.current.stop();
      setIsSpeaking(false);
    }

    try {
      const botResponseText = await runChat(textToSend, newMessages);
      const botMessage: Message = { sender: 'bot', text: botResponseText };
      setMessages(prev => [...prev, botMessage]);

      // Speak the response using Google TTS
      if (googleTTSRef.current && !isSpeaking) {
        setIsSpeaking(true);
        googleTTSRef.current.speak(botResponseText)
          .then(() => {
            setIsSpeaking(false);
          })
          .catch(err => {
            console.error("TTS Error:", err);
            setIsSpeaking(false);
          });
      }
    } catch (error) {
      console.error("Failed to get response from bot:", error);
      const errorMessage: Message = { sender: 'bot', text: "Sorry, I'm having trouble connecting right now." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (!voiceRecognitionRef.current || isLoading) return;

    // Stop speaking if listening starts
    if (googleTTSRef.current) {
      googleTTSRef.current.stop();
      setIsSpeaking(false);
    }

    if (isListening) {
      // Stop listening
      voiceRecognitionRef.current.stop();
      setIsListening(false);
      setInterimTranscript('');
    } else {
      // Start listening
      const success = voiceRecognitionRef.current.start({
        onResult: (transcript, isFinal) => {
          if (isFinal) {
            // Final result - send the message
            setInterimTranscript('');
            handleSendMessage(undefined, transcript);
          } else {
            // Interim result - show in input
            setInterimTranscript(transcript);
          }
        },
        onError: (error) => {
          console.error('Voice recognition error:', error);
          setIsListening(false);
          setInterimTranscript('');

          // Show error message
          const errorMsg = CONTENT.chat.voiceError[language];
          setMessages(prev => [...prev, { sender: 'bot', text: errorMsg }]);
        },
        onEnd: () => {
          setIsListening(false);
          setInterimTranscript('');
        }
      });

      if (success) {
        setIsListening(true);
      } else {
        const errorMsg = CONTENT.chat.microphoneError[language];
        setMessages(prev => [...prev, { sender: 'bot', text: errorMsg }]);
      }
    }
  };

  const toggleSpeaking = () => {
    if (googleTTSRef.current) {
      if (isSpeaking) {
        googleTTSRef.current.stop();
        setIsSpeaking(false);
      }
    }
  };

  return (
    <>
      <div className={`fixed bottom-0 right-0 p-4 sm:p-6 z-50 transition-all duration-300 ${isChatOpen ? 'opacity-0 scale-90 invisible' : 'opacity-100 scale-100 visible'}`}>
        <button
          onClick={() => setIsChatOpen(true)}
          className="bg-soft-black text-white p-4 rounded-full shadow-lg hover:bg-opacity-80 transition-transform transform hover:scale-105"
          aria-label="Open chat"
        >
          <ChatIcon />
        </button>
      </div>

      <div className={`fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full h-full sm:w-[380px] sm:h-[calc(100vh-6rem)] sm:max-h-[600px] bg-white rounded-none sm:rounded-xl shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right z-50 ${isChatOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
        <div className="flex justify-between items-center p-4 border-b border-soft-gray">
          <h3 className="font-grotesk font-bold text-lg">Comporta Assistant</h3>
          <button onClick={() => setIsChatOpen(false)} className="text-soft-black/60 hover:text-soft-black">
            <CloseIcon />
          </button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-soft-black text-white rounded-br-lg' : 'bg-soft-gray text-soft-black rounded-bl-lg'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-2xl bg-soft-gray text-soft-black rounded-bl-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-medium-gray rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-medium-gray rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-medium-gray rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t border-soft-gray">
          {/* Voice status indicator */}
          {(isListening || isSpeaking) && (
            <div className="mb-2 text-xs text-center">
              {isListening && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></span>
                  {CONTENT.chat.listening[language]}
                </span>
              )}
              {isSpeaking && (
                <button
                  onClick={toggleSpeaking}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-2"></span>
                  {CONTENT.chat.speaking[language]}
                </button>
              )}
            </div>
          )}

          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={interimTranscript || input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={CONTENT.chat.placeholder[language]}
              className="flex-1 px-4 py-2 border border-medium-gray rounded-full focus:outline-none focus:ring-2 focus:ring-soft-black/50"
              disabled={isLoading || isListening}
            />

            {/* Voice input button */}
            {voiceSupported && (
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`p-2 rounded-full transition-colors ${isListening
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-soft-gray text-soft-black hover:bg-medium-gray'
                  }`}
                disabled={isLoading}
                aria-label={CONTENT.chat.voiceButton[language]}
                title={CONTENT.chat.voiceButton[language]}
              >
                <MicrophoneIcon />
              </button>
            )}

            <button type="submit" className="bg-soft-black text-white px-4 rounded-full disabled:bg-opacity-50" disabled={isLoading || (!input.trim() && !interimTranscript)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
