import { getTranslations } from "next-intl/server";

import { CategoryGrid, type CategoryTileData } from "@/components/storefront/category-grid";
import { EditorialSpotlight } from "@/components/storefront/editorial-spotlight";
import { Hero } from "@/components/storefront/hero";
import { ProductRail } from "@/components/storefront/product-rail";
import { Statement } from "@/components/storefront/statement";
import type { Locale } from "@/lib/i18n";
import { getCollections } from "@/lib/shopify/operations/collections";
import { getFilteredCatalogProducts } from "@/lib/shopify/operations/products";
import type { ProductCard } from "@/lib/types";

interface HomeViewProps {
  locale: Locale;
  products: Promise<ProductCard[]>;
}

const hasImage = (product: ProductCard) => Boolean(product.featuredImage?.url);

export async function HomeView({ locale, products }: HomeViewProps) {
  const [resolvedBestSellers, newArrivalsRaw, collections, t] = await Promise.all([
    products,
    getFilteredCatalogProducts({ sortKey: "date-new-to-old", limit: 12, locale }).then(
      (r) => r.products,
    ),
    getCollections({ limit: 6, locale }),
    getTranslations("product"),
  ]);

  // Resolve a representative product image per collection (collections have no images).
  const categories: CategoryTileData[] = await Promise.all(
    collections
      .filter((c) => c.handle !== "frontpage")
      .map(async (collection): Promise<CategoryTileData> => {
        const { products: collectionProducts } = await getFilteredCatalogProducts({
          collection: collection.handle,
          limit: 4,
          locale,
        });
        const withImage = collectionProducts.find(hasImage);
        return {
          handle: collection.handle,
          title: collection.title,
          imageUrl: withImage?.featuredImage?.url ?? null,
        };
      }),
  );

  const bestSellers = resolvedBestSellers.filter(hasImage);
  const newArrivals = newArrivalsRaw.filter(hasImage);

  const spotlight = bestSellers[0];
  // Avoid showing the spotlight product twice at the front of the best-sellers rail.
  const railProducts = bestSellers.length > 1 ? bestSellers.slice(1) : bestSellers;

  return (
    <div className="flex flex-col gap-20 pb-24 lg:gap-28">
      <Hero />

      <ProductRail
        eyebrow="Most wanted"
        title="Best sellers"
        products={railProducts}
        locale={locale}
        viewAllHref="/collections/all"
        outOfStockText={t("outOfStock")}
      />

      <CategoryGrid eyebrow="Shop by category" title="Find your fit" categories={categories} />

      {spotlight && <EditorialSpotlight product={spotlight} locale={locale} />}

      <ProductRail
        eyebrow="Just landed"
        title="New arrivals"
        products={newArrivals}
        locale={locale}
        viewAllHref="/collections/all"
        outOfStockText={t("outOfStock")}
      />

      <Statement />
    </div>
  );
}

export function HomeViewFallback({ locale }: { locale: Locale }) {
  return (
    <div data-locale={locale} data-loading className="min-h-[88svh] w-full bg-secondary" />
  );
}
