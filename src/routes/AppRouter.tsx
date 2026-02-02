import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { ProtectedRoute } from './ProtectedRoute';

import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { NotFoundPage } from '../pages/NotFoundPage';

// Placeholder Place for Dashboard (We'll implement the real one in Phase 5, but we need a target)
const DashboardPlaceholder = () => <div className="p-4"><h1>Dashboard (Coming Soon)</h1></div>;

export const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPlaceholder />} />
          <Route path="roles" element={<div>Roles Page</div>} />
          <Route path="users" element={<div>Users Page</div>} />
          <Route path="categories" element={<div>Categories Page</div>} />
          <Route path="products" element={<div>Products Page</div>} />
          <Route path="database" element={<div>Database Page</div>} />
          <Route path="settings" element={<div>Settings Page</div>} />
        </Route>
      </Route>

      {/* Redirect Root to Login (or Dashboard if auth logic allows) */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
