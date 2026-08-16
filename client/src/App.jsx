import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Loader from './components/Loader';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const AdminLogin = lazy(() => import('./pages/AdminLogin.jsx'));
const ClassSelection = lazy(() => import('./pages/ClassSelection.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const Lesson = lazy(() => import('./pages/Lesson.jsx'));
const Profile = lazy(() => import('./pages/Profile.jsx'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout.jsx'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard.jsx'));
const GenerateId = lazy(() => import('./pages/admin/GenerateId.jsx'));
const UserList = lazy(() => import('./pages/admin/UserList.jsx'));
const Analytics = lazy(() => import('./pages/admin/Analytics.jsx'));
const Settings = lazy(() => import('./pages/admin/Settings.jsx'));

// Protected route wrapper
const ProtectedRoute = ({ children, adminOnly }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'ADMIN') {
    return <Navigate to="/class-selection" replace />;
  }

  return children;
};

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Protected student pages */}
        <Route
          path="/class-selection"
          element={
            <ProtectedRoute>
              <Layout><ClassSelection /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout><Dashboard /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/lesson/:id"
          element={
            <ProtectedRoute>
              <Layout><Lesson /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout><Profile /></Layout>
            </ProtectedRoute>
          }
        />

        {/* Protected admin pages */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="generate" element={<GenerateId />} />
          <Route path="students" element={<UserList role="STUDENT" />} />
          <Route path="teachers" element={<UserList role="TEACHER" />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Redirect based on auth state */}
        <Route path="*" element={<Navigate to={user ? (user.role === 'ADMIN' ? '/admin' : '/class-selection') : '/'} replace />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;