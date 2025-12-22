/**
 * @fileoverview Protected route wrapper component for authentication-required routes.
 * @module routes/ProtectedRoute
 */

import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '@store';

import { ROUTES } from './routes.config';

/**
 * Props interface for ProtectedRoute component.
 */
interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Protected route wrapper that redirects unauthenticated users.
 *
 * Features:
 * - Checks user authentication state
 * - Redirects to signin page if not authenticated
 * - Renders children if authenticated
 * - Preserves navigation history with replace
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render when authenticated
 * @returns {JSX.Element} Children or redirect to signin
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAppSelector((state) => state.user);

  if (!user) {
    return <Navigate to={ROUTES.SIGNIN} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
