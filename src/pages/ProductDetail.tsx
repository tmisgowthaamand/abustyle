import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, ShoppingCart, Star, Plus, Minus } from 'lucide-react';
import { useCartContext } from '@/providers/CartProvider';
import { toast } from 'sonner';

// Mock product data - in a real app, this would come from an API
const getProductData = (category: string, id: string) => {
  const products: Record<string, any> = {
    cosmetics: {
      "1": {
        id: "1",
        title: "Premium Rose Lipstick Set",
        price: 509,
        compareAtPrice: 3499,
        category: "cosmetics",
        image: "/images/Home/1.jpg",
        images: ["/images/Home/1.jpg"],
        rating: 4.8,
        reviews: 124,
        description: "Premium collection of rose-toned lipsticks with long-lasting matte finish",
        features: ["Set of 3 lipsticks", "Matte finish", "Rose tones", "Long-lasting formula"],
        inStock: true,
        stock: 25
      },
      "c1": {
        id: "c1",
        title: "Matte Lipstick - Ruby Red",
        price: 90,
        compareAtPrice: 2999,
        category: "cosmetics",
        image: "/images/Cosmetics/1.jpg",
        images: ["/images/Cosmetics/1.jpg"],
        rating: 4.8,
        reviews: 156,
        description: "Long-lasting matte lipstick with intense color payoff",
        features: ["Matte finish", "Ruby Red color", "3.5g weight", "All skin types"],
        inStock: true,
        stock: 45
      },
      "c2": {
        id: "c2",
        title: "Hydrating Foundation - Natural Beige",
        price: 350,
        compareAtPrice: 3999,
        category: "cosmetics",
        image: "/images/Cosmetics/2.jpg",
        images: ["/images/Cosmetics/2.jpg"],
        rating: 4.7,
        reviews: 289,
        description: "Lightweight foundation with hyaluronic acid for 24-hour hydration",
        features: ["Medium coverage", "Natural finish", "SPF 25", "30ml volume"],
        inStock: true,
        stock: 32
      },
      "c4": {
        id: "c4",
        title: "Volume Mascara - Black",
        price: 4100,
        compareAtPrice: 2499,
        category: "cosmetics",
        image: "/images/Cosmetics/4.jpg",
        images: ["/images/Cosmetics/4.jpg"],
        rating: 4.6,
        reviews: 421,
        description: "Lengthening and volumizing mascara for dramatic lashes",
        features: ["Volume & Length effect", "Black color", "10ml volume", "Non-waterproof"],
        inStock: true,
        stock: 65
      },
      "c3": {
        id: "c3",
        title: "Eyeshadow Palette - Nude Tones",
        price: 799,
        compareAtPrice: 4999,
        category: "cosmetics",
        image: "/images/Cosmetics/3.jpg",
        images: ["/images/Cosmetics/3.jpg"],
        rating: 4.8,
        reviews: 156,
        description: "12 highly pigmented nude shades for versatile day to night looks with matte and shimmer finishes",
        features: ["12 nude eyeshadow shades", "Matte & shimmer finishes", "Highly pigmented formula", "Long-lasting wear"],
        inStock: true,
        stock: 28
      },
      "c5": {
        id: "c5",
        title: "Blush Duo - Rose Gold",
        price: 1540,
        compareAtPrice: 3499,
        category: "cosmetics",
        image: "/images/Cosmetics/5.jpg",
        images: ["/images/Cosmetics/5.jpg"],
        rating: 4.5,
        reviews: 187,
        description: "Dual-toned blush for a natural, radiant glow",
        features: ["Satin finish", "Rose Gold color", "8g weight", "Light to Medium skin tone"],
        inStock: true,
        stock: 38
      },
      "c6": {
        id: "c6",
        title: "Brow Pencil - Medium Brown",
        price: 65,
        compareAtPrice: 2499,
        category: "cosmetics",
        image: "/images/Cosmetics/6.jpg",
        images: ["/images/Cosmetics/6.jpg"],
        rating: 4.8,
        reviews: 312,
        description: "Precision eyebrow pencil with spoolie brush",
        features: ["Medium Brown color", "Mechanical pencil", "Fine point tip", "Includes spoolie brush"],
        inStock: true,
        stock: 52
      },
      "c7": {
        id: "c7",
        title: "Liquid Eyeliner - Black",
        price: 59,
        compareAtPrice: 2699,
        category: "cosmetics",
        image: "/images/Cosmetics/7.jpg",
        images: ["/images/Cosmetics/7.jpg"],
        rating: 4.7,
        reviews: 276,
        description: "Precision liquid eyeliner with brush tip for sharp lines",
        features: ["Black color", "Brush tip", "Waterproof formula", "3ml volume"],
        inStock: true,
        stock: 41
      },
      "c8": {
        id: "c8",
        title: "Makeup Setting Spray",
        price: 219,
        compareAtPrice: 3499,
        category: "cosmetics",
        image: "/images/Cosmetics/8.jpg",
        images: ["/images/Cosmetics/8.jpg"],
        rating: 4.9,
        reviews: 198,
        description: "Long-lasting setting spray for 16-hour makeup wear",
        features: ["Natural finish", "100ml size", "All skin types", "Up to 16 hours duration"],
        inStock: true,
        stock: 36
      },
      "c9": {
        id: "c9",
        title: "Concealer - Light Medium",
        price: 499,
        compareAtPrice: 3199,
        category: "cosmetics",
        image: "/images/Cosmetics/9.jpg",
        images: ["/images/Cosmetics/9.jpg"],
        rating: 4.7,
        reviews: 243,
        description: "Full coverage concealer with hydrating formula",
        features: ["Full coverage", "Natural finish", "Light Medium shade", "8ml volume"],
        inStock: true,
        stock: 29
      },
      "c10": {
        id: "c10",
        title: "Lip Gloss - Clear Shimmer",
        price: 167,
        compareAtPrice: 1999,
        category: "cosmetics",
        image: "/images/Cosmetics/10.jpg",
        images: ["/images/Cosmetics/10.jpg"],
        rating: 4.4,
        reviews: 167,
        description: "Non-sticky lip gloss with subtle shimmer",
        features: ["Glossy finish", "Clear with shimmer", "5ml weight", "Vanilla fragrance"],
        inStock: true,
        stock: 58
      },
      "c11": {
        id: "c11",
        title: "Highlighter Palette",
        price: 1529,
        compareAtPrice: 4999,
        category: "cosmetics",
        image: "/images/Cosmetics/11.jpg",
        images: ["/images/Cosmetics/11.jpg"],
        rating: 4.9,
        reviews: 198,
        description: "Four stunning highlighters for a radiant glow",
        features: ["Metallic finish", "4 shades", "12g weight", "Universal skin tone"],
        inStock: true,
        stock: 24
      },
      "c12": {
        id: "c12",
        title: "Makeup Brush Set",
        price: 1899,
        compareAtPrice: 7999,
        category: "cosmetics",
        image: "/images/Cosmetics/12.jpg",
        images: ["/images/Cosmetics/12.jpg"],
        rating: 4.8,
        reviews: 178,
        description: "Complete 12-piece vegan brush set for flawless application",
        features: ["Synthetic bristles", "12 pieces", "Includes travel case", "Cruelty-free"],
        inStock: true,
        stock: 31
      }
    },
    toys: {
      "2": {
        id: "2",
        title: "Educational Building Blocks",
        price: 150,
        compareAtPrice: 2599,
        category: "toys",
        image: "/images/Home/2.jpg",
        images: ["/images/Home/2.jpg"],
        rating: 4.7,
        reviews: 89,
        description: "Educational building blocks set for creative learning and development",
        features: ["120 pieces", "Educational", "Safe materials", "Age 3+"],
        inStock: true,
        stock: 40
      },
      "5": {
        id: "5",
        title: "Premium Plush Teddy Bear",
        price: 599,
        compareAtPrice: 2999,
        category: "toys",
        image: "/images/Toys/2.jpg",
        images: ["/images/Toys/2.jpg"],
        rating: 4.6,
        reviews: 78,
        description: "Soft and cuddly premium plush teddy bear made with high-quality materials",
        features: ["Premium plush", "Soft & cuddly", "Safe materials", "Machine washable"],
        inStock: true,
        stock: 35
      },
      "t1": {
        id: "t1",
        title: "Building Blocks Set - 120 Pieces",
        price: 2999,
        compareAtPrice: 3999,
        category: "toys",
        image: "/images/Toys/1.jpg",
        images: ["/images/Toys/1.jpg"],
        rating: 4.7,
        reviews: 215,
        description: "Colorful building blocks for creative play and learning",
        features: ["120 pieces", "Ages 3+", "Plastic material", "Educational"],
        inStock: true,
        stock: 75
      },
      "t2": {
        id: "t2",
        title: "Plush Teddy Bear",
        price: 2499,
        compareAtPrice: 3499,
        category: "toys",
        image: "/images/Toys/2.jpg",
        images: ["/images/Toys/2.jpg"],
        rating: 4.9,
        reviews: 210,
        description: "Soft and cuddly teddy bear for children of all ages",
        features: ["Ages 0+", "Polyester material", "Stuffed animal", "Machine washable"],
        inStock: true,
        stock: 60
      },
      "c2": {
        id: "c2",
        title: "Teddy Bear",
        price: 599,
        compareAtPrice: 1299,
        category: "toys",
        image: "/images/Toys/2.jpg",
        images: ["/images/Toys/2.jpg"],
        rating: 4.9,
        reviews: 210,
        description: "Soft and cuddly teddy bear perfect for children of all ages",
        features: ["Ages 0+", "Polyester material", "Stuffed animal", "Machine washable"],
        inStock: true,
        stock: 60
      },
      "t3": {
        id: "t3",
        title: "Remote Control Car",
        price: 1599,
        compareAtPrice: 6499,
        category: "toys",
        image: "/images/Toys/3.jpg",
        images: ["/images/Toys/3.jpg"],
        rating: 4.5,
        reviews: 189,
        description: "Fast and durable RC car with 2.4GHz remote control",
        features: ["2.4GHz remote", "Ages 6+", "Plastic/Metal", "High speed"],
        inStock: true,
        stock: 45
      },
      "t4": {
        id: "t4",
        title: "Science Experiment Kit",
        price: 468,
        compareAtPrice: 4499,
        category: "toys",
        image: "/images/Toys/4.jpg",
        images: ["/images/Toys/4.jpg"],
        rating: 4.8,
        reviews: 156,
        description: "Educational science kit with 50+ experiments",
        features: ["50+ experiments", "Ages 8+", "Educational", "Safety tested"],
        inStock: true,
        stock: 38
      },
      "t5": {
        id: "t5",
        title: "Dollhouse with Furniture",
        price: 2599,
        compareAtPrice: 11999,
        category: "toys",
        image: "/images/Toys/5.jpg",
        images: ["/images/Toys/5.jpg"],
        rating: 4.9,
        reviews: 245,
        description: "Beautiful wooden dollhouse with complete furniture set",
        features: ["Wooden construction", "Complete furniture", "Ages 3+", "Pretend play"],
        inStock: true,
        stock: 28
      },
      "t6": {
        id: "t6",
        title: "Jigsaw Puzzle - 1000 Pieces",
        price: 499,
        compareAtPrice: 2999,
        category: "toys",
        image: "/images/Toys/6.jpg",
        images: ["/images/Toys/6.jpg"],
        rating: 4.6,
        reviews: 178,
        description: "Challenging jigsaw puzzle with beautiful landscape image",
        features: ["1000 pieces", "Ages 10+", "Cardboard", "Family fun"],
        inStock: true,
        stock: 65
      },
      "t7": {
        id: "t7",
        title: "Art Set - 150 Pieces",
        price: 298,
        compareAtPrice: 3999,
        category: "toys",
        image: "/images/Toys/7.jpg",
        images: ["/images/Toys/7.jpg"],
        rating: 4.7,
        reviews: 198,
        description: "Complete art set with various coloring and drawing tools",
        features: ["150 pieces", "Ages 5+", "Art supplies", "Creative play"],
        inStock: true,
        stock: 42
      },
      "t8": {
        id: "t8",
        title: "Balance Bike for Toddlers",
        price: 1119,
        compareAtPrice: 9999,
        category: "toys",
        image: "/images/Toys/8.jpg",
        images: ["/images/Toys/8.jpg"],
        rating: 4.8,
        reviews: 167,
        description: "Wooden balance bike for learning to ride",
        features: ["Wooden frame", "Ages 2-5", "Balance training", "Outdoor toy"],
        inStock: true,
        stock: 32
      },
      "t9": {
        id: "t9",
        title: "Magnetic Tiles - 100 Pieces",
        price: 2599,
        compareAtPrice: 7999,
        category: "toys",
        image: "/images/Toys/9.jpg",
        images: ["/images/Toys/9.jpg"],
        rating: 4.9,
        reviews: 312,
        description: "Colorful magnetic building tiles for creative construction",
        features: ["100 pieces", "Magnetic", "Ages 3+", "STEM learning"],
        inStock: true,
        stock: 48
      },
      "t10": {
        id: "t10",
        title: "Doctor Play Set",
        price: 349,
        compareAtPrice: 4299,
        category: "toys",
        image: "/images/Toys/10.jpg",
        images: ["/images/Toys/10.jpg"],
        rating: 4.7,
        reviews: 145,
        description: "Complete doctor role play set with medical tools",
        features: ["Medical tools", "Ages 3+", "Role play", "Educational"],
        inStock: true,
        stock: 55
      },
      "t11": {
        id: "t11",
        title: "Robot Dog",
        price: 980,
        compareAtPrice: 15999,
        category: "toys",
        image: "/images/Toys/11.jpg",
        images: ["/images/Toys/11.jpg"],
        rating: 4.6,
        reviews: 231,
        description: "Interactive robotic dog with realistic movements and sounds",
        features: ["Interactive", "Electronic", "Ages 5+", "Realistic sounds"],
        inStock: true,
        stock: 25
      },
      "t12": {
        id: "t12",
        title: "Watercolor Paint Set",
        price: 1614,
        compareAtPrice: 2999,
        category: "toys",
        image: "/images/Toys/12.jpg",
        images: ["/images/Toys/12.jpg"],
        rating: 4.8,
        reviews: 187,
        description: "Complete watercolor painting set with 36 colors",
        features: ["36 colors", "Ages 4+", "Art supplies", "Creative expression"],
        inStock: true,
        stock: 62
      }
    },
    accessories: {
      "3": {
        id: "3",
        title: "Gold Plated Chain Necklace",
        price: 1800,
        compareAtPrice: 8499,
        category: "accessories",
        image: "/images/Accessories/2.jpg",
        images: ["/images/Accessories/2.jpg"],
        rating: 4.9,
        reviews: 156,
        description: "Elegant gold plated chain necklace with premium finish",
        features: ["Gold plated", "Chain style", "Premium finish", "Adjustable length"],
        inStock: true,
        stock: 20
      },
      "6": {
        id: "6",
        title: "Crystal Stud Earring Set",
        price: 899,
        compareAtPrice: 1999,
        category: "accessories",
        image: "/images/Home/3.jpg",
        images: ["/images/Home/3.jpg"],
        rating: 4.9,
        reviews: 142,
        description: "Elegant crystal stud earring set with sparkling cubic zirconia stones",
        features: ["High-quality crystals", "Premium finish", "Elegant design", "Gift box included"],
        inStock: true,
        stock: 15
      },
      "c1": {
        id: "c1",
        title: "Gold Hoop Earrings",
        price: 749,
        compareAtPrice: 5999,
        category: "accessories",
        image: "/images/Accessories/1.jpg",
        images: ["/images/Accessories/1.jpg"],
        rating: 4.5,
        reviews: 128,
        description: "Elegant 14K gold plated hoop earrings with secure latch closure",
        features: ["14K Gold Plated", "Hoop style", "2.5cm diameter", "Secure latch"],
        inStock: true,
        stock: 50
      },
      "c2": {
        id: "c2",
        title: "Minimalist Gold Necklace",
        price: 1800,
        compareAtPrice: 12999,
        category: "accessories",
        image: "/images/Accessories/2.jpg",
        images: ["/images/Accessories/2.jpg"],
        rating: 4.8,
        reviews: 142,
        description: "Simple and elegant 14K gold plated necklace with adjustable chain",
        features: ["14K Gold Plated", "Pendant style", "45cm + 5cm extender", "Adjustable"],
        inStock: true,
        stock: 30
      },
      "c3": {
        id: "c3",
        title: "Leather Crossbody Bag",
        price: 1289,
        compareAtPrice: 15999,
        category: "accessories",
        image: "/images/Accessories/3.jpg",
        images: ["/images/Accessories/3.jpg"],
        rating: 4.7,
        reviews: 89,
        description: "Genuine leather crossbody bag with adjustable strap",
        features: ["Genuine Leather", "Crossbody style", "20cm x 15cm x 8cm", "Brown color"],
        inStock: true,
        stock: 25
      },
      "c4": {
        id: "c4",
        title: "Silver Bangle Set",
        price: 154,
        compareAtPrice: 9999,
        category: "accessories",
        image: "/images/Accessories/4.jpg",
        images: ["/images/Accessories/4.jpg"],
        rating: 4.6,
        reviews: 112,
        description: "Set of three sterling silver bangles with different widths",
        features: ["925 Sterling Silver", "3 bangles set", "5mm, 8mm, 12mm widths", "Silver color"],
        inStock: true,
        stock: 40
      },
      "c5": {
        id: "c5",
        title: "Designer Sunglasses",
        price: 398,
        compareAtPrice: 17999,
        category: "accessories",
        image: "/images/Accessories/5.jpg",
        images: ["/images/Accessories/5.jpg"],
        rating: 4.9,
        reviews: 256,
        description: "UV protection sunglasses with polarized lenses",
        features: ["Acetate frame", "Polarized lenses", "100% UV400", "Black/Gradient"],
        inStock: true,
        stock: 35
      },
      "c6": {
        id: "c6",
        title: "Pearl Drop Earrings",
        price: 328,
        compareAtPrice: 12999,
        category: "accessories",
        image: "/images/Accessories/6.jpg",
        images: ["/images/Accessories/6.jpg"],
        rating: 4.7,
        reviews: 87,
        description: "Elegant freshwater pearl drop earrings with 14K gold accents",
        features: ["Freshwater Pearl", "14K Gold accents", "2.5cm drop", "White/Gold"],
        inStock: true,
        stock: 28
      },
      "c7": {
        id: "c7",
        title: "Leather Wallet with RFID",
        price: 799,
        compareAtPrice: 6999,
        category: "accessories",
        image: "/images/Accessories/7.jpg",
        images: ["/images/Accessories/7.jpg"],
        rating: 4.4,
        reviews: 203,
        description: "Genuine leather wallet with RFID blocking technology",
        features: ["Genuine Leather", "RFID Blocking", "8 card slots", "Brown color"],
        inStock: true,
        stock: 60
      },
      "c8": {
        id: "c8",
        title: "Silk Scarf",
        price: 399,
        compareAtPrice: 11999,
        category: "accessories",
        image: "/images/Accessories/8.jpg",
        images: ["/images/Accessories/8.jpg"],
        rating: 4.8,
        reviews: 76,
        description: "Luxury 100% silk scarf with hand-rolled edges",
        features: ["100% Silk", "90cm x 90cm", "Floral Print", "Dry clean only"],
        inStock: true,
        stock: 32
      },
      "c9": {
        id: "c9",
        title: "Stainless Steel Watch",
        price: 2227,
        compareAtPrice: 19999,
        category: "accessories",
        image: "/images/Accessories/9.jpg",
        images: ["/images/Accessories/9.jpg"],
        rating: 4.9,
        reviews: 184,
        description: "Minimalist stainless steel watch with leather strap",
        features: ["Stainless Steel & Leather", "Japanese Quartz", "5 ATM water resistance", "40mm case"],
        inStock: true,
        stock: 22
      },
      "c10": {
        id: "c10",
        title: "Cashmere Beanie",
        price: 599,
        compareAtPrice: 9999,
        category: "accessories",
        image: "/images/Accessories/10.jpg",
        images: ["/images/Accessories/10.jpg"],
        rating: 4.6,
        reviews: 132,
        description: "Luxury cashmere beanie for cold weather",
        features: ["100% Cashmere", "Slouchy style", "Charcoal color", "One size fits most"],
        inStock: true,
        stock: 45
      },
      "c11": {
        id: "c11",
        title: "Leather Belt",
        price: 985,
        compareAtPrice: 7999,
        category: "accessories",
        image: "/images/Accessories/11.jpg",
        images: ["/images/Accessories/11.jpg"],
        rating: 4.5,
        reviews: 167,
        description: "Genuine leather belt with stainless steel buckle",
        features: ["Genuine Leather", "Stainless Steel buckle", "Brown color", "30-40 inches"],
        inStock: true,
        stock: 38
      },
      "c12": {
        id: "c12",
        title: "Aviator Sunglasses",
        price: 449,
        compareAtPrice: 19999,
        category: "accessories",
        image: "/images/Accessories/12.jpg",
        images: ["/images/Accessories/12.jpg"],
        rating: 4.9,
        reviews: 298,
        description: "Classic aviator sunglasses with mirrored lenses",
        features: ["Metal frame", "Mirrored lenses", "100% UVA/UVB", "Gold/Green"],
        inStock: true,
        stock: 28
      },
      "a1": {
        id: "a1",
        title: "Gold Hoop Earrings",
        price: 4599,
        compareAtPrice: 5999,
        category: "accessories",
        image: "/images/Accessories/1.jpg",
        images: ["/images/Accessories/1.jpg"],
        rating: 4.5,
        reviews: 128,
        description: "Elegant 14K gold plated hoop earrings with secure latch closure",
        features: ["14K Gold Plated", "Hoop style", "2.5cm diameter", "Secure latch"],
        inStock: true,
        stock: 50
      },
      "a2": {
        id: "a2",
        title: "Minimalist Gold Necklace",
        price: 8999,
        compareAtPrice: 12999,
        category: "accessories",
        image: "/images/Accessories/2.jpg",
        images: ["/images/Accessories/2.jpg"],
        rating: 4.8,
        reviews: 142,
        description: "Simple and elegant 14K gold plated necklace with adjustable chain",
        features: ["14K Gold Plated", "Pendant style", "45cm + 5cm extender", "Adjustable"],
        inStock: true,
        stock: 30
      },
      "a3": {
        id: "a3",
        title: "Leather Crossbody Bag",
        price: 12999,
        compareAtPrice: 15999,
        category: "accessories",
        image: "/images/Accessories/3.jpg",
        images: ["/images/Accessories/3.jpg"],
        rating: 4.7,
        reviews: 89,
        description: "Genuine leather crossbody bag with adjustable strap",
        features: ["Genuine Leather", "Crossbody style", "20cm x 15cm x 8cm", "Brown color"],
        inStock: true,
        stock: 25
      },
      "a4": {
        id: "a4",
        title: "Silver Bangle Set",
        price: 7599,
        compareAtPrice: 9999,
        category: "accessories",
        image: "/images/Accessories/4.jpg",
        images: ["/images/Accessories/4.jpg"],
        rating: 4.6,
        reviews: 112,
        description: "Set of three sterling silver bangles with different widths",
        features: ["925 Sterling Silver", "3 bangles set", "5mm, 8mm, 12mm widths", "Silver color"],
        inStock: true,
        stock: 40
      },
      "a5": {
        id: "a5",
        title: "Designer Sunglasses",
        price: 12999,
        compareAtPrice: 17999,
        category: "accessories",
        image: "/images/Accessories/5.jpg",
        images: ["/images/Accessories/5.jpg"],
        rating: 4.9,
        reviews: 256,
        description: "UV protection sunglasses with polarized lenses",
        features: ["Acetate frame", "Polarized lenses", "100% UV400", "Black/Gradient"],
        inStock: true,
        stock: 35
      },
      "a6": {
        id: "a6",
        title: "Pearl Drop Earrings",
        price: 9599,
        compareAtPrice: 12999,
        category: "accessories",
        image: "/images/Accessories/6.jpg",
        images: ["/images/Accessories/6.jpg"],
        rating: 4.7,
        reviews: 87,
        description: "Elegant freshwater pearl drop earrings with 14K gold accents",
        features: ["Freshwater Pearl", "14K Gold accents", "2.5cm drop", "White/Gold"],
        inStock: true,
        stock: 28
      },
      "a7": {
        id: "a7",
        title: "Leather Wallet with RFID",
        price: 4999,
        compareAtPrice: 6999,
        category: "accessories",
        image: "/images/Accessories/7.jpg",
        images: ["/images/Accessories/7.jpg"],
        rating: 4.4,
        reviews: 203,
        description: "Genuine leather wallet with RFID blocking technology",
        features: ["Genuine Leather", "RFID Blocking", "8 card slots", "Brown color"],
        inStock: true,
        stock: 60
      },
      "a8": {
        id: "a8",
        title: "Silk Scarf",
        price: 8999,
        compareAtPrice: 11999,
        category: "accessories",
        image: "/images/Accessories/8.jpg",
        images: ["/images/Accessories/8.jpg"],
        rating: 4.8,
        reviews: 76,
        description: "Luxury 100% silk scarf with hand-rolled edges",
        features: ["100% Silk", "90cm x 90cm", "Floral Print", "Dry clean only"],
        inStock: true,
        stock: 32
      },
      "a9": {
        id: "a9",
        title: "Stainless Steel Watch",
        price: 15999,
        compareAtPrice: 19999,
        category: "accessories",
        image: "/images/Accessories/9.jpg",
        images: ["/images/Accessories/9.jpg"],
        rating: 4.9,
        reviews: 184,
        description: "Minimalist stainless steel watch with leather strap",
        features: ["Stainless Steel & Leather", "Japanese Quartz", "5 ATM water resistance", "40mm case"],
        inStock: true,
        stock: 22
      },
      "a10": {
        id: "a10",
        title: "Cashmere Beanie",
        price: 7999,
        compareAtPrice: 9999,
        category: "accessories",
        image: "/images/Accessories/10.jpg",
        images: ["/images/Accessories/10.jpg"],
        rating: 4.6,
        reviews: 132,
        description: "Luxury cashmere beanie for cold weather",
        features: ["100% Cashmere", "Slouchy style", "Charcoal color", "One size fits most"],
        inStock: true,
        stock: 45
      },
      "a11": {
        id: "a11",
        title: "Leather Belt",
        price: 5999,
        compareAtPrice: 7999,
        category: "accessories",
        image: "/images/Accessories/11.jpg",
        images: ["/images/Accessories/11.jpg"],
        rating: 4.5,
        reviews: 167,
        description: "Genuine leather belt with stainless steel buckle",
        features: ["Genuine Leather", "Stainless Steel buckle", "Brown color", "30-40 inches"],
        inStock: true,
        stock: 38
      },
      "a12": {
        id: "a12",
        title: "Aviator Sunglasses",
        price: 14999,
        compareAtPrice: 19999,
        category: "accessories",
        image: "/images/Accessories/12.jpg",
        images: ["/images/Accessories/12.jpg"],
        rating: 4.9,
        reviews: 298,
        description: "Classic aviator sunglasses with mirrored lenses",
        features: ["Metal frame", "Mirrored lenses", "100% UVA/UVB", "Gold/Green"],
        inStock: true,
        stock: 28
      }
    },
    bags: {
      "4": {
        id: "4",
        title: "Genuine Leather Crossbody Bag",
        price: 2039,
        compareAtPrice: 10999,
        category: "bags",
        image: "/images/Home/4.jpg",
        images: ["/images/Home/4.jpg"],
        rating: 4.8,
        reviews: 203,
        description: "Premium genuine leather crossbody bag with handcrafted details",
        features: ["Genuine leather", "Handmade", "Crossbody style", "Multiple compartments"],
        inStock: true,
        stock: 18
      },
      "b1": {
        id: "b1",
        title: "Classic Leather Tote Bag",
        price: 2999,
        compareAtPrice: 19999,
        category: "bags",
        image: "/images/Bags/1.jpg",
        images: ["/images/Bags/1.jpg"],
        rating: 4.7,
        reviews: 89,
        description: "Handcrafted genuine leather tote bag with spacious interior",
        features: ["Genuine Leather", "Tote style", "Brown color", "Spacious interior"],
        inStock: true,
        stock: 25
      },
      "b2": {
        id: "b2",
        title: "Minimalist Backpack",
        price: 3118,
        compareAtPrice: 11999,
        category: "bags",
        image: "/images/Bags/2.jpg",
        images: ["/images/Bags/2.jpg"],
        rating: 4.5,
        reviews: 124,
        description: "Sleek and functional backpack for everyday use",
        features: ["Nylon material", "Backpack style", "Black color", "Everyday use"],
        inStock: true,
        stock: 40
      },
      "b3": {
        id: "b3",
        title: "Designer Crossbody Bag",
        price: 3550,
        compareAtPrice: 15999,
        category: "bags",
        image: "/images/Bags/3.jpg",
        images: ["/images/Bags/3.jpg"],
        rating: 4.8,
        reviews: 156,
        description: "Elegant crossbody bag with adjustable strap",
        features: ["Saffiano Leather", "Crossbody style", "Black color", "Adjustable strap"],
        inStock: true,
        stock: 35
      },
      "b4": {
        id: "b4",
        title: "Laptop Backpack with USB Port",
        price: 1999,
        compareAtPrice: 7999,
        category: "bags",
        image: "/images/Bags/4.jpg",
        images: ["/images/Bags/4.jpg"],
        rating: 4.6,
        reviews: 342,
        description: "Modern backpack with USB charging port and laptop compartment",
        features: ["Polyester material", "USB charging port", "Laptop compartment", "Gray color"],
        inStock: true,
        stock: 50
      },
      "b5": {
        id: "b5",
        title: "Leather Satchel Bag",
        price: 2767,
        compareAtPrice: 19999,
        category: "bags",
        image: "/images/Bags/5.jpg",
        images: ["/images/Bags/5.jpg"],
        rating: 4.9,
        reviews: 98,
        description: "Vintage-style leather satchel with adjustable strap",
        features: ["Full-grain Leather", "Satchel style", "Cognac color", "Vintage design"],
        inStock: true,
        stock: 20
      },
      "b6": {
        id: "b6",
        title: "Beach Tote Bag",
        price: 1200,
        compareAtPrice: 4499,
        category: "bags",
        image: "/images/Bags/6.jpg",
        images: ["/images/Bags/6.jpg"],
        rating: 4.4,
        reviews: 215,
        description: "Spacious beach tote with zippered pocket",
        features: ["Canvas material", "Tote style", "Navy Blue color", "Zippered pocket"],
        inStock: true,
        stock: 65
      },
      "b7": {
        id: "b7",
        title: "Travel Duffel Bag",
        price: 1469,
        compareAtPrice: 9999,
        category: "bags",
        image: "/images/Bags/7.jpg",
        images: ["/images/Bags/7.jpg"],
        rating: 4.3,
        reviews: 167,
        description: "Large capacity duffel bag for travel and sports",
        features: ["Polyester material", "Duffel style", "Black color", "Large capacity"],
        inStock: true,
        stock: 30
      },
      "b8": {
        id: "b8",
        title: "Gym Bag with Shoe Compartment",
        price: 1190,
        compareAtPrice: 5999,
        category: "bags",
        image: "/images/Bags/11.jpg",
        images: ["/images/Bags/11.jpg"],
        rating: 4.5,
        reviews: 298,
        description: "Compact gym bag with separate shoe compartment",
        features: ["Polyester material", "Gym bag style", "Black color", "Shoe compartment"],
        inStock: true,
        stock: 45
      },
      "b9": {
        id: "b9",
        title: "Evening Clutch Bag",
        price: 1198,
        compareAtPrice: 10999,
        category: "bags",
        image: "/images/Bags/9.jpg",
        images: ["/images/Bags/9.jpg"],
        rating: 4.6,
        reviews: 134,
        description: "Elegant clutch bag perfect for evening events",
        features: ["Vegan Leather", "Clutch style", "Gold color", "Evening wear"],
        inStock: true,
        stock: 28
      },
      "b10": {
        id: "b10",
        title: "Canvas Messenger Bag",
        price: 1944,
        compareAtPrice: 8999,
        category: "bags",
        image: "/images/Bags/12.jpg",
        images: ["/images/Bags/12.jpg"],
        rating: 4.4,
        reviews: 187,
        description: "Durable canvas messenger bag with laptop sleeve",
        features: ["Canvas material", "Messenger style", "Khaki color", "Laptop sleeve"],
        inStock: true,
        stock: 38
      },
      "b11": {
        id: "b11",
        title: "Hiking Backpack",
        price: 1599,
        compareAtPrice: 14999,
        category: "bags",
        image: "/images/Bags/10.jpg",
        images: ["/images/Bags/10.jpg"],
        rating: 4.8,
        reviews: 243,
        description: "Waterproof hiking backpack with multiple compartments",
        features: ["Polyester material", "Mini backpack style", "Pink color", "Trendy design"],
        inStock: true,
        stock: 22
      },
      "b12": {
        id: "b12",
        title: "Luxury Handbag",
        price: 2499,
        compareAtPrice: 39999,
        category: "bags",
        image: "/images/Bags/13.jpg",
        images: ["/images/Bags/13.jpg"],
        rating: 4.9,
        reviews: 76,
        description: "Premium leather handbag with gold hardware",
        features: ["Genuine Leather", "Crossbody style", "Tan color", "Gold hardware"],
        inStock: true,
        stock: 15
      }
    }
  };

  return products[category]?.[id] || null;
};

export default function ProductDetail() {
  const { category, id } = useParams<{ category: string; id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCartContext();
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (category && id) {
      const productData = getProductData(category, id);
      setProduct(productData);
      
      if (productData) {
        document.title = `${productData.title} | ABU Accessories`;
      }
    }
  }, [category, id]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    setIsLoading(true);
    try {
      await addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
      toast.success(`Added ${quantity} ${product.title} to cart`);
    } catch (error) {
      toast.error("Failed to add item to cart");
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 sm:p-6 lg:p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-white border border-gray-200 flex items-center justify-center p-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/placeholder-product.svg';
                  }}
                />
              </div>
              
              {/* Image Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 justify-center lg:justify-start">
                  {product.images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-md overflow-hidden border-2 flex items-center justify-center p-2 bg-white transition-all hover:shadow-md ${
                        selectedImage === index ? 'border-primary shadow-md' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = '/images/placeholder.svg';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                  {product.compareAtPrice && (
                    <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                      {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% OFF
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Features</h3>
                <ul className="space-y-1">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {product.stock} items available
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleAddToCart}
                    disabled={isLoading || !product.inStock}
                    className="flex-1"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {isLoading ? 'Adding...' : 'Add to Cart'}
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                {!product.inStock && (
                  <p className="text-red-600 text-sm font-medium">Out of Stock</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
