'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, RotateCcw, Moon, Sun, Check, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import TarotCard from './components/TarotCard';
import { TarotCard as TarotCardType, allTarotCards, getRandomCards, spreadTypes } from './data/tarotCards';

type SpreadType = 'single' | 'three-card' | 'celtic-cross' | 'yes-no';
type Language = 'th' | 'en';
type GamePhase = 'select-spread' | 'shuffling' | 'selecting-cards' | 'reading';

interface DrawnCard {
  card: TarotCardType;
  isReversed: boolean;
  isRevealed: boolean;
}

// Celtic Cross position descriptions
const celticCrossPositions = {
  en: [
    { title: 'Present Situation', desc: 'The current state of the matter, what is happening right now.' },
    { title: 'Challenge', desc: 'The obstacle or challenge you are facing.' },
    { title: 'Past', desc: 'Past events that have led to the current situation.' },
    { title: 'Future', desc: 'What is coming in the near future.' },
    { title: 'Above (Goal)', desc: 'Your conscious goals and aspirations.' },
    { title: 'Below (Subconscious)', desc: 'Hidden influences and subconscious factors.' },
    { title: 'Advice', desc: 'Guidance and advice for moving forward.' },
    { title: 'External Influences', desc: 'Outside factors and how others see you.' },
    { title: 'Hopes & Fears', desc: 'Your hopes and fears regarding the situation.' },
    { title: 'Outcome', desc: 'The final outcome if the current path continues.' },
  ],
  th: [
    { title: 'สถานการณ์ปัจจุบัน', desc: 'สภาพปัจจุบันของเรื่องที่ถาม สิ่งที่กำลังเกิดขึ้นตอนนี้' },
    { title: 'อุปสรรค/ความท้าทาย', desc: 'อุปสรรคหรือความท้าทายที่คุณกำลังเผชิญอยู่' },
    { title: 'อดีต', desc: 'เหตุการณ์ในอดีตที่นำมาสู่สถานการณ์ปัจจุบัน' },
    { title: 'อนาคตอันใกล้', desc: 'สิ่งที่กำลังจะเกิดขึ้นในอนาคตอันใกล้' },
    { title: 'เป้าหมาย/ความหวัง', desc: 'เป้าหมายและความปรารถนาที่คุณตระหนักรู้' },
    { title: 'จิตใต้สำนึก/รากฐาน', desc: 'อิทธิพลที่ซ่อนเร้นและปัจจัยในจิตใต้สำนึก' },
    { title: 'คำแนะนำ', desc: 'คำแนะนำและทิศทางในการก้าวไปข้างหน้า' },
    { title: 'อิทธิพลภายนอก', desc: 'ปัจจัยภายนอกและมุมมองของผู้อื่นที่มีต่อคุณ' },
    { title: 'ความหวังและความกลัว', desc: 'ความหวังและความกลัวของคุณเกี่ยวกับสถานการณ์นี้' },
    { title: 'ผลลัพธ์สุดท้าย', desc: 'ผลลัพธ์สุดท้ายหากดำเนินตามเส้นทางปัจจุบัน' },
  ],
};

export default function TarotPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState<Language>('th');
  const [selectedSpread, setSelectedSpread] = useState<SpreadType | null>(null);
  const [gamePhase, setGamePhase] = useState<GamePhase>('select-spread');
  const [shuffledDeck, setShuffledDeck] = useState<TarotCardType[]>([]);
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [allRevealed, setAllRevealed] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const languages = [
    { code: 'th' as const, flag: '🇹🇭', name: 'ไทย' },
    { code: 'en' as const, flag: '🇬🇧', name: 'English' },
  ];

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  const startReading = (spreadType: SpreadType) => {
    setSelectedSpread(spreadType);

    if (spreadType === 'celtic-cross') {
      setGamePhase('shuffling');
      setTimeout(() => {
        const shuffled = [...allTarotCards].sort(() => Math.random() - 0.5);
        setShuffledDeck(shuffled);
        setSelectedCardIds([]);
        setGamePhase('selecting-cards');
      }, 1500);
    } else {
      setGamePhase('shuffling');
      const spread = spreadTypes.find(s => s.id === spreadType);
      const cardCount = spread?.cardCount || 1;

      setTimeout(() => {
        const cards = getRandomCards(cardCount);
        const drawn: DrawnCard[] = cards.map(card => ({
          card,
          isReversed: Math.random() > 0.7,
          isRevealed: false,
        }));
        setDrawnCards(drawn);
        setGamePhase('reading');
      }, 1500);
    }
  };

  const toggleCardSelection = (cardId: string) => {
    if (selectedCardIds.includes(cardId)) {
      setSelectedCardIds(prev => prev.filter(id => id !== cardId));
    } else if (selectedCardIds.length < 10) {
      setSelectedCardIds(prev => [...prev, cardId]);
    }
  };

  const confirmSelection = () => {
    const drawn: DrawnCard[] = selectedCardIds.map(cardId => {
      const card = shuffledDeck.find(c => c.id === cardId)!;
      return {
        card,
        isReversed: Math.random() > 0.7,
        isRevealed: true,
      };
    });
    setDrawnCards(drawn);
    setAllRevealed(true);
    setGamePhase('reading');
  };

  const cancelSelection = () => {
    setSelectedCardIds([]);
  };

  const revealCard = (index: number) => {
    setDrawnCards(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], isRevealed: true };

      const allNowRevealed = updated.every(c => c.isRevealed);
      if (allNowRevealed) {
        setTimeout(() => setAllRevealed(true), 500);
      }

      return updated;
    });
  };

  const resetReading = () => {
    setSelectedSpread(null);
    setGamePhase('select-spread');
    setDrawnCards([]);
    setAllRevealed(false);
    setSelectedCardIds([]);
    setShuffledDeck([]);
  };

  const currentSpread = spreadTypes.find(s => s.id === selectedSpread);

  // Card Selection Grid - 3 rows stacked
  const CardSelectionGrid = () => {
    const cardsPerRow = Math.ceil(shuffledDeck.length / 3);
    const rows = [
      shuffledDeck.slice(0, cardsPerRow),
      shuffledDeck.slice(cardsPerRow, cardsPerRow * 2),
      shuffledDeck.slice(cardsPerRow * 2),
    ];

    return (
      <div className="space-y-8">
        {/* Selection Info */}
        <div className="text-center">
          <h2 className={`text-2xl md:text-3xl font-light tracking-wide mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {language === 'th' ? 'เลือกไพ่ 10 ใบ' : 'Select 10 Cards'}
          </h2>
          <p className={`text-lg font-light ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {language === 'th'
              ? `เลือกแล้ว ${selectedCardIds.length} / 10 ใบ`
              : `Selected ${selectedCardIds.length} / 10 cards`}
          </p>
          <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            {language === 'th'
              ? 'คลิกที่ไพ่เพื่อเลือก คลิกอีกครั้งเพื่อยกเลิก'
              : 'Click to select, click again to deselect'}
          </p>
        </div>

        {/* 3 Rows of Stacked Cards */}
        <div className="space-y-6 py-4">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center">
              <div
                className="relative h-28 md:h-32"
                style={{ width: `${Math.min(row.length * 18 + 50, 600)}px` }}
              >
                {row.map((card, cardIndex) => {
                  const isSelected = selectedCardIds.includes(card.id);
                  const selectionOrder = selectedCardIds.indexOf(card.id) + 1;
                  const offsetX = (cardIndex / row.length) * 100;

                  return (
                    <div
                      key={card.id}
                      onClick={() => toggleCardSelection(card.id)}
                      className={`
                        absolute cursor-pointer transition-all duration-300
                        ${isSelected ? '-translate-y-6 scale-110' : 'hover:-translate-y-3 hover:scale-105'}
                        ${selectedCardIds.length >= 10 && !isSelected ? 'opacity-30 cursor-not-allowed' : ''}
                      `}
                      style={{
                        left: `${offsetX}%`,
                        zIndex: isSelected ? 100 : cardIndex,
                      }}
                    >
                      {/* Card Back */}
                      <div className={`
                        w-12 h-20 md:w-14 md:h-24 rounded
                        flex items-center justify-center
                        border transition-all shadow-md
                        ${isSelected
                          ? isDarkMode
                            ? 'border-white bg-gray-800 shadow-white/20'
                            : 'border-gray-900 bg-white shadow-gray-900/20'
                          : isDarkMode
                            ? 'border-gray-700 bg-gray-900'
                            : 'border-gray-300 bg-gray-100'
                        }
                      `}>
                        <div className={`absolute inset-1.5 border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} rounded-sm`} />
                        <div className={`text-base ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`}>✦</div>

                        {/* Selection Order Badge */}
                        {isSelected && (
                          <div className={`
                            absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs font-medium
                            flex items-center justify-center shadow-lg
                            ${isDarkMode ? 'bg-white text-black' : 'bg-gray-900 text-white'}
                          `}>
                            {selectionOrder}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={cancelSelection}
            disabled={selectedCardIds.length === 0}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-full font-light tracking-wide transition-all
              border
              ${selectedCardIds.length === 0
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:scale-105'
              }
              ${isDarkMode
                ? 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-300'
                : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700'
              }
            `}
          >
            <X className="w-4 h-4" />
            {language === 'th' ? 'ยกเลิก' : 'Cancel'}
          </button>

          <button
            onClick={confirmSelection}
            disabled={selectedCardIds.length !== 10}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-full font-light tracking-wide transition-all
              ${selectedCardIds.length !== 10
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:scale-105'
              }
              ${isDarkMode
                ? 'bg-white text-black hover:bg-gray-200'
                : 'bg-gray-900 text-white hover:bg-gray-800'
              }
            `}
          >
            <Check className="w-4 h-4" />
            {language === 'th' ? 'ยืนยัน' : 'Confirm'}
          </button>
        </div>
      </div>
    );
  };

  // Celtic Cross Result Layout
  const CelticCrossResult = () => {
    if (drawnCards.length !== 10) return null;

    const positions = language === 'th' ? celticCrossPositions.th : celticCrossPositions.en;

    return (
      <div className="space-y-16">
        {/* Section 1: Celtic Cross Layout */}
        <div>
          <h3 className={`text-xl font-light tracking-wide text-center mb-10 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {language === 'th' ? 'ไพ่ของคุณ' : 'Your Cards'}
          </h3>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
            {/* Cross Section */}
            <div className="relative w-[280px] h-[360px] md:w-[340px] md:h-[430px]">
              {/* Card 1 - Present (Center) */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="text-center">
                  <div className={`relative w-16 h-28 md:w-20 md:h-32 rounded overflow-hidden border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} ${drawnCards[0].isReversed ? 'rotate-180' : ''}`}>
                    <Image src={drawnCards[0].card.image} alt={drawnCards[0].card.name} fill className="object-cover" />
                  </div>
                  <span className={`text-xs mt-2 block font-light ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>1</span>
                </div>
              </div>

              {/* Card 2 - Challenge (Crossing) */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rotate-90">
                <div className={`relative w-16 h-28 md:w-20 md:h-32 rounded overflow-hidden border ${isDarkMode ? 'border-gray-500' : 'border-gray-400'} ${drawnCards[1].isReversed ? 'rotate-180' : ''}`}>
                  <Image src={drawnCards[1].card.image} alt={drawnCards[1].card.name} fill className="object-cover" />
                </div>
              </div>

              {/* Card 3 - Past (Left) */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2">
                <div className="text-center">
                  <div className={`relative w-16 h-28 md:w-20 md:h-32 rounded overflow-hidden border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} ${drawnCards[2].isReversed ? 'rotate-180' : ''}`}>
                    <Image src={drawnCards[2].card.image} alt={drawnCards[2].card.name} fill className="object-cover" />
                  </div>
                  <span className={`text-xs mt-2 block font-light ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>3</span>
                </div>
              </div>

              {/* Card 4 - Future (Right) */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2">
                <div className="text-center">
                  <div className={`relative w-16 h-28 md:w-20 md:h-32 rounded overflow-hidden border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} ${drawnCards[3].isReversed ? 'rotate-180' : ''}`}>
                    <Image src={drawnCards[3].card.image} alt={drawnCards[3].card.name} fill className="object-cover" />
                  </div>
                  <span className={`text-xs mt-2 block font-light ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>4</span>
                </div>
              </div>

              {/* Card 5 - Above (Top) */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2">
                <div className="text-center">
                  <div className={`relative w-16 h-28 md:w-20 md:h-32 rounded overflow-hidden border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} ${drawnCards[4].isReversed ? 'rotate-180' : ''}`}>
                    <Image src={drawnCards[4].card.image} alt={drawnCards[4].card.name} fill className="object-cover" />
                  </div>
                  <span className={`text-xs mt-2 block font-light ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>5</span>
                </div>
              </div>

              {/* Card 6 - Below (Bottom) */}
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
                <div className="text-center">
                  <div className={`relative w-16 h-28 md:w-20 md:h-32 rounded overflow-hidden border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} ${drawnCards[5].isReversed ? 'rotate-180' : ''}`}>
                    <Image src={drawnCards[5].card.image} alt={drawnCards[5].card.name} fill className="object-cover" />
                  </div>
                  <span className={`text-xs mt-2 block font-light ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>6</span>
                </div>
              </div>
            </div>

            {/* Staff Section (4 cards in column) */}
            <div className="flex flex-row lg:flex-col gap-3 lg:gap-4">
              {[6, 7, 8, 9].map((index) => (
                <div key={index} className="text-center">
                  <div className={`relative w-16 h-28 md:w-20 md:h-32 rounded overflow-hidden border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} ${drawnCards[index].isReversed ? 'rotate-180' : ''}`}>
                    <Image src={drawnCards[index].card.image} alt={drawnCards[index].card.name} fill className="object-cover" />
                  </div>
                  <span className={`text-xs mt-2 block font-light ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{index + 1}</span>
                </div>
              ))}
            </div>

            {/* Position Legend */}
            <div className={`hidden xl:block p-6 rounded-lg ${isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-gray-50 border border-gray-200'}`}>
              <h4 className={`font-light tracking-wide mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {language === 'th' ? 'ตำแหน่งไพ่' : 'Card Positions'}
              </h4>
              <div className="space-y-3 text-sm">
                {positions.map((pos, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>
                      {i + 1}
                    </span>
                    <span className={`font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{pos.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={`border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`} />

        {/* Section 2: Interpretations List */}
        <div className="space-y-6">
          <h3 className={`text-xl font-light tracking-wide text-center mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {language === 'th' ? 'คำทำนาย' : 'Interpretation'}
          </h3>

          {drawnCards.map((drawn, index) => (
            <div
              key={index}
              className={`
                p-6 md:p-8 rounded-lg border
                ${isDarkMode ? 'bg-gray-900/30 border-gray-800' : 'bg-white border-gray-200'}
              `}
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Card Image */}
                <div className="flex-shrink-0 flex justify-center md:justify-start">
                  <div className="text-center">
                    <div className={`relative w-20 h-32 md:w-24 md:h-40 rounded overflow-hidden border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} ${drawn.isReversed ? 'rotate-180' : ''}`}>
                      <Image
                        src={drawn.card.image}
                        alt={drawn.card.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className={`text-xs mt-2 block font-light ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      {index + 1}
                    </span>
                  </div>
                </div>

                {/* Card Info */}
                <div className="flex-1">
                  {/* Position Title */}
                  <div className={`inline-block px-3 py-1 rounded text-xs font-light tracking-wide mb-3 ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                    {positions[index].title}
                  </div>

                  {/* Position Description */}
                  <p className={`text-xs mb-4 font-light ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                    {positions[index].desc}
                  </p>

                  {/* Card Name */}
                  <h4 className={`text-lg font-light tracking-wide mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {language === 'th' ? drawn.card.nameTh : drawn.card.name}
                    {drawn.isReversed && (
                      <span className={`ml-2 text-sm font-light ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        ({language === 'th' ? 'กลับหัว' : 'Reversed'})
                      </span>
                    )}
                  </h4>

                  {/* Meaning */}
                  <p className={`text-sm md:text-base font-light leading-relaxed mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {drawn.isReversed
                      ? (language === 'th' ? drawn.card.meaningReversedTh : drawn.card.meaningReversed)
                      : (language === 'th' ? drawn.card.meaningUprightTh : drawn.card.meaningUpright)}
                  </p>

                  {/* Keywords */}
                  <div className="flex flex-wrap gap-2">
                    {(language === 'th' ? drawn.card.keywordsTh : drawn.card.keywords).map((keyword, kIndex) => (
                      <span
                        key={kIndex}
                        className={`
                          px-2 py-1 rounded text-xs font-light
                          ${isDarkMode ? 'bg-gray-800/50 text-gray-500' : 'bg-gray-100 text-gray-500'}
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
      </div>
    );
  };

  // Standard Reading Result (for single, three-card, yes-no)
  const StandardReadingResult = () => {
    return (
      <div className="max-w-4xl mx-auto">
        {/* Spread Title */}
        <div className="text-center mb-10">
          <h2 className={`text-2xl md:text-3xl font-light tracking-wide mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {language === 'th' ? currentSpread?.nameTh : currentSpread?.name}
          </h2>
          <p className={`text-sm font-light ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            {!allRevealed
              ? (language === 'th' ? 'คลิกที่ไพ่เพื่อเปิด' : 'Click on the cards to reveal them')
              : (language === 'th' ? 'การดูดวงเสร็จสมบูรณ์' : 'Your reading is complete')}
          </p>
        </div>

        {/* Cards */}
        <div className={`
          flex flex-wrap justify-center gap-6 md:gap-8 mb-16
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
              positionTh={currentSpread?.positionsTh[index]}
              isDarkMode={isDarkMode}
              size={selectedSpread === 'single' || selectedSpread === 'yes-no' ? 'large' : 'medium'}
            />
          ))}
        </div>

        {/* Card Meanings */}
        {allRevealed && (
          <div className="space-y-6">
            <div className={`border-t mb-10 ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`} />
            <h3 className={`text-xl font-light tracking-wide text-center mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {language === 'th' ? 'คำทำนาย' : 'Interpretation'}
            </h3>
            {drawnCards.map((drawn, index) => (
              <div
                key={index}
                className={`
                  p-6 md:p-8 rounded-lg border
                  ${isDarkMode ? 'bg-gray-900/30 border-gray-800' : 'bg-white border-gray-200'}
                `}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 flex justify-center md:justify-start">
                    <div className={`relative w-20 h-32 md:w-24 md:h-40 rounded overflow-hidden border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} ${drawn.isReversed ? 'rotate-180' : ''}`}>
                      <Image
                        src={drawn.card.image}
                        alt={drawn.card.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className={`inline-block px-3 py-1 rounded text-xs font-light tracking-wide mb-3 ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                      {language === 'th' ? currentSpread?.positionsTh[index] : currentSpread?.positions[index]}
                    </div>
                    <h4 className={`text-lg font-light tracking-wide mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {language === 'th' ? drawn.card.nameTh : drawn.card.name}
                      {drawn.isReversed && (
                        <span className={`ml-2 text-sm font-light ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          ({language === 'th' ? 'กลับหัว' : 'Reversed'})
                        </span>
                      )}
                    </h4>
                    <p className={`text-sm md:text-base font-light leading-relaxed mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {drawn.isReversed
                        ? (language === 'th' ? drawn.card.meaningReversedTh : drawn.card.meaningReversed)
                        : (language === 'th' ? drawn.card.meaningUprightTh : drawn.card.meaningUpright)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(language === 'th' ? drawn.card.keywordsTh : drawn.card.keywords).map((keyword, kIndex) => (
                        <span
                          key={kIndex}
                          className={`px-2 py-1 rounded text-xs font-light ${isDarkMode ? 'bg-gray-800/50 text-gray-500' : 'bg-gray-100 text-gray-500'}`}
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
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b ${isDarkMode ? 'bg-black/80 border-gray-800' : 'bg-white/80 border-gray-200'}`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className={`flex items-center gap-2 hover:opacity-60 transition-opacity ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-light tracking-wide hidden sm:inline">
              {language === 'th' ? 'กลับ' : 'Back'}
            </span>
          </Link>

          <h1 className="text-lg font-light tracking-widest flex items-center gap-2 uppercase">
            <Sparkles className="w-4 h-4" />
            Tarot
          </h1>

          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-light transition-all
                  border
                  ${isDarkMode
                    ? 'border-gray-800 hover:border-gray-700 bg-gray-900/50'
                    : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                  }
                `}
              >
                <span className="text-base">{languages.find(l => l.code === language)?.flag}</span>
                <span className="hidden sm:inline">{languages.find(l => l.code === language)?.name}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
              </button>

              {showLangMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowLangMenu(false)}
                  />
                  <div className={`
                    absolute right-0 top-full mt-2 py-1 rounded-lg shadow-xl z-50 min-w-[120px]
                    border
                    ${isDarkMode
                      ? 'bg-gray-900 border-gray-800'
                      : 'bg-white border-gray-200'
                    }
                  `}>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setShowLangMenu(false);
                        }}
                        className={`
                          w-full flex items-center gap-2 px-4 py-2 text-sm font-light transition-colors
                          ${language === lang.code
                            ? isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                            : ''
                          }
                          ${isDarkMode
                            ? 'hover:bg-gray-800 text-gray-300'
                            : 'hover:bg-gray-100 text-gray-700'
                          }
                        `}
                      >
                        <span className="text-base">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-100'}`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Spread Selection */}
        {gamePhase === 'select-spread' && (
          <div className="max-w-xl mx-auto text-center">
            <div className="mb-16">
              <h2 className={`text-3xl md:text-4xl font-light tracking-wide mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {language === 'th' ? 'เลือกรูปแบบ' : 'Choose Spread'}
              </h2>
              <p className={`font-light ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                {language === 'th'
                  ? 'เลือกรูปแบบไพ่เพื่อเริ่มต้น'
                  : 'Select a spread type to begin'}
              </p>
            </div>

            <div className="space-y-3">
              {spreadTypes.map((spread) => (
                <button
                  key={spread.id}
                  onClick={() => startReading(spread.id as SpreadType)}
                  className={`
                    w-full p-6 rounded-lg text-left transition-all
                    border
                    ${isDarkMode
                      ? 'border-gray-800 hover:border-gray-600 hover:bg-gray-900/50'
                      : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-lg font-light tracking-wide mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {language === 'th' ? spread.nameTh : spread.name}
                      </h3>
                      <p className={`text-sm font-light ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {language === 'th' ? spread.descriptionTh : spread.description}
                      </p>
                      {spread.id === 'celtic-cross' && (
                        <p className={`text-xs mt-2 font-light ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                          {language === 'th' ? '✦ เลือกไพ่ด้วยตัวเอง' : '✦ Pick your own cards'}
                        </p>
                      )}
                    </div>
                    <div className={`
                      px-3 py-1 rounded text-sm font-light
                      ${isDarkMode ? 'bg-gray-900 text-gray-400' : 'bg-gray-100 text-gray-600'}
                    `}>
                      {spread.cardCount}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <p className={`mt-16 text-xs font-light ${isDarkMode ? 'text-gray-700' : 'text-gray-400'}`}>
              {language === 'th'
                ? 'เพื่อความบันเทิงเท่านั้น'
                : 'For entertainment purposes only'}
            </p>
          </div>
        )}

        {/* Shuffling Animation */}
        {gamePhase === 'shuffling' && (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="relative">
              <div className={`animate-spin rounded-full h-12 w-12 border-2 ${isDarkMode ? 'border-gray-800 border-t-white' : 'border-gray-200 border-t-gray-900'}`} />
            </div>
            <p className={`mt-8 text-sm font-light tracking-wide ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              {language === 'th' ? 'กำลังสับไพ่...' : 'Shuffling...'}
            </p>
          </div>
        )}

        {/* Card Selection (Celtic Cross) */}
        {gamePhase === 'selecting-cards' && selectedSpread === 'celtic-cross' && (
          <CardSelectionGrid />
        )}

        {/* Reading Results */}
        {gamePhase === 'reading' && (
          <div className="max-w-6xl mx-auto">
            {selectedSpread === 'celtic-cross' ? (
              <CelticCrossResult />
            ) : (
              <StandardReadingResult />
            )}

            {/* Reset Button */}
            <div className="flex justify-center mt-16">
              <button
                onClick={resetReading}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-full font-light tracking-wide transition-all hover:scale-105
                  border
                  ${isDarkMode
                    ? 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
                    : 'border-gray-300 text-gray-600 hover:border-gray-500 hover:text-gray-900'
                  }
                `}
              >
                <RotateCcw className="w-4 h-4" />
                {language === 'th' ? 'เริ่มใหม่' : 'Start Over'}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`py-8 text-center text-xs font-light tracking-wide ${isDarkMode ? 'text-gray-700' : 'text-gray-400'}`}>
        <p>Nut Prohmpiriya</p>
      </footer>
    </div>
  );
}
