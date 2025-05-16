// app/product/[slug]/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProductNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="mb-4 text-3xl font-bold text-blue-900">
        Product niet gevonden
      </h1>
      <p className="mb-8 text-gray-600">
        Het product dat u zoekt bestaat niet of is niet meer beschikbaar.
      </p>
      <Button asChild className="bg-blue-900 hover:bg-blue-800">
        <Link href="/producten">Bekijk alle producten</Link>
      </Button>
    </div>
  );
}
