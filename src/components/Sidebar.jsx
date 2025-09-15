import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaHome, 
  FaUserTie, 
  FaRoute, 
  FaFolderOpen, 
  FaChartLine,
  FaRocket
} from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: FaHome },
    { path: '/dashboard/advisor', label: 'Career Advisor', icon: FaUserTie },
    { path: '/dashboard/roadmap', label: 'Roadmap', icon: FaRoute },
    { path: '/dashboard/portfolio', label: 'Portfolio', icon: FaFolderOpen },
    { path: '/dashboard/skills', label: 'Skill Tracker', icon: FaChartLine },
  ];

  return (
    <motion.div 
      className="min-h-screen bg-white/80 backdrop-blur-sm dark:bg-zinc-900/80 p-6 w-72 border-r border-pink-200 dark:border-zinc-700 shadow-lg"
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div 
        className="flex items-center gap-3 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg flex items-center justify-center">
          <FaRocket className="text-white text-lg" />
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          CareerCraft
        </h2>
      </motion.div>
      
      <nav className="space-y-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Link 
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive 
                    ? 'bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 text-pink-700 dark:text-pink-300 shadow-md' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-zinc-800 hover:text-pink-600 dark:hover:text-pink-300'
                }`}
              >
                <Icon className={`text-lg transition-transform duration-300 group-hover:scale-110 ${
                  isActive ? 'text-pink-600 dark:text-pink-400' : 'text-gray-500 dark:text-gray-400'
                }`} />
                <span className="font-medium">{item.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </nav>
      
      <motion.div 
        className="mt-8 p-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl border border-pink-200 dark:border-pink-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">🎯 Pro Tip</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Track your progress daily to stay motivated on your career journey!
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
