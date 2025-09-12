import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { CategoryHero } from "@/components/CategoryHero";
import { ProductGrid } from "@/components/ProductGrid";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Product } from '@/types/product';

// Mock data - replace with actual data fetching
const mockProducts: Product[] = [
  {
    id: 'a1',
    category: 'accessories',
    title: 'Gold Hoop Earrings',
    description: 'Elegant 14K gold plated hoop earrings with secure latch closure',
    brand: 'Luxury Accessories',
    price: 45.99,
    compareAtPrice: 59.99,
    rating: 4.5,
    reviews: 128,
    stock: 50,
    image: '/images/products/accessories/1.png',
    images: [
      '/images/products/accessories/1.png',
      '/images/products/accessories/2.png',
      '/images/products/accessories/3.png'
    ],
    tags: ['jewelry', 'gold', 'hoops', 'earrings'],
    attrs: {
      material: '14K Gold Plated',
      style: 'Hoop',
      color: 'Gold',
      size: '2.5cm diameter'
    },
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2023-01-15T10:30:00Z'
  },
  {
    id: 'a2',
    category: 'accessories',
    title: 'Minimalist Gold Necklace',
    description: 'Simple and elegant 14K gold plated necklace with adjustable chain',
    brand: 'Minimalist Accessories',
    price: 89.99,
    compareAtPrice: 129.99,
    rating: 4.8,
    reviews: 142,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1603974375894-2b7c0c6f8a1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1603974375894-2b7c0c6f8a1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['jewelry', 'necklace', 'minimalist', 'gold'],
    attrs: {
      material: '14K Gold Plated',
      style: 'Pendant',
      color: 'Gold',
      chainLength: '45cm + 5cm extender'
    },
    createdAt: '2023-01-20T14:45:00Z',
    updatedAt: '2023-01-20T14:45:00Z'
  },
  {
    id: 'a3',
    category: 'accessories',
    title: 'Leather Crossbody Bag',
    description: 'Genuine leather crossbody bag with adjustable strap',
    brand: 'Urban Chic',
    price: 129.99,
    compareAtPrice: 159.99,
    rating: 4.7,
    reviews: 89,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['bag', 'crossbody', 'leather', 'fashion'],
    attrs: {
      material: 'Genuine Leather',
      style: 'Crossbody',
      color: 'Brown',
      dimensions: '20cm x 15cm x 8cm'
    },
    createdAt: '2023-02-10T11:20:00Z',
    updatedAt: '2023-02-10T11:20:00Z'
  },
  {
    id: 'a4',
    category: 'accessories',
    title: 'Silver Bangle Set',
    description: 'Set of three sterling silver bangles with different widths',
    brand: 'Silver Essence',
    price: 75.99,
    compareAtPrice: 99.99,
    rating: 4.6,
    reviews: 112,
    stock: 40,
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['jewelry', 'silver', 'bangles', 'set'],
    attrs: {
      material: '925 Sterling Silver',
      style: 'Bangles',
      color: 'Silver',
      setIncludes: '3 bangles (5mm, 8mm, 12mm)'
    },
    createdAt: '2023-01-25T09:15:00Z',
    updatedAt: '2023-01-25T09:15:00Z'
  },
  {
    id: 'a5',
    category: 'accessories',
    title: 'Designer Sunglasses',
    description: 'UV protection sunglasses with polarized lenses',
    brand: 'SunStyle',
    price: 129.99,
    compareAtPrice: 179.99,
    rating: 4.9,
    reviews: 256,
    stock: 35,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237ac008?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237ac008?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['sunglasses', 'eyewear', 'fashion', 'uv-protection'],
    attrs: {
      material: 'Acetate frame',
      lensType: 'Polarized',
      color: 'Black/Gradient',
      uvProtection: '100% UV400'
    },
    createdAt: '2023-02-15T13:30:00Z',
    updatedAt: '2023-02-15T13:30:00Z'
  },
  {
    id: 'a6',
    category: 'accessories',
    title: 'Pearl Drop Earrings',
    description: 'Elegant freshwater pearl drop earrings with 14K gold accents',
    brand: 'Pearl Essence',
    price: 95.99,
    compareAtPrice: 129.99,
    rating: 4.7,
    reviews: 87,
    stock: 28,
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['jewelry', 'pearl', 'earrings', 'gold'],
    attrs: {
      material: 'Freshwater Pearl, 14K Gold',
      style: 'Drop',
      color: 'White/Gold',
      length: '2.5cm drop'
    },
    createdAt: '2023-02-05T16:20:00Z',
    updatedAt: '2023-02-05T16:20:00Z'
  },
  {
    id: 'a7',
    category: 'accessories',
    title: 'Leather Wallet with RFID',
    description: 'Genuine leather wallet with RFID blocking technology',
    brand: 'LeatherCraft',
    price: 49.99,
    compareAtPrice: 69.99,
    rating: 4.4,
    reviews: 203,
    stock: 60,
    image: 'https://images.unsplash.com/photo-1591561954555-607968c989ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1591561954555-607968c989ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['wallet', 'leather', 'rfid', 'men', 'women'],
    attrs: {
      material: 'Genuine Leather',
      features: 'RFID Blocking',
      color: 'Brown',
      cardSlots: '8'
    },
    createdAt: '2023-01-30T10:45:00Z',
    updatedAt: '2023-01-30T10:45:00Z'
  },
  {
    id: 'a8',
    category: 'accessories',
    title: 'Silk Scarf',
    description: 'Luxury 100% silk scarf with hand-rolled edges',
    brand: 'Silk & Co',
    price: 89.99,
    compareAtPrice: 119.99,
    rating: 4.8,
    reviews: 76,
    stock: 32,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['scarf', 'silk', 'fashion', 'women'],
    attrs: {
      material: '100% Silk',
      dimensions: '90cm x 90cm',
      color: 'Floral Print',
      care: 'Dry clean only'
    },
    createdAt: '2023-02-18T14:10:00Z',
    updatedAt: '2023-02-18T14:10:00Z'
  },
  {
    id: 'a9',
    category: 'accessories',
    title: 'Stainless Steel Watch',
    description: 'Minimalist stainless steel watch with leather strap',
    brand: 'TimeCraft',
    price: 159.99,
    compareAtPrice: 199.99,
    rating: 4.9,
    reviews: 184,
    stock: 22,
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['watch', 'timepiece', 'minimalist', 'unisex'],
    attrs: {
      material: 'Stainless Steel & Leather',
      movement: 'Japanese Quartz',
      waterResistance: '5 ATM',
      caseDiameter: '40mm'
    },
    createdAt: '2023-02-08T11:30:00Z',
    updatedAt: '2023-02-08T11:30:00Z'
  },
  {
    id: 'a10',
    category: 'accessories',
    title: 'Cashmere Beanie',
    description: 'Luxury cashmere beanie for cold weather',
    brand: 'WinterLux',
    price: 79.99,
    compareAtPrice: 99.99,
    rating: 4.6,
    reviews: 132,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['hat', 'beanie', 'winter', 'cashmere'],
    attrs: {
      material: '100% Cashmere',
      style: 'Slouchy',
      color: 'Charcoal',
      oneSize: 'Fits most'
    },
    createdAt: '2023-01-28T09:20:00Z',
    updatedAt: '2023-01-28T09:20:00Z'
  },
  {
    id: 'a11',
    category: 'accessories',
    title: 'Leather Belt',
    description: 'Genuine leather belt with stainless steel buckle',
    brand: 'LeatherCraft',
    price: 59.99,
    compareAtPrice: 79.99,
    rating: 4.5,
    reviews: 167,
    stock: 38,
    image: 'https://images.unsplash.com/photo-1591561954555-607968c989ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1591561954555-607968c989ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['belt', 'leather', 'men', 'fashion'],
    attrs: {
      material: 'Genuine Leather',
      buckle: 'Stainless Steel',
      color: 'Brown',
      sizes: '30-40 inches'
    },
    createdAt: '2023-02-12T15:40:00Z',
    updatedAt: '2023-02-12T15:40:00Z'
  },
  {
    id: 'a12',
    category: 'accessories',
    title: 'Aviator Sunglasses',
    description: 'Classic aviator sunglasses with mirrored lenses',
    brand: 'Ray-Ban',
    price: 149.99,
    compareAtPrice: 199.99,
    rating: 4.9,
    reviews: 298,
    stock: 28,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237ac008?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237ac008?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['sunglasses', 'aviator', 'eyewear', 'classic'],
    attrs: {
      frame: 'Metal',
      lens: 'Mirrored',
      color: 'Gold/Green',
      uvProtection: '100% UVA/UVB'
    },
    createdAt: '2023-02-20T10:15:00Z',
    updatedAt: '2023-02-20T10:15:00Z'
  }
];

const ACCESSORIES_ACCENT = "#D4AF37";

export default function Accessories() {
  const [searchParams] = useSearchParams();
  const [sortOption, setSortOption] = useState("featured");

  // Sort options configuration

  // Update document title
  useEffect(() => {
    document.title = "Accessories Collection | ABU Style Stories";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Discover our collection of elegant accessories to complete your look. From statement necklaces to delicate bracelets, find your perfect piece.'
      );
    }
  }, []);

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortOption(value);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', value);
    window.history.replaceState({}, '', `${window.location.pathname}?${newParams}`);
  };

  return (
    <Layout>
      <CategoryHero
        title="Finish Every Look."
        subtitle="Statement jewelry and everyday essentials — curated for your style."
        ctaLabel="Shop Accessories"
        accent={ACCESSORIES_ACCENT}
        imageSrc="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Accessories" },
          ]}
          className="mb-6"
        />

        <div className="w-full">
          {/* Sort bar */}
          <div className="flex items-center justify-end mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <Select value={sortOption} onValueChange={handleSortChange}>
                <SelectTrigger className="w-48">
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

            {/* Product grid */}
            <ProductGrid
              products={mockProducts}
              columnsDesktop={3}
              ratio="portrait"
              emptyStateTitle="No accessories found"
              emptyStateDescription="Try adjusting your search to find what you're looking for."
              categoryAccent={ACCESSORIES_ACCENT}
            />
          </div>
      </main>
    </Layout>
  );
}
