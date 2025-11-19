
import React from 'react';
import { Language } from '../types';
import { CONTENT } from '../constants';

interface AboutProps {
  language: Language;
}

const About: React.FC<AboutProps> = ({ language }) => {
  return (
    <section id="about" className="bg-light-sand py-20 md:py-32 scroll-mt-28">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 max-w-7xl">
        <div className="md:col-span-4">
          <h2 className="font-grotesk text-2xl md:text-3xl font-medium sticky top-24">
            {CONTENT.about.title[language]}
          </h2>
        </div>
        <div className="md:col-span-8 lg:col-span-6 lg:col-start-7 space-y-6 text-base md:text-lg leading-relaxed text-soft-black/90">
          {CONTENT.about.paragraphs.map((p, index) => {
            // Check if it is a complex paragraph with links
            if ('type' in p && p.type === 'complex') {
              return (
                <p key={index}>
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
                        className="underline hover:opacity-75 transition-opacity"
                      >
                        {item.text}
                      </a>
                    );
                  })}
                </p>
              );
            }
            // It is a simple paragraph
            return <p key={index}>{p[language]}</p>;
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
