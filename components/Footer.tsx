import { site } from "@/data/site";

export function Footer() {
  const { footer } = site;
  return <footer className="border-t border-warm-cream/10 bg-ember-ink px-4 py-7 text-warm-cream sm:px-8 lg:px-12"><div className="mx-auto flex max-w-[1440px] flex-col gap-2 font-mono text-[9px] uppercase tracking-[.16em] text-warm-cream/45 sm:flex-row sm:items-center sm:justify-between"><span>{footer.copyright}</span><span>{footer.builtIn}</span></div></footer>;
}
