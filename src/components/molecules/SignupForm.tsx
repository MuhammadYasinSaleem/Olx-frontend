import { FormEvent, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { Button, Checkbox, Input } from '@components/atoms';
import { isValidForm, validateSignupForm, type ValidationErrors } from '@utils';
import type * as Types from '@types';

interface SignupFormProps {
  onSubmit: (_data: Types.UserRequest) => void;
  loading?: boolean;
  error?: string | null;
}

export const SignupForm = ({ onSubmit, loading, error }: SignupFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    phone_no: '',
    address: '',
    password: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const validate = () => {
    const newErrors = validateSignupForm(formData, agreedToTerms);
    setErrors(newErrors);
    return isValidForm(newErrors);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit(formData as Types.UserRequest);
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

      <Input
        label="Email address"
        type="email"
        placeholder="your.email@example.com"
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        error={errors.email}
      />

      <Input
        label="First Name"
        type="text"
        placeholder="Alice"
        value={formData.first_name}
        onChange={(e) => handleChange('first_name', e.target.value)}
      />

      <Input
        label="Last Name"
        type="text"
        placeholder="Smith"
        value={formData.last_name}
        onChange={(e) => handleChange('last_name', e.target.value)}
      />

      <Input
        label="Address"
        type="text"
        placeholder="123 houston st"
        value={formData.address}
        onChange={(e) => handleChange('address', e.target.value)}
      />

      <Input
        label="Phone"
        type="tel"
        placeholder="+123456789"
        value={formData.phone_no}
        onChange={(e) => handleChange('phone_no', e.target.value)}
        error={errors.phone_no}
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

      <div>
        <Checkbox
          checked={agreedToTerms}
          onChange={(e) => {
            setAgreedToTerms(e.target.checked);
            if (errors.terms) {
              setErrors((prev) => ({ ...prev, terms: '' }));
            }
          }}
          label="I agree to the Terms of Service and Privacy Policy"
        />
        {errors.terms && (
          <p className="mt-1 text-xs text-red-500">{errors.terms}</p>
        )}
      </div>

      <Button type="submit" variant="primary" fullWidth loading={loading}>
        CREATE ACCOUNT
      </Button>
    </form>
  );
};
