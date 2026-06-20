"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import type { Image as ImageType } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PdpGallery({
  images,
  title,
  className,
}: {
  images: ImageType[];
  title: string;
  className?: string;
}) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className={className}>
        <ImagePlaceholder className="aspect-square w-full" />
      </div>
    );
  }

  const count = images.length;
  const go = (next: number) => setActive((next + count) % count);
  const current = images[active];

  return (
    <div className={cn("flex flex-col gap-4 lg:flex-row-reverse lg:gap-5", className)}>
      {/* Main stage */}
      <div className="relative flex-1">
        <div className="relative aspect-square w-full overflow-hidden bg-secondary lg:aspect-[4/5]">
          <Image
            key={current.url}
            src={current.url}
            alt={current.altText || `${title} — view ${active + 1}`}
            fill
            priority={active === 0}
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
            draggable={false}
          />

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(active - 1)}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition hover:bg-background"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => go(active + 1)}
                aria-label="Next image"
                className="absolute right-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition hover:bg-background"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}

          {/* Index counter — On-style mono "1 / 6" */}
          <div className="absolute bottom-4 left-4 font-mono text-xs tabular-nums text-foreground">
            {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* Thumbnail rail: horizontal on mobile, vertical on desktop */}
      {count > 1 && (
        <div className="flex shrink-0 gap-2.5 overflow-x-auto scrollbar-hide lg:w-20 lg:flex-col lg:overflow-y-auto">
          {images.map((img, i) => (
            <button
              type="button"
              key={img.url}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active}
              className={cn(
                "relative aspect-square w-16 shrink-0 overflow-hidden bg-secondary transition lg:w-full",
                i === active ? "ring-2 ring-foreground ring-offset-2" : "opacity-60 hover:opacity-100",
              )}
            >
              <Image
                src={img.url}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
                draggable={false}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
