// app/admin/products/page.tsx
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import ProductList from "./ProductList";

const prisma = new PrismaClient();

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    search?: string;
  };
}) {
  const page = parseInt(searchParams.page || "1");
  const search = (await searchParams).search || "";

  const where = search
    ? {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { model: { contains: search, mode: "insensitive" } },
          { slug: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  const [products, totalCount] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * 10,
      take: 10,
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    }),
    prisma.product.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / 10);

  return (
    <div className="container">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-900">Producten</h1>
        <Link href="/admin/products/new" passHref>
          <Button className="bg-blue-900 hover:bg-blue-800">
            <PlusCircle className="mr-2 h-4 w-4" />
            Voeg nieuw product toe
          </Button>
        </Link>
      </div>
      <ProductList
        products={products}
        currentPage={page}
        totalPages={totalPages}
        searchQuery={search}
      />
    </div>
  );
}
