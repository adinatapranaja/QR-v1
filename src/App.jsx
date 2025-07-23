// src/App.jsx
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load pages for better performance
const Landing = React.lazy(() => import('./pages/Landing'));
const Login = React.lazy(() => import('./pages/Login'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Events = React.lazy(() => import('./pages/Events'));
const Attendees = React.lazy(() => import('./pages/Attendees'));
const Scanner = React.lazy(() => import('./pages/Scanner'));
const Analytics = React.lazy(() => import('./pages/Analytics'));
const Settings = React.lazy(() => import('./pages/Settings'));

// Layout wrapper for dashboard pages
const DashboardLayout = React.lazy(() => import('./components/DashboardLayout'));

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="App">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              
              {/* Protected Dashboard Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="events" element={<Events />} />
                <Route path="attendees" element={<Attendees />} />
                <Route path="scanner" element={<Scanner />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={
                  <ProtectedRoute requiredRole="owner">
                    <Settings />
                  </ProtectedRoute>
                } />
              </Route>
              
              {/* Redirect unknown routes */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;