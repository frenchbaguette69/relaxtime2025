"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchBar } from "../Searchbar";

export default function Header() {
  const { itemCount, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Relax-Time Logo"
            width={140}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Search bar */}
        <div className="hidden md:flex flex-1 justify-center px-8 max-w-2xl">
          <SearchBar onProductClick={(slug) => router.push(`/product/${slug}`)} />
        </div>

        {/* Desktop nav + icons */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-6 text-sm font-medium text-black">
            <Link href="/producten" className="hover:text-blue-700">Collectie</Link>
            <Link href="/blog" className="hover:text-blue-700">Blog</Link>
            <Link href="/over-ons" className="hover:text-blue-700">Over Ons</Link>
            <Link href="/contact" className="hover:text-blue-700">Contact</Link>
          </nav>
          <Link href="/admin" className="text-black hover:text-blue-700">
            <User className="h-5 w-5" />
          </Link>
          <button
            onClick={openCart}
            className="relative text-black hover:text-blue-700"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-900 text-xs text-white">
                {itemCount}
              </span>
            )}
          </button>
        </div>

        {/* Hamburger (mobile only) */}
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-black hover:text-blue-700">
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-white shadow-md md:hidden"
          >
            <ul className="flex flex-col space-y-4 px-6 py-4 text-sm font-medium text-blue-900">
              <li><Link href="/producten" onClick={() => setMenuOpen(false)}>Collectie</Link></li>
              <li><Link href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link></li>
              <li><Link href="/over-ons" onClick={() => setMenuOpen(false)}>Over Ons</Link></li>
              <li><Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
              <li><Link href="/admin" onClick={() => setMenuOpen(false)}>Mijn Account</Link></li>
              <li>
                <button
                  onClick={() => {
                    openCart();
                    setMenuOpen(false);
                  }}
                  className="flex items-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Winkelwagen ({itemCount})</span>
                </button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
