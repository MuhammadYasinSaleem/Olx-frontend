import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type * as Types from '@types';
import {
  createProduct as createProductService,
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

export const createProduct = createAsyncThunk<
  Types.Product,
  Types.ProductRequest,
  { rejectValue: { message: string; status?: number } }
>('products/create', async (productData, { rejectWithValue }) => {
  try {
    const product = await createProductService(productData);
    return product;
  } catch (error: any) {
    return rejectWithValue({
      message: error?.message || 'Failed to create product',
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
  selectedCategory: string | null;
  filteredProducts: Types.Product[];
  creatingProduct: boolean;
  createError: { message: string; status?: number } | null;
};

const initialState: ProductState = {
  products: [],
  currentProduct: null,
  loading: false,
  productLoading: false,
  error: null,
  productError: null,
  selectedCategory: null,
  filteredProducts: [],
  creatingProduct: false,
  createError: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = [];
      state.filteredProducts = [];
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
    clearCreateError: (state) => {
      state.createError = null;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      if (action.payload === null) {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter(
          (product) => product.category_name === action.payload,
        );
      }
    },
    clearFilter: (state) => {
      state.selectedCategory = null;
      state.filteredProducts = state.products;
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
        if (state.selectedCategory === null) {
          state.filteredProducts = action.payload;
        } else {
          state.filteredProducts = action.payload.filter(
            (product) => product.category_name === state.selectedCategory,
          );
        }
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'Unknown error' };
      })
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
      })
      .addCase(createProduct.pending, (state) => {
        state.creatingProduct = true;
        state.createError = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.creatingProduct = false;
        // Add the new product to the products list
        state.products.unshift(action.payload);
        // Update filtered products if no filter is applied
        if (state.selectedCategory === null) {
          state.filteredProducts.unshift(action.payload);
        } else if (action.payload.category_name === state.selectedCategory) {
          state.filteredProducts.unshift(action.payload);
        }
        state.createError = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.creatingProduct = false;
        state.createError = action.payload || { message: 'Unknown error' };
      });
  },
});

export const {
  clearProducts,
  clearCurrentProduct,
  clearError,
  clearProductError,
  clearCreateError,
  setSelectedCategory,
  clearFilter,
} = productSlice.actions;
export default productSlice.reducer;
