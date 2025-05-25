import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { model: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        slug: true,
        title: true,
        price: true,
        model: true,
        images: true,
      },
      take: 8,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Failed to search products" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
