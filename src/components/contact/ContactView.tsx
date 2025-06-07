// components/contact/ContactView.tsx
"use client";

import { useState } from "react";
import ContactForm from "@/components/shared/ContactForm";
// import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Building,
  ArrowRight,
} from "lucide-react";

export default function ContactView() {
  const [activeTab, setActiveTab] = useState<"message" | "call" | "visit">(
    "message",
  );

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <main className="relative bg-gradient-to-b from-white to-blue-50">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#0a1e3b]/5"></div>
        <div className="absolute top-1/2 -left-48 h-96 w-96 rounded-full bg-[#0a1e3b]/10"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <h1 className="text-3xl font-bold text-blue-900 sm:text-4xl md:text-5xl">
            Neem contact op
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700">
            Heeft u vragen over onze massagestoelen of wilt u een afspraak
            maken? Wij helpen u graag persoonlijk verder.
          </p>
        </div>

        {/* Contact tabs */}
        <div className="mb-10 sm:mb-12">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            <TabButton
              icon={<MessageSquare className="h-5 w-5" />}
              text="Stuur bericht"
              active={activeTab === "message"}
              onClick={() => setActiveTab("message")}
            />
            <TabButton
              icon={<Phone className="h-5 w-5" />}
              text="Bel direct"
              active={activeTab === "call"}
              onClick={() => setActiveTab("call")}
            />
            <TabButton
              icon={<MapPin className="h-5 w-5" />}
              text="Bezoek ons"
              active={activeTab === "visit"}
              onClick={() => setActiveTab("visit")}
            />
          </div>
        </div>

        {/* Content area */}
        <div
          key={activeTab}
          className="overflow-hidden rounded-2xl bg-white shadow-xl"
        >
          {activeTab === "message" && (
            <div className="grid md:grid-cols-5">
              <div className="bg-[#0a1e3b] p-6 text-white sm:p-8 md:col-span-2 md:p-10">
                <h2 className="mb-6 text-xl font-semibold">Contactgegevens</h2>

                <div className="space-y-6">
                  <ContactItem
                    icon={<Phone className="h-5 w-5" />}
                    title="Telefoonnummer"
                    content={
                      <a href="tel:+31648582729" className="hover:underline">
                        06-48 58 27 29
                      </a>
                    }
                  />

                  <ContactItem
                    icon={<Mail className="h-5 w-5" />}
                    title="E-mailadres"
                    content={
                      <a
                        href="mailto:Onlineproducts202323@gmail.com"
                        className="break-all hover:underline"
                      >
                        Onlineproducts202323@gmail.com
                      </a>
                    }
                  />

                  <ContactItem
                    icon={<MapPin className="h-5 w-5" />}
                    title="Bezoekadres"
                    content={
                      <>
                        Abdissenlaan 15
                        <br />
                        6374 BJ Landgraaf
                      </>
                    }
                  />

                  <div className="border-t border-blue-800 pt-4">
                    <ContactItem
                      icon={<Building className="h-5 w-5" />}
                      title="Bedrijfsgegevens"
                      content={
                        <>
                          <div>KVK: 73304549</div>
                          <div>BTW: NL001198759B67</div>
                        </>
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 md:col-span-3 md:p-10">
                <h2 className="mb-6 text-2xl font-bold text-blue-900">
                  Stuur ons een bericht
                </h2>
                <p className="mb-8 text-gray-600">
                  Vul het onderstaande formulier in en we nemen zo snel mogelijk
                  contact met u op.
                </p>
                <ContactForm />
              </div>
            </div>
          )}

          {activeTab === "call" && (
            <div className="grid min-h-[400px] md:grid-cols-2">
              <div className="p-6 sm:p-8 md:p-10">
                <h2 className="mb-4 text-2xl font-bold text-blue-900">
                  Bel ons direct
                </h2>
                <p className="mb-8 text-gray-600">
                  Wij zijn bereikbaar tijdens onze openingstijden voor al uw
                  vragen.
                </p>

                <a
                  href="tel:+31648582729"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-900 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-800"
                >
                  <Phone className="h-5 w-5" />
                  06-48 58 27 29
                </a>

                <div className="mt-10">
                  <h3 className="mb-3 text-lg font-semibold text-blue-900">
                    Openingstijden
                  </h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-700">
                    <span className="font-medium">Maandag:</span>
                    <span>09:00 - 20:00</span>
                    <span className="font-medium">Dinsdag:</span>
                    <span>09:00 - 20:00</span>
                    <span className="font-medium">Woensdag:</span>
                    <span>09:00 - 20:00</span>
                    <span className="font-medium">Donderdag:</span>
                    <span>09:00 - 20:00</span>
                    <span className="font-medium">Vrijdag:</span>
                    <span>09:00 - 20:00</span>
                    <span className="font-medium">Zaterdag:</span>
                    <span>10:00 - 18:00</span>
                    <span className="font-medium">Zondag:</span>
                    <span>10:00 - 18:00</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center bg-blue-50 p-6 sm:p-8 md:p-10">
                <div className="max-w-sm">
                  <h3 className="mb-4 text-xl font-semibold text-blue-900">
                    Liever een terugbelverzoek?
                  </h3>
                  <p className="mb-6 text-gray-600">
                    Laat uw nummer achter en wij bellen u zo snel mogelijk terug
                    op een moment dat het u uitkomt.
                  </p>
                  <button
                    onClick={() => setActiveTab("message")}
                    className="flex items-center gap-2 font-medium text-blue-900 transition-colors hover:text-blue-700"
                  >
                    Naar contactformulier <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "visit" && (
            <div className="grid md:grid-cols-2">
              <div className="p-6 sm:p-8 md:p-10">
                <h2 className="mb-4 text-2xl font-bold text-blue-900">
                  Bezoek onze locatie
                </h2>
                <p className="mb-8 text-gray-600">
                  Wilt u langskomen om een stoel te bekijken of af te halen? Dat
                  kan alleen op afspraak.
                </p>

                <div className="mb-8">
                  <h3 className="mb-3 text-lg font-semibold text-blue-900">
                    Ons adres
                  </h3>
                  <address className="text-gray-700 not-italic">
                    <strong>Relax-time</strong>
                    <br />
                    Boschstraat 18
                    <br />
                    6442 PB Brunssum
                    <br />
                    Nederland
                  </address>
                </div>

                <div className="mb-8">
                  <h3 className="mb-3 text-lg font-semibold text-blue-900">
                    Openingstijden
                  </h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-700">
                    <span className="font-medium">Maandag-Vrijdag:</span>
                    <span>09:00 - 20:00</span>
                    <span className="font-medium">Weekend:</span>
                    <span>10:00 - 18:00</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab("message")}
                  className="rounded-lg bg-blue-900 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-800"
                >
                  Maak een afspraak
                </button>
              </div>

              <div className="h-full min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2518.4401959476596!2d6.01923367686204!3d50.8708232644539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c0b986a5b0a3c9%3A0x62dfe622dc4f8a83!2sAbdissenlaan%2015%2C%206374%20BJ%20Landgraaf%2C%20Netherlands!5e0!3m2!1sen!2sus!4v1684243210463!5m2!1sen!2sus"
                  className="h-full w-full border-0"
                  allowFullScreen
                  loading="lazy"
                  title="Relax-time locatie"
                  style={{ minHeight: "100%", display: "block" }}
                ></iframe>
              </div>
            </div>
          )}
        </div>

        {/* Support section */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 ">

          <SupportCard
            icon={<Mail className="h-6 w-6" />}
            title="Email"
            description="Stuur ons een email en we reageren binnen 24 uur op werkdagen."
            action="Email Versturen"
            onClick={() =>
              (window.location.href = "mailto:Onlineproducts202323@gmail.com")
            }
          />

          <SupportCard
            icon={<Phone className="h-6 w-6" />}
            title="Telefoon"
            description="Liever direct contact? Bel ons tijdens openingstijden."
            action="Bel 06-48 58 27 29"
            onClick={() => (window.location.href = "tel:+31648582729")}
            className="sm:col-span-2 lg:col-span-1"
          />
        </div>
      </div>
    </main>
  );
}

function TabButton({
  icon,
  text,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full px-5 py-3 transition-all ${
        active
          ? "bg-blue-900 text-white shadow-lg"
          : "bg-white text-blue-900 hover:bg-blue-50"
      }`}
    >
      {icon}
      <span className="font-medium">{text}</span>
    </button>
  );
}

function ContactItem({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-800/50 p-2">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-blue-100">{title}</h3>
        <div className="mt-1 text-white/90">{content}</div>
      </div>
    </div>
  );
}

function SupportCard({
  icon,
  title,
  description,
  action,
  onClick,
  className = "",
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl bg-white shadow-md ${className}`}
    >
      <div className="p-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-900">
          {icon}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-blue-900">{title}</h3>
        <p className="mb-4 text-gray-600">{description}</p>
        <button
          onClick={onClick}
          className="flex items-center font-medium text-blue-900 transition-colors hover:text-blue-700"
        >
          {action} <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
