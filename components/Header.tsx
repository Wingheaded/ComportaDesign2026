
import React from 'react';
import { Language } from '../types';
import { CONTENT } from '../constants';

interface HeaderProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
  return (
    <header className="sticky top-0 z-50 bg-light-sand/80 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="font-grotesk font-bold text-lg tracking-tight">
          Comporta Design 2026
        </a>
        <nav className="flex items-center space-x-4 md:space-x-6">
          <div className="flex items-center border border-soft-black/20 rounded-full text-sm">
            <button
              onClick={() => setLanguage(Language.PT)}
              className={`px-3 py-1 rounded-full transition-colors duration-300 ${language === Language.PT ? 'bg-soft-black text-white' : 'hover:bg-soft-gray'}`}
            >
              PT
            </button>
            <button
              onClick={() => setLanguage(Language.EN)}
              className={`px-3 py-1 rounded-full transition-colors duration-300 ${language === Language.EN ? 'bg-soft-black text-white' : 'hover:bg-soft-gray'}`}
            >
              EN
            </button>
          </div>
          <a href="#" className="hidden md:inline-block bg-soft-black text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-opacity-80 transition-opacity">
            {CONTENT.header.schedule[language]}
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
