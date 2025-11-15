import React from 'react';
import { Language } from '../types';
import { CONTENT } from '../constants';

interface VenueProps {
  language: Language;
}

const Venue: React.FC<VenueProps> = ({ language }) => {
  return (
    <section className="bg-white py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-grotesk text-3xl md:text-4xl font-medium mb-6">
              {CONTENT.venue.title[language]}
            </h2>
            <p className="text-lg text-soft-black/80 mb-6 leading-relaxed">
              {CONTENT.venue.description[language]}
            </p>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Casa+da+Cultura+da+Comporta" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-soft-black underline hover:opacity-75 transition-opacity"
            >
              {CONTENT.venue.address[language]}
            </a>
          </div>
          <div className="image-grid">
            <img
              src="https://images.unsplash.com/photo-1617103998813-e617e44837a9?q=80&w=1200&auto=format&fit=crop"
              alt="Exterior of a modern, white building representing Casa da Cultura da Comporta"
            />
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop"
              alt="Minimalist interior view of a room with a designer chair"
            />
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop"
              alt="Elegant interior seating area with modern furniture"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Venue;