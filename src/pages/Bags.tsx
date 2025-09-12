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
    id: "b1",
    category: 'bags',
    title: "Classic Leather Tote Bag",
    description: "Handcrafted genuine leather tote bag with spacious interior",
    brand: "LeatherCraft",
    price: 149.99,
    compareAtPrice: 199.99,
    rating: 4.7,
    reviews: 89,
    stock: 25,
    image: "/images/products/bags/1.png",
    images: [
      "/images/products/bags/1.png",
      "/images/products/bags/2.png",
      "/images/products/bags/3.png"
    ],
    tags: ["leather", "tote", "handbag"],
    attrs: {
      material: "Genuine Leather",
      style: "Tote",
      color: "Brown"
    },
    createdAt: '2023-02-10T08:15:00Z',
    updatedAt: '2023-02-10T08:15:00Z'
  },
  {
    id: "b2",
    category: 'bags',
    title: "Minimalist Backpack",
    description: "Sleek and functional backpack for everyday use",
    brand: "UrbanWear",
    price: 89.99,
    compareAtPrice: 119.99,
    rating: 4.5,
    reviews: 124,
    stock: 40,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    ],
    tags: ["backpack", "minimalist", "casual"],
    attrs: {
      material: "Nylon",
      style: "Backpack",
      color: "Black"
    },
    createdAt: '2023-02-15T10:20:00Z',
    updatedAt: '2023-02-15T10:20:00Z'
  },
  {
    id: "b3",
    category: 'bags',
    title: "Designer Crossbody Bag",
    description: "Elegant crossbody bag with adjustable strap",
    brand: "ChicStyle",
    price: 129.99,
    compareAtPrice: 159.99,
    rating: 4.8,
    reviews: 156,
    stock: 35,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    ],
    tags: ["crossbody", "designer", "fashion"],
    attrs: {
      material: "Saffiano Leather",
      style: "Crossbody",
      color: "Black"
    },
    createdAt: '2023-01-20T14:30:00Z',
    updatedAt: '2023-01-20T14:30:00Z'
  },
  {
    id: "b4",
    category: 'bags',
    title: "Laptop Backpack with USB Port",
    description: "Modern backpack with USB charging port and laptop compartment",
    brand: "TechGear",
    price: 59.99,
    compareAtPrice: 79.99,
    rating: 4.6,
    reviews: 342,
    stock: 50,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    ],
    tags: ["backpack", "laptop", "tech"],
    attrs: {
      material: "Polyester",
      style: "Backpack",
      color: "Gray"
    },
    createdAt: '2023-01-10T09:15:00Z',
    updatedAt: '2023-01-10T09:15:00Z'
  },
  {
    id: "b5",
    category: 'bags',
    title: "Leather Satchel Bag",
    description: "Vintage-style leather satchel with adjustable strap",
    brand: "Heritage",
    price: 169.99,
    compareAtPrice: 199.99,
    rating: 4.9,
    reviews: 98,
    stock: 20,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    ],
    tags: ["satchel", "leather", "vintage"],
    attrs: {
      material: "Full-grain Leather",
      style: "Satchel",
      color: "Cognac"
    },
    createdAt: '2023-02-05T11:45:00Z',
    updatedAt: '2023-02-05T11:45:00Z'
  },
  {
    id: "b6",
    category: 'bags',
    title: "Beach Tote Bag",
    description: "Spacious beach tote with zippered pocket",
    brand: "SunnyDays",
    price: 34.99,
    compareAtPrice: 44.99,
    rating: 4.4,
    reviews: 215,
    stock: 65,
    image: "https://images.unsplash.com/photo-1591561954555-607968c989ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1591561954555-607968c989ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    ],
    tags: ["beach", "tote", "summer"],
    attrs: {
      material: "Canvas",
      style: "Tote",
      color: "Navy Blue"
    },
    createdAt: '2023-01-15T13:20:00Z',
    updatedAt: '2023-01-15T13:20:00Z'
  },
  {
    id: "b7",
    category: 'bags',
    title: "Leather Crossbody Bag",
    description: "Slim and elegant crossbody bag with multiple compartments",
    brand: "Minimalist",
    price: 79.99,
    compareAtPrice: 99.99,
    rating: 4.7,
    reviews: 187,
    stock: 30,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    ],
    tags: ["crossbody", "leather", "minimalist"],
    attrs: {
      material: "Genuine Leather",
      style: "Crossbody",
      color: "Tan"
    },
    createdAt: '2023-02-18T10:10:00Z',
    updatedAt: '2023-02-18T10:10:00Z'
  },
  {
    id: "b8",
    category: 'bags',
    title: "Travel Duffel Bag",
    description: "Spacious duffel bag with shoe compartment",
    brand: "Voyager",
    price: 69.99,
    compareAtPrice: 89.99,
    rating: 4.5,
    reviews: 276,
    stock: 45,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    ],
    tags: ["duffel", "travel", "gym"],
    attrs: {
      material: "Polyester",
      style: "Duffel",
      color: "Black"
    },
    createdAt: '2023-01-25T16:30:00Z',
    updatedAt: '2023-01-25T16:30:00Z'
  },
  {
    id: "b9",
    category: 'bags',
    title: "Leather Clutch Purse",
    description: "Elegant evening clutch with detachable chain",
    brand: "EveningChic",
    price: 59.99,
    compareAtPrice: 79.99,
    rating: 4.6,
    reviews: 143,
    stock: 38,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    ],
    tags: ["clutch", "evening", "dressy"],
    attrs: {
      material: "Vegan Leather",
      style: "Clutch",
      color: "Gold"
    },
    createdAt: '2023-02-12T14:20:00Z',
    updatedAt: '2023-02-12T14:20:00Z'
  },
  {
    id: "b10",
    category: 'bags',
    title: "Canvas Tote Bag",
    description: "Eco-friendly canvas tote with reinforced handles",
    brand: "EcoChic",
    price: 24.99,
    compareAtPrice: 34.99,
    rating: 4.3,
    reviews: 312,
    stock: 75,
    image: "https://images.unsplash.com/photo-1591561954555-607968c989ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1591561954555-607968c989ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    ],
    tags: ["canvas", "tote", "eco-friendly"],
    attrs: {
      material: "Organic Cotton Canvas",
      style: "Tote",
      color: "Natural"
    },
    createdAt: '2023-01-08T11:15:00Z',
    updatedAt: '2023-01-08T11:15:00Z'
  },
  {
    id: "b11",
    category: 'bags',
    title: "Leather Backpack Purse",
    description: "Convertible backpack that transforms into a stylish purse",
    brand: "ConvertiBag",
    price: 129.99,
    compareAtPrice: 159.99,
    rating: 4.8,
    reviews: 201,
    stock: 28,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    ],
    tags: ["backpack", "convertible", "purse"],
    attrs: {
      material: "Genuine Leather",
      style: "Convertible Backpack/Purse",
      color: "Burgundy"
    },
    createdAt: '2023-02-22T09:40:00Z',
    updatedAt: '2023-02-22T09:40:00Z'
  },
  {
    id: "b12",
    category: 'bags',
    title: "Mini Backpack Purse",
    description: "Trendy mini backpack with adjustable straps",
    brand: "UrbanChic",
    price: 49.99,
    compareAtPrice: 69.99,
    rating: 4.7,
    reviews: 267,
    stock: 55,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    ],
    tags: ["mini", "backpack", "trendy"],
    attrs: {
      material: "Polyester",
      style: "Mini Backpack",
      color: "Pink"
    },
    createdAt: '2023-02-08T13:25:00Z',
    updatedAt: '2023-02-08T13:25:00Z'
  }
];

const BAGS_ACCENT = "#8B4513";

export default function Bags() {
  const [searchParams] = useSearchParams();
  const [sortOption, setSortOption] = useState("featured");

  // Sort options configuration

  // Update document title
  useEffect(() => {
    document.title = "Bags Collection | ABU Style Stories";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Discover our collection of high-quality bags. From classic leather totes to trendy backpacks, find the perfect bag for every occasion.'
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
        title="Carry With Confidence."
        subtitle="From crossbody to totes — timeless leather goods that last."
        ctaLabel="Shop Bags"
        accent={BAGS_ACCENT}
        imageSrc="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Bags" },
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
              emptyStateTitle="No bags found"
              emptyStateDescription="Try adjusting your search to find what you're looking for."
              categoryAccent={BAGS_ACCENT}
            />
          </div>
      </main>
    </Layout>
  );
}
