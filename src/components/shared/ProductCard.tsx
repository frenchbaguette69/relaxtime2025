"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import type { Product } from "@prisma/client";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { slug, title, summary, price, offerPrice, images } = product;
  const { addItem } = useCart();

  return (
    <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
      <div className="relative h-64 w-full">
        <Image
          src={images[0] || "/placeholder.jpg"}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-300 hover:scale-105"
        />
        {offerPrice && (
          <div className="absolute top-4 right-4 rounded-md bg-red-500 px-2 py-1 text-sm font-medium text-white">
            Aanbieding
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="mb-2 text-xl font-semibold text-blue-900">{title}</h3>
        <p className="mb-4 text-sm text-gray-600">{summary}</p>

        <div className="mb-4 flex items-center justify-between">
          <div>
            {offerPrice ? (
              <div className="flex items-center">
                <span className="text-xl font-bold text-blue-900">
                  {formatPrice(offerPrice)}
                </span>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  {formatPrice(price)}
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold text-blue-900">
                {formatPrice(price)}
              </span>
            )}
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            className="flex-1 bg-blue-900 hover:bg-blue-800"
            onClick={() => addItem(product)}
          >
            In Winkelwagen
          </Button>
          <Link href={`/products/${slug}`}>
            <Button
              variant="outline"
              className="border-blue-900 text-blue-900 hover:bg-blue-50"
            >
              Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
