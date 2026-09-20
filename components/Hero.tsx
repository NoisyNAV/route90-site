"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { EmberBackdrop } from "@/components/shared/EmberBackdrop";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { site } from "@/data/site";
import { EASE_OUT } from "@/lib/motion";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 24]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.03]);
  return <section ref={ref} className="relative min-h-[92svh] overflow-hidden bg-ember-ink px-4 pb-16 pt-36 text-warm-cream sm:px-8 sm:pb-24 sm:pt-44 lg:px-12"><motion.div style={{ y, scale }} className="absolute inset-0"><EmberBackdrop /></motion.div><div className="relative mx-auto grid min-h-[70svh] w-full max-w-[1440px] items-end gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,.55fr)]"><div><motion.p initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : .6, ease: EASE_OUT }} className="mb-8 font-mono text-[11px] uppercase tracking-[.2em] text-signal">{site.hero.eyebrow}</motion.p><h1 className="text-balance font-display text-[clamp(4.1rem,11.5vw,11.5rem)] font-semibold leading-[.78] tracking-[-.075em]"><motion.span initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : .85, ease: EASE_OUT }} className="block">Route 90</motion.span><motion.span initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : .85, delay: reduce ? 0 : .1, ease: EASE_OUT }} className="block text-copper">Digital</motion.span><motion.span initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : .85, delay: reduce ? 0 : .2, ease: EASE_OUT }} className="block">Solutions</motion.span></h1></div><motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : .8, delay: reduce ? 0 : .45, ease: EASE_OUT }} className="mb-3 rounded-[1.5rem] border border-warm-cream/15 bg-carbon/80 p-6 shadow-[0_30px_100px_rgb(42_20_13/0.35)] sm:p-8"><p className="text-pretty max-w-md font-body text-base leading-relaxed text-warm-cream/80 sm:text-lg">{site.hero.subheadline}</p><ArrowLink href="#services" className="mt-8">{site.hero.cta}</ArrowLink></motion.div></div></section>;
}
