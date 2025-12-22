import { Minus, Package, Plus, X } from 'lucide-react';

import type * as Types from '@types';

import { Button } from './Button';

export interface CartItemProps {
  item: Types.CartItem;
  onUpdateQuantity: (_id: number, _quantity: number) => void;
  onRemoveItem: (_id: number) => void;
}

export const CartItem = ({
  item,
  onUpdateQuantity,
  onRemoveItem,
}: CartItemProps) => {
  const handleIncrement = () => {
    if (item.quantity < item.maxQuantity) {
      onUpdateQuantity(item.id, item.quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const totalPrice = (parseFloat(item.price) * item.quantity).toFixed(2);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
      <div className="w-full sm:w-16 sm:h-16 h-32 shrink-0">
        {item.product_img_url ? (
          <img
            src={item.product_img_url}
            alt={item.product_name}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 rounded-md flex items-center justify-center">
            <Package
              size={20}
              className="sm:w-5 sm:h-5 w-8 h-8 text-gray-400"
            />
          </div>
        )}
      </div>

      <div className="flex-1 w-full sm:w-auto">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 text-sm sm:text-base line-clamp-2 sm:line-clamp-1 mb-1">
              {item.product_name}
            </h3>
            <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-500 mb-2">
              <span>{item.category_name}</span>
              <span>•</span>
              <span>by {item.user_name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-semibold text-gray-900">
                ${item.price}
              </span>
              <span className="text-xs sm:text-sm text-gray-500">each</span>
            </div>
          </div>

          <div className="flex flex-row sm:flex-col lg:flex-row items-center gap-4 sm:gap-2 lg:gap-4">
            <div className="flex items-center gap-2 order-2 sm:order-1">
              <Button
                variant="outline"
                onClick={handleDecrement}
                disabled={item.quantity <= 1}
                className="w-8 h-8 p-0 rounded-full text-xs"
              >
                <Minus size={12} />
              </Button>

              <span className="w-8 text-center font-medium text-sm sm:text-base">
                {item.quantity}
              </span>

              <Button
                variant="outline"
                onClick={handleIncrement}
                disabled={item.quantity >= item.maxQuantity}
                className="w-8 h-8 p-0 rounded-full text-xs"
              >
                <Plus size={12} />
              </Button>
            </div>

            <div className="flex items-center gap-3 order-1 sm:order-2">
              <div className="text-right">
                <div className="font-semibold text-gray-900 text-sm sm:text-base">
                  ${totalPrice}
                </div>
                {item.quantity >= item.maxQuantity && (
                  <div className="text-xs text-orange-600 whitespace-nowrap">
                    Max stock
                  </div>
                )}
              </div>

              <Button
                variant="outline"
                onClick={() => onRemoveItem(item.id)}
                className="w-8 h-8 p-0 text-gray-400 hover:text-red-600 border-none shrink-0"
              >
                <X size={14} className="sm:w-4 sm:h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
