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

  const averageRating = product.reviews.length
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) /
      product.reviews.length
    : undefined;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            image: product.images,
            description: product.shortDescription,
            sku: product.model,
            brand: {
              "@type": "Brand",
              name: "Relax-Time.nl",
            },
            offers: {
              "@type": "Offer",
              url: `https://relax-time.nl/producten/${product.slug}`,
              priceCurrency: "EUR",
              price: (product.offerPrice ?? product.price).toFixed(2),
              availability:
                product.quantity > 0
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
            },
            ...(averageRating && {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: averageRating.toFixed(1),
                reviewCount: product.reviews.length,
              },
            }),
          }),
        }}
      />
      <ProductDetails product={product} />
    </>
  );
}

