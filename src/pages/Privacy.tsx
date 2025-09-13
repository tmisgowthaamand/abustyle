import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
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
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
        <p className="text-xl text-center mb-12 text-gray-600 dark:text-gray-300">
          Your Style, Your Privacy. Our Commitment.
        </p>

        <div className="prose dark:prose-invert max-w-none">
          <p className="mb-6">
            At ABU Accessories, we believe that fashion is personal—and so is your privacy. 
            Since our humble beginnings in Chennai in 2017, we've been committed not only to 
            delivering stylish, high-quality accessories but also to protecting the personal 
            data of every customer who shops with us in-store or online.
          </p>

          <p className="mb-12">
            This Privacy Policy explains what information we collect, how we use it, how we keep 
            it secure, and the choices available to you.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">Information We Collect</h2>
          <p className="mb-4">
            When you interact with us online or in-store, we may collect the following information:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Full Name</li>
            <li>Email Address & Phone Number</li>
            <li>Billing & Shipping Address</li>
            <li>Order History & Product Preferences</li>
            <li>Payment Details (processed via secure third-party gateways; we do not store card details)</li>
            <li>Device & Browser Information (for website analytics)</li>
            <li>Cookies & Tracking Data (for performance and personalized recommendations)</li>
          </ul>
          <p className="mb-12">
            We only collect the information necessary to process your orders, improve your shopping 
            experience, and provide relevant customer support.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">Why We Collect Your Information</h2>
          <p className="mb-4">We use the data you share with us for:</p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Processing purchases and ensuring secure transactions</li>
            <li>Delivering orders on time and providing tracking updates</li>
            <li>Offering personalized recommendations and style suggestions</li>
            <li>Communicating promotions, offers, and updates (only if you opt in)</li>
            <li>Improving our website and store experience</li>
            <li>Managing loyalty or discount programs</li>
            <li>Complying with legal and tax obligations</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4">How We Protect Your Information</h2>
          <p className="mb-4">Your data security is our responsibility. We maintain strict safeguards including:</p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>SSL Encryption across our website for secure data transfer</li>
            <li>PCI-Compliant Payment Gateways – we never store your card details</li>
            <li>Secure Servers & Firewalls to protect customer data</li>
            <li>Limited Access Protocols – only authorized staff handle sensitive information</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4">Your Rights & Choices</h2>
          <p className="mb-4">You have full control over your personal data. You can:</p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Request a copy of the information we hold about you</li>
            <li>Correct or update your details at any time</li>
            <li>Request deletion of your information (where legally permitted)</li>
            <li>Opt out of promotional communication by email, SMS, or WhatsApp</li>
            <li>Raise a complaint if you believe your data is being misused</li>
          </ul>
          <p className="mb-12">All verified requests are processed within 30 business days.</p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">Third-Party Sharing</h2>
          <p className="mb-12">
            We do not sell or rent customer data. Information may be shared only with:
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Courier/logistics partners (for deliveries)</li>
              <li>Payment processors (for secure transactions)</li>
              <li>Government authorities (only when legally required)</li>
            </ul>
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">Policy Updates</h2>
          <p className="mb-12">
            This Privacy Policy may be updated periodically to reflect changes in technology, 
            business practices, or legal requirements. The latest version will always be 
            available at abuaccessories.shop with a revised "Last Updated" date.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">Contact Us</h2>
          <p className="mb-2">If you have any questions, requests, or privacy concerns, please contact:</p>
          <address className="not-italic mb-8">
            ABU Accessories<br />
            No.509, 1st BLOCK, Ph-2, Muthamizh Nagar,<br />
            Chennai, Tamil Nadu, 600118<br />
            Email: <a href="mailto:contact@abuaccessories.shop" className="text-blue-600 hover:underline">contact@abuaccessories.shop</a><br />
            Phone: <a href="tel:+919080923823" className="text-blue-600 hover:underline">+91 90809 23823</a><br />
            Website: <a href="https://abuaccessories.shop" className="text-blue-600 hover:underline">www.abuaccessories.shop</a>
          </address>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-12">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last Updated: August 2025<br />
              © 2025 ABU Accessories. All Rights Reserved.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Privacy;
