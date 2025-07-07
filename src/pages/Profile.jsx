import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUser, FiSettings, FiBook, FiStar, FiTarget, FiEdit3, FiCamera, FiBell, FiHelpCircle, FiLogOut } = FiIcons;

const Profile = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);

  const handleSave = () => {
    setUser(prev => ({ ...prev, name: editedName }));
    setIsEditing(false);
  };

  const profileStats = [
    { label: 'Total Points', value: user.points, icon: FiStar, color: 'text-yellow-500' },
    { label: 'Lessons Completed', value: user.completedLessons, icon: FiBook, color: 'text-blue-500' },
    { label: 'Current Streak', value: `${user.streak} days`, icon: FiTarget, color: 'text-green-500' }
  ];

  const menuItems = [
    { icon: FiSettings, label: 'Settings', action: () => {} },
    { icon: FiBell, label: 'Notifications', action: () => {} },
    { icon: FiHelpCircle, label: 'Help & Support', action: () => {} },
    { icon: FiLogOut, label: 'Sign Out', action: () => {}, danger: true }
  ];

  return (
    <div className="pb-20 min-h-screen">
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-b-3xl"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-2">Profile</h1>
        <p className="text-purple-100">Manage your account and preferences</p>
      </motion.div>

      <div className="p-6">
        {/* Profile Info */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
              />
              <motion.button
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SafeIcon icon={FiCamera} className="text-sm" />
              </motion.button>
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg font-semibold text-lg"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm font-medium"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditedName(user.name);
                      }}
                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                  <motion.button
                    onClick={() => setIsEditing(true)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <SafeIcon icon={FiEdit3} className="text-sm" />
                  </motion.button>
                </div>
              )}
              <p className="text-gray-500">{user.grade}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {profileStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-3 bg-gray-50 rounded-xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <SafeIcon icon={stat.icon} className={`text-2xl ${stat.color} mx-auto mb-1`} />
                <div className="text-lg font-bold text-gray-800">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Menu Items */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              onClick={item.action}
              className={`w-full flex items-center space-x-4 p-4 hover:bg-gray-50 transition-colors ${
                index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <SafeIcon 
                icon={item.icon} 
                className={`text-xl ${item.danger ? 'text-red-500' : 'text-gray-400'}`} 
              />
              <span className={`font-medium ${item.danger ? 'text-red-500' : 'text-gray-800'}`}>
                {item.label}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* App Info */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-gray-400 text-sm">EduLearn v1.0.0</p>
          <p className="text-gray-400 text-xs mt-1">Made with ❤️ for learners</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;