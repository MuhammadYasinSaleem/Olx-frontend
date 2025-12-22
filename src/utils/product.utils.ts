/**
 * @fileoverview Utility functions related to product operations.
 * @module utils/product.utils
 */

import type * as Types from '@types';

export const canEditProduct = (
  product: Types.Product | null,
  user: Types.UserResponse | null,
): boolean => {
  if (!product || !user) {
    return false;
  }

  if (product.user_id) {
    return product.user_id === user.id;
  }

  return product.user_name === user.username;
};
