import type * as Types from '@types';

import { apiClient } from './api.config';

export async function getOrders(): Promise<Types.OrdersResponse> {
  const res = await apiClient.get<Types.OrdersApiResponse>('orders/');
  return res.data.data;
}

export async function getOrderById(orderId: number): Promise<Types.Order> {
  const res = await apiClient.get<Types.OrderCreateApiResponse>(
    `orders/${orderId}/`,
  );
  return res.data.data;
}

export async function createOrder(
  orderData: Types.OrderRequest,
): Promise<Types.Order> {
  const res = await apiClient.post<Types.OrderCreateApiResponse>(
    'orders/',
    orderData,
  );
  return res.data.data;
}
