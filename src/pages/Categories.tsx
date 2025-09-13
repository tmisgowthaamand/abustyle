import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Palette, Baby, Gem, ShoppingBag, ArrowLeft } from "lucide-react";

const Categories = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    {
      name: "Cosmetics",
      description: "Premium beauty products and makeup essentials for every look",
      icon: Palette,
      href: "/cosmetics",
      color: "from-pink-500 to-rose-500",
      image: "/images/Cosmetics/1.jpg"
    },
    {
      name: "Toys",
      description: "Fun and educational toys for kids of all ages",
      icon: Baby,
      href: "/toys",
      color: "from-blue-500 to-indigo-500",
      image: "/images/Toys/1.jpg"
    },
    {
      name: "Accessories",
      description: "Elegant jewelry and accessories to complete your style",
      icon: Gem,
      href: "/accessories",
      color: "from-purple-500 to-violet-500",
      image: "/images/Accessories/1.jpg"
    },
    {
      name: "Bags",
      description: "Stylish bags and purses for every occasion",
      icon: ShoppingBag,
      href: "/bags",
      color: "from-amber-500 to-orange-500",
      image: "/images/Bags/1.jpg"
    }
  ];

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
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
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Shop by Category
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our carefully curated collections of premium products. 
              From beauty essentials to stylish accessories, find everything you need to express your unique style.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={index}
                  to={category.href}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Background Image */}
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder-product.svg';
                      }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-60 group-hover:opacity-50 transition-opacity duration-300`} />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <div className="flex items-center mb-2">
                      <IconComponent className="h-6 w-6 mr-2" />
                      <h3 className="text-2xl font-bold">{category.name}</h3>
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* Hover Arrow */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Additional Info Section */}
          <div className="bg-muted rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Why Shop with ABU Style Stories?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Quality Assured</h3>
                <p className="text-muted-foreground text-sm">Premium products carefully selected for quality and style</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Fast Delivery</h3>
                <p className="text-muted-foreground text-sm">Quick and reliable shipping to your doorstep</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Customer Care</h3>
                <p className="text-muted-foreground text-sm">Dedicated support for all your shopping needs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
