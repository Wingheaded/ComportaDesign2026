
import React from 'react';
import { Language } from '../types';
import { CONTENT } from '../constants';

interface ExhibitionsProps {
  language: Language;
}

const Exhibitions: React.FC<ExhibitionsProps> = ({ language }) => {
  return (
    <section id="programme" className="bg-white py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-12 md:mb-20">
          <h2 className="font-grotesk text-3xl md:text-4xl font-medium">
            {CONTENT.exhibitions.title[language]}
          </h2>
          <p className="mt-4 text-lg text-soft-black/80">
            {CONTENT.exhibitions.intro[language]}
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          {CONTENT.exhibitions.schedule.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 py-8 border-b border-soft-gray last:border-b-0">
              <div className="w-full sm:w-1/3">
                <p className="font-grotesk text-xl md:text-2xl font-medium text-soft-black">
                  {item.date[language]}
                </p>
              </div>
              <div className="w-full sm:w-2/3 sm:text-right">
                <h3 className="font-grotesk text-xl md:text-2xl font-medium tracking-tight whitespace-pre-line leading-tight">
                  {item.name}
                </h3>
                {item.description && (
                  <p className="text-xs md:text-sm uppercase tracking-wider text-soft-black/60 mt-2">
                    {item.description[language]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Exhibitions;
