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
