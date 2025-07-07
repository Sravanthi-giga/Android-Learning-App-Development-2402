import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiBook, FiCode, FiGlobe, FiTrendingUp, FiTarget, FiUsers } = FiIcons;

const Subjects = ({ progress }) => {
  const navigate = useNavigate();

  const subjects = [
    {
      id: 'mathematics',
      name: 'Mathematics',
      description: 'Algebra, Geometry, Calculus',
      icon: FiTarget,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      lessons: 12,
      progress: progress.mathematics || 0
    },
    {
      id: 'science',
      name: 'Science',
      description: 'Physics, Chemistry, Biology',
      icon: FiTrendingUp,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      lessons: 15,
      progress: progress.science || 0
    },
    {
      id: 'english',
      name: 'English',
      description: 'Literature, Grammar, Writing',
      icon: FiBook,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      lessons: 10,
      progress: progress.english || 0
    },
    {
      id: 'history',
      name: 'History',
      description: 'World History, Ancient Civilizations',
      icon: FiUsers,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      lessons: 8,
      progress: progress.history || 0
    },
    {
      id: 'geography',
      name: 'Geography',
      description: 'World Geography, Climate, Culture',
      icon: FiGlobe,
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600',
      lessons: 9,
      progress: progress.geography || 0
    },
    {
      id: 'programming',
      name: 'Programming',
      description: 'JavaScript, Python, Web Development',
      icon: FiCode,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      lessons: 20,
      progress: progress.programming || 0
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="pb-20 min-h-screen">
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-b-3xl"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-2">All Subjects</h1>
        <p className="text-indigo-100">Choose a subject to continue your learning journey</p>
      </motion.div>

      {/* Subjects Grid */}
      <motion.div 
        className="p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 gap-4">
          {subjects.map((subject) => (
            <motion.div
              key={subject.id}
              variants={itemVariants}
              onClick={() => navigate(`/subject/${subject.id}`)}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`h-2 bg-gradient-to-r ${subject.color}`} />
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${subject.bgColor} rounded-xl flex items-center justify-center`}>
                      <SafeIcon icon={subject.icon} className={`text-xl ${subject.textColor}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{subject.name}</h3>
                      <p className="text-sm text-gray-500">{subject.lessons} lessons</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${subject.textColor}`}>
                      {subject.progress}%
                    </div>
                    <div className="w-16 h-2 bg-gray-200 rounded-full mt-1">
                      <div 
                        className={`h-2 bg-gradient-to-r ${subject.color} rounded-full transition-all duration-500`}
                        style={{ width: `${subject.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{subject.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {Math.round((subject.progress / 100) * subject.lessons)} of {subject.lessons} completed
                  </span>
                  <motion.button
                    className={`px-4 py-2 bg-gradient-to-r ${subject.color} text-white rounded-xl font-medium text-sm hover:shadow-lg transition-all`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Continue
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Subjects;