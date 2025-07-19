import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import UserManagement from './components/admin/UserManagement';
import HuntManagement from './components/admin/HuntManagement';
import TreasureList from './components/treasure/TreasureList';
import TreasureDetail from './components/treasure/TreasureDetail';
import TreasureForm from './components/treasure/TreasureForm';
import SignInPage from './components/auth/SignInPage';
import LandingPage from './components/LandingPage';
import NotFound from './components/common/NotFound';

// Protected Route wrapper component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Admin Route wrapper component
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Public Route wrapper component (shows landing page if not authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignInPage />} />
      
      <Route path="/" element={
        <PublicRoute>
          <Layout />
        </PublicRoute>
      }>
        <Route index element={<TreasureList />} />
        <Route path="treasures">
          <Route index element={<TreasureList />} />
          <Route path="new" element={<TreasureForm />} />
          <Route path=":id" element={<TreasureDetail />} />
          <Route path=":id/edit" element={<TreasureForm />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/admin" element={
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="hunts" element={<HuntManagement />} />
      </Route>
    </Routes>
  );
}

export default App;