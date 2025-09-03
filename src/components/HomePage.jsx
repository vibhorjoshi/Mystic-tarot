import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, Heart, Star, BookOpen, ShoppingCart, Brain, History,
  Sparkles, Crown, Zap, Shield, Eye, Users, Award, Target, TrendingUp
} from 'lucide-react';
import AIReader from './AIReader';
import CardDeck from './CardDeck';

const HomePage = ({ appState, setAppState, data, currentUser, performReading, startQuiz }) => {
  const [isShuffling, setIsShuffling] = useState(false);
  const [showCardDeck, setShowCardDeck] = useState(false);

  const handleReaderSelect = (reader) => {
    setAppState(prev => ({ ...prev, selectedReader: reader }));
  };

  const handleReadingTypeSelect = (readingType) => {
    setAppState(prev => ({ ...prev, selectedReadingType: readingType }));
  };

  const handleQuestionChange = (e) => {
    setAppState(prev => ({ ...prev, question: e.target.value }));
  };

  const handleShuffle = () => {
    setIsShuffling(true);
    setShowCardDeck(true);
    
    setTimeout(() => {
      setIsShuffling(false);
      setShowCardDeck(false);
    }, 3000);
  };

  const navigationItems = [
    { id: 'library', icon: BookOpen, label: 'Card Library', color: 'text-blue-400' },
    { id: 'shop', icon: ShoppingCart, label: 'Buy Coins', color: 'text-golden-400' },
    { id: 'quiz', icon: Brain, label: 'Take Quiz', color: 'text-purple-400' },
    { id: 'history', icon: History, label: 'History', color: 'text-green-400' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
    >
      {/* Hero Section */}
      <motion.div 
        className="text-center mb-12"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-mystical font-bold mystical-text mb-4"
          whileHover={{ scale: 1.05 }}
        >
          🔮 AI Tarot
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-white/80 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Where Ancient Wisdom Meets Modern Technology
        </motion.p>
        
        {/* Mystical Quote */}
        <motion.div 
          className="max-w-2xl mx-auto mystical-card p-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-lg italic text-mystical-300 shimmer-effect">
            "{appState.mysticalQuote}"
          </p>
        </motion.div>
      </motion.div>

      {/* AI Readers Section */}
      <motion.section 
        className="mb-12"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-mystical font-bold text-white mb-2">
            🌟 Choose Your AI Reader
          </h2>
          <p className="text-white/70">Each reader has unique insights and specialties</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {data.aiReaders.map((reader, index) => (
            <motion.div
              key={reader.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <AIReader
                reader={reader}
                isSelected={appState.selectedReader?.id === reader.id}
                onSelect={handleReaderSelect}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Reading Types Section */}
      <motion.section 
        className="mb-12"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-mystical font-bold text-white mb-2">
            🔮 Choose Your Reading
          </h2>
          <p className="text-white/70">Different spreads for different insights</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {Object.entries(data.readingTypes).map(([key, type], index) => (
            <motion.div
              key={key}
              className={`mystical-card cursor-pointer transition-all duration-300 ${
                appState.selectedReadingType === key 
                  ? 'border-mystical-400 mystical-glow' 
                  : 'border-white/20 hover:border-mystical-300'
              }`}
              onClick={() => handleReadingTypeSelect(key)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 + index * 0.1 }}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">
                  {key === 'single_card' ? '🃏' : key === 'three_card' ? '🎴' : '🌟'}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{type.name}</h3>
                <p className="text-white/70 mb-4">{type.description}</p>
                <div className="flex justify-center items-center space-x-2">
                  <span className="text-golden-400">🪙</span>
                  <span className="font-medium text-white">{type.cost}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Question Section */}
      <AnimatePresence>
        {appState.selectedReader && appState.selectedReadingType && (
          <motion.section 
            className="mb-12"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-mystical font-bold text-white mb-2">
                  ❓ Ask Your Question
                </h2>
                <p className="text-white/70">What would you like to know? (optional)</p>
              </div>
              
              <div className="mystical-card p-6">
                <textarea
                  value={appState.question}
                  onChange={handleQuestionChange}
                  placeholder="Focus your energy and ask your question..."
                  className="w-full mystical-input h-32 resize-none"
                />
                
                <div className="flex justify-center mt-6">
                  <motion.button
                    onClick={handleShuffle}
                    className="mystical-button mr-4"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isShuffling}
                  >
                    {isShuffling ? '🔄 Shuffling...' : '🎴 Shuffle Cards'}
                  </motion.button>
                  
                  <motion.button
                    onClick={performReading}
                    className="mystical-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={currentUser.balance < data.readingTypes[appState.selectedReadingType].cost}
                  >
                    🔮 Get Reading ({data.readingTypes[appState.selectedReadingType].cost} 🪙)
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Navigation Section */}
      <motion.section 
        className="mb-12"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-mystical font-bold text-white mb-2">
            ✨ Explore More
          </h2>
          <p className="text-white/70">Discover the mystical world of tarot</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {navigationItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="mystical-card cursor-pointer text-center p-4"
              onClick={() => setAppState(prev => ({ ...prev, currentPage: item.id }))}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.6 + index * 0.1 }}
            >
              <item.icon className={`w-8 h-8 mx-auto mb-2 ${item.color}`} />
              <span className="text-sm font-medium text-white">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* User Stats Section */}
      <motion.section 
        className="mb-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <motion.div 
              className="mystical-card text-center p-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-2xl mb-2">📚</div>
              <div className="text-lg font-bold text-white">{currentUser.readingHistory.length}</div>
              <div className="text-sm text-white/70">Readings</div>
            </motion.div>
            
            <motion.div 
              className="mystical-card text-center p-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-2xl mb-2">🧠</div>
              <div className="text-lg font-bold text-white">{currentUser.quizHistory.length}</div>
              <div className="text-sm text-white/70">Quizzes</div>
            </motion.div>
            
            <motion.div 
              className="mystical-card text-center p-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-2xl mb-2">🏆</div>
              <div className="text-lg font-bold text-white">{currentUser.achievements.length}</div>
              <div className="text-sm text-white/70">Achievements</div>
            </motion.div>
            
            <motion.div 
              className="mystical-card text-center p-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-2xl mb-2">⭐</div>
              <div className="text-lg font-bold text-white">{currentUser.experience}</div>
              <div className="text-sm text-white/70">Experience</div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Card Deck Animation */}
      <AnimatePresence>
        {showCardDeck && (
          <CardDeck isShuffling={isShuffling} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HomePage;
