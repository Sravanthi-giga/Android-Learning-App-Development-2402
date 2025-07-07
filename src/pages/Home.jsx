import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiStar, FiTrendingUp, FiTarget, FiZap, FiBook, FiAward } = FiIcons;

const Home = ({ user, progress }) => {
  const navigate = useNavigate();

  const recentSubjects = [
    { id: 'mathematics', name: 'Mathematics', progress: progress.mathematics, color: 'bg-blue-500' },
    { id: 'science', name: 'Science', progress: progress.science, color: 'bg-green-500' },
    { id: 'english', name: 'English', progress: progress.english, color: 'bg-purple-500' }
  ];

  const achievements = [
    { id: 1, title: 'Quick Learner', description: 'Complete 5 lessons in a day', icon: FiZap, earned: true },
    { id: 2, title: 'Streak Master', description: '7 day learning streak', icon: FiTarget, earned: true },
    { id: 3, title: 'Math Wizard', description: 'Score 90% in Math quiz', icon: FiStar, earned: false }
  ];

  return (
    <div className="pb-20 min-h-screen">
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-b-3xl"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-12 h-12 rounded-full border-2 border-white"
            />
            <div>
              <h1 className="text-xl font-bold">Hello, {user.name.split(' ')[0]}!</h1>
              <p className="text-blue-100">{user.grade}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiStar} className="text-yellow-300" />
              <span className="font-bold">{user.points}</span>
            </div>
            <p className="text-sm text-blue-100">{user.streak} day streak</p>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Today's Progress</span>
            <span className="text-sm">{user.completedLessons}/{user.totalLessons} lessons</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: `${(user.completedLessons / user.totalLessons) * 100}%` }}
            />
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="p-6">
        <motion.div 
          className="grid grid-cols-2 gap-4 mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.button
            onClick={() => navigate('/subjects')}
            className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <SafeIcon icon={FiBook} className="text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800">Study</h3>
                <p className="text-sm text-gray-500">Continue learning</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            onClick={() => navigate('/progress')}
            className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <SafeIcon icon={FiTrendingUp} className="text-green-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800">Progress</h3>
                <p className="text-sm text-gray-500">Track stats</p>
              </div>
            </div>
          </motion.button>
        </motion.div>

        {/* Recent Subjects */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Continue Learning</h2>
          <div className="space-y-3">
            {recentSubjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                onClick={() => navigate(`/subject/${subject.id}`)}
                className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl transition-all"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${subject.color} rounded-xl flex items-center justify-center`}>
                      <SafeIcon icon={FiBook} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{subject.name}</h3>
                      <p className="text-sm text-gray-500">{subject.progress}% complete</p>
                    </div>
                  </div>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div 
                      className={`h-2 ${subject.color} rounded-full transition-all duration-500`}
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          className="mt-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Achievements</h2>
          <div className="grid grid-cols-1 gap-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                className={`p-4 rounded-2xl border ${
                  achievement.earned 
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    achievement.earned 
                      ? 'bg-yellow-100 text-yellow-600' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    <SafeIcon icon={achievement.earned ? FiAward : achievement.icon} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${
                      achievement.earned ? 'text-gray-800' : 'text-gray-500'
                    }`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-sm ${
                      achievement.earned ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.earned && (
                    <SafeIcon icon={FiStar} className="text-yellow-500" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;