
import React from 'react';
import { Language } from '../types';
import { CONTENT } from '../constants';

interface HeroProps {
  language: Language;
}

const Hero: React.FC<HeroProps> = ({ language }) => {
  return (
    <section className="bg-white min-h-[calc(100vh-80px)] flex items-center">
      <div className="container mx-auto px-6 text-center flex flex-col items-center py-20">
        <h1 className="font-grotesk font-medium text-4xl md:text-6xl lg:text-7xl !leading-tight max-w-4xl tracking-tighter">
          {CONTENT.hero.title[language]}
        </h1>
        <p className="mt-4 text-lg md:text-xl text-soft-black/80">
          {CONTENT.hero.subtitle[language]}
        </p>
        <p className="mt-2 text-sm md:text-base font-medium tracking-wider text-soft-black/60 uppercase">
          {CONTENT.hero.date[language]}
        </p>
         <p className="mt-6 text-base md:text-lg max-w-2xl">
          {CONTENT.hero.description[language]}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a href="#" className="w-full sm:w-auto bg-soft-black text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-80 transition-opacity">
            {CONTENT.hero.ctaPrimary[language]}
          </a>
          <a href="#programme" className="w-full sm:w-auto text-soft-black px-8 py-3 rounded-full font-medium border border-soft-black/20 hover:bg-soft-gray transition-colors">
            {CONTENT.hero.ctaSecondary[language]}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
