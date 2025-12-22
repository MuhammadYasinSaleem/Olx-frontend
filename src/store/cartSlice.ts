/**
 * @fileoverview Redux slice for shopping cart state management.
 * @module store/cartSlice
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type * as Types from '@types';

/**
 * Initial cart state with empty items.
 */
const initialState: Types.CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

/**
 * Calculates cart totals from items array.
 *
 * @param {Types.CartItem[]} items - Cart items array
 * @returns {{ totalItems: number, totalPrice: number }} Calculated totals
 */
const calculateTotals = (items: Types.CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0,
  );
  return { totalItems, totalPrice };
};

/**
 * Cart slice with reducers for cart operations.
 *
 * Features:
 * - Add items to cart with quantity limits
 * - Remove items from cart
 * - Update item quantities
 * - Increment/decrement quantities
 * - Clear entire cart
 * - Auto-calculate totals
 */
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Types.AddToCartPayload>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        if (existingItem.quantity < existingItem.maxQuantity) {
          existingItem.quantity += 1;
        }
      } else {
        const newItem: Types.CartItem = {
          ...action.payload,
          quantity: 1,
        };
        state.items.push(newItem);
      }
      const { totalItems, totalPrice } = calculateTotals(state.items);
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      const { totalItems, totalPrice } = calculateTotals(state.items);
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
    },

    updateQuantity: (
      state,
      action: PayloadAction<Types.UpdateQuantityPayload>,
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== id);
        } else if (quantity <= item.maxQuantity) {
          item.quantity = quantity;
        }
      }

      const { totalItems, totalPrice } = calculateTotals(state.items);
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },

    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity < item.maxQuantity) {
        item.quantity += 1;

        const { totalItems, totalPrice } = calculateTotals(state.items);
        state.totalItems = totalItems;
        state.totalPrice = totalPrice;
      }
    },

    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity <= 1) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload,
          );
        } else {
          item.quantity -= 1;
        }

        const { totalItems, totalPrice } = calculateTotals(state.items);
        state.totalItems = totalItems;
        state.totalPrice = totalPrice;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
