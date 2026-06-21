import { Search } from "lucide-react";
import Link from "next/link";

import type { Locale } from "@/lib/i18n";
import type { SearchResultsData } from "@/lib/search/server";

import { ProductGrid } from "./ui/product-grid";

interface SearchViewProps {
  locale: Locale;
  searchResultsDataPromise: Promise<SearchResultsData>;
}

const suggestions = ["Dresses", "Hoodies", "Dungarees", "Rainy days", "Pajamas"];

export async function SearchView({ locale, searchResultsDataPromise }: SearchViewProps) {
  const data = await searchResultsDataPromise;
  const hasQuery = Boolean(data.query && data.query.length > 0);

  return (
    <div className="space-y-6 pt-2">
      <form action="/search" className="relative">
        <Search className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-ink/40" />
        <input
          type="search"
          name="q"
          defaultValue={data.query ?? ""}
          autoFocus={!hasQuery}
          placeholder="Search for tees, dresses, hats…"
          className="w-full rounded-full bg-card py-4 pl-14 pr-5 text-base text-ink shadow-sm ring-1 ring-border outline-none transition-all placeholder:text-ink/40 focus:ring-2 focus:ring-ring"
        />
      </form>

      {hasQuery ? (
        <>
          <div className="flex items-baseline justify-between">
            <h1 className="font-display text-2xl font-semibold tracking-tight">
              {data.total} {data.total === 1 ? "result" : "results"}
            </h1>
            <p className="text-sm text-ink/50">
              for <span className="font-semibold text-ink">{data.query}</span>
            </p>
          </div>
          {data.products.length > 0 ? (
            <ProductGrid products={data.products} locale={locale} outOfStockText="Sold out" />
          ) : (
            <div className="rounded-3xl bg-card p-8 text-center ring-1 ring-border">
              <p className="font-display text-lg font-semibold">No matches yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a different word, or browse our collections.
              </p>
              <Link
                href="/collections/all"
                className="mt-4 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-background"
              >
                Browse everything
              </Link>
            </div>
          )}
        </>
      ) : (
        <section>
          <h2 className="mb-3 font-display text-lg font-semibold tracking-tight">Popular searches</h2>
          <div className="flex flex-wrap gap-2.5">
            {suggestions.map((term) => (
              <Link
                key={term}
                href={`/search?q=${encodeURIComponent(term)}`}
                className="rounded-full bg-card px-4 py-2.5 text-sm font-semibold text-ink ring-1 ring-border transition-colors hover:bg-accent"
              >
                {term}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export function SearchViewFallback({ locale: _locale }: { locale: Locale }) {
  return (
    <div className="space-y-6 pt-2">
      <div className="h-14 animate-pulse rounded-full bg-accent" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-[3/4] animate-pulse rounded-3xl bg-accent" />
        ))}
      </div>
    </div>
  );
}
