"use client";

import Image from "next/image";
import { Loader2, Search } from "lucide-react";

export function SearchResults({
  results,
  isLoading,
  query,
  onSelect,
}: {
  results: any[];
  isLoading: boolean;
  query: string;
  onSelect: (slug: string) => void;
}) {
  if (isLoading) {
    return (
      <div className="absolute top-full mt-1 w-full bg-white rounded-md shadow-lg border z-50">
        <div className="flex items-center justify-center p-4">
          <Loader2 className="h-5 w-5 animate-spin text-gray-400 mr-2" />
          <span>Zoeken...</span>
        </div>
      </div>
    );
  }

  if (query && query.length >= 2 && results.length === 0) {
    return (
      <div className="absolute top-full mt-1 w-full bg-white rounded-md shadow-lg border z-50">
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <Search className="h-10 w-10 text-gray-300 mb-2" />
          <p className="text-gray-600 font-medium">Geen producten gevonden</p>
          <p className="text-gray-400 text-sm">Voor "{query}"</p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-full mt-1 w-full bg-white rounded-md shadow-lg border z-50 max-h-[400px] overflow-y-auto">
      <div className="flex flex-col divide-y divide-gray-100">
        {results.map((product) => (
          <button
            key={product.id}
            onClick={() => onSelect(product.slug)}
            className="flex items-center p-3 hover:bg-gray-50 text-left w-full"
          >
            <div className="w-12 h-12 relative flex-shrink-0 rounded bg-gray-100 overflow-hidden">
              <Image
                src={product.images?.[0] || "/placeholder.png"}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">
                {product.title}
              </p>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-green-600 font-semibold">
                  €{(product.price / 100).toFixed(2).replace(".", ",")}
                </span>
                {product.model && (
                  <span className="text-xs text-gray-500">Art: {product.model}</span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
