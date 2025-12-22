/**
 * @fileoverview Redux store configuration with persistence for user and cart state.
 * @module store/redux
 */

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cartReducer from './cartSlice';
import orderReducer from './orderSlice';
import productReducer from './productSlice';
import userReducer from './userSlice';

/**
 * Persist configuration for user state.
 */
const userPersistConfig = {
  key: 'user',
  version: 1,
  storage,
};

/**
 * Persist configuration for cart state.
 */
const cartPersistConfig = {
  key: 'cart',
  version: 1,
  storage,
};

/**
 * Persisted user reducer with localStorage persistence.
 */
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

/**
 * Persisted cart reducer with localStorage persistence.
 */
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

/**
 * Configured Redux store with persisted reducers.
 *
 * Features:
 * - User state persistence
 * - Cart state persistence
 * - Serializable check middleware configuration for redux-persist
 */
export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    products: productReducer,
    cart: persistedCartReducer,
    orders: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
