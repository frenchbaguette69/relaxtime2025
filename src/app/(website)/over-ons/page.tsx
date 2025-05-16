// app/over-ons/page.tsx
import type { Metadata } from "next";
import OverOnsView from "@/components/over-ons/OverOnsView";

export const metadata: Metadata = {
  title: "Over Ons | Relax-time - Premium Massagestoelen",
  description:
    "Ontdek het verhaal achter Relax-time, uw specialist in premium massagestoelen voor optimaal comfort en welzijn.",
  openGraph: {
    title: "Over Ons | Relax-time - Premium Massagestoelen",
    description:
      "Ontdek het verhaal achter Relax-time, uw specialist in premium massagestoelen voor optimaal comfort en welzijn.",
    type: "website",
    url: "https://relax-time.nl/over-ons",
  },
};

export default function OverOnsPage() {
  return <OverOnsView />;
}
