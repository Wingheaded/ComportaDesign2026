
import React from 'react';
import { Language } from '../types';
import { CONTENT } from '../constants';

interface FooterProps {
  language: Language;
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  return (
    <footer className="bg-light-sand py-12">
      <div className="container mx-auto px-6 text-center text-soft-black/70">
        <div className="flex justify-center space-x-6 mb-8 text-sm">
          <a href="#" className="hover:text-soft-black transition-colors">{CONTENT.footer.programme[language]}</a>
          <a href="#" className="hover:text-soft-black transition-colors">{CONTENT.footer.cinema[language]}</a>
          <a href="#" className="hover:text-soft-black transition-colors">{CONTENT.footer.location[language]}</a>
          <a href="#" className="hover:text-soft-black transition-colors">{CONTENT.footer.contact[language]}</a>
        </div>
        <p className="text-xs">{CONTENT.footer.copyright[language]}</p>
      </div>
    </footer>
  );
};

export default Footer;
