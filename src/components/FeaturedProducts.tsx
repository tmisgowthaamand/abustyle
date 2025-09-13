import { ProductCard } from "@/components/ProductCard";
import { formatPrice } from "@/lib/utils";
import { ProductCategory } from "@/types/product";

const FeaturedProducts = () => {
  const products = [
    {
      id: "1",
      title: "Premium Rose Lipstick Set",
      price: 2499,
      compareAtPrice: 3499,
      category: "cosmetics" as ProductCategory,
      tags: ["New", "Bestseller"],
      image: "/images/Home/1.jpg",
      rating: 4.8,
      reviews: 124,
      isHero: true,
    },
    {
      id: "2",
      title: "Educational Building Blocks",
      price: 1899,
      compareAtPrice: 2599,
      category: "toys" as ProductCategory,
      tags: ["Educational", "Bestseller"],
      image: "/images/Home/2.jpg",
      rating: 4.7,
      reviews: 89,
    },
    {
      id: "3",
      title: "Gold Plated Chain Necklace",
      price: 5999,
      compareAtPrice: 8499,
      category: "accessories" as ProductCategory,
      tags: ["New", "Luxury"],
      image: "/images/Accessories/2.jpg",
      rating: 4.9,
      reviews: 156,
    },
    {
      id: "4",
      title: "Genuine Leather Crossbody Bag",
      price: 7999,
      compareAtPrice: 10999,
      category: "bags" as ProductCategory,
      tags: ["Premium", "Handmade"],
      image: "/images/Home/4.jpg",
      rating: 4.8,
      reviews: 203,
    },
    {
      id: "5",
      title: "Premium Plush Teddy Bear",
      price: 2199,
      compareAtPrice: 2999,
      category: "toys" as ProductCategory,
      tags: ["Soft", "Cuddly"],
      image: "/images/Toys/2.jpg",
      rating: 4.6,
      reviews: 78,
    },
    {
      id: "6",
      title: "Diamond Stud Earring Set",
      price: 15999,
      compareAtPrice: 19999,
      category: "accessories" as ProductCategory,
      tags: ["Luxury", "Elegant"],
      image: "/images/Home/3.jpg",
      rating: 4.9,
      reviews: 142,
    },
  ];

  const heroProduct = products.find(p => p.isHero);
  const otherProducts = products.filter(p => !p.isHero);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium products, each chosen for quality and style.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              name={product.title}
              ratio="square"
              categoryAccent={
                product.category === 'cosmetics' ? '#e11d48' :
                product.category === 'toys' ? '#3b82f6' :
                product.category === 'accessories' ? '#10b981' : '#8b5cf6'
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
