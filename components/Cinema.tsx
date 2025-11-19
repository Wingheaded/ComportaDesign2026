
import React from 'react';
import { Language } from '../types';
import { CONTENT } from '../constants';

interface CinemaProps {
  language: Language;
}

const Cinema: React.FC<CinemaProps> = ({ language }) => {
  return (
    <section id="cinema" className="bg-light-sand py-20 md:py-32 scroll-mt-28">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="font-grotesk text-3xl md:text-4xl font-medium">
            {CONTENT.cinema.title[language]}
          </h2>
          <p className="font-grotesk text-lg mt-2 text-soft-black/70">{CONTENT.cinema.curator[language]}</p>
          <p className="mt-4 text-lg text-soft-black/80">
            {CONTENT.cinema.intro[language]}
          </p>
          <p className="mt-4 font-medium tracking-wider text-soft-black/60 uppercase text-sm">
            {CONTENT.cinema.dates[language]}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {CONTENT.cinema.schedule.map((movie, index) => (
            <div key={index} className="group aspect-[2/3] [perspective:1000px]">
              <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-lg rounded-lg">
                
                {/* Front Face */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-lg overflow-hidden bg-soft-gray">
                  <img src={movie.image} alt={`Poster for ${movie.title}`} className="w-full h-full object-cover"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                    <p className="font-grotesk text-xs font-bold uppercase tracking-widest text-white/80">{movie.date[language]}</p>
                    <h3 className="font-grotesk text-xl font-bold leading-tight mt-1">{movie.title}</h3>
                    <div className="h-8">
                        <p className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out mt-1.5 text-white/80">{movie.director}, {movie.year}</p>
                    </div>
                  </div>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-soft-black text-white p-6 flex flex-col justify-center rounded-lg overflow-hidden">
                  <h3 className="font-grotesk text-lg font-bold leading-tight mb-1 text-white">{movie.title}</h3>
                  <p className="text-xs text-white/60 mb-4 uppercase tracking-wider">{movie.director}, {movie.year}</p>
                  <p className="text-sm leading-relaxed text-white/90 font-light overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/20">
                    {movie.summary ? movie.summary[language] : "Plot summary not available."}
                  </p>
                  <p className="mt-auto pt-4 font-grotesk text-xs font-bold uppercase tracking-widest text-white/50 text-right">{movie.date[language]}</p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cinema;
