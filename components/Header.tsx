
import React from 'react';
import { Language } from '../types';
import { CONTENT } from '../constants';

interface HeaderProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Optionally update the URL hash without jumping
      window.history.pushState(null, '', `#${id}`);
    }
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', '#home');
  };

  return (
    <header className="sticky top-0 z-50 bg-light-sand/80 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl relative">
        <a href="#home" onClick={scrollToTop} className="font-grotesk font-bold text-lg tracking-tight z-10">
          Comporta Design 2026
        </a>

        <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center bg-white/60 backdrop-blur-sm px-6 lg:px-8 py-2.5 rounded-full border border-soft-black/5 shadow-sm space-x-4 lg:space-x-6 whitespace-nowrap z-20">
          <a href="#home" onClick={scrollToTop} className="text-sm font-medium hover:text-soft-black/60 transition-colors cursor-pointer">
            {CONTENT.navigation.home[language]}
          </a>
          <a href="#about" onClick={(e) => handleScroll(e, 'about')} className="text-sm font-medium hover:text-soft-black/60 transition-colors cursor-pointer">
            {CONTENT.navigation.about[language]}
          </a>
          <a href="#programme" onClick={(e) => handleScroll(e, 'programme')} className="text-sm font-medium hover:text-soft-black/60 transition-colors cursor-pointer">
            {CONTENT.navigation.programme[language]}
          </a>
          <a href="#cinema" onClick={(e) => handleScroll(e, 'cinema')} className="text-sm font-medium hover:text-soft-black/60 transition-colors cursor-pointer">
            {CONTENT.navigation.cinema[language]}
          </a>
          <a href="#venue" onClick={(e) => handleScroll(e, 'venue')} className="text-sm font-medium hover:text-soft-black/60 transition-colors cursor-pointer">
            {CONTENT.navigation.location[language]}
          </a>
          <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="text-sm font-medium hover:text-soft-black/60 transition-colors cursor-pointer">
            {CONTENT.navigation.contact[language]}
          </a>
        </div>

        <nav className="flex items-center space-x-4 md:space-x-6 z-10">
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
          <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="hidden md:inline-block bg-soft-black text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-opacity-80 transition-opacity cursor-pointer">
            {CONTENT.header.schedule[language]}
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
