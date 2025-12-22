import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type * as Types from '@types';
import {
  createOrder as createOrderService,
  getOrders as getOrdersService,
} from '@services';

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

const initialState: Types.OrderState = {
  orders: [],
  loading: false,
  error: null,
  placingOrder: false,
  orderError: null,
};

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
