import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock auth initialization
    setTimeout(() => {
      // Check if user was previously logged in (you can use localStorage here)
      const savedUser = localStorage.getItem('qr-event-user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setRole(userData.role);
      }
      setLoading(false);
    }, 1000);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          uid: 'demo-user-123',
          email: email,
          displayName: email.split('@')[0],
          role: email.includes('owner') ? 'owner' : 'admin'
        };
        setUser(mockUser);
        setRole(mockUser.role);
        localStorage.setItem('qr-event-user', JSON.stringify(mockUser));
        setLoading(false);
        resolve(mockUser);
      }, 1500);
    });
  };

  const logout = async () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem('qr-event-user');
  };

  const value = {
    user,
    role,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};