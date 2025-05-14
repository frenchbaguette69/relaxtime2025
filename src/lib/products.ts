// lib/products.ts
import { PrismaClient } from "@prisma/client";
import type { Product, Category } from "@prisma/client";

const prisma = new PrismaClient();

interface GetProductsParams {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "newest" | "price-low" | "price-high";
}

interface GetProductsResult {
  products: Product[];
  categories: Category[];
}

export async function getProducts({
  categoryId,
  minPrice,
  maxPrice,
  sort = "newest",
}: GetProductsParams = {}): Promise<GetProductsResult> {
  // Fetch all categories for filter
  const categories = await prisma.category.findMany();

  // Build the query for products
  const whereClause: any = {};

  // Price filter
  if (minPrice !== undefined || maxPrice !== undefined) {
    whereClause.price = {};
    if (minPrice !== undefined) {
      whereClause.price.gte = minPrice;
    }
    if (maxPrice !== undefined) {
      whereClause.price.lte = maxPrice;
    }
  }

  // Category filter
  if (categoryId) {
    whereClause.categories = {
      some: {
        categoryId,
      },
    };
  }

  // Sort options
  let orderBy: any = { createdAt: "desc" };
  if (sort === "price-low") {
    orderBy = { price: "asc" };
  } else if (sort === "price-high") {
    orderBy = { price: "desc" };
  }

  // Fetch products with filters
  const products = await prisma.product.findMany({
    where: whereClause,
    orderBy,
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  return {
    products,
    categories,
  };
}

// lib/products.ts (add this function)
export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        specifications: true,
        categories: {
          include: {
            category: true,
          },
        },
        reviews: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return product;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}
