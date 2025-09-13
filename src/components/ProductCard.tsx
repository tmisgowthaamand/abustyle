import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Star, ShoppingCart, Heart, ImageOff } from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";
import { useCartContext } from "@/providers/CartProvider";
import { toast } from "sonner";
import { ProductCategory } from "@/types/product";
import { useNavigate } from "react-router-dom";
import { getProductImagePath, getPlaceholderImage } from "@/lib/image-utils";

type ProductLabel = "New" | "Sale" | "Bestseller" | "Vegan" | "Hypoallergenic" | "Cruelty-Free";

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  images?: string[];
  rating?: number;
  reviewCount?: number;
  category: ProductCategory;
  tags?: string[];
  categoryAccent?: string;
  ratio?: "square" | "portrait";
  className?: string;
  showActions?: boolean;
  onAddToCart?: () => void;
}

export function ProductCard({
  id,
  name,
  price,
  compareAtPrice,
  image,
  images = [],
  rating = 0,
  reviewCount = 0,
  category,
  tags = [],
  categoryAccent = "#e11d48", // rose-600
  ratio = "portrait",
  className = "",
  showActions = true,
  onAddToCart,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCartContext();
  const navigate = useNavigate();
  
  const discount = compareAtPrice && compareAtPrice > price
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;
    
  // Generate labels based on product data
  const labels: ProductLabel[] = [];
  if (discount > 0) labels.push("Sale");
  if (tags?.includes("vegan")) labels.push("Vegan");
  if (tags?.includes("hypoallergenic")) labels.push("Hypoallergenic");
  if (tags?.includes("new")) labels.unshift("New");
  if (rating >= 4.5 && reviewCount > 10) labels.push("Bestseller");
  
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    try {
      await addToCart({
        id,
        name,
        price,
        image,
        quantity: 1
      });
      onAddToCart?.();
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast.error("Failed to add item to cart");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCardClick = (e: React.MouseEvent) => {
    navigate(`/product/${category}/${id}`);
  };
  
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement wishlist functionality
    toast.info("Wishlist functionality coming soon!");
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-md cursor-pointer h-full",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Image Container with Dynamic Aspect Ratio */}
      <div className={`relative w-full ${ratio === "square" ? "pt-[100%]" : "pt-[125%]"} bg-gray-50`}>
        {image ? (
          <img
            src={image}
            alt={name}
            className="absolute inset-0 w-full h-full object-contain object-center bg-white"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = '/images/placeholder.svg';
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <ImageOff className="h-12 w-12 text-gray-300" />
          </div>
        )}
        {discount > 0 && (
          <Badge className="absolute top-2 right-2 bg-red-500 text-white">
            -{discount}%
          </Badge>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-1 mb-2">
          {labels.map((label, index) => (
            <Badge
              key={index}
              variant="secondary"
              className={cn(
                "text-xs font-medium tracking-wide uppercase",
                label === "New" && "bg-blue-100 text-blue-800 hover:bg-blue-100",
                label === "Sale" && "bg-red-100 text-red-800 hover:bg-red-100",
                label === "Bestseller" && "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
                label === "Vegan" && "bg-green-100 text-green-800 hover:bg-green-100",
                label === "Hypoallergenic" && "bg-purple-100 text-purple-800 hover:bg-purple-100"
              )}
            >
              {label}
            </Badge>
          ))}
        </div>
        
        <div className="flex flex-col flex-grow">
          <div className="mb-2">
            <Link to={`/product/${category}/${id}`} className="hover:no-underline">
              <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-primary">
                {name}
              </h3>
            </Link>
            {compareAtPrice && compareAtPrice > price && (
              <p className="text-sm text-gray-500 line-through">
                {formatPrice(compareAtPrice)}
              </p>
            )}
          </div>
          
          <div className="flex items-center">
            {rating > 0 && (
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm text-gray-600">
                  {rating.toFixed(1)}
                  {reviewCount > 0 && (
                    <span className="text-gray-400"> ({reviewCount})</span>
                  )}
                </span>
              </div>
            )}
            
            {tags?.length > 0 && (
              <span className="ml-2 text-sm text-gray-500">• {tags[0]}</span>
            )}
          </div>
          
          <div className="mt-2">
            <p className="text-lg font-semibold text-gray-900">
              {formatPrice(price)}
            </p>
          </div>
        </div>
        
        {showActions && (
          <div className="mt-auto pt-2 flex justify-between items-center">
            <Button
              variant="outline"
              size="sm"
              className="h-9 rounded-full"
              onClick={handleWishlist}
              aria-label="Add to wishlist"
            >
              <Heart className="h-4 w-4" />
              <span className="sr-only">Save</span>
            </Button>
            <Button
              size="sm"
              className="h-9 rounded-full px-4"
              style={{ backgroundColor: categoryAccent }}
              onClick={handleAddToCart}
              disabled={isLoading}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {isLoading ? 'Adding...' : 'Add to Cart'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
