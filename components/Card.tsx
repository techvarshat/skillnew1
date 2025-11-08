import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={`bg-glass-bg backdrop-blur-lg border border-glass-border rounded-2xl shadow-lg transition-all duration-300 hover:border-white/30 hover:shadow-2xl hover:bg-white/10 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
