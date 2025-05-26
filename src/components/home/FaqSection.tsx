"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqSection() {
  const faqs = [
    {
      question: "Hoe lang is de levertijd van massagestoelen?",
      answer:
        "De levertijd van onze massagestoelen is doorgaans 3-5 werkdagen voor producten die op voorraad zijn. Bij bestelling informeren wij u over de exacte levertijd. Voor grotere modellen bieden wij gratis bezorging en installatie aan.",
    },
    {
      question: "Wat is de garantieperiode op jullie massagestoelen?",
      answer:
        "Al onze massagestoelen worden geleverd met een standaard garantie van 2 jaar op het frame en 2 jaar op elektronica en bewegende delen. We bieden ook de mogelijkheid om deze garantie uit te breiden. Meer informatie hierover vindt u op onze garantiepagina.",
    },
    {
      question: "Kan ik een massagestoel eerst uitproberen?",
      answer:
        "Absoluut! Wij hebben een showroom in Amsterdam waar u alle modellen kunt uitproberen. Daarnaast bieden wij een 30 dagen niet-goed-geld-terug garantie, waardoor u de stoel thuis kunt testen. Maak een afspraak via onze contactpagina voor een persoonlijke demonstratie.",
    },
    {
      question: "Welke onderhoudsmaatregelen zijn nodig voor een massagestoel?",
      answer:
        "Onze massagestoelen zijn ontworpen voor minimaal onderhoud. We raden aan om de bekleding regelmatig te reinigen met een licht vochtige doek en milde zeep. Voor lederen stoelen is het aan te raden om twee keer per jaar een lederbehandeling toe te passen. Verder adviseren we om de stoel jaarlijks te laten controleren door onze technische dienst.",
    },
    {
      question: "Zijn de massagestoelen geschikt voor mensen met rugklachten?",
      answer:
        "Onze massagestoelen kunnen zeker helpen bij het verlichten van rugklachten. Ze zijn ontworpen om de spieren te ontspannen en de bloedcirculatie te verbeteren. Het is echter belangrijk om te benadrukken dat voor medische klachten altijd eerst een arts geraadpleegd moet worden. We hebben specifieke modellen die extra ondersteuning bieden voor mensen met rugklachten.",
    },
    {
      question: "Kan ik mijn oude massagestoel inruilen?",
      answer:
        "Jazeker, wij bieden een inruilprogramma aan waarbij u korting krijgt op uw nieuwe aankoop bij inruil van uw oude massagestoel. Neem contact met ons op voor een persoonlijke offerte en informatie over de mogelijkheden.",
    },
  ];

  return (
    <section id="faq" className="w-full bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#0a1e3b] md:text-4xl">
            Veelgestelde Vragen
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Antwoorden op de meest gestelde vragen over onze massagestoelen en
            diensten
          </p>
        </div>

        <div className="mx-auto max-w-3xl overflow-hidden rounded-xl bg-[#f8fafc] shadow-md">
          <Accordion
            type="single"
            collapsible
            className="w-full divide-y divide-gray-200"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="px-4"
              >
                <AccordionTrigger className="py-4 text-left font-medium text-[#0a1e3b] hover:text-blue-700 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-600">Heeft u een andere vraag?</p>
          <a
            href="#contact"
            className="font-medium text-[#0a1e3b] hover:underline"
          >
            Neem contact met ons op
          </a>
        </div>
      </div>
    </section>
  );
}
