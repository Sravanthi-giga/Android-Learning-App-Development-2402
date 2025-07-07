import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QuestProvider } from '@questlabs/react-sdk';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Subjects from './pages/Subjects';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import SubjectDetail from './pages/SubjectDetail';
import Quiz from './pages/Quiz';
import questConfig from './config/questConfig';
import '@questlabs/react-sdk/dist/style.css';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/subjects" element={<ProtectedRoute><Subjects /></ProtectedRoute>} />
        <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/subject/:id" element={<ProtectedRoute><SubjectDetail /></ProtectedRoute>} />
        <Route path="/quiz/:subject" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
      </Routes>
      {isAuthenticated && <Navigation />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <QuestProvider
          apiKey={questConfig.APIKEY}
          entityId={questConfig.ENTITYID}
          apiType="PRODUCTION"
        >
          <AppContent />
        </QuestProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;