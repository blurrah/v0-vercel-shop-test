import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Price } from "@/components/product/price";
import type { Locale } from "@/lib/i18n";
import type { ProductCard as ProductCardType } from "@/lib/types";

interface EditorialSpotlightProps {
  product: ProductCardType;
  locale: Locale;
}

const SPECS = [
  ["Weight", "212 g"],
  ["Drop", "8 mm"],
  ["Surface", "Road / Trail"],
  ["Cushioning", "Responsive"],
];

export function EditorialSpotlight({ product, locale }: EditorialSpotlightProps) {
  return (
    <section className="relative w-full bg-foreground text-background">
      <div className="grid lg:grid-cols-2">
        {/* Imagery — light panel so transparent product cutouts stay visible */}
        <div className="relative aspect-square w-full overflow-hidden bg-secondary lg:aspect-auto lg:min-h-[680px]">
          {product.featuredImage?.url && (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          )}
        </div>

        {/* Copy */}
        <div className="flex flex-col justify-center gap-10 px-5 py-16 lg:px-16 lg:py-24">
          <div>
            <p className="eyebrow text-background/60">Product of the month</p>
            <h2 className="display mt-6 text-5xl font-semibold sm:text-6xl lg:text-7xl">
              {product.title}
            </h2>
            <div className="mt-6">
              <Price
                amount={product.price.amount}
                currencyCode={product.price.currencyCode}
                locale={locale}
                className="text-xl text-background"
              />
            </div>
          </div>

          {/* Monospace spec table */}
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-background/15 bg-background/15 sm:grid-cols-4">
            {SPECS.map(([label, value]) => (
              <div key={label} className="flex flex-col gap-2 bg-foreground p-4">
                <dt className="eyebrow text-background/50">{label}</dt>
                <dd className="font-mono text-sm text-background">{value}</dd>
              </div>
            ))}
          </dl>

          <div>
            <Link
              href={`/products/${product.handle}`}
              className="group inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5"
            >
              View product
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
