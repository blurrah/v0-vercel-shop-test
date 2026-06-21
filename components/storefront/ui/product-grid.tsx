import { ProductCard } from "@/components/product-card/product-card";
import type { Locale } from "@/lib/i18n";
import type { ProductCard as ProductCardType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: ProductCardType[];
  locale: Locale;
  outOfStockText?: string;
  className?: string;
}

/** Presentational grid: playful rounded cards on a soft card surface. */
export function ProductGrid({ products, locale, outOfStockText, className }: ProductGridProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-4 sm:grid-cols-3", className)}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          locale={locale}
          outOfStockText={outOfStockText}
          aspectRatio="portrait"
          className={cn(
            "group rounded-3xl bg-card p-2.5 shadow-sm ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-md",
            "[&_[data-slot=product-card-image]]:overflow-hidden [&_[data-slot=product-card-image]]:rounded-2xl",
            "[&_[data-slot=product-card-content]]:px-1.5",
            index % 5 === 0 && "[&_[data-slot=product-card-image]]:bg-pop-pink/30",
            index % 5 === 1 && "[&_[data-slot=product-card-image]]:bg-pop-yellow/30",
            index % 5 === 2 && "[&_[data-slot=product-card-image]]:bg-pop-blue/30",
            index % 5 === 3 && "[&_[data-slot=product-card-image]]:bg-pop-green/30",
            index % 5 === 4 && "[&_[data-slot=product-card-image]]:bg-accent",
          )}
        />
      ))}
    </div>
  );
}
