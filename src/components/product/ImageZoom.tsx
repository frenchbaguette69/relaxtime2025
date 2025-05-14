// components/product/ImageZoom.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ZoomIn, ZoomOut, RotateCw, X } from "lucide-react";

interface ImageZoomProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export default function ImageZoom({ src, alt, onClose }: ImageZoomProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/90"
      onClick={onClose}
    >
      <div className="flex items-center justify-between p-4 text-white">
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleZoomIn();
            }}
            className="rounded-full bg-gray-800 p-2 hover:bg-gray-700"
            aria-label="Zoom in"
          >
            <ZoomIn size={20} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleZoomOut();
            }}
            className="rounded-full bg-gray-800 p-2 hover:bg-gray-700"
            aria-label="Zoom out"
          >
            <ZoomOut size={20} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleReset();
            }}
            className="rounded-full bg-gray-800 p-2 hover:bg-gray-700"
            aria-label="Reset zoom"
          >
            <RotateCw size={20} />
          </button>
        </div>
        <button
          onClick={onClose}
          className="rounded-full bg-gray-800 p-2 hover:bg-gray-700"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      <div
        ref={containerRef}
        className="flex flex-1 items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? "none" : "transform 0.2s ease",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="max-h-[80vh] max-w-full select-none"
            draggable="false"
          />
        </div>
      </div>

      <div className="px-4 py-2 text-center text-sm text-gray-300">
        <p>
          Muisknop ingedrukt houden om te verplaatsen. Scroll of gebruik knoppen
          om te zoomen.
        </p>
      </div>
    </div>
  );
}
