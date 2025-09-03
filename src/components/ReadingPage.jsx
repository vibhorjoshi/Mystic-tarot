import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

const ReadingPage = ({ reading, onBack }) => {
  if (!reading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
    >
      {/* Back Button */}
      <motion.button
        onClick={onBack}
        className="flex items-center space-x-2 mystical-button mb-8"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </motion.button>

      {/* Reader Info */}
      <motion.div
        className="text-center mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-center space-x-4 mb-4">
          <span className="text-4xl">{reading.reader.icon}</span>
          <h1 className="text-3xl font-mystical font-bold text-white">
            {reading.reader.name}
          </h1>
        </div>
        <p className="text-white/70">
          Question: {reading.question || "General reading"}
        </p>
      </motion.div>

      {/* Cards Display */}
      <motion.section
        className="mb-12"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-mystical font-bold text-white mb-6 text-center">
          Cards Drawn
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reading.cards.map((cardData, index) => (
            <motion.div
              key={index}
              className="mystical-card text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <div className="text-6xl mb-4">{cardData.card.image}</div>
              <h3 className="text-xl font-bold text-white mb-2">
                {cardData.card.name}
              </h3>
              <p className="text-white/70 mb-2">
                Position {cardData.position}
              </p>
              <div className={`inline-block px-3 py-1 rounded-full text-sm ${
                cardData.reversed 
                  ? 'bg-red-500/20 text-red-300' 
                  : 'bg-green-500/20 text-green-300'
              }`}>
                {cardData.reversed ? '🔄 Reversed' : '⬆️ Upright'}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Interpretation */}
      <motion.section
        className="max-w-4xl mx-auto"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h2 className="text-2xl font-mystical font-bold text-white mb-6 text-center">
          ✨ Interpretation
        </h2>
        
        {/* Summary */}
        <motion.div
          className="mystical-card p-6 mb-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">Overall Reading</h3>
          <p className="text-white/80 leading-relaxed">
            {reading.interpretation.summary}
          </p>
        </motion.div>

        {/* Individual Card Interpretations */}
        <div className="space-y-6">
          {reading.interpretation.cards.map((interpretation, index) => (
            <motion.div
              key={index}
              className="mystical-card p-6"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2 + index * 0.1 }}
            >
              <h4 className="text-lg font-bold text-white mb-3">
                Position {interpretation.position}: {interpretation.card_name}
              </h4>
              <p className="text-white/80 mb-4 leading-relaxed">
                {interpretation.interpretation}
              </p>
              <div className="flex flex-wrap gap-2">
                {interpretation.keywords.map((keyword, keywordIndex) => (
                  <span
                    key={keywordIndex}
                    className="px-3 py-1 bg-mystical-500/20 text-mystical-300 rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default ReadingPage;
