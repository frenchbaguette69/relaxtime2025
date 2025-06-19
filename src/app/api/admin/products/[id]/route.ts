// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        specifications: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCT_GET]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();

    // Check if slug already exists for a different product
    if (body.slug) {
      const existingProduct = await prisma.product.findUnique({
        where: { slug: body.slug },
      });

      if (existingProduct && existingProduct.id !== params.id) {
        return NextResponse.json(
          { error: "A product with this slug already exists" },
          { status: 409 },
        );
      }
    }

    // Update the product with transaction to handle related data
    const product = await prisma.$transaction(async (tx) => {
      // Delete existing specifications and categories
      await tx.productSpec.deleteMany({
        where: { productId: params.id },
      });

      await tx.categoryOnProduct.deleteMany({
        where: { productId: params.id },
      });

      // Update product with new data
      return tx.product.update({
        where: { id: params.id },
        data: {
          model: body.model,
          title: body.title,
          slug: body.slug,
          summary: body.summary,
          shortDescription: body.shortDescription,
          description: body.description,
          images: body.images,
          price: body.price,
          offerPrice: body.offerPrice,
          quantity: body.quantity,
          specifications: {
            create: body.specifications.map((spec: any) => ({
              name: spec.name,
              value: spec.value,
              group: spec.group,
            })),
          },
          categories: {
            create: body.categories.map((categoryId: string) => ({
              categoryId,
            })),
          },
        },
      });
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCT_PATCH]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Eerst koppelingen met categorieën verwijderen
    await prisma.categoryOnProduct.deleteMany({
      where: { productId: params.id },
    });

    // Daarna het product zelf verwijderen
    await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[PRODUCT_DELETE]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

