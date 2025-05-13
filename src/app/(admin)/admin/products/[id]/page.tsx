// app/admin/products/[id]/page.tsx
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/products/ProductForm";

const prisma = new PrismaClient();

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const [product, categories] = await Promise.all([
      prisma.product.findUnique({
        where: { id: params.id },
        include: {
          specifications: true,
          categories: {
            include: {
              category: true,
            },
          },
        },
      }),
      prisma.category.findMany({
        orderBy: { name: "asc" },
      }),
    ]);

    if (!product) {
      return notFound();
    }

    return (
      <div className="container">
        <ProductForm product={product} categories={categories} />
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
