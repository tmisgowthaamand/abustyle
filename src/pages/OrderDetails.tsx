import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, Calendar, X, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { orderStore, Order } from '@/lib/orderStore';


const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-4 w-4" />;
    case 'processing':
      return <Package className="h-4 w-4" />;
    case 'shipped':
      return <Truck className="h-4 w-4" />;
    case 'delivered':
      return <CheckCircle className="h-4 w-4" />;
    case 'cancelled':
      return <X className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-orange-100 text-orange-800';
    case 'processing':
      return 'bg-yellow-100 text-yellow-800';
    case 'shipped':
      return 'bg-blue-100 text-blue-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  
  useEffect(() => {
    if (orderId) {
      const orderData = orderStore.getOrderById(orderId);
      setOrder(orderData);
    }
  }, [orderId]);

  const handleCancelOrder = (orderId: string) => {
    const cancelledOrder = orderStore.cancelOrder(orderId);
    if (cancelledOrder) {
      setOrder(cancelledOrder);
      toast.success('Order cancelled successfully');
    }
  };

  const canCancelOrder = (order: Order | null) => {
    return order?.cancellable && (order.status === 'pending' || order.status === 'processing');
  };

  const getOrderTimeline = (order: Order) => {
    const baseTimeline = [
      { status: 'Order Placed', date: new Date(order.date).toLocaleString(), completed: true },
      { status: 'Payment Confirmed', date: new Date(order.date).toLocaleString(), completed: true },
    ];
    
    if (order.status === 'cancelled') {
      return [
        ...baseTimeline,
        { status: 'Cancelled', date: new Date().toLocaleString(), completed: true }
      ];
    }
    
    return [
      ...baseTimeline,
      { status: 'Processing', date: order.status === 'pending' ? 'Pending' : 'In Progress', completed: order.status !== 'pending' },
      { status: 'Shipped', date: 'Expected within 1-2 days', completed: ['shipped', 'delivered'].includes(order.status) },
      { status: 'Delivered', date: 'Expected within 3-5 days', completed: order.status === 'delivered' }
    ];
  };

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
        <p className="text-muted-foreground mb-6">The order you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/orders')}>Back to Orders</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/orders')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Order #{order.id}</h1>
            <p className="text-muted-foreground">
              Placed on {new Date(order.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <Badge className={`${getStatusColor(order.status)} flex items-center gap-1 ml-auto`}>
            {getStatusIcon(order.status)}
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">Quantity: {item.qty}</p>
                      </div>
                      <p className="font-medium">{formatPrice(item.price * item.qty)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getOrderTimeline(order).map((step, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Clock className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                          {step.status}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {step.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Shipping */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-1">
                  <p className="font-medium">{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{order.paymentMethod}</p>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Button 
                className="w-full"
                onClick={() => navigate('/')}
              >
                Continue Shopping
              </Button>
              {order.status !== 'cancelled' && (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate(`/order/${order.id}/reorder`)}
                >
                  Reorder Items
                </Button>
              )}
              {canCancelOrder(order) && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel Order
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        Cancel Order #{order.id}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to cancel this order? This action cannot be undone and you will receive a full refund.
                        {order.status === 'processing' && (
                          <span className="block mt-2 text-sm text-amber-600">
                            ⚠️ This order is currently being processed. Cancellation may take additional time.
                          </span>
                        )}
                        <div className="mt-3 p-3 bg-gray-50 rounded-md">
                          <p className="text-sm font-medium text-gray-900">Order Total: {formatPrice(order.total)}</p>
                          <p className="text-xs text-gray-600 mt-1">Refund will be processed within 3-5 business days</p>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Keep Order</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleCancelOrder(order.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Cancel Order
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
