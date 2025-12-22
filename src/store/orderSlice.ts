/**
 * @fileoverview Redux slice for order state management with async thunks.
 * @module store/orderSlice
 */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type * as Types from '@types';
import {
  createOrder as createOrderService,
  getOrders as getOrdersService,
} from '@services';

/**
 * Async thunk for fetching user's orders.
 *
 * @returns {Promise<Types.OrdersResponse>} Array of orders
 */
export const fetchOrders = createAsyncThunk<
  Types.OrdersResponse,
  void,
  { rejectValue: { message: string; status?: number } }
>('orders/fetch', async (_, { rejectWithValue }) => {
  try {
    const orders = await getOrdersService();
    return orders;
  } catch (error: any) {
    return rejectWithValue({
      message: error?.message || 'Failed to fetch orders',
      status: error?.status,
    });
  }
});

/**
 * Async thunk for placing a new order.
 *
 * @param {Types.OrderRequest} orderData - Order creation data
 * @returns {Promise<Types.Order>} Created order
 */
export const placeOrder = createAsyncThunk<
  Types.Order,
  Types.OrderRequest,
  { rejectValue: { message: string; status?: number } }
>('orders/place', async (orderData, { rejectWithValue }) => {
  try {
    const order = await createOrderService(orderData);
    return order;
  } catch (error: any) {
    return rejectWithValue({
      message: error?.message || 'Failed to place order',
      status: error?.status,
    });
  }
});

/**
 * Initial order state.
 */
const initialState: Types.OrderState = {
  orders: [],
  loading: false,
  error: null,
  placingOrder: false,
  orderError: null,
};

/**
 * Order slice with reducers for order management.
 *
 * Features:
 * - Fetch orders with loading state
 * - Place new orders
 * - Error handling for order operations
 * - Clear orders and errors
 */
const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
      state.error = null;
    },
    clearOrderError: (state) => {
      state.orderError = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'Unknown error' };
      })
      .addCase(placeOrder.pending, (state) => {
        state.placingOrder = true;
        state.orderError = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.placingOrder = false;
        state.orders.unshift(action.payload);
        state.orderError = null;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.placingOrder = false;
        state.orderError = action.payload || { message: 'Unknown error' };
      });
  },
});

export const { clearOrders, clearOrderError, clearError } = orderSlice.actions;
export default orderSlice.reducer;
