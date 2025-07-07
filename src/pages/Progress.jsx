import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTrendingUp, FiTarget, FiStar, FiClock, FiBook, FiAward } = FiIcons;

const Progress = ({ user, progress }) => {
  const stats = [
    { label: 'Total Points', value: user.points, icon: FiStar, color: 'text-yellow-500' },
    { label: 'Lessons Completed', value: user.completedLessons, icon: FiBook, color: 'text-blue-500' },
    { label: 'Current Streak', value: `${user.streak} days`, icon: FiTarget, color: 'text-green-500' },
    { label: 'Study Time', value: '47 hours', icon: FiClock, color: 'text-purple-500' }
  ];

  const subjects = [
    { name: 'Mathematics', progress: progress.mathematics, color: 'bg-blue-500' },
    { name: 'Science', progress: progress.science, color: 'bg-green-500' },
    { name: 'English', progress: progress.english, color: 'bg-purple-500' },
    { name: 'History', progress: progress.history, color: 'bg-orange-500' },
    { name: 'Geography', progress: progress.geography, color: 'bg-teal-500' },
    { name: 'Programming', progress: progress.programming, color: 'bg-indigo-500' }
  ];

  const weeklyProgress = [
    { day: 'Mon', lessons: 3 },
    { day: 'Tue', lessons: 2 },
    { day: 'Wed', lessons: 4 },
    { day: 'Thu', lessons: 1 },
    { day: 'Fri', lessons: 5 },
    { day: 'Sat', lessons: 2 },
    { day: 'Sun', lessons: 3 }
  ];

  const maxLessons = Math.max(...weeklyProgress.map(d => d.lessons));

  return (
    <div className="pb-20 min-h-screen">
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-b-3xl"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-2">Your Progress</h1>
        <p className="text-green-100">Track your learning journey and achievements</p>
      </motion.div>

      <div className="p-6">
        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 gap-4 mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                  <SafeIcon icon={stat.icon} className={`text-lg ${stat.color}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Weekly Activity */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Weekly Activity</h2>
          <div className="flex items-end justify-between space-x-2">
            {weeklyProgress.map((day, index) => (
              <div key={day.day} className="flex-1 flex flex-col items-center">
                <motion.div
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg mb-2"
                  style={{ height: `${(day.lessons / maxLessons) * 80}px` }}
                  initial={{ height: 0 }}
                  animate={{ height: `${(day.lessons / maxLessons) * 80}px` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
                <span className="text-xs text-gray-500 font-medium">{day.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Subject Progress */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Subject Progress</h2>
          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                className="flex items-center justify-between"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-3 flex-1">
                  <div className={`w-3 h-3 ${subject.color} rounded-full`} />
                  <span className="font-medium text-gray-800">{subject.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <motion.div 
                      className={`h-2 ${subject.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${subject.progress}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-600 w-10">
                    {subject.progress}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-200"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <SafeIcon icon={FiAward} className="text-yellow-600 text-xl" />
            <h2 className="text-xl font-bold text-gray-800">Recent Achievement</h2>
          </div>
          <div className="bg-white p-4 rounded-xl">
            <h3 className="font-semibold text-gray-800 mb-1">Streak Master</h3>
            <p className="text-sm text-gray-600">Maintained a 7-day learning streak!</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Progress;