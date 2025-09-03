// Generate a unique user ID
export function generateUserId() {
  return 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

// Calculate quiz rewards based on performance
export function calculateQuizRewards(percentage) {
  let experience = 0;
  let coins = 0;
  
  if (percentage >= 90) {
    experience = 50;
    coins = 10;
  } else if (percentage >= 80) {
    experience = 40;
    coins = 8;
  } else if (percentage >= 70) {
    experience = 30;
    coins = 6;
  } else if (percentage >= 60) {
    experience = 20;
    coins = 4;
  } else if (percentage >= 50) {
    experience = 10;
    coins = 2;
  } else {
    experience = 5;
    coins = 1;
  }
  
  return { experience, coins };
}

// Format date for display
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Shuffle array (Fisher-Yates algorithm)
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Generate random mystical quote
export function getRandomQuote() {
  const quotes = [
    "The cards reveal what the heart already knows.",
    "In every reading lies a message from the universe.",
    "Trust your intuition, for it speaks the language of the soul.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Magic is not in the cards, but in the space between them.",
    "Every card drawn is a step on your spiritual journey.",
    "The universe whispers its secrets to those who listen.",
    "Your destiny is written in the stars and reflected in the cards.",
    "Wisdom comes not from the cards themselves, but from your interpretation.",
    "The tarot is a mirror reflecting the depths of your soul."
  ];
  
  return quotes[Math.floor(Math.random() * quotes.length)];
}

// Calculate level from experience
export function calculateLevel(experience) {
  return Math.floor(experience / 100) + 1;
}

// Calculate experience needed for next level
export function experienceForNextLevel(currentLevel) {
  return currentLevel * 100;
}

// Generate achievement based on actions
export function generateAchievement(action, value) {
  const achievements = {
    firstReading: {
      title: "First Steps",
      description: "Completed your first tarot reading",
      icon: "🔮"
    },
    tenthReading: {
      title: "Dedicated Seeker",
      description: "Completed 10 tarot readings",
      icon: "⭐"
    },
    perfectQuiz: {
      title: "Tarot Master",
      description: "Achieved 100% on a quiz",
      icon: "👑"
    },
    coinCollector: {
      title: "Coin Collector",
      description: "Accumulated 100 coins",
      icon: "🪙"
    }
  };
  
  return achievements[action] || null;
}

// Debounce function for search
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Validate email format
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Generate card deck for shuffling animation
export function generateCardDeck() {
  const suits = ['Cups', 'Pentacles', 'Swords', 'Wands'];
  const numbers = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Page', 'Knight', 'Queen', 'King'];
  const majorArcana = [
    'The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor',
    'The Hierophant', 'The Lovers', 'The Chariot', 'Strength', 'The Hermit',
    'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance',
    'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun', 'Judgement', 'The World'
  ];
  
  const deck = [];
  
  // Add Minor Arcana
  suits.forEach(suit => {
    numbers.forEach(number => {
      deck.push({
        name: `${number} of ${suit}`,
        suit: suit,
        type: 'minor'
      });
    });
  });
  
  // Add Major Arcana
  majorArcana.forEach(card => {
    deck.push({
      name: card,
      suit: 'Major Arcana',
      type: 'major'
    });
  });
  
  return shuffleArray(deck);
}
