// app/contact/page.tsx
import type { Metadata } from "next";
import ContactView from "@/components/contact/ContactView";

export const metadata: Metadata = {
  title: "Contact | Relax-time - Premium Massagestoelen",
  description:
    "Vragen over onze massagestoelen? Neem direct contact op met Relax-time voor persoonlijk advies en snelle service.",
  openGraph: {
    title: "Contact | Relax-time - Premium Massagestoelen",
    description:
      "Vragen over onze massagestoelen? Neem direct contact op met Relax-time voor persoonlijk advies en snelle service.",
    type: "website",
    url: "https://relax-time.nl/contact",
  },
};

export default function ContactPage() {
  return <ContactView />;
}
