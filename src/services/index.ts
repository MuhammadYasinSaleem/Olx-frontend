import {
  getUserProfile,
  loginUser,
  logoutUser,
  patchUserProfile,
  registerUser,
  updateUserProfile,
} from './auth.service';
import { createOrder, getOrderById, getOrders } from './order.service';
import {
  createProduct,
  getProductById,
  getProducts,
  getProductsPaginated,
  patchProduct,
  updateProduct,
} from './product.service';

export {
  createOrder,
  createProduct,
  getOrderById,
  getOrders,
  getProductById,
  getProducts,
  getProductsPaginated,
  getUserProfile,
  loginUser,
  logoutUser,
  patchProduct,
  patchUserProfile,
  registerUser,
  updateProduct,
  updateUserProfile,
};
