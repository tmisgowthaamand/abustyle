import { Product } from "@/types/product";

export const cosmeticsProducts: Product[] = [
  {
    id: 'c1',
    category: 'cosmetics',
    title: 'Matte Lipstick - Ruby Red',
    description: 'Long-lasting matte lipstick with intense color payoff',
    brand: 'Glamour Cosmetics',
    price: 2499,
    compareAtPrice: 2999,
    rating: 4.8,
    reviews: 124,
    stock: 45,
    tags: ['bestseller', 'new'],
    image: '/images/products/cosmetics/1.png',
    images: [
      '/images/products/cosmetics/1.png',
      '/images/products/cosmetics/2.png',
      '/images/products/cosmetics/3.png'
    ],
    attrs: {
      color: 'Ruby Red',
      weight: '3.5g',
      finish: 'Matte'
    },
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2023-01-15T10:30:00Z'
  },
  {
    id: 'c2',
    category: 'cosmetics',
    title: 'Hydrating Foundation - Beige',
    description: 'Lightweight foundation with hyaluronic acid for 24h hydration',
    brand: 'Luminous Beauty',
    price: 3999,
    compareAtPrice: 3999,
    rating: 4.7,
    reviews: 89,
    stock: 32,
    tags: ['bestseller'],
    image: 'https://images.unsplash.com/photo-1571781926295-d1de334ffd3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    images: [
      'https://images.unsplash.com/photo-1571781926295-d1de334ffd3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1571781926295-d1de334ffd3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1571781926295-d1de334ffd3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    attrs: {
      color: 'Beige',
      volume: '30ml',
      coverage: 'Medium',
      skinType: 'All'
    },
    createdAt: '2023-02-10T14:20:00Z',
    updatedAt: '2023-02-10T14:20:00Z'
  },
  {
    id: 'c3',
    category: 'cosmetics',
    title: 'Volume Mascara - Black',
    description: 'Lengthening and volumizing mascara for dramatic lashes',
    brand: 'Lash Queen',
    price: 1999,
    compareAtPrice: 2499,
    rating: 4.6,
    reviews: 215,
    stock: 67,
    tags: ['bestseller'],
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    attrs: {
      color: 'Black',
      volume: '10ml',
      waterResistant: 'Yes'
    },
    createdAt: '2023-01-25T09:15:00Z',
    updatedAt: '2023-01-25T09:15:00Z'
  },
  {
    id: 'c4',
    category: 'cosmetics',
    title: 'Eyeshadow Palette - Nude',
    description: '12 highly pigmented nude shades for day to night looks',
    brand: 'Elegance',
    price: 4299,
    compareAtPrice: 4999,
    rating: 4.9,
    reviews: 178,
    stock: 28,
    tags: ['new'],
    image: 'https://images.unsplash.com/photo-1533050487297-8874e4161348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    images: [
      'https://images.unsplash.com/photo-1533050487297-8874e4161348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1533050487297-8874e4161348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1533050487297-8874e4161348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    attrs: {
      shades: '12',
      finish: 'Matte & Shimmer',
      weight: '15g'
    },
    createdAt: '2023-03-05T11:45:00Z',
    updatedAt: '2023-03-05T11:45:00Z'
  },
  {
    id: 'c5',
    category: 'cosmetics',
    title: 'Hydrating Face Primer',
    description: 'Smoothing primer that preps skin for flawless makeup application',
    brand: 'Pure Skin',
    price: 2999,
    compareAtPrice: 3499,
    rating: 4.5,
    reviews: 93,
    stock: 41,
    tags: [],
    image: 'https://images.unsplash.com/photo-1611758228041-0b9d38a6a29a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    images: [
      'https://images.unsplash.com/photo-1611758228041-0b9d38a6a29a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1611758228041-0b9d38a6a29a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1611758228041-0b9d38a6a29a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    attrs: {
      volume: '30ml',
      skinType: 'Dry/Combination',
      keyIngredient: 'Hyaluronic Acid'
    },
    createdAt: '2023-02-20T13:10:00Z',
    updatedAt: '2023-02-20T13:10:00Z'
  },
  {
    id: 'c6',
    category: 'cosmetics',
    title: 'Matte Liquid Lipstick - Nude',
    description: 'Long-wearing liquid lipstick with a comfortable matte finish',
    brand: 'Glamour Cosmetics',
    price: 2299,
    compareAtPrice: 2799,
    rating: 4.4,
    reviews: 156,
    stock: 38,
    tags: ['bestseller'],
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    attrs: {
      color: 'Nude',
      weight: '3.2g',
      finish: 'Matte',
      longLasting: '8 hours'
    },
    createdAt: '2023-01-18T16:25:00Z',
    updatedAt: '2023-01-18T16:25:00Z'
  },
  {
    id: 'c7',
    category: 'cosmetics',
    title: 'Illuminating Highlighter - Champagne',
    description: 'Radiant highlighter for a natural glow',
    brand: 'Luminous Beauty',
    price: 2799,
    compareAtPrice: 3299,
    rating: 4.8,
    reviews: 201,
    stock: 29,
    tags: ['bestseller'],
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    attrs: {
      color: 'Champagne',
      weight: '8g',
      finish: 'Shimmer',
      skinTone: 'Fair to Medium'
    },
    createdAt: '2023-02-28T10:15:00Z',
    updatedAt: '2023-02-28T10:15:00Z'
  },
  {
    id: 'c8',
    category: 'cosmetics',
    title: 'Precision Eyeliner - Black',
    description: 'Ultra-fine tip eyeliner for precise application',
    brand: 'Lash Queen',
    price: 1899,
    compareAtPrice: 2299,
    rating: 4.7,
    reviews: 187,
    stock: 53,
    tags: [],
    image: 'https://images.unsplash.com/photo-1625772459861-97d41a5ec241?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    images: [
      'https://images.unsplash.com/photo-1625772459861-97d41a5ec241?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1625772459861-97d41a5ec241?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1625772459861-97d41a5ec241?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    attrs: {
      color: 'Black',
      type: 'Liquid',
      tipSize: '0.01mm',
      waterResistant: 'Yes'
    },
    createdAt: '2023-01-10T14:40:00Z',
    updatedAt: '2023-01-10T14:40:00Z'
  },
  {
    id: 'c9',
    category: 'cosmetics',
    title: 'Brow Definer - Medium Brown',
    description: 'Precision brow pencil with spoolie brush',
    brand: 'Brow Magic',
    price: 21.99,
    compareAtPrice: 25.99,
    rating: 4.6,
    reviews: 142,
    stock: 47,
    tags: ['bestseller'],
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    attrs: {
      color: 'Medium Brown',
      type: 'Pencil',
      spoolieIncluded: 'Yes',
      waterResistant: 'Yes'
    },
    createdAt: '2023-02-15T11:20:00Z',
    updatedAt: '2023-02-15T11:20:00Z'
  },
  {
    id: 'c10',
    category: 'cosmetics',
    title: 'Blush Duo - Rose Gold',
    description: 'Two-in-one blush and highlighter for a natural glow',
    brand: 'Elegance',
    price: 26.99,
    compareAtPrice: 31.99,
    rating: 4.5,
    reviews: 98,
    stock: 36,
    tags: ['new'],
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    attrs: {
      color: 'Rose Gold',
      weight: '8g',
      finish: 'Satin',
      skinTone: 'Light to Medium'
    },
    createdAt: '2023-03-10T15:30:00Z',
    updatedAt: '2023-03-10T15:30:00Z'
  },
  {
    id: 'c11',
    category: 'cosmetics',
    title: 'Makeup Setting Spray',
    description: 'Long-lasting setting spray to keep makeup in place',
    brand: 'Pure Skin',
    price: 23.99,
    compareAtPrice: 28.99,
    rating: 4.7,
    reviews: 167,
    stock: 52,
    tags: ['bestseller'],
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    attrs: {
      volume: '100ml',
      skinType: 'All',
      longLasting: '16 hours',
      finish: 'Natural'
    },
    createdAt: '2023-02-05T10:15:00Z',
    updatedAt: '2023-02-05T10:15:00Z'
  },
  {
    id: 'c12',
    category: 'cosmetics',
    title: 'Lip Gloss Set - Nude Collection',
    description: 'Set of 3 hydrating nude lip glosses',
    brand: 'Glamour Cosmetics',
    price: 3299,
    compareAtPrice: 3999,
    rating: 4.8,
    reviews: 134,
    stock: 24,
    tags: ['new', 'bestseller'],
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    attrs: {
      colors: '3',
      finish: 'Glossy',
      weight: '9g total',
      keyIngredient: 'Vitamin E'
    },
    createdAt: '2023-03-15T09:45:00Z',
    updatedAt: '2023-03-15T09:45:00Z'
  }
];
