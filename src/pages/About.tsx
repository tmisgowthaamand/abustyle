import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowLeft } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-white hover:bg-gray-50 border-gray-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
        <Breadcrumbs items={breadcrumbItems} />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Story</h1>
        
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Welcome to ABU Accessories</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                At ABU Accessories, we believe that style is a powerful form of self-expression. 
                What started as a small stall has grown into a beloved destination for those who 
                appreciate unique, high-quality accessories that tell a story.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Our journey began with a simple mission: to bring carefully curated accessories 
                that combine quality, affordability, and trendsetting designs to fashion-forward 
                individuals across Chennai and beyond.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/images/about-us-1.jpg" 
                alt="ABU Accessories store" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality First",
                description: "We carefully select each piece in our collection to ensure it meets our high standards of quality and craftsmanship.",
                icon: "✨"
              },
              {
                title: "Affordable Style",
                description: "We believe that looking great shouldn't break the bank. Our accessories offer exceptional value without compromising on style.",
                icon: "💰"
              },
              {
                title: "Customer Love",
                description: "Your satisfaction is our top priority. We're committed to providing exceptional service at every step of your shopping journey.",
                icon: "❤️"
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl font-semibold mb-4">Visit Our Stalls</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                While we've expanded our presence online, we still cherish the personal 
                connections made at our physical stalls. Visit us to experience our collection 
                in person and meet our friendly team.
              </p>
              <div className="space-y-4 mt-8">
                <div>
                  <h4 className="font-semibold">Our Location</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    No.509, 1st BLOCK, Ph-2, <br />
                    Muthamizh Nagar, <br />
                    Chennai, Tamil Nadu, 600118
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Business Hours</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Monday - Sunday: 10 AM - 9 PM
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Contact Us</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Phone: +91 90809 23823 <br />
                    Email: contact@abuaccessories.shop
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 rounded-lg overflow-hidden shadow-lg">
              {/* Replace with your actual store image */}
              <div className="bg-gray-200 dark:bg-gray-700 h-full min-h-[400px] flex items-center justify-center">
                <span className="text-gray-500">Store Image</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <h2 className="text-2xl font-semibold mb-6">Ready to Explore Our Collection?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover the perfect accessories to complement your style and express your unique personality.
          </p>
          <Button asChild size="lg">
            <Link to="/">Shop Now</Link>
          </Button>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default About;
