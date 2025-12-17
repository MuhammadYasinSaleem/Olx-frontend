import type * as Types from '@types';

import { apiClient } from './api.config';

export async function getProducts(): Promise<Types.ProductsResponse> {
  const res = await apiClient.get<Types.ProductsApiResponse>('products/');
  return res.data.data;
}

export async function getProductById(id: number): Promise<Types.Product> {
  const res = await apiClient.get<Types.ProductApiResponse>(`products/${id}/`);
  return res.data.data;
}

export async function createProduct(
  productData: Types.ProductRequest,
): Promise<Types.Product> {
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
}
