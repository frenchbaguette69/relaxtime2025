// components/shared/ContactForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Voornaam moet minimaal 2 tekens bevatten" }),
  lastName: z
    .string()
    .min(2, { message: "Achternaam moet minimaal 2 tekens bevatten" }),
  email: z.string().email({ message: "Ongeldig e-mailadres" }),
  phoneNumber: z.string().optional(),
  message: z
    .string()
    .min(10, { message: "Bericht moet minimaal 10 tekens bevatten" }),
});

export default function ContactForm({
  className = "",
}: {
  className?: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
  });

 async function onSubmit(values: z.infer<typeof formSchema>) {
  setIsSubmitting(true);

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error("Er ging iets mis bij het verzenden van het formulier");
    }

    setIsSuccess(true);
    form.reset();
    setTimeout(() => setIsSuccess(false), 5000);
  } catch (error) {
    console.error("Verzendfout:", error);
    // Hier kun je eventueel nog een foutmelding tonen aan de gebruiker
  }

  setIsSubmitting(false);
}


  return (
    <div className={className}>
      {isSuccess ? (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
          <h3 className="font-medium">Bericht verstuurd!</h3>
          <p>
            Bedankt voor uw bericht. We nemen zo spoedig mogelijk contact met u
            op.
          </p>
        </div>
      ) : null}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Voornaam</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Uw voornaam"
                      {...field}
                      className="border-gray-300 bg-white focus:border-blue-900 focus:ring-blue-900"
                    />
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
                  <FormLabel className="text-gray-700">Achternaam</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Uw achternaam"
                      {...field}
                      className="border-gray-300 bg-white focus:border-blue-900 focus:ring-blue-900"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">E-mailadres</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="uw@email.nl"
                      {...field}
                      className="border-gray-300 bg-white focus:border-blue-900 focus:ring-blue-900"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    Telefoonnummer (optioneel)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Uw telefoonnummer"
                      {...field}
                      className="border-gray-300 bg-white focus:border-blue-900 focus:ring-blue-900"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Uw bericht</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Waar kunnen we u mee helpen?"
                    rows={5}
                    {...field}
                    className="resize-none border-gray-300 bg-white focus:border-blue-900 focus:ring-blue-900"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full bg-blue-900 px-8 py-3 text-white hover:bg-blue-800 md:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Bezig met verzenden..." : "Verzenden"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
