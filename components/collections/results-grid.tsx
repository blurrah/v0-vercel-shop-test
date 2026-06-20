import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

import { ProductCard } from "@/components/product-card/product-card";
import { ProductsGridSkeleton } from "@/components/product/products-grid";
import { loadMoreCollectionProducts } from "@/lib/collections/action";
import { ALL_PRODUCTS_HANDLE, type CollectionResultsData } from "@/lib/collections/server";
import type { Locale } from "@/lib/i18n";
import { loadMoreSearchProducts } from "@/lib/search/action";
import { RESULTS_PER_PAGE } from "@/lib/utils";

import { InfiniteProductGrid } from "./infinite-product-grid";

function Fallback() {
  return (
    <ProductsGridSkeleton
      count={RESULTS_PER_PAGE}
      className="grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
    />
  );
}

async function Render({
  locale,
  collectionResultsDataPromise,
}: {
  locale: Locale;
  collectionResultsDataPromise: Promise<CollectionResultsData>;
}) {
  const [{ result, filters, collection, sort }, t, tProduct] = await Promise.all([
    collectionResultsDataPromise,
    getTranslations("search"),
    getTranslations("product"),
  ]);
  const products = result.products;

  if (products.length === 0) {
    return (
      <div className="py-10 text-center">
        <h2 className="mb-2 text-2xl font-semibold">{t("noResults")}</h2>
        <p className="text-muted-foreground">{t("noResultsAvailable")}</p>
      </div>
    );
  }

  const cards = products.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
      locale={locale}
      outOfStockText={tProduct("outOfStock")}
      aspectRatio="portrait"
      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
    />
  ));

  // /collections/all is backed by the catalog-browse search() field, not the collection
  // field — load-more has to call the same backend the initial page used.
  if (collection === ALL_PRODUCTS_HANDLE) {
    return (
      <InfiniteProductGrid
        initialProducts={products}
        initialPageInfo={result.pageInfo}
        locale={locale}
        outOfStockText={tProduct("outOfStock")}
        loadMore={loadMoreSearchProducts}
        loadMoreParams={{ sortKey: sort, filters, locale }}
      >
        {cards}
      </InfiniteProductGrid>
    );
  }

  return (
    <InfiniteProductGrid
      initialProducts={products}
      initialPageInfo={result.pageInfo}
      locale={locale}
      outOfStockText={tProduct("outOfStock")}
      loadMore={loadMoreCollectionProducts}
      loadMoreParams={{ collection, sortKey: sort, filters, locale }}
    >
      {cards}
    </InfiniteProductGrid>
  );
}

export function CollectionResultsGrid({
  locale,
  collectionResultsDataPromise,
}: {
  locale: Locale;
  collectionResultsDataPromise: Promise<CollectionResultsData>;
}) {
  return (
    <Suspense fallback={<Fallback />}>
      <Render locale={locale} collectionResultsDataPromise={collectionResultsDataPromise} />
    </Suspense>
  );
}
