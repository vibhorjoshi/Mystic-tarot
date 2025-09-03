import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Search } from 'lucide-react';

const LibraryPage = ({ cards, searchQuery, onSearch, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
    >
      <motion.button
        onClick={onBack}
        className="flex items-center space-x-2 mystical-button mb-8"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </motion.button>

      <h1 className="text-3xl font-mystical font-bold text-white mb-8 text-center">
        📚 Tarot Card Library
      </h1>

      <div className="max-w-4xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search cards by name or keywords..."
            className="w-full mystical-input pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="mystical-card"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">{card.image}</div>
              <h3 className="text-xl font-bold text-white">{card.name}</h3>
              <span className="text-sm text-white/60">{card.suit}</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-semibold mb-2">⬆️ Upright</h4>
                <p className="text-white/70 text-sm mb-2">{card.upright.description}</p>
                <div className="flex flex-wrap gap-1">
                  {card.upright.keywords.map((keyword, i) => (
                    <span key={i} className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-2">🔄 Reversed</h4>
                <p className="text-white/70 text-sm mb-2">{card.reversed.description}</p>
                <div className="flex flex-wrap gap-1">
                  {card.reversed.keywords.map((keyword, i) => (
                    <span key={i} className="px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LibraryPage;
