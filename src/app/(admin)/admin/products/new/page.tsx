// app/admin/products/new/page.tsx
import { PrismaClient } from "@prisma/client";
import ProductForm from "@/components/admin/products/ProductForm";

const prisma = new PrismaClient();

export default async function CreateProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="container">
      <ProductForm categories={categories} />
    </div>
  );
}
