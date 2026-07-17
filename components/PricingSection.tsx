import { Section } from "@/components/shared/Section";
import { ChapterTag } from "@/components/shared/ChapterTag";
import { SnapIn } from "@/components/shared/SnapIn";
import { DashedDivider } from "@/components/shared/DashedDivider";
import { PricingTable } from "@/components/PricingTable";
import { pricing, pricingIntro, pricingCta, pricingNote } from "@/data/pricing";

// Chapter 04 — Pricing. Cream field. Header (title left, intro right) → dashed
// divider → the pricing groups (each a bordered PricingTable, snapping in) →
// CTA line + "Request a Quote" button → the "let's talk it through" footer note.
export function PricingSection() {
  return (
    <Section id="pricing" tone="cream">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <ChapterTag number="04" label="Pricing" className="text-forest" />
          <h2 className="mt-4 font-display text-6xl uppercase leading-[0.85] tracking-tighter text-ink sm:text-8xl">
            Pricing
          </h2>
        </div>
        <p className="max-w-sm font-body leading-relaxed text-ink/80 sm:text-right">
          {pricingIntro}
        </p>
      </div>

      <DashedDivider className="mt-10 text-ink/50" />

      <div className="mt-10 space-y-5 sm:space-y-6">
        {pricing.map((group) => (
          <SnapIn key={group.number}>
            <PricingTable group={group} />
          </SnapIn>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-2xl uppercase tracking-tight text-ink sm:text-3xl">
          {pricingNote}
        </p>
        <a
          href="#contact"
          className="shrink-0 border-2 border-ink bg-mustard px-6 py-3 font-display text-lg uppercase tracking-wide text-ink transition-colors duration-200 hover:bg-ink hover:text-mustard"
        >
          {pricingCta}
        </a>
      </div>
    </Section>
  );
}
