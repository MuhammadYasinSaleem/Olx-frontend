/**
 * @fileoverview Reusable input component with label, error state, and forwarded ref.
 * @module components/atoms/Input
 */

import { forwardRef, InputHTMLAttributes } from 'react';

/**
 * Props interface for Input component.
 */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

/**
 * Input component with label and error display support.
 *
 * Features:
 * - Optional label with required indicator
 * - Error message display
 * - Forwarded ref for form libraries
 * - Extends native input attributes
 *
 * @param {Object} props - Component props
 * @param {string} [props.label] - Input label text
 * @param {string} [props.error] - Error message to display
 * @param {boolean} [props.required] - Shows required indicator when true
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {React.Ref<HTMLInputElement>} ref - Forwarded ref
 * @returns {JSX.Element} Input component
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, required, className = '', ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {required && <span className="text-red-500 mr-1">*</span>}
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full px-3 py-2 border-b-2 border-cyan-400 bg-transparent 
            focus:outline-none focus:border-cyan-600 transition-colors
            placeholder:text-gray-400 text-gray-800 ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  ),
);

Input.displayName = 'Input';

export default Input;
