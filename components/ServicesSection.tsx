import { Section } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";
import { ServicePanel } from "@/components/ServicePanel";
import { services, servicesIntro } from "@/data/services";

export function ServicesSection() {
  return <Section id="services" tone="dark"><div className="flex flex-col gap-8 border-b border-warm-cream/15 pb-14 md:flex-row md:items-end md:justify-between"><div><p className="mb-5 font-mono text-[10px] uppercase tracking-[.2em] text-signal">02 / Services</p><h2 className="font-display text-[clamp(3.5rem,8vw,8rem)] font-semibold leading-[.82] tracking-[-.07em]">Useful work,<br /><span className="text-copper">built to last.</span></h2></div><p className="max-w-sm text-pretty text-base leading-7 text-warm-cream/65">{servicesIntro}</p></div><div className="mt-16 space-y-24 sm:mt-24 sm:space-y-36">{services.map((service, index) => <Reveal key={service.number}><ServicePanel service={service} reverse={index % 2 === 1} /></Reveal>)}</div></Section>;
}
