import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '@store/redux';

import { ROUTES } from './routes.config';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAppSelector((state) => state.user);

  if (!user) {
    return <Navigate to={ROUTES.SIGNIN} replace />;
  }

  return <>{children}</>;
};
