import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateCardDeck } from '../utils/helpers';

const CardDeck = ({ isShuffling }) => {
  const [cards, setCards] = useState([]);
  const [shuffledCards, setShuffledCards] = useState([]);

  useEffect(() => {
    if (isShuffling) {
      const deck = generateCardDeck();
      setCards(deck);
      
      // Simulate shuffling animation
      const shuffleInterval = setInterval(() => {
        setShuffledCards(prev => {
          const newCards = [...prev];
          // Randomly move cards around
          for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * newCards.length);
            const card = newCards.splice(randomIndex, 1)[0];
            newCards.push(card);
          }
          return newCards;
        });
      }, 200);

      return () => clearInterval(shuffleInterval);
    } else {
      setCards([]);
      setShuffledCards([]);
    }
  }, [isShuffling]);

  return (
    <AnimatePresence>
      {isShuffling && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Shuffling Cards */}
            <div className="relative w-96 h-64">
              {shuffledCards.slice(0, 10).map((card, index) => (
                <motion.div
                  key={`${card.name}-${index}`}
                  className="absolute w-24 h-36 bg-gradient-to-br from-golden-400 to-golden-600 rounded-lg border-2 border-white/20 shadow-2xl"
                  style={{
                    left: `${20 + (index % 3) * 30}%`,
                    top: `${20 + Math.floor(index / 3) * 30}%`,
                    zIndex: index,
                  }}
                  animate={{
                    rotateY: [0, 180, 360],
                    rotateX: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                    x: [0, Math.random() * 20 - 10],
                    y: [0, Math.random() * 20 - 10],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: index * 0.1,
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm">
                    {card.name}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Shuffling Text */}
            <motion.div
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-2xl font-mystical font-bold text-white mb-2">
                🔄 Shuffling the Cards
              </h3>
              <p className="text-white/70">
                The universe is aligning the cards for your reading...
              </p>
            </motion.div>

            {/* Mystical Particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-mystical-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  y: [0, -50],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CardDeck;
