// app/page.tsx
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BenefitsSection from "@/components/home/BenefitsSection";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ContactSection from "@/components/home/ContactSection";
import ComparisonSection from "@/components/home/ComparisonSection";
import FaqSection from "@/components/home/FaqSection";

export const metadata = {
  title: "Relax-Time | Premium Massagestoelen voor Thuis en Kantoor",
  description:
    "Ontdek de beste massagestoelen voor optimale ontspanning. Hoogwaardige kwaliteit, deskundig advies en snelle levering in heel Nederland.",
  keywords:
    "massagestoelen, ontspanning, massage, rugmassage, massagefauteuil, relax-time",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HeroSection />
      <FeaturedProducts />
      <ComparisonSection />
      <BenefitsSection />
      <CategoryShowcase />
      <TestimonialsSection />
      <ContactSection />
      <FaqSection />
    </main>
  );
}
