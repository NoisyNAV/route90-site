import { cn } from "@/lib/cn";

// Color-blocked section wrapper. Section field colors follow the locked sequence
// in CLAUDE.md (forest / cream / ink), hard-bordered (no shadow, zero radius).
// "ink" is the near-black base canvas (#0E0E0E) — same as Hero/Nav. The
// grid-pattern texture is a Hero/Nav-only treatment (CLAUDE.md), so it is NOT
// applied here; "ink" as a section field stays flat. Server component.
const tones = {
  dark: "bg-ember-ink text-warm-cream",
  carbon: "bg-carbon text-warm-cream",
  paper: "bg-paper text-ember-ink",
} as const;

export function Section({
  id,
  tone,
  className,
  children,
}: {
  id?: string;
  tone: keyof typeof tones;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "w-full scroll-mt-24 px-4 pb-28 pt-24 sm:px-8 sm:pb-36 sm:pt-32 lg:px-12",
        tones[tone],
        className,
      )}
    >
      {/* max-w-[1600px] matches the /reference mockup's site-wide wrapper and
          the Hero container, so every section shares the same edges at desktop.
          Padding stays on the outer <section> (px-6 sm:px-12) — unchanged. */}
      <div className="mx-auto w-full max-w-[1440px]">{children}</div>
    </section>
  );
}
