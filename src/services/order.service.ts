/**
 * @fileoverview Order service functions for managing orders and order operations.
 * @module services/order.service
 */

import type * as Types from '@types';

import { apiClient } from './api.config';

/**
 * Fetches all orders for the current user.
 *
 * @returns {Promise<Types.OrdersResponse>} Array of user's orders
 */
export const getOrders = async (): Promise<Types.OrdersResponse> => {
  const res = await apiClient.get<Types.OrdersApiResponse>('orders/');
  return res.data.data;
};

/**
 * Fetches a single order by ID.
 *
 * @param {number} orderId - Order ID to fetch
 * @returns {Promise<Types.Order>} Order data
 */
export const getOrderById = async (orderId: number): Promise<Types.Order> => {
  const res = await apiClient.get<Types.OrderCreateApiResponse>(
    `orders/${orderId}/`,
  );
  return res.data.data;
};

/**
 * Creates a new order from cart items.
 *
 * @param {Types.OrderRequest} orderData - Order creation data including shipping address
 * @returns {Promise<Types.Order>} Created order data
 */
export const createOrder = async (
  orderData: Types.OrderRequest,
): Promise<Types.Order> => {
  const res = await apiClient.post<Types.OrderCreateApiResponse>(
    'orders/',
    orderData,
  );
  return res.data.data;
};
