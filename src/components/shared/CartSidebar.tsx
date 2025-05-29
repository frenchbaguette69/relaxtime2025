// components/shared/CartSidebar.tsx
"use client";

import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import Link from "next/link";

export default function CartSidebar() {
  const {
    items,
    subtotal,
    total,
    removeItem,
    updateQuantity,
    clearCart,
    isOpen,
    closeCart,
  } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="flex w-full flex-col px-6 sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold text-blue-900">
            Winkelwagen
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center space-y-4 py-12">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
            <p className="text-center text-lg font-medium text-gray-600">
              Uw winkelwagen is leeg
            </p>
            <Button
              variant="outline"
              className="mt-4 border-blue-900 text-blue-900 hover:bg-blue-50"
              onClick={closeCart}
            >
              Producten bekijken
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-6">
              <ul className="divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.product.id} className="py-4">
                    <div className="flex items-start space-x-4">
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_SITE_URL}/${item.product.images[0]}`}
                          alt={item.product.title}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <h3 className="font-medium text-blue-900">
                          {item.product.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {formatPrice(
                            item.product.offerPrice || item.product.price,
                          )}
                        </p>
                      </div>
                      <div className="flex flex-col-reverse items-end gap-4 space-y-2">
                        <div className="flex items-center rounded-lg border border-gray-200">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none text-blue-900"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none text-blue-900"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-red-500 hover:text-red-700"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between py-1">
                <span className="text-sm text-gray-600">Subtotaal</span>
                <span className="text-sm font-medium">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-sm text-gray-600">Verzendkosten</span>
                <span className="text-sm font-medium">Gratis</span>
              </div>
              <div className="flex justify-between py-2 font-semibold text-[#0a1e3b]">
                <span>Totaal</span>
                <span>{formatPrice(total)}</span>
              </div>

              <SheetFooter className="mt-4 flex-col space-y-2 sm:space-y-2">
                <Link href={"/checkout"}>
                  <Button
                    onClick={closeCart}
                    className="w-full bg-[#0a1e3b] hover:bg-blue-800"
                  >
                    Afrekenen
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={clearCart}
                >
                  Winkelwagen leegmaken
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
