// components/product/ProductImageGallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import ImageZoom from "./ImageZoom";

interface ProductImageGalleryProps {
  images: string[];
  title: string;
}

export default function ProductImageGallery({
  images,
  title,
}: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);

  // Default image if no images are available
  const defaultImage = "/placeholder.jpg";
  const imageList = images.length > 0 ? images : [defaultImage];

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div>
      {/* Main image */}
      <div className="relative mb-4 h-[400px] overflow-hidden rounded-lg bg-gray-100">
        <Image
  src={`${process.env.NEXT_PUBLIC_SITE_URL}/${imageList[activeIndex]}`}
  alt={`${title} - afbeelding ${activeIndex + 1}`}
  fill
  style={{ objectFit: "contain" }}
  className="cursor-zoom-in"
  onClick={() => setZoomIndex(activeIndex)}
  onError={(e) => {
    e.currentTarget.style.display = "none";
  }}
/>


        {imageList.length > 1 && (
          <>
            <button
              className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:bg-gray-100"
              onClick={handlePrevious}
              aria-label="Vorige afbeelding"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:bg-gray-100"
              onClick={handleNext}
              aria-label="Volgende afbeelding"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        <button
          className="absolute right-4 bottom-4 rounded-full bg-white p-2 shadow-md hover:bg-gray-100"
          onClick={() => setZoomIndex(activeIndex)}
          aria-label="Inzoomen"
        >
          <ZoomIn size={20} />
        </button>
      </div>

      {/* Thumbnail strip */}
      {imageList.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {imageList.map((image, idx) => (
            <button
              key={idx}
              className={`relative h-20 w-20 overflow-hidden rounded border-2 ${
                idx === activeIndex ? "border-blue-900" : "border-transparent"
              }`}
              onClick={() => setActiveIndex(idx)}
            >
              <Image
  src={`${process.env.NEXT_PUBLIC_SITE_URL}/${image}`}
  alt={`${title} - thumbnail ${idx + 1}`}
  fill
  style={{ objectFit: "cover" }}
  onError={(e) => {
    e.currentTarget.style.display = "none";
  }}
/>

            </button>
          ))}
        </div>
      )}

      {/* Zoom dialog */}
      <Dialog
        open={zoomIndex !== null}
        onOpenChange={(open) => {
          if (!open) setZoomIndex(null);
        }}
      >
        <DialogContent className="max-w-5xl bg-black/90 p-0">
          <div className="relative h-[80vh] w-full">
            {zoomIndex !== null && (
              <ImageZoom
                src={`${process.env.NEXT_PUBLIC_SITE_URL}/${imageList[zoomIndex]!}`}
                alt={`${title} - afbeelding ${zoomIndex + 1}`}
                onClose={() => setZoomIndex(null)}
              />
            )}

            {imageList.length > 1 && (
              <>
                <button
                  className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:bg-gray-100"
                  onClick={() => {
                    const newIndex =
                      zoomIndex === 0
                        ? imageList.length - 1
                        : (zoomIndex || 0) - 1;
                    setZoomIndex(newIndex);
                    setActiveIndex(newIndex);
                  }}
                  aria-label="Vorige afbeelding"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:bg-gray-100"
                  onClick={() => {
                    const newIndex =
                      zoomIndex === imageList.length - 1
                        ? 0
                        : (zoomIndex || 0) + 1;
                    setZoomIndex(newIndex);
                    setActiveIndex(newIndex);
                  }}
                  aria-label="Volgende afbeelding"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
