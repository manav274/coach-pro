import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

// Auth components
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { ResetPasswordPage } from './components/auth/ResetPasswordPage';

// Onboarding
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';

// Dashboard
import { Dashboard } from './components/dashboard/Dashboard';

// Tools
import { ToolsLayout } from './components/tools/ToolsLayout';
import { StrategyCanvas } from './components/tools/StrategyCanvas';
import { GoalSetting } from './components/tools/GoalSetting';

// Sessions
import { SessionsPage } from './components/sessions/SessionsPage';

// Analytics
import { AnalyticsPage } from './components/analytics/AnalyticsPage';

// Admin
import { AdminPage } from './components/admin/AdminPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const OnboardingRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.isOnboarded) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } 
      />
      <Route 
        path="/signup" 
        element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        } 
      />
      <Route 
        path="/reset-password" 
        element={
          <PublicRoute>
            <ResetPasswordPage />
          </PublicRoute>
        } 
      />

      {/* Onboarding route */}
      <Route 
        path="/onboarding" 
        element={
          <OnboardingRoute>
            <OnboardingFlow />
          </OnboardingRoute>
        } 
      />

      {/* Protected routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />

      {/* Tools routes */}
      <Route 
        path="/tools" 
        element={
          <ProtectedRoute>
            <ToolsLayout>
              <div />
            </ToolsLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/tools/strategy-canvas" 
        element={
          <ProtectedRoute>
            <ToolsLayout>
              <StrategyCanvas />
            </ToolsLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/tools/goal-setting" 
        element={
          <ProtectedRoute>
            <ToolsLayout>
              <GoalSetting />
            </ToolsLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/tools/*" 
        element={
          <ProtectedRoute>
            <ToolsLayout>
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Tool Coming Soon</h2>
                <p className="text-gray-600">This coaching tool is under development</p>
              </div>
            </ToolsLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/sessions/*" 
        element={
          <ProtectedRoute>
            <SessionsPage />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/analytics" 
        element={
          <ProtectedRoute>
            <AnalyticsPage />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        } 
      />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;