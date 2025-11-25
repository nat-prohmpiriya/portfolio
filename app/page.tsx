'use client';

import { useState } from 'react';
import Navigation from './components/Navigation';
import GradientOverlay from './components/GradientOverlay';
import HeroSection from './components/HeroSection';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';
import PortfolioSection from './components/PortfolioSection';
import ContactSection from './components/ContactSection';
import EmailModal from './components/EmailModal';
import TarotFloatingButton from './components/TarotFloatingButton';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  return (
    <div className={`min-h-screen relative transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <GradientOverlay isDarkMode={isDarkMode} />
      <Navigation isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <HeroSection isDarkMode={isDarkMode} onDownloadCV={() => setIsEmailModalOpen(true)} />
      <SkillsSection isDarkMode={isDarkMode} />
      <ExperienceSection isDarkMode={isDarkMode} />
      <PortfolioSection isDarkMode={isDarkMode} />
      <ContactSection isDarkMode={isDarkMode} />

      {/* Footer */}
      <footer className={`py-8 text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
        <p className="text-sm">
          © {new Date().getFullYear()} Prohmpiriya Phonumnuaisuk. All rights reserved.
        </p>
      </footer>

      {/* Email Modal for CV Download */}
      <EmailModal
        isDarkMode={isDarkMode}
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />

      {/* Tarot Floating Button */}
      <TarotFloatingButton isDarkMode={isDarkMode} />
    </div>
  );
}
