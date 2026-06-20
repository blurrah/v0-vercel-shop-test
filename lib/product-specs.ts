import type { ProductDetails } from "@/lib/types";

/** Deterministic 0..1 hash from a string so derived specs stay stable per product. */
function seededValue(seed: string, salt: string): number {
  let h = 2166136261;
  const input = `${seed}:${salt}`;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // Map to 0..1
  return ((h >>> 0) % 1000) / 1000;
}

function pick<T>(seed: string, salt: string, options: T[]): T {
  const idx = Math.floor(seededValue(seed, salt) * options.length);
  return options[Math.min(idx, options.length - 1)];
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface PerformanceMetric {
  label: string;
  /** 0..100 fill */
  value: number;
  lowLabel: string;
  highLabel: string;
}

export interface ProductStory {
  specs: ProductSpec[];
  performance: PerformanceMetric[];
  features: string[];
  /** Short marketing chips (e.g. EVERYDAY, TRAINING). */
  chips: string[];
  /** Whether this product should carry a "BESTSELLER" flag. */
  bestseller: boolean;
  /** One-line activity descriptor used as an eyebrow. */
  activity: string;
}

const ACTIVITIES = ["Everyday", "Training", "Running", "Studio", "Trail", "Recovery"];
const FITS = ["Regular", "Athletic", "Relaxed", "Slim"];
const FABRICS = ["Recycled knit", "Performance jersey", "Brushed fleece", "Ripstop weave"];
const WEIGHTS = ["180 g", "210 g", "240 g", "320 g", "410 g"];
const SEASONS = ["All-season", "Cool weather", "Warm weather"];

const FEATURE_POOL = [
  "Engineered four-way stretch for unrestricted movement",
  "Moisture-wicking finish keeps you dry through every set",
  "Flatlock seams reduce chafe on long efforts",
  "Recycled performance yarn — lighter footprint",
  "Quick-drying, breathable construction",
  "Tonal heat-pressed logo, zero added bulk",
  "Tagless collar for all-day comfort",
  "Reinforced high-wear zones for durability",
  "Soft hand-feel with a structured drape",
];

export function getProductStory(product: ProductDetails): ProductStory {
  const seed = product.handle || product.id || product.title;
  const tags = product.tags?.map((t) => t.toLowerCase()) ?? [];

  const activity = pick(seed, "activity", ACTIVITIES);

  const specs: ProductSpec[] = [
    { label: "Activity", value: activity },
    { label: "Fit", value: pick(seed, "fit", FITS) },
    { label: "Weight", value: pick(seed, "weight", WEIGHTS) },
    { label: "Fabric", value: pick(seed, "fabric", FABRICS) },
  ];

  const performance: PerformanceMetric[] = [
    {
      label: "Breathability",
      value: 35 + Math.round(seededValue(seed, "breath") * 60),
      lowLabel: "Low",
      highLabel: "High",
    },
    {
      label: "Mobility",
      value: 40 + Math.round(seededValue(seed, "mobility") * 55),
      lowLabel: "Structured",
      highLabel: "Free",
    },
    {
      label: "Warmth",
      value: 20 + Math.round(seededValue(seed, "warmth") * 70),
      lowLabel: "Cool",
      highLabel: "Insulated",
    },
  ];

  // Pick 5 stable features.
  const start = Math.floor(seededValue(seed, "feat") * FEATURE_POOL.length);
  const features: string[] = [];
  for (let i = 0; i < 5; i++) {
    features.push(FEATURE_POOL[(start + i) % FEATURE_POOL.length]);
  }

  const chips = [activity.toUpperCase(), pick(seed, "season", SEASONS).toUpperCase()];

  const bestseller =
    tags.includes("bestseller") || tags.includes("best-seller") || seededValue(seed, "best") > 0.6;

  return { specs, performance, features, chips, bestseller, activity };
}
