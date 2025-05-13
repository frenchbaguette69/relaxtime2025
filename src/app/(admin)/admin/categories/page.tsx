// app/admin/categories/page.tsx
import { PrismaClient } from "@prisma/client";
import CategoryList from "./CategoryList";

const prisma = new PrismaClient();

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="container">
      <CategoryList initialCategories={categories} />
    </div>
  );
}
