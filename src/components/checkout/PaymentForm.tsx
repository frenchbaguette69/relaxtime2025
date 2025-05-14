// components/checkout/PaymentForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

interface PaymentFormProps {
  orderId: string;
}

export default function PaymentForm({ orderId }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Retrieve any payment intent status from the URL
    const clientSecret = new URLSearchParams(window.location.search).get(
      "client_secret",
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Betaling geslaagd!");
          // Clean up cart and redirect to success page
          clearCart();
          router.push(`/payment/success?order_id=${orderId}`);
          break;
        case "processing":
          setMessage("Uw betaling wordt verwerkt.");
          break;
        case "requires_payment_method":
          setMessage("Uw betaling is niet geslaagd, probeer het opnieuw.");
          break;
        default:
          setMessage("Er is iets misgegaan.");
          break;
      }
    });
  }, [stripe, router, orderId, clearCart]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment/success?order_id=${orderId}`,
      },
    });

    // This will only happen if the user clicks cancel or there's a
    // network error
    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || "Er is iets misgegaan met de betaling.");
        toast.error(error.message || "Er is iets misgegaan met de betaling.");
      } else {
        setMessage("Er is een onverwachte fout opgetreden.");
        toast.error("Er is een onverwachte fout opgetreden.");
      }
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="mb-6">
        <PaymentElement id="payment-element" />
      </div>
      {message && (
        <div className="mb-4 rounded-md bg-blue-50 p-4 text-sm text-blue-900">
          {message}
        </div>
      )}
      <Button
        disabled={isLoading || !stripe || !elements}
        className="w-full bg-blue-900 hover:bg-blue-800"
        type="submit"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verwerken...
          </>
        ) : (
          "Nu betalen"
        )}
      </Button>
      <p className="mt-4 text-center text-sm text-gray-500">
        U wordt teruggeleid naar onze website na het voltooien van de betaling.
      </p>
    </form>
  );
}
