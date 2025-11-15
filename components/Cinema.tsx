
import React from 'react';
import { Language } from '../types';
import { CONTENT } from '../constants';

interface CinemaProps {
  language: Language;
}

const Cinema: React.FC<CinemaProps> = ({ language }) => {
  return (
    <section className="bg-light-sand py-20 md:py-32">
      <div className="container mx-auto px-6">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {CONTENT.cinema.schedule.map((movie, index) => (
            <div key={index} className="group aspect-[2/3] bg-soft-gray rounded-lg flex flex-col justify-end p-5 relative overflow-hidden text-white shadow-lg">
              <img src={movie.image} alt={`Poster for ${movie.title}`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
              <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                <p className="font-grotesk text-sm font-bold uppercase tracking-widest">{movie.date[language]}</p>
                <h3 className="font-grotesk text-2xl font-bold leading-tight mt-1">{movie.title}</h3>
                <div className="h-8">
                    <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out mt-2">{movie.director}, {movie.year}</p>
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
