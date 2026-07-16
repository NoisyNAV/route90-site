import { cn } from "@/lib/cn";

// PLACEHOLDER shield/route badge — the recurring brand anchor (nav, hero, about,
// footer). Real logo asset is pending (tracked in KNOWN-ISSUES.md, launch blocker).
// To swap: replace only the <path>/<text> inside the <svg>. The wrapper API
// (size / className / title) stays stable so call sites don't change.
export function ShieldBadge({
  size = 40,
  className,
  title = "Route90",
}: {
  size?: number;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-label={title}
      className={cn("text-mustard", className)}
    >
      {/* Highway-shield silhouette — hard mitered corners, placeholder only. */}
      <path
        d="M24 2 L44 8 V26 C44 37 35 44 24 46 C13 44 4 37 4 26 V8 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="miter"
      />
      <text
        x="24"
        y="30"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="18"
        fill="var(--color-ink)"
      >
        90
      </text>
    </svg>
  );
}
