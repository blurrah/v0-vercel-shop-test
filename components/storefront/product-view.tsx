import { Sparkles } from "lucide-react";

import {
  ProductDetailSection,
  ProductDetailSectionSkeleton,
} from "@/components/product-detail/product-detail-section";
import type { Locale } from "@/lib/i18n";
import type { SelectedOptions } from "@/lib/product";
import type { ProductDetails, ProductVariant } from "@/lib/types";

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

export async function ProductView({
  locale,
  product,
  selectedOptionsPromise,
  variantPromise,
}: ProductViewProps) {
  return (
    <div className="pt-2">
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
    </div>
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
