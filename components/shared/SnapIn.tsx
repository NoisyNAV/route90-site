"use client";

import { motion, useReducedMotion } from "framer-motion";
import { snapIn } from "@/lib/motion";

// Reveals children with the structural snap when scrolled into view, once.
// Under reduced motion it renders the end state immediately — no animation.
export function SnapIn({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={snapIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {children}
    </motion.div>
  );
}
