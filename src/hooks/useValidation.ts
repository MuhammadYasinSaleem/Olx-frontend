/**
 * @fileoverview Custom hook for running validation helpers and reporting errors.
 * @module hooks/useValidation
 */

import { useState } from 'react';
import toast from 'react-hot-toast';

import {
  type ValidationResult,
  ValidationService,
} from '../utils/validation.service';

export interface UseValidationOptions {
  showErrors?: 'toast' | 'return' | 'both';
}

export const useValidation = (
  options: UseValidationOptions = { showErrors: 'toast' },
) => {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleValidationResult = (result: ValidationResult) => {
    setValidationErrors(result.errors);

    if (!result.isValid) {
      if (options.showErrors === 'toast' || options.showErrors === 'both') {
        result.errors.forEach((error) => toast.error(error));
      }
    }

    return result;
  };

  const validateProductForm = (
    formData: Parameters<typeof ValidationService.validateProductForm>[0],
  ) => {
    const result = ValidationService.validateProductForm(formData);
    return handleValidationResult(result);
  };

  const validateImageFile = (file: File) => {
    const result = ValidationService.validateImageFile(file);
    return handleValidationResult(result);
  };

  const validateProfileForm = (
    formData: Parameters<typeof ValidationService.validateProfileForm>[0],
  ) => {
    const result = ValidationService.validateProfileForm(formData);
    return handleValidationResult(result);
  };

  const validateAuthForm = (
    formData: Parameters<typeof ValidationService.validateAuthForm>[0],
    isRegister?: boolean,
  ) => {
    const result = ValidationService.validateAuthForm(formData, isRegister);
    return handleValidationResult(result);
  };

  const validateRequired = (value: string, fieldName: string) => {
    const result = ValidationService.validateRequired(value, fieldName);
    return handleValidationResult(result);
  };

  const validateNumeric = (
    value: string,
    fieldName: string,
    options?: Parameters<typeof ValidationService.validateNumeric>[2],
  ) => {
    const result = ValidationService.validateNumeric(value, fieldName, options);
    return handleValidationResult(result);
  };

  const clearErrors = () => {
    setValidationErrors([]);
  };

  return {
    validationErrors,
    validateProductForm,
    validateImageFile,
    validateProfileForm,
    validateAuthForm,
    validateRequired,
    validateNumeric,
    clearErrors,
  };
};
