import Image from "next/image";
import ContactForm from "../shared/ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="w-full bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-stretch bg-[#f8fafc] rounded-2xl overflow-hidden shadow-xl">
          {/* Form-side */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1e3b] mb-4">
              Neem Contact Met Ons Op
            </h2>
            <p className="text-gray-600 text-base md:text-lg mb-8">
              Heeft u vragen over onze massagestoelen of wilt u persoonlijk
              advies? Neem gerust contact met ons op. Ons team staat voor u klaar.
            </p>
            <ContactForm />
          </div>

          {/* Image-side + overlay box */}
          <div className="relative hidden md:block h-full min-h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1556740772-1a741367b93e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Klantenservice medewerker helpt een klant"
              fill
              className="object-cover"
              priority
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-[#0a1e3b]/40" />

            {/* USP box */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-[#0a1e3b] mb-4">
                Waarom Relax-Time?
              </h3>
              <ul className="space-y-3 text-sm text-gray-700">
                {[
                  "Persoonlijk advies op maat",
                  "2 jaar garantie op alle stoelen",
                  "Gratis bezorging in Nederland",
                  "14 dagen niet-goed-geld-terug garantie",
                ].map((usp, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-[#0a1e3b] mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {usp}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
