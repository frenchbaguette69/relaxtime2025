// components/checkout/CheckoutForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import OrderSummary from "@/components/checkout/OrderSummary";

const checkoutFormSchema = z.object({
  // Customer details
  email: z.string().email("Voer een geldig e-mailadres in"),
  firstName: z.string().min(2, "Voer uw voornaam in"),
  lastName: z.string().min(2, "Voer uw achternaam in"),
  company: z.string().optional(),
  phone: z.string().min(10, "Voer een geldig telefoonnummer in"),

  // Shipping address
  address1: z.string().min(3, "Voer uw adres in"),
  address2: z.string().optional(),
  city: z.string().min(2, "Voer uw woonplaats in"),
  postalCode: z.string().min(4, "Voer een geldige postcode in"),
  country: z.string().min(2, "Voer uw land in"),

  // Additional info
  notes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export default function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { items, subtotal, total } = useCart();
  const router = useRouter();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      company: "",
      phone: "",
      address1: "",
      address2: "",
      city: "",
      postalCode: "",
      country: "Nederland",
      notes: "",
    },
  });

  async function onSubmit(data: CheckoutFormValues) {
    if (items.length === 0) {
      toast.error("Uw winkelwagen is leeg");
      return;
    }

    setIsLoading(true);

    try {
      // Create order in database
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            company: data.company,
            phone: data.phone,
          },
          shipping: {
            address1: data.address1,
            address2: data.address2,
            city: data.city,
            postalCode: data.postalCode,
            country: data.country,
          },
          notes: data.notes,
          items: items.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.offerPrice || item.product.price,
            productTitle: item.product.title,
            productImage: item.product.images[0],
          })),
          subtotal,
          total,
        }),
      });

      if (!response.ok) {
        throw new Error("Er is iets misgegaan met uw bestelling");
      }

      const { clientSecret, orderId } = await response.json();

      // Redirect to payment page
      router.push(`/payment?client_secret=${clientSecret}&order_id=${orderId}`);
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(
        "Er is iets misgegaan met uw bestelling. Probeer het later opnieuw.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="rounded-lg border border-gray-200 p-6">
              <h2 className="mb-4 text-xl font-semibold text-blue-900">
                Persoonlijke gegevens
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>E-mailadres</FormLabel>
                      <FormControl>
                        <Input placeholder="uw@email.nl" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Voornaam</FormLabel>
                      <FormControl>
                        <Input placeholder="Jan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Achternaam</FormLabel>
                      <FormControl>
                        <Input placeholder="Jansen" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bedrijf (optioneel)</FormLabel>
                      <FormControl>
                        <Input placeholder="Uw bedrijf" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefoonnummer</FormLabel>
                      <FormControl>
                        <Input placeholder="+31 6 12345678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-6">
              <h2 className="mb-4 text-xl font-semibold text-blue-900">
                Bezorgadres
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="address1"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Adres</FormLabel>
                      <FormControl>
                        <Input placeholder="Straatnaam 123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address2"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>
                        Appartement, suite, etc. (optioneel)
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Appartement 4B" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postcode</FormLabel>
                      <FormControl>
                        <Input placeholder="1234 AB" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plaats</FormLabel>
                      <FormControl>
                        <Input placeholder="Amsterdam" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Land</FormLabel>
                      <FormControl>
                        <Input placeholder="Nederland" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-6">
              <h2 className="mb-4 text-xl font-semibold text-blue-900">
                Aanvullende informatie
              </h2>
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Opmerkingen (optioneel)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Opmerkingen over uw bestelling, bijv. speciale instructies voor bezorging"
                        {...field}
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="lg:hidden">
              <OrderSummary />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-900 hover:bg-blue-800"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verwerken...
                </>
              ) : (
                "Doorgaan naar betalen"
              )}
            </Button>
          </form>
        </Form>
      </div>

      <div className="hidden lg:block">
        <OrderSummary />
      </div>
    </div>
  );
}
