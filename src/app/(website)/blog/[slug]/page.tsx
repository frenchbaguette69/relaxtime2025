import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import parse from "html-react-parser";
import type { Metadata } from "next";

interface BlogPageProps {
  params: {
    slug: string;
  };
}

interface BlogPageProps {
  params: { slug: string };
}

interface BlogPageMetadataProps {
  params: Promise<{ slug: string }>;
}


// Metadata functie
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDescription,
  };
}

// Pagina component
export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) return notFound();

  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main content (2/3 op desktop) */}
        <article className="prose prose-blue col-span-2 rich-text">{parse(post.content)}</article>
        {/* Sidebar (1/3 op desktop) */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Meer weten?</h2>
          <p className="text-gray-600">
            Hier kun je bijvoorbeeld gerelateerde blogs, auteur-info of call-to-actions plaatsen.
          </p>
        </div>
      </div>
    </section>
  );
}

