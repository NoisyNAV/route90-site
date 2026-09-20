import { Section } from "@/components/shared/Section";
import { EmberBackdrop } from "@/components/shared/EmberBackdrop";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/data/site";

export function ContactSection() {
  const { contact, footer } = site;
  return <Section id="contact" tone="dark" className="relative overflow-hidden"><EmberBackdrop className="opacity-70" /><div className="relative grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-24"><div><p className="mb-5 font-mono text-[10px] uppercase tracking-[.2em] text-signal">05 / {contact.eyebrow}</p><h2 className="text-balance font-display text-[clamp(4rem,8vw,8rem)] font-semibold leading-[.82] tracking-[-.075em]">Tell us what<br /><span className="text-copper">you’re building.</span></h2><p className="text-pretty mt-8 max-w-lg text-base leading-7 text-warm-cream/65">{contact.body}</p><dl className="mt-12 grid gap-4 font-mono text-[10px] uppercase tracking-[.13em] text-warm-cream/60 sm:grid-cols-2"><div><dt className="text-smoke">Email</dt><dd className="mt-1"><a href={`mailto:${footer.email}`} className="hover:text-signal">{footer.email}</a></dd></div><div><dt className="text-smoke">Phone</dt><dd className="mt-1"><a href={`tel:${footer.phone.replace(/-/g, "")}`} className="hover:text-signal">{footer.phone}</a></dd></div><div><dt className="text-smoke">Location</dt><dd className="mt-1">{footer.location}</dd></div><div><dt className="text-smoke">Hours</dt><dd className="mt-1">{footer.hours}</dd></div></dl></div><div className="rounded-[1.75rem] border border-warm-cream/15 bg-carbon/90 p-5 shadow-[0_35px_120px_rgb(50_20_12/0.35)] sm:p-8"><ContactForm /></div></div></Section>;
}
