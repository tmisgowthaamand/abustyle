import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { CategoryHero } from "@/components/CategoryHero";
import { ProductGrid } from "@/components/ProductGrid";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import type { Product } from "@/types/product";

const COSMETICS_ACCENT = "#E75480";

// Helper function to convert numbers to strings for attrs
const stringifyAttrs = (obj: Record<string, any>): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = String(value);
  }
  return result;
};

// Mock data - replace with actual data fetching
const mockProducts: Product[] = [
  {
    id: 'c1',
    category: 'cosmetics',
    title: 'Matte Lipstick - Ruby Red',
    description: 'Long-lasting matte lipstick with intense color payoff',
    brand: 'Glamour Cosmetics',
    price: 24.99,
    compareAtPrice: 29.99,
    rating: 4.8,
    reviews: 156,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['lipstick', 'matte', 'makeup', 'long-lasting'],
    attrs: {
      finish: 'Matte',
      color: 'Ruby Red',
      weight: '3.5g',
      skinType: 'All skin types'
    },
    createdAt: '2023-01-15T09:30:00Z',
    updatedAt: '2023-01-15T09:30:00Z'
  },
  {
    id: 'c2',
    category: 'cosmetics',
    title: 'Hydrating Foundation - Natural Beige',
    description: 'Lightweight foundation with hyaluronic acid for 24-hour hydration',
    brand: 'PureSkin',
    price: 34.99,
    compareAtPrice: 39.99,
    rating: 4.7,
    reviews: 289,
    stock: 32,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67c53b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1572442388796-11668a67c53b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['foundation', 'makeup', 'hydrating', 'skincare'],
    attrs: {
      coverage: 'Medium',
      finish: 'Natural',
      skinType: 'Dry, Normal',
      spf: 'SPF 25',
      volume: '30ml'
    },
    createdAt: '2023-01-20T11:15:00Z',
    updatedAt: '2023-01-20T11:15:00Z'
  },
  {
    id: 'c3',
    category: 'cosmetics',
    title: 'Eyeshadow Palette - Nude Tones',
    description: 'Versatile 12-shade palette with matte and shimmer finishes',
    brand: 'Elegance',
    price: 49.99,
    compareAtPrice: 59.99,
    rating: 4.9,
    reviews: 342,
    stock: 28,
    image: 'https://images.unsplash.com/photo-1533050487297-09ca450ccdd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1533050487297-09ca450ccdd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['eyeshadow', 'palette', 'makeup', 'nude'],
    attrs: stringifyAttrs({
      finish: 'Matte & Shimmer',
      shades: 12,
      weight: '15g',
      vegan: 'Yes'
    }),
    createdAt: '2023-02-05T14:20:00Z',
    updatedAt: '2023-02-05T14:20:00Z'
  },
  {
    id: 'c4',
    category: 'cosmetics',
    title: 'Volume Mascara - Black',
    description: 'Lengthening and volumizing mascara for dramatic lashes',
    brand: 'LashLux',
    price: 22.99,
    compareAtPrice: 27.99,
    rating: 4.6,
    reviews: 421,
    stock: 65,
    image: 'https://images.unsplash.com/photo-1586985288624-e97c52b8a473?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1586985288624-e97c52b8a473?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['mascara', 'eyelashes', 'makeup', 'volume'],
    attrs: {
      color: 'Black',
      effect: 'Volume & Length',
      waterproof: 'No',
      volume: '10ml'
    },
    createdAt: '2023-01-28T10:45:00Z',
    updatedAt: '2023-01-28T10:45:00Z'
  },
  {
    id: 'c5',
    category: 'cosmetics',
    title: 'Blush Duo - Rose Gold',
    description: 'Dual-toned blush for a natural, radiant glow',
    brand: 'Radiant Beauty',
    price: 28.99,
    compareAtPrice: 34.99,
    rating: 4.5,
    reviews: 187,
    stock: 38,
    image: 'https://images.unsplash.com/photo-1571784728266-9c8e475dfe8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1571784728266-9c8e475dfe8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['blush', 'cheeks', 'makeup', 'glow'],
    attrs: {
      finish: 'Satin',
      color: 'Rose Gold',
      weight: '8g',
      skinTone: 'Light to Medium'
    },
    createdAt: '2023-02-10T13:30:00Z',
    updatedAt: '2023-02-10T13:30:00Z'
  },
  {
    id: 'c6',
    category: 'cosmetics',
    title: 'Brow Pencil - Medium Brown',
    description: 'Precision eyebrow pencil with spoolie brush',
    brand: 'BrowGlam',
    price: 19.99,
    compareAtPrice: 24.99,
    rating: 4.8,
    reviews: 312,
    stock: 52,
    image: 'https://images.unsplash.com/photo-1572635148018-5d3b1c5a0f5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1572635148018-5d3b1c5a0f5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['brows', 'eyebrows', 'pencil', 'makeup'],
    attrs: {
      color: 'Medium Brown',
      type: 'Mechanical Pencil',
      tip: 'Fine Point',
      includes: 'Spoolie Brush'
    },
    createdAt: '2023-02-15T09:20:00Z',
    updatedAt: '2023-02-15T09:20:00Z'
  },
  {
    id: 'c7',
    category: 'cosmetics',
    title: 'Liquid Eyeliner - Black',
    description: 'Precision liquid eyeliner with brush tip for sharp lines',
    brand: 'LinerX',
    price: 21.99,
    compareAtPrice: 26.99,
    rating: 4.7,
    reviews: 276,
    stock: 41,
    image: 'https://images.unsplash.com/photo-1625772452859-1d0e5d9ce77a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1625772452859-1d0e5d9ce77a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['eyeliner', 'liquid', 'makeup', 'precision'],
    attrs: {
      color: 'Black',
      tip: 'Brush',
      waterproof: 'Yes',
      volume: '3ml'
    },
    createdAt: '2023-02-18T11:40:00Z',
    updatedAt: '2023-02-18T11:40:00Z'
  },
  {
    id: 'c8',
    category: 'cosmetics',
    title: 'Makeup Setting Spray',
    description: 'Long-lasting setting spray for 16-hour makeup wear',
    brand: 'UrbanFix',
    price: 29.99,
    compareAtPrice: 34.99,
    rating: 4.9,
    reviews: 198,
    stock: 36,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['setting spray', 'makeup', 'long-lasting', 'finish'],
    attrs: {
      finish: 'Natural',
      size: '100ml',
      skinType: 'All skin types',
      duration: 'Up to 16 hours'
    },
    createdAt: '2023-02-22T15:10:00Z',
    updatedAt: '2023-02-22T15:10:00Z'
  },
  {
    id: 'c9',
    category: 'cosmetics',
    title: 'Concealer - Light Medium',
    description: 'Full coverage concealer with hydrating formula',
    brand: 'Flawless Base',
    price: 26.99,
    compareAtPrice: 31.99,
    rating: 4.7,
    reviews: 243,
    stock: 29,
    image: 'https://images.unsplash.com/photo-1608375562906-1ff4dfb9aef5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1608375562906-1ff4dfb9aef5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['concealer', 'coverage', 'makeup', 'hydrating'],
    attrs: {
      coverage: 'Full',
      finish: 'Natural',
      shade: 'Light Medium',
      volume: '8ml'
    },
    createdAt: '2023-02-25T10:15:00Z',
    updatedAt: '2023-02-25T10:15:00Z'
  },
  {
    id: 'c10',
    category: 'cosmetics',
    title: 'Lip Gloss - Clear Shimmer',
    description: 'Non-sticky lip gloss with subtle shimmer',
    brand: 'ShineOn',
    price: 16.99,
    compareAtPrice: 19.99,
    rating: 4.4,
    reviews: 167,
    stock: 58,
    image: 'https://images.unsplash.com/photo-1586494824764-fbd27efd1d09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1586494824764-fbd27efd1d09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['lip gloss', 'shimmer', 'makeup', 'clear'],
    attrs: {
      finish: 'Glossy',
      color: 'Clear with Shimmer',
      weight: '5ml',
      fragrance: 'Vanilla'
    },
    createdAt: '2023-03-01T14:25:00Z',
    updatedAt: '2023-03-01T14:25:00Z'
  },
  {
    id: 'c11',
    category: 'cosmetics',
    title: 'Highlighter Palette - Glow Kit',
    description: 'Four stunning highlighters for a radiant glow',
    brand: 'GlowGoddess',
    price: 42.99,
    compareAtPrice: 49.99,
    rating: 4.9,
    reviews: 198,
    stock: 24,
    image: 'https://images.unsplash.com/photo-1533050487297-09ca450ccdd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1533050487297-09ca450ccdd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['highlighter', 'glow', 'makeup', 'palette'],
    attrs: stringifyAttrs({
      finish: 'Metallic',
      shades: 4,
      weight: '12g',
      skinTone: 'Universal'
    }),
    createdAt: '2023-03-05T16:30:00Z',
    updatedAt: '2023-03-05T16:30:00Z'
  },
  {
    id: 'c12',
    category: 'cosmetics',
    title: 'Makeup Brush Set',
    description: 'Complete 12-piece vegan brush set for flawless application',
    brand: 'BrushMaster',
    price: 59.99,
    compareAtPrice: 79.99,
    rating: 4.8,
    reviews: 178,
    stock: 31,
    image: 'https://images.unsplash.com/photo-1618574761848-ebbe5d0e5b7c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1618574761848-ebbe5d0e5b7c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['brushes', 'makeup tools', 'vegan', 'set'],
    attrs: stringifyAttrs({
      material: 'Synthetic Bristles',
      pieces: '12',
      includes: 'Travel Case',
      crueltyFree: 'Yes'
    }),
    createdAt: '2023-03-10T12:15:00Z',
    updatedAt: '2023-03-10T12:15:00Z'
  }
];

export default function Cosmetics() {
  const [sortOption, setSortOption] = useState("featured");
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Use mock data instead of API call
  const products = mockProducts;
  const isLoading = false;
  const isError = false;
  
  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortOption(value);
    // Update URL with sort parameter
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', value);
    setSearchParams(newParams);
  };

  
  return (
    <Layout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category header */}
        <CategoryHero
          title="Cosmetics & Beauty"
          subtitle="Discover our premium collection of beauty products"
          imageSrc="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
          accent={COSMETICS_ACCENT}
        />
        
        <div className="py-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Cosmetics', href: '/cosmetics' }
            ]}
          />
          
          <div className="mt-6">
            {/* Filters and sorting */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">All Cosmetics</h2>
              
              <div className="flex items-center space-x-4">
                <div className="hidden lg:block">
                  <Select
                    value={sortOption}
                    onValueChange={setSortOption}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="newest">Newest Arrivals</SelectItem>
                      <SelectItem value="rating">Top Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="container mx-auto px-4 py-8">
              <div className="w-full">
                {/* Product grid */}
                {products.length > 0 ? (
                  <div>
                    <ProductGrid
                      products={products}
                      columnsDesktop={3}
                      ratio="portrait"
                      emptyStateTitle="No cosmetics found"
                      emptyStateDescription="Try adjusting your search to find what you're looking for."
                      categoryAccent={COSMETICS_ACCENT}
                    />
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No products found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
