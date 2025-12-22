/**
 * @fileoverview Product list component displaying products in a responsive grid layout.
 * @module components/compounds/ProductList
 */

import { ProductCard } from '@components/molecules';
import type * as Types from '@types';

/**
 * Props interface for ProductList component.
 */
interface ProductListProps {
  products: Types.Product[];
  loading?: boolean;
  error?: string | null;
}

/**
 * Product list component for displaying multiple products in a grid.
 *
 * Features:
 * - Responsive grid layout (1-4 columns)
 * - Loading state display
 * - Error state handling
 * - Empty state message
 * - Renders ProductCard for each product
 *
 * @param {Object} props - Component props
 * @param {Types.Product[]} props.products - Array of products to display
 * @param {boolean} [props.loading] - Shows loading message when true
 * @param {string|null} [props.error] - Error message to display
 * @returns {JSX.Element} ProductList component
 */
export const ProductList = ({ products, loading, error }: ProductListProps) => {
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
        <div className="text-red-600">
          Failed to load products. Please try again later.
        </div>
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
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
