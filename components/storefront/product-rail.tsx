import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ProductCard } from "@/components/product-card/product-card";
import { Container } from "@/components/ui/container";
import { Slider, SliderContent, SliderItem, SliderNav } from "@/components/ui/slider";
import type { Locale } from "@/lib/i18n";
import type { ProductCard as ProductCardType } from "@/lib/types";

interface ProductRailProps {
  eyebrow: string;
  title: string;
  products: ProductCardType[];
  locale: Locale;
  viewAllHref?: string;
  viewAllLabel?: string;
  outOfStockText?: string;
}

export function ProductRail({
  eyebrow,
  title,
  products,
  locale,
  viewAllHref,
  viewAllLabel = "View all",
  outOfStockText,
}: ProductRailProps) {
  if (products.length === 0) return null;

  return (
    <Container>
      <Slider>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-muted-foreground">{eyebrow}</p>
            <h2 className="display mt-3 text-3xl font-semibold sm:text-4xl lg:text-5xl">{title}</h2>
          </div>
          <div className="flex items-center gap-4">
            {viewAllHref && (
              <Link
                href={viewAllHref}
                className="group hidden items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
              >
                {viewAllLabel}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
            <SliderNav />
          </div>
        </div>
        <SliderContent>
          {products.map((product) => (
            <SliderItem key={product.id}>
              <ProductCard product={product} locale={locale} outOfStockText={outOfStockText} />
            </SliderItem>
          ))}
        </SliderContent>
      </Slider>
    </Container>
  );
}
