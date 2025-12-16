import { Package, ShoppingCart } from 'lucide-react';

import { Button } from '@components/atoms';
import type * as Types from '@types';

export interface ProductCardProps {
  product: Types.Product;
  onAddToCart?: (_product: Types.Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
    <div className="p-4 pb-0">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
          {product.category_name}
        </span>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Package size={14} />
          <span>{product.quantity} left</span>
        </div>
      </div>
    </div>

    <div className="px-4">
      {product.product_img_url ? (
        <img
          src={product.product_img_url}
          alt={product.product_name}
          className="w-full h-48 object-cover rounded-lg bg-gray-100"
        />
      ) : (
        <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
          <Package size={48} className="text-gray-400" />
        </div>
      )}
    </div>

    <div className="p-4">
      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
        {product.product_name}
      </h3>

      <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
        {product.description}
      </p>

      <div className="text-sm text-gray-500 mb-4">
        Sold by{' '}
        <span className="font-semibold text-gray-700">{product.user_name}</span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-gray-900">
          ${product.price}
        </span>
        <Button
          variant="primary"
          onClick={() => onAddToCart?.(product)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-medium transition-colors"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </Button>
      </div>
    </div>
  </div>
);
