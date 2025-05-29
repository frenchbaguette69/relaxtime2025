import Script from "next/script";
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
          <Script id="webwinkelkeur-config" strategy="afterInteractive">
  {`
    _webwinkelkeur_sidebar = true;
    _webwinkelkeur_sidebar_position = "left";
    _webwinkelkeur_sidebar_top = "300";
    _webwinkelkeur_sidebar_theme = "dark";
    _webwinkelkeur_mobile = "top_bar";
    _webwinkelkeur_mobile_tab = "left";
    _webwinkelkeur_tooltip = true;
    _webwinkelkeur_language = "nl";
  `}
</Script>
<Script
  id="webwinkelkeur-script"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      (function(n,r){
        var e=document.createElement("script");
        e.async=!0;
        e.src=n+"/sidebar.js?id="+r+"&c="+c(10,r);
        var t=document.getElementsByTagName("script")[0];
        t.parentNode.insertBefore(e,t);
        function c(s,i){
          var o=Date.now(),a=s*6e4,_=(Math.sin(i)||0)*a;
          return Math.floor((o+_)/a)
        }
      })("https://dashboard.webwinkelkeur.nl", 1219550);
    `,
  }}
/>
          <CartSidebar />
          <Footer />
          <Toaster position="top-center" richColors />
        </CartProvider>
      </div>
    </>
  );
}
