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

/* Soft, alternating photo-tile tints. */
const tints = [
  "[&_[data-slot=product-card-image]]:bg-pop-pink/25",
  "[&_[data-slot=product-card-image]]:bg-pop-blue/25",
  "[&_[data-slot=product-card-image]]:bg-pop-yellow/30",
  "[&_[data-slot=product-card-image]]:bg-pop-green/25",
];

/* Playful, varied silhouettes so no two neighbours share the same shape:
   a top arch, asymmetric corners both ways, and a soft squircle. */
const shapes = [
  "[&_[data-slot=product-card-image]]:rounded-t-[4.5rem] [&_[data-slot=product-card-image]]:rounded-b-[1.5rem]",
  "[&_[data-slot=product-card-image]]:rounded-[2.75rem_0.85rem_2.75rem_0.85rem]",
  "[&_[data-slot=product-card-image]]:rounded-[1.5rem]",
  "[&_[data-slot=product-card-image]]:rounded-[0.85rem_2.75rem_0.85rem_2.75rem]",
];

/**
 * Presentational grid of large product tiles. Each tile gets a generous tinted
 * photo with an alternating playful silhouette, and the name/price underneath.
 */
export function ProductGrid({ products, locale, outOfStockText, className }: ProductGridProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3", className)}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          locale={locale}
          outOfStockText={outOfStockText}
          aspectRatio="portrait"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
          className={cn(
            "group block",
            "[&_[data-slot=product-card-image]_img]:transition-transform [&_[data-slot=product-card-image]_img]:duration-500 group-hover:[&_[data-slot=product-card-image]_img]:scale-105",
            "[&_[data-slot=product-card-content]]:px-1",
            tints[index % tints.length],
            shapes[index % shapes.length],
          )}
        />
      ))}
    </div>
  );
}
