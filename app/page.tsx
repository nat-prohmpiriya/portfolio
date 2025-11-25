'use client';
import ProjectSection from '@/app/components/ProjectSection';

import { useState } from 'react';
import Navigation from './components/Navigation';
import GradientOverlay from './components/GradientOverlay';
import HeroSection from './components/HeroSection';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className={`min-h-screen relative transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <GradientOverlay isDarkMode={isDarkMode} />
      <Navigation isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <HeroSection isDarkMode={isDarkMode} />
      <ProjectSection isDarkMode={isDarkMode} />
    </div>
  );
}
