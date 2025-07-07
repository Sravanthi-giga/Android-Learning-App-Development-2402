import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowLeft, FiCheck, FiX, FiStar, FiTrendingUp } = FiIcons;

const Quiz = ({ addPoints, updateProgress }) => {
  const { subject } = useParams();
  const navigate = useNavigate();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const quizData = {
    mathematics: {
      name: 'Mathematics',
      questions: [
        {
          question: 'What is the derivative of x²?',
          options: ['2x', 'x²', '2', 'x'],
          correct: 0
        },
        {
          question: 'What is 15% of 200?',
          options: ['25', '30', '35', '40'],
          correct: 1
        },
        {
          question: 'What is the area of a circle with radius 5?',
          options: ['25π', '10π', '5π', '15π'],
          correct: 0
        }
      ]
    },
    science: {
      name: 'Science',
      questions: [
        {
          question: 'What is the chemical symbol for water?',
          options: ['H₂O', 'CO₂', 'O₂', 'H₂'],
          correct: 0
        },
        {
          question: 'What force keeps planets in orbit?',
          options: ['Magnetic force', 'Gravity', 'Electric force', 'Nuclear force'],
          correct: 1
        },
        {
          question: 'What is the powerhouse of the cell?',
          options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Cytoplasm'],
          correct: 2
        }
      ]
    },
    english: {
      name: 'English',
      questions: [
        {
          question: 'What is the past tense of "go"?',
          options: ['Gone', 'Went', 'Going', 'Goes'],
          correct: 1
        },
        {
          question: 'Which is a metaphor?',
          options: ['He runs like the wind', 'Time is money', 'She is as brave as a lion', 'The wind whispered'],
          correct: 1
        },
        {
          question: 'What is the plural of "child"?',
          options: ['Childs', 'Children', 'Childes', 'Childrens'],
          correct: 1
        }
      ]
    }
  };

  const currentQuiz = quizData[subject];
  const questions = currentQuiz?.questions || [];
  const totalQuestions = questions.length;

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correct;
    if (isCorrect) {
      setScore(score + 1);
    }

    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        const finalScore = score + (isCorrect ? 1 : 0);
        const percentage = Math.round((finalScore / totalQuestions) * 100);
        const points = finalScore * 10;
        
        addPoints(points);
        updateProgress(subject, percentage);
        setQuizComplete(true);
      }
    }, 1500);
  };

  const getResultColor = () => {
    if (selectedAnswer === null) return '';
    const isCorrect = selectedAnswer === questions[currentQuestion].correct;
    return isCorrect ? 'text-green-600' : 'text-red-600';
  };

  const getResultIcon = () => {
    if (selectedAnswer === null) return null;
    const isCorrect = selectedAnswer === questions[currentQuestion].correct;
    return isCorrect ? FiCheck : FiX;
  };

  if (!currentQuiz) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Quiz not found</p>
      </div>
    );
  }

  if (quizComplete) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const points = score * 10;
    
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-24 h-24 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SafeIcon icon={FiStar} className="text-white text-3xl" />
          </motion.div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Quiz Complete!</h1>
          <p className="text-gray-600 mb-6">Great job on completing the {currentQuiz.name} quiz</p>
          
          <div className="space-y-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-2xl">
              <div className="text-3xl font-bold text-gray-800">{score}/{totalQuestions}</div>
              <div className="text-sm text-gray-500">Questions Correct</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-2xl">
                <div className="text-2xl font-bold text-blue-600">{percentage}%</div>
                <div className="text-sm text-blue-600">Score</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-2xl">
                <div className="text-2xl font-bold text-yellow-600">+{points}</div>
                <div className="text-sm text-yellow-600">Points</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <motion.button
              onClick={() => navigate(`/subject/${subject}`)}
              className="w-full p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-semibold hover:shadow-lg transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Back to Subject
            </motion.button>
            
            <motion.button
              onClick={() => navigate('/')}
              className="w-full p-4 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Go Home
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <motion.button
            onClick={() => navigate(-1)}
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <SafeIcon icon={FiArrowLeft} className="text-white" />
          </motion.button>
          
          <div className="text-center">
            <h1 className="text-xl font-bold">{currentQuiz.name} Quiz</h1>
            <p className="text-indigo-200 text-sm">
              Question {currentQuestion + 1} of {totalQuestions}
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-bold">{score}/{totalQuestions}</div>
            <div className="text-indigo-200 text-sm">Score</div>
          </div>
        </div>
        
        <div className="w-full bg-white/30 rounded-full h-2">
          <motion.div 
            className="bg-white rounded-full h-2 transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </motion.div>

      {/* Question */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 mb-6"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-6 leading-relaxed">
              {questions[currentQuestion]?.question}
            </h2>
            
            <div className="space-y-3">
              {questions[currentQuestion]?.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 rounded-2xl border-2 text-left font-medium transition-all ${
                    selectedAnswer === index
                      ? showResult
                        ? index === questions[currentQuestion].correct
                          ? 'bg-green-50 border-green-500 text-green-700'
                          : 'bg-red-50 border-red-500 text-red-700'
                        : 'bg-blue-50 border-blue-500 text-blue-700'
                      : showResult && index === questions[currentQuestion].correct
                        ? 'bg-green-50 border-green-500 text-green-700'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                  whileHover={{ scale: showResult ? 1 : 1.01 }}
                  whileTap={{ scale: showResult ? 1 : 0.99 }}
                  disabled={showResult}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && (
                      <SafeIcon 
                        icon={
                          index === questions[currentQuestion].correct 
                            ? FiCheck 
                            : selectedAnswer === index 
                              ? FiX 
                              : null
                        } 
                        className={
                          index === questions[currentQuestion].correct 
                            ? 'text-green-600' 
                            : selectedAnswer === index 
                              ? 'text-red-600' 
                              : 'text-transparent'
                        }
                      />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Next Button */}
        <motion.button
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null || showResult}
          className={`w-full p-4 rounded-2xl font-semibold text-lg transition-all ${
            selectedAnswer === null || showResult
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg'
          }`}
          whileHover={{ scale: selectedAnswer !== null && !showResult ? 1.02 : 1 }}
          whileTap={{ scale: selectedAnswer !== null && !showResult ? 0.98 : 1 }}
        >
          {showResult ? 'Loading...' : currentQuestion === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
        </motion.button>
      </div>
    </div>
  );
};

export default Quiz;