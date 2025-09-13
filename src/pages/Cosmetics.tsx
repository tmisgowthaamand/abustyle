import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { CategoryHero } from "@/components/CategoryHero";
import { ProductGrid } from "@/components/ProductGrid";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
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
    price: 2499,
    compareAtPrice: 2999,
    rating: 4.8,
    reviews: 156,
    stock: 45,
    image: '/images/Cosmetics/1.jpg',
    images: [
      '/images/Cosmetics/1.jpg'
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
    price: 3499,
    compareAtPrice: 3999,
    rating: 4.7,
    reviews: 289,
    stock: 32,
    image: '/images/Cosmetics/2.jpg',
    images: [
      '/images/Cosmetics/2.jpg'
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
    price: 4999,
    compareAtPrice: 5999,
    rating: 4.9,
    reviews: 342,
    stock: 28,
    image: '/images/Cosmetics/3.jpg',
    images: [
      '/images/Cosmetics/3.jpg'
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
    price: 2299,
    compareAtPrice: 2799,
    rating: 4.6,
    reviews: 421,
    stock: 65,
    image: '/images/Cosmetics/4.jpg',
    images: [
      '/images/Cosmetics/4.jpg'
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
    price: 2899,
    compareAtPrice: 3499,
    rating: 4.5,
    reviews: 187,
    stock: 38,
    image: '/images/Cosmetics/5.jpg',
    images: [
      '/images/Cosmetics/5.jpg'
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
    price: 1999,
    compareAtPrice: 2499,
    rating: 4.8,
    reviews: 312,
    stock: 52,
    image: '/images/Cosmetics/6.jpg',
    images: [
      '/images/Cosmetics/6.jpg'
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
    price: 2199,
    compareAtPrice: 2699,
    rating: 4.7,
    reviews: 276,
    stock: 41,
    image: '/images/Cosmetics/7.jpg',
    images: [
      '/images/Cosmetics/7.jpg'
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
    price: 2999,
    compareAtPrice: 3499,
    rating: 4.9,
    reviews: 198,
    stock: 36,
    image: '/images/Cosmetics/8.jpg',
    images: [
      '/images/Cosmetics/8.jpg'
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
    price: 2699,
    compareAtPrice: 3199,
    rating: 4.7,
    reviews: 243,
    stock: 29,
    image: '/images/Cosmetics/9.jpg',
    images: [
      '/images/Cosmetics/9.jpg'
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
    price: 1699,
    compareAtPrice: 1999,
    rating: 4.4,
    reviews: 167,
    stock: 58,
    image: '/images/Cosmetics/10.jpg',
    images: [
      '/images/Cosmetics/10.jpg'
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
    price: 4299,
    compareAtPrice: 4999,
    rating: 4.9,
    reviews: 198,
    stock: 24,
    image: '/images/Cosmetics/11.jpg',
    images: [
      '/images/Cosmetics/11.jpg'
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
    price: 5999,
    compareAtPrice: 7999,
    rating: 4.8,
    reviews: 178,
    stock: 31,
    image: '/images/Cosmetics/12.jpg',
    images: [
      '/images/Cosmetics/12.jpg'
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortOption, setSortOption] = useState("featured");
  const navigate = useNavigate();
  
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
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Cosmetics', href: '/cosmetics' }
              ]}
            />
          </div>
          
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
                  <div data-products-section>
                    <ProductGrid
                      products={mockProducts}
                      columnsDesktop={3}
                      ratio="square"
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
