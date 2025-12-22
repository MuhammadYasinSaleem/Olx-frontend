/**
 * @fileoverview Reusable checkbox component with optional label.
 * @module components/atoms/Checkbox
 */

import { InputHTMLAttributes } from 'react';

/**
 * Props interface for Checkbox component.
 */
interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  label?: string;
}

/**
 * Checkbox component with optional label text.
 *
 * Features:
 * - Optional label with hover effect
 * - Custom styling with focus ring
 * - Extends native checkbox attributes
 *
 * @param {Object} props - Component props
 * @param {string} [props.label] - Label text to display next to checkbox
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {JSX.Element} Checkbox component
 */
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

export default Checkbox;
