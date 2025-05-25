"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Product } from "@prisma/client";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { slug, title, summary, price, offerPrice, images } = product;
  const { addItem } = useCart();

  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
      {/* Clickable link over hele kaart */}
      <Link
        href={`/producten/${slug}`}
        className="absolute inset-0 z-10"
        aria-label={`Bekijk ${title}`}
      />

      {/* Afbeelding */}
      <div className="relative h-80 w-full z-0">
        <Image
          src={`${process.env.NEXT_PUBLIC_SITE_URL}/${images[0]}`}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-300 group-hover:scale-105"
        />
        {offerPrice && (
          <div className="absolute top-4 right-4 rounded-md bg-red-500 px-2 py-1 text-sm font-medium text-white z-20">
            Aanbieding
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-20 p-5 pointer-events-none">
        <h3 className="mb-2 text-xl font-semibold text-[#0a1e3b]">{title}</h3>
        <p className="mb-4 text-sm text-gray-600">{summary}</p>

        <div className="mb-4 flex items-center justify-between">
          <div>
            {offerPrice ? (
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-[#0a1e3b]">
                  {formatPrice(offerPrice)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(price)}
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold text-[#0a1e3b]">
                {formatPrice(price)}
              </span>
            )}
          </div>
        </div>

        {/* Alleen Winkelwagen knop */}
        <div className="flex">
          <Button
            className="flex-1 bg-[#0a1e3b] hover:bg-[#0c2549] text-white pointer-events-auto"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem(product);
            }}
          >
            In Winkelwagen
          </Button>
        </div>
      </div>
    </div>
  );
}
