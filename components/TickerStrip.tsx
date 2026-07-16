import { DiamondBullet } from "@/components/shared/DiamondBullet";
import { site } from "@/data/site";

// Full-width mustard bar between Hero and About: a marquee of the service-category
// + location tags (data/site.ts), ink diamonds between them. CSS-only marquee
// (see globals.css) — the track holds two identical copies and slides -50% to
// loop seamlessly; under prefers-reduced-motion it renders static (no scroll).
// Server component; hard 2px ink top/bottom edges, zero radius.
function TickerRun({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden || undefined}>
      {site.nav.tags.map((tag) => (
        <span key={tag} className="flex items-center">
          <span className="px-6 font-display text-sm uppercase tracking-wide text-ink sm:text-base">
            {tag}
          </span>
          <DiamondBullet className="mt-0 bg-ink" />
        </span>
      ))}
    </div>
  );
}

export function TickerStrip() {
  return (
    <div className="w-full overflow-hidden border-y-2 border-ink bg-mustard py-3">
      <div className="flex w-max animate-marquee">
        <TickerRun />
        <TickerRun ariaHidden />
      </div>
    </div>
  );
}
