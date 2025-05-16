// components/layout/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ShoppingCart, Menu, X, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import type { Category } from "@prisma/client";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="container mx-auto grid grid-cols-3 items-center px-4 py-4">
        {/* Logo (Left) */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/relax-logo.png"
              alt="Relax-Time"
              width={150}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation (Center) */}
        <div className="flex items-center justify-center">
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-blue-900 hover:text-blue-700">
                  Massagestoelen
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <NavigationMenuLink asChild>
                          <Link
                            passHref
                            href={`/producten?category=${category.id}`}
                            className="block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-blue-100 hover:text-blue-900 focus:bg-blue-100 focus:text-blue-900"
                          >
                            <div className="text-sm leading-none font-medium">
                              {category.name}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                              {category.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/producten" passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Producten
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/over-ons" passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Over Ons
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Actions (Right) */}
        <div className="flex items-center justify-end space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="hidden text-blue-900 hover:text-blue-700 md:flex"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden text-blue-900 hover:text-blue-700 md:flex"
          >
            <User className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative text-blue-900 hover:text-blue-700"
            onClick={openCart}
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-900 text-xs text-white">
                {itemCount}
              </span>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-blue-900 hover:text-blue-700 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute w-full border-b border-gray-200 bg-white shadow-lg lg:hidden">
          <nav className="container mx-auto px-4 py-3">
            <ul className="space-y-3">
              <li>
                <Link
                  href="/categorie/massagestoelen"
                  className="block py-2 font-medium text-blue-900 hover:text-blue-700"
                >
                  Massagestoelen
                </Link>
              </li>
              <li>
                <Link
                  href="/aanbiedingen"
                  className="block py-2 text-blue-900 hover:text-blue-700"
                >
                  Aanbiedingen
                </Link>
              </li>
              <li>
                <Link
                  href="/over-ons"
                  className="block py-2 text-blue-900 hover:text-blue-700"
                >
                  Over Ons
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block py-2 text-blue-900 hover:text-blue-700"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
