import { Section } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";
import { site } from "@/data/site";

export function About() {
  const { about } = site;
  return <Section id="about" tone="paper"><div className="grid gap-14 lg:grid-cols-[1.2fr_.65fr] lg:gap-24"><Reveal><p className="mb-8 font-mono text-[10px] uppercase tracking-[.2em] text-oxide">01 / {about.headline}</p><h2 className="text-balance max-w-5xl font-display text-[clamp(3.3rem,7vw,7rem)] font-semibold leading-[.92] tracking-[-.06em]">{about.pullQuote}</h2></Reveal><Reveal className="flex flex-col justify-end"><p className="text-pretty max-w-xl text-base leading-7 text-ember-ink/75 sm:text-lg">{about.body}</p><ul className="mt-10 flex flex-wrap gap-2">{about.tags.map((tag) => <li key={tag} className="rounded-full border border-ember-ink/20 px-3 py-2 font-mono text-[9px] uppercase tracking-[.14em]">{tag}</li>)}</ul><p className="mt-12 border-l-2 border-copper pl-4 font-mono text-[10px] uppercase tracking-[.16em] text-ember-ink/60">One founder · Direct contact · Winnipeg</p></Reveal></div></Section>;
}
