import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();

    // Check op slug duplicaat
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

    // ✅ 1. Haal bestaande product op (incl. oude images)
    const existingProduct = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const oldImages: string[] = existingProduct.images ?? [];
    const newImages: string[] = body.images ?? [];

    // ✅ 2. Bepaal welke images verwijderd moeten worden
    const imagesToDelete = oldImages.filter(
      (img) => !newImages.includes(img)
    );

    // ✅ 3. Verwijder oude bestanden van disk
    await Promise.all(
      imagesToDelete.map(async (imgPath) => {
        const fullPath = path.join(process.cwd(), "public", imgPath);
        try {
          await fs.unlink(fullPath);
          console.log("Deleted image:", fullPath);
        } catch (err) {
  const error = err as Error;
  console.warn("Failed to delete image:", fullPath, error.message);
}

      })
    );

    // ✅ 4. Voer update uit in transaction
    const updatedProduct = await prisma.$transaction(async (tx) => {
      await tx.productSpec.deleteMany({ where: { productId: params.id } });
      await tx.categoryOnProduct.deleteMany({ where: { productId: params.id } });

      return tx.product.update({
        where: { id: params.id },
        data: {
          model: body.model,
          title: body.title,
          slug: body.slug,
          summary: body.summary,
          shortDescription: body.shortDescription,
          description: body.description,
          images: newImages,
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

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("[PRODUCT_PATCH]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
