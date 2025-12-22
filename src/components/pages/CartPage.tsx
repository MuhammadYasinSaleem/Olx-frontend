import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

import { Button, CartItem } from '@components/atoms';
import {
  clearCart,
  removeFromCart,
  updateQuantity,
  useAppDispatch,
  useAppSelector,
} from '@store';

export const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, totalItems, totalPrice } = useAppSelector(
    (state) => state.cart,
  );
  const { user } = useAppSelector((state) => state.user);

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleGoBack = () => {
    navigate('/');
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/signin');
      return;
    }

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    navigate('/orders');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-6 sm:mb-8">
          <Button
            variant="outline"
            onClick={handleGoBack}
            className="flex items-center gap-2 mb-4 text-sm sm:text-base"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Continue Shopping</span>
            <span className="sm:hidden">Back</span>
          </Button>
          <div className="flex items-center gap-2 sm:gap-3">
            <ShoppingCart size={24} className="sm:w-7 sm:h-7" />
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Shopping Cart
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 lg:p-12 text-center">
            <ShoppingCart
              size={64}
              className="sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-gray-300 mx-auto mb-4 sm:mb-6"
            />
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-2 sm:mb-4">
              Your cart is empty
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8">
              Discover amazing products and add them to your cart!
            </p>
            <Button
              onClick={handleGoBack}
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base"
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8 xl:col-span-8">
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
                  <h2 className="text-lg sm:text-xl font-semibold">
                    Cart Items
                  </h2>
                  <Button
                    variant="outline"
                    onClick={handleClearCart}
                    className="text-red-600 border-red-200 hover:bg-red-50 text-sm sm:text-base px-3 sm:px-4 py-2 w-full sm:w-auto"
                  >
                    Clear All
                  </Button>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemoveItem={handleRemoveItem}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 xl:col-span-4">
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:sticky lg:top-8">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div className="border-t pt-3 sm:pt-4">
                    <div className="flex justify-between text-base sm:text-lg font-semibold">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  fullWidth
                  className="bg-gray-900 hover:bg-gray-800 text-white py-3 sm:py-4 text-base sm:text-lg font-semibold mb-3 sm:mb-4"
                >
                  Proceed to Checkout
                </Button>

                <div className="text-center">
                  <p className="text-xs sm:text-sm text-gray-500 mb-3">
                    Secure checkout with SSL encryption
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleGoBack}
                    className="w-full text-sm sm:text-base py-2 sm:py-3"
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
