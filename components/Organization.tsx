
import React from 'react';
import { Language } from '../types';
import { CONTENT } from '../constants';

interface OrganizationProps {
  language: Language;
}

const Organization: React.FC<OrganizationProps> = ({ language }) => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm text-soft-black/70 mb-4">{CONTENT.organization.organizedBy[language]}</p>
        <a href="https://cestudio.pt/" target="_blank" rel="noopener noreferrer" className="inline-block">
          <div className="font-grotesk text-2xl font-bold tracking-tighter hover:opacity-70 transition-opacity">
            CÊ Studio Comporta
          </div>
        </a>
      </div>
    </section>
  );
};

export default Organization;
