import { Product } from "@/types/product";

export const accessoriesProducts: Product[] = [
  {
    id: 'a1',
    category: 'accessories',
    title: 'Classic Leather Watch',
    description: 'Elegant leather watch with stainless steel case',
    brand: 'TimeCraft',
    price: 12999,
    compareAtPrice: 15999,
    rating: 4.9,
    reviews: 215,
    stock: 25,
    tags: ['bestseller', 'luxury'],
    image: '/images/Accessories/1.jpg',
    images: [
      '/images/Accessories/1.jpg',
      '/images/Accessories/2.jpg',
      '/images/Accessories/3.jpg'
    ],
    attrs: {
      color: 'Brown',
      material: 'Genuine Leather',
      waterResistant: 'Yes',
      movement: 'Automatic'
    },
    createdAt: '2023-03-10T09:45:00Z',
    updatedAt: '2023-03-10T09:45:00Z'
  },
  {
    id: 'a2',
    category: 'accessories',
    title: 'Minimalist Silver Necklace',
    description: 'Delicate silver necklace with a minimalist design',
    brand: 'SilverLuxe',
    price: 89.99,
    compareAtPrice: 119.99,
    rating: 4.8,
    reviews: 187,
    stock: 32,
    tags: ['bestseller', 'minimalist'],
    image: '/images/Accessories/11.jpg',
    images: [
      '/images/Accessories/3.jpg',
      '/images/Accessories/5.jpg',
      '/images/Accessories/2.jpg'
    ],
    attrs: {
      material: 'Sterling Silver',
      chainLength: '45cm',
      claspType: 'Lobster',
      plating: 'Rhodium'
    },
    createdAt: '2023-03-15T11:20:00Z',
    updatedAt: '2023-03-15T11:20:00Z'
  },
  {
    id: 'a3',
    category: 'accessories',
    title: 'Leather Card Holder',
    description: 'Slim and elegant leather card holder',
    brand: 'UrbanLeather',
    price: 39.99,
    compareAtPrice: 49.99,
    rating: 4.7,
    reviews: 156,
    stock: 45,
    tags: ['bestseller'],
    image: '/images/Accessories/4.jpg',
    images: [
      '/images/Accessories/9.jpg',
      '/images/Accessories/7.jpg',
      '/images/Accessories/6.jpg'
    ],
    attrs: {
      color: 'Black',
      material: 'Genuine Leather',
      cardSlots: '4',
      pocketType: 'Slip Pocket'
    },
    createdAt: '2023-02-28T14:35:00Z',
    updatedAt: '2023-02-28T14:35:00Z'
  },
  {
    id: 'a4',
    category: 'accessories',
    title: 'Aviator Sunglasses',
    description: 'Classic aviator sunglasses with UV protection',
    brand: 'SunShield',
    price: 79.99,
    compareAtPrice: 99.99,
    rating: 4.9,
    reviews: 234,
    stock: 28,
    tags: ['bestseller', 'new'],
    image: '/images/Accessories/5.jpg',
    images: [
      '/images/Accessories/8.jpg',
      '/images/Accessories/11.jpg',
      '/images/Accessories/1.jpg'
    ],
    attrs: {
      color: 'Gold/Green',
      frameMaterial: 'Metal',
      lensMaterial: 'Polycarbonate',
      uvProtection: '100%',
      lensWidth: '55mm'
    },
    createdAt: '2023-03-05T10:15:00Z',
    updatedAt: '2023-03-05T10:15:00Z'
  },
  {
    id: 'a5',
    category: 'accessories',
    title: 'Silk Scarf - Floral Print',
    description: 'Luxurious silk scarf with floral pattern',
    brand: 'SilkElegance',
    price: 69.99,
    compareAtPrice: 89.99,
    rating: 4.7,
    reviews: 143,
    stock: 22,
    tags: ['luxury'],
    image: '/images/Accessories/12.jpg',
    images: [
      '/images/Accessories/10.jpg',
      '/images/Accessories/3.jpg',
      '/images/Accessories/6.jpg'
    ],
    attrs: {
      material: '100% Mulberry Silk',
      dimensions: '90x90cm',
      care: 'Dry Clean Only',
      origin: 'Italy'
    },
    createdAt: '2023-02-20T16:45:00Z',
    updatedAt: '2023-02-20T16:45:00Z'
  },
  {
    id: 'a6',
    category: 'accessories',
    title: 'Smart Fitness Tracker',
    description: 'Advanced fitness tracker with heart rate monitor',
    brand: 'FitTech',
    price: 129.99,
    compareAtPrice: 149.99,
    rating: 4.6,
    reviews: 198,
    stock: 35,
    tags: ['bestseller', 'smart'],
    image: '/images/Accessories/4.jpg',
    images: [
      '/images/Accessories/11.jpg',
      '/images/Accessories/12.jpg',
      '/images/Accessories/11.jpg'
    ],
    attrs: {
      color: 'Black',
      batteryLife: '7 days',
      waterResistance: '50m',
      features: 'Heart Rate, Sleep Tracking, Step Counter',
      compatibility: 'iOS & Android'
    },
    createdAt: '2023-03-12T13:25:00Z',
    updatedAt: '2023-03-12T13:25:00Z'
  },
  {
    id: 'a7',
    category: 'accessories',
    title: 'Leather Belt - Classic Brown',
    description: 'Genuine leather belt with metal buckle',
    brand: 'LeatherCraft',
    price: 49.99,
    compareAtPrice: 59.99,
    rating: 4.8,
    reviews: 176,
    stock: 40,
    tags: ['bestseller'],
    image: '/images/Accessories/7.jpg',
    images: [
      '/images/Accessories/2.jpg',
      '/images/Accessories/5.jpg',
      '/images/Accessories/11.jpg'
    ],
    attrs: {
      color: 'Brown',
      material: 'Genuine Leather',
      width: '3.8cm',
      size: '100-120cm',
      buckleMaterial: 'Brass'
    },
    createdAt: '2023-02-25T11:10:00Z',
    updatedAt: '2023-02-25T11:10:00Z'
  },
  {
    id: 'a8',
    category: 'accessories',
    title: 'Cashmere Beanie - Navy',
    description: 'Luxuriously soft cashmere beanie',
    brand: 'CashmereLux',
    price: 89.99,
    compareAtPrice: 109.99,
    rating: 4.9,
    reviews: 201,
    stock: 28,
    tags: ['luxury', 'winter'],
    image: '/images/Accessories/8.jpg',
    images: [
      '/images/Accessories/4.jpg',
      '/images/Accessories/4.jpg',
      '/images/Accessories/9.jpg'
    ],
    attrs: {
      color: 'Navy Blue',
      material: '100% Cashmere',
      care: 'Hand Wash Only',
      season: 'Winter',
      origin: 'Mongolia'
    },
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2023-01-15T10:30:00Z'
  },
  {
    id: 'a9',
    category: 'accessories',
    title: 'Minimalist Gold Hoop Earrings',
    description: 'Elegant gold hoop earrings for any occasion',
    brand: 'GoldEssence',
    price: 79.99,
    compareAtPrice: 99.99,
    rating: 4.8,
    reviews: 189,
    stock: 31,
    tags: ['bestseller', 'minimalist'],
    image: '/images/Accessories/3.jpg',
    images: [
      '/images/Accessories/7.jpg',
      '/images/Accessories/2.jpg',
      '/images/Accessories/2.jpg'
    ],
    attrs: {
      material: '14K Gold Plated',
      diameter: '2.5cm',
      thickness: '1.5mm',
      closure: 'Push Back',
      hypoallergenic: 'Yes'
    },
    createdAt: '2023-03-08T15:20:00Z',
    updatedAt: '2023-03-08T15:20:00Z'
  },
  {
    id: 'a10',
    category: 'accessories',
    title: 'Leather Passport Holder',
    description: 'Sleek leather passport holder with RFID protection',
    brand: 'TravelEssentials',
    price: 34.99,
    compareAtPrice: 44.99,
    rating: 4.7,
    reviews: 167,
    stock: 38,
    tags: ['travel'],
    image: '/images/Accessories/6.jpg',
    images: [
      '/images/Accessories/10.jpg',
      '/images/Accessories/8.jpg',
      '/images/Accessories/5.jpg'
    ],
    attrs: {
      color: 'Black',
      material: 'Genuine Leather',
      rfidProtection: 'Yes',
      cardSlots: '4',
      passportSize: 'Standard'
    },
    createdAt: '2023-02-18T12:40:00Z',
    updatedAt: '2023-02-18T12:40:00Z'
  },
  {
    id: 'a11',
    category: 'accessories',
    title: 'Pearl Stud Earrings',
    description: 'Classic pearl studs with sterling silver posts',
    brand: 'PearlElegance',
    price: 119.99,
    compareAtPrice: 149.99,
    rating: 4.9,
    reviews: 201,
    stock: 24,
    tags: ['luxury', 'classic'],
    image: '/images/Accessories/8.jpg',
    images: [
      '/images/Accessories/1.jpg',
      '/images/Accessories/12.jpg',
      '/images/Accessories/10.jpg'
    ],
    attrs: {
      pearlType: 'Freshwater',
      pearlSize: '8mm',
      setting: 'Sterling Silver',
      backType: 'Screw Back',
      hypoallergenic: 'Yes'
    },
    createdAt: '2023-01-28T14:15:00Z',
    updatedAt: '2023-01-28T14:15:00Z'
  },
  {
    id: 'a12',
    category: 'accessories',
    title: 'Leather Keychain - Monogram',
    description: 'Personalized leather keychain with monogram',
    brand: 'LeatherCraft',
    price: 24.99,
    compareAtPrice: 29.99,
    rating: 4.8,
    reviews: 213,
    stock: 50,
    tags: ['personalized'],
    image: '/images/Accessories/2.jpg',
    images: [
      '/images/Accessories/8.jpg',
      '/images/Accessories/1.jpg',
      '/images/Accessories/5.jpg'
    ],
    attrs: {
      material: 'Genuine Leather',
      color: 'Brown',
      personalization: 'Up to 3 Letters',
      keyringType: 'Split Ring'
    },
    createdAt: '2023-03-01T09:25:00Z',
    updatedAt: '2023-03-01T09:25:00Z'
  }
];
