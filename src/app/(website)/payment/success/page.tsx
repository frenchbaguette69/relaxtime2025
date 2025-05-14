// app/bestelling/succes/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ShoppingBag, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

interface OrderDetails {
  id: string;
  customerName: string;
  customerEmail: string;
  status: string;
  createdAt: string;
}

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear the cart on order success
    clearCart();

    const orderId = searchParams.get("order_id");

    if (!orderId) {
      toast.error("Bestelling niet gevonden");
      router.push("/");
      return;
    }

    // Fetch order details
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`);

        if (!response.ok) {
          throw new Error("Bestelling niet gevonden");
        }

        const data = await response.json();
        setOrder(data.order);
      } catch (error) {
        console.error("Error fetching order:", error);
        toast.error("Kon de bestellingsgegevens niet ophalen");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [searchParams, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center">
        <Loader2 className="mb-4 h-12 w-12 animate-spin text-blue-900" />
        <h1 className="text-2xl font-semibold text-blue-900">
          Bestellingsgegevens laden...
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl py-12">
      <div className="rounded-lg border border-gray-200 p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center justify-center">
          <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
          <h1 className="text-center text-3xl font-semibold text-blue-900">
            Bedankt voor uw bestelling!
          </h1>
          {order && (
            <p className="mt-2 text-center text-gray-600">
              Bestelnummer: <span className="font-medium">{order.id}</span>
            </p>
          )}
        </div>

        {order && (
          <div className="mb-8 rounded-lg bg-blue-50 p-6">
            <h2 className="mb-4 text-xl font-medium text-blue-900">
              Bestellingsdetails
            </h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Naam:</span> {order.customerName}
              </p>
              <p>
                <span className="font-medium">E-mail:</span>{" "}
                {order.customerEmail}
              </p>
              <p>
                <span className="font-medium">Datum:</span>{" "}
                {new Date(order.createdAt).toLocaleDateString("nl-NL", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span className="rounded-full bg-green-100 px-2 py-1 text-sm font-medium text-green-800">
                  {order.status === "PAID" ? "Betaald" : "Verwerkt"}
                </span>
              </p>
            </div>
          </div>
        )}

        <div className="text-center">
          <p className="mb-6 text-gray-600">
            We hebben een bevestiging van uw bestelling naar uw e-mailadres
            gestuurd. U ontvangt een update wanneer uw bestelling verzonden is.
          </p>
          <Link href="/" passHref>
            <Button className="bg-blue-900 hover:bg-blue-800">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Terug naar de winkel
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
