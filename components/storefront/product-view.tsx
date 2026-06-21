import { ChevronLeft } from "lucide-react";
import Link from "next/link";

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

export async function ProductView({
  locale,
  product,
  selectedOptionsPromise,
  variantPromise,
}: ProductViewProps) {
  return (
    <div className="space-y-5 pt-2">
      <Link
        href="/collections/all"
        className="inline-flex items-center gap-1.5 rounded-full bg-card px-4 py-2 text-sm font-semibold text-ink shadow-sm ring-1 ring-border transition-colors hover:bg-accent"
      >
        <ChevronLeft className="size-4" /> Back to shop
      </Link>

      <div className="rounded-[2rem] bg-card p-5 shadow-sm ring-1 ring-border sm:p-7">
        <ProductDetailSection
          product={product}
          selectedOptionsPromise={selectedOptionsPromise}
          variantPromise={variantPromise}
          locale={locale}
        />
      </div>
    </div>
  );
}

export function ProductViewFallback({ handle, locale }: { handle: string; locale: Locale }) {
  void handle;
  void locale;
  return (
    <div className="space-y-5 pt-2">
      <div className="h-9 w-32 animate-pulse rounded-full bg-accent" />
      <div className="rounded-[2rem] bg-card p-5 shadow-sm ring-1 ring-border sm:p-7">
        <ProductDetailSectionSkeleton />
      </div>
    </div>
  );
}
