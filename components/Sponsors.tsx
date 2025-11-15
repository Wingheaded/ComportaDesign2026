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

const mainSponsors: Sponsor[] = [
    { name: 'Thilburg', url: 'https://www.thilburg.com/', logo: '/logos/thilburg-logo.png' },
    { name: 'Passa ao Futuro', url: 'https://www.passaaofuturo.com/', logo: '/logos/passa-ao-futuro-logo.png' },
    { name: 'Poolins', url: 'https://poolins.com/en/poolins-en/', logo: '/logos/poolins-logo.png' },
    { name: 'MorDesign', url: 'https://mordesign.com/', logo: '/logos/mordesign-logo.png' },
    { name: 'Wewood', url: 'https://www.wewood.eu/', logo: '/logos/wewood-logo.png' }
];

const partners: Sponsor[] = [
  { name: 'Fundação Herdade da Comporta', url: 'https://www.fundacaohdc.pt/', logo: '/logos/fhc-logo.png' },
  { name: 'Tróia Design Hotel', url: 'https://www.troiadesignhotel.com/pt/', logo: '/logos/tdh-logo.png' },
  { name: 'Dils', url: 'https://dils.pt/', logo: '/logos/dils-logo.png' },
  { name: 'Huître', url: 'https://huitre.pt/', logo: '/logos/huitre-logo.png' },
  { name: 'Polestar', url: 'https://www.polestar.com/pt/', logo: '/logos/polestar-logo.png' },
  { name: 'TUU', url: 'https://tuu.pt/', logo: '/logos/tuu-logo.png' },
  { name: 'CÊ Studio Comporta', url: 'https://cestudio.pt/', logo: '/logos/ce-studio-logo.png' },
  { name: 'Câmara Municipal de Alcácer do Sal', url: 'https://www.cm-alcacerdosal.pt/', logo: '/logos/cm-alcacer-do-sal-logo.png' },
  { name: 'Cinemateca', url: 'https://www.cinemateca.pt/', logo: '/logos/cinemateca-logo.png' },
  { name: 'Home-tec', url: 'https://home-tec.pt/?lang=en', logo: '/logos/home-tec-logo.png' }
];

const SponsorLogo: React.FC<{ sponsor: Sponsor }> = ({ sponsor }) => (
  <a 
    href={sponsor.url} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="h-20 flex items-center justify-center p-4 grayscale opacity-60 hover:grayscale-log-0 hover:opacity-100 transition-all duration-300"
    aria-label={`Visit ${sponsor.name} website`}
  >
    <img src={sponsor.logo} alt={`${sponsor.name} logo`} className="max-h-full max-w-full object-contain" />
  </a>
);

const Sponsors: React.FC<SponsorsProps> = ({ language }) => {
  return (
    <>
      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-sm font-medium tracking-wider text-soft-black/60 uppercase mb-10">
            {CONTENT.sponsors.main[language]}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center max-w-5xl mx-auto">
            {mainSponsors.map(sponsor => <SponsorLogo key={sponsor.name} sponsor={sponsor} />)}
          </div>
        </div>
      </section>
      <section className="bg-light-sand py-20 md:py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-sm font-medium tracking-wider text-soft-black/60 uppercase mb-10">
            {CONTENT.sponsors.partners[language]}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-4 items-center max-w-6xl mx-auto">
            {partners.map(sponsor => <SponsorLogo key={sponsor.name} sponsor={sponsor} />)}
          </div>
        </div>
      </section>
    </>
  );
};

export default Sponsors;