// components/admin/products/image-upload.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  onRemove: (url: string) => void;
}

export default function ImageUpload({
  value,
  onChange,
  onRemove,
}: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      // Create a FormData object to send the file
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]!);
      }

      // Send the file to the upload API
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to upload image");
      }

      const data = await response.json();

      // Update the state with the new image URLs
      onChange([...value, ...data.urls]);

      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast.success("Images uploaded successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to upload images");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async (url: string) => {
    try {
      // Extract the filename from the URL
      const filename = url.split("/").pop();

      if (!filename) {
        throw new Error("Invalid file URL");
      }

      // Send delete request to the API
      const response = await fetch(
        `/api/upload?filename=${encodeURIComponent(filename)}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to delete image");
      }

      // Remove the URL from the state
      onRemove(url);

      toast.success("Image deleted successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete image");
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="group relative h-[200px] w-[200px] overflow-hidden rounded-md"
          >
            <div className="absolute top-2 right-2 z-10 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => handleDeleteImage(url)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Product image"
              src={`${process.env.NEXT_PUBLIC_SITE_URL}/${url}`}
            />
          </div>
        ))}

        {isUploading && (
          <div className="relative flex h-[200px] w-[200px] items-center justify-center overflow-hidden rounded-md border-2 border-dashed border-gray-300">
            <Loader2 className="h-8 w-8 animate-spin text-blue-900" />
            <span className="text-muted-foreground mt-2 text-sm">
              Uploading...
            </span>
          </div>
        )}
      </div>

      <div>
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          disabled={isUploading}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="border-2 border-dashed border-blue-900/50 hover:border-blue-900"
        >
          <ImagePlus className="mr-2 h-4 w-4" />
          Add Image
        </Button>
      </div>
    </div>
  );
}
