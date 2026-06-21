import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/lib/i18n";
import type { ProductCard } from "@/lib/types";

import { ProductGrid } from "./ui/product-grid";

interface HomeViewProps {
  locale: Locale;
  products: Promise<ProductCard[]>;
}

const collections = [
  {
    handle: "girls",
    title: "Girls",
    blurb: "Twirl-ready",
    image: "/lifestyle/collection-girls.png",
    tint: "bg-pop-pink/30",
  },
  {
    handle: "boys",
    title: "Boys",
    blurb: "Adventure-proof",
    image: "/lifestyle/collection-boys.png",
    tint: "bg-pop-blue/30",
  },
  {
    handle: "baby",
    title: "Baby",
    blurb: "Soft & snuggly",
    image: "/lifestyle/collection-baby.png",
    tint: "bg-pop-green/30",
  },
  {
    handle: "new-arrivals",
    title: "New In",
    blurb: "Fresh drops",
    image: "/lifestyle/collection-new.png",
    tint: "bg-pop-yellow/40",
  },
];

export async function HomeView({ locale, products }: HomeViewProps) {
  const resolvedProducts = await products;

  return (
    <div className="space-y-12 pt-2">
      {/* Hero — big editorial photo */}
      <section className="relative overflow-hidden rounded-[2rem] bg-accent">
        <div className="relative aspect-[4/5] w-full sm:aspect-[16/10]">
          <Image
            src="/lifestyle/hero-summer.png"
            alt="Two children playing in colorful summer clothing"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <span className="inline-flex items-center rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">
            Summer collection
          </span>
          <h1 className="mt-3 max-w-md font-display text-4xl font-semibold leading-[1.02] tracking-tight text-balance text-background sm:text-5xl">
            Little styles for <span className="italic">big adventures</span>
          </h1>
          <Link
            href="/collections/all"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-background px-5 py-3 text-sm font-semibold text-ink transition-transform hover:scale-105 active:scale-95"
          >
            Shop the collection <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* Collections — big photo tiles */}
      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold tracking-tight">Shop by category</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {collections.map((c) => (
            <Link
              key={c.handle}
              href={`/collections/${c.handle}`}
              className="group relative overflow-hidden rounded-[1.75rem]"
            >
              <div className={`relative aspect-[4/5] w-full ${c.tint}`}>
                <Image
                  src={c.image}
                  alt={`${c.title} collection`}
                  fill
                  sizes="(max-width: 768px) 50vw, 360px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/45 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <span className="block text-xs font-medium text-background/80">{c.blurb}</span>
                <span className="font-display text-2xl font-semibold tracking-tight text-background">
                  {c.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold tracking-tight">Loved by little ones</h2>
          <Link
            href="/collections/all"
            className="text-sm font-semibold text-ink/60 transition-colors hover:text-ink"
          >
            View all
          </Link>
        </div>
        {resolvedProducts.length > 0 ? (
          <ProductGrid products={resolvedProducts} locale={locale} outOfStockText="Sold out" />
        ) : (
          <p className="rounded-3xl bg-card p-6 text-center text-sm text-muted-foreground ring-1 ring-border">
            New styles are on their way.
          </p>
        )}
      </section>

      {/* Story band — big editorial photo */}
      <section className="relative overflow-hidden rounded-[2rem]">
        <div className="relative aspect-[16/11] w-full sm:aspect-[16/8]">
          <Image
            src="/lifestyle/story-play.png"
            alt="Children playing together outdoors"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/50 to-transparent" />
        </div>
        <div className="absolute inset-y-0 left-0 flex max-w-xs flex-col justify-center p-6 sm:p-8">
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-balance text-background">
            Made to play, built to last
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-background/80">
            Soft, durable fabrics designed for muddy knees, big imaginations and hand-me-downs.
          </p>
        </div>
      </section>
    </div>
  );
}

export function HomeViewFallback({ locale: _locale }: { locale: Locale }) {
  return (
    <div className="space-y-12 pt-2">
      <div className="aspect-[4/5] animate-pulse rounded-[2rem] bg-accent sm:aspect-[16/10]" />
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="aspect-[4/5] animate-pulse rounded-[1.75rem] bg-accent" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-[3/4] animate-pulse rounded-[1.75rem] bg-accent" />
        ))}
      </div>
    </div>
  );
}
