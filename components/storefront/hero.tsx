import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SPECS = [
  "Engineered for speed",
  "Tested on every terrain",
  "Built to outlast the season",
];

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[88svh] w-full items-end overflow-hidden bg-foreground text-background">
      <Image
        src="/home/hero-editorial.png"
        alt="Athlete sprinting in performance sportswear"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-90"
      />
      {/* Legibility gradient */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40"
      />

      <div className="relative z-10 mx-auto w-full max-w-[96rem] px-5 pb-12 pt-28 lg:px-10 lg:pb-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow text-background/70">FW25 / Performance Collection</p>
            <h1 className="display mt-6 text-6xl font-semibold sm:text-7xl lg:text-8xl xl:text-9xl">
              Move without
              <br />
              limits.
            </h1>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/collections/all"
                className="group inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5"
              >
                Shop the collection
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/collections/all"
                className="inline-flex items-center gap-2 rounded-full border border-background/40 px-6 py-3 text-sm font-medium text-background backdrop-blur-sm transition-colors hover:bg-background/10"
              >
                Explore best sellers
              </Link>
            </div>
          </div>

          {/* Vercel-style monospace spec column */}
          <ul className="flex flex-col gap-2 lg:items-end lg:text-right">
            {SPECS.map((spec) => (
              <li key={spec} className="eyebrow text-background/70">
                {spec}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
