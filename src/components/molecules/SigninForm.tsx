/**
 * @fileoverview Sign in form component with validation and password visibility toggle.
 * @module components/molecules/SigninForm
 */

import { FormEvent, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { Button, Input } from '@components/atoms';
import { isValidForm, validateSigninForm, type ValidationErrors } from '@utils';

/**
 * Props interface for SigninForm component.
 */
interface SigninFormProps {
  onSubmit: (_data: { username: string; password: string }) => void;
  loading?: boolean;
  error?: string | null;
}

/**
 * Sign in form component for user authentication.
 *
 * Features:
 * - Username and password input fields
 * - Password visibility toggle
 * - Form validation with error messages
 * - Loading state handling
 * - Server error display
 *
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Callback when form is submitted with valid data
 * @param {boolean} [props.loading] - Shows loading state on submit button
 * @param {string|null} [props.error] - Server error message to display
 * @returns {JSX.Element} SigninForm component
 */
export const SigninForm = ({ onSubmit, loading, error }: SigninFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const validate = () => {
    const newErrors = validateSigninForm(formData);
    setErrors(newErrors);
    return isValidForm(newErrors);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit({
      username: formData.username,
      password: formData.password,
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <Input
        label="Username"
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => handleChange('username', e.target.value)}
        error={errors.username}
        required
      />

      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          error={errors.password}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-cyan-600 hover:text-cyan-700"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <Button type="submit" variant="primary" fullWidth loading={loading}>
        SIGN IN
      </Button>
    </form>
  );
};

export default SigninForm;
