import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Heart, Star } from 'lucide-react';

const AIReader = ({ reader, isSelected, onSelect }) => {
  const getReaderIcon = (readerId) => {
    switch (readerId) {
      case 'luna':
        return <Moon className="w-8 h-8" />;
      case 'sage':
        return <Heart className="w-8 h-8" />;
      case 'mystic':
        return <Star className="w-8 h-8" />;
      default:
        return <span className="text-2xl">{reader.icon}</span>;
    }
  };

  const getReaderColor = (readerId) => {
    switch (readerId) {
      case 'luna':
        return 'from-purple-500 to-purple-700';
      case 'sage':
        return 'from-pink-500 to-pink-700';
      case 'mystic':
        return 'from-yellow-500 to-yellow-700';
      default:
        return 'from-mystical-500 to-mystical-700';
    }
  };

  return (
    <motion.div
      className={`mystical-card cursor-pointer transition-all duration-300 ${
        isSelected 
          ? 'border-mystical-400 mystical-glow scale-105' 
          : 'border-white/20 hover:border-mystical-300 hover:scale-102'
      }`}
      onClick={() => onSelect(reader)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <div className="text-center">
        {/* Reader Icon */}
        <motion.div 
          className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${getReaderColor(reader.id)} flex items-center justify-center text-white`}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          {getReaderIcon(reader.id)}
        </motion.div>

        {/* Reader Name */}
        <h3 className="text-xl font-bold text-white mb-2">{reader.name}</h3>
        
        {/* Specialty */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">
            {reader.specialty}
          </span>
        </div>

        {/* Description */}
        <p className="text-white/70 text-sm mb-4 leading-relaxed">
          {reader.description}
        </p>

        {/* Accuracy */}
        <div className="flex items-center justify-center space-x-2 mb-3">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-white/60">Accuracy: {reader.accuracy}</span>
        </div>

        {/* Personality */}
        <div className="text-xs text-white/50 italic">
          {reader.personality}
        </div>

        {/* Selection Indicator */}
        {isSelected && (
          <motion.div
            className="absolute top-2 right-2 w-6 h-6 bg-mystical-400 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <span className="text-white text-sm">✓</span>
          </motion.div>
        )}
      </div>

      {/* Mystical Effects */}
      {isSelected && (
        <>
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-mystical-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-mystical-400/20 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </>
      )}
    </motion.div>
  );
};

export default AIReader;
