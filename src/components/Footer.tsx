import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { name: "Shop All", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const policyLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Shipping Policy", href: "/shipping" },
    { name: "Cancellation & Refund", href: "/cancellation-refund" },
  ];

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "TikTok", icon: () => (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
      </svg>
    ), href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
  ];

  const mallLocations = [
    {
      name: "ABU Style Stories",
      address: "No.509, 1st BLOCK, Ph-2, Muthamizh Nagar, Chennai, Tamil Nadu, 600118",
      hours: "10 AM - 9 PM",
    },
  ];

  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Logo & Tagline */}
          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">ABU Accessories</h3>
            <p className="text-footer-foreground/80 leading-relaxed">
              Style for Every Story — from stalls to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-footer-foreground/80 hover:text-footer-foreground transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-6">Policies</h4>
            <ul className="space-y-3">
              {policyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-footer-foreground/80 hover:text-footer-foreground transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit Our Stalls */}
          <div className="md:col-span-2 lg:col-span-3">
            <h4 className="text-lg font-semibold mb-6">Visit Our Stalls</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mallLocations.map((location, index) => (
                <div key={index} className="space-y-2">
                  <h5 className="font-semibold text-footer-foreground">
                    {location.name}
                  </h5>
                  <p className="text-sm text-footer-foreground/80">
                    {location.address}
                  </p>
                  <p className="text-sm text-footer-foreground/80">
                    Hours: {location.hours}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-footer-foreground/20">
              <p className="text-sm text-footer-foreground/80 mb-2">
                <strong>Phone:</strong> +91 90809 23823
              </p>
              <p className="text-sm text-footer-foreground/80">
                <strong>Email:</strong> contact@abuaccessories.shop
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section - Social Icons */}
        <div className="mt-12 pt-8 border-t border-footer-foreground/20">
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="p-3 bg-footer-foreground/10 hover:bg-footer-foreground/20 rounded-full transition-colors duration-300 group"
                aria-label={social.name}
              >
                <social.icon className="h-5 w-5 text-footer-foreground/80 group-hover:text-footer-foreground transition-colors duration-300" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="text-sm text-footer-foreground/60">
            © 2024 ABU Accessories. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;