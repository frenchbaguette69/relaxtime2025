// app/checkout/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";

import PaymentForm from "@/components/checkout/PaymentForm";
import { Loader2 } from "lucide-react";

// Load Stripe outside of component render cycle
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

export default function PaymentPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const secret = searchParams.get("client_secret");
    const order = searchParams.get("order_id");

    if (!secret || !order) {
      toast.error(
        "Er ontbreken betalingsgegevens. Probeer opnieuw te bestellen.",
      );
      router.push("/checkout");
      return;
    }

    setClientSecret(secret);
    setOrderId(order);
  }, [searchParams, router]);

  if (!clientSecret || !orderId) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center">
        <Loader2 className="mb-4 h-12 w-12 animate-spin text-blue-900" />
        <h1 className="text-2xl font-semibold text-blue-900">
          Betaalpagina wordt geladen...
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl py-12">
      <h1 className="mb-8 text-center text-3xl font-semibold text-blue-900">
        Betalen
      </h1>

      <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: "stripe",
              variables: {
                colorPrimary: "#1e3a8a", // blue-900
                colorBackground: "#ffffff",
                colorText: "#1e293b", // slate-800
                colorDanger: "#ef4444", // red-500
                fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
                spacingUnit: "4px",
                borderRadius: "8px",
              },
            },
          }}
        >
          <PaymentForm orderId={orderId} />
        </Elements>
      </div>
    </div>
  );
}
