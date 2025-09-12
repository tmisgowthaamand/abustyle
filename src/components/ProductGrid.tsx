import { Product } from '@/types/product';
import { ProductCard } from "./ProductCard";
import { EmptyState } from "./EmptyState";
import { cn } from '@/lib/utils';

interface ProductGridProps {
  products: Product[];
  columnsDesktop?: 2 | 3 | 4;
  ratio?: "square" | "portrait";
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  onClearFilters?: () => void;
  categoryAccent?: string;
  className?: string;
  isLoading?: boolean;
}

export function ProductGrid({
  products,
  columnsDesktop = 3,
  ratio = "portrait",
  emptyStateTitle = "No products found",
  emptyStateDescription = "Try adjusting your search or filter to find what you're looking for.",
  onClearFilters,
  categoryAccent = "#e11d48", // rose-600
  className = "",
  isLoading = false,
}: ProductGridProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  if (isLoading) {
    return (
      <div className={cn("grid grid-cols-1 gap-6", gridCols[columnsDesktop], className)}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square bg-gray-100 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-100 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <EmptyState
        title={emptyStateTitle}
        description={emptyStateDescription}
        onAction={onClearFilters}
      />
    );
  }

  return (
    <div className={cn("grid grid-cols-1 gap-6", gridCols[columnsDesktop], className)}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.title}
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          rating={product.rating}
          reviewCount={product.reviews}
          image={product.image}
          images={product.images}
          category={product.category}
          tags={product.tags}
          ratio={ratio}
          categoryAccent={categoryAccent}
        />
      ))}
    </div>
  );
}
