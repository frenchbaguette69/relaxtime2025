// app/over-ons/page.tsx
import type { Metadata } from "next";
import OverOnsView from "@/components/over-ons/OverOnsView";

export const metadata: Metadata = {
  title: "Over Ons | Massagestoel-kopen.com - Premium Massagestoelen",
  description:
    "Ontdek het verhaal achter Massagestoel-kopen.com, uw specialist in premium massagestoelen voor optimaal comfort en welzijn.",
  openGraph: {
    title: "Over Ons | Massagestoel-kopen.com - Premium Massagestoelen",
    description:
      "Ontdek het verhaal achter Massagestoel-kopen.com, uw specialist in premium massagestoelen voor optimaal comfort en welzijn.",
    type: "website",
    url: "https://Massagestoel-kopen.com/over-ons",
  },
};

export default function OverOnsPage() {
  return <OverOnsView />;
}
