import { X } from 'lucide-react';

import { SigninForm, SignupForm } from '@components/molecules';
import type * as Types from '@types';

export type AuthFormType = 'signin' | 'signup';

interface AuthFormProps {
  type: AuthFormType;
  onSubmit: (
    _data: Types.UserRequest | { username: string; password: string },
  ) => void;
  loading?: boolean;
  error?: string | null;
  onToggleForm?: () => void;
  onClose?: () => void;
  title?: string;
}

export const AuthForm = ({
  type,
  onSubmit,
  loading,
  error,
  onToggleForm,
  onClose,
  title,
}: AuthFormProps) => {
  const isSignUp = type === 'signup';

  const handleSigninSubmit = (data: { username: string; password: string }) => {
    onSubmit(data);
  };

  const handleSignupSubmit = (data: Types.UserRequest) => {
    onSubmit(data);
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
      {onClose && (
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600
            hover:bg-gray-100 rounded-full transition-colors z-10"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      )}

      {title && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-center bg-linear-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            • {title} •
          </h2>
        </div>
      )}

      {isSignUp ? (
        <SignupForm
          onSubmit={handleSignupSubmit}
          loading={loading}
          error={error}
        />
      ) : (
        <SigninForm
          onSubmit={handleSigninSubmit}
          loading={loading}
          error={error}
        />
      )}

      <div className="text-center text-sm text-gray-600 mt-5">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          type="button"
          onClick={onToggleForm}
          className="text-cyan-600 hover:text-cyan-700 font-medium hover:underline"
        >
          {isSignUp ? 'Sign in' : 'Sign up'}
        </button>
      </div>
    </div>
  );
};
