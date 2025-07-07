import { useNavigate } from 'react-router-dom';
import { QuestLogin } from '@questlabs/react-sdk';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiBook } = FiIcons;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = ({ userId, token, newUser }) => {
    login({ userId, token });
    if (newUser) {
      navigate('/onboarding');
    } else {
      navigate('/');
    }
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
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Continue your learning journey</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <QuestLogin
              onSubmit={handleLogin}
              email={true}
              google={false}
              accent="#4F46E5"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;