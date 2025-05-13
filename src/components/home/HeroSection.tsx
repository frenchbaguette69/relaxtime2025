// components/home/HeroSection.tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="w-full bg-blue-50 py-12 md:py-20">
      <div className="container mx-auto grid items-center gap-8 px-4 md:grid-cols-2">
        <div className="space-y-6">
          <h1 className="text-4xl leading-tight font-bold text-blue-900 md:text-5xl lg:text-6xl">
            Ontdek Ultieme Ontspanning Thuis
          </h1>
          <p className="max-w-md text-lg text-gray-700">
            Onze premium massagestoelen bieden therapeutische voordelen en
            helpen stress te verminderen voor een gezonder leven.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button className="bg-blue-900 px-8 py-6 text-lg text-white hover:bg-blue-800">
              Ontdek Collectie
            </Button>
            <Button
              variant="outline"
              className="border-blue-900 px-8 py-6 text-lg text-blue-900 hover:bg-blue-50"
            >
              Advies op Maat
            </Button>
          </div>
          <div className="flex items-center space-x-8 pt-4">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-900"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-2 text-gray-700">5 jaar garantie</span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-900"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-2 text-gray-700">Gratis bezorging</span>
            </div>
          </div>
        </div>
        <div className="relative h-[300px] overflow-hidden rounded-lg md:h-[500px]">
          <Image
            src="https://images.unsplash.com/photo-1563298723-dcfebaa392e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Premium massagestoel voor optimale ontspanning"
            fill
            style={{ objectFit: "cover" }}
            priority
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
