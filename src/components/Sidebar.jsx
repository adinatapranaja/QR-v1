import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Calendar, Users, Scan, BarChart3, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { role } = useAuth();
  const location = useLocation();

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'events', label: 'Events', icon: Calendar, path: '/dashboard/events' },
    { id: 'attendees', label: 'Attendees', icon: Users, path: '/dashboard/attendees' },
    { id: 'scanner', label: 'QR Scanner', icon: Scan, path: '/dashboard/scanner' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/dashboard/analytics' },
  ];

  const ownerNavigation = [
    { id: 'settings', label: 'Settings', icon: Settings, path: '/dashboard/settings' }
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`fixed left-0 top-16 bottom-0 w-64 bg-gray-900/80 backdrop-blur-xl border-r border-gray-800/50 transform transition-transform duration-300 z-30 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:relative lg:translate-x-0`}>
        <div className="p-6">
          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || 
                              (item.path === '/dashboard' && location.pathname === '/dashboard');
              
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={onClose}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 shadow-lg text-white'
                      : 'text-gray-300 hover:bg-gray-800/50 hover:text-white border border-transparent hover:border-gray-700/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              );
            })}

            {/* Owner Section */}
            {role === 'owner' && (
              <div className="pt-4 border-t border-gray-800/50">
                {ownerNavigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      onClick={onClose}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 shadow-lg text-white'
                          : 'text-gray-300 hover:bg-gray-800/50 hover:text-white border border-transparent hover:border-gray-700/50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            )}
          </nav>

          {/* Upgrade Banner (for non-owners) */}
          {role !== 'owner' && (
            <div className="mt-8 p-4 bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm font-medium">Upgrade to Pro</span>
              </div>
              <p className="text-xs text-gray-400 mb-3">Unlock advanced analytics and unlimited events</p>
              <button className="w-full px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200">
                Upgrade Now
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;