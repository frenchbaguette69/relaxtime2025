// app/product/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/product/ProductDetails";
import { getProductBySlug } from "@/lib/products";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Product niet gevonden | Relax-time.nl",
      description: "Het gezochte product kon niet worden gevonden.",
    };
  }

  return {
    title: `${product.title} | Relax-time.nl`,
    description: product.shortDescription,
    openGraph: {
      images: product.images.length > 0 ? [product.images[0]!] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
