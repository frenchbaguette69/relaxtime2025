// app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const payload = await request.text();
  const signature = request.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    const error = err as Error;
    console.error(`Webhook signature verification failed: ${error.message}`);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Handle specific event types
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      await handlePaymentSuccess(paymentIntent);
      break;
    case "payment_intent.payment_failed":
      const failedPaymentIntent = event.data.object as Stripe.PaymentIntent;
      await handlePaymentFailure(failedPaymentIntent);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  try {
    const orderId = paymentIntent.metadata.orderId;

    if (!orderId) {
      console.error("No order ID in payment intent metadata");
      return;
    }

    // Update the order status
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "PAID",
        paymentStatus: "COMPLETED",
      },
    });

    console.log(`Payment for order ${orderId} succeeded`);
  } catch (error) {
    console.error("Error handling payment success:", error);
  }
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  try {
    const orderId = paymentIntent.metadata.orderId;

    if (!orderId) {
      console.error("No order ID in payment intent metadata");
      return;
    }

    // Update the order status
    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: "FAILED",
      },
    });

    console.log(`Payment for order ${orderId} failed`);
  } catch (error) {
    console.error("Error handling payment failure:", error);
  }
}
