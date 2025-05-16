// components/product/ProductDetails.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, ChevronRight, Truck, ShieldCheck, Share } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import ProductImageGallery from "./ProductImageGallery";
import TipTapRenderer from "./TipTapRenderer";
import type { Product, ProductSpec, Review } from "@prisma/client";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

interface FullProduct extends Product {
  specifications: ProductSpec[];
  categories: {
    category: {
      id: string;
      name: string;
    };
  }[];
  reviews: Review[];
}

export default function ProductDetails({ product }: { product: FullProduct }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const averageRating = product.reviews.length
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) /
      product.reviews.length
    : 0;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.quantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    console.log("Adding to cart:", product, quantity);
    if (product.quantity > 0) {
      addItem(product, quantity);
      toast.success("Product toegevoegd aan winkelwagen");
    } else {
      toast.error("Dit product is niet op voorraad");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-8">
        <ol className="flex flex-wrap items-center text-sm text-gray-500">
          <li className="flex items-center">
            <Link href="/" className="hover:text-blue-900">
              Home
            </Link>
          </li>
          <li className="mx-2 flex items-center">
            <ChevronRight size={14} />
          </li>
          <li className="flex items-center">
            <Link href="/producten" className="hover:text-blue-900">
              Producten
            </Link>
          </li>
          {product.categories[0]?.category && (
            <>
              <li className="mx-2 flex items-center">
                <ChevronRight size={14} />
              </li>
              <li className="flex items-center">
                <Link
                  href={`/producten?category=${product.categories[0].category.id}`}
                  className="hover:text-blue-900"
                  passHref
                >
                  {product.categories[0].category.name}
                </Link>
              </li>
            </>
          )}
          <li className="mx-2 flex items-center">
            <ChevronRight size={14} />
          </li>
          <li className="flex items-center font-medium break-all text-blue-900">
            {product.title}
          </li>
        </ol>
      </nav>
      {/* Product main section */}
      <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <ProductImageGallery images={product.images} title={product.title} />
        </div>

        <div>
          <h1 className="mb-2 text-3xl font-bold text-blue-900">
            {product.title}
          </h1>
          <p className="mb-4 text-sm text-gray-500">Model: {product.model}</p>

          {product.reviews.length > 0 && (
            <div className="mb-4 flex items-center">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    className={`${
                      star <= Math.round(averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                ({product.reviews.length}{" "}
                {product.reviews.length === 1 ? "review" : "reviews"})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="mb-6">
            {product.offerPrice ? (
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-2xl font-bold text-blue-900 sm:text-3xl">
                  {formatPrice(product.offerPrice)}
                </span>
                <span className="text-sm text-gray-500 line-through sm:text-lg">
                  {formatPrice(product.price)}
                </span>
                <span className="rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-600 sm:text-sm">
                  {Math.round((1 - product.offerPrice / product.price) * 100)}%
                  korting
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-blue-900 sm:text-3xl">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Short description */}
          <p className="mb-6 text-gray-700">{product.shortDescription}</p>

          {/* Quantity and Add to cart */}
          <div className="mb-6 flex items-center space-x-4">
            <div className="flex items-center rounded-md border border-gray-300">
              <button
                className="p-2 text-blue-900 hover:bg-blue-50"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="w-10 text-center">{quantity}</span>
              <button
                className="p-2 text-blue-900 hover:bg-blue-50"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.quantity}
              >
                +
              </button>
            </div>

            <Button
              className="flex-1 bg-blue-900 font-medium text-white hover:bg-blue-800"
              onClick={handleAddToCart}
              disabled={product.quantity === 0}
            >
              {product.quantity > 0 ? "In Winkelwagen" : "Niet op voorraad"}
            </Button>

            <Button
              variant="outline"
              className="p-2"
              onClick={() => {
                if (navigator.share) {
                  navigator
                    .share({
                      title: product.title,
                      text: product.shortDescription,
                      url: window.location.href,
                    })
                    .catch((err) => {
                      console.error("Error sharing:", err);
                    });
                } else {
                  // Fallback - copy URL to clipboard
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Link gekopieerd naar klembord");
                }
              }}
            >
              <Share size={20} className="text-blue-900" />
            </Button>
          </div>

          {/* Stock info */}
          <div className="mb-6">
            <div className="text-sm font-medium">
              {product.quantity > 10 ? (
                <p className="text-green-600">Op voorraad</p>
              ) : product.quantity > 0 ? (
                <p className="text-orange-600">
                  Nog {product.quantity} op voorraad
                </p>
              ) : (
                <p className="text-red-600">Niet op voorraad</p>
              )}
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-6 space-y-3 border-t border-b py-6 text-gray-700">
            <div className="flex items-center">
              <Truck size={20} className="mr-3 text-blue-900" />
              <span>Gratis verzending</span>
            </div>
            <div className="flex items-center">
              <ShieldCheck size={20} className="mr-3 text-blue-900" />
              <span>2 jaar garantie</span>
            </div>
          </div>

          {/* Categories */}
          {product.categories.length > 0 && (
            <div className="text-sm text-gray-600">
              <span className="font-medium">Categorieën: </span>
              {product.categories.map((cat, index) => (
                <span key={cat.category.id}>
                  <Link
                    href={`/producten?category=${cat.category.id}`}
                    className="hover:text-blue-900"
                  >
                    {cat.category.name}
                  </Link>
                  {index < product.categories.length - 1 && ", "}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Product tabs */}
      <Tabs defaultValue="description" className="mb-16">
        <div className="border-b border-gray-200">
          <TabsList className="h-auto w-full justify-start space-x-2 rounded-none bg-transparent p-0 md:space-x-8">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent px-1 py-3 text-sm font-medium text-gray-600 transition-colors data-[state=active]:border-b-blue-900 data-[state=active]:text-blue-900"
            >
              Beschrijving
            </TabsTrigger>
            <TabsTrigger
              value="specifications"
              className="rounded-none border-b-2 border-transparent px-1 py-3 text-sm font-medium text-gray-600 transition-colors data-[state=active]:border-b-blue-900 data-[state=active]:text-blue-900"
            >
              Specificaties
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent px-1 py-3 text-sm font-medium text-gray-600 transition-colors data-[state=active]:border-b-blue-900 data-[state=active]:text-blue-900"
            >
              Reviews ({product.reviews.length})
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="pt-6">
          <TabsContent
            value="description"
            className="prose max-w-none text-gray-700"
          >
            <TipTapRenderer content={product.description} />
          </TabsContent>

          <TabsContent value="specifications">
            {product.specifications.length > 0 ? (
              <div>
                {(() => {
                  // Group specifications
                  const groupedSpecs: Record<string, ProductSpec[]> = {};
                  const ungroupedSpecs: ProductSpec[] = [];

                  // Sort specifications into groups
                  product.specifications.forEach((spec) => {
                    if (spec.group) {
                      if (!groupedSpecs[spec.group]) {
                        groupedSpecs[spec.group] = [];
                      }
                      groupedSpecs[spec.group]!.push(spec);
                    } else {
                      ungroupedSpecs.push(spec);
                    }
                  });

                  return (
                    <div className="space-y-8">
                      {/* Render grouped specifications */}
                      {Object.entries(groupedSpecs).map(([group, specs]) => (
                        <div
                          key={group}
                          className="overflow-hidden rounded-md bg-white shadow"
                        >
                          <div className="bg-blue-50 px-6 py-3 text-black">
                            <h3 className="font-medium">
                              {group.toUpperCase()}
                            </h3>
                          </div>
                          <table className="min-w-full divide-y divide-gray-200">
                            <tbody className="divide-y divide-gray-200">
                              {specs.map((spec) => (
                                <tr key={spec.id}>
                                  <td className="w-1/3 bg-gray-50 px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                                    {spec.name}
                                  </td>
                                  <td className="px-6 py-4 text-sm whitespace-pre-wrap text-gray-700">
                                    {spec.value}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ))}

                      {/* Render ungrouped specifications if any */}
                      {ungroupedSpecs.length > 0 && (
                        <div className="overflow-hidden rounded-md bg-white shadow">
                          <div className="bg-gray-100 px-6 py-3">
                            <h3 className="font-medium text-gray-700">
                              Algemene specificaties
                            </h3>
                          </div>
                          <table className="min-w-full divide-y divide-gray-200">
                            <tbody className="divide-y divide-gray-200">
                              {ungroupedSpecs.map((spec) => (
                                <tr key={spec.id}>
                                  <td className="w-1/3 bg-gray-50 px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                                    {spec.name}
                                  </td>
                                  <td className="px-6 py-4 text-sm whitespace-pre-wrap text-gray-700">
                                    {spec.value}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            ) : (
              <p className="text-gray-600">Geen specificaties beschikbaar.</p>
            )}
          </TabsContent>

          <TabsContent value="reviews">
            {product.reviews.length > 0 ? (
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="mb-2 flex items-center">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={16}
                            className={`${
                              star <= review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 font-medium text-gray-800">
                        {review.authorName}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString("nl-NL")}
                      </span>
                    </div>
                    {review.comment && (
                      <p className="text-gray-700">{review.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p className="mb-4 text-gray-600">
                  Nog geen reviews. Wees de eerste!
                </p>
                <Button className="bg-blue-900 hover:bg-blue-800">
                  Schrijf een review
                </Button>
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
