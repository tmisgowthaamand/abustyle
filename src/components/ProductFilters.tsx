import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCategory } from '@/types/product';
import { CategoryFilters } from './CategoryFilters';
import { useProducts } from '@/hooks/useProducts';

type ProductFiltersProps = {
  category: ProductCategory;
  className?: string;
};

export function ProductFilters({ category, className = '' }: ProductFiltersProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filterOptions, isFilterOptionsLoading } = useProducts(category);

  // Map filter options to CategoryFilters format
  const filterSections = useMemo(() => {
    if (!filterOptions) return [];

    const sections = [];

    // Price range filter
    if (filterOptions.priceRange) {
      sections.push({
        id: 'price',
        title: 'Price Range',
        type: 'slider' as const,
        min: filterOptions.priceRange.min,
        max: filterOptions.priceRange.max,
        step: 1,
        prefix: '$',
      });
    }

    // Brands filter
    if (filterOptions.brands?.length) {
      sections.push({
        id: 'brands',
        title: 'Brands',
        type: 'checkbox' as const,
        options: filterOptions.brands.map(brand => ({
          id: brand,
          label: brand,
          count: 0, // Count not available in the current API
        })),
      });
    }

    // Attributes filters
    if (filterOptions.attributes) {
      Object.entries(filterOptions.attributes).forEach(([key, values]) => {
        if (Array.isArray(values) && values.length > 0) {
          // Format attribute key for display (e.g., 'skinType' -> 'Skin Type')
          const title = key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
          
          sections.push({
            id: key,
            title,
            type: 'checkbox' as const,
            options: values.map(value => ({
              id: value,
              label: value,
              count: 0, // Count not available in the current API
            })),
          });
        }
      });
    }

    return sections;
  }, [filterOptions, category]);

  // Handle filter changes
  const handleFilterChange = (filters: Record<string, any>) => {
    const newParams = new URLSearchParams();
    
    // Add all filters to URL params
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          newParams.set(key, value.join(','));
        }
      } else if (value !== undefined && value !== '') {
        newParams.set(key, String(value));
      }
    });

    // Reset to first page when filters change
    newParams.set('page', '1');
    
    // Update URL without causing a full page reload
    setSearchParams(newParams, { replace: true });
  };

  if (isFilterOptionsLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-6 w-1/3 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-4 bg-gray-100 rounded w-3/4"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!filterSections.length) {
    return null;
  }

  return (
    <CategoryFilters
      sections={filterSections}
      className={className}
      accent="#e11d48" // rose-600
      onFilterChange={handleFilterChange}
    />
  );
}
