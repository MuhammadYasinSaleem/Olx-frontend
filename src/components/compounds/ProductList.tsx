import toast from 'react-hot-toast';

import { ProductCard } from '@components/molecules';
import type * as Types from '@types';

export interface ProductListProps {
  products: Types.Product[];
  loading?: boolean;
  error?: string | null;
  onAddToCart?: (_product: Types.Product) => void;
}

export const ProductList = ({
  products,
  loading,
  error,
  onAddToCart,
}: ProductListProps) => {
  const handleAddToCart = (_product: Types.Product) => {
    if (onAddToCart) {
      onAddToCart(_product);
    } else {
      // Default behavior if no handler provided
      toast.success(`Added ${_product.product_name} to cart!`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-gray-600">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-gray-600">No products found</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
};
