import { cn } from "@/lib/cn";

// Faint square-grid texture for the near-black base canvas (Nav + Hero only —
// per the locked rule in CLAUDE.md, forest/cream panels stay flat). Values are
// taken verbatim from the original Emergent export (pixel-sampled): cream 1px
// lines on both axes, 80px cells, 12% opacity. Rendered as an absolutely
// positioned, non-interactive overlay so it sits behind content.
//
// Continuity between Nav and Hero: both hosts are full-bleed and share the same
// left origin and 80px cell, so the vertical grid columns line up across the
// seam — the two overlays read as one continuous grid rather than two
// independently-tiled patches.
export function GridTexture({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 opacity-[0.12]",
        className,
      )}
      style={{
        backgroundImage:
          "linear-gradient(var(--color-cream) 1px, transparent 1px), linear-gradient(90deg, var(--color-cream) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        backgroundPosition: "0 0",
      }}
    />
  );
}
