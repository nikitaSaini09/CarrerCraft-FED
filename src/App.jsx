import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard';
import CareerAdvisor from './pages/CareerAdvisor';
import Roadmap from './pages/Roadmap';
import PortfolioForm from './pages/PortfolioForm';
import SkillTracker from './pages/SkillTracker';
import WelcomeDashboard from './pages/WelcomeDashboard';
import MoodTracker from './pages/MoodTracker';
import ResourceVault from './pages/ResourceVault';
import ResumeAnalyzer from './pages/ResumeAnalyzer';

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/';
  
  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-olive-sand dark:bg-olive-black text-text-light dark:text-text-dark font-body transition-colors duration-500">
          {!hideNavbar && <Navbar />}
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }>
              <Route index element={<WelcomeDashboard />} />
              <Route path="skills" element={<SkillTracker />} />
              <Route path="advisor" element={<CareerAdvisor />} />
              <Route path="roadmap" element={<Roadmap />} />
              <Route path="portfolio" element={<PortfolioForm />} />
              <Route path="mood" element={<MoodTracker />} />
              <Route path="resources" element={<ResourceVault />} />
              <Route path="resume-analyzer" element={<ResumeAnalyzer />} />
            </Route>
          </Routes>
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
