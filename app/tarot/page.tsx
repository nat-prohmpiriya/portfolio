'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, RotateCcw, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import TarotCard from './components/TarotCard';
import { TarotCard as TarotCardType, getRandomCards, spreadTypes } from './data/tarotCards';

type SpreadType = 'single' | 'three-card' | 'yes-no';

interface DrawnCard {
  card: TarotCardType;
  isReversed: boolean;
  isRevealed: boolean;
}

export default function TarotPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedSpread, setSelectedSpread] = useState<SpreadType | null>(null);
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [allRevealed, setAllRevealed] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  const startReading = (spreadType: SpreadType) => {
    setIsShuffling(true);
    setSelectedSpread(spreadType);
    setAllRevealed(false);

    const spread = spreadTypes.find(s => s.id === spreadType);
    const cardCount = spread?.cardCount || 1;

    // Simulate shuffling animation
    setTimeout(() => {
      const cards = getRandomCards(cardCount);
      const drawn: DrawnCard[] = cards.map(card => ({
        card,
        isReversed: Math.random() > 0.7, // 30% chance of reversed
        isRevealed: false,
      }));
      setDrawnCards(drawn);
      setIsShuffling(false);
    }, 1500);
  };

  const revealCard = (index: number) => {
    setDrawnCards(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], isRevealed: true };

      // Check if all cards are revealed
      const allNowRevealed = updated.every(c => c.isRevealed);
      if (allNowRevealed) {
        setTimeout(() => setAllRevealed(true), 500);
      }

      return updated;
    });
  };

  const resetReading = () => {
    setSelectedSpread(null);
    setDrawnCards([]);
    setAllRevealed(false);
  };

  const currentSpread = spreadTypes.find(s => s.id === selectedSpread);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode ? 'bg-gray-950/80' : 'bg-white/80'} backdrop-blur-md border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className={`flex items-center gap-2 hover:opacity-70 transition-opacity ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Portfolio</span>
          </Link>

          <h1 className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Tarot Reading
          </h1>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full transition-colors ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Spread Selection */}
        {!selectedSpread && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Choose Your Reading
              </h2>
              <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Select a spread type to begin your tarot reading
              </p>
            </div>

            <div className="grid gap-4 md:gap-6">
              {spreadTypes.map((spread) => (
                <button
                  key={spread.id}
                  onClick={() => startReading(spread.id as SpreadType)}
                  className={`
                    p-6 rounded-2xl text-left transition-all hover:scale-[1.02]
                    ${isDarkMode
                      ? 'bg-gray-900 hover:bg-gray-800 border border-gray-800'
                      : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {spread.name}
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {spread.description}
                      </p>
                    </div>
                    <div className={`
                      px-3 py-1 rounded-full text-sm font-medium
                      ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}
                    `}>
                      {spread.cardCount} {spread.cardCount === 1 ? 'card' : 'cards'}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Disclaimer */}
            <p className={`mt-12 text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              This is for entertainment purposes only. Trust your own intuition!
            </p>
          </div>
        )}

        {/* Shuffling Animation */}
        {isShuffling && (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-600 border-t-white" />
            </div>
            <p className={`mt-6 text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Shuffling the cards...
            </p>
          </div>
        )}

        {/* Card Display */}
        {selectedSpread && !isShuffling && drawnCards.length > 0 && (
          <div className="max-w-4xl mx-auto">
            {/* Spread Title */}
            <div className="text-center mb-8">
              <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {currentSpread?.name}
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {!allRevealed ? 'Click on the cards to reveal them' : 'Your reading is complete'}
              </p>
            </div>

            {/* Cards */}
            <div className={`
              flex flex-wrap justify-center gap-6 md:gap-8 mb-12
              ${selectedSpread === 'single' || selectedSpread === 'yes-no' ? 'flex-col items-center' : ''}
            `}>
              {drawnCards.map((drawn, index) => (
                <TarotCard
                  key={index}
                  card={drawn.card}
                  isRevealed={drawn.isRevealed}
                  isReversed={drawn.isReversed}
                  onClick={() => revealCard(index)}
                  position={currentSpread?.positions[index]}
                  isDarkMode={isDarkMode}
                  size={selectedSpread === 'single' || selectedSpread === 'yes-no' ? 'large' : 'medium'}
                />
              ))}
            </div>

            {/* Card Meanings */}
            {allRevealed && (
              <div className="space-y-6">
                <h3 className={`text-xl font-bold text-center mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Your Reading
                </h3>
                {drawnCards.map((drawn, index) => (
                  <div
                    key={index}
                    className={`
                      p-6 rounded-2xl
                      ${isDarkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'}
                    `}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{getCardSymbol(drawn.card.id)}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {currentSpread?.positions[index]}:
                          </span>
                          <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {drawn.card.name}
                            {drawn.isReversed && (
                              <span className="text-red-500 ml-2 text-sm">(Reversed)</span>
                            )}
                          </h4>
                        </div>
                        <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {drawn.isReversed ? drawn.card.meaningReversed : drawn.card.meaningUpright}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {drawn.card.keywords.map((keyword, kIndex) => (
                            <span
                              key={kIndex}
                              className={`
                                px-2 py-1 rounded-full text-xs
                                ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}
                              `}
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Reset Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={resetReading}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all hover:scale-105
                  ${isDarkMode
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-gray-900 text-white hover:bg-black'
                  }
                `}
              >
                <RotateCcw className="w-5 h-5" />
                New Reading
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`py-6 text-center text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
        <p>Built with Next.js by Nut Prohmpiriya</p>
      </footer>
    </div>
  );
}

// Helper function for card symbols
function getCardSymbol(id: number): string {
  const symbols: Record<number, string> = {
    0: '🃏', 1: '🪄', 2: '🌙', 3: '👑', 4: '🏛️', 5: '📿',
    6: '💕', 7: '🏎️', 8: '🦁', 9: '🏮', 10: '🎡', 11: '⚖️',
    12: '🙃', 13: '💀', 14: '⚗️', 15: '😈', 16: '🗼', 17: '⭐',
    18: '🌕', 19: '☀️', 20: '📯', 21: '🌍',
  };
  return symbols[id] || '✦';
}
