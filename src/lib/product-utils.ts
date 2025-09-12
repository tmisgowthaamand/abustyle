import { Product } from "@/types/product";
import { cosmeticsProducts } from "./mockData/cosmetics";
import { toysProducts } from "./mockData/toys";
import { accessoriesProducts } from "./mockData/accessories";
import { bagsProducts } from "./mockData/bags";

// Mock data for all categories
const mockProducts: Record<string, Product[]> = {
  cosmetics: [...cosmeticsProducts],
  toys: [...toysProducts],
  accessories: [...accessoriesProducts],
  bags: [...bagsProducts]
};

// Function to load products for a specific category
const loadProducts = async (category: string): Promise<Product[]> => {
  try {
    switch (category) {
      case 'cosmetics':
        return [...cosmeticsProducts];
      case 'toys':
        return [...toysProducts];
      case 'accessories':
        return [...accessoriesProducts];
      case 'bags':
        return [...bagsProducts];
      default:
        return [];
    }
  } catch (error) {
    console.error(`Error loading products for category ${category}:`, error);
    return [];
  }
};

// Function to get products with caching
const getCachedProducts = async (category: string): Promise<Product[]> => {
  return await loadProducts(category);
};

export const getProductById = async (id: string, category: string): Promise<Product | undefined> => {
  try {
    const products = await getCachedProducts(category);
    return products.find((product: Product) => product.id === id);
  } catch (error) {
    console.error('Error in getProductById:', error);
    return undefined;
  }
};

export const getRelatedProducts = async (product: Product, limit: number = 4): Promise<Product[]> => {
  try {
    const products = await getCachedProducts(product.category);
    return products
      .filter(p => p.id !== product.id) // Exclude current product
      .sort(() => 0.5 - Math.random()) // Shuffle array
      .slice(0, limit); // Limit results
  } catch (error) {
    console.error('Error in getRelatedProducts:', error);
    return [];
  }
};
