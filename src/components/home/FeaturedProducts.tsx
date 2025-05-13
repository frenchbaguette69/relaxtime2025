// components/home/FeaturedProducts.tsx
import ProductCard from "@/components/shared/ProductCard";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function FeaturedProducts() {
  const featuredProducts = await prisma.product.findMany({
    include: {
      categories: true,
    },
  });

  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-blue-900 md:text-4xl">
            Populaire Massagestoelen
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Onze best verkochte massagestoelen, geselecteerd door onze tevreden
            klanten
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
