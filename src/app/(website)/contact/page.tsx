// app/contact/page.tsx
import type { Metadata } from "next";
import ContactView from "@/components/contact/ContactView";

export const metadata: Metadata = {
  title: "Contact | Massagestoel-kopen.com - Premium Massagestoelen",
  description:
    "Vragen over onze massagestoelen? Neem direct contact op met Massagestoel kopen voor persoonlijk advies en snelle service.",
  openGraph: {
    title: "Contact | Massagestoel-kopen.com - Premium Massagestoelen",
    description:
      "Vragen over onze massagestoelen? Neem direct contact op met Massagestoel kopen voor persoonlijk advies en snelle service.",
    type: "website",
    url: "https://Massagestoel-kopen.com/contact",
  },
};

export default function ContactPage() {
  return <ContactView />;
}
