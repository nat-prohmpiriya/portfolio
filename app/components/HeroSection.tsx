import { ArrowRight, Linkedin, Github } from 'lucide-react';
import Image from 'next/image';

interface HeroSectionProps {
  isDarkMode: boolean;
  onDownloadCV: () => void;
}

export default function HeroSection({ isDarkMode, onDownloadCV }: HeroSectionProps) {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main id="hero" className="relative container mx-auto px-6 flex items-center min-h-screen md:min-h-[calc(100vh-120px)] md:pt-12 pt-6">
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 items-center justify-center w-full">

        {/* Mobile Layout - Profile Card Style */}
        <div className="lg:hidden flex flex-col text-left space-y-6 w-full max-w-md">
          {/* Avatar */}
          <div className="relative w-48 h-48 mx-auto">
            <Image src="/avatar.png" alt="Avatar" width={192} height={192} className="rounded-full object-cover w-full h-full" />
          </div>

          {/* Name */}
          <div className="space-y-2">
            <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Nut Prohmpiriya
            </h1>
            <p className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Fullstack Developer
            </p>
          </div>

          {/* Description */}
          <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            A fullstack developer who loves to transform your ideas and visions into
            digital realities. I specialize in building scalable web applications
            using React, Node.js, Python, and Golang.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-start gap-3">
            <button
              onClick={onDownloadCV}
              className={`cursor-pointer rounded-2xl px-6 py-3 font-bold transition-colors ${isDarkMode
                ? 'bg-white text-black hover:bg-gray-200'
                : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              <span className='text-sm'>Download my CV</span>
            </button>
            <button
              onClick={scrollToContact}
              className={`cursor-pointer px-6 py-3 rounded-2xl font-bold transition-colors border flex items-center justify-center gap-2 ${isDarkMode
                ? 'bg-transparent text-white border-white hover:bg-white/10'
                : 'bg-white text-black border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span className='font-bold text-sm'>Contact Me</span>
            </button>
            <a
              href="https://www.linkedin.com/in/prohmpiriya/"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-full border-2 h-12 w-12 flex items-center justify-center hover:opacity-70 transition-opacity ${isDarkMode ? 'border-white' : 'border-gray-300'}`}
            >
              <Linkedin className={`w-6 h-6 cursor-pointer ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
            </a>
            <a
              href="https://github.com/nat-prohmpiriya"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-full border-2 h-12 w-12 flex items-center justify-center hover:opacity-70 transition-opacity ${isDarkMode ? 'border-white' : 'border-gray-300'}`}
            >
              <Github className={`w-6 h-6 cursor-pointer ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
            </a>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block space-y-6 md:space-y-8">
          <div className="space-y-4">
            <h1 className={`text-5xl md:text-6xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <span className={`font-normal ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>I am </span>
              <span className='whitespace-nowrap'>Nut Prohmpiriya</span>
            </h1>
            <p className={`text-lg md:text-xl max-w-xl leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              A fullstack developer who loves to transform your ideas and visions into
              digital realities. I specialize in building scalable web applications
              using React, Node.js, Python, and Golang.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onDownloadCV}
              className={`cursor-pointer rounded-3xl px-4 py-2 font-bold transition-colors ${isDarkMode
                ? 'bg-white text-black hover:bg-gray-200'
                : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              <span className='text-sm'>Download my CV</span>
            </button>
            <button
              onClick={scrollToContact}
              className={`cursor-pointer px-4 py-2 rounded-3xl font-bold transition-colors border flex items-center justify-center gap-2 ${isDarkMode
                ? 'bg-transparent text-white border-white hover:bg-white/10'
                : 'bg-white text-black border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span className='font-bold text-sm'>Contact Me</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/prohmpiriya/"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:opacity-70 transition-opacity ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/nat-prohmpiriya"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:opacity-70 transition-opacity ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Desktop - Avatar Image */}
        <div className="hidden lg:flex justify-center lg:justify-end">
          <div className="relative w-80 h-80 md:w-96 md:h-96">
            <div className={`absolute inset-0 rounded-full blur-3xl opacity-30 ${isDarkMode
              ? 'bg-gradient-to-br from-gray-400 to-gray-600'
              : 'bg-gradient-to-br from-gray-200 to-gray-300'
            }`}></div>
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <Image src="/avatar.png" alt="Avatar" width={384} height={384} className="rounded-full object-cover w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
