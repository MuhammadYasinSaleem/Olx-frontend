/**
 * @fileoverview Lightweight validation helpers for auth and signup forms.
 * @module utils/validation
 */

export interface ValidationErrors {
  [key: string]: string;
}

export interface SigninFormData {
  username: string;
  password: string;
}

export interface SignupFormData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_no: string;
  address: string;
  password: string;
}

export const validateSigninForm = (
  formData: SigninFormData,
): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!formData.username.trim()) {
    errors.username = 'Username is required';
  }

  if (!formData.password.trim()) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  return errors;
};

export const validateSignupForm = (
  formData: SignupFormData,
  agreedToTerms: boolean,
): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!formData.username.trim()) {
    errors.username = 'Username is required';
  }

  if (!formData.password.trim()) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Invalid email format';
  }

  if (formData.phone_no && !/^\+?[\d\s-()]+$/.test(formData.phone_no)) {
    errors.phone_no = 'Invalid phone number format';
  }

  if (!agreedToTerms) {
    errors.terms = 'You must agree to the terms';
  }

  return errors;
};

export const isValidForm = (errors: ValidationErrors): boolean =>
  Object.keys(errors).length === 0;
