import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { WorkItem } from "@/data/work";

// Shared fixed height (px) of the collapsed card's frame/content zone — the
// cover thumbnail (web) or the phone screenshot (mobile), excluding the green
// title bar. Both platform variants read this ONE value via the `--zone` CSS
// var set on the card root (see below), so the two branches can never drift to
// separate heights. The track is one flex row (align stretch), so cards
// equalize to the tallest and the flex-1 text panels absorb any slack. Change
// the height here, never per-branch.
const CONTENT_ZONE_H = 188;

// Shared "View case study →" affordance — identical in both variants.
function ViewCta() {
  return (
    <span className="mt-3 inline-block font-mono text-xs uppercase tracking-widest text-forest transition-colors group-hover:text-mustard">
      View case study →
    </span>
  );
}

// Collapsed Work card. Two frames, branched on WorkItem.platform:
//  • "web"    — vertical stack: browser-chrome bar, cover thumbnail, title bar,
//               1-line teaser. The original "browser window" motif.
//  • "mobile" — sm+ horizontal split: phone screenshot cover-filling a fixed
//               150px left column, title + 5-line teaser in the right column.
//               Below sm it reverts to the same top-frame / text-below stack
//               the rest of the site uses (flex-col sm:flex-row).
// The whole card is a link to the item's dedicated case-study page
// (/work/[slug]). Cream 2px borders, zero radius, no shadow — the one exception
// being the bezel radius flagged below.
export function WorkCard({ item }: { item: WorkItem }) {
  const label = item.link
    ? item.link.replace(/^https?:\/\//, "")
    : `route90 · ${item.slug}`;

  return (
    <Link
      href={`/work/${item.slug}`}
      aria-label={`${item.title} — view case study`}
      // --zone drives BOTH frame heights from the one CONTENT_ZONE_H constant.
      style={{ "--zone": `${CONTENT_ZONE_H}px` } as CSSProperties}
      className="group flex w-full flex-1 flex-col border-2 border-cream bg-ink text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2 focus-visible:ring-offset-forest"
    >
      {item.platform === "mobile" ? (
        // Mobile: phone-bezel + text split at sm+, stacked below sm.
        <div className="flex flex-1 flex-col sm:flex-row">
          {/* Phone-screenshot frame. Full-width top strip below sm; a FIXED
              150px column at sm+ that is shrink-0 so the text sibling can never
              compress it (the bug that made this read as an icon). h-[var(--zone)]
              pins the content zone below sm; at sm+ it stretches to the card
              height so the screenshot fills the whole column via object-cover. */}
          <div className="relative h-[var(--zone)] shrink-0 overflow-hidden border-b-2 border-cream bg-ink sm:h-auto sm:w-[150px] sm:border-b-0 sm:border-r-2">
            {/* ROUNDED-CORNER EXCEPTION — the phone screenshot keeps a device-
                style radius; it is the ONE element on this site allowed rounded
                corners (locked in CLAUDE.md "WorkCard frame rules"). Do NOT
                "fix" it to zero-radius thinking it's a regression. */}
            <div className="absolute inset-2 overflow-hidden rounded-[14px] border-2 border-cream/30 bg-ink">
              <Image
                src={item.thumbnail}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 300px"
                className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
            </div>
          </div>

          {/* Title + status, then the longer (5-line) teaser. */}
          <div className="flex flex-1 flex-col bg-cream text-ink">
            <div className="flex items-center justify-between gap-3 border-b-2 border-cream bg-forest px-4 py-3">
              <h3 className="truncate font-display text-xl uppercase tracking-tight text-cream">
                {item.title}
              </h3>
              <span className="shrink-0 border-2 border-mustard px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-mustard">
                {item.status}
              </span>
            </div>
            <div className="flex flex-1 flex-col px-4 py-4">
              <p className="line-clamp-5 font-body text-sm leading-relaxed">
                {item.cardDescription}
              </p>
              <ViewCta />
            </div>
          </div>
        </div>
      ) : (
        // Web: browser-window motif, vertical stack.
        <>
          {/* Chrome bar */}
          <div className="flex items-center gap-2 border-b-2 border-cream bg-ink px-4 py-2.5">
            <span
              className="h-2.5 w-2.5 rotate-45 bg-mustard"
              aria-hidden="true"
            />
            <span className="h-2.5 w-2.5 rotate-45 bg-cream" aria-hidden="true" />
            <span
              className="h-2.5 w-2.5 rotate-45 border-2 border-cream"
              aria-hidden="true"
            />
            <span className="ml-3 truncate font-mono text-xs tracking-widest text-cream/60">
              {label}
            </span>
          </div>

          {/* Thumbnail — fixed content zone (shared --zone height) */}
          <div className="relative h-[var(--zone)] w-full overflow-hidden bg-ink">
            <Image
              src={item.thumbnail}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          </div>

          {/* Title + status */}
          <div className="flex items-center justify-between gap-3 border-y-2 border-cream bg-forest px-4 py-3">
            <h3 className="truncate font-display text-xl uppercase tracking-tight text-cream">
              {item.title}
            </h3>
            <span className="shrink-0 border-2 border-mustard px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-mustard">
              {item.status}
            </span>
          </div>

          {/* Teaser — 1 line */}
          <div className="flex flex-1 flex-col bg-cream px-4 py-4 text-ink">
            <p className="line-clamp-1 font-body text-sm leading-relaxed">
              {item.cardDescription}
            </p>
            <ViewCta />
          </div>
        </>
      )}
    </Link>
  );
}
