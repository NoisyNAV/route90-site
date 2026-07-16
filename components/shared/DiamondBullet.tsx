import { cn } from "@/lib/cn";

// Feature-list marker: a small solid diamond (a square rotated 45°, so it's
// hard-edged and zero-radius by construction — consistent with the locked
// no-rounded-corners rule). Mustard accent. Decorative, hidden from a11y tree.
export function DiamondBullet({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "mt-[0.35em] inline-block h-2 w-2 shrink-0 rotate-45 bg-mustard",
        className,
      )}
    />
  );
}
