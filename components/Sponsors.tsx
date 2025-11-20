
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
    className="h-[250px] w-full flex items-center justify-center p-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-4 items-center max-w-7xl mx-auto">
          {partners.map(sponsor => <SponsorLogo key={sponsor.name} sponsor={sponsor} />)}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
