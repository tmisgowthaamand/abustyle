import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '@/providers/CartProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';
import { orderStore } from '@/lib/orderStore';

// G20 countries with their tax rates
const G20_COUNTRIES = [
  { code: 'IN', name: 'India', taxRate: 18 }, // GST
  { code: 'AR', name: 'Argentina', taxRate: 21 }, // IVA
  { code: 'AU', name: 'Australia', taxRate: 10 }, // GST
  { code: 'BR', name: 'Brazil', taxRate: 17 }, // ICMS average
  { code: 'CA', name: 'Canada', taxRate: 13 }, // HST average
  { code: 'CN', name: 'China', taxRate: 13 }, // VAT
  { code: 'FR', name: 'France', taxRate: 20 }, // TVA
  { code: 'DE', name: 'Germany', taxRate: 19 }, // MwSt
  { code: 'ID', name: 'Indonesia', taxRate: 11 }, // PPN
  { code: 'IT', name: 'Italy', taxRate: 22 }, // IVA
  { code: 'JP', name: 'Japan', taxRate: 10 }, // Consumption Tax
  { code: 'KR', name: 'South Korea', taxRate: 10 }, // VAT
  { code: 'MX', name: 'Mexico', taxRate: 16 }, // IVA
  { code: 'RU', name: 'Russia', taxRate: 20 }, // VAT
  { code: 'SA', name: 'Saudi Arabia', taxRate: 15 }, // VAT
  { code: 'ZA', name: 'South Africa', taxRate: 15 }, // VAT
  { code: 'TR', name: 'Turkey', taxRate: 18 }, // KDV
  { code: 'GB', name: 'United Kingdom', taxRate: 20 }, // VAT
  { code: 'US', name: 'United States', taxRate: 8.5 }, // Sales Tax average
];

export default function Checkout() {
  const { items, subtotal, clear } = useCartContext();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<'credit' | 'debit' | 'cod'>('credit');
  const [selectedCountry, setSelectedCountry] = useState<string>('IN');
  const navigate = useNavigate();

  // Calculate tax and total based on selected country
  const selectedCountryData = G20_COUNTRIES.find(country => country.code === selectedCountry);
  const taxRate = selectedCountryData?.taxRate || 0;
  const taxAmount = (subtotal * taxRate) / 100;
  const totalWithTax = subtotal + taxAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPayment) {
      toast.error('Please select a payment method');
      return;
    }
    
    if (!selectedCountry) {
      toast.error('Please select a country');
      return;
    }
    
    setIsLoading(true);
    
    // Get form data
    const formData = new FormData(e.target as HTMLFormElement);
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const zip = formData.get('zip') as string;
    
    // Convert cart items to order items
    const orderItems = items.map(item => ({
      id: item.id,
      title: item.title,
      price: item.price,
      qty: item.qty,
      image: item.image,
      category: 'general' // Default category since cart items don't have category info
    }));
    
    // Simulate API call
    setTimeout(() => {
      // Create order in local storage
      const order = orderStore.createOrder({
        items: orderItems,
        subtotal,
        tax: taxAmount,
        shipping: 0, // Free shipping
        total: totalWithTax,
        paymentMethod: selectedPayment === 'credit' ? 'Credit Card' : 
                      selectedPayment === 'debit' ? 'Debit Card' : 'Cash on Delivery',
        country: selectedCountryData?.name || 'Unknown',
        shippingAddress: {
          name: `${firstName} ${lastName}`,
          address,
          city,
          state,
          zip,
          country: selectedCountryData?.name || 'Unknown'
        }
      });
      
      // Clear the cart
      clear();
      setIsLoading(false);
      
      // Navigate to order confirmation page with order ID
      navigate(`/order-confirmation?orderId=${order.id}`);
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
                    <Input id="firstName" name="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      Last Name <span className="text-destructive">*</span>
                    </label>
                    <Input id="lastName" name="lastName" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <Input id="email" name="email" type="email" required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number <span className="text-destructive">*</span>
                  </label>
                  <Input id="phone" name="phone" type="tel" required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium">
                    Address <span className="text-destructive">*</span>
                  </label>
                  <Input id="address" name="address" required />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="city" className="text-sm font-medium">
                      City <span className="text-destructive">*</span>
                    </label>
                    <Input id="city" name="city" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="state" className="text-sm font-medium">
                      State <span className="text-destructive">*</span>
                    </label>
                    <Input id="state" name="state" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="zip" className="text-sm font-medium">
                      ZIP Code <span className="text-destructive">*</span>
                    </label>
                    <Input id="zip" name="zip" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="country" className="text-sm font-medium">
                    Country <span className="text-destructive">*</span>
                  </label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      {G20_COUNTRIES.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.name} ({country.taxRate}% tax)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4 pt-2">
                  <h3 className="text-sm font-medium">Payment Method <span className="text-destructive">*</span></h3>
                  <div className="space-y-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start h-14 px-4 text-left border-2"
                      onClick={() => setSelectedPayment('credit')}
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPayment === 'credit' ? 'border-primary' : 'border-gray-300'}`}>
                          {selectedPayment === 'credit' && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                        </div>
                        <span>Credit Card</span>
                      </div>
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start h-14 px-4 text-left border-2"
                      onClick={() => setSelectedPayment('debit')}
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPayment === 'debit' ? 'border-primary' : 'border-gray-300'}`}>
                          {selectedPayment === 'debit' && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                        </div>
                        <span>Debit Card</span>
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
                <div className="flex justify-between">
                  <span>Tax ({selectedCountryData?.name} - {taxRate}%)</span>
                  <span>{formatPrice(taxAmount)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>{formatPrice(totalWithTax)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
