import { InputHTMLAttributes } from 'react';

interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  label?: string;
}

export const Checkbox = ({
  label,
  className = '',
  ...props
}: CheckboxProps) => (
  <label className="flex items-start gap-2 cursor-pointer group">
    <input
      type="checkbox"
      className={`mt-1 w-4 h-4 text-cyan-600 border-gray-300 rounded 
          focus:ring-cyan-500 focus:ring-2 cursor-pointer ${className}`}
      {...props}
    />
    {label && (
      <span className="text-sm text-gray-600 group-hover:text-gray-800 select-none">
        {label}
      </span>
    )}
  </label>
);
