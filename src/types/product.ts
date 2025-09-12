export type ProductCategory = 'cosmetics' | 'toys' | 'accessories' | 'bags';

export type Product = {
  id: string;
  category: ProductCategory;
  title: string;
  description: string;
  brand?: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  image: string;
  images: string[];
  tags?: string[];
  attrs?: Record<string, string>;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductListParams = {
  category?: ProductCategory;
  page?: number;
  pageSize?: number;
  sort?: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  filters?: Record<string, string | string[] | number[]>;
};

export type ProductListResponse = {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
