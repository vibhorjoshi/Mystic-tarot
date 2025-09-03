import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { formatDate } from '../utils/helpers';

const HistoryPage = ({ history, onBack }) => {
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
        📜 Reading History
      </h1>

      {history.length === 0 ? (
        <motion.div
          className="text-center mystical-card p-12"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="text-6xl mb-4">🔮</div>
          <h3 className="text-xl font-bold text-white mb-2">No readings yet</h3>
          <p className="text-white/70">Start your mystical journey!</p>
        </motion.div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {history.map((reading, index) => (
            <motion.div
              key={reading.id}
              className="mystical-card p-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{reading.reader.icon}</span>
                  <h3 className="text-xl font-bold text-white">{reading.reader.name}</h3>
                </div>
                <span className="text-white/60 text-sm">
                  {formatDate(reading.timestamp)}
                </span>
              </div>
              
              <p className="text-white/70 mb-4">
                Question: {reading.question || "General reading"}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {reading.cards.map((card, cardIndex) => (
                  <span
                    key={cardIndex}
                    className="px-3 py-1 bg-mystical-500/20 text-mystical-300 rounded-full text-sm"
                  >
                    {card.card.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default HistoryPage;
