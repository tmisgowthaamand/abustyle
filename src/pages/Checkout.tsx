import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '@/providers/CartProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';

export default function Checkout() {
  const { items, subtotal, clear } = useCartContext();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<'card' | 'paypal' | 'cod'>('card');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPayment) {
      toast.error('Please select a payment method');
      return;
    }
    
    setIsLoading(true);
    
    // In a real app, you would send the order to your backend here
    // and redirect to the confirmation page with the order ID
    const orderData = {
      items,
      subtotal,
      paymentMethod: selectedPayment,
      // Add other form data as needed
    };
    
    // Simulate API call
    setTimeout(() => {
      // Clear the cart
      clear();
      setIsLoading(false);
      
      // Navigate to order confirmation page
      navigate('/order-confirmation');
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Button onClick={() => navigate('/')}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      First Name <span className="text-destructive">*</span>
                    </label>
                    <Input id="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      Last Name <span className="text-destructive">*</span>
                    </label>
                    <Input id="lastName" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <Input id="email" type="email" required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number <span className="text-destructive">*</span>
                  </label>
                  <Input id="phone" type="tel" required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium">
                    Address <span className="text-destructive">*</span>
                  </label>
                  <Input id="address" required />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="city" className="text-sm font-medium">
                      City <span className="text-destructive">*</span>
                    </label>
                    <Input id="city" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="state" className="text-sm font-medium">
                      State <span className="text-destructive">*</span>
                    </label>
                    <Input id="state" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="zip" className="text-sm font-medium">
                      ZIP Code <span className="text-destructive">*</span>
                    </label>
                    <Input id="zip" required />
                  </div>
                </div>
                
                <div className="space-y-4 pt-2">
                  <h3 className="text-sm font-medium">Payment Method <span className="text-destructive">*</span></h3>
                  <div className="space-y-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start h-14 px-4 text-left border-2"
                      onClick={() => setSelectedPayment('card')}
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPayment === 'card' ? 'border-primary' : 'border-gray-300'}`}>
                          {selectedPayment === 'card' && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                        </div>
                        <span>Credit/Debit Card</span>
                      </div>
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start h-14 px-4 text-left border-2"
                      onClick={() => setSelectedPayment('paypal')}
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPayment === 'paypal' ? 'border-primary' : 'border-gray-300'}`}>
                          {selectedPayment === 'paypal' && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                        </div>
                        <span>PayPal</span>
                      </div>
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start h-14 px-4 text-left border-2"
                      onClick={() => setSelectedPayment('cod')}
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPayment === 'cod' ? 'border-primary' : 'border-gray-300'}`}>
                          {selectedPayment === 'cod' && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                        </div>
                        <span>Cash on Delivery (COD)</span>
                      </div>
                    </Button>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-end pt-6">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Processing...' : 'Place Order'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
        
        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.qty}</p>
                      </div>
                    </div>
                    <p className="font-medium">{formatPrice(item.price * item.qty)}</p>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2">
                  <span>Total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
