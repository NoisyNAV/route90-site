import type { Transition, Variants } from "framer-motion";

// Motion is structural and mechanical — panels SNAP into place like signage
// locking in. Short duration, minimal-to-no overshoot. Locked in CLAUDE.md.
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const SNAP: Transition = { duration: 0.72, ease: EASE_OUT };

export const snapIn: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: SNAP },
};
