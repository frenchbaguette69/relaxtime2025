import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        products: {
          select: {
            product: true,
          },
        },
      },
    });

    // Tel aantal producten per categorie
    const enriched = categories.map((cat) => ({
  id: cat.id,
  name: cat.name,
  description: cat.description,
  cover: cat.cover, // gebruik 'cover' ipv 'image'
  specs: cat.specs, // optioneel als je specs nodig hebt
  productCount: cat.products.length,
}));


    return NextResponse.json(enriched);
  } catch (error) {
    console.error("[CATEGORIES_GET]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
