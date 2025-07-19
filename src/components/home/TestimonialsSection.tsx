// components/home/TestimonialsSection.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import TestimonialCard from "@/components/shared/TestimonialCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Jan de Vries",
      location: "Amsterdam",
      rating: 5,
      text: "Na jaren van rugklachten heeft deze massagestoel mijn leven veranderd. De drukpuntmassage is precies wat ik nodig had. Ik gebruik hem elke dag na het werk.",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      product: "Luxe Full-Body Massagestoel",
    },
    {
      id: 2,
      name: "Marieke Jansen",
      location: "Utrecht",
      rating: 5,
      text: "Perfect voor mijn thuiskantoor. De massagestoel helpt me om te ontspannen tijdens mijn werkpauzes. De klantenservice was ook uitstekend bij de levering.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      product: "Compact Relaxfauteuil",
    },
    {
      id: 3,
      name: "Pieter Bakker",
      location: "Rotterdam",
      rating: 4,
      text: "Aanvankelijk twijfelde ik of de investering het waard zou zijn, maar ik heb er geen spijt van. De stoel heeft geholpen bij mijn nekspanning en slaapproblemen.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      product: "Premium Massagestoel 3D",
    },
    {
      id: 4,
      name: "Annemiek de Boer",
      location: "Den Haag",
      rating: 5,
      text: "De beste aankoop die ik ooit heb gedaan! De hele familie maakt er gebruik van en de kwaliteit is geweldig. Zeer eenvoudig in gebruik en veelzijdig.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      product: "Luxe Full-Body Massagestoel",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => {
      window.removeEventListener("resize", updateVisibleCount);
    };
  }, []);

  const maxIndex = testimonials.length - visibleCount;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= maxIndex ? maxIndex : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? 0 : prevIndex - 1));
  };

  return (
    <section className="w-full bg-blue-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-blue-900 md:text-4xl">
            Wat Onze Klanten Zeggen
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Ontdek waarom onze klanten kiezen voor Massagestoel-kopen.com massagestoelen
          </p>
        </div>

        <div className="relative">
          <div ref={containerRef} className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4 md:w-1/2 lg:w-1/3"
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-blue-900 text-blue-900 hover:bg-blue-100 disabled:opacity-50"
              onClick={prevSlide}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-blue-900 text-blue-900 hover:bg-blue-100 disabled:opacity-50"
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
