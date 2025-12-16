import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type * as Types from '@types';
import { getProducts as getProductsService } from '@services';

export const fetchProducts = createAsyncThunk<
  Types.ProductsResponse,
  void,
  { rejectValue: { message: string; status?: number } }
>('products/fetch', async (_, { rejectWithValue }) => {
  try {
    const products = await getProductsService();
    return products;
  } catch (error: any) {
    return rejectWithValue({
      message: error?.message || 'Failed to fetch products',
      status: error?.status,
    });
  }
});

type ProductState = {
  products: Types.Product[];
  loading: boolean;
  error: { message: string; status?: number } | null;
};

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = [];
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'Unknown error' };
      });
  },
});

export const { clearProducts, clearError } = productSlice.actions;
export default productSlice.reducer;
