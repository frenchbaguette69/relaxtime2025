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
    <footer className="w-full bg-[#0a1e3b] text-white pt-16" aria-labelledby="footer-heading">
      <div className="max-w-screen-2xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Bedrijfsinfo */}
          <div>
            <h2 id="footer-heading" className="text-lg font-bold mb-4">Massagestoel-kopen.com</h2>
            <p className="text-gray-300">
              Massagestoel-kopen.com is dé specialist in <strong>massagestoelen kopen</strong> voor thuis of kantoor. Ontdek ultieme ontspanning met onze hoogwaardige collectie.
            </p>
            <div className="flex items-center gap-4 mt-4 text-xl text-white">
              <a
                href="https://facebook.com/Massagestoel-kopen.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Volg ons op Facebook"
              >
                <FaFacebookF className="hover:text-gray-300" />
              </a>
              <a
                href="https://instagram.com/Massagestoel-kopen.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Volg ons op Instagram"
              >
                <FaInstagram className="hover:text-gray-300" />
              </a>
              <a
                href="https://twitter.com/Massagestoel-kopen.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Volg ons op Twitter"
              >
                <FaTwitter className="hover:text-gray-300" />
              </a>
            </div>
          </div>

          {/* Productcategorieën */}
          <div>
            <h3 className="text-lg font-bold mb-4">Massagestoel Categorieën</h3>
            <ul className="space-y-2 text-gray-300">
              {categories
                .filter((cat) => cat.productCount > 0)
                .map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/producten?category=${category.id}`}
                      className="hover:text-white"
                    >
                      {category.name} ({category.productCount})
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Informatie & beleid */}
          <div>
            <h3 className="text-lg font-bold mb-4">Klantenservice & Informatie</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/over-ons" className="hover:text-white">
                  Over Massagestoel-kopen.com
                </Link>
              </li>
              <li>
                <Link href="/algemene-voorwaarden" className="hover:text-white">
                  Algemene voorwaarden & garantie
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact met Massagestoel-kopen.com
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white">
                  Veelgestelde vragen (FAQ)
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 text-sm text-gray-400 py-6 px-6 text-center">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Massagestoel-kopen.com. Alle rechten voorbehouden.</p>
          <p>Gratis levering & 5 jaar garantie op alle premium massagestoelen.</p>
        </div>
      </div>
    </footer>
  );
}
