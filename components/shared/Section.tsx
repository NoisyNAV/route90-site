import { cn } from "@/lib/cn";

// Color-blocked section wrapper. Section field colors follow the locked sequence
// in CLAUDE.md (forest / cream / ink), hard-bordered (no shadow, zero radius).
// "ink" is the near-black base canvas (#0E0E0E) — same as Hero/Nav. The
// grid-pattern texture is a Hero/Nav-only treatment (CLAUDE.md), so it is NOT
// applied here; "ink" as a section field stays flat. Server component.
const tones = {
  forest: "bg-forest text-cream",
  cream: "bg-cream text-ink",
  ink: "bg-ink text-cream",
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
        "w-full scroll-mt-16 px-6 py-20 sm:px-12 sm:py-28",
        tones[tone],
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
