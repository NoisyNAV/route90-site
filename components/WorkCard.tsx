"use client";

import Image from "next/image";
import { forwardRef } from "react";
import type { WorkItem } from "@/data/work";

// Collapsed Work card — the "browser window" motif from the original export:
// an ink chrome bar (three diamond window-dots + a mono URL/slug label), the
// thumbnail (subtle hover zoom), a forest title/status bar, and a cream teaser.
// The whole card is a button that opens the expanded case-study dialog. Cream
// 2px borders so it reads on the forest section; zero radius, no shadow.
export const WorkCard = forwardRef<
  HTMLButtonElement,
  { item: WorkItem; onOpen: () => void }
>(function WorkCard({ item, onOpen }, ref) {
  const label = item.link
    ? item.link.replace(/^https?:\/\//, "")
    : `route90 · ${item.slug}`;

  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      aria-label={`${item.title} — open case study`}
      className="group block w-full border-2 border-cream bg-ink text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2 focus-visible:ring-offset-forest"
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-2 border-b-2 border-cream bg-ink px-4 py-2.5">
        <span className="h-2.5 w-2.5 rotate-45 bg-mustard" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rotate-45 bg-cream" aria-hidden="true" />
        <span
          className="h-2.5 w-2.5 rotate-45 border-2 border-cream"
          aria-hidden="true"
        />
        <span className="ml-3 truncate font-mono text-xs tracking-widest text-cream/60">
          {label}
        </span>
      </div>

      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden bg-ink">
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

      {/* Teaser */}
      <div className="bg-cream px-4 py-4 text-ink">
        <p className="font-body text-sm leading-relaxed">{item.cardDescription}</p>
        <span className="mt-3 inline-block font-mono text-xs uppercase tracking-widest text-forest transition-colors group-hover:text-mustard">
          View case study →
        </span>
      </div>
    </button>
  );
});
