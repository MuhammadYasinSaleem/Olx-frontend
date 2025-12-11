import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from '@components/compounds';
import { AuthPage, HomePage } from '@components/pages';

import { ProtectedRoute } from './ProtectedRoute';
import { ROUTES } from './routes.config';

export const AppRoutes: React.FC = () => (
  <Routes>
    <Route path={ROUTES.SIGNIN} element={<AuthPage />} />
    <Route path={ROUTES.SIGNUP} element={<AuthPage />} />

    <Route element={<Layout />}>
      <Route path={ROUTES.HOME} element={<HomePage />} />

      <Route
        path={ROUTES.DASHBOARD}
        element={
          <ProtectedRoute>
            <div>Dashboard - Coming Soon</div>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.PRODUCTS}
        element={<div>Products - Coming Soon</div>}
      />

      <Route
        path={ROUTES.SETTINGS}
        element={
          <ProtectedRoute>
            <div>Settings - Coming Soon</div>
          </ProtectedRoute>
        }
      />
    </Route>

    <Route
      path={ROUTES.NOT_FOUND}
      element={
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        </div>
      }
    />
  </Routes>
);
