import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function OrderConfirmation() {
  const navigate = useNavigate();
  
  // Generate a random order ID (in a real app, this would come from your backend)
  const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

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
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Order Details</h2>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Order Number:</span>
            <span className="font-medium">{orderId}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium">You'll receive an email confirmation shortly</span>
          </div>
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
            View Order Status
          </Button>
        </div>
        
        <p className="mt-8 text-sm text-gray-500">
          Need help? <a href="/contact" className="text-primary hover:underline">Contact us</a>
        </p>
      </div>
    </div>
  );
}
