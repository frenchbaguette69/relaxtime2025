// components/products/ProductsPage.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ProductsGrid from "./ProductsGrid";
import ProductFilters from "./ProductFilters";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type { Product, Category } from "@prisma/client";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Get current filter values from URL
  const categoryId = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sort = searchParams.get("sort") || "price-low";

  const fetchProducts = useCallback(async (params: URLSearchParams) => {
    setLoading(true);

    // Create URL with current filters
    const apiUrl = new URL("/api/products", window.location.origin);
    apiUrl.search = params.toString();

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      setProducts(data.products);
      setCategories(data.categories);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchProducts(searchParams);
  }, [fetchProducts, searchParams]);

  // Update filters without page refresh
  const updateFilters = useCallback(
    (filters: Record<string, string>) => {
      // Create new URLSearchParams object based on current params
      const params = new URLSearchParams(searchParams);

      // Update the params with new filter values
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      router.push(`${pathname}?${params.toString()}`, { scroll: false });

      // Immediately fetch products with new filters
      fetchProducts(params);
    },
    [fetchProducts, pathname, router, searchParams],
  );

  const clearFilters = useCallback(() => {
    // Clear all filters
    router.push(pathname, { scroll: false });

    // Fetch products without filters
    fetchProducts(new URLSearchParams());
  }, [fetchProducts, pathname, router]);

  const hasActiveFilters = categoryId || minPrice || maxPrice;

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      {/* Mobile filters */}
      <div className="mb-4 flex items-center justify-between lg:hidden">
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <div className="h-full overflow-y-auto py-4">
              <ProductFilters
                categories={categories}
                selectedCategoryId={categoryId}
                minPrice={minPrice}
                maxPrice={maxPrice}
                sort={sort}
                updateFilters={updateFilters}
                onClose={() => setMobileFiltersOpen(false)}
              />
            </div>
          </SheetContent>
        </Sheet>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            className="text-blue-900"
            onClick={clearFilters}
          >
            <X size={16} className="mr-2" />
            Wis filters
          </Button>
        )}
      </div>

      {/* Desktop filters */}
      <div className="hidden w-full max-w-[280px] shrink-0 lg:block">
        <div className="sticky top-20">
          <ProductFilters
            categories={categories}
            selectedCategoryId={categoryId}
            minPrice={minPrice}
            maxPrice={maxPrice}
            sort={sort}
            updateFilters={updateFilters}
          />

          {hasActiveFilters && (
            <Button
              variant="outline"
              className="mt-4 w-full text-blue-900"
              onClick={clearFilters}
            >
              <X size={16} className="mr-2" />
              Wis filters
            </Button>
          )}
        </div>
      </div>

      {/* Products grid */}
      <div className="flex-1">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            {loading
              ? "Producten laden..."
              : `${products.length} producten gevonden`}
          </p>
          <div className="hidden sm:block">
            <select
  value={sort}
  onChange={(e) => updateFilters({ sort: e.target.value })}
  className="rounded-md border p-2 text-sm"
>
  <option value="price-low">Prijs: laag naar hoog</option>
  <option value="price-high">Prijs: hoog naar laag</option>
  <option value="newest">Nieuwste eerst</option>
</select>

          </div>
        </div>

        <ProductsGrid products={products} loading={loading} />
      </div>
    </div>
  );
}
