import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QuestProvider } from '@questlabs/react-sdk';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Navigation from './components/Navigation';
import RoleBasedRoute from './components/RoleBasedRoute';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Subjects from './pages/Subjects';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import SubjectDetail from './pages/SubjectDetail';
import Quiz from './pages/Quiz';
import Unauthorized from './pages/Unauthorized';
import questConfig from './config/questConfig';
import '@questlabs/react-sdk/dist/style.css';
import './App.css';

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Routes>
        <Route 
          path="/login" 
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />} 
        />
        <Route 
          path="/unauthorized" 
          element={<Unauthorized />} 
        />
        <Route
          path="/onboarding"
          element={
            <RoleBasedRoute requiredRole="student">
              <Onboarding />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/"
          element={
            <RoleBasedRoute requiredRole="student">
              <Home />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/subjects"
          element={
            <RoleBasedRoute requiredRole="student">
              <Subjects />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/progress"
          element={
            <RoleBasedRoute requiredRole="student">
              <Progress />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <RoleBasedRoute requiredRole="student">
              <Profile />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/subject/:id"
          element={
            <RoleBasedRoute requiredRole="student">
              <SubjectDetail />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/quiz/:subject"
          element={
            <RoleBasedRoute requiredRole="student">
              <Quiz />
            </RoleBasedRoute>
          }
        />
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