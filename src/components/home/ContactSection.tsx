// components/home/ContactSection.tsx
import Image from "next/image";
import ContactForm from "../shared/ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="w-full bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="overflow-hidden rounded-2xl bg-gray-50 shadow-lg">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h2 className="mb-4 text-3xl font-bold text-blue-900 md:text-4xl">
                Neem Contact Met Ons Op
              </h2>
              <p className="mb-8 text-lg text-gray-600">
                Heeft u vragen over onze massagestoelen of wilt u persoonlijk
                advies? Neem gerust contact met ons op. Ons team staat voor u
                klaar.
              </p>

              <ContactForm />
            </div>

            <div className="relative hidden h-full min-h-[500px] md:block">
              <Image
                src="https://images.unsplash.com/photo-1556740772-1a741367b93e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Klantenservice medewerker helpt een klant"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-r-2xl"
              />
              <div className="absolute inset-0 rounded-r-2xl bg-blue-900/30">
                <div className="absolute right-12 bottom-12 left-12 rounded-lg bg-white/95 p-6 shadow-lg">
                  <h3 className="mb-4 text-xl font-bold text-blue-900">
                    Onze Voordelen
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-3 h-5 w-5 text-blue-900"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Persoonlijk advies op maat
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-3 h-5 w-5 text-blue-900"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      5 jaar garantie op alle stoelen
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-3 h-5 w-5 text-blue-900"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Gratis bezorging door heel Nederland
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-3 h-5 w-5 text-blue-900"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      30 dagen niet-goed-geld-terug garantie
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
