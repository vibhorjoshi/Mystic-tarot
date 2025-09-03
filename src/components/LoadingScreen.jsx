import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-mystical-gradient"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center">
        {/* Logo */}
        <motion.div
          className="mb-8"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <h1 className="text-6xl md:text-8xl font-mystical font-bold mystical-text">
            🔮
          </h1>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-6xl font-mystical font-bold mystical-text mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          AI Tarot
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-white/80 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Where Ancient Wisdom Meets Modern Technology
        </motion.p>

        {/* Loading Spinner */}
        <motion.div
          className="flex justify-center mb-8"
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className="w-16 h-16 border-4 border-white/20 border-t-mystical-400 rounded-full" />
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="text-white/60"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <p className="text-lg mb-2">Connecting to the cosmic energies...</p>
          <p className="text-sm">Loading mystical wisdom</p>
        </motion.div>

        {/* Mystical Particles */}
        <div className="absolute inset-0 pointer-events-none">
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
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        {/* Mystical Quote */}
        <motion.div
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center max-w-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p className="text-white/70 italic text-sm">
            "The cards reveal what the heart already knows, and AI helps interpret the cosmic whispers of the universe."
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
