// components/checkout/OrderSummary.tsx
"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function OrderSummary() {
  const { items, subtotal, total } = useCart();

  return (
    <div className="rounded-lg border border-gray-200 p-6">
      <h2 className="mb-4 text-xl font-semibold text-blue-900">
        Bestellingsoverzicht
      </h2>

      <div className="max-h-[400px] overflow-y-auto">
        <ul className="divide-y divide-gray-200">
          {items.map((item) => (
            <li key={item.product.id} className="flex py-4">
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                <Image
                  src={item.product.images[0] || "/placeholder.jpg"}
                  alt={item.product.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="ml-4 flex flex-1 flex-col">
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium text-blue-900">
                    {item.product.title}
                  </h3>
                  <p className="text-sm font-medium text-gray-900">
                    {formatPrice(
                      (item.product.offerPrice || item.product.price) *
                        item.quantity,
                    )}
                  </p>
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-sm text-gray-500">
                    Aantal: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatPrice(item.product.offerPrice || item.product.price)}{" "}
                    per stuk
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 space-y-2 border-t border-gray-200 pt-4">
        <div className="flex justify-between text-sm">
          <p>Subtotaal</p>
          <p>{formatPrice(subtotal)}</p>
        </div>
        <div className="flex justify-between text-sm">
          <p>Verzendkosten</p>
          <p>Gratis</p>
        </div>
        <div className="flex justify-between font-medium text-blue-900">
          <p>Totaal</p>
          <p>{formatPrice(total)}</p>
        </div>
      </div>
    </div>
  );
}
