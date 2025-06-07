import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import parse from "html-react-parser";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  if (!post) {
    return {
      title: "Blog niet gevonden | Relax Time",
    };
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
  };
}

export default async function BlogPage({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <article className="rich-text">
        {parse(post.content)}
      </article>
    </main>
  );
}
