// components/products/ProductsPageSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsPageSkeleton() {
  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      {/* Desktop filters skeleton */}
      <div className="hidden w-full max-w-[280px] shrink-0 lg:block">
        <div className="space-y-8">
          <div>
            <Skeleton className="mb-4 h-6 w-24" />
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          </div>
          <div>
            <Skeleton className="mb-4 h-6 w-24" />
            <Skeleton className="mb-4 h-10 w-full" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      </div>

      {/* Products grid skeleton */}
      <div className="flex-1">
        <div className="mb-6 flex items-center justify-between">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="hidden h-10 w-40 sm:block" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
            >
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
          ))}
        </div>
      </div>
    </div>
  );
}
