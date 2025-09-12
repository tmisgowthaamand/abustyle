import { useState, useEffect } from "react";
import { Search, ShoppingCart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/CartDrawer";
import { useCart } from "@/hooks/use-cart";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    { name: "Cosmetics", path: "/cosmetics", color: "#E75480" },
    { name: "Toys", path: "/toys", color: "#3B82F6" },
    { name: "Accessories", path: "/accessories", color: "#D4AF37" },
    { name: "Bags", path: "/bags", color: "#8B4513" },
  ];

  // Check if current path matches a category
  const isCategoryActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm transition-all duration-300 ${
        isScrolled ? "shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-foreground">ABU Style Stories</h1>
          </Link>

          {/* Category Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className={`text-sm font-medium transition-colors duration-300 relative group ${
                  isCategoryActive(category.path) 
                    ? `text-[${category.color}]` 
                    : 'text-foreground hover:text-gray-600'
                }`}
                style={{
                  color: isCategoryActive(category.path) ? category.color : undefined
                }}
              >
                {category.name}
                <span 
                  className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: category.color }}
                ></span>
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hover:bg-accent">
              <Search className="h-5 w-5" />
            </Button>
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-accent relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="hover:bg-accent">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      <CartDrawer isOpen={isCartOpen} onOpenChange={setIsCartOpen} />
    </nav>
  );
};

export default Navigation;