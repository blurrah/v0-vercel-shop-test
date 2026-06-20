import { Suspense } from "react";

import { ProductsSlider } from "@/components/product/products-slider";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/lib/i18n";
import { getProductRecommendations } from "@/lib/shopify/operations/products";

async function Render({
  handle,
  locale,
  title,
}: {
  handle: string;
  locale: Locale;
  title: string;
}) {
  const recommendations = await getProductRecommendations({ handle, locale });
  if (recommendations.length === 0) return null;

  return (
    <Container className="py-16 lg:py-24">
      <ProductsSlider title={title} products={recommendations} locale={locale} />
    </Container>
  );
}

/** Horizontal "Viewed together" rail for the PDP. */
export function RelatedProductsSlider({
  handle,
  locale,
  title = "Viewed together",
}: {
  handle: string;
  locale: Locale;
  title?: string;
}) {
  return (
    <Suspense fallback={null}>
      <Render handle={handle} locale={locale} title={title} />
    </Suspense>
  );
}
