import { Linkedin, Github } from 'lucide-react';

interface NavigationProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

export default function Navigation({ isDarkMode, setIsDarkMode }: NavigationProps) {
  return (
    <>
      {/* Mobile Navigation - Only Logo and Dark Mode Toggle */}
      <nav className="md:hidden container mx-auto px-6 pt-6">
        <div className={`${!isDarkMode ? 'bg-white/70 backdrop-blur-md' : 'bg-gray-900/70 backdrop-blur-md'} rounded-4xl px-6 py-4  ${isDarkMode ? 'border-gray-800' : 'border-gray-200/50'} shadow-sm`}>
          <div className="flex items-center justify-end">
            {/* Logo */}
            {/* <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              [N2P]
            </div> */}
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
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden md:block container mx-auto px-6 pt-6">
        <div className={`${!isDarkMode ? 'bg-white/70 backdrop-blur-md' : 'bg-gray-900/70 backdrop-blur-md'} rounded-4xl px-6 py-4 border ${isDarkMode ? 'border-gray-800' : 'border-gray-200/50'} shadow-sm`}>
          <div className="flex items-center justify-end">
            {/* Logo */}
            {/* <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              [N2P]
            </div> */}

            {/* Social Icons and Dark Mode Toggle */}
            <div className="flex items-center gap-4">
              {/* LinkedIn */}
              {/* <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={`hover:opacity-70 transition-opacity ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <Linkedin className="w-6 h-6" strokeWidth={1.5} />
              </a> */}
              {/* GitHub */}
              {/* <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`hover:opacity-70 transition-opacity ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <Github className="w-6 h-6" strokeWidth={1.5} />
              </a> */}
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
    </>
  );
}
