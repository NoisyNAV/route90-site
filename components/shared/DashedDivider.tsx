"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SNAP } from "@/lib/motion";
import { cn } from "@/lib/cn";

// Deliberate section separator: a dashed rule that "draws on" (left→right) when
// scrolled into view. Uses a CSS dashed border scaled on X so the dashes are
// preserved (animating SVG pathLength would collapse them into a solid line).
// Under reduced motion it renders fully drawn, no animation. Color = currentColor.
export function DashedDivider({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("w-full overflow-hidden", className)} aria-hidden="true">
      <motion.div
        className="h-0 border-t-2 border-dashed border-current"
        style={{ transformOrigin: "left" }}
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={reduce ? undefined : { scaleX: 1 }}
        transition={SNAP}
        viewport={{ once: true }}
      />
    </div>
  );
}
