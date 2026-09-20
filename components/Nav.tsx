import { MobileNav } from "@/components/MobileNav";
import { site } from "@/data/site";

export function Nav() {
  return (
    <header id="top" className="pointer-events-none fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-8 sm:pt-6">
      <div className="liquid-glass pointer-events-auto mx-auto flex max-w-[1440px] items-center justify-between rounded-full px-4 py-2.5 sm:px-5 md:px-6 md:py-3">
        <a href="#top" aria-label="Route90 Digital — home" className="font-mono text-xs font-semibold tracking-[0.18em] text-warm-cream">R90 <span className="text-copper">/</span> DIGITAL</a>
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex lg:gap-8">
          {site.nav.links.map((link) => <a key={link.href} href={link.href} className="font-body text-[15px] text-warm-cream/70 transition-colors duration-300 hover:text-warm-cream">{link.label}</a>)}
        </nav>
        <div className="hidden md:block"><a href={site.nav.ctaHref} className="rounded-full bg-signal px-5 py-2.5 font-body text-sm font-semibold text-ember-ink transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0">{site.nav.cta}</a></div>
        <MobileNav />
      </div>
    </header>
  );
}
