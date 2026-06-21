import Link from "next/link";
import Image from "next/image";

import type { CollectionResultsData, CollectionSearchState } from "@/lib/collections/server";
import type { Locale } from "@/lib/i18n";
import type { Collection } from "@/lib/types";

import { ProductGrid } from "./ui/product-grid";

interface CollectionViewProps {
  collection: Collection;
  collectionResultsDataPromise: Promise<CollectionResultsData>;
  locale: Locale;
  searchStatePromise: Promise<CollectionSearchState>;
  sortExclude?: string[];
}

const quickLinks = [
  { handle: "all", label: "All" },
  { handle: "new-arrivals", label: "New In" },
  { handle: "girls", label: "Girls" },
  { handle: "boys", label: "Boys" },
  { handle: "baby", label: "Baby" },
];

/* Per-collection editorial art direction. */
const looks: Record<
  string,
  { image: string; tint: string; badge: string; shape: string }
> = {
  all: {
    image: "/lifestyle/story-play.png",
    tint: "bg-pop-yellow/40",
    badge: "bg-pop-yellow",
    shape: "rounded-[1.5rem_5rem_1.5rem_5rem]",
  },
  "new-arrivals": {
    image: "/lifestyle/collection-new.png",
    tint: "bg-pop-yellow/40",
    badge: "bg-pop-yellow",
    shape: "rounded-[5rem_1.5rem_5rem_1.5rem]",
  },
  girls: {
    image: "/lifestyle/collection-girls.png",
    tint: "bg-pop-pink/40",
    badge: "bg-pop-pink",
    shape: "rounded-[5rem_1.5rem_5rem_1.5rem]",
  },
  boys: {
    image: "/lifestyle/collection-boys.png",
    tint: "bg-pop-blue/40",
    badge: "bg-pop-blue",
    shape: "rounded-[1.5rem_5rem_1.5rem_5rem]",
  },
  baby: {
    image: "/lifestyle/collection-baby.png",
    tint: "bg-pop-green/40",
    badge: "bg-pop-green",
    shape: "rounded-[5rem_1.5rem_5rem_1.5rem]",
  },
};

export async function CollectionView({
  collection,
  collectionResultsDataPromise,
  locale,
}: CollectionViewProps) {
  const data = await collectionResultsDataPromise;
  const products = data.result.products;
  const count = products.length;
  const look = looks[collection.handle] ?? looks.all;

  return (
    <div className="space-y-8 pt-2">
      {/* Editorial hero */}
      <header className="relative">
        <div className={`relative overflow-hidden ${look.shape} ${look.tint}`}>
          <div className="relative aspect-[16/10] w-full sm:aspect-[21/9]">
            <Image
              src={look.image}
              alt={`${collection.title} collection`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1280px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent" />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
            <h1 className="max-w-md font-display text-4xl font-semibold leading-[1.02] tracking-tight text-balance text-background sm:text-6xl">
              {collection.title}
            </h1>
            {collection.description && (
              <p className="mt-2 max-w-md text-sm leading-relaxed text-background/85 sm:text-base">
                {collection.description}
              </p>
            )}
          </div>
        </div>
        {/* Floating count sticker */}
        <div
          className={`absolute -right-1 -top-4 flex size-20 rotate-6 flex-col items-center justify-center rounded-full text-center shadow-md ring-4 ring-background sm:size-24 ${look.badge}`}
        >
          <span className="font-display text-2xl font-bold leading-none text-ink">{count}</span>
          <span className="text-[0.6rem] font-semibold uppercase tracking-wide text-ink/70">
            styles
          </span>
        </div>
      </header>

      {/* Category pills */}
      <nav className="no-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {quickLinks.map((link) => {
          const active = collection.handle === link.handle;
          return (
            <Link
              key={link.handle}
              href={`/collections/${link.handle}`}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-105 active:scale-95 ${
                active
                  ? "bg-ink text-background shadow-sm"
                  : "bg-card text-ink ring-1 ring-border"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {products.length > 0 ? (
        <ProductGrid products={products} locale={locale} outOfStockText="Sold out" />
      ) : (
        <p className="rounded-[2rem] bg-card p-10 text-center text-sm text-muted-foreground ring-1 ring-border">
          No products here yet. Check back soon!
        </p>
      )}
    </div>
  );
}

export function CollectionViewFallback({ handle, locale }: { handle: string; locale: Locale }) {
  void handle;
  void locale;
  return (
    <div className="space-y-8 pt-2">
      <div className="aspect-[16/10] animate-pulse rounded-[5rem_1.5rem_5rem_1.5rem] bg-accent sm:aspect-[21/9]" />
      <div className="flex gap-2.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 w-20 animate-pulse rounded-full bg-accent" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="aspect-[3/4] animate-pulse rounded-[1.75rem] bg-accent" />
        ))}
      </div>
    </div>
  );
}
