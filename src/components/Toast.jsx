import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Toast = ({ message, type, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const bgColor = {
    success: 'bg-green-500/20 border-green-500/30',
    error: 'bg-red-500/20 border-red-500/30',
    info: 'bg-blue-500/20 border-blue-500/30'
  }[type] || 'bg-gray-500/20 border-gray-500/30';

  const textColor = {
    success: 'text-green-400',
    error: 'text-red-400',
    info: 'text-blue-400'
  }[type] || 'text-gray-400';

  return (
    <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md border transform transition-all duration-500 ${bgColor}`}>
      <div className="flex items-center space-x-3">
        <div className={textColor}>
          {type === 'success' && '✅'}
          {type === 'error' && '❌'}
          {type === 'info' && 'ℹ️'}
        </div>
        <p className="font-medium text-white">{message}</p>
        <button onClick={onClose} className="ml-4 text-gray-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;