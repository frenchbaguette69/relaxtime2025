// app/admin/orders/[id]/page.tsx
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import OrderDetailsClient from "./OrderDetails";

const prisma = new PrismaClient();

export default async function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      items: true,
      shippingAddress: true,
    },
  });

  if (!order) {
    notFound();
  }

  return <OrderDetailsClient order={order} />;
}
