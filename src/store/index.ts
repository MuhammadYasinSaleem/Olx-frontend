// Helper function to clear both user session and cart
import { clearCart } from './cartSlice';
import { clearUser } from './userSlice';

export {
  addToCart,
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  updateQuantity,
} from './cartSlice';
export {
  clearError as clearOrderError,
  clearOrderError as clearOrderPlaceError,
  clearOrders,
  fetchOrders,
  placeOrder,
} from './orderSlice';
export {
  clearCreateError,
  clearCurrentProduct,
  clearFilter,
  clearProducts,
  createProduct,
  fetchProductById,
  fetchProducts,
  setSelectedCategory,
} from './productSlice';
export {
  clearProductError as clearCurrentProductError,
  clearError as clearProductError,
} from './productSlice';
export type { AppDispatch, RootState } from './redux';
export { persistor, store, useAppDispatch, useAppSelector } from './redux';
export {
  clearError,
  clearUser,
  fetchUserProfile,
  loginUser,
  logoutUser,
  registerUser,
} from './userSlice';

export const clearUserSession = () => (dispatch: any) => {
  dispatch(clearUser());
  dispatch(clearCart());
};
