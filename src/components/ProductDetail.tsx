import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Star, ShoppingCart, Truck, Shield, ArrowLeft } from "lucide-react";
import { useCartContext } from "@/providers/CartProvider";
import { toast } from "sonner";
import { getRelatedProducts } from "@/lib/product-utils";
import { ProductCard } from "./ProductCard";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();
  const { addToCart } = useCartContext();
  
  
  useEffect(() => {
    if (product) {
      // Load related products
      const loadRelatedProducts = async () => {
        try {
          const related = await getRelatedProducts(product, 4);
          setRelatedProducts(related);
        } catch (error) {
          console.error('Error loading related products:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
      loadRelatedProducts();
    }
  }, [product]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {product.category}
        </Button>
        
        <div className="max-w-3xl mx-auto space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <div className="flex items-center space-x-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-6 w-1/3" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="flex space-x-4 pt-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-4">The requested product could not be found.</p>
        <Button className="mt-4" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }
  
  const handleAddToCart = async () => {
    try {
      await addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        quantity: 1
      });
      toast.success("Added to cart");
    } catch (error) {
      toast.error("Failed to add item to cart");
    }
  };

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {product.category}
        </Button>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <img
                src={product.images?.[selectedImage] || product.image}
                alt={product.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-gray-50 rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-primary' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {product.title}
            </h1>
            
            <div className="mt-4 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill={i < product.rating ? 'currentColor' : 'none'}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {product.rating.toFixed(1)} ({product.reviews} reviews)
                </span>
              </div>
              {product.stock > 0 ? (
                <Badge variant="outline" className="ml-4 bg-green-100 text-green-800">
                  In Stock
                </Badge>
              ) : (
                <Badge variant="outline" className="ml-4 bg-red-100 text-red-800">
                  Out of Stock
                </Badge>
              )}
            </div>
            
            <p className="mt-6 text-3xl font-medium text-foreground">
              ${product.price.toFixed(2)}
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="ml-2 text-lg text-muted-foreground line-through">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
            </p>
            
            <p className="mt-6 text-base text-muted-foreground">
              {product.description}
            </p>
            
            {/* Product Attributes */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-foreground">Details</h3>
              <div className="mt-2 space-y-2">
                {product.brand && (
                  <div className="flex">
                    <span className="text-muted-foreground w-24">Brand</span>
                    <span className="text-foreground">{product.brand}</span>
                  </div>
                )}
                {product.attrs && Object.entries(product.attrs).map(([key, value]) => (
                  <div key={key} className="flex">
                    <span className="text-muted-foreground w-24 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-foreground capitalize">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 flex space-x-4">
              <Button 
                size="lg" 
                className="flex-1"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="flex-1"
                disabled={product.stock <= 0}
              >
                Buy Now
              </Button>
            </div>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <span className="ml-2 text-sm text-muted-foreground">
                  Free shipping on orders over $50
                </span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <span className="ml-2 text-sm text-muted-foreground">
                  Easy 30-day returns
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Tabs */}
        <div className="mt-16 border-t border-gray-200 pt-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button className="border-b-2 border-primary px-1 py-4 text-sm font-medium text-primary">
                Description
              </button>
              <button className="border-b-2 border-transparent px-1 py-4 text-sm font-medium text-muted-foreground hover:border-gray-300 hover:text-gray-700">
                Shipping & Returns
              </button>
              <button className="border-b-2 border-transparent px-1 py-4 text-sm font-medium text-muted-foreground hover:border-gray-300 hover:text-gray-700">
                Reviews ({product.reviews})
              </button>
            </nav>
          </div>
          <div className="prose prose-sm mt-6 max-w-none">
            <p className="text-muted-foreground">
              {product.description}
            </p>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <Separator className="my-8" />
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="h-full">
                <ProductCard
                  id={relatedProduct.id}
                  name={relatedProduct.title}
                  price={relatedProduct.price}
                  compareAtPrice={relatedProduct.compareAtPrice}
                  image={relatedProduct.image}
                  images={relatedProduct.images}
                  rating={relatedProduct.rating}
                  reviewCount={relatedProduct.reviews}
                  category={relatedProduct.category}
                  tags={relatedProduct.tags}
                  categoryAccent={getCategoryAccent(relatedProduct.category)}
                  className="h-full"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to get accent color based on category
function getCategoryAccent(category: string): string {
  switch (category) {
    case 'cosmetics':
      return '#f43f5e'; // rose-500
    case 'toys':
      return '#3b82f6'; // blue-500
    case 'accessories':
      return '#8b5cf6'; // violet-500
    case 'bags':
      return '#10b981'; // emerald-500
    default:
      return '#e11d48'; // rose-600 (default)
  }
}
