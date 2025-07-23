import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Header from './Header';
import Sidebar from './Sidebar';
import Toast from './Toast';

const DashboardLayout = () => {
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Toast {...toast} onClose={() => setToast({ show: false, message: '', type: 'success' })} />
      
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-gray-900/20" />
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600 rounded-full blur-3xl animate-pulse" />
        </div>
      </div>

      <Header 
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      
      <div className="flex pt-16">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 p-6 lg:p-8">
          <Outlet context={{ showToast }} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;