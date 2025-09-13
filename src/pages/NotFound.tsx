import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Home, Search, ShoppingBag, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const popularCategories = [
    { name: "Cosmetics", href: "/cosmetics", icon: "💄" },
    { name: "Toys", href: "/toys", icon: "🧸" },
    { name: "Accessories", href: "/accessories", icon: "💎" },
    { name: "Bags", href: "/bags", icon: "👜" }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            {/* 404 Illustration */}
            <div className="mb-8">
              <div className="text-8xl font-bold text-primary/20 mb-4">404</div>
              <div className="w-32 h-32 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                <Search className="h-16 w-16 text-muted-foreground" />
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Oops! Page Not Found
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              The page you're looking for doesn't exist or has been moved. 
              Don't worry, let's get you back on track to find what you need.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="flex items-center gap-2">
                <Link to="/">
                  <Home className="h-4 w-4" />
                  Go to Homepage
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="flex items-center gap-2">
                <Link to="/categories">
                  <ShoppingBag className="h-4 w-4" />
                  Browse Categories
                </Link>
              </Button>
            </div>

            {/* Popular Categories */}
            <div className="bg-muted rounded-2xl p-8">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Popular Categories
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {popularCategories.map((category, index) => (
                  <Link
                    key={index}
                    to={category.href}
                    className="bg-card hover:bg-card/80 rounded-lg p-4 text-center transition-colors duration-200 group"
                  >
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <span className="text-sm font-medium text-foreground group-hover:text-primary">
                      {category.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">
                Still can't find what you're looking for?
              </p>
              <Button asChild variant="link">
                <Link to="/contact" className="flex items-center gap-2 mx-auto">
                  Contact our support team
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
