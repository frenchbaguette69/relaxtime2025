// app/api/orders/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id: orderId } = await params;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: {
        id: true,
        customerName: true,
        customerEmail: true,
        status: true,
        createdAt: true,
        total: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Bestelling niet gevonden" },
        { status: 404 },
      );
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Er is iets misgegaan" },
      { status: 500 },
    );
  }
}
