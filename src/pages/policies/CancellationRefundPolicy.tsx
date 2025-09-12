import { useEffect } from 'react';

export default function CancellationRefundPolicy() {
  useEffect(() => {
    document.title = 'Cancellation & Refund Policy | ABU Accessories';
  }, []);

  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Cancellation & Refund Policy</h1>
      <p className="mb-6 text-muted-foreground">Fair, Simple & Customer-Focused</p>
      
      <section className="mb-12 space-y-6">
        <p>
          At ABU Accessories, we want you to shop with confidence. While we strive to deliver quality products and smooth experiences, we understand that cancellations or returns may sometimes be necessary. This policy outlines how cancellations, refunds, and exchanges are handled.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Order Cancellations</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>Cancellation Window:</strong> Orders can be cancelled within 2 hours of placement, provided they have not yet been processed, packed, or dispatched.</li>
          <li>Once the order is packed or handed over to our courier partner, cancellations are no longer possible.</li>
          <li>To request a cancellation, please contact us via phone, email, or WhatsApp with your Order ID.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Returns & Exchanges</h2>
        <p>We accept returns or exchanges in the following cases:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2 mb-4">
          <li>The item is damaged on delivery.</li>
          <li>The wrong product was shipped.</li>
          <li>The item has a manufacturing defect.</li>
        </ul>
        <h3 className="text-xl font-semibold mt-6 mb-2">Conditions for Returns:</h3>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Return requests must be raised within 48 hours of delivery.</li>
          <li>The product must be unused, in original condition, with tags and packaging intact.</li>
          <li>For cosmetics or personal-use items, returns are accepted only if the product is unopened and sealed.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Refunds</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Approved refunds will be processed within 3–5 business days of confirmation.</li>
          <li>Refunds are issued via the original payment method (card, UPI, bank transfer, etc.).</li>
          <li>Depending on your bank/payment provider, it may take 5–10 business days for the refund to reflect in your account.</li>
          <li>In cases where replacement is possible, you may choose between a refund, store credit, or exchange.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Non-Returnable Items</h2>
        <p className="mb-4">We cannot accept returns for:</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Custom or personalized items</li>
          <li>Opened cosmetics or beauty products</li>
          <li>Items damaged due to misuse or improper handling by the customer</li>
          <li>Products returned without original packaging or invoice</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Exceptions</h2>
        <p className="mb-2">Refunds or replacements will not be provided if:</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Claims are raised after the 48-hour reporting window.</li>
          <li>The product shows signs of use, tampering, or physical damage caused after delivery.</li>
          <li>Orders are delayed due to courier/logistics partner issues beyond our control.</li>
        </ul>

        <div className="bg-muted p-6 rounded-lg mt-12">
          <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
          <p className="mb-4">For cancellations, returns, or refund support, please contact:</p>
          <address className="not-italic">
            <p className="font-semibold">ABU Accessories</p>
            <p>📍 No.509, 1st BLOCK, Ph-2, Muthamizh Nagar, Chennai, Tamil Nadu – 600118</p>
            <p>📞 Phone: <a href="tel:+919080923823" className="text-blue-600 hover:underline">+91 90809 23823</a></p>
            <p>📧 Email: <a href="mailto:contact@abuaccessories.shop" className="text-blue-600 hover:underline">contact@abuaccessories.shop</a></p>
            <p>🌐 Website: <a href="https://www.abuaccessories.shop" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.abuaccessories.shop</a></p>
          </address>
          <p className="mt-4 text-sm text-muted-foreground">Our customer support team is available Mon–Sat, 10 AM – 7 PM IST to assist you.</p>
        </div>
      </section>
    </main>
  );
}
