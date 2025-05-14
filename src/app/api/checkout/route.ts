// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import { Stripe } from "stripe";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Create a schema for validation
const checkoutSchema = z.object({
  customer: z.object({
    email: z.string().email(),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    company: z.string().optional(),
    phone: z.string().min(10),
  }),
  shipping: z.object({
    address1: z.string().min(3),
    address2: z.string().optional(),
    city: z.string().min(2),
    postalCode: z.string().min(4),
    country: z.string().min(2),
  }),
  notes: z.string().optional(),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().positive(),
      price: z.number().int().positive(),
      productTitle: z.string(),
      productImage: z.string().optional(),
    }),
  ),
  subtotal: z.number().int().positive(),
  total: z.number().int().positive(),
});

export async function POST(request: Request) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const result = checkoutSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Ongeldige gegevens", details: result.error.format() },
        { status: 400 },
      );
    }

    const { customer, shipping, notes, items, subtotal, total } = result.data;

    // Create the shipping address
    const address = await prisma.address.create({
      data: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        company: customer.company,
        address1: shipping.address1,
        address2: shipping.address2,
        city: shipping.city,
        postalCode: shipping.postalCode,
        country: shipping.country,
        phone: customer.phone,
      },
    });

    // Create the order in database
    const order = await prisma.order.create({
      data: {
        customerEmail: customer.email,
        customerName: `${customer.firstName} ${customer.lastName}`,
        addressId: address.id,
        notes,
        subtotal,
        total,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            productTitle: item.productTitle,
            productImage: item.productImage,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // Create a Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        orderId: order.id,
      },
    });

    // Update the order with the payment intent ID
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentIntentId: paymentIntent.id },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId: order.id,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Er is iets misgegaan" },
      { status: 500 },
    );
  }
}
