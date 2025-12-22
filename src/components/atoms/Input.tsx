import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

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
