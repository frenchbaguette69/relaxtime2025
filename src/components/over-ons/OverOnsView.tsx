// components/over-ons/OverOnsView.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Award,
  Truck,
  Clock,
  Shield,
  Users,
  ThumbsUp,
  LayoutGrid,
  ChevronRight,
  Zap,
  Star,
  BarChart4,
} from "lucide-react";

export default function OverOnsView() {
  const [activeTab, setActiveTab] = useState<"missie" | "kwaliteit" | "team">(
    "missie",
  );

  return (
    <main className="relative bg-gradient-to-b from-white to-blue-50">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-900/5"></div>
        <div className="absolute top-1/2 -left-48 h-96 w-96 rounded-full bg-blue-900/5"></div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 z-0 bg-blue-900 opacity-10"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-blue-900 md:text-5xl">
              Welkom bij Massagestoel-kopen.com
            </h1>
            <p className="mb-10 text-xl text-gray-700">
              Uw specialist in premium massagestoelen voor een betere kwaliteit
              van leven
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                className="rounded-full bg-blue-900 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-800"
              >
                <Link href="/contact">Neem contact op</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-blue-900 px-6 py-3 font-medium text-blue-900 transition-colors hover:bg-blue-50"
              >
                <Link href="/producten">Bekijk onze producten</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 h-32 w-32 rounded-full bg-blue-100"></div>
              <div className="absolute -right-4 -bottom-4 h-32 w-32 rounded-full bg-blue-100"></div>
              <div className="relative aspect-video overflow-hidden rounded-xl shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1611769446317-3e7a467fb35e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFzc2FnZSUyMGNoYWlyfGVufDB8fDB8fHww"
                  alt="Premium massagestoel van Massagestoel-kopen.com"
                  width={600}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="mb-6 text-3xl font-bold text-blue-900">
                Ons Verhaal
              </h2>
              <p className="mb-6 text-gray-700">
                Bij Massagestoel-kopen.com geloven we dat ontspanning geen luxe is, maar een
                noodzaak in ons drukke leven. Onze passie voor welzijn en
                innovatie heeft ons gebracht waar we nu zijn: een toonaangevende
                specialist in hoogwaardige massagestoelen in Nederland.
              </p>
              <p className="mb-6 text-gray-700">
                Sinds onze oprichting streven we ernaar om de beste
                massagebeleving naar uw huis te brengen. Onze collectie wordt
                zorgvuldig samengesteld met aandacht voor kwaliteit, design en
                de nieuwste technologieën, zodat u kunt genieten van een
                professionele massage in het comfort van uw eigen huis.
              </p>
              <p className="text-gray-700">
                Met persoonlijk advies, snelle levering en uitstekende service
                willen we ervoor zorgen dat u de perfecte massagestoel vindt die
                bij uw behoeften past. Want uw welzijn staat bij ons voorop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-blue-900">
              Ontdek Massagestoel-kopen.com
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Ervaar het verschil met massagestoelen die gemaakt zijn met passie
              voor kwaliteit en uw welzijn
            </p>
          </div>

          {/* Improved tab design without divider */}
          <div className="mb-10 flex justify-center overflow-x-auto">
            <div className="inline-flex rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setActiveTab("missie")}
                className={`rounded-lg px-6 py-3 font-medium transition-colors ${
                  activeTab === "missie"
                    ? "bg-white text-blue-900 shadow-sm"
                    : "text-gray-600 hover:bg-white/50 hover:text-blue-900"
                }`}
              >
                Onze Missie
              </button>
              <button
                onClick={() => setActiveTab("kwaliteit")}
                className={`rounded-lg px-6 py-3 font-medium transition-colors ${
                  activeTab === "kwaliteit"
                    ? "bg-white text-blue-900 shadow-sm"
                    : "text-gray-600 hover:bg-white/50 hover:text-blue-900"
                }`}
              >
                Kwaliteit & Service
              </button>
              <button
                onClick={() => setActiveTab("team")}
                className={`rounded-lg px-6 py-3 font-medium transition-colors ${
                  activeTab === "team"
                    ? "bg-white text-blue-900 shadow-sm"
                    : "text-gray-600 hover:bg-white/50 hover:text-blue-900"
                }`}
              >
                Ons Team
              </button>
            </div>
          </div>

          <div className="mt-10">
            {activeTab === "missie" && (
              <div className="grid items-center gap-10 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-2xl font-bold text-blue-900">
                    Onze Missie & Visie
                  </h3>
                  <p className="mb-4 text-gray-700">
                    Onze missie is om hoogwaardige massagestoelen toegankelijk
                    te maken voor iedereen. Wij geloven dat regelmatige
                    ontspanning essentieel is voor een gezonde levensstijl en
                    willen bijdragen aan het welzijn van onze klanten.
                  </p>
                  <p className="mb-6 text-gray-700">
                    Door innovatie, kwaliteit en service voorop te stellen,
                    streven we ernaar om de toonaangevende leverancier van
                    massagestoelen in Nederland te zijn. Onze visie is een
                    wereld waarin iedereen kan genieten van de voordelen van een
                    professionele massage, wanneer en waar ze maar willen.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mr-4 rounded-full bg-blue-100 p-2">
                        <Heart className="h-5 w-5 text-blue-900" />
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-900">
                          Persoonlijk Welzijn
                        </h4>
                        <p className="text-sm text-gray-600">
                          We geloven dat regelmatige ontspanning essentieel is
                          voor een gezond leven.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-4 rounded-full bg-blue-100 p-2">
                        <Award className="h-5 w-5 text-blue-900" />
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-900">
                          Premium Kwaliteit
                        </h4>
                        <p className="text-sm text-gray-600">
                          Wij bieden alleen massagestoelen van de hoogste
                          kwaliteit.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-4 rounded-full bg-blue-100 p-2">
                        <Users className="h-5 w-5 text-blue-900" />
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-900">
                          Inclusiviteit
                        </h4>
                        <p className="text-sm text-gray-600">
                          We streven ernaar om massagestoelen toegankelijk te
                          maken voor iedereen.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 rotate-3 transform rounded-xl bg-blue-900"></div>
                  <div className="relative overflow-hidden rounded-xl bg-white p-8 shadow-xl">
                    <blockquote className="text-gray-700 italic">
                      "Bij Massagestoel-kopen.com transformeren we uw woonkamer in een
                      persoonlijke wellness ruimte. Elke massagestoel is met
                      zorg geselecteerd om u de best mogelijke ervaring te
                      bieden, zodat u kunt genieten van de voordelen van een
                      professionele massage, wanneer u dat maar wilt."
                    </blockquote>
                    <div className="mt-6 flex items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                        <span className="font-bold text-blue-900">RT</span>
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-blue-900">
                          Directie
                        </div>
                        <div className="text-sm text-gray-500">Massagestoel-kopen.com</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "kwaliteit" && (
              <div className="grid gap-8 md:grid-cols-3">
                <QualityCard
                  icon={<Shield className="h-6 w-6" />}
                  title="5 jaar garantie op het mechanisme en 2 jaar op beweegbare onderdelen"
                  description="Wij staan achter de kwaliteit van onze producten en bieden daarom een uitgebreide garantie van  5 jaar garantie op het mechanisme en 2 jaar op beweegbare onderdelen."
                />
                <QualityCard
                  icon={<Truck className="h-6 w-6" />}
                  title="Gratis Bezorging"
                  description="Bij aankoop van een massagestoel zorgen wij voor gratis bezorging en installatie in heel Nederland."
                />
                <QualityCard
                  icon={<ThumbsUp className="h-6 w-6" />}
                  title="Ervaar het zelf"
                  description="Maak een afspraak en ervaar de kwaliteit van onze massagestoelen in onze showroom."
                />
                <QualityCard
                  icon={<Clock className="h-6 w-6" />}
                  title="Snelle Service"
                  description="Onze klantenservice staat voor u klaar en reageert snel op al uw vragen en opmerkingen."
                />
                <QualityCard
                  icon={<LayoutGrid className="h-6 w-6" />}
                  title="Ruim Assortiment"
                  description="Een breed aanbod aan massagestoelen met verschillende functies en prijsklassen."
                />
                <QualityCard
                  icon={<Users className="h-6 w-6" />}
                  title="Persoonlijk Advies"
                  description="Wij bieden deskundig advies om de massagestoel te vinden die het beste bij uw behoeften past."
                />
              </div>
            )}

            {activeTab === "team" && (
              <div className="space-y-12">
                <div className="text-center">
                  <p className="mx-auto max-w-3xl text-gray-700">
                    Ons team van specialisten staat voor u klaar met passie voor
                    kwaliteit en service. Wij zijn gepassioneerd over de
                    positieve impact die een goede massage kan hebben op uw
                    welzijn en delen graag onze kennis en expertise.
                  </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                  <TeamMember
                    name="Team Massagestoel-kopen.com"
                    role="Klaar om u te helpen"
                    description="Maak kennis met het team van Massagestoel-kopen.com - ervaren professionals die gepassioneerd zijn over massagestoelen en klantservice."
                  />
                  <TeamMember
                    name="Persoonlijk Advies"
                    role="Op maat gemaakte oplossingen"
                    description="Wij luisteren naar uw specifieke behoeften en helpen u de perfecte massagestoel te vinden die perfect bij u past."
                  />
                  <TeamMember
                    name="Service Team"
                    role="Altijd bereikbaar"
                    description="Ons serviceteam staat voor u klaar voor ondersteuning bij uw aankoop, levering, installatie en alle vragen die u heeft."
                  />
                </div>

                <div className="mt-12 text-center">
                  <Button
                    asChild
                    className="rounded-full bg-blue-900 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-800"
                  >
                    <Link href="/contact" className="inline-flex items-center">
                      Neem contact op met ons team{" "}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Values Section - Improved cards design */}
      <section className="bg-blue-900 py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-3xl font-bold">
              Waarom Kiezen voor Massagestoel-kopen.com?
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-blue-100">
              Een massagestoel van Massagestoel-kopen.com is meer dan een aankoop, het is
              een investering in uw welzijn
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <EnhancedValueCard
              icon={<Star className="h-7 w-7" />}
              title="Kwaliteit"
              description="Wij selecteren alleen massagestoelen van de hoogste kwaliteit, gemaakt met duurzame materialen."
            />
            <EnhancedValueCard
              icon={<Zap className="h-7 w-7" />}
              title="Innovatie"
              description="Onze stoelen zijn uitgerust met de nieuwste technologieën voor een optimale massage-ervaring."
              style="blue"
            />
            <EnhancedValueCard
              icon={<Users className="h-7 w-7" />}
              title="Service"
              description="Van advies tot installatie en onderhoud, we bieden service van het hoogste niveau."
              style="purple"
            />
            <EnhancedValueCard
              icon={<BarChart4 className="h-7 w-7" />}
              title="Welzijn"
              description="Wij geloven in de positieve impact van regelmatige ontspanning op uw fysieke en mentale welzijn."
              style="green"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="grid md:grid-cols-2">
              <div className="flex flex-col justify-center p-8 md:p-12">
                <h2 className="mb-6 text-3xl font-bold text-blue-900">
                  Klaar om uw eigen wellness ervaring te beginnen?
                </h2>
                <p className="mb-8 text-gray-600">
                  Maak een afspraak in onze showroom en ervaar zelf het comfort
                  en de kwaliteit van onze massagestoelen.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    asChild
                    className="rounded-full bg-blue-900 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-800"
                  >
                    <Link href="/contact">Maak een afspraak</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full border-blue-900 px-6 py-3 font-medium text-blue-900 transition-colors hover:bg-blue-50"
                  >
                    <Link href="/producten">Bekijk massagestoelen</Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-64 md:h-auto">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                  alt="Massagestoel-kopen.com showroom"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function QualityCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md transition-shadow duration-300 hover:translate-y-[-5px] hover:shadow-lg">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-900">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-blue-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function TeamMember({
  name,
  role,
  description,
}: {
  name: string;
  role: string;
  description: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md transition-shadow duration-300 hover:translate-y-[-5px] hover:shadow-lg">
      <div className="flex h-48 items-center justify-center bg-blue-100">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-200">
          <Users className="h-12 w-12 text-blue-900" />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-blue-900">{name}</h3>
        <p className="mb-4 text-blue-600">{role}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

// Enhanced Value Card with gradient backgrounds and better visuals
function EnhancedValueCard({
  icon,
  title,
  description,
  style = "default",
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  style?: "default" | "blue" | "purple" | "green";
}) {
  let gradientClass = "bg-gradient-to-br from-blue-700 to-blue-900";

  if (style === "blue") {
    gradientClass = "bg-gradient-to-br from-blue-600 to-indigo-800";
  } else if (style === "purple") {
    gradientClass = "bg-gradient-to-br from-indigo-600 to-purple-800";
  } else if (style === "green") {
    gradientClass = "bg-gradient-to-br from-blue-600 to-teal-700";
  }

  return (
    <div
      className={`${gradientClass} group relative overflow-hidden rounded-xl p-6 shadow-md transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg`}
    >
      <div className="absolute top-0 right-0 -mt-12 -mr-12 h-24 w-24 rounded-full bg-white/5 transition-transform duration-500 group-hover:scale-125"></div>

      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-white/10 p-3">
        {icon}
      </div>

      <h3 className="relative mb-3 text-xl font-semibold">{title}</h3>
      <p className="relative text-blue-100">{description}</p>

      <div className="absolute bottom-0 left-0 h-1 w-full bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
    </div>
  );
}
