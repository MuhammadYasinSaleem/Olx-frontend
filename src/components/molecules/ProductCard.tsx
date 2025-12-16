import type * as Types from '@types';

export interface ProductCardProps {
  product: Types.Product;
}

export const ProductCard = ({ product }: ProductCardProps) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    {product.product_img_url && (
      <img
        src={product.product_img_url}
        alt={product.product_name}
        className="w-full h-48 object-cover"
      />
    )}
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {product.product_name}
      </h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {product.description}
      </p>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xl font-bold text-cyan-600">
          ${product.price}
        </span>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
          {product.category_name}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Qty: {product.quantity}</span>
        <span>
          By: <span className="font-medium">{product.user_name}</span>
        </span>
      </div>
    </div>
  </div>
);
