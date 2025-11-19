
import React from 'react';
import { Language } from '../types';
import { CONTENT } from '../constants';

interface HeroProps {
  language: Language;
}

const Hero: React.FC<HeroProps> = ({ language }) => {
  const scrollToProgramme = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('programme');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '#programme');
    }
  };

  const scrollToVisit = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '#contact');
    }
  };

  return (
    <section id="home" className="relative bg-light-sand min-h-screen flex flex-col md:flex-row">
      {/* Left Content Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-20 pt-32 md:pt-20 order-2 md:order-1">
        <div className="max-w-xl flex flex-col items-start text-left">
            <h1 className="font-grotesk font-medium text-5xl md:text-6xl lg:text-7xl !leading-[1.1] tracking-tighter text-soft-black">
              {CONTENT.hero.title[language]}
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-soft-black/80 font-light">
              {CONTENT.hero.subtitle[language]}
            </p>
            <div className="h-px w-24 bg-soft-black/20 my-8"></div>
            <p className="text-sm font-medium tracking-widest text-soft-black/60 uppercase">
              {CONTENT.hero.date[language]}
            </p>
            <p className="mt-4 text-base md:text-lg text-soft-black/70 leading-relaxed max-w-md">
              {CONTENT.hero.description[language]}
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-start gap-4 w-full">
              <a href="#contact" onClick={scrollToVisit} className="w-full sm:w-auto bg-soft-black text-white px-8 py-3.5 rounded-full font-medium hover:bg-opacity-80 transition-all transform hover:scale-[1.02] text-center shadow-lg shadow-soft-black/10 cursor-pointer">
                {CONTENT.hero.ctaPrimary[language]}
              </a>
              <a href="#programme" onClick={scrollToProgramme} className="w-full sm:w-auto text-soft-black px-8 py-3.5 rounded-full font-medium border border-soft-black/20 hover:bg-white hover:border-soft-black/40 transition-all text-center cursor-pointer">
                {CONTENT.hero.ctaSecondary[language]}
              </a>
            </div>
        </div>
      </div>

      {/* Right Image Side */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-auto relative order-1 md:order-2">
        <div className="absolute inset-0 bg-soft-gray">
             <img 
                src="https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/comporta/HeroImage.png" 
                alt="Hero image" 
                className="w-full h-full object-cover opacity-90 grayscale-[20%] contrast-[1.05]"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-light-sand/20 to-transparent md:hidden"></div>
             <div className="absolute inset-0 bg-soft-black/5"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
