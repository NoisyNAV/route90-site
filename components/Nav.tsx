import { ShieldBadge } from "@/components/shared/ShieldBadge";
import { GridTexture } from "@/components/shared/GridTexture";
import { site } from "@/data/site";

// Sticky top nav on the near-black base canvas with the grid texture (continuous
// with the Hero below it). Left: shield + "ROUTE 90 DIGITAL" wordmark lockup.
// Right-of-center: section links (data/site.ts). Top-right: mustard "Get in Touch"
// button. Hard dashed-mustard bottom edge, zero radius. Border weight 2px and the
// hover-invert button match the patterns established in Phase 5.
export function Nav() {
  return (
    <header
      id="top"
      className="sticky top-0 z-50 border-b-2 border-dashed border-mustard bg-ink"
    >
      <GridTexture />
      <div className="relative mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 px-6 py-4 sm:px-12">
        {/* Wordmark lockup */}
        <a href="#top" className="flex items-center gap-3" aria-label="Route 90 Digital — home">
          <ShieldBadge size={32} />
          <span className="font-display text-lg uppercase leading-none tracking-tight text-cream sm:text-xl">
            Route 90 <span className="text-mustard">Digital</span>
          </span>
        </a>

        {/* Section links, right-of-center */}
        <nav className="hidden items-center gap-1 md:flex">
          {site.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="border-2 border-transparent px-4 py-2 font-mono text-xs uppercase tracking-widest text-cream transition-colors duration-200 hover:border-mustard hover:text-mustard"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href={site.nav.ctaHref}
          className="border-2 border-mustard bg-mustard px-4 py-2 font-display text-sm uppercase tracking-wide text-ink transition-colors duration-200 hover:bg-transparent hover:text-mustard md:px-6"
        >
          {site.nav.cta}
        </a>
      </div>
    </header>
  );
}
