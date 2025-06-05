// components/products/ProductFilters.tsx
import { useId } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatPrice } from "@/lib/utils";
import type { Category } from "@prisma/client";

interface ProductFiltersProps {
  categories: Category[];
  selectedCategoryId: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
  updateFilters: (filters: Record<string, string>) => void;
  onClose?: () => void;
}

export default function ProductFilters({
  categories,
  selectedCategoryId,
  minPrice,
  maxPrice,
  sort,
  updateFilters,
  onClose,
}: ProductFiltersProps) {
  const priceRangeId = useId();

  // These would ideally come from your data or configuration
  const MIN_PRICE = 0;
  const MAX_PRICE = 50000; // €500 in cents

  const currentMinPrice = minPrice ? parseInt(minPrice) : MIN_PRICE;
  const currentMaxPrice = maxPrice ? parseInt(maxPrice) : MAX_PRICE;

  const handlePriceChange = (values: number[]) => {
    const [min, max] = values;

    // Only update if values have actually changed
    if (min !== currentMinPrice || max !== currentMaxPrice) {
      // Don't set min if it's the default
      const minPriceParam = min === MIN_PRICE ? "" : min!.toString();
      // Don't set max if it's the default
      const maxPriceParam = max === MAX_PRICE ? "" : max!.toString();

      updateFilters({
        minPrice: minPriceParam,
        maxPrice: maxPriceParam,
      });
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    updateFilters({ category: categoryId });
    onClose?.();
  };

  const handleSortChange = (newSort: string) => {
    updateFilters({ sort: newSort });
    onClose?.();
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-[#0a1e3b]">
          Categorieën
        </h3>
        <div className="space-y-2">
          <div
            className={`cursor-pointer rounded-md p-2 ${!selectedCategoryId ? "bg-blue-100 font-medium text-blue-900" : "hover:bg-gray-100"}`}
            onClick={() => handleCategoryChange("")}
          >
            Alle producten
          </div>
          {categories.map((category) => (
            <div
              key={category.id}
              className={`cursor-pointer rounded-md p-2 ${
                selectedCategoryId === category.id
                  ? "bg-blue-100 font-medium text-blue-900"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>

      

      <div className="sm:hidden">
  <h3 className="mb-4 text-lg font-semibold text-blue-900">Sorteren</h3>
  <RadioGroup
    value={sort}
    onValueChange={handleSortChange}
    className="space-y-2"
  >
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="price-low" id="sort-price-low" />
      <Label htmlFor="sort-price-low">Prijs: laag naar hoog</Label>
    </div>
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="price-high" id="sort-price-high" />
      <Label htmlFor="sort-price-high">Prijs: hoog naar laag</Label>
    </div>
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="newest" id="sort-newest" />
      <Label htmlFor="sort-newest">Nieuwste eerst</Label>
    </div>
  </RadioGroup>
</div>

    </div>
  );
}
