
import React from 'react';
import { Language } from '../types';
import { CONTENT } from '../constants';

interface SponsorsProps {
  language: Language;
}

interface Sponsor {
  name: string;
  url: string;
  logo: string;
}

const partners: Sponsor[] = [
  { name: 'Fundação Herdade da Comporta', url: 'https://www.fundacaohdc.pt/', logo: 'https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/logos/fhc_logo.jpg' },
  { name: 'Tróia Design Hotel', url: 'https://www.troiadesignhotel.com/pt/', logo: 'https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/logos/tdh-logo.jpg' },
  { name: 'Dils', url: 'https://dils.pt/', logo: 'https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/logos/dils-logo.jpg' },
  { name: 'Huître', url: 'https://huitre.pt/', logo: 'https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/logos/huitre-logo.jpg' },
  { name: 'Polestar', url: 'https://www.polestar.com/pt/', logo: 'https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/logos/polestar-logo.jpg' },
  { name: 'TUU', url: 'https://tuu.pt/', logo: 'https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/logos/tuu-logo.jpg' },
  { name: 'CÊ Studio Comporta', url: 'https://cestudio.pt/', logo: 'https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/logos/ce-studio-logo.jpg' },
  { name: 'Câmara Municipal de Alcácer do Sal', url: 'https://www.cm-alcacerdosal.pt/', logo: 'https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/logos/cm-alcacer-do-sal-logo.jpg' },
  { name: 'Cinemateca', url: 'https://www.cinemateca.pt/', logo: 'https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/logos/cinemateca-logo.jpg' },
  { name: 'Home-tec', url: 'https://home-tec.pt/?lang=en', logo: 'https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/logos/home-tec-logo.jpg' }
];

const SponsorLogo: React.FC<{ sponsor: Sponsor }> = ({ sponsor }) => (
  <a
    href={sponsor.url}
    target="_blank"
    rel="noopener noreferrer"
    className="h-[300px] w-[300px] flex-shrink-0 flex items-center justify-center p-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
    aria-label={`Visit ${sponsor.name} website`}
  >
    <img src={sponsor.logo} alt={`${sponsor.name} logo`} className="max-h-full max-w-full object-contain" />
  </a>
);

const Sponsors: React.FC<SponsorsProps> = ({ language }) => {
  return (
    <section className="bg-light-sand py-20 md:py-24">
      <div className="container mx-auto px-6 text-center max-w-7xl">
        <h2 className="text-sm font-medium tracking-wider text-soft-black/60 uppercase mb-10">
          {CONTENT.sponsors.partners[language]}
        </h2>
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
            {/* First set of logos */}
            <div className="flex items-center gap-16 mx-8">
              {partners.map((sponsor, index) => (
                <SponsorLogo key={`a-${index}`} sponsor={sponsor} />
              ))}
            </div>
            {/* Duplicate set for seamless scrolling */}
            <div className="flex items-center gap-16 mx-8">
              {partners.map((sponsor, index) => (
                <SponsorLogo key={`b-${index}`} sponsor={sponsor} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
