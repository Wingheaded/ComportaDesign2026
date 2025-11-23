
import React, { useState } from 'react';
import { Language } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Exhibitions from './components/Exhibitions';
import Cinema from './components/Cinema';
import Venue from './components/Venue';
import Sponsors from './components/Sponsors';
import Contact from './components/Contact';
import Organization from './components/Organization';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import VoiceAgent from './components/VoiceAgent';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(Language.PT);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="bg-light-sand relative">
      <Header language={language} setLanguage={setLanguage} />
      <main>
        <Hero language={language} />
        <About language={language} />
        <Exhibitions language={language} />
        <Cinema language={language} />
        <Venue language={language} />
        <Sponsors language={language} />
        <Contact language={language} />
        <Organization language={language} />
      </main>
      <Footer language={language} />
      <VoiceAgent language={language} />
      <Chatbot language={language} isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
    </div>
  );
};

export default App;
