/**
 * @fileoverview Types for products, product requests, and product API responses.
 * @module types/product.types
 */

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
  user_id?: number;
  category: number;
  category_name: string;
};

export type ProductRequest = {
  product_name: string;
  quantity?: number;
  description?: string;
  price: string;
  product_img?: File;
  category: number;
};

export type ProductUpdateRequest = {
  product_name: string;
  quantity?: number;
  description?: string;
  price: string;
  product_img?: File;
  category: number;
};

export type ProductPatchRequest = {
  product_name?: string;
  quantity?: number;
  description?: string;
  price?: string;
  product_img?: File;
  category?: number;
};

export type PaginatedProductsData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
};

export type ProductsApiResponse = {
  success: boolean;
  message: string;
  data: PaginatedProductsData;
  errors: any;
};

export type ProductApiResponse = {
  success: boolean;
  message: string;
  data: Product;
};

export type CreateProductApiResponse = {
  success: boolean;
  message: string;
  data: Product;
  errors: any;
};

export type UpdateProductApiResponse = {
  success: boolean;
  message: string;
  data: Product;
  errors?: any;
};

export type ProductsResponse = Product[];

export type PaginatedProductsResponse = PaginatedProductsData;
