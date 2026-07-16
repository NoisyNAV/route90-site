import { ShieldBadge } from "@/components/shared/ShieldBadge";
import { GridTexture } from "@/components/shared/GridTexture";
import { SnapIn } from "@/components/shared/SnapIn";
import { DashedDivider } from "@/components/shared/DashedDivider";
import { site } from "@/data/site";

// Chapter 00 — Hero. Same near-black canvas + grid texture as the Nav directly
// above it, so the grid reads continuous across the seam. Small shield eyebrow,
// then the huge three-tone Anton wordmark (ROUTE 90 cream / DIGITAL mustard /
// SOLUTIONS cream), the corrected non-driving-metaphor subheadline, the
// "See the Services" CTA, and a dashed divider closing the section.
export function Hero() {
  const { hero } = site;

  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      <GridTexture />
      {/* Container width matches the /reference mockup hero (max-w-[1600px], not
          the max-w-6xl/1152px used elsewhere) so the hero fills close to the
          viewport edges at desktop instead of a narrow centered column. Padding
          and vertical rhythm are unchanged; below 1600px it stays fluid, so
          mobile stacking is unaffected. NOTE: Nav + shared Section still use
          max-w-6xl — hero is intentionally wider than them for now (hero-only
          pass); see report. */}
      <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-16 pt-20 sm:px-12 sm:pb-20 sm:pt-28">
        {/* Eyebrow: shield + studio line */}
        <SnapIn className="flex items-center gap-3">
          <ShieldBadge size={28} />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-mustard sm:text-sm">
            {hero.eyebrow}
          </span>
        </SnapIn>

        {/* Three-tone wordmark, stacked */}
        <SnapIn className="mt-10">
          <h1 className="font-display uppercase leading-[0.82] tracking-tighter">
            <span className="block text-[15vw] text-cream md:text-[9rem] lg:text-[11rem]">
              Route 90
            </span>
            <span className="block text-[15vw] text-mustard md:text-[9rem] lg:text-[11rem]">
              Digital
            </span>
            <span className="block text-[15vw] text-cream md:text-[9rem] lg:text-[11rem]">
              Solutions
            </span>
          </h1>
        </SnapIn>

        {/* Subheadline + CTA */}
        <SnapIn className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl font-body text-base leading-relaxed text-cream/85 sm:text-lg">
            {hero.subheadline}
          </p>
          <a
            href="#services"
            className="shrink-0 border-2 border-mustard bg-mustard px-6 py-3 text-center font-display text-lg uppercase tracking-wide text-ink transition-colors duration-200 hover:bg-transparent hover:text-mustard"
          >
            {hero.cta}
          </a>
        </SnapIn>

        <DashedDivider className="mt-16 text-cream/50" />
      </div>
    </section>
  );
}
