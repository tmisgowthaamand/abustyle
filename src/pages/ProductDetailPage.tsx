import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDetail from '@/components/ProductDetail';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { getProductById } from '@/lib/product-utils';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Product } from '@/types/product';

export default function ProductDetailPage() {
  const { id, category } = useParams<{ id: string; category: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    const loadProduct = async () => {
      if (!id || !category) {
        navigate('/not-found');
        return;
      }
      
      try {
        setIsLoading(true);
        const productData = await getProductById(id, category);
        if (!productData) {
          throw new Error('Product not found');
        }
        setProduct(productData);
        setError(null);
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Failed to load product. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProduct();
  }, [id, category, navigate]);

  if (!id || !category) {
    return null; // Will be redirected to not-found
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8 pt-24">
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {product?.category || 'products'}
        </Button>
        
        {error ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-destructive mb-4">Error Loading Product</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => navigate('/')}>Return to Home</Button>
          </div>
        ) : isLoading ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Skeleton className="h-[400px] w-full rounded-lg" />
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-20 w-full rounded-md" />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-6 w-1/4 mt-4" />
              <Skeleton className="h-4 w-full mt-8" />
              <Skeleton className="h-4 w-2/3 mt-2" />
              <Skeleton className="h-4 w-1/2 mt-2" />
              <Skeleton className="h-12 w-1/2 mt-8" />
            </div>
          </div>
        ) : product ? (
          <ProductDetail product={product} />
        ) : null}
      </div>
      <Footer />
    </div>
  );
}
