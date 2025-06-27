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

    const existingProduct = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const oldImages: string[] = existingProduct.images ?? [];
    const newImagesRaw: string[] = body.images ?? [];

    // ✅ Filter nieuwe afbeeldingen op basis van bestandsbestaan
    const newImages: string[] = [];

    for (const img of newImagesRaw) {
      const fullPath = path.join(process.cwd(), "public", img);
      try {
        await fs.access(fullPath);
        newImages.push(img);
      } catch {
        console.warn("Image not found on disk (skipped):", fullPath);
      }
    }

    const imagesToDelete = oldImages.filter((img) => !newImages.includes(img));

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
      }),
    );

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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // ✅ Verwijder gekoppelde afbeeldingen van disk
    const images = product.images ?? [];
    await Promise.all(
      images.map(async (imgPath) => {
        const fullPath = path.join(process.cwd(), "public", imgPath);
        try {
          await fs.unlink(fullPath);
          console.log("Deleted image:", fullPath);
        } catch (err) {
          const error = err as Error;
          console.warn("Failed to delete image:", fullPath, error.message);
        }
      }),
    );

    await prisma.categoryOnProduct.deleteMany({
      where: { productId: params.id },
    });

    await prisma.productSpec.deleteMany({
      where: { productId: params.id },
    });

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
