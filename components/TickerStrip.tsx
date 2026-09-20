import { site } from "@/data/site";

export function TickerStrip() {
  return <div className="border-y border-warm-cream/12 bg-carbon px-4 py-5 sm:px-8"><div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-6 gap-y-3">{site.nav.tags.map((tag, index) => <span key={tag} className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-[.18em] text-warm-cream/60">{tag}{index < site.nav.tags.length - 1 ? <span className="size-1 rounded-full bg-copper" aria-hidden="true" /> : null}</span>)}</div></div>;
}
