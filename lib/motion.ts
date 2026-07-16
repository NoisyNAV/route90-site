import type { Transition, Variants } from "framer-motion";

// Motion is structural and mechanical — panels SNAP into place like signage
// locking in. Short duration, minimal-to-no overshoot. Locked in CLAUDE.md.
export const SNAP: Transition = { duration: 0.35, ease: [0.2, 0.9, 0.3, 1] };

export const snapIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: SNAP },
};
