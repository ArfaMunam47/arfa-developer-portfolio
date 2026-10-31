import React, { useState } from 'react';
import { WelcomeVideoIntro } from './components/WelcomeVideoIntro';
import { CreativeIntroCover } from './components/CreativeIntroCover';
import { FloatingNav } from './components/FloatingNav';
import { HeroSection } from './components/HeroSection';
import { DualMarquee } from './components/DualMarquee';
import { WhoIAmSection } from './components/WhoIAmSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExploringSection } from './components/ExploringSection';
import { CertificationsSection } from './components/CertificationsSection';
import { HobbiesSection } from './components/HobbiesSection';
import { GitHubSection } from './components/GitHubSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BespokeCursor } from './components/BespokeCursor';

export const App: React.FC = () => {
  // Intro states: 'welcome' -> 'creative-intro' -> 'main'
  const [introStep, setIntroStep] = useState<'welcome' | 'creative-intro' | 'main'>('welcome');

  return (
    <div className="portfolio-app-root">
      {/* Precision Desktop Orbital Cursor */}
      <BespokeCursor />

      {/* Step 1: Cinematic Fullscreen Welcome Video Intro */}
      {introStep === 'welcome' && (
        <WelcomeVideoIntro
          onComplete={() => setIntroStep('creative-intro')}
        />
      )}

      {/* Step 2: Layered Creative Artwork & Story Video Middle Gallery */}
      {introStep === 'creative-intro' && (
        <CreativeIntroCover
          onExplore={() => setIntroStep('main')}
        />
      )}

      {/* Step 3: Main High-Craft Portfolio Site */}
      <div className={`portfolio-main-content ${introStep !== 'main' ? 'pointer-events-none opacity-40' : 'opacity-100'}`}>
        <FloatingNav />
        <HeroSection />
        <DualMarquee />
        <WhoIAmSection />
        <ProjectsSection />
        <SkillsSection />
        <ExploringSection />
        <CertificationsSection />
        <HobbiesSection />
        <GitHubSection />
        <ServicesSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default App;
