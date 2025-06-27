import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    title: "Vermindert Stress en Spanning",
    description:
      "Regelmatige massages helpen bij het verlagen van stresshormonen en het bevorderen van ontspanning.",
  },
  {
    title: "Verbetert Bloedsomloop",
    description:
      "De massagetechnieken stimuleren de bloedsomloop, wat helpt bij het verminderen van spier- en gewrichtspijn.",
  },
  {
    title: "Bevordert Betere Slaap",
    description:
      "Een massage voor het slapengaan kan helpen bij het verbeteren van de slaapkwaliteit en het verminderen van slapeloosheid.",
  },
  {
    title: "Verhoogt Productiviteit",
    description:
      "Korte massagesessies gedurende de dag kunnen helpen bij het verhogen van de focus en productiviteit.",
  },
];

export default function AboutChair() {
  return (
   <section className="bg-white py-16" aria-labelledby="about-massagechairs-heading">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-4 items-center">
    {/* Tekstgedeelte */}
    <div>
      <h2
        id="about-massagechairs-heading"
        className="text-3xl md:text-4xl font-bold text-[#0a1e3b] mb-4"
      >
        Massagestoel Kopen? Ontdek de Gezondheidsvoordelen
      </h2>
      <p className="text-gray-600 mb-6 max-w-xl">
        Een massagestoel is meer dan een luxe – het is een investering in uw
        gezondheid en welzijn. Ontdek de voordelen die onze premium modellen bieden.
      </p>

      <ul className="space-y-5 mb-6" role="list">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-4" role="listitem">
            <div className="mt-1 text-[#0a1e3b] bg-gray-100 p-2 rounded-full">
              <FaCheckCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-[#0a1e3b]">{feature.title}</p>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </li>
        ))}
      </ul>

      <Link href="/producten">
        <Button className="bg-[#0a1e3b] text-white hover:bg-[#122d5a] px-6 py-4">
          Bekijk ons aanbod
        </Button>
      </Link>
    </div>

    {/* Afbeelding */}
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gray-100">
      <Image
        src="/comfort.webp"
        alt="Massagestoel gebruiken voor ontspanning en gezondheid"
        fill
        className="object-cover rounded-xl"
        priority
      />
    </div>
  </div>
</section>

  );
}
