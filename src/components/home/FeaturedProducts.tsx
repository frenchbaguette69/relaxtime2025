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
    <section
  className="w-full bg-gray-50 py-16"
  aria-labelledby="bestverkocht-heading"
>
  <div className="container mx-auto px-4">
    <div className="mb-10 text-center md:text-left">
      <h2
        id="bestverkocht-heading"
        className="text-4xl font-bold text-[#0a1e3b]"
      >
        Best Verkochte Massagestoelen
      </h2>
      <p className="mt-2 max-w-xl text-gray-600">
        Deze massagestoelen worden het meest gekocht door onze klanten. Perfect
        voor wie op zoek is naar{" "}
        <strong>direct comfort en hoogwaardige ontspanning</strong>. Ontdek waarom
        zij populair zijn bij mensen die een <strong>massagestoel kopen</strong>.
      </p>
    </div>

    <div
      className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      role="list"
    >
      {featuredProducts.map((product) => (
        <article key={product.id} role="listitem">
          <ProductCard product={product} />
        </article>
      ))}
    </div>
  </div>
</section>
  );
}
