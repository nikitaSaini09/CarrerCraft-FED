import React from 'react';

const Input = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  name,
  className = '',
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'w-full px-4 py-3 border border-pink-200 dark:border-pink-700 rounded-xl bg-pink-50 dark:bg-zinc-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const inputClasses = `${baseClasses} ${className}`;
  
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={inputClasses}
      {...props}
    />
  );
};

export { Input };
