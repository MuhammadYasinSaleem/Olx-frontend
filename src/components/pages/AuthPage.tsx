/**
 * @fileoverview Authentication page handling user signin and signup flows.
 * @module components/pages/AuthPage
 */

import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AUTH_REDIRECT_DELAYS } from '@constants';

import { AuthForm, AuthFormType } from '@components/compounds';
import type * as Types from '@types';
import {
  loginUser,
  registerUser,
  useAppDispatch,
  useAppSelector,
} from '@store';

/**
 * Authentication page component for user signin and signup.
 *
 * Features:
 * - Dynamic form switching between signin and signup
 * - URL-based form type detection (/signin vs /signup)
 * - Redux integration for authentication actions
 * - Toast notifications for success/error states
 * - Auto-redirect after successful authentication
 * - Redirect logged-in users away from auth pages
 *
 * @returns {JSX.Element} AuthPage component
 */
export const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { loading, error, user } = useAppSelector((state) => state.user);

  const authType: AuthFormType =
    location.pathname === '/signup' ? 'signup' : 'signin';

  const handleClose = () => {
    navigate('/');
  };

  const handleToggleForm = () => {
    navigate(authType === 'signin' ? '/signup' : '/signin');
  };

  const handleSubmit = async (
    data: Types.UserRequest | { username: string; password: string },
  ) => {
    const isSignup = authType === 'signup';

    try {
      if (isSignup) {
        await dispatch(registerUser(data as Types.UserRequest)).unwrap();
        toast.success('Account created successfully!');
        setTimeout(() => navigate('/'), AUTH_REDIRECT_DELAYS.SIGNUP_SUCCESS);
      } else {
        await dispatch(
          loginUser(data as { username: string; password: string }),
        ).unwrap();
        toast.success('Signed in successfully!');
        setTimeout(() => navigate('/'), AUTH_REDIRECT_DELAYS.SIGNIN_SUCCESS);
      }
    } catch (error: any) {
      toast.error(
        error?.message || (isSignup ? 'Registration failed' : 'Sign in failed'),
      );
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-500 to-cyan-400 flex items-center justify-center p-4">
      <AuthForm
        type={authType}
        onSubmit={handleSubmit}
        loading={loading}
        error={error?.message}
        onToggleForm={handleToggleForm}
        onClose={handleClose}
        title={authType === 'signup' ? 'Registration Form' : 'Sign In Form'}
      />
    </div>
  );
};

export default AuthPage;
