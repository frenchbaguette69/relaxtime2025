import { FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "Jan de Vries",
    initials: "JdV",
    location: "Amsterdam",
    date: "15 mei 2023",
    rating: 5,
    text: `“De Relax Elite 9000 heeft mijn leven veranderd. Na lange werkdagen helpt deze stoel me om volledig te ontspannen. De zero gravity functie is geweldig!”`,
  },
  {
    name: "Maria Jansen",
    initials: "MJ",
    location: "Utrecht",
    date: "3 juni 2023",
    rating: 5,
    text: `“Ik heb de Compact 3000 gekocht voor mijn appartement en ben zeer tevreden. Ondanks het compacte formaat biedt het een uitstekende massage.”`,
  },
  {
    name: "Peter Bakker",
    initials: "PB",
    location: "Rotterdam",
    date: "22 april 2023",
    rating: 4,
    text: `“De Office Pro heeft mijn rugklachten aanzienlijk verminderd. Ik gebruik hem dagelijks tijdens mijn pauzes op kantoor. Zeer aan te raden!”`,
  },
];

export default function CustomerReviews() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0a1e3b] mb-4">
          Wat Onze Klanten Zeggen
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Ontdek waarom onze klanten zo tevreden zijn met hun Massagestoel-kopen.com massagestoel.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="rounded-lg border border-gray-200 bg-white p-6 text-left shadow-sm"
            >
              <div className="flex items-center gap-1 mb-4 text-yellow-500">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <FaStar key={i} className="h-5 w-5" />
                ))}
                {review.rating < 5 &&
                  Array.from({ length: 5 - review.rating }).map((_, i) => (
                    <FaStar key={`empty-${i}`} className="h-5 w-5 text-gray-300" />
                  ))}
              </div>
              <blockquote className="italic text-gray-700 mb-6">
                {review.text}
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center font-semibold text-[#0a1e3b]">
                  {review.initials}
                </div>
                <div>
                  <p className="font-semibold text-[#0a1e3b]">{review.name}</p>
                  <p className="text-sm text-gray-500">
                    {review.location} • {review.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
