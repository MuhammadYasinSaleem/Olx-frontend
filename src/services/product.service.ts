import type * as Types from '@types';

import { apiClient } from './api.config';

export const getProducts = async (): Promise<Types.ProductsResponse> => {
  const res = await apiClient.get<Types.ProductsApiResponse>('products/');
  return res.data.data.results;
};

export const getProductsPaginated = async (
  page: number = 1,
  pageSize: number = 5,
): Promise<Types.PaginatedProductsResponse> => {
  const res = await apiClient.get<Types.ProductsApiResponse>(
    `products/?page=${page}&page_size=${pageSize}`,
  );
  return res.data.data;
};

export const getProductById = async (id: number): Promise<Types.Product> => {
  const res = await apiClient.get<Types.ProductApiResponse>(`products/${id}/`);
  return res.data.data;
};

export const createProduct = async (
  productData: Types.ProductRequest,
): Promise<Types.Product> => {
  const formData = new FormData();

  formData.append('product_name', productData.product_name);
  formData.append('price', productData.price);
  formData.append('category', productData.category.toString());

  if (productData.quantity !== undefined) {
    formData.append('quantity', productData.quantity.toString());
  }
  if (productData.description) {
    formData.append('description', productData.description);
  }
  if (productData.product_img) {
    formData.append('product_img', productData.product_img);
  }

  const res = await apiClient.post<Types.CreateProductApiResponse>(
    'products/',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return res.data.data;
};

export const updateProduct = async (
  id: number,
  productData: Types.ProductUpdateRequest,
): Promise<Types.Product> => {
  const formData = new FormData();

  formData.append('product_name', productData.product_name);
  formData.append('price', productData.price);
  formData.append('category', productData.category.toString());

  if (productData.quantity !== undefined) {
    formData.append('quantity', productData.quantity.toString());
  }
  if (productData.description) {
    formData.append('description', productData.description);
  }
  if (productData.product_img) {
    formData.append('product_img', productData.product_img);
  }

  const res = await apiClient.put<Types.UpdateProductApiResponse>(
    `products/${id}/`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return res.data.data;
};

export const patchProduct = async (
  id: number,
  productData: Types.ProductPatchRequest,
): Promise<Types.Product> => {
  const formData = new FormData();

  if (productData.product_name) {
    formData.append('product_name', productData.product_name);
  }
  if (productData.price) {
    formData.append('price', productData.price);
  }
  if (productData.category !== undefined) {
    formData.append('category', productData.category.toString());
  }
  if (productData.quantity !== undefined) {
    formData.append('quantity', productData.quantity.toString());
  }
  if (productData.description !== undefined) {
    formData.append('description', productData.description);
  }
  if (productData.product_img) {
    formData.append('product_img', productData.product_img);
  }

  const res = await apiClient.patch<Types.UpdateProductApiResponse>(
    `products/${id}/`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return res.data.data;
};
