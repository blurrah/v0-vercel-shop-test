import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

import { BundleComponents, BundleParents } from "@/components/product-detail/bundle-components";
import { BuyButtons, type BuyButtonVariant } from "@/components/product-detail/buy-buttons";
import { PdpGallery } from "@/components/product-detail/pdp-gallery";
import { ProductInfoOptions } from "@/components/product-detail/product-info";
import { ProductPrice } from "@/components/product-detail/product-price";
import { ProductSchema } from "@/components/product-detail/schema";
import { ShopLogo } from "@/components/product-detail/shop-logo";
import { BreadcrumbSchema } from "@/components/schema/breadcrumb-schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/config";
import type { Locale } from "@/lib/i18n";
import { defaultSelectedOptions, type SelectedOptions } from "@/lib/product";
import { getProductStory } from "@/lib/product-specs";
import { getAvailableOptionValues } from "@/lib/shopify/encoded-variants";
import type { ProductDetails, ProductVariant } from "@/lib/types";
import { cn } from "@/lib/utils";

import { EditorialTriptych, KeyFeatures, SpecRow } from "./pdp-story";

export function ProductDetailSection({
  product,
  selectedOptionsPromise,
  variantPromise,
  locale,
}: {
  product: ProductDetails;
  selectedOptionsPromise: Promise<SelectedOptions>;
  variantPromise: Promise<ProductVariant | undefined>;
  locale: Locale;
}) {
  const story = getProductStory(product);

  return (
    <>
      <ProductSchema
        product={{
          id: product.id,
          handle: product.handle,
          title: product.title,
          description: product.description,
          images: product.images,
          manufacturerName: product.manufacturerName,
          currencyCode: product.currencyCode,
          priceRange: product.priceRange,
          offerCount: product.variantsCount,
          availableForSale: product.availableForSale,
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: siteConfig.name, path: "/" },
          { name: product.title, path: `/products/${product.handle}` },
        ]}
      />

      <Container className="pb-4">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-14">
          <PdpGallery images={product.images} title={product.title} />
          <ProductInfoArea
            product={product}
            selectedOptionsPromise={selectedOptionsPromise}
            variantPromise={variantPromise}
            locale={locale}
            story={story}
          />
        </div>
      </Container>

      <SpecRow specs={story.specs} />
      <KeyFeatures story={story} />
      <EditorialTriptych productTitle={product.title} />
    </>
  );
}

async function ProductInfoArea({
  product,
  selectedOptionsPromise,
  variantPromise,
  locale,
  story,
}: {
  product: ProductDetails;
  selectedOptionsPromise: Promise<SelectedOptions>;
  variantPromise: Promise<ProductVariant | undefined>;
  locale: Locale;
  story: ReturnType<typeof getProductStory>;
}) {
  const { options, handle, title, featuredImage, availableForSale } = product;
  const uniformPrice = product.hasUniformPricing;
  const uniformStock = product.allVariantsInStock;
  const singleVariant = product.variantsCount === 1;
  const availableValues = getAvailableOptionValues(options, product.encodedVariantAvailability);
  const eagerSelection = singleVariant
    ? { selectedOptions: defaultSelectedOptions(product), selectedVariant: product.defaultVariant }
    : null;
  const t = await getTranslations("product");
  const buyFallbackT = uniformStock && !singleVariant ? t : null;
  const allInStock = product.defaultVariant?.availableForSale ?? availableForSale;

  const category = product.category?.name || product.manufacturerName || siteConfig.name;

  return (
    <div className="grid gap-7 lg:sticky lg:top-20">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="eyebrow text-muted-foreground">
        {siteConfig.name} / {category}
      </nav>

      <div data-slot="product-info-header" className="grid gap-4">
        {/* Badges + chips */}
        <div className="flex flex-wrap items-center gap-2">
          {story.bestseller && (
            <span className="bg-foreground px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-background">
              Bestseller
            </span>
          )}
          {story.chips.map((chip) => (
            <span
              key={chip}
              className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground"
            >
              {chip}
            </span>
          ))}
        </div>

        <h1 className="display text-4xl font-semibold sm:text-5xl">{title}</h1>

        <div>
          {uniformPrice ? (
            <ProductPrice
              amount={product.priceRange.minVariantPrice.amount}
              currencyCode={product.priceRange.minVariantPrice.currencyCode}
              compareAtAmount={product.compareAtPriceRange?.minVariantPrice.amount}
              locale={locale}
            />
          ) : (
            // h-7 matches the resolved price's text-xl line-height (1.75rem) — keep in sync to avoid CLS
            <Suspense fallback={<div className="h-7" aria-hidden />}>
              <ResolvedProductPrice variantPromise={variantPromise} locale={locale} />
            </Suspense>
          )}
        </div>

        {product.description && (
          <p className="max-w-prose text-pretty leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        )}
      </div>

      {eagerSelection ? (
        <ProductInfoOptions
          availableValues={availableValues}
          options={options}
          selectedOptions={eagerSelection.selectedOptions}
          handle={handle}
          t={t}
        />
      ) : (
        <Suspense
          fallback={
            <ProductInfoOptions
              availableValues={availableValues}
              options={options}
              selectedOptions={{}}
              handle={handle}
              t={t}
              hideImages
            />
          }
        >
          <ResolvedProductInfoOptions
            availableValues={availableValues}
            options={options}
            handle={handle}
            selectedOptionsPromise={selectedOptionsPromise}
            t={t}
          />
        </Suspense>
      )}

      {eagerSelection ? (
        <BuyButtons
          selectedVariant={toBuyButtonVariant(eagerSelection.selectedVariant)}
          title={title}
          handle={handle}
          featuredImage={featuredImage}
          availableForSale={availableForSale}
        />
      ) : (
        <Suspense fallback={<BuyButtonsFallback t={buyFallbackT} allInStock={allInStock} />}>
          <ResolvedBuyButtons
            title={title}
            handle={handle}
            featuredImage={featuredImage}
            availableForSale={availableForSale}
            variantPromise={variantPromise}
          />
        </Suspense>
      )}

      <BundleRelationships variant={product.defaultVariant} t={t} />

      <ProductAccordions product={product} story={story} />
    </div>
  );
}

function ProductAccordions({
  product,
  story,
}: {
  product: ProductDetails;
  story: ReturnType<typeof getProductStory>;
}) {
  return (
    <Accordion type="single" collapsible className="border-t border-border">
      <AccordionItem value="size-fit">
        <AccordionTrigger className="eyebrow">Size &amp; fit</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          <p className="leading-relaxed">
            Designed for a {story.specs[1]?.value.toLowerCase()} fit. True to size — if you&apos;re
            between sizes, size up for a relaxed silhouette. Model is 185cm and wears a medium.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="shipping">
        <AccordionTrigger className="eyebrow">Shipping &amp; returns</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          <p className="leading-relaxed">
            Free carbon-neutral shipping on all orders. Free 30-day returns — send it back in the
            original condition for a full refund, no questions asked.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="materials">
        <AccordionTrigger className="eyebrow">Materials &amp; transparency</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          {product.descriptionHtml ? (
            <div
              className="prose prose-sm max-w-none leading-relaxed [&_a]:underline"
              // descriptionHtml is sanitized server-side by the Shopify operations layer
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          ) : (
            <p className="leading-relaxed">
              Built from a {story.specs[3]?.value.toLowerCase()} chosen for performance and a lower
              footprint.
            </p>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

// Bundle relationships are product-level (which products a bundle contains / which
// bundles a product belongs to), so they render eagerly from the cached default
// variant in the static shell rather than streaming in behind the variant query.
function BundleRelationships({
  variant,
  t,
}: {
  variant: ProductVariant | undefined;
  t: Awaited<ReturnType<typeof getTranslations<"product">>>;
}) {
  if (!variant) return null;
  if (variant.components.length === 0 && variant.bundleParents.length === 0) return null;
  return (
    <div className="grid gap-5">
      <BundleComponents components={variant.components} title={t("bundleIncludes")} />
      <BundleParents variants={variant.bundleParents} title={t("availableInBundles")} />
    </div>
  );
}

async function ResolvedProductPrice({
  variantPromise,
  locale,
}: {
  variantPromise: Promise<ProductVariant | undefined>;
  locale: Locale;
}) {
  const selectedVariant = await variantPromise;
  if (!selectedVariant) return null;
  return (
    <ProductPrice
      amount={selectedVariant.price.amount}
      currencyCode={selectedVariant.price.currencyCode}
      compareAtAmount={selectedVariant.compareAtPrice?.amount}
      locale={locale}
    />
  );
}

async function ResolvedProductInfoOptions({
  availableValues,
  options,
  handle,
  selectedOptionsPromise,
  t,
}: {
  availableValues: Map<string, Set<string>>;
  options: ProductDetails["options"];
  handle: string;
  selectedOptionsPromise: Promise<SelectedOptions>;
  t: Awaited<ReturnType<typeof getTranslations<"product">>>;
}) {
  const selectedOptions = await selectedOptionsPromise;
  return (
    <ProductInfoOptions
      availableValues={availableValues}
      options={options}
      selectedOptions={selectedOptions}
      handle={handle}
      t={t}
    />
  );
}

// Bundle relationship arrays stay server-side; the client buy controls only need
// the gating boolean (a customized bundle parent has no fixed components to ship).
function toBuyButtonVariant(variant: ProductVariant | undefined): BuyButtonVariant | undefined {
  if (!variant) return undefined;
  return {
    availableForSale: variant.availableForSale,
    id: variant.id,
    image: variant.image,
    price: variant.price,
    requiresBundleConfiguration: variant.requiresComponents && variant.components.length === 0,
    selectedOptions: variant.selectedOptions,
    title: variant.title,
  };
}

async function ResolvedBuyButtons({
  title,
  handle,
  featuredImage,
  availableForSale,
  variantPromise,
}: {
  title: string;
  handle: string;
  featuredImage: ProductDetails["featuredImage"];
  availableForSale: boolean;
  variantPromise: Promise<ProductVariant | undefined>;
}) {
  const selectedVariant = await variantPromise;
  return (
    <BuyButtons
      selectedVariant={toBuyButtonVariant(selectedVariant)}
      title={title}
      handle={handle}
      featuredImage={featuredImage}
      availableForSale={availableForSale}
    />
  );
}

function BuyButtonsFallback({
  t,
  allInStock,
}: {
  t: Awaited<ReturnType<typeof getTranslations<"product">>> | null;
  allInStock: boolean;
}) {
  if (!t) {
    return (
      <div className="grid grid-cols-2 gap-2.5">
        <div className="h-12 rounded-lg bg-shop" />
        <div className="h-12 rounded-lg bg-primary" />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-2.5">
      <div
        className={cn(
          "flex items-center justify-center gap-1.5 rounded-lg h-12 bg-shop text-white",
          !allInStock && "invisible",
        )}
      >
        <span className="text-sm font-medium">{t("buyWithShop")}</span>
        <ShopLogo className="h-4 w-auto" />
      </div>
      <div className="flex items-center justify-center rounded-lg h-12 bg-primary text-primary-foreground text-sm font-medium">
        {allInStock ? t("addToCart") : t("outOfStock")}
      </div>
    </div>
  );
}
