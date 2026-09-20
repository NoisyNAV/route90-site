"use client";

import { motion, useReducedMotion } from "framer-motion";
import { snapIn } from "@/lib/motion";

export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return <motion.div className={className} variants={snapIn} initial={false} whileInView="visible" viewport={{ once: true, margin: "-8% 0px" }}>{children}</motion.div>;
}
