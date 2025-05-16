// app/admin/orders/page.tsx
import { PrismaClient } from "@prisma/client";
import OrderList from "./OrderList";

const prisma = new PrismaClient();

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    search?: string;
    status?: string;
  };
}) {
  const page = parseInt((await searchParams).page || "1");
  const search = (await searchParams).search || "";
  const status = (await searchParams).status || "";

  // Build where clause based on search and status filters
  let where: any = {};

  if (search) {
    where.OR = [
      { customerName: { contains: search, mode: "insensitive" } },
      { customerEmail: { contains: search, mode: "insensitive" } },
      { id: { contains: search, mode: "insensitive" } },
    ];
  }

  if (status && status !== "ALL") {
    where.status = status;
  }

  const [orders, totalCount] = await Promise.all([
    prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * 10,
      take: 10,
      include: {
        items: true,
        shippingAddress: true,
      },
    }),
    prisma.order.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / 10);

  return (
    <div className="container">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-900">Orders</h1>
      </div>
      <OrderList
        orders={orders}
        currentPage={page}
        totalPages={totalPages}
        searchQuery={search}
        statusFilter={status}
      />
    </div>
  );
}
