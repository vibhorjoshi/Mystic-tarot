import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Star, Clock, Coins, BookOpen, Play, Trophy, Sparkles, CreditCard, Brain, Eye, Heart } from 'lucide-react';

// Tarot card data
const tarotCards = {
  major: [
    { id: 0, name: "The Fool", meaning: "New beginnings, innocence, spontaneity", reversed: "Recklessness, taken advantage of, inconsideration" },
    { id: 1, name: "The Magician", meaning: "Willpower, desire, creation, manifestation", reversed: "Trickery, illusions, out of touch" },
    { id: 2, name: "The High Priestess", meaning: "Intuitive, unconscious, inner voice", reversed: "Lack of center, lost inner voice, repressed feelings" },
    { id: 3, name: "The Empress", meaning: "Motherhood, fertility, nature", reversed: "Dependence, smothering, emptiness, nosiness" },
    { id: 4, name: "The Emperor", meaning: "Authority, structure, control, father", reversed: "Tyranny, rigidity, coldness" },
    { id: 5, name: "The Hierophant", meaning: "Tradition, conformity, morality, ethics", reversed: "Rebellion, subversiveness, new approaches" },
    { id: 6, name: "The Lovers", meaning: "Partnerships, duality, union", reversed: "Loss of balance, one-sidedness, disharmony" },
    { id: 7, name: "The Chariot", meaning: "Direction, control, willpower", reversed: "Lack of control, lack of direction, aggression" },
    { id: 8, name: "Strength", meaning: "Inner strength, bravery, compassion", reversed: "Self doubt, weakness, insecurity" },
    { id: 9, name: "The Hermit", meaning: "Soul searching, introspection, inner guidance", reversed: "Isolation, loneliness, withdrawal" },
    { id: 10, name: "Wheel of Fortune", meaning: "Good luck, karma, life cycles", reversed: "Bad luck, lack of control, clinging to control" },
    { id: 11, name: "Justice", meaning: "Justice, fairness, truth, cause and effect", reversed: "Unfairness, lack of accountability, dishonesty" },
    { id: 12, name: "The Hanged Man", meaning: "Sacrifice, release, martyrdom", reversed: "Indecision, delay, resistance to change" },
    { id: 13, name: "Death", meaning: "Transformation, endings, change", reversed: "Resistance to change, personal transformation, inner purging" },
    { id: 14, name: "Temperance", meaning: "Balance, moderation, patience", reversed: "Imbalance, excess, self-healing" },
    { id: 15, name: "The Devil", meaning: "Bondage, addiction, sexuality", reversed: "Independence, freedom, revelation" },
    { id: 16, name: "The Tower", meaning: "Sudden upheaval, broken pride, disaster", reversed: "Disaster avoided, delayed disaster, fear of suffering" },
    { id: 17, name: "The Star", meaning: "Hope, faith, rejuvenation", reversed: "Faithlessness, discouragement, insecurity" },
    { id: 18, name: "The Moon", meaning: "Unconscious, illusions, intuition", reversed: "Confusion, fear, misinterpretation" },
    { id: 19, name: "The Sun", meaning: "Joy, success, celebration, positivity", reversed: "Negativity, depression, sadness" },
    { id: 20, name: "Judgement", meaning: "Reflection, reckoning, awakening", reversed: "Lack of self awareness, doubt, self loathing" },
    { id: 21, name: "The World", meaning: "Fulfillment, harmony, completion", reversed: "Incompletion, no closure" }
  ],
  minor: [
    // Wands
    { id: 22, name: "Ace of Wands", suit: "Wands", meaning: "Creative spark, new initiative, fresh energy", reversed: "Delays, lack of motivation, weighed down" },
    { id: 23, name: "Two of Wands", suit: "Wands", meaning: "Planning, making decisions, leaving comfort zone", reversed: "Fear of change, playing it safe, bad planning" },
    { id: 24, name: "Three of Wands", suit: "Wands", meaning: "Looking ahead, expansion, rapid growth", reversed: "Obstacles, delays, frustration" },
    { id: 25, name: "Four of Wands", suit: "Wands", meaning: "Community, home, celebration", reversed: "Lack of support, transience, home conflicts" },
    { id: 26, name: "Five of Wands", suit: "Wands", meaning: "Competition, rivalry, conflict", reversed: "Avoiding conflict, respecting differences" },
    { id: 27, name: "Six of Wands", suit: "Wands", meaning: "Victory, public recognition, progress", reversed: "Private achievement, personal definition of success" },
    { id: 28, name: "Seven of Wands", suit: "Wands", meaning: "Perseverance, defensive, maintaining control", reversed: "Give up, destroyed confidence, overwhelmed" },
    { id: 29, name: "Eight of Wands", suit: "Wands", meaning: "Swift action, rapid progress, news", reversed: "Delays, frustration, resisting change" },
    { id: 30, name: "Nine of Wands", suit: "Wands", meaning: "Resilience, persistence, test of faith", reversed: "Inner resources, struggle, overwhelm" },
    { id: 31, name: "Ten of Wands", suit: "Wands", meaning: "Accomplishment, responsibility, burden", reversed: "Unable to delegate, overstressed, burnt out" },
    { id: 32, name: "Page of Wands", suit: "Wands", meaning: "Exploration, excitement, freedom", reversed: "Lack of direction, procrastination, creating conflict" },
    { id: 33, name: "Knight of Wands", suit: "Wands", meaning: "Action, adventure, fearlessness", reversed: "Anger, impulsiveness, recklessness" },
    { id: 34, name: "Queen of Wands", suit: "Wands", meaning: "Courage, determination, independence", reversed: "Self-respect, self-confidence, intolerance" },
    { id: 35, name: "King of Wands", suit: "Wands", meaning: "Big picture, leader, overcoming challenges", reversed: "Impulsive, overbearing, unachievable expectations" },
    
    // Cups
    { id: 36, name: "Ace of Cups", suit: "Cups", meaning: "New love, emotional awakening, creativity", reversed: "Emotional loss, blocked creativity, emptiness" },
    { id: 37, name: "Two of Cups", suit: "Cups", meaning: "Unity, partnership, connection", reversed: "Imbalance, broken communication, tension" },
    { id: 38, name: "Three of Cups", suit: "Cups", meaning: "Friendship, community, happiness", reversed: "Overindulgence, gossip, isolation" },
    { id: 39, name: "Four of Cups", suit: "Cups", meaning: "Apathy, contemplation, disconnectedness", reversed: "Sudden awareness, choosing happiness, acceptance" },
    { id: 40, name: "Five of Cups", suit: "Cups", meaning: "Loss, grief, self-pity", reversed: "Acceptance, moving on, finding peace" },
    { id: 41, name: "Six of Cups", suit: "Cups", meaning: "Familiarity, happy memories, healing", reversed: "Moving forward, leaving home, independence" },
    { id: 42, name: "Seven of Cups", suit: "Cups", meaning: "searching for purpose, choices, wishful thinking", reversed: "Lack of purpose, diversion, confusion" },
    { id: 43, name: "Eight of Cups", suit: "Cups", meaning: "Walking away, disillusionment, leaving behind", reversed: "Avoidance, fear of change, either stagnation or try again" },
    { id: 44, name: "Nine of Cups", suit: "Cups", meaning: "Satisfaction, emotional stability, luxury", reversed: "Lack of inner joy, smugness, dissatisfaction" },
    { id: 45, name: "Ten of Cups", suit: "Cups", meaning: "Inner happiness, fulfillment, dreams coming true", reversed: "Shattered dreams, broken family, bad relationships" },
    { id: 46, name: "Page of Cups", suit: "Cups", meaning: "Creative opportunities, intuitive messages, curiosity", reversed: "New ideas, doubting intuition, creative blocks" },
    { id: 47, name: "Knight of Cups", suit: "Cups", meaning: "Following the heart, idealist, romantic", reversed: "Moodiness, disappointment" },
    { id: 48, name: "Queen of Cups", suit: "Cups", meaning: "Compassion, calm, comfort", reversed: "Martyrdom, insecurity, dependence" },
    { id: 49, name: "King of Cups", suit: "Cups", meaning: "Compassion, control, balance", reversed: "Coldness, moodiness, bad advice" },
    
    // Swords  
    { id: 50, name: "Ace of Swords", suit: "Swords", meaning: "New ideas, mental clarity, breakthrough", reversed: "Confusion, miscommunication, hostility" },
    { id: 51, name: "Two of Swords", suit: "Swords", meaning: "Difficult choices, indecision, stalemate", reversed: "Lesser of two evils, no right choice, confusion" },
    { id: 52, name: "Three of Swords", suit: "Swords", meaning: "Heartbreak, betrayal, grief", reversed: "Recovery, forgiveness, moving on" },
    { id: 53, name: "Four of Swords", suit: "Swords", meaning: "Rest, restoration, contemplation", reversed: "Restlessness, burnout, stress" },
    { id: 54, name: "Five of Swords", suit: "Swords", meaning: "Unbridled ambition, win at all costs, sneakiness", reversed: "Lingering resentment, desire to reconcile, forgiveness" },
    { id: 55, name: "Six of Swords", suit: "Swords", meaning: "Transition, leaving behind, moving on", reversed: "Cannot move on, carrying baggage" },
    { id: 56, name: "Seven of Swords", suit: "Swords", meaning: "Deception, trickery, tactics and strategy", reversed: "Coming clean, rethinking approach, deception" },
    { id: 57, name: "Eight of Swords", suit: "Swords", meaning: "Imprisonment, entrapment, self-victimization", reversed: "Self-acceptance, new perspective, freedom" },
    { id: 58, name: "Nine of Swords", suit: "Swords", meaning: "Anxiety, worry, fear", reversed: "Hope, reaching out, despair" },
    { id: 59, name: "Ten of Swords", suit: "Swords", meaning: "Failure, collapse, defeat", reversed: "Can't get worse, only upward, inevitable end" },
    { id: 60, name: "Page of Swords", suit: "Swords", meaning: "Curiosity, restlessness, mental energy", reversed: "Deception, manipulation, all talk" },
    { id: 61, name: "Knight of Swords", suit: "Swords", meaning: "Driven, fast-thinking, opinionated", reversed: "Impulsive, burn out, scattered" },
    { id: 62, name: "Queen of Swords", suit: "Swords", meaning: "Complexity, perceptive, clear mindedness", reversed: "Cold hearted, cruel, bitterness" },
    { id: 63, name: "King of Swords", suit: "Swords", meaning: "Head over heart, discipline, truth", reversed: "Manipulative, cruel, weakness" },
    
    // Pentacles
    { id: 64, name: "Ace of Pentacles", suit: "Pentacles", meaning: "Opportunity, prosperity, new venture", reversed: "Lost opportunity, missed chance, bad investment" },
    { id: 65, name: "Two of Pentacles", suit: "Pentacles", meaning: "Balancing decisions, priorities, adapting to change", reversed: "Loss of balance, disorganized, overwhelmed" },
    { id: 66, name: "Three of Pentacles", suit: "Pentacles", meaning: "Teamwork, collaboration, building", reversed: "Lack of teamwork, disorganized, group conflict" },
    { id: 67, name: "Four of Pentacles", suit: "Pentacles", meaning: "Conservation, frugality, security", reversed: "Greediness, stinginess, possessiveness" },
    { id: 68, name: "Five of Pentacles", suit: "Pentacles", meaning: "Need, poverty, insecurity", reversed: "Recovery, charity, improvement" },
    { id: 69, name: "Six of Pentacles", suit: "Pentacles", meaning: "Charity, generosity, sharing", reversed: "Selfishness, fake charity, ingratitude" },
    { id: 70, name: "Seven of Pentacles", suit: "Pentacles", meaning: "Hard work, perseverance, diligence", reversed: "Work without results, distractions, lack of rewards" },
    { id: 71, name: "Eight of Pentacles", suit: "Pentacles", meaning: "Apprenticeship, passion, high standards", reversed: "Low quality, lack of motivation, mediocrity" },
    { id: 72, name: "Nine of Pentacles", suit: "Pentacles", meaning: "fruits of labor, rewards, luxury", reversed: "Reckless spending, living beyond means, false success" },
    { id: 73, name: "Ten of Pentacles", suit: "Pentacles", meaning: "Legacy, culmination, inheritance", reversed: "Fleeting success, lack of stability, lack of resources" },
    { id: 74, name: "Page of Pentacles", suit: "Pentacles", meaning: "Ambition, desire, diligence", reversed: "Lack of commitment, greediness, laziness" },
    { id: 75, name: "Knight of Pentacles", suit: "Pentacles", meaning: "Efficiency, hard work, responsibility", reversed: "Laziness, obsessiveness, work without reward" },
    { id: 76, name: "Queen of Pentacles", suit: "Pentacles", meaning: "Practicality, creature comforts, financial security", reversed: "Self-centeredness, jealousy, smothering" },
    { id: 77, name: "King of Pentacles", suit: "Pentacles", meaning: "Abundance, prosperity, security", reversed: "Greed, indulgence, sensuality" }
  ]
};

const allCards = [...tarotCards.major, ...tarotCards.minor];

// AI Readers data
const aiReaders = [
  {
    id: 1,
    name: "Luna - AI Mystic",
    specialty: "General Readings",
    accuracy: "99%",
    description: "Advanced AI with deep tarot knowledge and intuitive insights",
    icon: <Brain className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    name: "Sage - Psychic Oracle",
    specialty: "Love & Relationships",
    accuracy: "99%",
    description: "Specialized in matters of the heart and spiritual connections",
    icon: <Heart className="w-6 h-6" />,
    color: "from-red-500 to-rose-500"
  },
  {
    id: 3,
    name: "Mystic - Soul Guide",
    specialty: "Career & Life Path",
    accuracy: "99%",
    description: "Expert guidance for life decisions and spiritual growth",
    icon: <Eye className="w-6 h-6" />,
    color: "from-blue-500 to-indigo-500"
  }
];

// Quiz questions
const quizQuestions = {
  easy: [
    { question: "How many cards are in a traditional tarot deck?", options: ["72", "78", "80", "84"], correct: 1 },
    { question: "What does The Fool card represent?", options: ["Endings", "New beginnings", "Bad luck", "Wisdom"], correct: 1 },
    { question: "Which suit represents emotions?", options: ["Wands", "Swords", "Cups", "Pentacles"], correct: 2 }
  ],
  medium: [
    { question: "What does The Tower card typically signify?", options: ["Success", "Love", "Sudden change", "Wealth"], correct: 2 },
    { question: "How many Major Arcana cards are there?", options: ["20", "21", "22", "23"], correct: 2 },
    { question: "What element is associated with Pentacles?", options: ["Fire", "Water", "Air", "Earth"], correct: 3 }
  ],
  hard: [
    { question: "What is the Hebrew letter associated with The Fool?", options: ["Aleph", "Beth", "Gimel", "Daleth"], correct: 0 },
    { question: "In the Rider-Waite deck, what flowers appear in The Magician card?", options: ["Roses", "Lilies", "Both roses and lilies", "Daisies"], correct: 2 },
    { question: "What does the reversed Hermit typically represent?", options: ["Isolation", "Inner guidance", "Loneliness", "Wisdom"], correct: 2 }
  ]
};

export default function AITarotApp() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedCards, setSelectedCards] = useState([]);
  const [isReading, setIsReading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [freeMinutesUsed, setFreeMinutesUsed] = useState(0);
  const [selectedReader, setSelectedReader] = useState(null);
  const [readingType, setReadingType] = useState('1-card');
  const [readingDuration, setReadingDuration] = useState(5);
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showCardDetail, setShowCardDetail] = useState(null);
  const [deck3D, setDeck3D] = useState(true);
  const [readingResult, setReadingResult] = useState(null);
  
  const rechargeOptions = [
    { minutes: 5, price: 100, popular: false },
    { minutes: 10, price: 200, popular: true, discount: "Save 10%" },
    { minutes: 20, price: 400, popular: false, discount: "Save 20%" },
    { minutes: 30, price: 550, popular: false, discount: "Save 30%" }
  ];

  // Card Selection Logic
  const selectCard = (cardId) => {
    if (selectedCards.length < (readingType === '3-card' ? 3 : 1)) {
      const card = allCards.find(c => c.id === cardId);
      const isReversed = Math.random() > 0.5;
      setSelectedCards([...selectedCards, { ...card, reversed: isReversed }]);
    }
  };

  // AI Reading Generation
  const generateReading = async (cards, reader) => {
    setIsReading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const readings = cards.map((card, index) => {
      const position = readingType === '3-card' 
        ? ['Past', 'Present', 'Future'][index]
        : 'Current Situation';
        
      const interpretation = `The ${card.name}${card.reversed ? ' (Reversed)' : ''} in the ${position} position reveals profound insights about your spiritual journey. ${card.reversed ? card.reversed : card.meaning}. 

${reader.name} senses that this card speaks to your current energy and the path ahead. The cosmic forces are aligning to bring clarity to your situation. Trust in the guidance being offered and remain open to the messages the universe is sending you.`;
      
      return { card, position, interpretation };
    });
    
    setReadingResult({ readings, reader });
    setIsReading(false);
  };

  // Quiz Logic
  const startQuiz = (difficulty) => {
    setCurrentQuiz({ difficulty, questions: quizQuestions[difficulty], score: 0 });
    setCurrentQuestionIndex(0);
  };

  const answerQuestion = (answerIndex) => {
    const isCorrect = answerIndex === currentQuiz.questions[currentQuestionIndex].correct;
    if (isCorrect) {
      setCurrentQuiz(prev => ({ ...prev, score: prev.score + 1 }));
    }
    
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed
      const finalScore = currentQuiz.score + (isCorrect ? 1 : 0);
      setQuizScore(finalScore);
      
      // Award discount based on performance
      let discount = 0;
      if (finalScore >= 8) discount = 20;
      else if (finalScore >= 6) discount = 15;
      else if (finalScore >= 4) discount = 10;
      
      alert(`Quiz completed! Score: ${finalScore}/10. ${discount > 0 ? `You earned a ${discount}% discount on your next reading!` : 'Better luck next time!'}`);
      setCurrentQuiz(null);
      setCurrentQuestionIndex(0);
    }
  };

  // 3D Card Display Component
  const Card3D = ({ card, onClick, isSelected }) => (
    <div 
      className={`relative w-16 h-24 mx-1 cursor-pointer transform transition-all duration-300 hover:scale-105 ${
        isSelected ? 'scale-110 z-10' : ''
      }`}
      style={{ 
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateY(${isSelected ? 180 : 0}deg)`
      }}
      onClick={() => onClick(card.id)}
    >
      {/* Card Back */}
      <div className={`absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-800 to-indigo-900 rounded-lg border-2 border-yellow-400 ${
        isSelected ? 'opacity-0' : 'opacity-100'
      } transition-opacity duration-500`}>
        <div className="w-full h-full flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-yellow-300" />
        </div>
      </div>
      
      {/* Card Front */}
      {isSelected && (
        <div className="absolute inset-0 bg-white rounded-lg border-2 border-yellow-400 p-2 opacity-100 transition-opacity duration-500">
          <div className="text-xs font-bold text-center text-purple-800">{card.name}</div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-yellow-300" />
              <h1 className="text-2xl font-bold">AI Tarot Mystic</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Coins className="w-5 h-5 text-yellow-300" />
                <span>₹{balance}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-300" />
                <span>{Math.max(0, 2 - freeMinutesUsed)} min free</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={currentView} onValueChange={setCurrentView} className="w-full">
          <TabsList className="grid grid-cols-5 w-full mb-8 bg-black/30">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="reading">Reading</TabsTrigger>
            <TabsTrigger value="recharge">Recharge</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
            <TabsTrigger value="learn">Learn</TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-300 to-yellow-300 bg-clip-text text-transparent">
                Discover Your Destiny
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                AI-powered tarot readings with 99% accuracy
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {aiReaders.map(reader => (
                  <Card key={reader.id} className="bg-black/30 border-white/20 hover:border-white/40 transition-all">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${reader.color} flex items-center justify-center mx-auto mb-4`}>
                        {reader.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{reader.name}</h3>
                      <p className="text-sm text-gray-400 mb-2">{reader.specialty}</p>
                      <div className="flex items-center justify-center mb-3">
                        <Star className="w-4 h-4 text-yellow-300 mr-1" />
                        <span>{reader.accuracy} Accuracy</span>
                      </div>
                      <p className="text-xs text-gray-500">{reader.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3"
                onClick={() => setCurrentView('reading')}
              >
                Start Free Reading
              </Button>
            </div>
          </TabsContent>

          {/* Reading Tab */}
          <TabsContent value="reading">
            {!selectedReader && (
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-6">Choose Your AI Tarot Reader</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {aiReaders.map(reader => (
                    <Card 
                      key={reader.id} 
                      className="bg-black/30 border-white/20 hover:border-white/40 transition-all cursor-pointer"
                      onClick={() => setSelectedReader(reader)}
                    >
                      <CardContent className="p-6 text-center">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${reader.color} flex items-center justify-center mx-auto mb-4`}>
                          {reader.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{reader.name}</h3>
                        <p className="text-sm text-gray-400">{reader.specialty}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {selectedReader && !readingResult && (
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">Reading with {selectedReader.name}</h3>
                  
                  {/* Reading Type Selection */}
                  <div className="flex justify-center gap-4 mb-6">
                    <Button
                      variant={readingType === '1-card' ? 'default' : 'outline'}
                      onClick={() => {setReadingType('1-card'); setSelectedCards([]);}}
                    >
                      1 Card Reading
                    </Button>
                    <Button
                      variant={readingType === '3-card' ? 'default' : 'outline'}
                      onClick={() => {setReadingType('3-card'); setSelectedCards([]);}}
                    >
                      3 Card Reading
                    </Button>
                  </div>

                  {/* Duration Selection */}
                  <div className="mb-6">
                    <label className="block text-sm mb-2">Reading Duration (minutes):</label>
                    <select 
                      value={readingDuration} 
                      onChange={(e) => setReadingDuration(Number(e.target.value))}
                      className="bg-black/30 border border-white/20 rounded px-3 py-2"
                    >
                      <option value={5}>5 minutes - ₹100</option>
                      <option value={10}>10 minutes - ₹200</option>
                      <option value={20}>20 minutes - ₹400</option>
                      <option value={30}>30 minutes - ₹600</option>
                    </select>
                  </div>
                </div>

                {/* Card Selection */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-center mb-4">
                    Select {readingType === '3-card' ? '3 cards' : '1 card'} with your intuition
                  </h4>
                  
                  {/* 3D Card Deck */}
                  <div className="flex flex-wrap justify-center gap-1 mb-6 p-4 bg-black/20 rounded-lg">
                    {allCards.slice(0, 39).map((card, index) => (
                      <Card3D
                        key={card.id}
                        card={card}
                        onClick={selectCard}
                        isSelected={selectedCards.some(c => c.id === card.id)}
                      />
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-1 mb-6 p-4 bg-black/20 rounded-lg">
                    {allCards.slice(39).map((card, index) => (
                      <Card3D
                        key={card.id}
                        card={card}
                        onClick={selectCard}
                        isSelected={selectedCards.some(c => c.id === card.id)}
                      />
                    ))}
                  </div>

                  {/* Selected Cards Display */}
                  {selectedCards.length > 0 && (
                    <div className="text-center mb-6">
                      <h5 className="text-lg font-semibold mb-4">Selected Cards:</h5>
                      <div className="flex justify-center gap-4">
                        {selectedCards.map((card, index) => (
                          <div key={index} className="bg-white text-black rounded-lg p-4 max-w-xs">
                            <h6 className="font-bold">{card.name}{card.reversed ? ' (Reversed)' : ''}</h6>
                            <p className="text-sm mt-2">{card.reversed ? card.reversed : card.meaning}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Start Reading Button */}
                  {selectedCards.length === (readingType === '3-card' ? 3 : 1) && (
                    <div className="text-center">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        onClick={() => generateReading(selectedCards, selectedReader)}
                        disabled={isReading}
                      >
                        {isReading ? 'Channeling Energy...' : 'Start AI Reading'}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Reading Results */}
            {readingResult && (
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold mb-4">Your Mystical Reading</h3>
                  <p className="text-lg text-gray-300">Reading by {readingResult.reader.name}</p>
                </div>

                <div className="space-y-6">
                  {readingResult.readings.map((reading, index) => (
                    <Card key={index} className="bg-black/30 border-white/20">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-6">
                          <div className="bg-white text-black rounded-lg p-4 min-w-[200px]">
                            <h4 className="font-bold text-lg">{reading.card.name}</h4>
                            {reading.card.reversed && <Badge variant="secondary" className="mt-1">Reversed</Badge>}
                            <p className="text-sm mt-2 text-gray-600">{reading.position}</p>
                          </div>
                          <div className="flex-1">
                            <h5 className="text-xl font-semibold mb-3 text-yellow-300">{reading.position}</h5>
                            <p className="text-gray-300 leading-relaxed">{reading.interpretation}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <Button
                    onClick={() => {
                      setSelectedReader(null);
                      setSelectedCards([]);
                      setReadingResult(null);
                    }}
                    className="bg-gradient-to-r from-blue-500 to-purple-500"
                  >
                    New Reading
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Recharge Tab */}
          <TabsContent value="recharge">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-center mb-8">Recharge Your Account</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {rechargeOptions.map((option, index) => (
                  <Card 
                    key={index} 
                    className={`bg-black/30 border-white/20 hover:border-white/40 transition-all cursor-pointer relative ${
                      option.popular ? 'ring-2 ring-yellow-400' : ''
                    }`}
                    onClick={() => {
                      setBalance(balance + (option.price / 20) * 60);
                      alert(`Successfully recharged ${option.minutes} minutes for ₹${option.price}`);
                    }}
                  >
                    {option.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-yellow-500 text-black">Most Popular</Badge>
                      </div>
                    )}
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold mb-2">{option.minutes} min</div>
                      <div className="text-xl font-semibold mb-2">₹{option.price}</div>
                      <div className="text-sm text-gray-400 mb-4">₹{(option.price / option.minutes).toFixed(0)} per minute</div>
                      {option.discount && (
                        <Badge variant="secondary" className="mb-3">{option.discount}</Badge>
                      )}
                      <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Recharge Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-black/30 border-white/20 mb-8">
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold mb-4">Pricing Information</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• First 2 minutes FREE for new users</li>
                    <li>• ₹20 per minute after free trial</li>
                    <li>• Minimum recharge: 5 minutes (₹100)</li>
                    <li>• Save more with longer packages</li>
                    <li>• Instant activation after payment</li>
                    <li>• 100% secure payment processing</li>
                  </ul>
                </CardContent>
              </Card>

              <div className="text-center">
                <p className="text-gray-400 mb-4">Accepted Payment Methods</p>
                <div className="flex justify-center gap-4">
                  <Badge variant="outline">UPI</Badge>
                  <Badge variant="outline">Credit Card</Badge>
                  <Badge variant="outline">Debit Card</Badge>
                  <Badge variant="outline">Net Banking</Badge>
                  <Badge variant="outline">Wallets</Badge>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Quiz Tab */}
          <TabsContent value="quiz">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-center mb-8">Tarot Knowledge Quiz</h3>
              
              {!currentQuiz && (
                <div>
                  <p className="text-center text-lg text-gray-300 mb-8">
                    Test your tarot knowledge and earn discounts on readings!
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-black/30 border-white/20 hover:border-white/40 transition-all cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <Trophy className="w-12 h-12 text-green-400 mx-auto mb-4" />
                        <h4 className="text-xl font-bold mb-2">Easy</h4>
                        <p className="text-gray-400 mb-4">Basic tarot knowledge</p>
                        <p className="text-sm mb-4">10 questions • 5% discount for 8+ correct</p>
                        <Button 
                          className="w-full bg-green-500 hover:bg-green-600"
                          onClick={() => startQuiz('easy')}
                        >
                          Start Easy Quiz
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-black/30 border-white/20 hover:border-white/40 transition-all cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                        <h4 className="text-xl font-bold mb-2">Medium</h4>
                        <p className="text-gray-400 mb-4">Intermediate tarot knowledge</p>
                        <p className="text-sm mb-4">10 questions • 10% discount for 7+ correct</p>
                        <Button 
                          className="w-full bg-yellow-500 hover:bg-yellow-600"
                          onClick={() => startQuiz('medium')}
                        >
                          Start Medium Quiz
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-black/30 border-white/20 hover:border-white/40 transition-all cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <Trophy className="w-12 h-12 text-red-400 mx-auto mb-4" />
                        <h4 className="text-xl font-bold mb-2">Hard</h4>
                        <p className="text-gray-400 mb-4">Advanced tarot knowledge</p>
                        <p className="text-sm mb-4">10 questions • 20% discount for 6+ correct</p>
                        <Button 
                          className="w-full bg-red-500 hover:bg-red-600"
                          onClick={() => startQuiz('hard')}
                        >
                          Start Hard Quiz
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="text-center">
                    <h4 className="text-xl font-bold mb-4">Previous Quiz Scores</h4>
                    <p className="text-gray-300">Total Points Earned: {quizScore}</p>
                  </div>
                </div>
              )}

              {currentQuiz && (
                <div className="max-w-2xl mx-auto">
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <Badge variant="secondary">
                        {currentQuiz.difficulty.toUpperCase()} QUIZ
                      </Badge>
                      <span className="text-sm text-gray-400">
                        Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
                      </span>
                    </div>
                    <Progress 
                      value={(currentQuestionIndex / currentQuiz.questions.length) * 100} 
                      className="mb-4"
                    />
                  </div>

                  <Card className="bg-black/30 border-white/20">
                    <CardContent className="p-8">
                      <h4 className="text-xl font-bold mb-6 text-center">
                        {currentQuiz.questions[currentQuestionIndex].question}
                      </h4>
                      
                      <div className="grid grid-cols-1 gap-3">
                        {currentQuiz.questions[currentQuestionIndex].options.map((option, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="p-4 text-left justify-start hover:bg-purple-500/20"
                            onClick={() => answerQuestion(index)}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Learn Tab */}
          <TabsContent value="learn">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-3xl font-bold text-center mb-8">Tarot Learning Platform</h3>
              
              <Tabs defaultValue="major" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="major">Major Arcana (22 cards)</TabsTrigger>
                  <TabsTrigger value="minor">Minor Arcana (56 cards)</TabsTrigger>
                </TabsList>

                <TabsContent value="major">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tarotCards.major.map(card => (
                      <Card 
                        key={card.id} 
                        className="bg-black/30 border-white/20 hover:border-white/40 transition-all cursor-pointer"
                        onClick={() => setShowCardDetail(card)}
                      >
                        <CardContent className="p-4">
                          <h4 className="font-bold text-lg mb-2">{card.name}</h4>
                          <p className="text-sm text-gray-300 mb-2">
                            {card.meaning.substring(0, 50)}...
                          </p>
                          <Button variant="ghost" size="sm" className="p-0 h-auto text-purple-300">
                            Learn More →
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="minor">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {['Wands', 'Cups', 'Swords', 'Pentacles'].map(suit => (
                      <div key={suit}>
                        <h4 className="text-xl font-bold mb-4 text-center">{suit}</h4>
                        <div className="space-y-2">
                          {tarotCards.minor.filter(card => card.suit === suit).map(card => (
                            <Card 
                              key={card.id}
                              className="bg-black/30 border-white/20 hover:border-white/40 transition-all cursor-pointer"
                              onClick={() => setShowCardDetail(card)}
                            >
                              <CardContent className="p-3">
                                <h5 className="font-semibold text-sm">{card.name}</h5>
                                <p className="text-xs text-gray-400 mt-1">
                                  {card.meaning.substring(0, 30)}...
                                </p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>
        </Tabs>

        {/* Card Detail Modal */}
        <Dialog open={!!showCardDetail} onOpenChange={() => setShowCardDetail(null)}>
          <DialogContent className="bg-gray-900 border-white/20 text-white max-w-2xl">
            {showCardDetail && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-yellow-300">
                    {showCardDetail.name}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {showCardDetail.suit && (
                    <Badge variant="secondary" className="w-fit">
                      {showCardDetail.suit}
                    </Badge>
                  )}
                  
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-green-400">Upright Meaning:</h4>
                    <p className="text-gray-300">{showCardDetail.meaning}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-red-400">Reversed Meaning:</h4>
                    <p className="text-gray-300">{showCardDetail.reversed}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-2 text-purple-400">Deep Interpretation:</h4>
                    <p className="text-gray-300">
                      The {showCardDetail.name} represents a powerful spiritual message that goes beyond surface-level interpretation. 
                      When this card appears in your reading, it's inviting you to explore the deeper aspects of its symbolism and 
                      how it relates to your current life situation. Consider both the conscious and unconscious meanings, 
                      as tarot speaks to multiple layers of human experience.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-2 text-blue-400">Keywords:</h4>
                    <div className="flex flex-wrap gap-2">
                      {showCardDetail.meaning.split(',').slice(0, 6).map((keyword, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {keyword.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
