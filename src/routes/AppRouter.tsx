import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from '@components/compounds';
import {
  AuthPage,
  CartPage,
  CreateProductPage,
  MyProductsPage,
  OrdersPage,
  ProductDetailPage,
  ProductsPage,
  ProfilePage,
} from '@components/pages';

import { ProtectedRoute } from './ProtectedRoute';
import { ROUTES } from './routes.config';

export const AppRoutes: React.FC = () => (
  <Routes>
    <Route path={ROUTES.SIGNIN} element={<AuthPage />} />
    <Route path={ROUTES.SIGNUP} element={<AuthPage />} />
    <Route element={<Layout />}>
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <ProtectedRoute>
            <div>Dashboard - Coming Soon</div>
          </ProtectedRoute>
        }
      />

      <Route path={ROUTES.HOME} element={<ProductsPage />} />

      <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetailPage />} />

      <Route
        path={ROUTES.CREATE_PRODUCT}
        element={
          <ProtectedRoute>
            <CreateProductPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.MY_PRODUCTS}
        element={
          <ProtectedRoute>
            <MyProductsPage />
          </ProtectedRoute>
        }
      />

      <Route path={ROUTES.CART} element={<CartPage />} />

      <Route path={ROUTES.ORDERS} element={<OrdersPage />} />

      <Route
        path={ROUTES.PROFILE}
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.SETTINGS}
        element={
          <ProtectedRoute>
            <div>Settings - Coming Soon</div>
          </ProtectedRoute>
        }
      />
    </Route>

    <Route
      path={ROUTES.NOT_FOUND}
      element={
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        </div>
      }
    />
  </Routes>
);
