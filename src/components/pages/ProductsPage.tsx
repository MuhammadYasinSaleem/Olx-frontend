/**
 * @fileoverview Products listing page with filtering and pagination.
 * @module components/pages/ProductsPage
 */

import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

import { Button, Pagination } from '@components/atoms';
import { ProductList } from '@components/compounds';
import { CategoryFilter } from '@components/molecules';
import {
  fetchProductsPaginated,
  setPage,
  useAppDispatch,
  useAppSelector,
} from '@store';

import { ROUTES } from '../../routes/routes.config';

/**
 * Products page component for browsing and filtering products.
 *
 * Features:
 * - Product grid display with pagination
 * - Category filter sidebar
 * - Create product button (for authenticated users)
 * - Loading and error state handling
 * - Server-side pagination support
 * - Filter state management via Redux
 *
 * @returns {JSX.Element} ProductsPage component
 */
export const ProductsPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    filteredProducts,
    loading,
    error,
    selectedCategory,
    currentPage,
    pageSize,
    totalCount,
    hasNext,
    hasPrevious,
    paginationLoading,
  } = useAppSelector((state) => state.products);
  const { user } = useAppSelector((state) => state.user);

  const totalPages = Math.ceil(totalCount / pageSize);

  useEffect(() => {
    const loadProducts = async () => {
      const result = await dispatch(
        fetchProductsPaginated({ page: currentPage, pageSize }),
      );

      if (fetchProductsPaginated.rejected.match(result)) {
        toast.error(result.payload?.message || 'Failed to load products');
      }
    };

    loadProducts();
  }, [dispatch, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Products</h1>
            <p className="text-gray-600 mt-2">
              Browse all available products
              {selectedCategory && (
                <span className="ml-2 text-blue-600">
                  (filtered by: {selectedCategory})
                </span>
              )}
            </p>
          </div>

          {user && (
            <Button
              variant="primary"
              onClick={() => navigate(ROUTES.CREATE_PRODUCT)}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Plus size={20} />
              Create Product
            </Button>
          )}
        </div>

        <div className="mb-8">
          <CategoryFilter />
        </div>
        <ProductList
          products={filteredProducts}
          loading={loading || paginationLoading}
          error={error?.message}
        />

        {totalCount > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            hasNext={hasNext}
            hasPrevious={hasPrevious}
            onPageChange={handlePageChange}
            loading={paginationLoading}
            className="mt-8"
          />
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
