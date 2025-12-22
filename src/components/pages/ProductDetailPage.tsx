import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Package,
  ShoppingCart,
  Tag,
  User,
} from 'lucide-react';

import { Button } from '@components/atoms';
import type * as Types from '@types';
import {
  addToCart,
  clearCurrentProduct,
  fetchProductById,
  useAppDispatch,
  useAppSelector,
} from '@store';

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { currentProduct, productLoading, productError } = useAppSelector(
    (state) => state.products,
  );

  useEffect(() => {
    if (id && !isNaN(Number(id))) {
      dispatch(fetchProductById(Number(id)));
    } else {
      navigate('/');
    }

    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [id, dispatch, navigate]);

  const handleAddToCart = () => {
    if (currentProduct) {
      const cartPayload: Types.AddToCartPayload = {
        id: currentProduct.id,
        product_name: currentProduct.product_name,
        price: currentProduct.price,
        product_img_url: currentProduct.product_img_url,
        maxQuantity: currentProduct.quantity,
        user_name: currentProduct.user_name,
        category_name: currentProduct.category_name,
      };

      dispatch(addToCart(cartPayload));
      toast.success(`Added ${currentProduct.product_name} to cart!`);
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  if (productLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-96">
            <div className="text-gray-600">Loading product details...</div>
          </div>
        </div>
      </div>
    );
  }

  if (productError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col justify-center items-center min-h-96">
            <div className="text-red-600 mb-4">
              Error: {productError.message}
            </div>
            <Button
              variant="outline"
              onClick={handleGoBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col justify-center items-center min-h-96">
            <div className="text-gray-600 mb-4">Product not found</div>
            <Button
              variant="outline"
              onClick={handleGoBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={handleGoBack}
            className="flex items-center gap-2 mb-4"
          >
            <ArrowLeft size={16} />
            Back to Products
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Product Details</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8">
              {currentProduct.product_img_url ? (
                <img
                  src={currentProduct.product_img_url}
                  alt={currentProduct.product_name}
                  className="w-full h-96 object-cover rounded-lg bg-gray-100"
                />
              ) : (
                <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Package size={96} className="text-gray-400" />
                </div>
              )}
            </div>
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                  <Tag size={14} />
                  {currentProduct.category_name}
                </span>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Package size={14} />
                  <span>{currentProduct.quantity} available</span>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {currentProduct.product_name}
              </h2>

              <div className="text-4xl font-bold text-gray-900 mb-6">
                ${currentProduct.price}
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {currentProduct.description}
                </p>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Seller Information
                </h3>
                <div className="flex items-center gap-2 text-gray-600">
                  <User size={16} />
                  <span className="font-medium">
                    {currentProduct.user_name}
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar size={14} />
                  <span>
                    Listed on{' '}
                    {new Date(currentProduct.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="primary"
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-3 text-lg font-semibold"
                  disabled={currentProduct.quantity === 0}
                >
                  <ShoppingCart size={20} />
                  {currentProduct.quantity === 0
                    ? 'Out of Stock'
                    : 'Add to Cart'}
                </Button>
              </div>

              {currentProduct.quantity <= 5 && currentProduct.quantity > 0 && (
                <div className="mt-4 text-orange-600 text-sm font-medium">
                  Only {currentProduct.quantity} left in stock!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
