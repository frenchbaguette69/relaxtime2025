// app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const categoryId = searchParams.get("category") || undefined;
  const minPrice = searchParams.get("minPrice")
    ? parseInt(searchParams.get("minPrice")!)
    : undefined;
  const maxPrice = searchParams.get("maxPrice")
    ? parseInt(searchParams.get("maxPrice")!)
    : undefined;
  const sort = searchParams.get("sort") || "price-low";


  try {
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
    });

    // Fetch all categories for filter
    const categories = await prisma.category.findMany();

    return NextResponse.json({ products, categories });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
