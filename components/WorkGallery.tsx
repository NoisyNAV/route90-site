"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SnapIn } from "@/components/shared/SnapIn";
import { WorkCard } from "@/components/WorkCard";
import { work } from "@/data/work";
import { SNAP } from "@/lib/motion";

const ARROW_CLASSES =
  "flex h-11 w-11 shrink-0 items-center justify-center border-2 border-cream text-cream transition-colors hover:border-mustard hover:text-mustard focus:outline-none focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2 focus-visible:ring-offset-forest disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-cream disabled:hover:text-cream";

// Interactive Work track: collapsed cards that link out to their dedicated
// /work/[slug] case-study pages (the old in-place expand/modal is gone). Track
// is unbounded — any N cards — and never wraps to a second row: overflow pages
// via arrow buttons on desktop (structural scroll, per lib/motion's SNAP) and
// native swipe/scroll-snap on mobile, where the arrows are hidden entirely.
export function WorkGallery() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const reduce = useReducedMotion();

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanScrollPrev(el.scrollLeft > 1);
    setCanScrollNext(el.scrollLeft < max - 1);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = trackRef.current;
    if (!el) return;

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, [updateScrollState]);

  const page = useCallback(
    (direction: 1 | -1) => {
      const el = trackRef.current;
      if (!el) return;
      const max = el.scrollWidth - el.clientWidth;
      const target = Math.min(
        Math.max(el.scrollLeft + direction * el.clientWidth, 0),
        max,
      );

      if (reduce) {
        el.scrollLeft = target;
        updateScrollState();
        return;
      }

      animate(el.scrollLeft, target, {
        ...SNAP,
        onUpdate: (value) => {
          el.scrollLeft = value;
        },
      });
    },
    [reduce, updateScrollState],
  );

  const hasOverflow = canScrollPrev || canScrollNext;

  return (
    <>
      <div
        ref={trackRef}
        onScroll={updateScrollState}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
      >
        {work.map((item) => (
          <SnapIn
            key={item.slug}
            // flex-col so the card (flex-1) fills the track's stretched row
            // height — keeps mixed web/mobile cards to an even height.
            className="flex w-full shrink-0 snap-start flex-col sm:w-[calc(50%-10px)] lg:w-[calc((100%-40px)/3)]"
          >
            <WorkCard item={item} />
          </SnapIn>
        ))}
      </div>

      {hasOverflow ? (
        <div className="mt-4 hidden justify-end gap-3 sm:flex">
          <button
            type="button"
            aria-label="Previous project"
            disabled={!canScrollPrev}
            onClick={() => page(-1)}
            className={ARROW_CLASSES}
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next project"
            disabled={!canScrollNext}
            onClick={() => page(1)}
            className={ARROW_CLASSES}
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      ) : null}
    </>
  );
}
