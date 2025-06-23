import ProductCard from "@/components/shared/ProductCard";
import { PrismaClient } from "@prisma/client";
import { unstable_noStore } from "next/cache";

const prisma = new PrismaClient();

export default async function FeaturedProducts() {
  unstable_noStore();

  const featuredProducts = await prisma.product.findMany({
    include: {
      categories: true,
    },
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="md:text-left text-center mb-10">
          <h2 className="text-4xl font-bold text-[#0a1e3b]">Best verkochte massagestoelen</h2>
          <p className="text-gray-600 mt-2 max-w-xl">
            Onze meest populaire massagestoelen, geliefd om hun kwaliteit, comfort
            en therapeutische voordelen.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
