/**
 * @fileoverview Product card component for displaying product information in grid layouts.
 * @module components/molecules/ProductCard
 */

import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Package, ShoppingCart } from 'lucide-react';

import { Button } from '@components/atoms';
import type * as Types from '@types';
import { addToCart, useAppDispatch } from '@store';

/**
 * Props interface for ProductCard component.
 */
interface ProductCardProps {
  product: Types.Product;
}

/**
 * Product card component displaying product details with add to cart functionality.
 *
 * Features:
 * - Product image with fallback placeholder
 * - Category badge and stock quantity
 * - Product name and description preview
 * - Price display with add to cart button
 * - Clickable card navigation to product detail
 * - Responsive hover effects
 *
 * @param {Object} props - Component props
 * @param {Types.Product} props.product - Product data to display
 * @returns {JSX.Element} ProductCard component
 */
export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    const cartPayload: Types.AddToCartPayload = {
      id: product.id,
      product_name: product.product_name,
      price: product.price,
      product_img_url: product.product_img_url,
      maxQuantity: product.quantity,
      user_name: product.user_name,
      category_name: product.category_name,
    };

    dispatch(addToCart(cartPayload));
    toast.success(`Added ${product.product_name} to cart!`);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
      onClick={handleCardClick}
    >
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
          <span className="font-semibold text-gray-700">
            {product.user_name}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price}
          </span>
          <Button
            variant="primary"
            onClick={handleAddToCart}
            disabled={product.quantity === 0}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-medium transition-colors disabled:bg-gray-400"
          >
            <ShoppingCart size={16} />
            {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
