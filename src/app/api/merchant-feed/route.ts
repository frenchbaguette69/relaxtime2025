import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      categories: { include: { category: true } },
    },
  });

  const feedItems = products.map(product => {
    const image = product.images?.[0] ?? "https://relax-time.nl/default-product-image.jpg"; // fallback image
    const priceEuro = (product.price / 100).toFixed(2);
    const offerEuro = product.offerPrice ? (product.offerPrice / 100).toFixed(2) : null;
    const availability = product.quantity > 0 ? "in stock" : "out of stock";

    return `
      <item>
        <g:id>${product.id}</g:id>
        <g:title><![CDATA[${product.title}]]></g:title>
        <g:description><![CDATA[${product.summary ?? product.shortDescription}]]></g:description>
        <g:link>https://relax-time.nl/product/${product.slug}</g:link>
        <g:image_link>${image}</g:image_link>
        <g:price>${priceEuro} EUR</g:price>
        ${offerEuro ? `<g:sale_price>${offerEuro} EUR</g:sale_price>` : ""}
        <g:availability>${availability}</g:availability>
        <g:brand>Relax-Time</g:brand>
      </item>
    `;
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
    <channel>
      <title>Relax-Time Product Feed</title>
      <link>https://relax-time.nl</link>
      <description>Relax-Time massagestoelen feed</description>
      ${feedItems}
    </channel>
  </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
}
