'use client';

import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface PortfolioSectionProps {
  isDarkMode: boolean;
}

const projects = [
  {
    title: 'Travel Planner',
    description: 'Travel planning application that helps users discover and plan their perfect trips.',
    desktopImage: '/travel-planner-desktop-size.png',
    mobileImage: '/travel-planner-mobile.size.png',
    link: 'https://www.painaina.com/en',
    tags: ['Next.js', 'React Native', 'Golang.Gin', 'MongoDB', 'Github Action', 'Google Cloud Run', 'Otel Sdk', "Google Map API", 'Cloundflare R2 & CDN'],
  },
  {
    title: 'E-Commerce App',
    description: 'Full-featured e-commerce platform with product catalog, shopping cart, and checkout functionality.',
    desktopImage: '/ecomerce-desktop-size.png',
    mobileImage: '/ecomerce-mobile-size.png',
    link: 'https://e-commerce-webapp-nine.vercel.app/',
    tags: ['Next.js', 'Firebase', 'Vercel Deployment', 'Stripe API', 'Tailwind CSS', 'Context API'],
  },
  {
    title: 'QChang App',
    description: 'Ondemand Technician Service App that connects users with local service providers for various home services.',
    desktopImage: '/qchang-desktop.png',
    mobileImage: '/qchang-mobile.png',
    link: 'https://www.qchang.com',
    tags: ['Nuxtjs2', 'Firebase', 'Nodejs', 'Mongodb', 'Payment 2c2p'],
  },
];

export default function PortfolioSection({ isDarkMode }: PortfolioSectionProps) {
  return (
    <section id="portfolio" className="relative container mx-auto px-6 py-20">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Portfolio
        </h2>
        <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Some of my recent projects
        </p>
      </div>

      {/* Projects */}
      <div className="space-y-24 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
          >
            {/* Device Mockup */}
            <div className="flex-1 relative">
              <div className="relative flex items-end justify-center gap-4">
                {/* Desktop Mockup */}
                <div className={`relative rounded-lg overflow-hidden shadow-2xl ${isDarkMode ? 'shadow-white/10' : 'shadow-gray-400/30'}`}>
                  <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} px-2 py-1.5 flex items-center gap-1.5`}>
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                  <div className="relative w-[280px] md:w-[400px] h-[175px] md:h-[250px]">
                    <Image
                      src={project.desktopImage}
                      alt={`${project.title} desktop view`}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>

                {/* Mobile Mockup */}
                <div className={`relative rounded-2xl overflow-hidden shadow-2xl ${isDarkMode ? 'shadow-white/10' : 'shadow-gray-400/30'} border-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} -mb-4`}>
                  <div className="relative w-[60px] md:w-[80px] h-[120px] md:h-[160px]">
                    <Image
                      src={project.mobileImage}
                      alt={`${project.title} mobile view`}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {project.title}
              </h3>
              <p className={`text-base md:text-lg mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className={`px-3 py-1 rounded-full text-sm ${isDarkMode
                      ? 'bg-gray-700 text-gray-300'
                      : 'bg-gray-200 text-gray-700'
                      }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link Button */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all hover:scale-105 ${isDarkMode
                  ? 'bg-white hover:bg-gray-200 text-black'
                  : 'bg-gray-900 hover:bg-black text-white'
                  }`}
              >
                View Project
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
