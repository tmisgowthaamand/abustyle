import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetDescription } from '@/components/ui/sheet';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Input } from './ui/input';
import { useState } from 'react';

// Simple image component with proper type checking
const Image = ({ 
  src, 
  alt, 
  className, 
  fill,
  ...props 
}: { 
  src: string; 
  alt: string; 
  className?: string; 
  fill?: boolean;
  [key: string]: any 
}) => {
  const imageClassName = fill 
    ? `${className || ''} w-full h-full object-cover object-center`
    : className;
    
  return (
    <img 
      src={src} 
      alt={alt} 
      className={imageClassName} 
      {...props} 
    />
  );
};

type CartDrawerProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CartDrawer({ isOpen, onOpenChange }: CartDrawerProps) {
  const { items, subtotal, itemCount, updateQty, remove, clear } = useCart();
  const [isUpdating, setIsUpdating] = useState<Record<string, boolean>>({});

  const handleQuantityChange = (itemId: string, newQty: number) => {
    setIsUpdating(prev => ({ ...prev, [itemId]: true }));
    
    // Simulate API call delay
    setTimeout(() => {
      updateQty(itemId, newQty);
      setIsUpdating(prev => ({ ...prev, [itemId]: false }));
    }, 300);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetDescription className="sr-only">
        Your shopping cart with {itemCount} {itemCount === 1 ? 'item' : 'items'}
      </SheetDescription>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-semibold">Your Cart</SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close cart</span>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </p>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="rounded-full bg-gray-100 p-4 mb-4">
              <ShoppingCartIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button onClick={() => onOpenChange(false)} className="w-full">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-6 py-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium line-clamp-2">
                          {item.title}
                        </h3>
                        <button
                          onClick={() => remove(item.id)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      
                      {item.attrs && Object.entries(item.attrs).length > 0 && (
                        <div className="mt-1 text-xs text-muted-foreground space-y-0.5">
                          {Object.entries(item.attrs).map(([key, value]) => (
                            <div key={key}>
                              <span className="font-medium">{key}:</span> {value}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.id, item.qty - 1)}
                            disabled={isUpdating[item.id] || item.qty <= 1}
                          >
                            <span className="text-lg">−</span>
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            max={item.stock}
                            value={item.qty}
                            onChange={(e) => {
                              const newQty = parseInt(e.target.value, 10) || 1;
                              handleQuantityChange(item.id, Math.min(newQty, item.stock));
                            }}
                            className="w-16 h-8 text-center"
                            disabled={isUpdating[item.id]}
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.id, item.qty + 1)}
                            disabled={isUpdating[item.id] || item.qty >= item.stock}
                          >
                            <span className="text-lg">+</span>
                          </Button>
                        </div>
                        <p className="text-sm font-medium">
                          {formatPrice(item.price * item.qty)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <SheetFooter className="border-t pt-4">
              <div className="w-full space-y-4">
                <div className="flex justify-between text-base font-medium">
                  <p>Subtotal</p>
                  <p>{formatPrice(subtotal)}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="space-y-2">
                  <Button asChild className="w-full" size="lg">
                    <Link to="/checkout" onClick={() => onOpenChange(false)}>
                      Proceed to Checkout
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      if (confirm('Are you sure you want to clear your cart?')) {
                        clear();
                      }
                    }}
                  >
                    Clear Cart
                  </Button>
                </div>
                <p className="text-center text-xs text-muted-foreground">
                  or{' '}
                  <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    className="font-medium text-primary hover:underline"
                  >
                    Continue Shopping
                  </button>
                </p>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function ShoppingCartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
