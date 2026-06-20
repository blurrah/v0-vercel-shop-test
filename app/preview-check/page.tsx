/* TEMPORARY verification harness — not committed. Renders new On-style sections with
   local sample data so the design can be screenshotted without the Shopify backend. */
import {
  ProductCardContent,
  ProductCardEyebrow,
  ProductCardImage,
  ProductCardImageContainer,
  ProductCardPrice,
  ProductCard as ProductCardRoot,
  ProductCardTitle,
} from "@/components/product-card/components";
import {
  EditorialCollage,
  KeyFeatures,
  PerformanceStory,
  SpecRow,
} from "@/components/product-detail/pdp-story";
import type { ProductStory } from "@/lib/product-specs";

const story: ProductStory = {
  specs: [
    { label: "Activity", value: "Running" },
    { label: "Fit", value: "Athletic" },
    { label: "Weight", value: "240 g" },
    { label: "Fabric", value: "Recycled knit" },
  ],
  performance: [
    { label: "Breathability", value: 80, lowLabel: "Low", highLabel: "High" },
    { label: "Mobility", value: 65, lowLabel: "Structured", highLabel: "Free" },
    { label: "Warmth", value: 35, lowLabel: "Cool", highLabel: "Insulated" },
  ],
  features: [
    "Engineered four-way stretch for unrestricted movement",
    "Moisture-wicking finish keeps you dry through every set",
    "Flatlock seams reduce chafe on long efforts",
    "Recycled performance yarn — lighter footprint",
    "Quick-drying, breathable construction",
  ],
  chips: ["RUNNING", "ALL-SEASON"],
  bestseller: true,
  activity: "Running",
};

const cards = [
  { title: "TrailEdge Hoodie", vendor: "Outbound", price: "120.00", flag: "Bestseller" },
  { title: "Cloudstride Tee", vendor: "Outbound", price: "55.00", flag: undefined },
  { title: "Momentum Shorts", vendor: "Outbound", price: "70.00", flag: "Bestseller" },
];

export default function PreviewPage() {
  return (
    <main className="bg-background pb-24">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="eyebrow mb-6 text-muted-foreground">PLP cards</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3">
          {cards.map((c, i) => (
            <div key={c.title} className="group block">
              <ProductCardRoot>
                <ProductCardImageContainer>
                  <ProductCardImage
                    src={`/pdp/detail-${["motion", "fabric", "fit"][i]}.png`}
                    alt={c.title}
                    aspectRatio="portrait"
                    flag={c.flag}
                    sizes="50vw"
                  />
                  <ProductCardContent>
                    <ProductCardEyebrow>{c.vendor}</ProductCardEyebrow>
                    <ProductCardTitle>{c.title}</ProductCardTitle>
                    <ProductCardPrice amount={c.price} currencyCode="EUR" locale="en-NL" />
                  </ProductCardContent>
                </ProductCardImageContainer>
              </ProductCardRoot>
            </div>
          ))}
        </div>
      </section>

      <SpecRow specs={story.specs} />
      <KeyFeatures story={story} />
      <PerformanceStory story={story} />
      <EditorialCollage productTitle="Cloudstride Tee" story={story} />
    </main>
  );
}
