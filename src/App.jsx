import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { 
  Moon, Heart, Star, BookOpen, ShoppingCart, Brain, History, 
  Search, Filter, ChevronLeft, ChevronRight, Sparkles, Crown,
  Zap, Shield, Eye, Users, Award, Target, TrendingUp
} from 'lucide-react';
import './App.css';

// Components
import HomePage from './components/HomePage';
import ReadingPage from './components/ReadingPage';
import LibraryPage from './components/LibraryPage';
import ShopPage from './components/ShopPage';
import QuizPage from './components/QuizPage';
import HistoryPage from './components/HistoryPage';
import CardDeck from './components/CardDeck';
import AIReader from './components/AIReader';
import MysticalBackground from './components/MysticalBackground';
import LoadingScreen from './components/LoadingScreen';

// Hooks
import { useLocalStorage } from './hooks/useLocalStorage';
import { useAudio } from './hooks/useAudio';

// Utils
import { generateUserId, calculateQuizRewards } from './utils/helpers';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', {
    id: generateUserId(),
    balance: 10,
    level: 1,
    experience: 0,
    achievements: [],
    readingHistory: [],
    quizHistory: [],
    preferences: {
      soundEnabled: true,
      animationsEnabled: true,
      theme: 'mystical'
    }
  });

  const [appState, setAppState] = useState({
    currentPage: 'home',
    selectedReader: null,
    selectedReadingType: null,
    question: '',
    currentReading: null,
    searchQuery: '',
    filteredCards: [],
    quizQuestions: [],
    currentQuiz: null,
    quizAnswers: {},
    mysticalQuote: '',
    notifications: [],
    easterEggs: []
  });

  const [data, setData] = useState({
    aiReaders: [],
    tarotCards: {},
    readingTypes: {},
    coinPackages: [],
    quizQuestions: []
  });

  const { playSound, stopSound } = useAudio();
  const navigate = useNavigate();

  const API_BASE = '/api';

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Load all data in parallel
      const [
        readersRes, cardsRes, typesRes, packagesRes, 
        quizRes, quoteRes
      ] = await Promise.all([
        fetch(`${API_BASE}/readers`),
        fetch(`${API_BASE}/cards`),
        fetch(`${API_BASE}/reading-types`),
        fetch(`${API_BASE}/coin-packages`),
        fetch(`${API_BASE}/quiz/questions`),
        fetch(`${API_BASE}/quote`)
      ]);

      const [readers, cards, types, packages, quiz, quote] = await Promise.all([
        readersRes.json(),
        cardsRes.json(),
        typesRes.json(),
        packagesRes.json(),
        quizRes.json(),
        quoteRes.json()
      ]);

      setData({
        aiReaders: readers,
        tarotCards: cards,
        readingTypes: types,
        coinPackages: packages,
        quizQuestions: quiz
      });

      setAppState(prev => ({
        ...prev,
        mysticalQuote: quote.quote,
        filteredCards: Object.values(cards).slice(0, 20)
      }));

      // Play mystical ambient sound
      if (currentUser.preferences.soundEnabled) {
        playSound('ambient');
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error initializing app:', error);
      setIsLoading(false);
    }
  };

  const performReading = async () => {
    if (!appState.selectedReader || !appState.selectedReadingType) {
      showNotification('Please select a reader and reading type', 'warning');
      return;
    }

    if (currentUser.balance < data.readingTypes[appState.selectedReadingType].cost) {
      showNotification('Insufficient coins for this reading', 'error');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/reading`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reader_id: appState.selectedReader.id,
          reading_type: appState.selectedReadingType,
          question: appState.question,
          user_id: currentUser.id
        })
      });

      if (response.ok) {
        const reading = await response.json();
        
        // Update user balance
        const newBalance = currentUser.balance - data.readingTypes[appState.selectedReadingType].cost;
        setCurrentUser(prev => ({
          ...prev,
          balance: newBalance,
          readingHistory: [...prev.readingHistory, reading]
        }));

        setAppState(prev => ({
          ...prev,
          currentReading: reading,
          currentPage: 'reading-result'
        }));

        // Play card flip sound
        if (currentUser.preferences.soundEnabled) {
          playSound('cardFlip');
        }

        showNotification('Reading completed! The cards have spoken.', 'success');
      } else {
        const error = await response.json();
        showNotification(error.error || 'Error performing reading', 'error');
      }
    } catch (error) {
      console.error('Error performing reading:', error);
      showNotification('Error performing reading', 'error');
    }
  };

  const purchaseCoins = async (packageId) => {
    try {
      const response = await fetch(`${API_BASE}/user/${currentUser.id}/purchase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ package_id: packageId })
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentUser(prev => ({
          ...prev,
          balance: data.new_balance
        }));
        showNotification(`Successfully purchased ${data.coins_added} coins!`, 'success');
      }
    } catch (error) {
      console.error('Error purchasing coins:', error);
      showNotification('Error purchasing coins', 'error');
    }
  };

  const startQuiz = async () => {
    const questions = data.quizQuestions.slice(0, 5); // Take first 5 questions
    setAppState(prev => ({
      ...prev,
      currentQuiz: questions,
      currentPage: 'quiz'
    }));
  };

  const submitQuiz = async () => {
    const answers = Object.keys(appState.quizAnswers).map(questionId => ({
      questionId: parseInt(questionId),
      answer: appState.quizAnswers[questionId],
      correct: data.quizQuestions.find(q => q.id === parseInt(questionId))?.correct === appState.quizAnswers[questionId]
    }));

    try {
      const response = await fetch(`${API_BASE}/quiz/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: answers,
          user_id: currentUser.id
        })
      });

      if (response.ok) {
        const result = await response.json();
        
        // Calculate rewards and experience
        const rewards = calculateQuizRewards(result.percentage);
        
        setCurrentUser(prev => ({
          ...prev,
          balance: result.new_balance,
          experience: prev.experience + rewards.experience,
          level: Math.floor((prev.experience + rewards.experience) / 100) + 1,
          quizHistory: [...prev.quizHistory, { ...result, timestamp: new Date().toISOString() }]
        }));

        showNotification(`Quiz completed! Score: ${result.score}/${result.total} (${result.percentage.toFixed(1)}%). You earned ${result.coins_earned} coins and ${rewards.experience} XP!`, 'success');
        
        setAppState(prev => ({
          ...prev,
          currentPage: 'home',
          currentQuiz: null,
          quizAnswers: {}
        }));
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      showNotification('Error submitting quiz', 'error');
    }
  };

  const searchCards = (query) => {
    setAppState(prev => ({ ...prev, searchQuery: query }));
    
    if (query.trim() === '') {
      setAppState(prev => ({
        ...prev,
        filteredCards: Object.values(data.tarotCards).slice(0, 20)
      }));
    } else {
      const filtered = Object.values(data.tarotCards).filter(card =>
        card.name.toLowerCase().includes(query.toLowerCase()) ||
        card.upright.keywords.some(keyword => 
          keyword.toLowerCase().includes(query.toLowerCase())
        ) ||
        card.reversed.keywords.some(keyword => 
          keyword.toLowerCase().includes(query.toLowerCase())
        )
      );
      setAppState(prev => ({ ...prev, filteredCards: filtered }));
    }
  };

  const showNotification = (message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };

    setAppState(prev => ({
      ...prev,
      notifications: [...prev.notifications, notification]
    }));

    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      setAppState(prev => ({
        ...prev,
        notifications: prev.notifications.filter(n => n.id !== notification.id)
      }));
    }, 5000);
  };

  const toggleSound = () => {
    setCurrentUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        soundEnabled: !prev.preferences.soundEnabled
      }
    }));
  };

  const toggleAnimations = () => {
    setCurrentUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        animationsEnabled: !prev.preferences.animationsEnabled
      }
    }));
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="app mystical-background">
      <MysticalBackground />
      
      {/* Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl mystical-text font-mystical font-bold">
                🔮 AI Tarot
              </div>
              <div className="hidden md:block text-sm text-white/70">
                Where Ancient Wisdom Meets Modern Technology
              </div>
            </motion.div>

            <div className="flex items-center space-x-4">
              {/* Balance Display */}
              <motion.div 
                className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-lg px-3 py-2"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-golden-400">🪙</span>
                <span className="font-medium">{currentUser.balance}</span>
              </motion.div>

              {/* Level Display */}
              <motion.div 
                className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-lg px-3 py-2"
                whileHover={{ scale: 1.05 }}
              >
                <Crown className="w-4 h-4 text-golden-400" />
                <span className="font-medium">Lv.{currentUser.level}</span>
              </motion.div>

              {/* Settings */}
              <motion.button
                onClick={toggleSound}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {currentUser.preferences.soundEnabled ? '🔊' : '🔇'}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="pt-16 min-h-screen">
        <AnimatePresence mode="wait">
          {appState.currentPage === 'home' && (
            <HomePage
              key="home"
              appState={appState}
              setAppState={setAppState}
              data={data}
              currentUser={currentUser}
              performReading={performReading}
              startQuiz={startQuiz}
            />
          )}
          
          {appState.currentPage === 'reading-result' && (
            <ReadingPage
              key="reading"
              reading={appState.currentReading}
              onBack={() => setAppState(prev => ({ ...prev, currentPage: 'home' }))}
            />
          )}
          
          {appState.currentPage === 'library' && (
            <LibraryPage
              key="library"
              cards={appState.filteredCards}
              searchQuery={appState.searchQuery}
              onSearch={searchCards}
              onBack={() => setAppState(prev => ({ ...prev, currentPage: 'home' }))}
            />
          )}
          
          {appState.currentPage === 'shop' && (
            <ShopPage
              key="shop"
              packages={data.coinPackages}
              onPurchase={purchaseCoins}
              onBack={() => setAppState(prev => ({ ...prev, currentPage: 'home' }))}
            />
          )}
          
          {appState.currentPage === 'quiz' && (
            <QuizPage
              key="quiz"
              quiz={appState.currentQuiz}
              answers={appState.quizAnswers}
              onAnswer={(questionId, answer) => 
                setAppState(prev => ({
                  ...prev,
                  quizAnswers: { ...prev.quizAnswers, [questionId]: answer }
                }))
              }
              onSubmit={submitQuiz}
              onBack={() => setAppState(prev => ({ ...prev, currentPage: 'home' }))}
            />
          )}
          
          {appState.currentPage === 'history' && (
            <HistoryPage
              key="history"
              history={currentUser.readingHistory}
              onBack={() => setAppState(prev => ({ ...prev, currentPage: 'home' }))}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Notifications */}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        <AnimatePresence>
          {appState.notifications.map(notification => (
            <motion.div
              key={notification.id}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className={`mystical-card p-4 max-w-sm ${
                notification.type === 'success' ? 'border-green-400' :
                notification.type === 'error' ? 'border-red-400' :
                notification.type === 'warning' ? 'border-yellow-400' :
                'border-blue-400'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{notification.message}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
