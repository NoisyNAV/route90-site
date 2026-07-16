import { Section } from "@/components/shared/Section";
import { ChapterTag } from "@/components/shared/ChapterTag";
import { SnapIn } from "@/components/shared/SnapIn";
import { DashedDivider } from "@/components/shared/DashedDivider";
import { ServicePanel } from "@/components/ServicePanel";
import { services, servicesIntro } from "@/data/services";

// Chapter 02 — Services. THE reference pattern every other section reuses:
// color-blocked Section (ink/near-black field — verified against the original
// Emergent export by pixel sampling — so the green-header/cream-body panels read
// as objects on the base canvas) → header row (big display title left, intro
// right) → dashed divider → a stack of hard-bordered ServicePanels, each snapping
// in on scroll (once, reduced-motion safe via SnapIn). Content is mapped from
// data/services.ts — verbatim, 01–05.
export function ServicesSection() {
  return (
    <Section id="services" tone="ink">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <ChapterTag number="02" label="Services" />
          <h2 className="mt-4 font-display text-5xl uppercase leading-[0.9] tracking-tight text-cream sm:text-6xl">
            Services
          </h2>
        </div>
        <p className="max-w-sm font-body leading-relaxed text-cream/80 sm:text-right">
          {servicesIntro}
        </p>
      </div>

      <DashedDivider className="mt-10 text-cream/60" />

      <div className="mt-10 space-y-5 sm:space-y-6">
        {services.map((service) => (
          <SnapIn key={service.number}>
            <ServicePanel service={service} />
          </SnapIn>
        ))}
      </div>
    </Section>
  );
}
