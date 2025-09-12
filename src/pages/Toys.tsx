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
    id: "t1",
    category: 'toys',
    title: "Building Blocks Set - 120 Pieces",
    description: "Colorful building blocks for creative play and learning",
    brand: "BlockMasters",
    price: 29.99,
    compareAtPrice: 39.99,
    rating: 4.7,
    reviews: 215,
    stock: 75,
    image: "/images/products/toys/1.png",
    images: [
      "/images/products/toys/1.png",
      "/images/products/toys/2.png",
      "/images/products/toys/3.png"
    ],
    tags: ["building", "educational", "creative"],
    attrs: {
      ageRange: "3+",
      material: "Plastic",
      type: "Building Blocks"
    },
    createdAt: '2023-03-05T09:45:00Z',
    updatedAt: '2023-03-05T09:45:00Z'
  },
  {
    id: "t2",
    category: 'toys',
    title: "Plush Teddy Bear",
    description: "Soft and cuddly teddy bear for children of all ages",
    brand: "CuddleBuddies",
    price: 24.99,
    compareAtPrice: 34.99,
    rating: 4.9,
    reviews: 210,
    stock: 60,
    image: "https://images.unsplash.com/photo-1589870465309-875f8eeb10c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1589870465309-875f8eeb10c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    ],
    tags: ["plush", "teddy", "stuffed"],
    attrs: {
      ageRange: "0+",
      material: "Polyester",
      type: "Stuffed Animal"
    },
    createdAt: '2023-03-10T11:20:00Z',
    updatedAt: '2023-03-10T11:20:00Z'
  },
  {
    id: "t3",
    category: 'toys',
    title: "Remote Control Car",
    description: "Fast and durable RC car with 2.4GHz remote control",
    brand: "SpeedRacers",
    price: 49.99,
    compareAtPrice: 64.99,
    rating: 4.5,
    reviews: 189,
    stock: 45,
    image: "https://images.unsplash.com/photo-1556327908-6a7f3a2f5f8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1556327908-6a7f3a2f5f8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    ],
    tags: ["rc", "remote control", "vehicle"],
    attrs: {
      ageRange: "6+",
      material: "Plastic/Metal",
      type: "Remote Control"
    },
    createdAt: '2023-02-15T14:30:00Z',
    updatedAt: '2023-02-15T14:30:00Z'
  },
  {
    id: "t4",
    category: 'toys',
    title: "Science Experiment Kit",
    description: "Educational science kit with 50+ experiments",
    brand: "Young Scientists",
    price: 34.99,
    compareAtPrice: 44.99,
    rating: 4.8,
    reviews: 156,
    stock: 38,
    image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    ],
    tags: ["educational", "science", "learning"],
    attrs: {
      ageRange: "8+",
      material: "Plastic/Glass",
      type: "Educational"
    },
    createdAt: '2023-01-20T10:15:00Z',
    updatedAt: '2023-01-20T10:15:00Z'
  },
  {
    id: "t5",
    category: 'toys',
    title: "Dollhouse with Furniture",
    description: "Beautiful wooden dollhouse with complete furniture set",
    brand: "DreamHomes",
    price: 89.99,
    compareAtPrice: 119.99,
    rating: 4.9,
    reviews: 245,
    stock: 28,
    image: "https://images.unsplash.com/photo-1594788003826-0475a6f5a5e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1594788003826-0475a6f5a5e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    ],
    tags: ["dollhouse", "pretend play", "wooden"],
    attrs: {
      ageRange: "3+",
      material: "Wood",
      type: "Dollhouse"
    },
    createdAt: '2023-02-28T13:45:00Z',
    updatedAt: '2023-02-28T13:45:00Z'
  },
  {
    id: "t6",
    category: 'toys',
    title: "Jigsaw Puzzle - 1000 Pieces",
    description: "Challenging jigsaw puzzle with beautiful landscape image",
    brand: "PuzzleMasters",
    price: 19.99,
    compareAtPrice: 29.99,
    rating: 4.6,
    reviews: 178,
    stock: 65,
    image: "https://images.unsplash.com/photo-1590000216662-9e8f8c6d2e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1590000216662-9e8f8c6d2e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    ],
    tags: ["puzzle", "family", "challenging"],
    attrs: {
      ageRange: "10+",
      material: "Cardboard",
      type: "Puzzle"
    },
    createdAt: '2023-03-12T09:20:00Z',
    updatedAt: '2023-03-12T09:20:00Z'
  },
  {
    id: "t7",
    category: 'toys',
    title: "Art Set - 150 Pieces",
    description: "Complete art set with various coloring and drawing tools",
    brand: "ArtisticKids",
    price: 27.99,
    compareAtPrice: 39.99,
    rating: 4.7,
    reviews: 198,
    stock: 42,
    image: "https://images.unsplash.com/photo-1578923896409-9ac2a3d06960?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1578923896409-9ac2a3d06960?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    ],
    tags: ["art", "drawing", "creative"],
    attrs: {
      ageRange: "5+",
      material: "Various",
      type: "Art Supplies"
    },
    createdAt: '2023-03-01T11:10:00Z',
    updatedAt: '2023-03-01T11:10:00Z'
  },
  {
    id: "t8",
    category: 'toys',
    title: "Balance Bike for Toddlers",
    description: "Wooden balance bike for learning to ride",
    brand: "FirstRide",
    price: 79.99,
    compareAtPrice: 99.99,
    rating: 4.8,
    reviews: 167,
    stock: 32,
    image: "https://images.unsplash.com/photo-1588987177403-9f6d2d5a5e5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1588987177403-9f6d2d5a5e5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    ],
    tags: ["outdoor", "bike", "toddler"],
    attrs: {
      ageRange: "2-5",
      material: "Wood/Metal",
      type: "Ride-on Toy"
    },
    createdAt: '2023-02-10T15:30:00Z',
    updatedAt: '2023-02-10T15:30:00Z'
  },
  {
    id: "t9",
    category: 'toys',
    title: "Magnetic Tiles - 100 Pieces",
    description: "Colorful magnetic building tiles for creative construction",
    brand: "MagBlocks",
    price: 59.99,
    compareAtPrice: 79.99,
    rating: 4.9,
    reviews: 312,
    stock: 48,
    image: "https://images.unsplash.com/photo-1600265372359-1a8f9a2b3d0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1600265372359-1a8f9a2b3d0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    ],
    tags: ["magnetic", "building", "educational"],
    attrs: {
      ageRange: "3+",
      material: "Plastic/Magnets",
      type: "Building Set"
    },
    createdAt: '2023-01-15T10:20:00Z',
    updatedAt: '2023-01-15T10:20:00Z'
  },
  {
    id: "t10",
    category: 'toys',
    title: "Doctor Play Set",
    description: "Complete doctor role play set with medical tools",
    brand: "Pretend & Play",
    price: 32.99,
    compareAtPrice: 42.99,
    rating: 4.7,
    reviews: 145,
    stock: 55,
    image: "https://images.unsplash.com/photo-1590000000000-5e8b9bea1b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1590000000000-5e8b9bea1b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    ],
    tags: ["pretend play", "doctor", "role play"],
    attrs: {
      ageRange: "3+",
      material: "Plastic/Fabric",
      type: "Pretend Play"
    },
    createdAt: '2023-02-05T14:15:00Z',
    updatedAt: '2023-02-05T14:15:00Z'
  },
  {
    id: "t11",
    category: 'toys',
    title: "Robot Dog",
    description: "Interactive robotic dog with realistic movements and sounds",
    brand: "TechPets",
    price: 129.99,
    compareAtPrice: 159.99,
    rating: 4.6,
    reviews: 231,
    stock: 25,
    image: "https://images.unsplash.com/photo-1590000000000-1b5f5f8d6a8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1590000000000-1b5f5f8d6a8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    ],
    tags: ["robotic", "interactive", "electronic"],
    attrs: {
      ageRange: "5+",
      material: "Plastic/Electronics",
      type: "Electronic Pet"
    },
    createdAt: '2023-01-25T16:40:00Z',
    updatedAt: '2023-01-25T16:40:00Z'
  },
  {
    id: "t12",
    category: 'toys',
    title: "Watercolor Paint Set",
    description: "Complete watercolor painting set with 36 colors",
    brand: "ArtisticKids",
    price: 22.99,
    compareAtPrice: 29.99,
    rating: 4.8,
    reviews: 187,
    stock: 62,
    image: "https://images.unsplash.com/photo-1590000000000-1b5f5f8d6a8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1590000000000-1b5f5f8d6a8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    ],
    tags: ["art", "painting", "creative"],
    attrs: {
      ageRange: "4+",
      material: "Paint/Paper",
      type: "Art Supplies"
    },
    createdAt: '2023-02-20T11:25:00Z',
    updatedAt: '2023-02-20T11:25:00Z'
  }
];

const TOYS_ACCENT = "#3B82F6";

export default function Toys() {
  const [searchParams] = useSearchParams();
  const [sortOption, setSortOption] = useState("featured");

  // Sort options configuration

  // Update document title
  useEffect(() => {
    document.title = "Toys Collection | ABU Style Stories";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Discover our collection of fun and educational toys for kids of all ages. Safe, engaging, and designed to spark imagination.'
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
        title="Play Fuels Imagination."
        subtitle="Safe, colorful toys that spark creativity and joy for kids of all ages."
        ctaLabel="Shop Toys"
        accent={TOYS_ACCENT}
        imageSrc="https://images.unsplash.com/photo-1575881875475-31023242e3f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Toys" },
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
              ratio="square"
              emptyStateTitle="No toys found"
              emptyStateDescription="Try adjusting your search to find what you're looking for."
              categoryAccent={TOYS_ACCENT}
            />
          </div>
      </main>
    </Layout>
  );
}
