import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

type Category = {
  id: string;
  name: string;
  description: string | null;
  cover: string | null;
  specs?: string | null;
  productCount: number;
};

export default async function Footer() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/categories`, {
  cache: "no-store",
});


  const categories: Category[] = await res.json();

  return (
    <footer className="w-full bg-[#0a1e3b] text-white pt-16">
      <div className="max-w-screen-2xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Bedrijfsinfo */}
          <div>
            <h2 className="text-lg font-bold mb-4">Relax-Time.nl</h2>
            <p className="text-gray-300">
              Uw specialist in premium massagestoelen voor thuis en op kantoor. Ontdek ultieme ontspanning met onze zorgvuldig geselecteerde collectie.
            </p>
            <div className="flex items-center gap-4 mt-4 text-xl text-white">
              <FaFacebookF className="hover:text-gray-300 cursor-pointer" />
              <FaInstagram className="hover:text-gray-300 cursor-pointer" />
              <FaTwitter className="hover:text-gray-300 cursor-pointer" />
            </div>
          </div>

          {/* Producten */}
          <div>
            <h3 className="text-lg font-bold mb-4">Categorieën</h3>
            <ul className="space-y-2 text-gray-300">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link href={`/producten?catergory=${category.id}`}>
                    {category.name} ({category.productCount})
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informatie */}
          <div>
            <h3 className="text-lg font-bold mb-4">Informatie</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/over-ons">Over Ons</Link></li>
              <li><Link href="/showroom">Showroom Bezoeken</Link></li>
              <li><Link href="/verzending">Verzending & Levering</Link></li>
              <li><Link href="/garantie">Garantie & Service</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Footer bottom bar */}
      <div className="border-t border-gray-700 text-sm text-gray-400 py-6 px-6 text-center">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2025 Relax-Time.nl. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
}
