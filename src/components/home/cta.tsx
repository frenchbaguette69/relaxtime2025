import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Cta() {
  return (
    <section className="w-full bg-[#0a1e3b] py-12">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        {/* Tekstgedeelte */}
        <div className="text-white text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Klaar om Ultieme Ontspanning te Ervaren?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl">
            Profiteer nu van onze speciale aanbiedingen en ervaar zelf het verschil van een premium massagestoel.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <Link href="/aanbiedingen">
            <Button variant="secondary" className="text-[#0a1e3b] bg-white hover:bg-gray-100">
              Bekijk Aanbiedingen
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="secondary" className="text-[#0a1e3b] bg-white hover:bg-gray-100">
              Vraag Advies aan
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
