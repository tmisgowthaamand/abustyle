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
    id: 'c1',
    category: 'toys',
    title: 'Building Blocks Set - 120 Pieces',
    description: 'Colorful building blocks for creative construction play',
    brand: 'BlockMaster',
    price: 193,
    compareAtPrice: 3999,
    rating: 4.7,
    reviews: 215,
    stock: 75,
    image: "/images/Toys/1.jpg",
    images: [
      "/images/Toys/1.jpg",
      "/images/Toys/2.jpg",
      "/images/Toys/3.jpg"
    ],
    tags: ["building", "educational", "creative"],
    attrs: {
      ageRange: "3+",
      material: "Plastic",
      type: "Building Blocks"
    },
    createdAt: '2023-03-10T11:20:00Z',
    updatedAt: '2023-03-10T11:20:00Z'
  },
  {
    id: 'c2',
    category: 'toys',
    title: 'Teddy Bear',
    description: 'Soft and cuddly teddy bear perfect for children of all ages',
    brand: 'CuddleFriend',
    price: 599,
    compareAtPrice: 1299,
    rating: 4.9,
    reviews: 210,
    stock: 60,
    image: '/images/Toys/2.jpg',
    images: [
      '/images/Toys/2.jpg'
    ],
    tags: ['teddy bear', 'soft toy', 'plush'],
    attrs: {
      ageRange: '0+',
      material: 'Polyester',
      type: 'Stuffed Animal'
    },
    createdAt: '2023-03-08T14:30:00Z',
    updatedAt: '2023-03-08T14:30:00Z'
  },
  {
    id: 'c3',
    category: 'toys',
    title: 'Remote Control Car',
    description: 'High-speed remote control racing car with LED lights',
    brand: 'SpeedRacer',
    price: 1599,
    compareAtPrice: 6499,
    rating: 4.5,
    reviews: 189,
    stock: 45,
    image: "/images/Toys/3.jpg",
    images: [
      "/images/Toys/3.jpg"
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
    id: 'c4',
    category: 'toys',
    title: 'Science Experiment Kit',
    description: 'Educational science kit with 50+ experiments',
    brand: 'ScienceFun',
    price: 468,
    compareAtPrice: 4499,
    rating: 4.8,
    reviews: 156,
    stock: 38,
    image: "/images/Toys/4.jpg",
    images: [
      "/images/Toys/4.jpg"
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
    id: 'c5',
    category: 'toys',
    title: 'Dollhouse with Furniture',
    description: 'Three-story dollhouse with complete furniture set',
    brand: 'DreamHome',
    price: 2599,
    compareAtPrice: 11999,
    rating: 4.9,
    reviews: 245,
    stock: 28,
    image: "/images/Toys/5.jpg",
    images: [
      "/images/Toys/5.jpg"
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
    id: 'c6',
    category: 'toys',
    title: 'Jigsaw Puzzle - 1000 Pieces',
    description: 'Beautiful landscape jigsaw puzzle for family fun',
    brand: 'PuzzleMaster',
    price: 499,
    compareAtPrice: 2999,
    rating: 4.6,
    reviews: 178,
    stock: 65,
    image: "/images/Toys/6.jpg",
    images: [
      "/images/Toys/6.jpg"
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
    id: 'c7',
    category: 'toys',
    title: 'Art Set - 150 Pieces',
    description: 'Complete art set with crayons, markers, and paper',
    brand: 'ArtMaster',
    price: 298,
    compareAtPrice: 3999,
    rating: 4.7,
    reviews: 198,
    stock: 42,
    image: "/images/Toys/7.jpg",
    images: [
      "/images/Toys/7.jpg"
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
    id: 'c8',
    category: 'toys',
    title: 'Balance Bike for Toddlers',
    description: 'Safe and sturdy balance bike for learning to ride',
    brand: 'KidRide',
    price: 1119,
    compareAtPrice: 9999,
    rating: 4.8,
    reviews: 167,
    stock: 32,
    image: "/images/Toys/8.jpg",
    images: [
      "/images/Toys/8.jpg"
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
    id: 'c9',
    category: 'toys',
    title: 'Magnetic Tiles - 100 Pieces',
    description: 'Colorful magnetic building tiles for STEM learning',
    brand: 'MagniPlay',
    price: 2599,
    compareAtPrice: 7999,
    rating: 4.9,
    reviews: 312,
    stock: 48,
    image: "/images/Toys/9.jpg",
    images: [
      "/images/Toys/9.jpg"
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
    id: 'c10',
    category: 'toys',
    title: 'Doctor Play Set',
    description: 'Complete doctor kit with medical tools and accessories',
    brand: 'PlayDoctor',
    price: 349,
    compareAtPrice: 4299,
    rating: 4.7,
    reviews: 145,
    stock: 55,
    image: "/images/Toys/10.jpg",
    images: [
      "/images/Toys/10.jpg"
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
    id: 'c11',
    category: 'toys',
    title: 'Robot Dog',
    description: 'Interactive robot dog with voice commands and tricks',
    brand: 'RoboFriend',
    price: 980,
    compareAtPrice: 15999,
    rating: 4.6,
    reviews: 231,
    stock: 25,
    image: "/images/Toys/11.jpg",
    images: [
      "/images/Toys/11.jpg"
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
    id: 'c12',
    category: 'toys',
    title: 'Watercolor Paint Set',
    description: 'Professional watercolor set with brushes and paper',
    brand: 'ArtistPro',
    price: 1614,
    compareAtPrice: 2999,
    rating: 4.8,
    reviews: 187,
    stock: 62,
    image: "/images/Toys/12.jpg",
    images: [
      "/images/Toys/12.jpg"
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
    document.title = "Toys Collection | ABU Accessories";
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
              { label: "Toys" },
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
                emptyStateTitle="No toys found"
                emptyStateDescription="Try adjusting your search to find what you're looking for."
                categoryAccent={TOYS_ACCENT}
              />
            </div>
          </div>
      </main>
    </Layout>
  );
}
