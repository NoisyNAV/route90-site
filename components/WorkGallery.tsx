"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { SnapIn } from "@/components/shared/SnapIn";
import { WorkCard } from "@/components/WorkCard";
import { WorkCardModal } from "@/components/WorkCardModal";
import { work } from "@/data/work";

// Interactive Work grid: collapsed cards that open into an expanded case-study
// dialog. Holds the open item in state; AnimatePresence drives the dialog's
// snap-in / exit. On close, focus is returned to the card that opened it (the
// dialog itself traps focus while open). Grid is unbounded — any N cards.
export function WorkGallery() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const active = work.find((w) => w.slug === activeSlug) ?? null;

  const close = useCallback(() => {
    setActiveSlug((slug) => {
      if (slug) {
        requestAnimationFrame(() => triggerRefs.current[slug]?.focus());
      }
      return null;
    });
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {work.map((item) => (
          <SnapIn key={item.slug}>
            <WorkCard
              item={item}
              ref={(el) => {
                triggerRefs.current[item.slug] = el;
              }}
              onOpen={() => setActiveSlug(item.slug)}
            />
          </SnapIn>
        ))}
      </div>

      <AnimatePresence>
        {active ? (
          <WorkCardModal key={active.slug} item={active} onClose={close} />
        ) : null}
      </AnimatePresence>
    </>
  );
}
