import { Section } from "@/components/shared/Section";
import { ChapterTag } from "@/components/shared/ChapterTag";
import { DashedDivider } from "@/components/shared/DashedDivider";
import { WorkGallery } from "@/components/WorkGallery";
import { site } from "@/data/site";

// Chapter 03 — Selected Work. Forest field. Header (title left, intro right) →
// dashed divider → the interactive gallery (WorkGallery, a client island):
// collapsed browser-window cards that expand into an accessible case-study
// dialog. Section chrome stays a server component; only the grid is client.
export function WorkSection() {
  return (
    <Section id="work" tone="forest">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <ChapterTag number="03" label="Selected Work" />
          <h2 className="mt-4 font-display text-5xl uppercase leading-[0.9] tracking-tight text-cream sm:text-6xl">
            Selected Work
          </h2>
        </div>
        <p className="max-w-sm font-body leading-relaxed text-cream/80 sm:text-right">
          {site.work.intro}
        </p>
      </div>

      <DashedDivider className="mt-10 text-cream/60" />

      <div className="mt-10">
        <WorkGallery />
      </div>
    </Section>
  );
}
