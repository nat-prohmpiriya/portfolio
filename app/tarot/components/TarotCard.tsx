'use client';

import { useState } from 'react';
import { TarotCard as TarotCardType } from '../data/tarotCards';

interface TarotCardProps {
  card: TarotCardType | null;
  isRevealed: boolean;
  isReversed?: boolean;
  onClick?: () => void;
  position?: string;
  isDarkMode: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function TarotCard({
  card,
  isRevealed,
  isReversed = false,
  onClick,
  position,
  isDarkMode,
  size = 'medium',
}: TarotCardProps) {
  const [isFlipping, setIsFlipping] = useState(false);

  const sizeClasses = {
    small: 'w-24 h-40',
    medium: 'w-32 h-52 md:w-40 md:h-64',
    large: 'w-40 h-64 md:w-48 md:h-80',
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
      {position && (
        <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {position}
        </span>
      )}
      <div
        onClick={handleClick}
        className={`
          ${sizeClasses[size]}
          relative cursor-pointer
          transition-transform duration-500 ease-in-out
          ${isFlipping ? 'scale-95' : 'hover:scale-105'}
          ${!isRevealed ? 'animate-pulse' : ''}
        `}
        style={{
          perspective: '1000px',
        }}
      >
        <div
          className={`
            relative w-full h-full
            transition-transform duration-500
            transform-style-preserve-3d
            ${isRevealed ? 'rotate-y-180' : ''}
          `}
          style={{
            transformStyle: 'preserve-3d',
            transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Card Back */}
          <div
            className={`
              absolute w-full h-full rounded-xl
              flex items-center justify-center
              border-2 backface-hidden
              ${isDarkMode
                ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black border-gray-600'
                : 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 border-gray-400'
              }
            `}
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Card Back Design */}
            <div className="absolute inset-2 border border-gray-500 rounded-lg opacity-50" />
            <div className="absolute inset-4 border border-gray-600 rounded-lg opacity-30" />
            <div className="text-4xl md:text-5xl">✦</div>
            <div className="absolute top-3 left-3 text-xl opacity-50">✧</div>
            <div className="absolute top-3 right-3 text-xl opacity-50">✧</div>
            <div className="absolute bottom-3 left-3 text-xl opacity-50">✧</div>
            <div className="absolute bottom-3 right-3 text-xl opacity-50">✧</div>
          </div>

          {/* Card Front */}
          <div
            className={`
              absolute w-full h-full rounded-xl
              flex flex-col items-center justify-between p-3
              border-2 backface-hidden
              ${isDarkMode
                ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-500'
                : 'bg-gradient-to-br from-white to-gray-100 border-gray-300'
              }
              ${isReversed ? 'rotate-180' : ''}
            `}
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {card && (
              <>
                {/* Card Number */}
                <div className={`text-xs font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {card.id}
                </div>

                {/* Card Symbol/Image Placeholder */}
                <div className={`
                  flex-1 flex items-center justify-center
                  text-4xl md:text-5xl
                  ${isDarkMode ? 'text-white' : 'text-gray-800'}
                `}>
                  {getCardSymbol(card.id)}
                </div>

                {/* Card Name */}
                <div className={`
                  text-center text-xs md:text-sm font-bold
                  ${isDarkMode ? 'text-white' : 'text-gray-900'}
                `}>
                  {card.name}
                </div>

                {/* Reversed Indicator */}
                {isReversed && (
                  <div className="absolute top-1 right-1 text-xs text-red-500 font-bold">
                    R
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Get symbol for each Major Arcana card
function getCardSymbol(id: number): string {
  const symbols: Record<number, string> = {
    0: '🃏',   // The Fool
    1: '🪄',   // The Magician
    2: '🌙',   // The High Priestess
    3: '👑',   // The Empress
    4: '🏛️',   // The Emperor
    5: '📿',   // The Hierophant
    6: '💕',   // The Lovers
    7: '🏎️',   // The Chariot
    8: '🦁',   // Strength
    9: '🏮',   // The Hermit
    10: '🎡',  // Wheel of Fortune
    11: '⚖️',  // Justice
    12: '🙃',  // The Hanged Man
    13: '💀',  // Death
    14: '⚗️',  // Temperance
    15: '😈',  // The Devil
    16: '🗼',  // The Tower
    17: '⭐',  // The Star
    18: '🌕',  // The Moon
    19: '☀️',  // The Sun
    20: '📯',  // Judgement
    21: '🌍',  // The World
  };
  return symbols[id] || '✦';
}
