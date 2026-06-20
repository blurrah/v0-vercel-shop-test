import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/config";

/** Editorial mission statement band — the On-style closing section. */
export function MissionBand() {
  return (
    <section className="border-t border-border bg-foreground text-background">
      <Container className="py-16 lg:py-24">
        <p className="eyebrow text-background/60">Our mission</p>
        <p className="display mt-6 max-w-4xl text-balance text-3xl font-semibold sm:text-4xl lg:text-5xl">
          We exist to move people forward — gear engineered for the human spirit, built to disappear
          so the effort takes over. Move with us.
        </p>
        <Link
          href="/collections/all"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-background underline-offset-4 hover:underline"
        >
          Discover {siteConfig.name}
          <ArrowRight className="size-4" />
        </Link>
      </Container>
    </section>
  );
}
