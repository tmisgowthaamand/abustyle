import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export type Product = {
  id: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  rating?: number;
  reviewsCount?: number;
  labels?: string[];
  secondaryTag?: string;
  category: string;
  inStock: boolean;
  colors?: string[];
  sizes?: string[];
  description?: string;
};

export type ProductFilters = {
  [key: string]: any; // Allow any string key for dynamic filters
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  colors?: string[];
  sizes?: string[];
  sortBy?: string;
  searchQuery?: string;
  page?: number;
  limit?: number;
};

// Mock data - replace with actual API calls
const mockProducts: Product[] = [
  // Cosmetics
  {
    id: "c1",
    title: "Velvet Matte Lipstick - Ruby Red",
    price: 24.99,
    compareAtPrice: 29.99,
    image: "https://images.unsplash.com/photo-1572635148811-d8c5cde5e0d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    rating: 4.5,
    reviewsCount: 128,
    labels: ["Bestseller", "Vegan"],
    secondaryTag: "Cruelty-Free",
    category: "cosmetics",
    inStock: true,
    colors: ["#E75480", "#000000", "#C41E3A"],
    description: "Long-lasting matte lipstick with a velvety finish. Enriched with vitamin E for smooth application and all-day comfort."
  },
  // Add more mock products for each category...
  
  // Toys
  {
    id: "t1",
    title: "Building Blocks Set - 120 Pieces",
    price: 29.99,
    compareAtPrice: 39.99,
    image: "https://images.unsplash.com/photo-1581230706563-49a551b5f0c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    reviewsCount: 215,
    labels: ["Bestseller", "New"],
    secondaryTag: "Ages 3+",
    category: "toys",
    inStock: true,
    colors: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"],
    description: "Creative building blocks set with 120 pieces. Encourages imagination, fine motor skills, and problem-solving abilities."
  },
  
  // Accessories
  {
    id: "a1",
    title: "Minimalist Gold Necklace",
    price: 89.99,
    compareAtPrice: 129.99,
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    reviewsCount: 142,
    labels: ["Bestseller", "New"],
    secondaryTag: "Hypoallergenic",
    category: "accessories",
    inStock: true,
    colors: ["#D4AF37", "#C0C0C0"],
    description: "Elegant minimalist gold necklace. Perfect for layering or wearing alone as a statement piece."
  },
  
  // Bags
  {
    id: "b1",
    title: "Classic Leather Tote Bag",
    price: 149.99,
    compareAtPrice: 199.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    reviewsCount: 89,
    labels: ["Bestseller", "New"],
    secondaryTag: "Genuine Leather",
    category: "bags",
    inStock: true,
    colors: ["#8B4513", "#000000", "#654321"],
    sizes: ["Small", "Medium", "Large"],
    description: "Timeless leather tote bag with ample space for all your essentials. Features multiple compartments and a secure zip closure."
  },
];

export type ProductsResponse = {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
};

// Simulate API call with filters
const fetchProducts = async (filters: ProductFilters = {}): Promise<ProductsResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredProducts = [...mockProducts];
  
  // Apply filters
  if (filters.category) {
    filteredProducts = filteredProducts.filter(
      product => product.category === filters.category
    );
  }
  
  if (filters.minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      product => product.price >= (filters.minPrice || 0)
    );
  }
  
  if (filters.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      product => product.price <= (filters.maxPrice || Infinity)
    );
  }
  
  if (filters.inStock !== undefined) {
    filteredProducts = filteredProducts.filter(
      product => product.inStock === filters.inStock
    );
  }
  
  if (filters.colors?.length) {
    filteredProducts = filteredProducts.filter(product => 
      product.colors?.some(color => filters.colors?.includes(color))
    );
  }
  
  // Apply sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Assuming newer items have higher IDs
        filteredProducts.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'rating':
        filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      // Default: featured (no specific sorting)
    }
  }
  
  // Apply pagination
  const page = filters.page || 1;
  const limit = filters.limit || 12;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  return {
    products: paginatedProducts,
    total: filteredProducts.length,
    page,
    totalPages: Math.ceil(filteredProducts.length / limit),
    hasMore: endIndex < filteredProducts.length,
  };
};

export const useProducts = (initialFilters: ProductFilters = {}): UseQueryResult<ProductsResponse, Error> & { filters: ProductFilters } => {
  const [searchParams] = useSearchParams();
  
  // Get filters from URL params
  const getFiltersFromParams = (): ProductFilters => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    
    return {
      ...initialFilters,
      ...params,
      minPrice: params.minPrice ? Number(params.minPrice) : undefined,
      maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
      inStock: params.inStock ? params.inStock === 'true' : undefined,
      colors: params.colors ? params.colors.split(',') : undefined,
      sizes: params.sizes ? params.sizes.split(',') : undefined,
      page: params.page ? Number(params.page) : 1,
      limit: params.limit ? Number(params.limit) : 12,
    };
  };
  
  const filters = getFiltersFromParams();
  
  const query = useQuery<ProductsResponse, Error>({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
    placeholderData: (previousData) => previousData, // Keep previous data while fetching new data
  });
  
  return {
    ...query,
    filters,
    hasNextPage: query.data ? query.data.hasMore : false,
  } as UseQueryResult<ProductsResponse, Error> & { 
    filters: ProductFilters;
    hasNextPage: boolean;
  };
};

// Hook to get a single product by ID
export const useProduct = (id: string): UseQueryResult<Product, Error> => {
  return useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      const product = mockProducts.find(p => p.id === id);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    },
    enabled: !!id,
  });
};
