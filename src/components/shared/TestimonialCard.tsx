// components/shared/TestimonialCard.tsx
import Image from "next/image";
import { Star } from "lucide-react";

interface TestimonialProps {
  testimonial: {
    id: number;
    name: string;
    location: string;
    rating: number;
    text: string;
    image: string;
    product: string;
  };
}

export default function TestimonialCard({ testimonial }: TestimonialProps) {
  const { name, location, rating, text, image, product } = testimonial;

  return (
    <div className="flex h-full flex-col rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center">
        <div className="relative mr-4 h-12 w-12 overflow-hidden rounded-full">
          <Image src={image} alt={name} fill style={{ objectFit: "cover" }} />
        </div>
        <div>
          <h4 className="font-semibold text-blue-900">{name}</h4>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>

      <div className="mb-3 flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>

      <p className="mb-4 flex-grow text-gray-600">"{text}"</p>

      <div className="mt-auto border-t border-gray-100 pt-4 text-sm text-gray-500">
        Product: <span className="font-medium text-blue-900">{product}</span>
      </div>
    </div>
  );
}
