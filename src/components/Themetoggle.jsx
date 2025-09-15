import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800/80 dark:bg-white/20 text-white font-medium shadow-pill hover:bg-gray-700 dark:hover:bg-white/30 hover:shadow-teal-glow transition-all duration-300"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-white" />}
      <span className="text-white">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
    </motion.button>
  );
};

export default ThemeToggle;
