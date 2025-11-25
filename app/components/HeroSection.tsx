import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Linkedin, Github } from 'lucide-react';


interface HeroSectionProps {
  isDarkMode: boolean;
}

export default function HeroSection({ isDarkMode }: HeroSectionProps) {
  return (
    <main className="relative container mx-auto px-6 flex items-center min-h-screen md:min-h-[calc(100vh-120px)] md:pt-12 pt-6">
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 items-center justify-center w-full">

        {/* Mobile Layout - Profile Card Style */}
        <div className="lg:hidden flex flex-col  text-left space-y-6 w-full max-w-md">
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
              @nut_n2p
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
            <button className={`cursor-pointer rounded-2xl px-6 py-3 font-bold transition-colors ${isDarkMode
              ? 'bg-white text-black hover:bg-gray-200'
              : 'bg-black text-white hover:bg-gray-800'
              }`}>
              <span className='text-sm'>Download my CV</span>
            </button>
            <button className={`cursor-pointer px-6 py-3 rounded-2xl font-bold transition-colors border flex items-center justify-center gap-2 ${isDarkMode
              ? 'bg-transparent text-white border-white hover:bg-white/10'
              : 'bg-white text-black border-gray-200 hover:bg-gray-50'
              }`}>
              <span className='font-bold text-sm'>Contact Me</span>
              {/* <ArrowRight className="w-5 h-5" /> */}
            </button>
            <span className="flex-grow rounded-full border-2  border-white h-12 w-12 flex items-center justify-center">
              <Linkedin className={`w-6 h-6 mt-1 cursor-pointer ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
            </span>
            <span className="flex-grow rounded-full border-2 border-white h-12 w-12 flex items-center justify-center">
              <Github className={`w-6 h-6 mt-1 cursor-pointer ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
            </span>
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
            <button className={`cursor-pointer rounded-3xl px-4 py-2 font-bold transition-colors ${isDarkMode
              ? 'bg-white text-black hover:bg-gray-200'
              : 'bg-black text-white hover:bg-gray-800'
              }`}>
              <span className='text-sm'>Download my CV</span>
            </button>
            <button className={`cursor-pointer px-4 py-2 rounded-3xl font-bold transition-colors border flex items-center justify-center gap-2 ${isDarkMode
              ? 'bg-transparent text-white border-white hover:bg-white/10'
              : 'bg-white text-black border-gray-200 hover:bg-gray-50'
              }`}>
              <span className='font-bold text-sm'>Contact Me</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop - Avatar Image */}
        <div className="hidden lg:flex justify-center lg:justify-end">
          <div className="relative w-80 h-80 md:w-96 md:h-96">
            <div className={`absolute inset-0 rounded-full blur-3xl opacity-30 ${isDarkMode
              ? 'bg-gradient-to-br from-purple-500 to-blue-500'
              : 'bg-gradient-to-br from-purple-200 to-blue-200'
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
