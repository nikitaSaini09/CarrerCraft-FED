import React from 'react';

const Card = ({ children, className = '', ...props }) => {
  const baseClasses = 'bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-border-light dark:border-border-dark transition-all duration-500 hover:shadow-glow hover:scale-[1.02] hover:border-muted-gold/30';
  const cardClasses = `${baseClasses} ${className}`;
  
  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

const CardContent = ({ children, className = '', ...props }) => {
  const baseClasses = 'p-6';
  const contentClasses = `${baseClasses} ${className}`;
  
  return (
    <div className={contentClasses} {...props}>
      {children}
    </div>
  );
};

export { Card, CardContent };
