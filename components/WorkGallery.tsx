"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { WorkCard } from "@/components/WorkCard";
import { work } from "@/data/work";

export function WorkGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-work-card]");
    const gap = 20;
    track.scrollBy({ left: direction * ((card?.offsetWidth ?? track.clientWidth * 0.84) + gap), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[.16em] text-ember-ink/55" aria-live="polite">{String(active + 1).padStart(2, "0")} / {String(work.length).padStart(2, "0")}</span>
        <div className="flex gap-2">
          <button type="button" onClick={() => move(-1)} aria-label="Previous project" className="grid size-11 place-items-center rounded-full border border-ember-ink/15 bg-ember-ink text-warm-cream transition-colors hover:bg-copper"><ChevronLeft size={18} aria-hidden="true" /></button>
          <button type="button" onClick={() => move(1)} aria-label="Next project" className="grid size-11 place-items-center rounded-full border border-ember-ink/15 bg-ember-ink text-warm-cream transition-colors hover:bg-copper"><ChevronRight size={18} aria-hidden="true" /></button>
        </div>
      </div>
      <div
        ref={trackRef}
        onScroll={(event) => {
          const track = event.currentTarget;
          const card = track.querySelector<HTMLElement>("[data-work-card]");
          if (!card) return;
          setActive(Math.min(work.length - 1, Math.max(0, Math.round(track.scrollLeft / (card.offsetWidth + 20)))));
        }}
        className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-7 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"
      >
        {work.map((item, index) => <WorkCard key={item.slug} item={item} index={index} />)}
      </div>
    </div>
  );
}
