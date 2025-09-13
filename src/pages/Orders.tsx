import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import { Package, Truck, CheckCircle, Clock, X, AlertTriangle } from 'lucide-react';
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

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Load orders from localStorage
    const storedOrders = orderStore.getAllOrders();
    setOrders(storedOrders);
  }, []);

  const handleCancelOrder = (orderId: string) => {
    const cancelledOrder = orderStore.cancelOrder(orderId);
    if (cancelledOrder) {
      // Update local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? cancelledOrder : order
        )
      );
      toast.success('Order cancelled successfully');
    }
  };

  const canCancelOrder = (order: Order) => {
    return order.cancellable && (order.status === 'pending' || order.status === 'processing');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Orders</h1>
          <Button onClick={() => navigate('/')} variant="outline">
            Continue Shopping
          </Button>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-medium mb-2">No orders yet</h2>
              <p className="text-gray-600 mb-6">
                When you place your first order, it will appear here.
              </p>
              <Button onClick={() => navigate('/')}>
                Start Shopping
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <p className="text-sm text-gray-600">
                        Placed on {new Date(order.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.qty}</p>
                        </div>
                        <p className="font-medium">{formatPrice(item.price * item.qty)}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/order/${order.id}`)}
                      >
                        View Details
                      </Button>
                      {order.status === 'delivered' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/order/${order.id}/reorder`)}
                        >
                          Reorder
                        </Button>
                      )}
                      {canCancelOrder(order) && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-red-600" />
                                Cancel Order
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to cancel order #{order.id}? This action cannot be undone.
                                {order.status === 'processing' && (
                                  <span className="block mt-2 text-sm text-amber-600">
                                    ⚠️ This order is currently being processed. Cancellation may take additional time.
                                  </span>
                                )}
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
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="text-lg font-bold">{formatPrice(order.total)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
