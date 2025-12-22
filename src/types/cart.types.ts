/**
 * @fileoverview Types for cart items and cart state.
 * @module types/cart.types
 */

export type CartItem = {
  id: number;
  product_name: string;
  price: string;
  product_img_url: string | null;
  quantity: number;
  maxQuantity: number;
  user_name: string;
  category_name: string;
};

export type CartState = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
};

export type AddToCartPayload = {
  id: number;
  product_name: string;
  price: string;
  product_img_url: string | null;
  maxQuantity: number;
  user_name: string;
  category_name: string;
};

export type UpdateQuantityPayload = {
  id: number;
  quantity: number;
};
