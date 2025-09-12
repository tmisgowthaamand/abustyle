import { useEffect } from 'react';

export default function TermsAndConditions() {
  useEffect(() => {
    document.title = 'Terms & Conditions | ABU Accessories';
  }, []);

  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
      <p className="mb-6 text-muted-foreground">Last Updated: August 2025</p>
      
      <section className="mb-12 space-y-6">
        <p>
          Welcome to ABU Accessories. By accessing our website (abuaccessories.shop), visiting our store, or making a purchase, you agree to comply with the following Terms & Conditions. These terms govern all sales, services, and interactions with ABU Accessories.
        </p>
        <p>
          If you do not agree with any part of these terms, please discontinue use of our services.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. General Use of Services</h2>
        <p>
          By engaging with ABU Accessories, you confirm that you are at least 18 years of age or using our services under the supervision of a legal guardian.
        </p>
        <p>
          You agree to provide accurate and complete details while shopping, whether in-store or online.
        </p>
        <p>
          Misuse of our platform, fraudulent activity, or abuse of staff may result in refusal of service.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Products & Pricing</h2>
        <p>
          All products (jewelry, handbags, cosmetics, and accessories) are described and photographed to the best of our ability. Slight variations in color or finish may occur due to lighting or screen resolution.
        </p>
        <p>
          Prices are listed in Indian Rupees (INR ₹) and are subject to change without prior notice.
        </p>
        <p>
          Errors in product details or pricing may occasionally occur; we reserve the right to correct such errors, cancel affected orders, and issue refunds if payment has already been made.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Orders & Payments</h2>
        <p>
          Orders are confirmed only after successful payment via secure channels.
        </p>
        <p>
          Accepted payment methods include UPI, debit/credit cards, net banking, and wallets.
        </p>
        <p>
          ABU Accessories does not store payment details; all transactions are processed via secure, PCI-compliant payment gateways.
        </p>
        <p>
          In case of payment errors or duplicate charges, please notify us immediately for correction.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Shipping & Delivery</h2>
        <p>
          Orders are shipped across India via trusted courier/logistics partners.
        </p>
        <p>
          Estimated delivery timelines are provided at checkout and may vary by location.
        </p>
        <p>
          Tracking details are shared once your order has been dispatched.
        </p>
        <p>
          ABU Accessories is not liable for delays caused by courier partners, public holidays, or unforeseen disruptions.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Cancellations & Returns</h2>
        <p>
          Orders may be cancelled within 2 hours of purchase, provided they have not yet been packed or dispatched.
        </p>
        <p>
          Returns are accepted only in cases of:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Damaged items upon delivery</li>
          <li>Incorrect product shipped</li>
          <li>Verified manufacturing defects</li>
        </ul>
        <p>
          For detailed terms, refer to our Cancellation & Refund Policy.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. User Responsibilities</h2>
        <p>
          By shopping with us, you agree not to:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Provide false contact or delivery details</li>
          <li>Resell our products without prior written approval</li>
          <li>Copy or misuse our product designs, images, or branding</li>
          <li>Engage in fraudulent claims or chargebacks</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Intellectual Property</h2>
        <p>
          All content, including logos, product designs, images, text, and branding, is the intellectual property of ABU Accessories. Unauthorized use or reproduction is strictly prohibited.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Limitation of Liability</h2>
        <p>
          ABU Accessories shall not be liable for:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Minor variations in product color or size</li>
          <li>Delays caused by third-party courier services</li>
          <li>Indirect, incidental, or consequential damages arising from the use of our products or services</li>
        </ul>
        <p>
          Our liability is limited strictly to the value of the product purchased.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Governing Law & Jurisdiction</h2>
        <p>
          These Terms & Conditions are governed by the laws of India. Any disputes shall fall under the jurisdiction of the courts in Chennai, Tamil Nadu.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Us</h2>
        <p>
          For assistance or queries, please contact:
        </p>
        <address className="not-italic mt-4">
          <p className="font-semibold">ABU Accessories</p>
          <p>No.509, 1st BLOCK, Ph-2, Muthamizh Nagar,</p>
          <p>Chennai, Tamil Nadu – 600118</p>
          <p>Phone: <a href="tel:+919080923823" className="text-blue-600 hover:underline">+91 90809 23823</a></p>
          <p>Email: <a href="mailto:contact@abuaccessories.shop" className="text-blue-600 hover:underline">contact@abuaccessories.shop</a></p>
          <p className="mt-2">🌐 Website: <a href="https://www.abuaccessories.shop" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.abuaccessories.shop</a></p>
        </address>
      </section>
    </main>
  );
}
