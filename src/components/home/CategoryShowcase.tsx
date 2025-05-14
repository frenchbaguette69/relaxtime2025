// components/home/CategoryShowcase.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function CategoryShowcase() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-blue-900 md:text-4xl">
            Ontdek Onze Collecties
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Voor elke behoefte en ruimte hebben wij de perfecte massagestoel
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`grid items-center gap-8 md:grid-cols-2 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="relative h-[300px] overflow-hidden rounded-lg md:h-[400px]">
                  <Image
                    src={category.cover || "/placeholder.jpg"}
                    alt={category.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-lg transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              <div
                className={`${index % 2 === 1 ? "md:order-1" : ""} space-y-6`}
              >
                <h3 className="text-2xl font-bold text-blue-900 md:text-3xl">
                  {category.name}
                </h3>
                <p className="text-lg text-gray-600">{category.description}</p>
                <ul className="space-y-2">
                  {category.specs.map((spec, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-5 w-5 text-blue-900"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {spec}
                    </li>
                  ))}
                </ul>
                <Link href={`/categorie/${category.name}`} passHref>
                  <Button className="bg-blue-900 px-6 py-3 text-white hover:bg-blue-800">
                    Bekijk de collectie
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
