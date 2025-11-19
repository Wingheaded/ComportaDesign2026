
import React from 'react';
import { Language } from '../types';
import { CONTENT } from '../constants';

interface FooterProps {
  language: Language;
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '#home');
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <footer className="bg-light-sand py-12">
      <div className="container mx-auto px-6 text-center text-soft-black/70 max-w-7xl">
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
          <a href="#home" onClick={(e) => handleScroll(e, 'home')} className="hover:text-soft-black transition-colors">
            {CONTENT.navigation.home[language]}
          </a>
          <a href="#about" onClick={(e) => handleScroll(e, 'about')} className="hover:text-soft-black transition-colors">
            {CONTENT.navigation.about[language]}
          </a>
          <a href="#programme" onClick={(e) => handleScroll(e, 'programme')} className="hover:text-soft-black transition-colors">
            {CONTENT.navigation.programme[language]}
          </a>
          <a href="#cinema" onClick={(e) => handleScroll(e, 'cinema')} className="hover:text-soft-black transition-colors">
            {CONTENT.navigation.cinema[language]}
          </a>
          <a href="#venue" onClick={(e) => handleScroll(e, 'venue')} className="hover:text-soft-black transition-colors">
            {CONTENT.navigation.location[language]}
          </a>
          <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="hover:text-soft-black transition-colors">
            {CONTENT.navigation.contact[language]}
          </a>
        </div>
        <p className="text-xs">{CONTENT.footer.copyright[language]}</p>
      </div>
    </footer>
  );
};

export default Footer;
