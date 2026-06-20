import { Activity, Feather, Layers, Wind } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import type { PerformanceMetric, ProductSpec, ProductStory } from "@/lib/product-specs";

const SPEC_ICONS: Record<string, typeof Activity> = {
  Activity: Activity,
  Fit: Layers,
  Weight: Feather,
  Fabric: Wind,
};

/** On-style horizontal spec row with icons and labels. */
export function SpecRow({ specs }: { specs: ProductSpec[] }) {
  return (
    <Container className="border-y border-border py-8">
      <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {specs.map((spec) => {
          const Icon = SPEC_ICONS[spec.label] ?? Activity;
          return (
            <div key={spec.label} className="flex items-center gap-3">
              <Icon className="size-6 shrink-0 text-foreground" strokeWidth={1.5} />
              <div>
                <dt className="eyebrow text-muted-foreground">{spec.label}</dt>
                <dd className="mt-1 text-lg font-semibold tracking-tight">{spec.value}</dd>
              </div>
            </div>
          );
        })}
      </dl>
    </Container>
  );
}

function PerformanceBar({ metric }: { metric: PerformanceMetric }) {
  return (
    <div>
      <p className="text-base font-semibold tracking-tight">{metric.label}</p>
      <div className="mt-3 h-1.5 w-full bg-muted">
        <div className="h-full bg-foreground" style={{ width: `${metric.value}%` }} />
      </div>
      <div className="mt-2 flex justify-between">
        <span className="eyebrow text-muted-foreground">{metric.lowLabel}</span>
        <span className="eyebrow text-muted-foreground">{metric.highLabel}</span>
      </div>
    </div>
  );
}

/** Key features list paired with performance bars — mirrors the On PDP layout. */
export function KeyFeatures({ story }: { story: ProductStory }) {
  return (
    <Container className="py-16 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow text-muted-foreground">Key features</p>
          <ul className="mt-6 space-y-4">
            {story.features.map((feature) => (
              <li key={feature} className="flex gap-3 text-pretty text-base leading-relaxed">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-8">
          {story.performance.map((metric) => (
            <PerformanceBar key={metric.label} metric={metric} />
          ))}
        </div>
      </div>
    </Container>
  );
}

const EDITORIAL = [
  {
    image: "/pdp/detail-motion.png",
    title: "Built for movement",
    copy: "Engineered for unrestricted range so the gear disappears and the effort takes over.",
  },
  {
    image: "/pdp/detail-fabric.png",
    title: "Premium materials",
    copy: "A breathable, moisture-wicking weave with a structured drape and a soft hand-feel.",
  },
  {
    image: "/pdp/detail-fit.png",
    title: "A considered fit",
    copy: "Flatlock seams and reinforced wear zones deliver comfort that lasts past the last rep.",
  },
];

/** Three-up editorial block with big imagery and captions. */
export function EditorialTriptych({ productTitle }: { productTitle: string }) {
  return (
    <Container className="py-16 lg:py-24">
      <div className="grid gap-x-5 gap-y-12 md:grid-cols-3">
        {EDITORIAL.map((item) => (
          <article key={item.title}>
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-secondary">
              <Image
                src={item.image}
                alt={`${productTitle} — ${item.title}`}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight">{item.title}</h3>
            <p className="mt-2 max-w-sm text-pretty leading-relaxed text-muted-foreground">
              {item.copy}
            </p>
          </article>
        ))}
      </div>
    </Container>
  );
}
