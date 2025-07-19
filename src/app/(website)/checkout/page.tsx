// app/checkout/page.tsx
import type { Metadata } from "next";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Afrekenen | Massagestoel-kopen.com",
  description: "Rond uw bestelling af en betaal veilig online.",
};

export default function CheckoutPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="mb-8 text-center text-3xl font-semibold text-blue-900">
        Afrekenen
      </h1>
      <CheckoutForm />
    </div>
  );
}
