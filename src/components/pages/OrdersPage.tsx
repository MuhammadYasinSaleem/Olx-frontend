/**
 * @fileoverview Orders page for viewing order history and placing new orders.
 * @module components/pages/OrdersPage
 */

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, DollarSign, MapPin, Package } from 'lucide-react';

import { Button } from '@components/atoms';
import type * as Types from '@types';
import {
  clearCart,
  fetchOrders,
  placeOrder,
  useAppDispatch,
  useAppSelector,
} from '@store';

/**
 * Orders page component for order management and checkout.
 *
 * Features:
 * - View order history with details
 * - Place new orders from cart
 * - Shipping address input for checkout
 * - Order status display
 * - Order items breakdown
 * - Loading and error state handling
 * - Authentication guard
 *
 * @returns {JSX.Element} OrdersPage component
 */
export const OrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { items: cartItems, totalPrice } = useAppSelector(
    (state) => state.cart,
  );
  const { orders, loading, error, placingOrder, orderError } = useAppSelector(
    (state) => state.orders,
  );

  const [shippingAddress, setShippingAddress] = useState('');
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }

    if (cartItems.length > 0) {
      setShowCheckoutForm(true);
    } else {
      dispatch(fetchOrders());
    }
  }, [user, navigate, dispatch, cartItems.length]);

  const handlePlaceOrder = async () => {
    if (!shippingAddress.trim()) {
      toast.error('Please enter a shipping address');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    const orderData: Types.OrderRequest = {
      shipping_address: shippingAddress.trim(),
      products_data: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    };

    const result = await dispatch(placeOrder(orderData));

    if (placeOrder.fulfilled.match(result)) {
      toast.success('Order placed successfully!');
      dispatch(clearCart());
      setShowCheckoutForm(false);
      setShippingAddress('');
      dispatch(fetchOrders());
    } else if (placeOrder.rejected.match(result)) {
      toast.error(result.payload?.message || 'Failed to place order');
    }
  };

  const getStatusColor = (status?: string) => {
    if (!status) {
      return 'text-gray-600 bg-gray-100';
    }

    switch (status.toLowerCase()) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'confirmed':
        return 'text-blue-600 bg-blue-100';
      case 'shipped':
        return 'text-purple-600 bg-purple-100';
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-6 sm:mb-8">
          <Button
            variant="outline"
            onClick={() => navigate(showCheckoutForm ? '/cart' : '/products')}
            className="flex items-center gap-2 mb-4 text-sm sm:text-base"
          >
            <ArrowLeft size={16} />
            {showCheckoutForm ? 'Back to Cart' : 'Back to Products'}
          </Button>
          <div className="flex items-center gap-2 sm:gap-3">
            <Package size={24} className="sm:w-7 sm:h-7" />
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                {showCheckoutForm ? 'Checkout' : 'My Orders'}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                {showCheckoutForm
                  ? 'Complete your order'
                  : 'Track and manage your orders'}
              </p>
            </div>
          </div>
        </div>

        {showCheckoutForm && (
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Order Details
            </h2>

            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">
                Items ({cartItems.length})
              </h3>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-12 h-12 shrink-0">
                      {item.product_img_url ? (
                        <img
                          src={item.product_img_url}
                          alt={item.product_name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                          <Package size={16} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.product_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity} × ${item.price}
                      </p>
                    </div>
                    <div className="text-sm font-semibold text-gray-900">
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="shipping"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Shipping Address *
              </label>
              <textarea
                id="shipping"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Enter your complete shipping address..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                rows={3}
                required
              />
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total Amount:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handlePlaceOrder}
                disabled={placingOrder || !shippingAddress.trim()}
                className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-3 font-semibold"
              >
                {placingOrder
                  ? 'Placing Order...'
                  : `Place Order - $${totalPrice.toFixed(2)}`}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCheckoutForm(false)}
                className="sm:w-auto"
              >
                View Orders
              </Button>
            </div>

            {orderError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{orderError.message}</p>
              </div>
            )}
          </div>
        )}

        {!showCheckoutForm && (
          <>
            {loading ? (
              <div className="flex justify-center items-center min-h-64">
                <div className="text-gray-600">Loading orders...</div>
              </div>
            ) : error ? (
              <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 text-center">
                <div className="text-red-600 mb-4">Error: {error.message}</div>
                <Button
                  onClick={() => dispatch(fetchOrders())}
                  variant="outline"
                >
                  Try Again
                </Button>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 lg:p-12 text-center">
                <Package
                  size={64}
                  className="sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-gray-300 mx-auto mb-4 sm:mb-6"
                />
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-2 sm:mb-4">
                  No orders yet
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8">
                  Start shopping to place your first order!
                </p>
                <Button
                  onClick={() => navigate('/')}
                  className="bg-gray-900 hover:bg-gray-800 text-white px-6 sm:px-8 py-2 sm:py-3"
                >
                  Browse Products
                </Button>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-xl shadow-sm p-4 sm:p-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order #{order.id || 'Unknown'}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <Calendar size={14} />
                          <span>
                            {order.order_date
                              ? new Date(order.order_date).toLocaleDateString()
                              : 'Unknown date'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(order.order_status)}`}
                        >
                          {order.order_status
                            ? order.order_status.charAt(0).toUpperCase() +
                              order.order_status.slice(1)
                            : 'Unknown'}
                        </span>
                        <div className="flex items-center gap-1 text-lg font-semibold text-gray-900">
                          <DollarSign size={16} />
                          {order.total_amount || '0.00'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 mb-4">
                      <MapPin
                        size={16}
                        className="text-gray-400 mt-0.5 shrink-0"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Shipping Address:
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.shipping_address ||
                            'No shipping address provided'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">
                        Items:{' '}
                        {order.products
                          ? `(${order.products.length})`
                          : '(No items data)'}
                      </p>
                      <div className="space-y-2">
                        {order.products && order.products.length > 0 ? (
                          order.products.map((item) => (
                            <div
                              key={item.product_id}
                              className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                            >
                              <div className="w-10 h-10 shrink-0">
                                <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                                  <Package
                                    size={12}
                                    className="text-gray-400"
                                  />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {item.product_name || 'Unknown Product'}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Qty: {item.quantity || 0} × $
                                  {item.unit_price || '0.00'}
                                </p>
                              </div>
                              <div className="text-sm font-semibold text-gray-900">
                                $
                                {(
                                  parseFloat(item.unit_price || '0') *
                                  (item.quantity || 0)
                                ).toFixed(2)}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="text-sm text-yellow-800">
                              <p className="font-medium">
                                No item details available
                              </p>
                              <p className="text-xs mt-1">
                                Order total: ${order.total_amount || '0.00'}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
