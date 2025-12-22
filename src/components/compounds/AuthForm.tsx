/**
 * @fileoverview Authentication form wrapper component supporting both signin and signup modes.
 * @module components/compounds/AuthForm
 */

import { X } from 'lucide-react';

import { SigninForm, SignupForm } from '@components/molecules';
import type * as Types from '@types';

/**
 * Type definition for authentication form mode.
 */
export type AuthFormType = 'signin' | 'signup';

/**
 * Props interface for AuthForm component.
 */
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

/**
 * Authentication form wrapper component handling both signin and signup flows.
 *
 * Features:
 * - Switches between signin and signup forms
 * - Optional close button for modal usage
 * - Form toggle link between modes
 * - Customizable title
 * - Loading and error state handling
 *
 * @param {Object} props - Component props
 * @param {AuthFormType} props.type - Form type ('signin' or 'signup')
 * @param {Function} props.onSubmit - Callback when form is submitted
 * @param {boolean} [props.loading] - Loading state for form
 * @param {string|null} [props.error] - Error message to display
 * @param {Function} [props.onToggleForm] - Callback to toggle between form types
 * @param {Function} [props.onClose] - Callback when close button is clicked
 * @param {string} [props.title] - Optional form title
 * @returns {JSX.Element} AuthForm component
 */
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

export default AuthForm;
