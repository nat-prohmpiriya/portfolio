'use client';

import { useState } from 'react';
import { Linkedin, Github, Menu, X } from 'lucide-react';

interface NavigationProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation({ isDarkMode, setIsDarkMode }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 container mx-auto px-6 pt-6">
        <div className={`${!isDarkMode ? 'bg-white/70 backdrop-blur-md' : 'bg-gray-900/70 backdrop-blur-md'} rounded-full px-6 py-4 border ${isDarkMode ? 'border-gray-800' : 'border-gray-200/50'} shadow-sm`}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('#hero')}
              className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              NUT<span className={`${isDarkMode ? 'text-white' : 'text-black'}`}>.</span>DEV
            </button>

            {/* Nav Links */}
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`text-sm font-medium transition-colors hover:opacity-70 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Social Icons and Dark Mode Toggle */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/prohmpiriya/"
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:opacity-70 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/nat-prohmpiriya"
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:opacity-70 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              >
                <Github className="w-5 h-5" />
              </a>
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`relative w-14 h-8 rounded-full transition-colors ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
                aria-label="Toggle dark mode"
              >
                <span
                  className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 px-4 pt-4">
        <div className={`${!isDarkMode ? 'bg-white/70 backdrop-blur-md' : 'bg-gray-900/70 backdrop-blur-md'} rounded-2xl px-4 py-3 border ${isDarkMode ? 'border-gray-800' : 'border-gray-200/50'} shadow-sm`}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('#hero')}
              className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              NUT<span className={`${isDarkMode ? 'text-white' : 'text-black'}`}>.</span>DEV
            </button>

            <div className="flex items-center gap-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`relative w-12 h-7 rounded-full transition-colors ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
                aria-label="Toggle dark mode"
              >
                <span
                  className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`}
                />
              </button>

              {/* Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className={`mt-2 ${!isDarkMode ? 'bg-white/90 backdrop-blur-md' : 'bg-gray-900/90 backdrop-blur-md'} rounded-2xl px-4 py-4 border ${isDarkMode ? 'border-gray-800' : 'border-gray-200/50'} shadow-lg`}>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`text-left px-4 py-3 rounded-xl font-medium transition-colors ${
                    isDarkMode
                      ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              {/* Social Links in Mobile */}
              <div className={`flex items-center gap-4 px-4 pt-4 mt-2 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <a
                  href="https://www.linkedin.com/in/prohmpiriya/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode
                      ? 'text-white hover:bg-gray-800'
                      : 'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/nat-prohmpiriya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode
                      ? 'text-white hover:bg-gray-800'
                      : 'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-24 md:h-28" />
    </>
  );
}
