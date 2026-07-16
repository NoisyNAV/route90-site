"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SNAP } from "@/lib/motion";
import type { WorkItem } from "@/data/work";

// Expanded case-study dialog. Snaps open over an ink backdrop (structural motion,
// not a soft fade; instant under reduced motion). Accessible: role="dialog" +
// aria-modal, labelled by the title, Escape + backdrop-click close, focus moved
// in on open and trapped inside while open (caller restores focus to the trigger
// on close). The scroll area is marked data-lenis-prevent so Lenis ignores it.
export function WorkCardModal({
  item,
  onClose,
}: {
  item: WorkItem;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = `work-${item.slug}-title`;

  // Escape to close + focus trap; move focus into the dialog on open.
  useEffect(() => {
    const panel = panelRef.current;
    const focusables = () =>
      panel
        ? Array.from(
            panel.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
          )
        : [];

    focusables()[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    // Lock background scroll while the dialog is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <motion.div
        className="absolute inset-0 bg-ink/85"
        onClick={onClose}
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        exit={reduce ? undefined : { opacity: 0 }}
        transition={{ duration: 0.2 }}
        aria-hidden="true"
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-lenis-prevent
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-y-auto border-2 border-cream bg-ink text-cream"
        initial={reduce ? false : { opacity: 0, scale: 0.96, y: 12 }}
        animate={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
        exit={reduce ? undefined : { opacity: 0, scale: 0.98, y: 8 }}
        transition={SNAP}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b-2 border-cream bg-forest px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="shrink-0 border-2 border-mustard px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-mustard">
              {item.status}
            </span>
            <h2
              id={titleId}
              className="truncate font-display text-xl uppercase tracking-tight text-cream sm:text-2xl"
            >
              {item.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="shrink-0 border-2 border-cream px-3 py-1 font-mono text-sm leading-none text-cream transition-colors hover:border-mustard hover:text-mustard focus:outline-none focus-visible:ring-2 focus-visible:ring-mustard"
          >
            ✕
          </button>
        </div>

        {/* Media gallery */}
        {item.media.length > 0 ? (
          <div className="flex flex-col gap-3 border-b-2 border-cream bg-ink p-4">
            {item.media.map((m, i) =>
              m.type === "video" ? (
                <video
                  key={m.src}
                  src={m.src}
                  controls
                  className="w-full border-2 border-cream/40 bg-ink"
                />
              ) : (
                <div
                  key={m.src}
                  className="relative aspect-video w-full overflow-hidden border-2 border-cream/40 bg-ink"
                >
                  <Image
                    src={m.src}
                    alt={`${item.title} — screenshot ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                  />
                </div>
              ),
            )}
          </div>
        ) : null}

        {/* Full description */}
        <div className="flex flex-col gap-6 p-5 sm:p-6">
          <p className="font-body leading-relaxed text-cream/85">
            {item.description}
          </p>

          {item.link ? (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit border-2 border-mustard bg-mustard px-6 py-3 font-display text-base uppercase tracking-wide text-ink transition-colors hover:bg-transparent hover:text-mustard focus:outline-none focus-visible:ring-2 focus-visible:ring-mustard"
            >
              View Project ↗
            </a>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}
