import { v4 as uuidv4 } from 'uuid';
import { Product, ProductCategory } from '@/types/product';

// Helper function to generate random date within the last year
const randomDate = () => {
  const now = new Date();
  const past = new Date(now);
  past.setFullYear(past.getFullYear() - 1);
  return new Date(past.getTime() + Math.random() * (now.getTime() - past.getTime())).toISOString();
};

// Common product tags
const COMMON_TAGS = {
  cosmetics: ['New', 'Bestseller', 'Vegan', 'Hypoallergenic', 'Dermatologist Tested'],
  toys: ['New', 'Bestseller', 'Educational', 'Eco-Friendly', 'Ages 3+'],
  accessories: ['New', 'Bestseller', 'Handmade', 'Limited Edition', 'Hypoallergenic'],
  bags: ['New', 'Bestseller', 'Handcrafted', 'Waterproof', 'Vegan Leather']
};

// Generate mock products
const generateProducts = (category: ProductCategory, count: number): Product[] => {
  const brands = {
    cosmetics: ['Maybelline', 'L\'Oréal', 'NYX', 'Fenty', 'e.l.f', 'MAC', 'NARS', 'Too Faced'],
    toys: ['LEGO', 'Mattel', 'Hasbro', 'Melissa & Doug', 'Fisher-Price', 'VTech', 'Playmobil', 'Barbie'],
    accessories: ['Pandora', 'Kendra Scott', 'Kate Spade', 'Tiffany & Co.', 'Swarovski', 'Alex and Ani', 'Kendra Scott', 'Gorjana'],
    bags: ['Fossil', 'Kate Spade', 'Michael Kors', 'Coach', 'Tory Burch', 'Marc Jacobs', 'Rebecca Minkoff', 'Longchamp']
  };

  const products: Product[] = [];
  
  for (let i = 1; i <= count; i++) {
    const price = Math.floor(Math.random() * 200) + 10; // $10-$210
    const hasSale = Math.random() > 0.7; // 30% chance of being on sale
    const compareAtPrice = hasSale ? Math.round(price * (1.2 + Math.random() * 0.3)) : undefined; // 20-50% more
    const stock = Math.random() > 0.1 ? Math.floor(Math.random() * 50) + 1 : 0; // 10% chance of being out of stock
    
    const product: Product = {
      id: uuidv4(),
      category,
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} Product ${i}`,
      description: `High-quality ${category} product that meets all your needs. This is a detailed description that highlights the key features and benefits.`,
      brand: brands[category][Math.floor(Math.random() * brands[category].length)],
      price,
      compareAtPrice,
      rating: Number((Math.random() * 2 + 3).toFixed(1)), // 3.0-5.0
      reviews: Math.floor(Math.random() * 1000),
      stock,
      image: `https://source.unsplash.com/random/400x500/?${category},${i}`,
      images: Array(3).fill(0).map((_, idx) => 
        `https://source.unsplash.com/random/800x1000/?${category},${i}-${idx+1}`
      ),
      tags: [
        ...(Math.random() > 0.7 ? [COMMON_TAGS[category][0]] : []), // 30% New
        ...(Math.random() > 0.7 ? [COMMON_TAGS[category][1]] : []), // 30% Bestseller
        ...(Math.random() > 0.7 ? [COMMON_TAGS[category][2]] : []), // 30% other tags
      ],
      attrs: {},
      createdAt: randomDate(),
      updatedAt: new Date().toISOString(),
    };

    // Add category-specific attributes
    if (category === 'cosmetics') {
      const types = ['Lipstick', 'Eyeshadow', 'Foundation', 'Mascara', 'Blush', 'Highlighter'];
      const shades = ['Nude', 'Red', 'Pink', 'Coral', 'Brown', 'Berry'];
      const finishes = ['Matte', 'Glossy', 'Satin', 'Shimmer'];
      
      product.attrs = {
        Type: types[Math.floor(Math.random() * types.length)],
        Shade: shades[Math.floor(Math.random() * shades.length)],
        Finish: finishes[Math.floor(Math.random() * finishes.length)],
        'Skin Type': 'All Skin Types',
        'Vegan': Math.random() > 0.5 ? 'Yes' : 'No'
      };
    } else if (category === 'toys') {
      const types = ['Building Blocks', 'Doll', 'Action Figure', 'Puzzle', 'Educational', 'Outdoor'];
      const ageGroups = ['0-2 years', '3-5 years', '6-8 years', '9+ years'];
      const materials = ['Plastic', 'Wood', 'Fabric', 'Metal'];
      
      product.attrs = {
        Type: types[Math.floor(Math.random() * types.length)],
        'Age Group': ageGroups[Math.floor(Math.random() * ageGroups.length)],
        Material: materials[Math.floor(Math.random() * materials.length)],
        'Battery Required': Math.random() > 0.7 ? 'Yes' : 'No',
        'Educational Value': Math.random() > 0.5 ? 'High' : 'Moderate'
      };
    } else if (category === 'accessories') {
      const types = ['Necklace', 'Earrings', 'Bracelet', 'Ring', 'Watch', 'Hair Accessory'];
      const materials = ['Gold', 'Silver', 'Stainless Steel', 'Leather', 'Fabric'];
      const styles = ['Minimalist', 'Statement', 'Vintage', 'Modern', 'Bohemian'];
      
      product.attrs = {
        Type: types[Math.floor(Math.random() * types.length)],
        Material: materials[Math.floor(Math.random() * materials.length)],
        Style: styles[Math.floor(Math.random() * styles.length)],
        'Adjustable': Math.random() > 0.5 ? 'Yes' : 'No',
        'Water Resistant': Math.random() > 0.7 ? 'Yes' : 'No'
      };
    } else if (category === 'bags') {
      const types = ['Tote', 'Crossbody', 'Backpack', 'Clutch', 'Satchel', 'Shoulder Bag'];
      const materials = ['Genuine Leather', 'Vegan Leather', 'Canvas', 'Nylon', 'Polyester'];
      const colors = ['Black', 'Brown', 'Beige', 'Navy', 'Red', 'Multi'];
      
      product.attrs = {
        Type: types[Math.floor(Math.random() * types.length)],
        Material: materials[Math.floor(Math.random() * materials.length)],
        Color: colors[Math.floor(Math.random() * colors.length)],
        'Closure Type': ['Zipper', 'Magnetic', 'Drawstring', 'Flap'][Math.floor(Math.random() * 4)],
        'Pockets': Math.floor(Math.random() * 5).toString()
      };
    }

    products.push(product);
  }

  return products;
};

// Generate 48 products (12 per category)
const allProducts = [
  ...generateProducts('cosmetics', 12),
  ...generateProducts('toys', 12),
  ...generateProducts('accessories', 12),
  ...generateProducts('bags', 12)
];

// Helper function to filter and sort products
export const filterAndSortProducts = (
  products: Product[], 
  params: {
    category?: ProductCategory;
    sort?: string;
    filters?: Record<string, string | string[] | number[]>;
  }
): Product[] => {
  let result = [...products];
  
  // Filter by category
  if (params.category) {
    result = result.filter(p => p.category === params.category);
  }
  
  // Apply other filters
  if (params.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      if (key === 'price' && Array.isArray(value) && value.length === 2) {
        const [min, max] = value as [number, number];
        result = result.filter(p => p.price >= min && p.price <= max);
      } else if (key === 'brand' && Array.isArray(value)) {
        result = result.filter(p => value.includes(p.brand || ''));
      } else if (key === 'inStock' && value === 'true') {
        result = result.filter(p => p.stock > 0);
      } else if (key === 'onSale' && value === 'true') {
        result = result.filter(p => p.compareAtPrice !== undefined);
      } else if (key in result[0]?.attrs || []) {
        result = result.filter(p => 
          Array.isArray(value) 
            ? value.includes(p.attrs?.[key] || '')
            : p.attrs?.[key] === value
        );
      }
    });
  }
  
  // Apply sorting
  if (params.sort) {
    switch (params.sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default: // 'featured' or default
        // Sort by featured (bestsellers first, then by rating)
        result.sort((a, b) => {
          const aIsBestseller = a.tags?.includes('Bestseller') ? 1 : 0;
          const bIsBestseller = b.tags?.includes('Bestseller') ? 1 : 0;
          if (aIsBestseller !== bIsBestseller) {
            return bIsBestseller - aIsBestseller;
          }
          return b.rating - a.rating;
        });
    }
  }
  
  return result;
};

export default allProducts;
