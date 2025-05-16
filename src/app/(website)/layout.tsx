// app/layout.tsx
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import CartSidebar from "@/components/shared/CartSidebar";
import { Toaster } from "sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Relax-Time | Premium Massagestoelen",
  description: "De beste massagestoelen voor thuis en op kantoor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        className={cn(
          "min-h-screen bg-white font-sans antialiased",
          fontSans.variable,
        )}
      >
        <CartProvider>
          <Header />
          {children}
          <CartSidebar />
          <Footer />
          <Toaster position="top-center" richColors />
        </CartProvider>
      </div>
    </>
  );
}
