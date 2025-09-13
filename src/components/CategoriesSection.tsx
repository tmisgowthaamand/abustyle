import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CategoriesSection = () => {
  const navigate = useNavigate();
  const categories = [
    {
      title: "COSMETICS",
      tagline: "Luxury Beauty Picks",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      color: "cosmetics",
      gradient: "from-cosmetics/80 to-cosmetics/60",
      path: "/cosmetics"
    },
    {
      title: "TOYS",
      tagline: "Playful Adventures",
      image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      color: "toys",
      gradient: "from-toys/80 to-toys/60",
      path: "/toys"
    },
    {
      title: "ACCESSORIES",
      tagline: "Elegant Statements",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      color: "accessories",
      gradient: "from-accessories/80 to-accessories/60",
      path: "/accessories"
    },
    {
      title: "BAGS",
      tagline: "Premium Leather",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      color: "bags",
      gradient: "from-bags/80 to-bags/60",
      path: "/bags"
    },
  ];

  return (
    <section className="py-20 bg-muted/30" data-categories-section>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Categories
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse collection of products, each category carefully curated to meet your unique style needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              
              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-80 group-hover:opacity-70 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <h3 className="text-2xl font-bold mb-2 group-hover:transform group-hover:translate-y-0 transition-transform duration-300">
                  {category.title}
                </h3>
                <p className="text-sm mb-4 opacity-90">
                  {category.tagline}
                </p>
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="w-fit bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-300"
                  onClick={() => navigate(category.path)}
                >
                  Shop Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;