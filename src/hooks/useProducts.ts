import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Product, ProductCategory, ProductListParams, ProductListResponse } from '@/types/product';
import { listProducts, getProduct, getFilterOptions, getFeaturedProducts } from '@/lib/api';
import { useEffect } from 'react';

const PRODUCTS_QUERY_KEY = 'products';
const FILTER_OPTIONS_QUERY_KEY = 'filter-options';

export function useProducts(category: ProductCategory) {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  
  // Parse URL search params
  const page = parseInt(searchParams.get('page') || '1', 10);
  const sort = searchParams.get('sort') || 'featured';
  const pageSize = parseInt(searchParams.get('pageSize') || '12', 10);
  
  // Parse filters from URL
  const filters: Record<string, string | string[] | number[]> = {};
  
  searchParams.forEach((value, key) => {
    if (key === 'page' || key === 'sort' || key === 'pageSize') return;
    
    // Handle comma-separated values
    if (value.includes(',')) {
      filters[key] = value.split(',');
    } 
    // Handle price range (e.g., price=0-100)
    else if (key === 'price' && value.includes('-')) {
      const [min, max] = value.split('-').map(Number);
      filters[key] = [min, max];
    }
    // Handle numeric values
    else if (!isNaN(Number(value))) {
      filters[key] = [Number(value)]; // Always store as array for consistency
    }
    // Handle string values
    else {
      filters[key] = value;
    }
  });
  
  // Fetch products
  const productsQuery = useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, { category, page, pageSize, sort, ...filters }],
    queryFn: (): Promise<ProductListResponse> => listProducts({
      category,
      page,
      pageSize,
      sort: sort as any,
      filters
    }),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  }) as UseQueryResult<ProductListResponse, Error>;
  
  // Prefetch the next page if there is one
  useEffect(() => {
    const hasNextPage = productsQuery.data && productsQuery.data.page < productsQuery.data.totalPages;
    if (hasNextPage) {
      queryClient.prefetchQuery({
        queryKey: [PRODUCTS_QUERY_KEY, { 
          category, 
          page: page + 1, 
          pageSize, 
          sort, 
          ...filters 
        }],
        queryFn: (): Promise<ProductListResponse> => listProducts({
          category,
          page: page + 1,
          pageSize,
          sort: sort as any,
          filters
        }),
      });
    }
  }, [category, page, pageSize, sort, filters, productsQuery.data, queryClient]);
  
  // Get filter options for the category
  const filterOptionsQuery = useQuery({
    queryKey: [FILTER_OPTIONS_QUERY_KEY, category],
    queryFn: () => getFilterOptions(category),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
  
  // Default empty response
  const defaultResponse = {
    items: [],
    total: 0,
    page: 1,
    pageSize: 12,
    totalPages: 1,
  };

  const data = productsQuery.data || defaultResponse;
  const isPreviousData = productsQuery.isFetching && productsQuery.isPlaceholderData;

  return {
    // Products data
    products: data.items || [],
    total: data.total || 0,
    page: data.page || 1,
    pageSize: data.pageSize || 12,
    totalPages: data.totalPages || 1,
    hasNextPage: data.page < data.totalPages,
    hasPreviousPage: data.page > 1,
    
    // Loading and error states
    isLoading: productsQuery.isLoading,
    isError: productsQuery.isError,
    error: productsQuery.error,
    isFetching: productsQuery.isFetching,
    isPreviousData: isPreviousData,
    
    // Filter options
    filterOptions: filterOptionsQuery.data,
    isFilterOptionsLoading: filterOptionsQuery.isLoading,
    isFilterOptionsError: filterOptionsQuery.isError,
    filterOptionsError: filterOptionsQuery.error,
    
    // Current filters and sort
    currentFilters: filters,
    currentSort: sort,
  };
}

export function useProduct(productId: string) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProduct(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useFeaturedProducts(limit: number = 8) {
  return useQuery({
    queryKey: ['featured-products', limit],
    queryFn: () => getFeaturedProducts(limit),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}
