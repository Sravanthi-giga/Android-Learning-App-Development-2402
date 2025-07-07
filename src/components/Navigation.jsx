import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import GetStartedWrapper from './GetStartedWrapper';

const { FiHome, FiBook, FiTrendingUp, FiUser } = FiIcons;

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', icon: FiHome, label: 'Home', path: '/' },
    { id: 'subjects', icon: FiBook, label: 'Subjects', path: '/subjects' },
    { id: 'progress', icon: FiTrendingUp, label: 'Progress', path: '/progress' },
    { id: 'profile', icon: FiUser, label: 'Profile', path: '/profile' }
  ];

  return (
    <>
      <GetStartedWrapper />
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                  isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <SafeIcon
                  icon={item.icon}
                  className={`text-xl mb-1 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}
                />
                <span className="text-xs font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    className="w-1 h-1 bg-blue-600 rounded-full mt-1"
                    layoutId="activeIndicator"
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default Navigation;