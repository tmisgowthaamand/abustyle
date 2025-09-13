import { useState, useEffect } from "react";
import { Search, ShoppingCart, User, X, LogOut, Settings, Package } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartDrawer } from "@/components/CartDrawer";
import { useCartContext } from "@/providers/CartProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCartContext();

  // Dummy user data
  const dummyUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    isLoggedIn: true
  };

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

  // Handle search functionality
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      
      // Check if search matches category names and redirect accordingly
      if (query === 'cosmetics' || query === 'cosmetic') {
        navigate('/cosmetics');
      } else if (query === 'toys' || query === 'toy') {
        navigate('/toys');
      } else if (query === 'accessories' || query === 'accessory') {
        navigate('/accessories');
      } else if (query === 'bags' || query === 'bag') {
        navigate('/bags');
      } else {
        // Navigate to search results for other queries
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      }
      
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery("");
    }
  };

  // Handle account actions
  const handleAccountAction = (action: string) => {
    switch (action) {
      case 'profile':
        navigate('/profile');
        break;
      case 'orders':
        navigate('/orders');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'logout':
        // Handle logout logic here
        console.log('User logged out');
        break;
      default:
        break;
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100/50 transition-all duration-300 ${
        isScrolled ? "shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)] bg-white/95" : ""
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 group">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-gray-700 group-hover:to-gray-500 transition-all duration-300">
              ABU Style Stories
            </h1>
          </Link>

          {/* Category Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className={`text-sm font-semibold transition-all duration-300 relative group px-3 py-2 rounded-lg hover:bg-gray-50/80 ${
                  isCategoryActive(category.path) 
                    ? `text-[${category.color}] bg-gray-50/60` 
                    : 'text-gray-700 hover:text-gray-900'
                }`}
                style={{
                  color: isCategoryActive(category.path) ? category.color : undefined
                }}
              >
                {category.name}
                <span 
                  className="absolute bottom-1 left-3 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-[calc(100%-1.5rem)]"
                  style={{ backgroundColor: category.color }}
                ></span>
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <div className="flex items-center">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center space-x-1">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-44 h-8 text-sm border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-100 rounded-md"
                    autoFocus
                  />
                  <Button type="submit" variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100/80 rounded-md">
                    <Search className="h-4 w-4 text-gray-600" />
                  </Button>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 hover:bg-gray-100/80 rounded-md"
                    onClick={toggleSearch}
                  >
                    <X className="h-4 w-4 text-gray-600" />
                  </Button>
                </form>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 hover:bg-gray-100/80 rounded-md"
                  onClick={toggleSearch}
                >
                  <Search className="h-4 w-4 text-gray-600" />
                </Button>
              )}
            </div>
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 hover:bg-gray-100/80 rounded-md transition-all duration-200 relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-4 w-4 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium shadow-lg">
                  {itemCount}
                </span>
              </Button>
            </div>
            {/* Account Dropdown */}
            {dummyUser.isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100/80 rounded-md transition-all duration-200">
                    <User className="h-4 w-4 text-gray-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{dummyUser.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {dummyUser.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleAccountAction('profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAccountAction('orders')}>
                    <Package className="mr-2 h-4 w-4" />
                    <span>My Orders</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAccountAction('settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleAccountAction('logout')}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100/80 rounded-md transition-all duration-200">
                <User className="h-4 w-4 text-gray-600" />
              </Button>
            )}
          </div>
        </div>
      </div>
      <CartDrawer isOpen={isCartOpen} onOpenChange={setIsCartOpen} />
    </nav>
  );
};

export default Navigation;