

import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { CONTENT, Exhibitor } from '../constants';

interface ExhibitionsProps {
  language: Language;
}

const Exhibitions: React.FC<ExhibitionsProps> = ({ language }) => {
  const [selectedExhibitor, setSelectedExhibitor] = useState<Exhibitor | null>(null);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedExhibitor) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedExhibitor]);

  return (
    <section id="programme" className="bg-white py-20 md:py-32 scroll-mt-28 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="max-w-3xl mb-12 md:mb-20">
          <h2 className="font-grotesk text-3xl md:text-4xl font-medium">
            {CONTENT.exhibitions.title[language]}
          </h2>
          <p className="mt-4 text-lg text-soft-black/80">
            {CONTENT.exhibitions.intro[language]}
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          {CONTENT.exhibitions.schedule.map((item, index) => (
            <div
              key={index}
              onClick={() => item.details && setSelectedExhibitor(item)}
              className={`group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 py-8 border-b border-soft-gray last:border-b-0 transition-all duration-300 ${item.details ? 'cursor-pointer hover:bg-white hover:shadow-lg hover:scale-[1.01] hover:z-10 hover:border-transparent rounded-xl px-4 -mx-4' : ''}`}
            >
              <div className="w-full sm:w-1/4">
                <p className="font-grotesk text-xl md:text-2xl font-medium text-soft-black group-hover:text-soft-black/70 transition-colors">
                  {item.date[language]}
                </p>
              </div>

              <div className="w-full sm:w-1/4 flex justify-start sm:justify-center">
                {item.logo && (
                  <img
                    src={item.logo}
                    alt={`${item.name} logo`}
                    className="h-32 w-auto max-w-[240px] object-contain opacity-80 mix-blend-multiply group-hover:opacity-100 transition-opacity"
                  />
                )}
              </div>

              <div className="w-full sm:w-1/2 sm:text-right flex items-center justify-end gap-4">
                <div className="flex flex-col items-end">
                  <h3 className="font-grotesk text-xl md:text-2xl font-medium tracking-tight whitespace-pre-line leading-tight">
                    {item.name}
                  </h3>
                  {item.description && (
                    <p className="text-xs md:text-sm uppercase tracking-wider text-soft-black/60 mt-2">
                      {item.description[language]}
                    </p>
                  )}
                </div>
                {item.details && (
                  <div className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-soft-black">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedExhibitor && selectedExhibitor.details && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-soft-black/40 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedExhibitor(null)}
          />

          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl flex flex-col animate-in fade-in zoom-in duration-200">

            {/* Close Button */}
            <button
              onClick={() => setSelectedExhibitor(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-white/90 rounded-full shadow-sm hover:bg-soft-gray transition-colors text-soft-black"
              aria-label={CONTENT.exhibitions.modal.close[language]}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 w-full shrink-0">
              {selectedExhibitor.details.images.map((img, idx) => (
                <div key={idx} className="relative h-64 md:h-[450px] w-full bg-soft-gray/20">
                  <img
                    src={img.url}
                    alt={selectedExhibitor.name}
                    className="w-full h-full object-cover object-bottom"
                  />
                </div>
              ))}
            </div>

            {/* Text Content */}
            <div className="p-8 md:p-12 space-y-8">
              <div className="border-b border-soft-gray pb-6">
                <p className="text-sm font-medium uppercase tracking-wider text-soft-black/60 mb-2">
                  {selectedExhibitor.date[language]}
                </p>
                <h3 className="font-grotesk text-3xl md:text-5xl font-medium text-soft-black leading-tight">
                  {selectedExhibitor.name}
                </h3>
              </div>

              <div className="space-y-6 text-lg leading-relaxed text-soft-black/90 max-w-3xl">
                {selectedExhibitor.details.description.map((p, index) => {
                  if ('type' in p && p.type === 'complex') {
                    return (
                      <p key={index}>
                        {p.content[language].map((item, itemIndex) => {
                          if (typeof item === 'string') return <span key={itemIndex}>{item}</span>;
                          return <a key={itemIndex} href={item.url} className="underline">{item.text}</a>;
                        })}
                      </p>
                    )
                  }
                  return <p key={index}>{p[language]}</p>;
                })}
              </div>

              {/* Actions Footer */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-soft-gray">
                {selectedExhibitor.details.links.website && (
                  <a
                    href={selectedExhibitor.details.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-soft-black text-white rounded-full font-medium hover:bg-opacity-90 transition-all"
                  >
                    {CONTENT.exhibitions.modal.visitWebsite[language]}
                  </a>
                )}
                {selectedExhibitor.details.links.catalogUrl && (
                  <a
                    href={selectedExhibitor.details.links.catalogUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 border border-soft-black text-soft-black rounded-full font-medium hover:bg-soft-gray transition-all"
                  >
                    {CONTENT.exhibitions.modal.downloadCatalog[language]}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Exhibitions;
