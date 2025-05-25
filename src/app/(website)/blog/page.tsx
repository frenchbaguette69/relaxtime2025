import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import slugify from "slugify";

const prisma = new PrismaClient();

export default async function BlogOverviewPage() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#0a1e3b] mb-4">Ons Blog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lees onze nieuwste artikelen over massagestoelen, ontspanning en gezondheid.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block rounded-xl border border-gray-200 hover:shadow-md transition-shadow bg-white"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-[#0a1e3b]">{post.title}</h2>
                <p className="text-gray-600 mt-2 line-clamp-3">{post.description}</p>
                <p className="mt-4 text-sm text-gray-400">
                  Gepubliceerd op {new Date(post.createdAt).toLocaleDateString("nl-NL")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
