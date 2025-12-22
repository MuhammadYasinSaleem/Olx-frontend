import { MAX_IMAGE_SIZE } from '@constants';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface ProductFormData {
  product_name: string;
  price: string;
  category: string;
  quantity?: string;
  description?: string;
}

export class ValidationService {
  static validateProductForm(formData: ProductFormData): ValidationResult {
    const errors: string[] = [];

    if (!formData.product_name.trim()) {
      errors.push('Product name is required');
    } else if (formData.product_name.trim().length < 2) {
      errors.push('Product name must be at least 2 characters long');
    } else if (formData.product_name.trim().length > 100) {
      errors.push('Product name must not exceed 100 characters');
    }

    if (!formData.price.trim()) {
      errors.push('Price is required');
    } else {
      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        errors.push('Please enter a valid price greater than 0');
      } else if (price > 999999.99) {
        errors.push('Price must not exceed 999,999.99');
      }
    }

    if (!formData.category) {
      errors.push('Category is required');
    }

    if (formData.quantity && formData.quantity.trim()) {
      const quantity = parseInt(formData.quantity);
      if (isNaN(quantity) || quantity < 0) {
        errors.push('Please enter a valid quantity (0 or greater)');
      } else if (quantity > 999999) {
        errors.push('Quantity must not exceed 999,999');
      }
    }

    if (formData.description && formData.description.trim().length > 1000) {
      errors.push('Description must not exceed 1000 characters');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static validateImageFile(file: File): ValidationResult {
    const errors: string[] = [];

    if (!file.type.startsWith('image/')) {
      errors.push('Please select an image file');
    }

    if (file.size > MAX_IMAGE_SIZE) {
      errors.push('Image size must be less than 5MB');
    }

    const supportedFormats = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
    ];
    if (!supportedFormats.includes(file.type)) {
      errors.push(
        'Please select a supported image format (JPEG, PNG, GIF, WebP)',
      );
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static validateProfileForm(formData: {
    username?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
  }): ValidationResult {
    const errors: string[] = [];

    if (formData.username !== undefined) {
      if (!formData.username.trim()) {
        errors.push('Username is required');
      } else if (formData.username.trim().length < 3) {
        errors.push('Username must be at least 3 characters long');
      } else if (formData.username.trim().length > 50) {
        errors.push('Username must not exceed 50 characters');
      } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username.trim())) {
        errors.push(
          'Username can only contain letters, numbers, and underscores',
        );
      }
    }

    if (formData.email !== undefined) {
      if (!formData.email.trim()) {
        errors.push('Email is required');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        errors.push('Please enter a valid email address');
      }
    }

    if (formData.first_name !== undefined && formData.first_name.trim()) {
      if (formData.first_name.trim().length < 2) {
        errors.push('First name must be at least 2 characters long');
      } else if (formData.first_name.trim().length > 50) {
        errors.push('First name must not exceed 50 characters');
      }
    }

    if (formData.last_name !== undefined && formData.last_name.trim()) {
      if (formData.last_name.trim().length < 2) {
        errors.push('Last name must be at least 2 characters long');
      } else if (formData.last_name.trim().length > 50) {
        errors.push('Last name must not exceed 50 characters');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static validateAuthForm(
    formData: {
      username?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    },
    isRegister = false,
  ): ValidationResult {
    const errors: string[] = [];

    if (isRegister && formData.username !== undefined) {
      if (!formData.username.trim()) {
        errors.push('Username is required');
      } else if (formData.username.trim().length < 3) {
        errors.push('Username must be at least 3 characters long');
      } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username.trim())) {
        errors.push(
          'Username can only contain letters, numbers, and underscores',
        );
      }
    }

    if (formData.email !== undefined) {
      if (!formData.email.trim()) {
        errors.push('Email is required');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        errors.push('Please enter a valid email address');
      }
    }

    if (formData.password !== undefined) {
      if (!formData.password) {
        errors.push('Password is required');
      } else if (formData.password.length < 8) {
        errors.push('Password must be at least 8 characters long');
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        errors.push(
          'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        );
      }
    }

    if (isRegister && formData.confirmPassword !== undefined) {
      if (!formData.confirmPassword) {
        errors.push('Please confirm your password');
      } else if (formData.password !== formData.confirmPassword) {
        errors.push('Passwords do not match');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static validateRequired(value: string, fieldName: string): ValidationResult {
    const errors: string[] = [];

    if (!value.trim()) {
      errors.push(`${fieldName} is required`);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static validateNumeric(
    value: string,
    fieldName: string,
    options?: {
      min?: number;
      max?: number;
      allowDecimals?: boolean;
    },
  ): ValidationResult {
    const errors: string[] = [];

    if (!value.trim()) {
      return { isValid: true, errors: [] };
    }

    const numericValue = options?.allowDecimals
      ? parseFloat(value)
      : parseInt(value);

    if (isNaN(numericValue)) {
      errors.push(`${fieldName} must be a valid number`);
    } else {
      if (options?.min !== undefined && numericValue < options.min) {
        errors.push(`${fieldName} must be at least ${options.min}`);
      }
      if (options?.max !== undefined && numericValue > options.max) {
        errors.push(`${fieldName} must not exceed ${options.max}`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

export const {
  validateProductForm,
  validateImageFile,
  validateProfileForm,
  validateAuthForm,
  validateRequired,
  validateNumeric,
} = ValidationService;
