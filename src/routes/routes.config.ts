/**
 * @fileoverview Route configuration constants and types for application navigation.
 * @module routes/routes.config
 */

/**
 * Application route path constants.
 * Centralized definition of all route paths used throughout the application.
 */
export const ROUTES = {
  HOME: '/',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  PRODUCT_DETAIL: '/products/:id',
  CREATE_PRODUCT: '/create-product',
  MY_PRODUCTS: '/my-products',
  EDIT_PRODUCT: '/products/:id/edit',
  CART: '/cart',
  ORDERS: '/orders',
  SETTINGS: '/settings',
  PROFILE: '/profile',
  EDIT_PROFILE: '/profile/edit',
  NOT_FOUND: '*',
} as const;

export type RouteKeys = keyof typeof ROUTES;
export type RouteValues = (typeof ROUTES)[RouteKeys];
