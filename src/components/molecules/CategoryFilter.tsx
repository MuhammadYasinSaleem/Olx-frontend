import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';

import { Button } from '@components/atoms';
import {
  clearFilter,
  setSelectedCategory,
  useAppDispatch,
  useAppSelector,
} from '@store';

interface CategoryFilterProps {
  className?: string;
}

export const CategoryFilter = ({ className = '' }: CategoryFilterProps) => {
  const dispatch = useAppDispatch();
  const { products, selectedCategory, filteredProducts } = useAppSelector(
    (state) => state.products,
  );
  const [isCollapsed, setIsCollapsed] = useState(true);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      products.map((product) => product.category_name),
    );
    return Array.from(uniqueCategories).sort();
  }, [products]);

  const handleCategorySelect = (category: string) => {
    if (selectedCategory === category) {
      dispatch(clearFilter());
    } else {
      dispatch(setSelectedCategory(category));
    }
  };

  const handleClearFilter = () => {
    dispatch(clearFilter());
  };

  if (categories.length === 0) {
    return null;
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Filter size={20} />
            Filter by Category
          </h3>
          <div className="flex items-center gap-2">
            {selectedCategory && (
              <Button
                variant="outline"
                onClick={handleClearFilter}
                className="flex items-center gap-1 text-sm px-3 py-1"
              >
                <X size={14} />
                Clear Filter
              </Button>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="md:hidden p-1 rounded-md hover:bg-gray-100"
              aria-label="Toggle category filter"
            >
              {isCollapsed ? (
                <ChevronDown size={20} />
              ) : (
                <ChevronUp size={20} />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`${isCollapsed ? 'hidden' : 'block'} md:block p-4`}>
        <div className="hidden md:flex gap-3 overflow-x-auto pb-2">
          <button
            onClick={() => dispatch(clearFilter())}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === null
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({products.length})
          </button>
          {categories.map((category) => {
            const categoryCount = products.filter(
              (product) => product.category_name === category,
            ).length;

            return (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category} ({categoryCount})
              </button>
            );
          })}
        </div>

        <div className="md:hidden space-y-2">
          <button
            onClick={() => dispatch(clearFilter())}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
              selectedCategory === null
                ? 'bg-blue-100 text-blue-800 font-medium'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            All Categories ({products.length})
          </button>
          {categories.map((category) => {
            const categoryCount = products.filter(
              (product) => product.category_name === category,
            ).length;

            return (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-100 text-blue-800 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{category}</span>
                  <span className="text-sm text-gray-500">
                    ({categoryCount})
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {selectedCategory && (
          <div
            className={`${isCollapsed ? 'hidden' : 'block'} md:block mt-4 p-3 bg-blue-50 rounded-md`}
          >
            <p className="text-sm text-blue-800">
              Showing <strong>{filteredProducts.length}</strong> products in:{' '}
              <strong>{selectedCategory}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
