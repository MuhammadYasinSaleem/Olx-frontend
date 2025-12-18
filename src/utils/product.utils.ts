import type * as Types from '@types';

export function canEditProduct(
  product: Types.Product | null,
  user: Types.UserResponse | null,
): boolean {
  if (!product || !user) {
    return false;
  }

  if (product.user_id) {
    return product.user_id === user.id;
  }

  return product.user_name === user.username;
}
