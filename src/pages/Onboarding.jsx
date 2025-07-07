import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnBoarding } from '@questlabs/react-sdk';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import questConfig from '../config/questConfig';

const { FiBook } = FiIcons;

const Onboarding = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const handleComplete = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex">
      <div className="flex-1 flex">
        <div className="w-full max-w-md mx-auto flex flex-col justify-center p-6">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center">
                <SafeIcon icon={FiBook} className="text-3xl text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Let's Get Started</h1>
            <p className="text-gray-600 mt-2">Tell us about yourself</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <OnBoarding
              userId={userId}
              token={token}
              questId={questConfig.QUEST_ONBOARDING_QUESTID}
              answer={answers}
              setAnswer={setAnswers}
              getAnswers={handleComplete}
              accent="#4F46E5"
              singleChoose="modal1"
              multiChoice="modal2"
            >
              <OnBoarding.Header />
              <OnBoarding.Content />
              <OnBoarding.Footer />
            </OnBoarding>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;