import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function BlogOverviewPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Formatter buiten de map voor performance
  const formatter = new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-12 text-[#0a1e3b] text-center">Blog artikelen</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group">
            <div className="border border-border rounded-lg p-6 h-full flex flex-col justify-between shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white">
              <div>
                <h2 className="text-2xl font-semibold text-[#0a1e3b] mb-3 group-hover:underline">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Geplaatst op: {formatter.format(new Date(post.createdAt))}
                </p>
                <p className="text-black line-clamp-4">{post.description}</p>
              </div>
              <div className="mt-6">
                <span className="text-[#0a1e3b] font-semibold">Lees verder →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
