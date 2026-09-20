import { PricingTable } from "@/components/PricingTable";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { Section } from "@/components/shared/Section";
import { pricing, pricingCta, pricingIntro, pricingNote } from "@/data/pricing";

export function PricingSection() {
  return (
    <Section id="pricing" tone="carbon">
      <div className="grid gap-14 lg:grid-cols-[.65fr_1.35fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[.2em] text-signal">04 / Pricing</p>
          <h2 className="font-display text-[clamp(3.7rem,7vw,7rem)] font-semibold leading-[.84] tracking-[-.07em]">Clear<br />starting<br /><span className="text-copper">points.</span></h2>
          <p className="mt-8 max-w-xs text-pretty text-base leading-7 text-warm-cream/70">{pricingIntro}</p>
          <ArrowLink href="#contact" className="mt-10">{pricingCta}</ArrowLink>
          <p className="mt-5 font-mono text-[9px] uppercase tracking-[.13em] text-smoke">{pricingNote}</p>
        </div>
        <div className="space-y-5">{pricing.map((group) => <PricingTable key={group.number} group={group} />)}</div>
      </div>
    </Section>
  );
}
