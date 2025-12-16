// Validation utility functions for forms

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

/**
 * Validates signin form data
 * @param formData - The signin form data to validate
 * @returns Object containing validation errors (empty if valid)
 */
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

/**
 * Validates signup form data
 * @param formData - The signup form data to validate
 * @param agreedToTerms - Whether user agreed to terms and conditions
 * @returns Object containing validation errors (empty if valid)
 */
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

/**
 * Checks if validation errors object is empty
 * @param errors - Validation errors object
 * @returns true if no errors, false otherwise
 */
export const isValidForm = (errors: ValidationErrors): boolean =>
  Object.keys(errors).length === 0;
