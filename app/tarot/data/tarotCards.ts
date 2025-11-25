export interface TarotCard {
  id: number;
  name: string;
  nameEn: string;
  arcana: 'major' | 'minor';
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
  number?: number;
  keywords: string[];
  meaningUpright: string;
  meaningReversed: string;
  image: string;
}

// Major Arcana (22 cards)
export const majorArcana: TarotCard[] = [
  {
    id: 0,
    name: 'The Fool',
    nameEn: 'The Fool',
    arcana: 'major',
    keywords: ['beginnings', 'innocence', 'spontaneity', 'free spirit'],
    meaningUpright: 'New beginnings, optimism, trust in life. Take a leap of faith and embrace new adventures.',
    meaningReversed: 'Holding back, recklessness, risk-taking without thought.',
    image: '/tarot/major/00-fool.jpg',
  },
  {
    id: 1,
    name: 'The Magician',
    nameEn: 'The Magician',
    arcana: 'major',
    keywords: ['manifestation', 'resourcefulness', 'power', 'inspired action'],
    meaningUpright: 'You have all the tools and resources you need. Time to manifest your desires into reality.',
    meaningReversed: 'Manipulation, poor planning, untapped talents.',
    image: '/tarot/major/01-magician.jpg',
  },
  {
    id: 2,
    name: 'The High Priestess',
    nameEn: 'The High Priestess',
    arcana: 'major',
    keywords: ['intuition', 'sacred knowledge', 'divine feminine', 'subconscious'],
    meaningUpright: 'Trust your intuition. The answers you seek are within. Pay attention to your dreams.',
    meaningReversed: 'Secrets, disconnected from intuition, withdrawal.',
    image: '/tarot/major/02-high-priestess.jpg',
  },
  {
    id: 3,
    name: 'The Empress',
    nameEn: 'The Empress',
    arcana: 'major',
    keywords: ['femininity', 'beauty', 'nature', 'nurturing', 'abundance'],
    meaningUpright: 'Abundance and creativity flow to you. Nurture yourself and others. Connect with nature.',
    meaningReversed: 'Creative block, dependence on others, emptiness.',
    image: '/tarot/major/03-empress.jpg',
  },
  {
    id: 4,
    name: 'The Emperor',
    nameEn: 'The Emperor',
    arcana: 'major',
    keywords: ['authority', 'structure', 'control', 'fatherhood'],
    meaningUpright: 'Take charge of your life. Establish structure and order. Leadership is needed.',
    meaningReversed: 'Domination, excessive control, lack of discipline.',
    image: '/tarot/major/04-emperor.jpg',
  },
  {
    id: 5,
    name: 'The Hierophant',
    nameEn: 'The Hierophant',
    arcana: 'major',
    keywords: ['spiritual wisdom', 'tradition', 'conformity', 'morality'],
    meaningUpright: 'Seek guidance from a mentor. Honor traditions and established systems.',
    meaningReversed: 'Personal beliefs, freedom, challenging the status quo.',
    image: '/tarot/major/05-hierophant.jpg',
  },
  {
    id: 6,
    name: 'The Lovers',
    nameEn: 'The Lovers',
    arcana: 'major',
    keywords: ['love', 'harmony', 'relationships', 'choices', 'alignment'],
    meaningUpright: 'Important choices in relationships. Harmony and union. Follow your heart.',
    meaningReversed: 'Self-love, disharmony, imbalance, misalignment.',
    image: '/tarot/major/06-lovers.jpg',
  },
  {
    id: 7,
    name: 'The Chariot',
    nameEn: 'The Chariot',
    arcana: 'major',
    keywords: ['control', 'willpower', 'success', 'action', 'determination'],
    meaningUpright: 'Victory through determination. Take control and move forward with confidence.',
    meaningReversed: 'Self-discipline issues, opposition, lack of direction.',
    image: '/tarot/major/07-chariot.jpg',
  },
  {
    id: 8,
    name: 'Strength',
    nameEn: 'Strength',
    arcana: 'major',
    keywords: ['strength', 'courage', 'patience', 'control', 'compassion'],
    meaningUpright: 'Inner strength and courage. Patience and compassion will overcome obstacles.',
    meaningReversed: 'Self-doubt, weakness, insecurity.',
    image: '/tarot/major/08-strength.jpg',
  },
  {
    id: 9,
    name: 'The Hermit',
    nameEn: 'The Hermit',
    arcana: 'major',
    keywords: ['soul-searching', 'introspection', 'solitude', 'guidance'],
    meaningUpright: 'Time for introspection. Seek inner wisdom through solitude and reflection.',
    meaningReversed: 'Isolation, loneliness, withdrawal.',
    image: '/tarot/major/09-hermit.jpg',
  },
  {
    id: 10,
    name: 'Wheel of Fortune',
    nameEn: 'Wheel of Fortune',
    arcana: 'major',
    keywords: ['good luck', 'karma', 'life cycles', 'destiny', 'turning point'],
    meaningUpright: 'Change is coming. The wheel turns in your favor. Embrace the cycles of life.',
    meaningReversed: 'Bad luck, resistance to change, breaking cycles.',
    image: '/tarot/major/10-wheel-of-fortune.jpg',
  },
  {
    id: 11,
    name: 'Justice',
    nameEn: 'Justice',
    arcana: 'major',
    keywords: ['justice', 'fairness', 'truth', 'cause and effect', 'law'],
    meaningUpright: 'Truth and fairness prevail. Take responsibility for your actions.',
    meaningReversed: 'Unfairness, lack of accountability, dishonesty.',
    image: '/tarot/major/11-justice.jpg',
  },
  {
    id: 12,
    name: 'The Hanged Man',
    nameEn: 'The Hanged Man',
    arcana: 'major',
    keywords: ['pause', 'surrender', 'letting go', 'new perspectives'],
    meaningUpright: 'Pause and reflect. See things from a different perspective. Let go of control.',
    meaningReversed: 'Delays, resistance, stalling, indecision.',
    image: '/tarot/major/12-hanged-man.jpg',
  },
  {
    id: 13,
    name: 'Death',
    nameEn: 'Death',
    arcana: 'major',
    keywords: ['endings', 'change', 'transformation', 'transition'],
    meaningUpright: 'Transformation and new beginnings. End of a chapter. Embrace change.',
    meaningReversed: 'Resistance to change, personal transformation, inner purging.',
    image: '/tarot/major/13-death.jpg',
  },
  {
    id: 14,
    name: 'Temperance',
    nameEn: 'Temperance',
    arcana: 'major',
    keywords: ['balance', 'moderation', 'patience', 'purpose'],
    meaningUpright: 'Balance and moderation are key. Patience will lead to harmony.',
    meaningReversed: 'Imbalance, excess, self-healing, re-alignment.',
    image: '/tarot/major/14-temperance.jpg',
  },
  {
    id: 15,
    name: 'The Devil',
    nameEn: 'The Devil',
    arcana: 'major',
    keywords: ['shadow self', 'attachment', 'addiction', 'restriction'],
    meaningUpright: 'Examine your attachments. Break free from self-imposed limitations.',
    meaningReversed: 'Releasing limiting beliefs, exploring dark thoughts, detachment.',
    image: '/tarot/major/15-devil.jpg',
  },
  {
    id: 16,
    name: 'The Tower',
    nameEn: 'The Tower',
    arcana: 'major',
    keywords: ['sudden change', 'upheaval', 'chaos', 'revelation', 'awakening'],
    meaningUpright: 'Sudden upheaval clears the way for new growth. Embrace the shake-up.',
    meaningReversed: 'Personal transformation, fear of change, averting disaster.',
    image: '/tarot/major/16-tower.jpg',
  },
  {
    id: 17,
    name: 'The Star',
    nameEn: 'The Star',
    arcana: 'major',
    keywords: ['hope', 'faith', 'purpose', 'renewal', 'spirituality'],
    meaningUpright: 'Hope and inspiration. Healing and renewal. Trust in the universe.',
    meaningReversed: 'Lack of faith, despair, self-trust, disconnection.',
    image: '/tarot/major/17-star.jpg',
  },
  {
    id: 18,
    name: 'The Moon',
    nameEn: 'The Moon',
    arcana: 'major',
    keywords: ['illusion', 'fear', 'anxiety', 'subconscious', 'intuition'],
    meaningUpright: 'Trust your intuition through uncertainty. Not everything is as it seems.',
    meaningReversed: 'Release of fear, repressed emotion, inner confusion.',
    image: '/tarot/major/18-moon.jpg',
  },
  {
    id: 19,
    name: 'The Sun',
    nameEn: 'The Sun',
    arcana: 'major',
    keywords: ['positivity', 'fun', 'warmth', 'success', 'vitality'],
    meaningUpright: 'Joy, success, and vitality. Everything is going your way. Celebrate!',
    meaningReversed: 'Inner child, feeling down, overly optimistic.',
    image: '/tarot/major/19-sun.jpg',
  },
  {
    id: 20,
    name: 'Judgement',
    nameEn: 'Judgement',
    arcana: 'major',
    keywords: ['judgement', 'rebirth', 'inner calling', 'absolution'],
    meaningUpright: 'Time for self-evaluation. Answer your higher calling. Rebirth awaits.',
    meaningReversed: 'Self-doubt, inner critic, ignoring the call.',
    image: '/tarot/major/20-judgement.jpg',
  },
  {
    id: 21,
    name: 'The World',
    nameEn: 'The World',
    arcana: 'major',
    keywords: ['completion', 'integration', 'accomplishment', 'travel'],
    meaningUpright: 'Completion of a major cycle. Achievement and fulfillment. The world is yours.',
    meaningReversed: 'Seeking personal closure, short-cuts, delays.',
    image: '/tarot/major/21-world.jpg',
  },
];

// For simplicity, we'll use only Major Arcana for the gimmick version
// Full deck would include 56 Minor Arcana cards (Wands, Cups, Swords, Pentacles)

export const allTarotCards = [...majorArcana];

export const getRandomCards = (count: number): TarotCard[] => {
  const shuffled = [...allTarotCards].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const spreadTypes = [
  {
    id: 'single',
    name: 'Single Card',
    description: 'Quick insight for your question',
    cardCount: 1,
    positions: ['Your Answer'],
  },
  {
    id: 'three-card',
    name: 'Past, Present, Future',
    description: 'Understanding your timeline',
    cardCount: 3,
    positions: ['Past', 'Present', 'Future'],
  },
  {
    id: 'yes-no',
    name: 'Yes or No',
    description: 'Simple answer to your question',
    cardCount: 1,
    positions: ['Answer'],
  },
];
