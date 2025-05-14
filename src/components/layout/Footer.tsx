// components/layout/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/relax-logo.webp"
              alt="Relax-Time"
              width={150}
              height={40}
              className="mb-4 h-8 w-auto"
            />
            <p className="mb-6 text-blue-100">
              Uw specialist in premium massagestoelen voor thuis en op kantoor.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                className="text-white hover:text-blue-200"
                passHref
              >
                <Facebook />
              </Link>
              <Link
                href="https://instagram.com"
                className="text-white hover:text-blue-200"
                passHref
              >
                <Instagram />
              </Link>
              <Link
                href="https://twitter.com"
                className="text-white hover:text-blue-200"
                passHref
              >
                <Twitter />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Snel Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/massagestoelen"
                  className="text-blue-100 hover:text-white"
                >
                  Massagestoelen
                </Link>
              </li>
              <li>
                <Link
                  href="/aanbiedingen"
                  className="text-blue-100 hover:text-white"
                >
                  Aanbiedingen
                </Link>
              </li>
              <li>
                <Link
                  href="/over-ons"
                  className="text-blue-100 hover:text-white"
                >
                  Over Ons
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-blue-100 hover:text-white"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-blue-100 hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Klantenservice</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/verzending"
                  className="text-blue-100 hover:text-white"
                >
                  Verzending & Levering
                </Link>
              </li>
              <li>
                <Link
                  href="/retourneren"
                  className="text-blue-100 hover:text-white"
                >
                  Retourneren
                </Link>
              </li>
              <li>
                <Link
                  href="/garantie"
                  className="text-blue-100 hover:text-white"
                >
                  Garantie
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-blue-100 hover:text-white">
                  Veelgestelde Vragen
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-blue-100 hover:text-white"
                >
                  Privacy Beleid
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Nieuwsbrief</h3>
            <p className="mb-4 text-blue-100">
              Schrijf je in voor onze nieuwsbrief en ontvang exclusieve
              aanbiedingen.
            </p>
            <div className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="E-mailadres"
                className="border-blue-700 bg-blue-800 text-white placeholder:text-blue-300"
              />
              <Button className="bg-white text-blue-900 hover:bg-blue-100">
                Inschrijven
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-blue-800 pt-6 text-center text-blue-200">
          <p>
            © {new Date().getFullYear()} Relax-Time.nl - Alle rechten
            voorbehouden.
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <Image
              src="/payment-ideal.svg"
              alt="iDEAL"
              width={40}
              height={25}
            />
            <Image
              src="/payment-mastercard.svg"
              alt="Mastercard"
              width={40}
              height={25}
            />
            <Image src="/payment-visa.svg" alt="Visa" width={40} height={25} />
            <Image
              src="/payment-paypal.svg"
              alt="PayPal"
              width={40}
              height={25}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
