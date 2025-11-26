'use client';

import { useState } from 'react';
import Image from 'next/image';
import { TarotCard as TarotCardType } from '../data/tarotCards';

interface TarotCardProps {
  card: TarotCardType | null;
  isRevealed: boolean;
  isReversed?: boolean;
  onClick?: () => void;
  position?: string;
  positionTh?: string;
  isDarkMode: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function TarotCard({
  card,
  isRevealed,
  isReversed = false,
  onClick,
  position,
  positionTh,
  isDarkMode,
  size = 'medium',
}: TarotCardProps) {
  const [isFlipping, setIsFlipping] = useState(false);

  const sizeClasses = {
    small: 'w-16 h-28 md:w-20 md:h-32',
    medium: 'w-24 h-40 md:w-28 md:h-44',
    large: 'w-32 h-52 md:w-40 md:h-64',
  };

  const handleClick = () => {
    if (onClick && !isRevealed) {
      setIsFlipping(true);
      setTimeout(() => {
        onClick();
        setIsFlipping(false);
      }, 300);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {(position || positionTh) && (
        <div className="text-center">
          {positionTh && (
            <span className={`block text-xs font-light tracking-wide ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {positionTh}
            </span>
          )}
          {position && (
            <span className={`block text-xs font-light ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
              {position}
            </span>
          )}
        </div>
      )}
      <div
        onClick={handleClick}
        className={`
          ${sizeClasses[size]}
          relative cursor-pointer
          transition-transform duration-500 ease-in-out
          ${isFlipping ? 'scale-95' : 'hover:scale-105'}
        `}
        style={{
          perspective: '1000px',
        }}
      >
        <div
          className={`
            relative w-full h-full
            transition-transform duration-500
          `}
          style={{
            transformStyle: 'preserve-3d',
            transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Card Back - Monochrome */}
          <div
            className={`
              absolute w-full h-full rounded overflow-hidden
              flex items-center justify-center
              border
              ${isDarkMode
                ? 'bg-gray-900 border-gray-700'
                : 'bg-gray-100 border-gray-300'
              }
            `}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className={`absolute inset-3 border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} rounded-sm`} />
            <div className={`text-2xl ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`}>✦</div>
          </div>

          {/* Card Front */}
          <div
            className={`
              absolute w-full h-full rounded overflow-hidden
              border
              ${isDarkMode
                ? 'bg-gray-900 border-gray-700'
                : 'bg-white border-gray-300'
              }
              ${isReversed ? 'rotate-180' : ''}
            `}
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {card && (
              <div className="relative w-full h-full">
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 120px, 180px"
                />
                {isReversed && (
                  <div className={`
                    absolute top-1 right-1
                    px-1.5 py-0.5 rounded text-xs font-light
                    ${isReversed ? 'rotate-180' : ''}
                    ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-600'}
                  `}>
                    R
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
