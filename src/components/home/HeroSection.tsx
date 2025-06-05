"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaShippingFast, FaShieldAlt, FaClock } from "react-icons/fa";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="w-full bg-[#0a1e3b] py-12 md:py-20">
      <div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2">
        {/* Tekstgedeelte */}
        <div className="space-y-6">
          <span className="inline-block bg-white text-[#0a1e3b] text-sm font-medium px-4 py-1 rounded-full">
            Nieuw Assortiment 2025
          </span>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            Ontdek Ultieme <br />
            Ontspanning met Onze <br />
            Premium Massagestoelen
          </h1>
          <p className="max-w-xl text-gray-300 text-lg">
            Ervaar de perfecte balans tussen luxe, comfort en therapeutische
            voordelen met onze zorgvuldig geselecteerde massagestoelen.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href='/producten'>
            <Button className="bg-white text-[#0a1e3b] px-6 py-4 text-base font-semibold hover:bg-gray-100">
              Bekijk Collectie
            </Button>
            </Link>
            <Link href='/contact'>
            <Button
              variant="outline"
              className="border-white px-6 py-4 text-base hover:bg-white hover:text-[#0a1e3b]"
            >
              Advies op maat
            </Button>
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 pt-6 text-sm text-white">
            <div className="flex items-center gap-2">
              <FaShippingFast className="text-white" />
              Gratis Bezorging
            </div>
            <div className="flex items-center gap-2">
              <FaShieldAlt className="text-white" />
              2 Jaar Garantie
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-white" />
              14 Dagen Proefperiode
            </div>
          </div>
        </div>

        {/* Afbeelding */}
        <div className="hidden md:block relative h-[500px] md:h-[500px] rounded-full overflow-hidden bg-white/10">
  <Image
    src="/hero.png"
    alt="Massagestoel"
    fill
    className="object-contain p-4"
    priority
  />
</div>

      </div>
    </section>
  );
}
