export type Product = {
  id: number;
  product_name: string;
  quantity: number;
  description: string;
  price: string;
  product_img: string | null;
  product_img_url: string | null;
  created_at: string;
  user_name: string;
  category: number;
  category_name: string;
};

export type ProductsApiResponse = {
  success: boolean;
  message: string;
  data: Product[];
};

export type ProductApiResponse = {
  success: boolean;
  message: string;
  data: Product;
};

export type ProductsResponse = Product[];
