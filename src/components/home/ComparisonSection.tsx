// components/home/ComparisonSection.tsx
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ComparisonSection() {
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const products = [
    {
      id: 1,
      name: "Basis Model",
      price: 899,
      priceText: "€899",
      features: {
        fullBody: false,
        programs: "4 Programma's",
        aiScanning: false,
        heatTherapy: true,
        bluetooth: false,
        zero_g: "1 Positie",
        customMemory: false,
        intensity: "3 Niveaus",
        warranty: "2 Jaar",
      },
    },
    {
      id: 2,
      name: "Comfort Plus",
      price: 1499,
      priceText: "€1.499",
      popular: true,
      features: {
        fullBody: true,
        programs: "8 Programma's",
        aiScanning: false,
        heatTherapy: true,
        bluetooth: true,
        zero_g: "2 Posities",
        customMemory: true,
        intensity: "5 Niveaus",
        warranty: "3 Jaar",
      },
    },
    {
      id: 3,
      name: "Luxe Premium",
      price: 2199,
      priceText: "€2.199",
      features: {
        fullBody: true,
        programs: "12 Programma's",
        aiScanning: true,
        heatTherapy: true,
        bluetooth: true,
        zero_g: "3 Posities",
        customMemory: true,
        intensity: "8 Niveaus",
        warranty: "5 Jaar",
      },
    },
  ];

  const features = [
    {
      id: "fullBody",
      name: "Full Body Massage",
      description: "Volledige lichaamsmassage van hoofd tot voeten",
    },
    {
      id: "programs",
      name: "Massage Programma's",
      description: "Aantal voorgeïnstalleerde massageprogramma's",
    },
    {
      id: "aiScanning",
      name: "AI Lichaamsscanning",
      description: "Past massage automatisch aan op uw lichaamsbouw",
    },
    {
      id: "heatTherapy",
      name: "Warmtetherapie",
      description: "Ingebouwde verwarming voor extra ontspanning",
    },
    {
      id: "bluetooth",
      name: "Bluetooth Audio",
      description: "Ingebouwde speakers voor muziek via bluetooth",
    },
    {
      id: "zero_g",
      name: "Zero Gravity Posities",
      description: "Zwevende posities voor optimale drukverdeling",
    },
    {
      id: "customMemory",
      name: "Geheugenopslag",
      description: "Sla uw favoriete instellingen op",
    },
    {
      id: "intensity",
      name: "Massage Intensiteit",
      description: "Aanpasbare intensiteitsniveaus",
    },
    {
      id: "warranty",
      name: "Garantie",
      description: "Standaard garantieperiode",
    },
  ];

  // Show only first 5 features by default
  const visibleFeatures = showAllFeatures ? features : features.slice(0, 5);

  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-blue-900 md:text-4xl">
            Vergelijk Onze Modellen
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Vind de perfecte massagestoel die bij uw behoeften en budget past
          </p>
        </div>

        <div className="overflow-x-auto pb-4">
          <Table className="w-full min-w-[800px] border-collapse">
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-1/4 px-4 py-6 text-left text-gray-600">
                  Functies
                </TableHead>
                {products.map((product) => (
                  <TableHead
                    key={product.id}
                    className={`w-1/4 px-4 py-6 text-center font-bold ${
                      product.popular
                        ? "border-t-4 border-blue-900 bg-blue-50"
                        : ""
                    }`}
                  >
                    {product.popular && (
                      <div className="mb-2 text-sm font-medium text-blue-900">
                        Meest Gekozen
                      </div>
                    )}
                    <div className="text-xl text-blue-900">{product.name}</div>
                    <div className="mt-2 text-2xl font-bold text-blue-900">
                      {product.priceText}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleFeatures.map((feature) => (
                <TableRow
                  key={feature.id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <TableCell className="px-4 py-4">
                    <div className="font-medium text-blue-900">
                      {feature.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {feature.description}
                    </div>
                  </TableCell>
                  {products.map((product) => {
                    const featureValue =
                      product.features[
                        feature.id as keyof typeof product.features
                      ];

                    return (
                      <TableCell
                        key={`${product.id}-${feature.id}`}
                        className={`px-4 py-4 text-center ${
                          product.popular ? "bg-blue-50" : ""
                        }`}
                      >
                        {typeof featureValue === "boolean" ? (
                          featureValue ? (
                            <Check className="mx-auto text-green-500" />
                          ) : (
                            <X className="mx-auto text-red-500" />
                          )
                        ) : (
                          <span className="font-medium">{featureValue}</span>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {!showAllFeatures && (
          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              onClick={() => setShowAllFeatures(true)}
              className="text-blue-900 hover:bg-blue-50 hover:text-blue-700"
            >
              Toon Alle Specificaties
            </Button>
          </div>
        )}

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className={`rounded-lg border p-6 text-center shadow-md ${
                product.popular
                  ? "border-blue-900 ring-2 ring-blue-100"
                  : "border-gray-200"
              }`}
            >
              <h3 className="mb-1 text-xl font-bold text-blue-900">
                {product.name}
              </h3>
              <p className="mb-4 text-3xl font-bold text-blue-900">
                {product.priceText}
              </p>
              <Button className="w-full bg-blue-900 py-6 text-white hover:bg-blue-800">
                Bekijk Details
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
