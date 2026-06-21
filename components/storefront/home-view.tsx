import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

import type { Locale } from "@/lib/i18n";
import type { ProductCard } from "@/lib/types";

import { ProductGrid } from "./ui/product-grid";

interface HomeViewProps {
  locale: Locale;
  products: Promise<ProductCard[]>;
}

const collections = [
  { handle: "new-arrivals", title: "New In", blurb: "Fresh drops", color: "bg-pop-yellow" },
  { handle: "girls", title: "Girls", blurb: "Twirl-ready", color: "bg-pop-pink" },
  { handle: "boys", title: "Boys", blurb: "Adventure-proof", color: "bg-pop-blue" },
  { handle: "baby", title: "Baby", blurb: "Soft & snuggly", color: "bg-pop-green" },
];

export async function HomeView({ locale, products }: HomeViewProps) {
  const resolvedProducts = await products;

  return (
    <div className="space-y-8 pt-2">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-8 text-ink">
        <span className="absolute -right-8 -top-10 size-32 blob bg-card/40" aria-hidden />
        <span className="absolute -bottom-6 right-10 size-16 blob-2 bg-pop-pink/50" aria-hidden />
        <div className="relative max-w-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-background">
            <Sparkles className="size-3.5" /> New summer collection
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance">
            Little styles for{" "}
            <span className="italic">big adventures</span>
          </h1>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink/70">
            Playful, comfy, made-to-move clothing for the tiniest trendsetters.
          </p>
          <Link
            href="/collections/all"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-105 active:scale-95"
          >
            Shop now <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* Collection chips */}
      <section>
        <h2 className="mb-3 font-display text-xl font-semibold tracking-tight">Shop by category</h2>
        <div className="grid grid-cols-2 gap-3">
          {collections.map((c) => (
            <Link
              key={c.handle}
              href={`/collections/${c.handle}`}
              className={`group relative flex h-24 flex-col justify-between overflow-hidden rounded-3xl ${c.color} p-4 text-ink transition-transform hover:-translate-y-1`}
            >
              <span
                className="absolute -right-4 -top-6 size-16 blob bg-card/40 transition-transform group-hover:scale-110"
                aria-hidden
              />
              <span className="relative text-xs font-medium text-ink/70">{c.blurb}</span>
              <span className="relative font-display text-2xl font-semibold tracking-tight">
                {c.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section>
        <div className="mb-3 flex items-end justify-between">
          <h2 className="font-display text-xl font-semibold tracking-tight">Loved by little ones</h2>
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
    </div>
  );
}

export function HomeViewFallback({ locale: _locale }: { locale: Locale }) {
  return (
    <div className="space-y-8 pt-2">
      <div className="h-64 animate-pulse rounded-[2rem] bg-accent" />
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-3xl bg-accent" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-[3/4] animate-pulse rounded-3xl bg-accent" />
        ))}
      </div>
    </div>
  );
}
