'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';

interface TarotFloatingButtonProps {
  isDarkMode: boolean;
}

export default function TarotFloatingButton({ isDarkMode }: TarotFloatingButtonProps) {
  return (
    <Link
      href="/tarot"
      className={`
        fixed bottom-6 right-6 z-40
        flex items-center gap-2 px-4 py-3 rounded-full
        font-medium text-sm
        transition-all duration-300
        hover:scale-110 hover:shadow-lg
        animate-pulse hover:animate-none
        ${isDarkMode
          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-500/30'
          : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-purple-400/30'
        }
        shadow-lg
      `}
    >
      <Sparkles className="w-5 h-5" />
      <span className="hidden sm:inline">Try Tarot Reading</span>
      <span className="sm:hidden">Tarot</span>
    </Link>
  );
}
