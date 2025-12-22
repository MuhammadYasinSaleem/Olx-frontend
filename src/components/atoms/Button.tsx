/**
 * @fileoverview Reusable button component with multiple variants and loading state.
 * @module components/atoms/Button
 */

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Props interface for Button component.
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  fullWidth?: boolean;
}

/**
 * Button component with customizable variants and loading state.
 *
 * Features:
 * - Multiple style variants (primary, secondary, outline)
 * - Loading state with spinner animation
 * - Full width option
 * - Extends native button attributes
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Button content
 * @param {'primary' | 'secondary' | 'outline'} [props.variant='primary'] - Button style variant
 * @param {boolean} [props.loading=false] - Shows loading spinner when true
 * @param {boolean} [props.fullWidth=false] - Makes button full width when true
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {boolean} [props.disabled] - Disables the button
 * @returns {JSX.Element} Button component
 */
export const Button = ({
  children,
  variant = 'primary',
  loading = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles =
    'px-6 py-3 rounded font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-linear-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="animate-spin h-5 w-5" />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
