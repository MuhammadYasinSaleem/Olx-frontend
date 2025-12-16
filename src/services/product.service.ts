import type * as Types from '@types';

import { apiClient } from './api.config';

export async function getProducts(): Promise<Types.ProductsResponse> {
  const res = await apiClient.get<Types.ProductsApiResponse>('products/');
  return res.data.data;
}
