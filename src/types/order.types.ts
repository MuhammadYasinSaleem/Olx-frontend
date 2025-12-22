export type OrderProductData = {
  product_id: number;
  quantity: number;
};

export type OrderRequest = {
  shipping_address: string;
  products_data: OrderProductData[];
};

export type OrderItem = {
  product_id: number;
  product_name: string;
  unit_price: string;
  quantity: number;
};

export type Order = {
  id: number;
  user: string;
  order_date: string;
  products: OrderItem[];
  total_amount: string;
  shipping_address: string;
  order_status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
};

export type OrdersApiResponse = {
  success: boolean;
  message: string;
  data: Order[];
};

export type OrderCreateApiResponse = {
  success: boolean;
  message: string;
  data: Order;
};

export type OrdersResponse = Order[];

export type OrderState = {
  orders: Order[];
  loading: boolean;
  error: { message: string; status?: number } | null;
  placingOrder: boolean;
  orderError: { message: string; status?: number } | null;
};
