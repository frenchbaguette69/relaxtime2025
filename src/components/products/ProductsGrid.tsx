// components/products/ProductsGrid.tsx
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/shared/ProductCard";
import type { Product } from "@prisma/client";

interface ProductsGridProps {
  products: Product[];
  loading: boolean;
}

export default function ProductsGrid({ products, loading }: ProductsGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="mb-2 text-lg font-medium text-blue-900">
          Geen producten gevonden
        </h3>
        <p className="text-gray-600">
          Probeer andere filters of bekijk al onze producten.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <Skeleton className="h-64 w-full" />
      <div className="p-5">
        <Skeleton className="mb-2 h-6 w-3/4" />
        <Skeleton className="mb-4 h-4 w-full" />
        <Skeleton className="mb-4 h-8 w-1/3" />
        <div className="flex space-x-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  );
}
