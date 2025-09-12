import { Shield, MapPin, Users } from "lucide-react";

const BrandIntro = () => {
  const trustBadges = [
    {
      icon: Users,
      text: "Trusted by 1000+ shoppers",
    },
    {
      icon: MapPin,
      text: "Mall stall presence",
    },
    {
      icon: Shield,
      text: "Wholesale & Retail available",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Style for Every Story
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At ABU Accessories, we believe that style is personal and unique to every individual. 
              From our humble beginnings as a mall stall to serving customers both wholesale and retail, 
              we've built our reputation on quality products and exceptional service.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you're looking for the perfect cosmetics to enhance your beauty routine, 
              playful toys for the little ones, elegant accessories to complete your look, 
              or premium leather bags that make a statement, we have something special for you.
            </p>
            
            {/* Trust Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-card rounded-lg shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <badge.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-card-foreground">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt="ABU Accessories mall stall with customers shopping"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">1000+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandIntro;