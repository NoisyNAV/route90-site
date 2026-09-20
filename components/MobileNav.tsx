"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const menu = open ? createPortal(
    <motion.div ref={panelRef} id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-30 overflow-y-auto bg-ember-ink/96 px-5 pb-10 pt-28 backdrop-blur-2xl">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_12%,rgb(216_104_62/0.28),transparent_45%),linear-gradient(145deg,transparent_35%,rgb(243_154_104/0.08),transparent_70%)]" />
      <nav aria-label="Mobile" className="relative mx-auto flex max-w-lg flex-col gap-1">
        {site.nav.links.map((link, index) => <motion.a ref={index === 0 ? firstLinkRef : undefined} key={link.href} href={link.href} onClick={close} initial={reduce ? false : { opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: reduce ? 0 : index * 0.055 }} className="border-b border-warm-cream/15 py-5 font-display text-[clamp(2.6rem,13vw,4rem)] leading-none tracking-[-.045em] text-warm-cream">{link.label}</motion.a>)}
        <a href={site.nav.ctaHref} onClick={close} className="mt-8 rounded-full bg-signal px-6 py-4 text-center font-body font-semibold text-ember-ink shadow-[inset_0_1px_0_rgb(255_255_255/0.55),0_18px_50px_rgb(0_0_0/0.28)]">{site.nav.cta}</a>
      </nav>
    </motion.div>,
    document.body,
  ) : null;

  return <div className="md:hidden"><button ref={buttonRef} type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen((value) => !value)} className="grid size-10 place-items-center rounded-full border border-warm-cream/20 bg-warm-cream/[.04] text-warm-cream shadow-[inset_0_1px_0_rgb(255_255_255/0.1)]"><span aria-hidden="true" className="relative block h-3 w-4"><span className={`absolute left-0 top-0 h-px w-4 bg-current transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`} /><span className={`absolute bottom-0 left-0 h-px w-4 bg-current transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} /></span></button>{menu}</div>;
}
