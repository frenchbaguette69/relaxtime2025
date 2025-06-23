// scripts/cleanup-missing-images.ts
import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();

  for (const product of products) {
    if (!product.images || product.images.length === 0) continue;

    const validImages: string[] = [];

    for (const img of product.images) {
      if (!img.startsWith("/")) continue;

      const fullPath = path.join(process.cwd(), "public", img);
      try {
        await fs.access(fullPath);
        validImages.push(img);
      } catch {
        console.warn(`❌ Missing image for product "${product.title}": ${img}`);
      }
    }

    if (validImages.length !== product.images.length) {
      await prisma.product.update({
        where: { id: product.id },
        data: { images: validImages },
      });
      console.log(`✅ Updated product "${product.title}"`);
    }
  }

  console.log("🎉 Klaar!");
}

main()
  .catch((err) => console.error(err))
  .finally(() => prisma.$disconnect());
