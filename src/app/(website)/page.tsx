// app/page.tsx
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ContactSection from "@/components/home/ContactSection";
import FaqSection from "@/components/home/FaqSection";
import UspBar from "@/components/home/UspBar";
import CategorySection from "@/components/home/categorysection";
import AboutChair from "@/components/home/aboutchair";
import Cta from "@/components/home/cta";

export const metadata = {
  title: "Massagestoel Kopen? Ontdek Massagestoel-kopen.com Premium Collectie | Gratis Levering & Installatie",
  description: "Koop uw massagestoel bij Massagestoel-kopen.com. Ervaar ultieme ontspanning met onze premium modellen. Gratis bezorging, installatie & 5 jaar garantie. Betaal in termijnen!",
  keywords: "massagestoelen, ontspanning, massage, rugmassage, massagefauteuil, Massagestoel-kopen.com, massagestoel kopen, zero gravity, SL-track, luxe massagestoel",
  openGraph: {
    title: "Massagestoel-kopen.com | Premium Massagestoelen met Gratis Levering & 5 Jaar Garantie",
    description: "Bekijk onze collectie massagestoelen met Zero Gravity, SL-track en ingebouwde verwarming. Probeer 14 dagen risicoloos.",
    url: "https://Massagestoel-kopen.com",
    type: "website",
    images: [
      {
        url: "https://Massagestoel-kopen.com/comfort.webp", // pas aan naar ideale OG image
        width: 1200,
        height: 630,
        alt: "Massagestoel kopen bij Massagestoel-kopen.com",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Massagestoel kopen? Ontdek de beste modellen bij Massagestoel-kopen.com",
    description: "Ervaar ultieme ontspanning met onze luxe massagestoelen – gratis bezorging, installatie en 5 jaar garantie.",
    images: ["https://Massagestoel-kopen.com/comfort.webp"], // zelfde als OG image
  },
};


export default function Home() {
  return (
    <>
      {/* ✅ Structured Data: Product + Review + Organization */}
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Massagestoel-kopen.com",
      url: "https://Massagestoel-kopen.com",
      logo: "https://Massagestoel-kopen.com/logo.svg", // pas aan indien anders
      sameAs: [
        "https://www.facebook.com/relax-time",
        "https://www.instagram.com/relax-time",
        "https://www.youtube.com/@relaxtime" // indien beschikbaar
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+31-123456789",
        contactType: "Customer Service",
        areaServed: "NL",
        availableLanguage: ["Dutch"],
      },
    }),
  }}
/>

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Massagestoel-kopen.com",
      url: "https://Massagestoel-kopen.com",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://Massagestoel-kopen.com/zoeken?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    }),
  }}
/>


      <main className="">
        {/* ✅ Hero met H1 voor SEO */}
        <section aria-label="Introductie">
          <HeroSection />
        </section>

        <section aria-label="Voordelen" className="w-full">
          <UspBar />
        </section>

        <div className="w-full border-t border-gray-200" />

        <section aria-label="Categorieën" className="w-full">
          <CategorySection />
        </section>

        <section aria-label="Aanbevolen Massagestoelen" className="w-full">
          <FeaturedProducts />
        </section>

        <section aria-label="Waarom een massagestoel?" className="w-full">
          <AboutChair />
        </section>

        <section aria-label="Contact & Advies" className="w-full">
          <ContactSection />
        </section>

        <section aria-label="Proefzitten of kopen?" className="w-full">
          <Cta />
        </section>

        <section aria-label="Veelgestelde vragen" className="w-full">
          <FaqSection />
        </section>
      </main>
    </>
  );
}
