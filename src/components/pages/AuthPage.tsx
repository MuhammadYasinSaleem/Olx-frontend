import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

import { AuthForm, AuthFormType } from '@components/compounds';
import type * as Types from '@types/';
import { useAppDispatch, useAppSelector } from '@store/redux';
import { registerUser } from '@store/userSlice';

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
    try {
      if (authType === 'signup') {
        const result = await dispatch(registerUser(data as Types.UserRequest));

        if (registerUser.fulfilled.match(result)) {
          toast.success('Account created successfully!');
          setTimeout(() => {
            navigate('/');
          }, 1000);
        } else if (registerUser.rejected.match(result)) {
          toast.error(result.payload?.message || 'Registration failed');
        }
      } else {
        // TODO: Implement sign in logic
        console.log('Sign in:', data);
        toast.success('Sign in functionality coming soon!');
      }
    } catch (_err) {
      toast.error('An unexpected error occurred');
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
