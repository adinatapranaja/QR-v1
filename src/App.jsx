// src/App.jsx
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';

// Lazy load pages for better performance
const Landing = React.lazy(() => import('./pages/Landing.jsx'));
const Login = React.lazy(() => import('./pages/Login.jsx'));
const Dashboard = React.lazy(() => import('./pages/Dashboard.jsx'));
const Events = React.lazy(() => import('./pages/Events.jsx'));
const Attendees = React.lazy(() => import('./pages/Attendees.jsx'));
const Scanner = React.lazy(() => import('./pages/Scanner.jsx'));
const Analytics = React.lazy(() => import('./pages/Analytics.jsx'));
const Settings = React.lazy(() => import('./pages/Settings.jsx'));

// Layout wrapper for dashboard pages
const DashboardLayout = React.lazy(() => import('./components/DashboardLayout.jsx'));

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
