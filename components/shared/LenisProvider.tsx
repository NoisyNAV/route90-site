"use client";

import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";

// Smooth scroll for the whole page. Locked rule: Lenis is disabled ENTIRELY
// under reduced motion — it never instantiates, leaving native scroll intact.
// Renders children unchanged; only sets up the RAF loop as a side effect.
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return; // reduced motion → native scroll, no Lenis

    const lenis = new Lenis();
    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduce]);

  return <>{children}</>;
}
