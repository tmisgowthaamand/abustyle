import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | ABU Accessories',
  description: 'Learn how we protect your personal information and respect your privacy.',
};

export default function PrivacyPolicy() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <p className="mb-6 text-muted-foreground">Last updated: September 11, 2024</p>
      
      <section className="mb-12">
        <p className="mb-6">
          At ABU Accessories, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase from our store.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          We collect personal information that you provide to us when you make a purchase, create an account, or contact us. This may include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Name, email address, phone number, and shipping/billing address</li>
          <li>Payment information (processed securely through our payment processor)</li>
          <li>Order history and preferences</li>
          <li>Communication preferences</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">We use the information we collect to:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Process and fulfill your orders</li>
          <li>Communicate with you about your orders and account</li>
          <li>Respond to your customer service inquiries</li>
          <li>Improve our products and services</li>
          <li>Send you marketing communications (if you've opted in)</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Information Sharing</h2>
        <p className="mb-6">
          We do not sell or share your personal information with third parties except as described in this Privacy Policy. We may share your information with:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Service providers who assist with our business operations</li>
          <li>Payment processors to complete your transactions</li>
          <li>Shipping carriers to deliver your orders</li>
          <li>When required by law or to protect our rights</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Your Rights</h2>
        <p className="mb-6">
          You have the right to access, update, or delete your personal information. You may also opt out of marketing communications at any time by following the unsubscribe link in our emails or contacting us directly.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Security</h2>
        <p className="mb-6">
          We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to This Policy</h2>
        <p className="mb-6">
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p className="mt-2">
          <strong>Email:</strong> privacy@abustylestories.com<br />
          <strong>Phone:</strong> +91 90809 23823
        </p>
      </section>
    </main>
  );
}
