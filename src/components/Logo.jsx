import React from 'react';
import { Rocket } from 'lucide-react';

const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Rocket className="w-7 h-7 text-teal-500" />
      <span className="text-xl font-display font-bold text-text-dark">
        CareerCraft
      </span>
    </div>
  );
};

export default Logo;
