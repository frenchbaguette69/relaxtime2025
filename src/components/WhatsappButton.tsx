// components/WhatsappButton.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

export default function WhatsappButton() {
  return (
    <Link
      href="https://wa.me/31648582729" // ← pas dit nummer aan!
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 shadow-lg rounded-full"
    >
      <Image
        src="/whatsapp-icon.png" // of "/whatsapp.svg" / external URL
        alt="Chat met ons via WhatsApp"
        width={56}
        height={56}
        className="hover:scale-110 transition-transform duration-300"
      />
    </Link>
  );
}