import { ArrowRight, Droplets, Heart, Leaf, Ruler, Sparkles, Truck } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import {
  ProductDetailSection,
  ProductDetailSectionSkeleton,
} from "@/components/product-detail/product-detail-section";
import type { Locale } from "@/lib/i18n";
import type { SelectedOptions } from "@/lib/product";
import { getCollections } from "@/lib/shopify/operations/collections";
import { getProductRecommendations } from "@/lib/shopify/operations/products";
import type { ProductDetails, ProductVariant } from "@/lib/types";

import { ProductGrid } from "./ui/product-grid";

interface ProductViewProps {
  locale: Locale;
  product: ProductDetails;
  selectedOptionsPromise: Promise<SelectedOptions>;
  variantPromise: Promise<ProductVariant | undefined>;
}

/* Playful stage that wraps the shared product-detail section:
   a soft themed panel with organic blob accents and rounded media tiles,
   so the page feels designed rather than a plain white card. */
const stageClasses = [
  // Round + lift the mobile carousel tiles (.snap-start) ...
  "[&_.snap-start]:rounded-[1.75rem]",
  "[&_.snap-start]:bg-card",
  "[&_.snap-start]:shadow-sm",
  // ... and the desktop 2-col grid tiles (direct children of .grid-cols-2).
  // Color swatches live in a grid-cols-4, so they're never matched.
  "[&_.grid-cols-2>div]:rounded-[1.75rem]",
  "[&_.grid-cols-2>div]:bg-card",
  "[&_.grid-cols-2>div]:shadow-sm",
].join(" ");

const perks = [
  { icon: Leaf, label: "Organic cotton", note: "Soft & breathable", tint: "bg-pop-green/35" },
  { icon: Droplets, label: "Machine washable", note: "Wash cold, tumble low", tint: "bg-pop-blue/35" },
  { icon: Truck, label: "Free returns", note: "30 days, no fuss", tint: "bg-pop-yellow/45" },
  { icon: Heart, label: "Built for play", note: "Tested by real kids", tint: "bg-pop-pink/35" },
];

export async function ProductView({
  locale,
  product,
  selectedOptionsPromise,
  variantPromise,
}: ProductViewProps) {
  const sizeOption = product.options.find((o) => o.name.toLowerCase() === "size");
  const sizes = sizeOption?.values.map((v) => v.name) ?? [];

  const specs = [
    { label: "Material", value: "Soft organic cotton blend" },
    { label: "Care", value: "Machine wash cold, tumble dry low" },
    { label: "Fit", value: "True to size — roomy for play" },
    sizes.length > 0 ? { label: "Sizes", value: sizes.join(" · ") } : null,
    { label: "Brand", value: product.vendor ?? "Pippin" },
    { label: "Style code", value: product.handle.toUpperCase() },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="space-y-12 pt-2">
      <section className="relative overflow-hidden rounded-[3rem_1rem_3rem_1rem] bg-accent/70 p-5 sm:rounded-[4rem_1.5rem_4rem_1.5rem] sm:p-9">
        {/* Decorative organic accents */}
        <div className="pointer-events-none absolute -right-12 -top-12 size-44 rounded-full bg-primary/50" />
        <div className="pointer-events-none absolute -bottom-16 -left-10 size-48 blob bg-pop-pink/25" />

        {/* Floating sticker */}
        <div className="absolute right-5 top-5 z-10 flex items-center gap-1.5 rounded-full bg-pop-yellow px-3.5 py-1.5 text-xs font-bold text-ink shadow-md ring-2 ring-background rotate-3 sm:right-9 sm:top-9">
          <Sparkles className="size-3.5" strokeWidth={2.5} />
          Just dropped
        </div>

        <div className={`relative ${stageClasses}`}>
          <ProductDetailSection
            product={product}
            selectedOptionsPromise={selectedOptionsPromise}
            variantPromise={variantPromise}
            locale={locale}
          />
        </div>
      </section>

      {/* Perks band — playful reassurance cards */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {perks.map((perk, i) => (
          <div
            key={perk.label}
            className="flex flex-col gap-2 rounded-[1.75rem] bg-card p-4 shadow-sm ring-1 ring-border"
          >
            <span
              className={`flex size-11 items-center justify-center rounded-2xl ${perk.tint} ${
                i % 2 === 0 ? "-rotate-3" : "rotate-3"
              }`}
            >
              <perk.icon className="size-5 text-ink" strokeWidth={2} />
            </span>
            <span className="font-display text-base font-semibold leading-tight text-ink">
              {perk.label}
            </span>
            <span className="text-xs text-ink/60">{perk.note}</span>
          </div>
        ))}
      </section>

      {/* The details — specs in a playful panel */}
      <section className="relative overflow-hidden rounded-[1rem_3rem_1rem_3rem] bg-secondary/60 p-6 sm:p-9">
        <div className="pointer-events-none absolute -right-10 -bottom-12 size-40 blob bg-primary/30" />
        <div className="relative flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-full bg-pop-pink text-ink -rotate-6">
            <Ruler className="size-4.5" strokeWidth={2.25} />
          </span>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
            The little details
          </h2>
        </div>

        <p className="relative mt-3 max-w-2xl text-pretty leading-relaxed text-ink/70">
          Everything we make is designed for real childhood — comfy enough for nap time,
          tough enough for the playground, and cute enough for the photos in between.
        </p>

        <dl className="relative mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="flex items-baseline justify-between gap-4 border-b border-ink/10 pb-3"
            >
              <dt className="text-sm font-semibold text-ink/60">{spec.label}</dt>
              <dd className="text-right text-sm font-medium text-ink">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Shop the collections this product lives in */}
      {product.collectionHandles.length > 0 && (
        <Suspense fallback={null}>
          <CollectionChips handles={product.collectionHandles} locale={locale} />
        </Suspense>
      )}

      {/* You might also like — streamed recommendations */}
      <Suspense fallback={<RelatedFallback />}>
        <RelatedProducts handle={product.handle} locale={locale} />
      </Suspense>
    </div>
  );
}

async function CollectionChips({ handles, locale }: { handles: string[]; locale: Locale }) {
  const all = await getCollections({ locale });
  const matched = all.filter((c) => handles.includes(c.handle));
  if (matched.length === 0) return null;

  const chipTints = ["bg-pop-pink/40", "bg-pop-blue/40", "bg-pop-green/40", "bg-pop-yellow/50"];

  return (
    <section>
      <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
        Find it in
      </h2>
      <div className="mt-4 flex flex-wrap gap-3">
        {matched.map((c, i) => (
          <Link
            key={c.handle}
            href={c.path}
            className={`group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-ink shadow-sm ring-1 ring-ink/5 transition-transform hover:-translate-y-0.5 ${
              chipTints[i % chipTints.length]
            }`}
          >
            {c.title}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </section>
  );
}

async function RelatedProducts({ handle, locale }: { handle: string; locale: Locale }) {
  const recommendations = (await getProductRecommendations({ handle, locale }))
    .filter((p) => p.handle !== handle)
    .slice(0, 5);

  if (recommendations.length === 0) return null;

  return (
    <section>
      <div className="flex items-center gap-2">
        <span className="flex size-9 items-center justify-center rounded-full bg-pop-yellow text-ink rotate-6">
          <Heart className="size-4.5" strokeWidth={2.25} />
        </span>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
          You might also love
        </h2>
      </div>
      <div className="mt-5">
        <ProductGrid products={recommendations} />
      </div>
    </section>
  );
}

function RelatedFallback() {
  return (
    <section>
      <div className="h-8 w-48 animate-pulse rounded-full bg-accent" />
      <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="aspect-[3/4] animate-pulse rounded-[1.75rem] bg-accent" />
        ))}
      </div>
    </section>
  );
}

export function ProductViewFallback({ handle, locale }: { handle: string; locale: Locale }) {
  void handle;
  void locale;
  return (
    <div className="pt-2">
      <section className="rounded-[3rem_1rem_3rem_1rem] bg-accent/70 p-5 sm:rounded-[4rem_1.5rem_4rem_1.5rem] sm:p-9">
        <ProductDetailSectionSkeleton />
      </section>
    </div>
  );
}
