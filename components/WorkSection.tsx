import { Section } from "@/components/shared/Section";
import { WorkGallery } from "@/components/WorkGallery";
import { site } from "@/data/site";

export function WorkSection() {
  return <Section id="work" tone="paper"><div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"><div><p className="mb-5 font-mono text-[10px] uppercase tracking-[.2em] text-oxide">03 / Selected work</p><h2 className="font-display text-[clamp(3.7rem,8vw,8rem)] font-semibold leading-[.82] tracking-[-.07em]">Shipped.<br /><span className="text-copper">Running.</span></h2></div><p className="max-w-sm text-pretty text-base leading-7 text-ember-ink/65">{site.work.intro}</p></div><WorkGallery /></Section>;
}
