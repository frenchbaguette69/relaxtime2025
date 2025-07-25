import { NextResponse } from "next/server";
import { keywords } from "./keywords";
import { createGroqClient } from "@/lib/groq";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

export async function POST() {
  try {
    const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)] ?? "massagestoel kopen";
    const client = createGroqClient();

    const prompt = `Je bent een professionele SEO-copywriter gespecialiseerd in massagestoelen, wellness en ontspanning.

Je taak is om een volledig kant-en-klare SEO-geoptimaliseerde blogpost te schrijven voor de website https://Massagestoel-kopen.com.

BELANGRIJK:
- Begin DIRECT met de HTML output, zonder enige inleiding, uitleg of tekst.
- Schrijf uitsluitend geldige HTML, beginnend vanaf <h1>. Voeg GEEN extra tekst of uitleg toe.
- Geef GEEN titels als "Hier is de blog post" of iets dergelijks.

Gebruik het volgende keyword als hoofdonderwerp: "${randomKeyword}".

Specificaties voor de blogpost:

Taal: Nederlands

Vormgeving: Gebruik zuivere HTML-tags (<h1>, <h2>, <h3>, <p>, <ul>, <li>, <strong>, etc.)

Titel: Plaats het gekozen keyword in een <h1>.

Introductie:
- Schrijf een aantrekkelijke introductie in een <p>.
- Leg kort uit waarom ontspanning en goede massage belangrijk zijn voor de gezondheid.

Kerntekst:
- Gebruik duidelijke tussenkoppen (<h2>, <h3>) die het onderwerp logisch opdelen.
- Benoem voordelen van massagestoelen, de verschillende soorten massagetechnieken, gezondheidsvoordelen, onderhoudstips en kooptips.
- Verwerk praktische tips gericht op aanschaf, onderhoud en gebruik van massagestoelen.

SEO-eisen:
- Gebruik het gekozen keyword minimaal 5 keer verspreid door de tekst.
- Zorg dat het keyword voorkomt in de <h1>, minstens één <h2> en enkele paragrafen.
- Houd de tekst natuurlijk leesbaar; voorkom keyword-stuffing.

Lengte:
- Minimaal 1500 woorden.

Commerciële toevoegingen:
- Noem Massagestoel-kopen.com meerdere keren als dé specialist in massagestoelen en wellnessproducten.
- Stimuleer bezoekers subtiel om hun massagestoel of accessoires aan te schaffen via Massagestoel-kopen.com.

Afsluiting:
- Vat de belangrijkste punten samen.
- Voeg een duidelijke call-to-action toe: "Bekijk ons assortiment of vraag vrijblijvend advies aan via Massagestoel-kopen.com."

BELANGRIJK:
- Voeg onderaan de blog deze HTML-tags toe:

<metaTitle>Hier de meta title</metaTitle>
<metaDescription>Hier de meta description</metaDescription>

Nogmaals: geef uitsluitend pure geldige HTML output. Geen tekst erboven, geen uitleg, geen afsluiting, geen titels als "Hier is de blog post". Alleen de blog content in HTML.
`;

    const response = await client.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [{ role: "user", content: prompt }],
    });

    const fullText = response.choices[0]?.message?.content?.trim() || "";
    const metaTitleMatch = fullText.match(/<metaTitle>(.*?)<\/metaTitle>/s);
    const metaDescriptionMatch = fullText.match(/<metaDescription>(.*?)<\/metaDescription>/s);
    const metaTitle = metaTitleMatch?.[1]?.trim() || "";
    const metaDescription = metaDescriptionMatch?.[1]?.trim() || "";
    const blogHtml = fullText.split("<metaTitle>")[0]?.trim() || "";

    const slug = slugify(randomKeyword, { lower: true, strict: true });
    const strippedContent = blogHtml.replace(/<[^>]+>/g, '');
    const description = strippedContent.substring(0, 200);

    const createdById = "cmb2xhe800000jxcn0404uuga"; // jouw admin user ID

    await prisma.post.create({
      data: {
        title: randomKeyword,
        slug: slug,
        description: description,
        content: blogHtml,
        metaTitle: metaTitle,
        metaDescription: metaDescription,
        createdById: createdById,
      },
    });

    return NextResponse.json({ message: "Blog created", keyword: randomKeyword });
  } catch (error) {
    console.error("Error generating blog:", error);
    return NextResponse.json({ message: "Error generating blog" }, { status: 500 });
  }
}
