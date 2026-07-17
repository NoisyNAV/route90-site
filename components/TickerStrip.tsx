import { DiamondBullet } from "@/components/shared/DiamondBullet";
import { site } from "@/data/site";

// Full-width mustard bar between Hero and About: a marquee of the service-category
// + location tags (data/site.ts), ink diamonds between them. CSS-only marquee
// (see globals.css) — the track holds TICKER_COPIES identical copies and slides
// -(100/TICKER_COPIES)% to loop seamlessly; under prefers-reduced-motion it
// renders static (no scroll). Server component; hard 2px ink top/bottom edges,
// zero radius.
//
// TICKER_COPIES must be high enough that (TICKER_COPIES - 1) * <single-run width>
// covers the widest viewport we support, or the loop shows a blank gap before
// resetting (see globals.css). At the current 10-tag list, a single run is
// ~1175px, so 5 copies covers viewports up to ~4700px. If the tag list shrinks
// or a wider display target is added, re-measure and bump this + the CSS %.
const TICKER_COPIES = 5;

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
        {Array.from({ length: TICKER_COPIES }, (_, i) => (
          <TickerRun key={i} ariaHidden={i > 0} />
        ))}
      </div>
    </div>
  );
}
