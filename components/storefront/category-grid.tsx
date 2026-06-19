import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { cn } from "@/lib/utils";

export interface CategoryTileData {
  handle: string;
  title: string;
  imageUrl: string | null;
}

interface CategoryGridProps {
  eyebrow: string;
  title: string;
  categories: CategoryTileData[];
}

export function CategoryGrid({ eyebrow, title, categories }: CategoryGridProps) {
  if (categories.length === 0) return null;

  // Feature the first tile larger for editorial rhythm.
  const tiles = categories.slice(0, 5);

  return (
    <Container>
      <div className="mb-8">
        <p className="eyebrow text-muted-foreground">{eyebrow}</p>
        <h2 className="display mt-3 text-3xl font-semibold sm:text-4xl lg:text-5xl">{title}</h2>
      </div>

      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-3">
        {tiles.map((category, index) => (
          <CategoryTile
            key={category.handle}
            category={category}
            featured={index === 0}
            index={index}
          />
        ))}
      </div>
    </Container>
  );
}

function CategoryTile({
  category,
  featured,
  index,
}: {
  category: CategoryTileData;
  featured: boolean;
  index: number;
}) {
  return (
    <Link
      href={`/collections/${category.handle}`}
      className={cn(
        "group relative isolate flex flex-col justify-end overflow-hidden rounded-lg bg-secondary",
        featured
          ? "col-span-2 aspect-[4/5] sm:aspect-[16/10] lg:col-span-2 lg:row-span-2 lg:aspect-auto"
          : "aspect-[4/5] sm:aspect-square",
      )}
    >
      {category.imageUrl ? (
        <Image
          src={category.imageUrl}
          alt={category.title}
          fill
          sizes="(max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0">
          <ImagePlaceholder className="size-full" />
        </div>
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
      />
      <div className="relative z-10 flex items-end justify-between gap-4 p-5">
        <div>
          <p className="eyebrow text-white/60">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3
            className={cn(
              "mt-2 font-semibold tracking-tight text-white",
              featured ? "text-2xl sm:text-3xl" : "text-xl",
            )}
          >
            {category.title}
          </h3>
        </div>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-foreground">
          <ArrowUpRight className="size-5" />
        </span>
      </div>
    </Link>
  );
}
