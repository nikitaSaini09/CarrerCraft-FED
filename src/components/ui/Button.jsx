import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-2xl transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';
  
  const variants = {
    primary: 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-md hover:shadow-lg focus:ring-emerald-500',
    secondary: 'bg-teal-500 text-white hover:bg-teal-600 shadow-md hover:shadow-lg focus:ring-teal-500',
    accent: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg focus:ring-emerald-600',
    sage: 'bg-teal-600 text-white hover:bg-teal-700 shadow-md hover:shadow-lg focus:ring-teal-600',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg focus:ring-red-500',
    ghost: 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 shadow-md hover:shadow-lg focus:ring-emerald-500',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };
  
  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <motion.button 
      className={buttonClasses} 
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export { Button };
