import {
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
} from './auth.service';
import { createOrder, getOrderById, getOrders } from './order.service';
import {
  createProduct,
  getProductById,
  getProducts,
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
  getUserProfile,
  loginUser,
  logoutUser,
  patchProduct,
  registerUser,
  updateProduct,
};
