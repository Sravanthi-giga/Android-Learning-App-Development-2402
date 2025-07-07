import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowLeft, FiPlay, FiBook, FiCheckCircle, FiClock, FiStar, FiTarget } = FiIcons;

const SubjectDetail = ({ progress, updateProgress }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const subjects = {
    mathematics: {
      name: 'Mathematics',
      description: 'Master mathematical concepts from basic algebra to advanced calculus',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      icon: FiTarget
    },
    science: {
      name: 'Science',
      description: 'Explore the wonders of physics, chemistry, and biology',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      icon: FiStar
    },
    english: {
      name: 'English',
      description: 'Improve your language skills through literature and writing',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      icon: FiBook
    },
    history: {
      name: 'History',
      description: 'Journey through time and learn about world civilizations',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      icon: FiClock
    },
    geography: {
      name: 'Geography',
      description: 'Discover our planet and its diverse cultures',
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600',
      icon: FiTarget
    },
    programming: {
      name: 'Programming',
      description: 'Learn to code and build amazing applications',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      icon: FiPlay
    }
  };

  const subject = subjects[id];
  const currentProgress = progress[id] || 0;

  const lessons = [
    { id: 1, title: 'Introduction to Basics', duration: '15 min', completed: true },
    { id: 2, title: 'Fundamental Concepts', duration: '20 min', completed: true },
    { id: 3, title: 'Advanced Topics', duration: '25 min', completed: currentProgress >= 50 },
    { id: 4, title: 'Practice Problems', duration: '30 min', completed: currentProgress >= 75 },
    { id: 5, title: 'Final Assessment', duration: '20 min', completed: currentProgress >= 100 }
  ];

  const completedLessons = lessons.filter(lesson => lesson.completed).length;

  if (!subject) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Subject not found</p>
      </div>
    );
  }

  return (
    <div className="pb-20 min-h-screen">
      {/* Header */}
      <motion.div 
        className={`bg-gradient-to-r ${subject.color} text-white p-6 rounded-b-3xl`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-4 mb-4">
          <motion.button
            onClick={() => navigate(-1)}
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <SafeIcon icon={FiArrowLeft} className="text-white" />
          </motion.button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{subject.name}</h1>
            <p className="text-white/80 text-sm">{subject.description}</p>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Course Progress</span>
            <span className="text-sm">{completedLessons}/{lessons.length} lessons</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: `${currentProgress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/80 mt-1">
            <span>{currentProgress}% Complete</span>
            <span>{Math.round((100 - currentProgress) / 20)} lessons remaining</span>
          </div>
        </div>
      </motion.div>

      <div className="p-6">
        {/* Quick Actions */}
        <motion.div 
          className="grid grid-cols-2 gap-4 mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.button
            onClick={() => navigate(`/quiz/${id}`)}
            className={`p-4 bg-gradient-to-r ${subject.color} text-white rounded-2xl shadow-lg hover:shadow-xl transition-all`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiPlay} className="text-2xl" />
              <div className="text-left">
                <h3 className="font-semibold">Take Quiz</h3>
                <p className="text-sm text-white/80">Test your knowledge</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            className="p-4 bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 ${subject.bgColor} rounded-xl`}>
                <SafeIcon icon={FiBook} className={`text-xl ${subject.textColor}`} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800">Study Guide</h3>
                <p className="text-sm text-gray-500">Review materials</p>
              </div>
            </div>
          </motion.button>
        </motion.div>

        {/* Lessons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Course Lessons</h2>
          <div className="space-y-3">
            {lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                className={`p-4 rounded-2xl border transition-all ${
                  lesson.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: lesson.completed ? 1 : 1.01 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      lesson.completed 
                        ? 'bg-green-100 text-green-600' 
                        : `${subject.bgColor} ${subject.textColor}`
                    }`}>
                      <SafeIcon 
                        icon={lesson.completed ? FiCheckCircle : FiPlay} 
                        className="text-lg" 
                      />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${
                        lesson.completed ? 'text-green-800' : 'text-gray-800'
                      }`}>
                        {lesson.title}
                      </h3>
                      <p className={`text-sm ${
                        lesson.completed ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {lesson.duration}
                      </p>
                    </div>
                  </div>
                  {lesson.completed && (
                    <SafeIcon icon={FiCheckCircle} className="text-green-500 text-xl" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          className="mt-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.button
            onClick={() => navigate(`/quiz/${id}`)}
            className={`w-full p-4 bg-gradient-to-r ${subject.color} text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continue Learning
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default SubjectDetail;