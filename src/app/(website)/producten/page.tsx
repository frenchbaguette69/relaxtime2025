// app/products/page.tsx
import { Suspense } from "react";
import type { Metadata } from "next";
import ProductsPage from "@/components/products/ProductsPage";
import ProductsPageSkeleton from "@/components/products/ProductsPageSkeleton";

export const metadata: Metadata = {
  title: "Massagestoel Kopen? Bekijk Alle Modellen | Relax-Time.nl",
  description:
    "Op zoek naar een massagestoel? Relax-Time.nl biedt hoogwaardige modellen met gratis levering, 5 jaar garantie en 14 dagen proefperiode.",
  keywords: [
    "massagestoel kopen",
    "massagestoelen",
    "massagefauteuil",
    "massagestoel aanbieding",
    "premium massagestoelen"
  ],
  openGraph: {
    title: "Massagestoel Kopen? Bekijk Alle Modellen | Relax-Time.nl",
    description:
      "Bekijk onze collectie massagestoelen. Gratis bezorging, 5 jaar garantie en 14 dagen proefperiode. Voor thuis of op kantoor.",
    url: "https://relax-time.nl/producten",
    type: "website",
  },
};


export default function ProductsRoute() {
  return (
    <main className="container mx-auto min-h-screen px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-[#0a1e3b]">Onze Producten</h1>
      <p className="mb-6 text-gray-600 max-w-2xl">
  Bent u op zoek naar een <strong>massagestoel</strong> die comfort, luxe en gezondheidsvoordelen combineert? Ontdek hieronder onze collectie hoogwaardige modellen – met <strong>gratis levering</strong>, <strong>5 jaar garantie</strong> en een <strong>14 dagen proefperiode</strong>.
</p>

      <Suspense fallback={<ProductsPageSkeleton />}>
        <ProductsPage />
      </Suspense>
    </main>
  );
}
