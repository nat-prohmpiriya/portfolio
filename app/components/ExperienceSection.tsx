'use client';

import { useRef } from 'react';
import { Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';

interface ExperienceSectionProps {
  isDarkMode: boolean;
}

const experiences = [
  {
    company: 'TTB',
    project: 'Data Digital Platform',
    role: 'Python Developer',
    period: 'MAR - AUG 2025',
    descriptions: [
      'Implemented prompt mutual fund feature, improving user interaction and financial service offerings',
      'Resolved critical issues related to OpenAI integration, ensuring stable and reliable AI functionalities',
    ],
  },
  {
    company: 'Nexter Digital',
    project: 'Q-CHANG',
    role: 'Web Application Developer',
    period: 'JAN 2023 - JUL 2024',
    descriptions: [
      'Enhanced web loading speed using modern optimization techniques',
      'Developed Line Official Notification (LON)',
      'Improved logging system for better incident tracking and resolution',
      'Developed q-chang.com platform maintenance and feature development',
    ],
  },
  {
    company: 'Jambox',
    project: 'G-CHANG',
    role: 'Web Application Developer',
    period: 'MAY 2022 - DEC 2022',
    descriptions: [
      'Enhanced authentication system adding multi-provider support (Google, Facebook, LINE)',
      'Developed API in incentive module using Golang Echo framework with MySQL database',
      'Optimized system response time and user experience',
    ],
  },
  {
    company: 'Getlink',
    project: 'Q-CHANG',
    role: 'Web Application Developer',
    period: 'AUG 2021 - APR 2022',
    descriptions: [
      'Enhanced payment integration with 2C2P for API and frontend components',
      'Developed broadcasting system for technician communication',
      'Maintained and optimized existing web & API Q-Chang Legacy',
    ],
  },
  {
    company: 'King Power Click',
    project: 'Firster.com',
    role: 'Frontend Web Application Developer',
    period: 'FEB 2021 - MAY 2021',
    descriptions: [
      'Contributed to frontend maintenance of e-commerce platform Firster.com',
    ],
  },
  {
    company: 'DooSoft',
    project: 'LMS',
    role: 'Web Application Developer',
    period: 'FEB 2020 - FEB 2021',
    descriptions: [
      'Developed web applications LMS',
      'Collaborated with cross-functional teams',
    ],
  },
];

export default function ExperienceSection({ isDarkMode }: ExperienceSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="experience" className="relative py-20">
      {/* Section Header */}
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Experience
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            My professional journey in software development
          </p>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={() => scroll('left')}
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all hover:scale-110 ${
            isDarkMode
              ? 'bg-gray-800 hover:bg-gray-700 text-white'
              : 'bg-white hover:bg-gray-100 text-gray-900 shadow-lg'
          }`}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => scroll('right')}
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all hover:scale-110 ${
            isDarkMode
              ? 'bg-gray-800 hover:bg-gray-700 text-white'
              : 'bg-white hover:bg-gray-100 text-gray-900 shadow-lg'
          }`}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Scrollable Cards */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-6 md:px-12 pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-[320px] md:w-[380px] p-6 rounded-2xl snap-center ${
                isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'
              }`}
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-4">
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <Briefcase className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {exp.company}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {exp.project}
                  </p>
                </div>
              </div>

              {/* Role & Period */}
              <div className="mb-4">
                <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {exp.role}
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  {exp.period}
                </p>
              </div>

              {/* Descriptions */}
              <ul className="space-y-2">
                {exp.descriptions.map((desc, descIndex) => (
                  <li
                    key={descIndex}
                    className={`text-sm flex items-start gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    <span className="text-gray-500 mt-1">•</span>
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {experiences.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
