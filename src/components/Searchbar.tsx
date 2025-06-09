"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { SearchResults } from "./SearchResult";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  onProductClick?: (slug: string) => void;
}

export function SearchBar({ onProductClick }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounced = useDebounce(query, 300);
  const router = useRouter();

  useEffect(() => {
    if (debounced.length < 2) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(debounced)}`);
        const data = await res.json();
        setResults(data);
        setIsOpen(true);
      } catch (e) {
        console.error("Zoekfout", e);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debounced]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const clear = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-xl">
      <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white">
        <Search className="h-5 w-5 text-gray-400 mr-2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Zoek massageproduct..."
          className="w-full bg-transparent text-sm focus:outline-none"
          onFocus={() => query.length >= 2 && setIsOpen(true)}
        />
        {query && (
          <X
            className="h-5 w-5 text-gray-400 cursor-pointer"
            onClick={clear}
          />
        )}
      </div>

      {isOpen && (
        <SearchResults
          results={results}
          isLoading={loading}
          query={debounced}
          onSelect={(slug) => {
            router.push(`/producten/${slug}`);
            clear();
          }}
        />
      )}
    </div>
  );
}
