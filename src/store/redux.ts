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

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['user', 'cart'],
};

const persistedUserReducer = persistReducer(
  { ...persistConfig, key: 'user' },
  userReducer,
);

const persistedCartReducer = persistReducer(
  { ...persistConfig, key: 'cart' },
  cartReducer,
);

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
