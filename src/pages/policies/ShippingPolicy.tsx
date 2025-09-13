import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function ShippingPolicy() {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = 'Shipping Policy | ABU Accessories';
  }, []);

  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>
      <h1 className="text-4xl font-bold mb-8">Shipping Policy</h1>
      <p className="mb-6 text-muted-foreground">Style Delivered Securely, On Time</p>
      
      <section className="mb-12 space-y-6">
        <p>
          At ABU Accessories, we take pride in ensuring that your favorite accessories—whether jewelry, handbags, cosmetics, or quirky collections—reach you safely and on time. This Shipping Policy outlines how we process, dispatch, and deliver your orders across India.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Order Processing Time</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Orders are processed within 1–3 business days after payment confirmation.</li>
          <li>Orders placed on Sundays or public holidays are processed on the next working day.</li>
          <li>For high-demand or limited-edition items, additional processing time may be required. Customers will be notified in such cases.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Destinations & Timelines</h2>
        <p className="mb-2">Currently, ABU Accessories ships across India through trusted courier partners.</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>Metro Cities:</strong> 2–5 business days after dispatch</li>
          <li><strong>Non-Metro & Semi-Urban Areas:</strong> 4–7 business days after dispatch</li>
          <li><strong>Remote & Rural Locations:</strong> 5–10 business days after dispatch</li>
        </ul>
        <p className="text-sm text-muted-foreground mb-6">
          Note: Delivery times may vary due to courier availability, weather conditions, or unforeseen delays.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Charges</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Shipping charges are calculated based on order value, weight, and destination.</li>
          <li>Free shipping may be offered on orders above a specified value during promotions.</li>
          <li>Shipping costs, if applicable, will be displayed clearly at checkout before payment.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Packaging & Security</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>All items are packed in tamper-proof, protective packaging to ensure safety during transit.</li>
          <li>Fragile accessories are carefully bubble-wrapped and cushioned for added protection.</li>
          <li>Each package is sealed to maintain product integrity until it reaches you.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Tracking Your Order</h2>
        <p className="mb-2">Once dispatched, you will receive:</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>A tracking number via email or SMS</li>
          <li>A link to monitor the shipment's real-time status</li>
        </ul>
        <p className="text-sm text-muted-foreground mb-6">
          Tracking information may take 24–48 hours to update after dispatch.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Delays & Exceptions</h2>
        <p className="mb-2">While we strive for timely delivery, certain factors may cause delays:</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Courier partner disruptions</li>
          <li>Regional holidays or lockdowns</li>
          <li>Weather-related or natural disruptions</li>
          <li>Incorrect or incomplete shipping address provided by customer</li>
        </ul>
        <p className="mb-6">
          In such cases, our support team will assist you with updates and resolutions.
        </p>

        <div className="bg-muted p-6 rounded-lg mt-12">
          <h2 className="text-2xl font-semibold mb-4">Need Help With Your Shipment?</h2>
          <p className="mb-4">For questions, concerns, or delivery support, please reach out to us:</p>
          <address className="not-italic">
            <p className="font-semibold">ABU Accessories</p>
            <p>📍 No.509, 1st BLOCK, Ph-2, Muthamizh Nagar,</p>
            <p>Chennai, Tamil Nadu – 600118</p>
            <p>📞 Phone: <a href="tel:+919080923823" className="text-blue-600 hover:underline">+91 90809 23823</a></p>
            <p>📧 Email: <a href="mailto:contact@abuaccessories.shop" className="text-blue-600 hover:underline">contact@abuaccessories.shop</a></p>
            <p>🌐 Website: <a href="https://www.abuaccessories.shop" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.abuaccessories.shop</a></p>
          </address>
        </div>
      </section>
    </main>
  );
}
