"use client";

import { useEffect, useState } from "react";
import { FaTruck, FaShieldAlt, FaClock, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const uspItems = [
  {
    icon: <FaTruck className="h-5 w-5 text-[#0a1e3b]" />,
    title: "Gratis Bezorging",
    description: "Door heel Nederland",
  },
  {
    icon: <FaShieldAlt className="h-5 w-5 text-[#0a1e3b]" />,
    title: " 5 jaar garantie op het mechanisme en 2 jaar op beweegbare onderdelen",
    description: "Op alle massagestoelen",
  },
  {
    icon: <FaClock className="h-5 w-5 text-[#0a1e3b]" />,
    title: "14 Dagen Proefperiode",
    description: "Niet tevreden? Geld terug",
  },
  {
    icon: <FaStar className="h-5 w-5 text-[#0a1e3b]" />,
    title: "Klantwaardering 4.9/5",
    description: "Gebaseerd op 500+ reviews",
  },
];

export default function UspBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % uspItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <div className="w-full bg-white border-t border-gray-200 overflow-hidden">
      <div className="container mx-auto px-4 py-8">
        {isMobile ? (
          <div className="relative w-full overflow-hidden">
            <motion.div
              className="flex gap-4"
              animate={{ x: `-${currentIndex * 85}vw` }}
              transition={{ type: "tween", duration: 0.6 }}
            >
              {uspItems.map((usp, index) => (
                <div
                  key={index}
                  className="min-w-[80vw] flex-shrink-0  rounded-lg p-4 flex items-center gap-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    {usp.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0a1e3b]">
                      {usp.title}
                    </p>
                    <p className="text-sm text-gray-500">{usp.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        ) : (
          <div className="flex justify-between gap-10">
            {uspItems.map((usp, index) => (
              <div
                key={index}
                className="flex items-center gap-4 text-left w-full"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  {usp.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0a1e3b]">
                    {usp.title}
                  </p>
                  <p className="text-sm text-gray-500">{usp.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
