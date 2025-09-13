import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Package } from 'lucide-react';
import { orderStore, Order } from '@/lib/orderStore';
import { formatPrice } from '@/lib/utils';

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  
  const orderId = searchParams.get('orderId');
  
  useEffect(() => {
    if (orderId) {
      const orderData = orderStore.getOrderById(orderId);
      setOrder(orderData);
    }
  }, [orderId]);
  
  if (!orderId || !order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
        <p className="text-muted-foreground mb-6">We couldn't find your order. Please check your order confirmation email.</p>
        <Button onClick={() => navigate('/')}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-600">Quantity: {item.qty}</p>
                    </div>
                    <p className="font-medium">{formatPrice(item.price * item.qty)}</p>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{formatPrice(order.shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatPrice(order.tax)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Order Details */}
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-medium">{order.id}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{new Date(order.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium capitalize">{order.status}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium">{order.paymentMethod}</span>
              </div>
              {order.shippingAddress && (
                <div className="pt-2">
                  <p className="text-gray-600 mb-2">Shipping Address:</p>
                  <div className="text-sm space-y-1 bg-gray-50 p-3 rounded">
                    <p className="font-medium">{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                    <p>{order.shippingAddress.country}</p>
                  </div>
                </div>
              )}
              <div className="pt-2">
                <p className="text-sm text-gray-600">You'll receive an email confirmation shortly</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            onClick={() => navigate('/')} 
            className="w-full sm:w-auto"
          >
            Continue Shopping
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/orders')} 
            className="w-full sm:w-auto"
          >
            View All Orders
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate(`/order/${order.id}`)} 
            className="w-full sm:w-auto"
          >
            View Order Details
          </Button>
        </div>
        
        <p className="mt-8 text-sm text-gray-500">
          Need help? <a href="/contact" className="text-primary hover:underline">Contact us</a>
        </p>
      </div>
    </div>
  );
}
