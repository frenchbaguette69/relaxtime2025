// app/products/page.tsx
import { Suspense } from "react";
import type { Metadata } from "next";
import ProductsPage from "@/components/products/ProductsPage";
import ProductsPageSkeleton from "@/components/products/ProductsPageSkeleton";

export const metadata: Metadata = {
  title: "Producten | Relax-time.nl",
  description:
    "Ontdek ons assortiment van ontspanningsproducten voor een betere nachtrust en welzijn.",
};

export default function ProductsRoute() {
  return (
    <main className="container mx-auto min-h-screen px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-[#0a1e3b]">Onze Producten</h1>
      <Suspense fallback={<ProductsPageSkeleton />}>
        <ProductsPage />
      </Suspense>
    </main>
  );
}
