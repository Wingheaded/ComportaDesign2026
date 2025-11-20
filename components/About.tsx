
import React from 'react';
import { Language } from '../types';
import { CONTENT } from '../constants';

interface AboutProps {
  language: Language;
}

const About: React.FC<AboutProps> = ({ language }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="bg-light-sand py-20 md:py-32 scroll-mt-28 relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className={`absolute top-0 right-0 w-1/3 h-full pointer-events-none transition-opacity duration-1000 ${isVisible ? 'opacity-10' : 'opacity-0'}`}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-soft-black">
          <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,70.6,32.2C59,42.9,47.1,51.4,34.8,58.6C22.5,65.8,9.8,71.7,-2.3,75.7C-14.4,79.7,-25.9,81.8,-36.6,76.2C-47.3,70.6,-57.2,57.3,-65.3,43.7C-73.4,30.1,-79.7,16.2,-80.1,2.1C-80.5,-12,-75,-26.3,-65.9,-38.3C-56.8,-50.3,-44.1,-60,-30.6,-67.6C-17.1,-75.2,-2.8,-80.7,10.4,-78.9C23.6,-77.1,30.5,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 max-w-7xl relative z-10">
        <div className="md:col-span-4 relative">
          <div className={`sticky top-24 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex gap-4">
              <div className={`w-1 bg-soft-black/20 transition-all duration-1000 delay-500 ${isVisible ? 'h-24' : 'h-0'}`}></div>
              <h2 className="font-grotesk text-2xl md:text-3xl font-medium pt-2">
                {CONTENT.about.title[language]}
              </h2>
            </div>
          </div>
        </div>
        <div className="md:col-span-8 lg:col-span-6 lg:col-start-7 space-y-8 text-base md:text-lg leading-relaxed text-soft-black/90">
          {CONTENT.about.paragraphs.map((p, index) => {
            const isFirst = index === 0;
            const delay = 500 + (index * 100);

            // Check if it is a complex paragraph with links
            if ('type' in p && p.type === 'complex') {
              return (
                <p
                  key={index}
                  className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${delay}ms` }}
                >
                  {p.content[language].map((item, itemIndex) => {
                    if (typeof item === 'string') {
                      return <span key={itemIndex}>{item}</span>;
                    }
                    return (
                      <a
                        href={item.url}
                        key={itemIndex}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:opacity-75 transition-opacity decoration-soft-black/30 underline-offset-4"
                      >
                        {item.text}
                      </a>
                    );
                  })}
                </p>
              );
            }
            // It is a simple paragraph
            return (
              <p
                key={index}
                className={`${isFirst ? 'text-xl md:text-2xl font-light text-soft-black leading-normal' : ''} transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                {p[language]}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
