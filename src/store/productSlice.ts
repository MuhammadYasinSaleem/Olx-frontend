import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type * as Types from '@types';
import {
  getProductById as getProductByIdService,
  getProducts as getProductsService,
} from '@services';

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

export const fetchProductById = createAsyncThunk<
  Types.Product,
  number,
  { rejectValue: { message: string; status?: number } }
>('products/fetchById', async (id, { rejectWithValue }) => {
  try {
    const product = await getProductByIdService(id);
    return product;
  } catch (error: any) {
    return rejectWithValue({
      message: error?.message || 'Failed to fetch product',
      status: error?.status,
    });
  }
});

type ProductState = {
  products: Types.Product[];
  currentProduct: Types.Product | null;
  loading: boolean;
  productLoading: boolean;
  error: { message: string; status?: number } | null;
  productError: { message: string; status?: number } | null;
};

const initialState: ProductState = {
  products: [],
  currentProduct: null,
  loading: false,
  productLoading: false,
  error: null,
  productError: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = [];
      state.error = null;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
      state.productError = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearProductError: (state) => {
      state.productError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
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
      })
      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.productLoading = true;
        state.productError = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.productLoading = false;
        state.currentProduct = action.payload;
        state.productError = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.productLoading = false;
        state.productError = action.payload || { message: 'Unknown error' };
      });
  },
});

export const {
  clearProducts,
  clearCurrentProduct,
  clearError,
  clearProductError,
} = productSlice.actions;
export default productSlice.reducer;
