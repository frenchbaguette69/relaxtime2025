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
    <section
  className="w-full bg-white py-20 px-4"
  aria-labelledby="category-heading"
>
  <div className="container mx-auto mb-12 text-center md:text-left">
    <h2
      id="category-heading"
      className="mb-4 text-4xl font-bold text-[#0a1e3b]"
    >
      Massagestoel Collecties voor Iedere Woonruimte & Budget
    </h2>
    <p className="max-w-2xl text-gray-600">
      Van compacte massagestoelen tot luxe full-body modellen – ontdek onze
      zorgvuldig geselecteerde categorieën om de perfecte{" "}
      <strong>massagestoel</strong> te kopen.
    </p>
  </div>

  <div className="container mx-auto grid grid-cols-1 gap-6 md:grid-cols-3">
    {categories.map((cat) => (
      <article
        key={cat.id}
        className="relative group h-[280px] md:h-[320px] overflow-hidden rounded-lg"
        role="listitem"
        aria-label={`Categorie ${cat.name}`}
      >
        <Link
          href={`/producten?category=${cat.id}`}
          className="absolute inset-0 z-10"
        >
          <span className="sr-only">Bekijk {cat.name}</span>
        </Link>

        {/* Achtergrondfoto */}
        {cat.cover ? (
          <Image
            src={cat.cover}
            alt={`Massagestoel categorie: ${cat.name}`}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 h-full w-full bg-gray-200" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6 py-6 text-white">
          <h3 className="text-xl font-semibold">{cat.name}</h3>
          {cat.description && (
            <p className="mb-4 line-clamp-2 text-sm text-gray-200">
              {cat.description}
            </p>
          )}
          <Button
            variant="ghost"
            className="w-fit gap-2 px-0 font-semibold text-white hover:bg-transparent hover:underline"
          >
            Bekijk Collectie <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </article>
    ))}
  </div>
</section>

  );
}
