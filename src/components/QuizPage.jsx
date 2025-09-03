import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

const QuizPage = ({ quiz, answers, onAnswer, onSubmit, onBack }) => {
  if (!quiz) return null;

  const isComplete = Object.keys(answers).length === quiz.length;

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
        🧠 Tarot Knowledge Quiz
      </h1>
      <p className="text-white/70 text-center mb-12">
        Test your knowledge and earn coins!
      </p>

      <div className="max-w-4xl mx-auto space-y-8">
        {quiz.map((question, index) => (
          <motion.div
            key={question.id}
            className="mystical-card p-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="text-xl font-bold text-white mb-6">
              Question {index + 1}: {question.question}
            </h3>
            
            <div className="space-y-3">
              {question.options.map((option, optionIndex) => (
                <label
                  key={optionIndex}
                  className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={optionIndex}
                    checked={answers[question.id] === optionIndex}
                    onChange={(e) => onAnswer(question.id, parseInt(e.target.value))}
                    className="w-4 h-4 text-mystical-600 bg-white/10 border-white/20 focus:ring-mystical-500"
                  />
                  <span className="text-white/80">{option}</span>
                </label>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <motion.button
          onClick={onSubmit}
          disabled={!isComplete}
          className={`mystical-button ${!isComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
          whileHover={isComplete ? { scale: 1.05 } : {}}
          whileTap={isComplete ? { scale: 0.95 } : {}}
        >
          Submit Quiz
        </motion.button>
      </div>
    </motion.div>
  );
};

export default QuizPage;
