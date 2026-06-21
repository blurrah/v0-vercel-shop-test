import Link from "next/link";

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

export async function CollectionView({
  collection,
  collectionResultsDataPromise,
  locale,
}: CollectionViewProps) {
  const data = await collectionResultsDataPromise;
  const products = data.result.products;
  const count = products.length;

  return (
    <div className="space-y-6 pt-2">
      <header className="overflow-hidden rounded-[2rem] bg-primary px-6 py-7 text-ink">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink/60">
          {count} styles
        </p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-balance">
          {collection.title}
        </h1>
        {collection.description && (
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/70">
            {collection.description}
          </p>
        )}
      </header>

      <nav className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {quickLinks.map((link) => {
          const active = collection.handle === link.handle;
          return (
            <Link
              key={link.handle}
              href={`/collections/${link.handle}`}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                active
                  ? "bg-ink text-background"
                  : "bg-card text-ink ring-1 ring-border hover:bg-accent"
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
        <p className="rounded-3xl bg-card p-8 text-center text-sm text-muted-foreground ring-1 ring-border">
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
    <div className="space-y-6 pt-2">
      <div className="h-40 animate-pulse rounded-[2rem] bg-accent" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-[3/4] animate-pulse rounded-3xl bg-accent" />
        ))}
      </div>
    </div>
  );
}
