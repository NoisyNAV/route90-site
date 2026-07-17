import { Section } from "@/components/shared/Section";
import { ChapterTag } from "@/components/shared/ChapterTag";
import { ShieldBadge } from "@/components/shared/ShieldBadge";
import { SnapIn } from "@/components/shared/SnapIn";
import { site } from "@/data/site";

// Chapter 01 — About. Cream field. A single hard-bordered panel (matching the
// original export's structure, confirmed via /reference): a 12-col grid with a
// forest-green accent block on the left (headline) and the cream content column
// on the right (pull-quote with a mustard-highlighted tail, body copy, tag chips).
// 2px ink borders throughout, zero radius, snaps in once.
export function About() {
  const { about } = site;

  // Highlight the emphatic clause after the em dash in mustard (styling only —
  // the pull-quote copy itself is verbatim from data/site.ts).
  const [quoteLead, quoteTail] = about.pullQuote.split(" — ");

  return (
    <Section id="about" tone="cream">
      <div className="flex items-center gap-3">
        <ShieldBadge size={28} className="text-forest" />
        <ChapterTag number="01" label="About" className="text-forest" />
      </div>

      <SnapIn className="mt-8">
        <div className="grid grid-cols-1 border-2 border-ink md:grid-cols-12">
          {/* Left: green accent block */}
          <div className="flex flex-col justify-between gap-8 border-b-2 border-ink bg-forest p-8 text-cream md:col-span-5 md:border-b-0 md:border-r-2 sm:p-10">
            <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-tight sm:text-6xl">
              {about.headline}
            </h2>
            <div className="flex items-center gap-3">
              <ShieldBadge size={36} />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-cream/70">
                Winnipeg, MB
              </span>
            </div>
          </div>

          {/* Right: pull-quote, body, tags */}
          <div className="flex flex-col gap-8 bg-cream p-8 text-ink md:col-span-7 sm:p-10">
            <blockquote className="font-display text-3xl uppercase leading-[1.05] tracking-tight sm:text-5xl">
              {quoteLead}
              {quoteTail ? (
                <>
                  {" — "}
                  {/* Mustard HIGHLIGHT (bg), not mustard text: ink-on-mustard is
                      9.2:1 (AA/AAA) where mustard-on-cream text was 1.74:1 (fails
                      AA). Restores the "mustard-highlighted tail" intent noted at
                      the top of this file. box-decoration-clone keeps the marker
                      block intact across line wraps; zero radius is global. */}
                  <span className="box-decoration-clone bg-mustard px-1.5 text-ink">
                    {quoteTail}
                  </span>
                </>
              ) : null}
            </blockquote>

            <p className="max-w-prose font-body text-base leading-relaxed text-ink/90 sm:text-lg">
              {about.body}
            </p>

            <ul className="flex flex-wrap gap-3 border-t-2 border-dashed border-ink pt-6">
              {about.tags.map((tag) => (
                <li
                  key={tag}
                  className="border-2 border-ink px-3 py-1 font-mono text-xs uppercase tracking-widest"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SnapIn>
    </Section>
  );
}
