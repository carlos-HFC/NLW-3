"use client";

import { cn } from "@/utils";
import Image from "next/image";
import { useState } from "react";

interface GalleryProps {
  images: Image[];
}

export function Gallery(props: GalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <>
      <div className="w-full h-80 relative">
        <Image
          src={props.images[activeImageIndex].url}
          alt={props.images[activeImageIndex].path}
          fill
          className="w-full object-cover"
        />
      </div>

      <div className="grid grid-cols-6 gap-4 mt-4 mx-10 mb-0">
        {props.images.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={cn("border-0 h-20 bg-transparent cursor-pointer rounded-2xl overflow-hidden outline-none relative", activeImageIndex === index ? "opacity-100" : "opacity-60")}
            onClick={() => setActiveImageIndex(index)}
          >
            <Image
              src={item.url}
              alt={item.path}
              fill
              className="w-full object-cover"
            />
          </button>
        ))}
      </div>
    </>
  );
}