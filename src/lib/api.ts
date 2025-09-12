import { Product, ProductListParams, ProductListResponse, Product as ProductType } from '@/types/product';
import allProducts, { filterAndSortProducts } from './seed';

// Simulate API delay (in ms)
const API_DELAY = 300;

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * List products with filtering, sorting, and pagination
 */
export async function listProducts(params: ProductListParams = {}): Promise<ProductListResponse> {
  await delay(API_DELAY);
  
  const {
    category,
    page = 1,
    pageSize = 12,
    sort = 'featured',
    filters = {}
  } = params;

  // Filter and sort products
  const filteredProducts = filterAndSortProducts(allProducts, {
    category,
    sort,
    filters
  });

  // Apply pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  const total = filteredProducts.length;
  const totalPages = Math.ceil(total / pageSize);

  return {
    items: paginatedProducts,
    total,
    page,
    pageSize,
    totalPages
  };
}

/**
 * Get a single product by ID
 */
export async function getProduct(id: string): Promise<ProductType | undefined> {
  await delay(API_DELAY);
  const product = allProducts.find(p => p.id === id);
  
  if (!product) return undefined;
  
  // Get 4 related products (same category, excluding current product)
  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  return {
    ...product,
    relatedProducts
  };
}

/**
 * Get filter options for a category
 */
export async function getFilterOptions(category: string) {
  await delay(API_DELAY);
  
  const categoryProducts = allProducts.filter(p => p.category === category);
  
  // Get all unique brands
  const brands = [...new Set(categoryProducts.map(p => p.brand).filter(Boolean))] as string[];
  
  // Get all unique attributes
  const attributes: Record<string, string[]> = {};
  
  categoryProducts.forEach(product => {
    Object.entries(product.attrs || {}).forEach(([key, value]) => {
      if (!attributes[key]) {
        attributes[key] = [];
      }
      if (value && !attributes[key].includes(value)) {
        attributes[key].push(value);
      }
    });
  });
  
  // Get price range
  const prices = categoryProducts.map(p => p.price);
  const minPrice = Math.floor(Math.min(...prices) / 10) * 10; // Round down to nearest 10
  const maxPrice = Math.ceil(Math.max(...prices) / 10) * 10; // Round up to nearest 10
  
  return {
    brands,
    attributes,
    priceRange: { min: minPrice, max: maxPrice },
    totalProducts: categoryProducts.length
  };
}

/**
 * Get featured products (bestsellers and new arrivals)
 */
export async function getFeaturedProducts(limit = 8) {
  await delay(API_DELAY);
  
  // Get bestsellers
  const bestsellers = [...allProducts]
    .filter(p => p.tags?.includes('Bestseller'))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
  
  // Get new arrivals
  const newArrivals = [...allProducts]
    .filter(p => p.tags?.includes('New'))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
  
  return {
    bestsellers,
    newArrivals
  };
}
