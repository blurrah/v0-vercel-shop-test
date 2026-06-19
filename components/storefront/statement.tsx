import { Container } from "@/components/ui/container";

const PILLARS = [
  {
    no: "01",
    title: "Engineered, not decorated",
    body: "Every stitch earns its place. We obsess over grams, drop, and rebound so you feel the difference at mile twenty.",
  },
  {
    no: "02",
    title: "Tested in the open",
    body: "Prototypes log thousands of kilometers on road and trail before they ever reach your door.",
  },
  {
    no: "03",
    title: "Built to be worn out",
    body: "Performance materials chosen for the long haul. Run it, wash it, repeat — season after season.",
  },
];

export function Statement() {
  return (
    <section className="w-full bg-foreground py-24 text-background lg:py-32">
      <Container>
        <p className="eyebrow text-background/50">The standard</p>
        <h2 className="display mt-8 max-w-5xl text-4xl font-semibold sm:text-6xl lg:text-7xl">
          Performance is a promise we keep at every pace.
        </h2>

        <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-background/15 bg-background/15 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <div key={pillar.no} className="flex flex-col gap-4 bg-foreground p-8">
              <span className="eyebrow text-background/50">{pillar.no}</span>
              <h3 className="text-xl font-semibold tracking-tight">{pillar.title}</h3>
              <p className="text-sm leading-relaxed text-background/70">{pillar.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
