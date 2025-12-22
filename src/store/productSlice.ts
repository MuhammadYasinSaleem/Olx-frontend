import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type * as Types from '@types';
import {
  createProduct as createProductService,
  getProductById as getProductByIdService,
  getProducts as getProductsService,
  getProductsPaginated as getProductsPaginatedService,
  patchProduct as patchProductService,
  updateProduct as updateProductService,
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

export const fetchProductsPaginated = createAsyncThunk<
  Types.PaginatedProductsResponse,
  { page?: number; pageSize?: number },
  { rejectValue: { message: string; status?: number } }
>(
  'products/fetchPaginated',
  async ({ page = 1, pageSize = 5 }, { rejectWithValue }) => {
    try {
      const paginatedData = await getProductsPaginatedService(page, pageSize);
      return paginatedData;
    } catch (error: any) {
      return rejectWithValue({
        message: error?.message || 'Failed to fetch products',
        status: error?.status,
      });
    }
  },
);

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

export const updateProduct = createAsyncThunk<
  Types.Product,
  { id: number; productData: Types.ProductUpdateRequest },
  { rejectValue: { message: string; status?: number } }
>('products/update', async ({ id, productData }, { rejectWithValue }) => {
  try {
    const product = await updateProductService(id, productData);
    return product;
  } catch (error: any) {
    return rejectWithValue({
      message: error?.message || 'Failed to update product',
      status: error?.status,
    });
  }
});

export const patchProduct = createAsyncThunk<
  Types.Product,
  { id: number; productData: Types.ProductPatchRequest },
  { rejectValue: { message: string; status?: number } }
>('products/patch', async ({ id, productData }, { rejectWithValue }) => {
  try {
    const product = await patchProductService(id, productData);
    return product;
  } catch (error: any) {
    return rejectWithValue({
      message: error?.message || 'Failed to patch product',
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
  updatingProduct: boolean;
  updateError: { message: string; status?: number } | null;
  currentPage: number;
  pageSize: number;
  totalCount: number;
  hasNext: boolean;
  hasPrevious: boolean;
  paginationLoading: boolean;
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
  updatingProduct: false,
  updateError: null,
  currentPage: 1,
  pageSize: 5,
  totalCount: 0,
  hasNext: false,
  hasPrevious: false,
  paginationLoading: false,
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
    clearUpdateError: (state) => {
      state.updateError = null;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
      state.currentPage = 1;
    },
    resetPagination: (state) => {
      state.currentPage = 1;
      state.totalCount = 0;
      state.hasNext = false;
      state.hasPrevious = false;
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

      .addCase(fetchProductsPaginated.pending, (state) => {
        state.paginationLoading = true;
        state.error = null;
      })
      .addCase(fetchProductsPaginated.fulfilled, (state, action) => {
        state.paginationLoading = false;
        state.products = action.payload.results;
        state.totalCount = action.payload.count;
        state.hasNext = action.payload.next !== null;
        state.hasPrevious = action.payload.previous !== null;

        if (state.selectedCategory === null) {
          state.filteredProducts = action.payload.results;
        } else {
          state.filteredProducts = action.payload.results.filter(
            (product) => product.category_name === state.selectedCategory,
          );
        }
        state.error = null;
      })
      .addCase(fetchProductsPaginated.rejected, (state, action) => {
        state.paginationLoading = false;
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
        state.products.unshift(action.payload);

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
      })
      .addCase(updateProduct.pending, (state) => {
        state.updatingProduct = true;
        state.updateError = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updatingProduct = false;
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id,
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        if (state.currentProduct?.id === action.payload.id) {
          state.currentProduct = action.payload;
        }
        const filteredIndex = state.filteredProducts.findIndex(
          (product) => product.id === action.payload.id,
        );
        if (filteredIndex !== -1) {
          state.filteredProducts[filteredIndex] = action.payload;
        }
        state.updateError = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updatingProduct = false;
        state.updateError = action.payload || { message: 'Unknown error' };
      })
      .addCase(patchProduct.pending, (state) => {
        state.updatingProduct = true;
        state.updateError = null;
      })
      .addCase(patchProduct.fulfilled, (state, action) => {
        state.updatingProduct = false;
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id,
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        if (state.currentProduct?.id === action.payload.id) {
          state.currentProduct = action.payload;
        }
        const filteredIndex = state.filteredProducts.findIndex(
          (product) => product.id === action.payload.id,
        );
        if (filteredIndex !== -1) {
          state.filteredProducts[filteredIndex] = action.payload;
        }
        state.updateError = null;
      })
      .addCase(patchProduct.rejected, (state, action) => {
        state.updatingProduct = false;
        state.updateError = action.payload || { message: 'Unknown error' };
      });
  },
});

export const {
  clearProducts,
  clearCurrentProduct,
  clearError,
  clearProductError,
  clearCreateError,
  clearUpdateError,
  setSelectedCategory,
  clearFilter,
  setPage,
  setPageSize,
  resetPagination,
} = productSlice.actions;
export default productSlice.reducer;
