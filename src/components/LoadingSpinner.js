import React from 'react';

const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizeClasses[size]} border-4 border-gray-600 border-t-accent-blue rounded-full animate-spin mb-4`}></div>
      <p className="text-gray-400 text-sm">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
