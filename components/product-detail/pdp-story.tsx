import { ArrowRight, Layers, Ruler, Feather, Wind, Activity, Play } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import type { PerformanceMetric, ProductSpec, ProductStory } from "@/lib/product-specs";
import { cn } from "@/lib/utils";

const SPEC_ICONS: Record<string, typeof Activity> = {
  Activity: Activity,
  Fit: Ruler,
  Weight: Feather,
  Fabric: Wind,
};

/**
 * On-style spec grid — line-art icon over a mono label and bold value, laid out in a
 * bordered grid with hairline dividers. 2 columns on mobile, 4 on desktop.
 */
export function SpecRow({ specs }: { specs: ProductSpec[] }) {
  return (
    <Container className="py-12 lg:py-16">
      <div className="grid grid-cols-2 border-l border-t border-border lg:grid-cols-4">
        {specs.map((spec) => {
          const Icon = SPEC_ICONS[spec.label] ?? Activity;
          return (
            <div
              key={spec.label}
              className="flex flex-col gap-4 border-r border-b border-border p-6 lg:p-8"
            >
              <Icon className="size-7 text-foreground" strokeWidth={1.25} />
              <div>
                <dt className="eyebrow text-muted-foreground">{spec.label}</dt>
                <dd className="mt-1.5 text-xl font-semibold tracking-tight lg:text-2xl">
                  {spec.value}
                </dd>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}

/** Segmented performance gauge — discrete ticks filled to the metric level, On-style. */
function PerformanceGauge({ metric }: { metric: PerformanceMetric }) {
  const SEGMENTS = 7;
  const filled = Math.max(1, Math.round((metric.value / 100) * SEGMENTS));
  return (
    <div>
      <p className="text-lg font-semibold tracking-tight">{metric.label}</p>
      <div className="mt-3 flex gap-1.5" aria-hidden>
        {Array.from({ length: SEGMENTS }).map((_, i) => (
          <div
            key={i}
            className={cn("h-2.5 flex-1 rounded-[1px]", i < filled ? "bg-foreground" : "bg-muted")}
          />
        ))}
      </div>
      <div className="mt-2.5 flex justify-between">
        <span className="eyebrow text-muted-foreground">{metric.lowLabel}</span>
        <span className="eyebrow text-muted-foreground">{metric.highLabel}</span>
      </div>
    </div>
  );
}

/** Key features bullet list paired with segmented performance gauges. */
export function KeyFeatures({ story }: { story: ProductStory }) {
  return (
    <Container className="border-t border-border py-14 lg:py-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight lg:text-4xl">Key features</h2>
          <ul className="mt-8 space-y-5">
            {story.features.map((feature) => (
              <li key={feature} className="flex gap-4 text-pretty text-base leading-relaxed">
                <span aria-hidden className="mt-[0.55rem] h-px w-5 shrink-0 bg-foreground" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-9 lg:pt-2">
          {story.performance.map((metric) => (
            <PerformanceGauge key={metric.label} metric={metric} />
          ))}
        </div>
      </div>
    </Container>
  );
}

/** Text-only three-up performance story with thin coral top rules — the On signature block. */
export function PerformanceStory({ story }: { story: ProductStory }) {
  const blocks = [
    {
      title: "Supercharge your day",
      copy: `Engineered for ${story.activity.toLowerCase()}. Every detail is tuned to disappear so the effort takes over.`,
    },
    {
      title: "Built for movement",
      copy: "Four-way stretch and an articulated cut deliver an unrestricted, forward-moving range.",
    },
    {
      title: "A secure, breathable fit",
      copy: "Targeted ventilation zones keep you cool while a refined silhouette locks everything in.",
    },
  ];
  return (
    <Container className="border-t border-border py-14 lg:py-20">
      <div className="grid gap-10 md:grid-cols-3 md:gap-8">
        {blocks.map((block) => (
          <article key={block.title}>
            <div className="h-1 w-full bg-flag-soft" aria-hidden />
            <h3 className="mt-5 text-2xl font-semibold tracking-tight text-balance">
              {block.title}
            </h3>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{block.copy}</p>
          </article>
        ))}
      </div>
    </Container>
  );
}

const COLLAGE_IMAGES = ["/pdp/detail-motion.png", "/pdp/detail-fabric.png", "/pdp/detail-fit.png"];

/**
 * Editorial collage — a big statement heading beside a scattered, multi-size image
 * arrangement with mono caption and "Watch / Discover" links. On's signature lower-PDP moment.
 */
export function EditorialCollage({
  productTitle,
  story,
}: {
  productTitle: string;
  story: ProductStory;
}) {
  return (
    <Container className="border-t border-border py-16 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
        {/* Statement + actions */}
        <div>
          <p className="eyebrow text-muted-foreground">{story.activity} / In motion</p>
          <h2 className="display mt-4 text-4xl font-semibold sm:text-5xl">The {productTitle}</h2>
          <p className="mt-5 max-w-sm text-pretty leading-relaxed text-muted-foreground">
            Designed for the long run. Built to bring back the responsive, forward-rolling ride you
            love — season after season.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <button
              type="button"
              className="group inline-flex items-center gap-2.5 text-sm font-medium"
            >
              <span className="flex size-9 items-center justify-center rounded-full border border-foreground transition group-hover:bg-foreground group-hover:text-background">
                <Play className="size-3.5 fill-current" />
              </span>
              Watch now
            </button>
            <button
              type="button"
              className="group inline-flex items-center gap-2 text-sm font-medium"
            >
              Discover more
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Scattered image arrangement — left statement image + offset right stack */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-secondary">
            <Image
              src={COLLAGE_IMAGES[0]}
              alt={`${productTitle} in motion`}
              fill
              sizes="(min-width: 1024px) 35vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="grid gap-3 sm:mt-10 sm:gap-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary">
              <Image
                src={COLLAGE_IMAGES[1]}
                alt={`${productTitle} fabric detail`}
                fill
                sizes="(min-width: 1024px) 25vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-secondary">
              <Image
                src={COLLAGE_IMAGES[2]}
                alt={`${productTitle} fit detail`}
                fill
                sizes="(min-width: 1024px) 25vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
