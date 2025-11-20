
import React from 'react';
import { Language } from '../types';
import { CONTENT } from '../constants';

interface VenueProps {
  language: Language;
}

const Venue: React.FC<VenueProps> = ({ language }) => {
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('venue');
      if (element) {
        const rect = element.getBoundingClientRect();
        // Only update if the element is somewhat visible to avoid unnecessary renders
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setOffset(window.scrollY - element.offsetTop);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="venue" className="bg-white py-20 md:py-32 scroll-mt-28">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
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
              className="inline-flex items-center gap-2 font-medium text-soft-black underline hover:opacity-75 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{CONTENT.venue.address[language]}</span>
            </a>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[50vh] min-h-[400px]">
            <img
              src="https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/comporta/casa-exterior.jpg"
              alt="Exterior of the Casa da Cultura da Comporta, a white building with a green door and blue trim."
              className="col-span-2 w-full h-full object-cover rounded-lg shadow-md transition-transform duration-100 ease-out will-change-transform"
              style={{ transform: `translateY(${offset * 0.1}px)` }}
            />
            <img
              src="https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/comporta/casa-interior.jpeg"
              alt="Wide-angle view of the empty, spacious interior of the Casa da Cultura, with concrete floors and a high wooden-beamed ceiling."
              className="w-full h-full object-cover rounded-lg shadow-md transition-transform duration-100 ease-out will-change-transform"
              style={{ transform: `translateY(${offset * -0.05}px)` }}
            />
            <img
              src="https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/comporta/casa-seating.jpeg"
              alt="View from behind rows of wooden chairs looking towards the empty stage area inside the Casa da Cultura."
              className="w-full h-full object-cover rounded-lg shadow-md transition-transform duration-100 ease-out will-change-transform"
              style={{ transform: `translateY(${offset * 0.08}px)` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Venue;
