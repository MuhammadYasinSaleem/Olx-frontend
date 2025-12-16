import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { ProductList } from '@components/compounds';
import { fetchProducts, useAppDispatch, useAppSelector } from '@store';

export const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state) => state.products,
  );

  useEffect(() => {
    const loadProducts = async () => {
      const result = await dispatch(fetchProducts());

      if (fetchProducts.rejected.match(result)) {
        toast.error(result.payload?.message || 'Failed to load products');
      }
    };

    loadProducts();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-600 mt-2">Browse all available products</p>
        </div>

        <ProductList
          products={products}
          loading={loading}
          error={error?.message}
        />
      </div>
    </div>
  );
};
