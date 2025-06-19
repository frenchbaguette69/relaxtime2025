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
      <div className="relative h-48 sm:h-64 md:h-80 w-full z-0">
        <Image
          src={`${process.env.NEXT_PUBLIC_SITE_URL}/${images[0]}`}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-300 group-hover:scale-105"
        />
        {offerPrice && (
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 rounded-md bg-red-500 px-2 py-1 text-xs sm:text-sm font-medium text-white z-20">
            <span className="hidden sm:inline"> </span>Bespaar {formatPrice(price - offerPrice)}

          </div>
        )}
        
      </div>

      {/* Content */}
      <div className="relative z-20 p-3 sm:p-4 md:p-5 pointer-events-none">
        <h3 className="mb-2 text-sm sm:text-base md:text-xl font-semibold text-[#0a1e3b] line-clamp-2 leading-tight">
          {title}
        </h3>
        
        {/* Hide summary on mobile to save space, show on larger screens */}
        <p className="mb-3 text-xs sm:text-sm text-gray-600 line-clamp-2 hidden sm:block">
          {summary}
        </p>

        <div className="mb-3 sm:mb-4 flex items-center justify-between">
          <div>
            {offerPrice ? (
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                <span className="text-lg sm:text-xl font-bold text-red-600">
                  {formatPrice(offerPrice)}
                </span>
                <span className="text-xs sm:text-sm text-gray-500 line-through">
                  {formatPrice(price)}
                </span>
              </div>
            ) : (
              <span className="text-lg sm:text-xl font-bold text-[#0a1e3b]">
                {formatPrice(price)}
              </span>
            )}
          </div>
        </div>

        {/* Mobile optimized button */}
        <div className="flex">
          <Button
            className="flex-1 bg-[#0a1e3b] hover:bg-[#0c2549] text-white pointer-events-auto text-xs sm:text-sm py-2 sm:py-3 px-3 sm:px-4 rounded-md"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem(product);
            }}
          >
            <span className="hidden sm:inline">In Winkelwagen</span>
            <span className="sm:hidden">Toevoegen</span>
          </Button>
        </div>
      </div>
    </div>
  );
}