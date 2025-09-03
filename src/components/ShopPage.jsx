import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

const ShopPage = ({ packages, onPurchase, onBack }) => {
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
        🛒 Purchase Coins
      </h1>
      <p className="text-white/70 text-center mb-12">
        Expand your mystical journey with more readings
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            className="mystical-card text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="text-4xl mb-4">🪙</div>
            <h3 className="text-2xl font-bold text-white mb-2">{pkg.coins} Coins</h3>
            {pkg.bonus > 0 && (
              <div className="bg-golden-500/20 text-golden-300 px-3 py-1 rounded-full text-sm mb-4">
                +{pkg.bonus} Bonus!
              </div>
            )}
            <div className="text-3xl font-bold text-golden-400 mb-6">₹{pkg.price}</div>
            <motion.button
              onClick={() => onPurchase(pkg.id)}
              className="mystical-button w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Purchase
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ShopPage;
