"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); buttonRef.current?.focus(); return; }
      if (event.key !== "Tab") return;
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", key);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", key); };
  }, [open]);
  const close = () => setOpen(false);
  return <div className="md:hidden"><button ref={buttonRef} type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen((value) => !value)} className="grid size-10 place-items-center rounded-full border border-warm-cream/20 text-warm-cream"><span aria-hidden="true" className="relative block h-3 w-4"><span className={`absolute left-0 top-0 h-px w-4 bg-current transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`} /><span className={`absolute bottom-0 left-0 h-px w-4 bg-current transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} /></span></button>{open ? <motion.div ref={panelRef} id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 top-[72px] z-30 overscroll-contain bg-ember-ink px-5 pb-10 pt-16"><nav aria-label="Mobile" className="mx-auto flex max-w-lg flex-col gap-3">{site.nav.links.map((link, index) => <motion.a ref={index === 0 ? firstLinkRef : undefined} key={link.href} href={link.href} onClick={close} initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduce ? 0 : index * 0.06 }} className="border-b border-warm-cream/15 py-4 font-display text-4xl leading-none text-warm-cream">{link.label}</motion.a>)}<a href={site.nav.ctaHref} onClick={close} className="mt-8 rounded-full bg-signal px-6 py-4 text-center font-body font-semibold text-ember-ink">{site.nav.cta}</a></nav></motion.div> : null}</div>;
}
