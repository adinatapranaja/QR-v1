import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white/80">Loading QR Event Pro...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;