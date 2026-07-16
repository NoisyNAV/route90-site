import type { Service } from "@/data/services";
import { DiamondBullet } from "@/components/shared/DiamondBullet";

// One service as a hard-bordered panel: a forest-green header bar (plain number
// badge — the word "MILE" appears nowhere on this site — title, and the verbatim
// `priceFrom` in mustard) over a cream body (description left, feature list right).
// Zero radius, 2px ink borders, no shadow — locked visual rules (CLAUDE.md).
// Server component: motion is applied by the SnapIn wrapper in ServicesSection.
export function ServicePanel({ service }: { service: Service }) {
  const { number, title, description, features, priceFrom } = service;

  return (
    <article className="border-2 border-ink bg-cream">
      {/* Green header bar */}
      <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-b-2 border-ink bg-forest px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="border-2 border-mustard px-2 py-1 font-mono text-xs leading-none text-mustard sm:text-sm">
            {number}
          </span>
          <h3 className="font-display text-2xl uppercase leading-none tracking-tight text-cream sm:text-3xl">
            {title}
          </h3>
        </div>
        <span className="font-mono text-sm uppercase tracking-wide text-mustard sm:text-base">
          {priceFrom}
        </span>
      </header>

      {/* Cream body: description left, includes-list right */}
      <div className="grid gap-6 px-4 py-6 sm:grid-cols-[1fr_auto] sm:gap-10 sm:px-6 sm:py-8">
        <p className="max-w-prose font-body text-[0.95rem] leading-relaxed text-ink/90">
          {description}
        </p>
        <ul className="space-y-2.5 border-t-2 border-ink pt-6 font-mono text-xs uppercase tracking-wide text-ink sm:min-w-[16rem] sm:border-t-0 sm:border-l-2 sm:pt-0 sm:pl-10">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <DiamondBullet />
              <span className="leading-snug">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
