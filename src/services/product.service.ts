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
