import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const staticPages = [
    '',
    '/algemene-voorwaarden',
    '/blog',
    '/checkout',
    '/contact',
    '/login',
    '/over-ons',
    '/payment',
    '/producten',
  ];

  const productSlugs = await prisma.product.findMany({
    select: { slug: true },
  });

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Voeg static pages toe
  staticPages.forEach((path) => {
    sitemap += `
    <url>
      <loc>https://relax-time.nl${path}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>\n`;
  });

  // Voeg products toe
  productSlugs.forEach((product) => {
    sitemap += `
    <url>
      <loc>https://relax-time.nl/producten/${product.slug}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>\n`;
  });

  sitemap += `</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
