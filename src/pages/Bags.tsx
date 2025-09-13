import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { CategoryHero } from "@/components/CategoryHero";
import { ProductGrid } from "@/components/ProductGrid";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import { Product } from '@/types/product';

// Mock data - replace with actual data fetching
const mockProducts: Product[] = [
  {
    id: "b1",
    category: 'bags',
    title: "Classic Leather Tote Bag",
    description: "Handcrafted genuine leather tote bag with spacious interior",
    brand: "LeatherCraft",
    price: 14999,
    compareAtPrice: 19999,
    rating: 4.7,
    reviews: 89,
    stock: 25,
    image: "/images/Bags/1.jpg",
    images: [
      "/images/Bags/1.jpg"
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
    price: 8999,
    compareAtPrice: 11999,
    rating: 4.5,
    reviews: 124,
    stock: 40,
    image: "/images/Bags/2.jpg",
    images: [
      "/images/Bags/2.jpg"
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
    price: 12999,
    compareAtPrice: 15999,
    rating: 4.8,
    reviews: 156,
    stock: 35,
    image: "/images/Bags/3.jpg",
    images: [
      "/images/Bags/3.jpg"
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
    price: 5999,
    compareAtPrice: 7999,
    rating: 4.6,
    reviews: 342,
    stock: 50,
    image: "/images/Bags/4.jpg",
    images: [
      "/images/Bags/4.jpg"
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
    price: 16999,
    compareAtPrice: 19999,
    rating: 4.9,
    reviews: 98,
    stock: 20,
    image: "/images/Bags/5.jpg",
    images: [
      "/images/Bags/5.jpg"
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
    price: 3499,
    compareAtPrice: 4499,
    rating: 4.4,
    reviews: 215,
    stock: 65,
    image: "/images/Bags/6.jpg",
    images: [
      "/images/Bags/6.jpg"
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
    id: "b12",
    category: 'bags',
    title: "Luxury Handbag",
    description: "Premium leather handbag with gold hardware",
    brand: "Luxe",
    price: 29999,
    compareAtPrice: 39999,
    rating: 4.9,
    reviews: 76,
    stock: 15,
    image: "/images/Bags/13.jpg",
    images: [
      "/images/Bags/13.jpg"
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
    id: "b7",
    category: 'bags',
    title: "Travel Duffel Bag",
    description: "Large capacity duffel bag for travel and sports",
    brand: "Wanderer",
    price: 7999,
    compareAtPrice: 9999,
    rating: 4.3,
    reviews: 167,
    stock: 30,
    image: "/images/Bags/7.jpg",
    images: [
      "/images/Bags/7.jpg"
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
    title: "Evening Clutch Bag",
    description: "Elegant clutch bag perfect for evening events",
    brand: "Glamour",
    price: 8999,
    compareAtPrice: 10999,
    rating: 4.6,
    reviews: 134,
    stock: 28,
    image: "/images/Bags/9.jpg",
    images: [
      "/images/Bags/9.jpg"
    ],
    tags: ["clutch", "evening", "dressy"],
    attrs: {
      material: "Vegan Leather",
      style: "Clutch",
      color: "Gold"
    },
    createdAt: '2023-02-22T09:40:00Z',
    updatedAt: '2023-02-22T09:40:00Z'
  },
  {
    id: "b11",
    category: 'bags',
    title: "Hiking Backpack",
    description: "Waterproof hiking backpack with multiple compartments",
    brand: "OutdoorPro",
    price: 11999,
    compareAtPrice: 14999,
    rating: 4.8,
    reviews: 243,
    stock: 22,
    image: "/images/Bags/10.jpg",
    images: [
      "/images/Bags/10.jpg"
    ],
    tags: ["mini", "backpack", "trendy"],
    attrs: {
      material: "Polyester",
      style: "Mini Backpack",
      color: "Pink"
    },
    createdAt: '2023-02-08T13:25:00Z',
    updatedAt: '2023-02-08T13:25:00Z'
  },
  {
    id: "b8",
    category: 'bags',
    title: "Gym Bag with Shoe Compartment",
    description: "Compact gym bag with separate shoe compartment",
    brand: "FitLife",
    price: 4499,
    compareAtPrice: 5999,
    rating: 4.5,
    reviews: 298,
    stock: 45,
    image: "/images/Bags/11.jpg",
    images: [
      "/images/Bags/11.jpg"
    ],
    tags: ["gym", "sports", "compartment"],
    attrs: {
      material: "Polyester",
      style: "Gym Bag",
      color: "Black"
    },
    createdAt: '2023-02-18T10:10:00Z',
    updatedAt: '2023-02-18T10:10:00Z'
  },
  {
    id: "b10",
    category: 'bags',
    title: "Canvas Messenger Bag",
    description: "Durable canvas messenger bag with laptop sleeve",
    brand: "Vintage Co",
    price: 6999,
    compareAtPrice: 8999,
    rating: 4.4,
    reviews: 187,
    stock: 38,
    image: "/images/Bags/12.jpg",
    images: [
      "/images/Bags/12.jpg"
    ],
    tags: ["messenger", "canvas", "laptop"],
    attrs: {
      material: "Canvas",
      style: "Messenger",
      color: "Khaki"
    },
    createdAt: '2023-02-08T13:25:00Z',
    updatedAt: '2023-02-08T13:25:00Z'
  }
];

const BAGS_ACCENT = "#8B4513";

export default function Bags() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortOption, setSortOption] = useState("featured");
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              { label: "Home", href: "/" },
              { label: "Bags" },
            ]}
          />
        </div>

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
            <div data-products-section>
              <ProductGrid
                products={mockProducts}
                columnsDesktop={3}
                ratio="square"
                emptyStateTitle="No bags found"
                emptyStateDescription="Try adjusting your search to find what you're looking for."
                categoryAccent={BAGS_ACCENT}
              />
            </div>
          </div>
      </main>
    </Layout>
  );
}
