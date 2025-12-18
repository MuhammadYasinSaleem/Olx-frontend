import { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit3, Plus } from 'lucide-react';

import { Button } from '@components/atoms';
import { ProductCard } from '@components/molecules';
import { canEditProduct } from '@utils';
import { fetchProducts, useAppDispatch, useAppSelector } from '@store';

export const MyProductsPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { products, loading, error } = useAppSelector(
    (state) => state.products,
  );

  const myProducts = useMemo(() => {
    if (!user || !products.length) {
      return [];
    }

    return products.filter((product) => canEditProduct(product, user));
  }, [products, user]);

  useEffect(() => {
    if (!user) {
      toast.error('Please sign in to view your products');
      navigate('/auth');
      return;
    }

    const loadProducts = async () => {
      const result = await dispatch(fetchProducts());

      if (fetchProducts.rejected.match(result)) {
        toast.error(result.payload?.message || 'Failed to load products');
      }
    };

    if (products.length === 0) {
      loadProducts();
    }
  }, [dispatch, navigate, user, products.length]);

  const handleEditProduct = (productId: number) => {
    navigate(`/products/${productId}/edit`);
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error.message}</p>
          <Button onClick={() => navigate('/products')} variant="primary">
            Go to All Products
          </Button>
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
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-4 text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">My Products</h1>
              <p className="text-gray-600 mt-2">
                Manage and edit your listed products
                {myProducts.length > 0 && (
                  <span className="ml-2 text-blue-600">
                    ({myProducts.length} product
                    {myProducts.length !== 1 ? 's' : ''})
                  </span>
                )}
              </p>
            </div>

            <Button
              variant="primary"
              onClick={() => navigate('/create-product')}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Plus size={20} />
              Create New Product
            </Button>
          </div>
        </div>

        {myProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No products yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start selling by creating your first product listing. It&apos;s
                quick and easy!
              </p>
              <Button
                variant="primary"
                onClick={() => navigate('/create-product')}
                className="flex items-center gap-2 mx-auto"
              >
                <Plus size={20} />
                Create Your First Product
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {myProducts.map((product) => (
              <div key={product.id} className="relative group">
                <ProductCard product={product} />

                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="outline"
                    onClick={() => handleEditProduct(product.id)}
                    className="bg-white shadow-lg border border-gray-300 hover:border-cyan-500 p-2"
                    title="Edit product"
                  >
                    <Edit3 size={16} className="text-gray-700" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {myProducts.length > 0 && (
          <div className="mt-12 bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/create-product')}
                className="flex items-center justify-center gap-2 py-3"
              >
                <Plus size={18} />
                Add New Product
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/orders')}
                className="flex items-center justify-center gap-2 py-3"
              >
                View My Orders
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/products')}
                className="flex items-center justify-center gap-2 py-3"
              >
                Browse All Products
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
