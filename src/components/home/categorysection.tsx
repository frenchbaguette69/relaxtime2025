"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  cover: string | null;
  productCount: number;
};

export default function CategorySection() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    }

    fetchCategories();
  }, []);

  if (!categories.length) return null;

  return (
    <section className="w-full bg-white py-20 px-4">
      <div className="md:text-left container mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-[#0a1e3b] mb-4">
          Ontdek Onze Collecties Aan Massage Stoelen
        </h2>
        <p className="text-gray-600 max-w-2xl">
          Van compacte massagestoelen tot luxe full-body modellen, wij hebben
          voor elke ruimte en budget de perfecte oplossing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 container mx-auto">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/producten?category=${cat.id}`}
            className="relative rounded-lg overflow-hidden group h-[280px] md:h-[320px]"
          >
            {/* Achtergrondfoto */}
            {cat.cover ? (
              <Image
                src={cat.cover}
                alt={cat.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="bg-gray-200 h-full w-full absolute inset-0" />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6 py-6 flex flex-col justify-end text-white">
              <h3 className="text-xl font-semibold">{cat.name}</h3>
              <p className="text-sm text-gray-200 line-clamp-2 mb-4">
                {cat.description}
              </p>
              <Button
                variant="ghost"
                className="text-white px-0 font-semibold gap-2 hover:bg-transparent hover:underline w-fit"
              >
                Bekijk Collectie <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
