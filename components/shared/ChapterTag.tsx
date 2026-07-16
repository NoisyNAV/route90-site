import { cn } from "@/lib/cn";

// Macro section numbering — "CHAPTER 0X" eyebrow. KEEP (locked in CLAUDE.md).
// Distinct from service badges, which are plain numbers. Mono, mustard, spaced.
export function ChapterTag({
  number,
  label,
  className,
}: {
  number: string;
  label?: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-xs uppercase tracking-[0.3em] text-mustard",
        className,
      )}
    >
      Chapter {number}
      {label ? ` — ${label}` : ""}
    </p>
  );
}
