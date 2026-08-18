import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldBadge } from "@/components/shared/ShieldBadge";
import { Footer } from "@/components/Footer";
import { work, type WorkItem } from "@/data/work";

// Dedicated case-study route, one static page per work item. Replaces the old
// in-card expand/modal. Real page scroll, locked palette + hard borders + zero
// radius (the phone-bezel radius being the one locked exception). Server
// component throughout — no client JS needed.

// Only the 4 known slugs get pages; anything else 404s (no client-side routing).
export const dynamicParams = false;

export function generateStaticParams() {
  return work.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = work.find((w) => w.slug === slug);
  if (!item) return { title: "Case study — Route90 Digital" };
  return {
    title: `${item.title} — Route90 Digital`,
    description: item.cardDescription,
  };
}

// Large hero frame — browser-chrome for web projects, phone-bezel for mobile.
// Mirrors the collapsed WorkCard motifs, blown up to a readable size.
function HeroFrame({ item, src }: { item: WorkItem; src: string }) {
  if (item.platform === "mobile") {
    return (
      <div className="mx-auto w-full max-w-[320px]">
        {/* ROUNDED-CORNER EXCEPTION — the phone bezel is the one element on this
            site allowed a border-radius (CLAUDE.md "WorkCard frame rules"). */}
        <div className="relative aspect-[1290/2796] w-full overflow-hidden rounded-[32px] border-2 border-cream bg-ink">
          <Image
            src={src}
            alt={`${item.title} — app screenshot`}
            fill
            sizes="(max-width: 640px) 90vw, 320px"
            className="object-cover object-top"
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1100px] border-2 border-cream bg-ink">
      {/* Browser chrome bar */}
      <div className="flex items-center gap-2 border-b-2 border-cream px-4 py-3">
        <span className="h-2.5 w-2.5 rotate-45 bg-mustard" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rotate-45 bg-cream" aria-hidden="true" />
        <span
          className="h-2.5 w-2.5 rotate-45 border-2 border-cream"
          aria-hidden="true"
        />
        <span className="ml-3 truncate font-mono text-xs tracking-widest text-cream/60">
          {item.link
            ? item.link.replace(/^https?:\/\//, "")
            : `route90 · ${item.slug}`}
        </span>
      </div>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
        <Image
          src={src}
          alt={`${item.title} — screenshot`}
          fill
          sizes="(max-width: 1024px) 100vw, 1100px"
          className="object-cover object-top"
          priority
        />
      </div>
    </div>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = work.find((w) => w.slug === slug);
  if (!item) notFound();

  const heroSrc = item.media[0]?.src ?? item.thumbnail;
  const extraMedia = item.media.slice(1);

  return (
    <div className="min-h-screen bg-ink text-cream">
      {/* Site chrome — shield home link + styled back link (not a bare browser
          back). Dashed mustard underline matches the homepage Nav. */}
      <header className="sticky top-0 z-50 border-b-2 border-dashed border-mustard bg-ink">
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 px-6 py-4 sm:px-12">
          <Link
            href="/#top"
            className="flex items-center gap-3"
            aria-label="Route 90 Digital — home"
          >
            <ShieldBadge size={32} />
            <span className="font-display text-lg uppercase leading-none tracking-tight text-cream sm:text-xl">
              Route 90 <span className="text-mustard">Digital</span>
            </span>
          </Link>
          <Link
            href="/#work"
            className="border-2 border-cream px-4 py-2 font-mono text-xs uppercase tracking-widest text-cream transition-colors duration-200 hover:border-mustard hover:text-mustard"
          >
            ← Back to Work
          </Link>
        </div>
      </header>

      <main>
        {/* Hero — title/status + large framed screenshot on the ink canvas */}
        <section className="px-6 py-16 sm:px-12 sm:py-20">
          <div className="mx-auto w-full max-w-[1600px]">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-mustard">
              Case Study
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <h1 className="font-display text-4xl uppercase leading-[0.95] tracking-tight text-cream sm:text-6xl">
                {item.title}
              </h1>
              <span className="shrink-0 border-2 border-mustard px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-widest text-mustard">
                {item.status}
              </span>
            </div>

            <div className="mt-12">
              <HeroFrame item={item} src={heroSrc} />
            </div>
          </div>
        </section>

        {/* Full write-up — cream panel for long-form legibility */}
        <section className="bg-cream px-6 py-16 text-ink sm:px-12 sm:py-20">
          <div className="mx-auto w-full max-w-[820px]">
            <p className="whitespace-pre-line font-body text-lg leading-relaxed">
              {item.description}
            </p>

            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-block border-2 border-mustard bg-mustard px-6 py-3 font-display text-base uppercase tracking-wide text-ink transition-colors hover:bg-transparent hover:text-forest focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
              >
                View Project ↗
              </a>
            ) : null}
          </div>
        </section>

        {/* Remaining media, if any — forest field */}
        {extraMedia.length > 0 ? (
          <section className="bg-forest px-6 py-16 sm:px-12 sm:py-20">
            <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-8">
              {extraMedia.map((m, i) =>
                m.type === "video" ? (
                  <video
                    key={m.src}
                    src={m.src}
                    controls
                    className="w-full border-2 border-cream bg-ink"
                  />
                ) : (
                  <div
                    key={m.src}
                    className="relative aspect-video w-full overflow-hidden border-2 border-cream bg-ink"
                  >
                    <Image
                      src={m.src}
                      alt={`${item.title} — screenshot ${i + 2}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 1000px"
                      className="object-cover object-top"
                    />
                  </div>
                ),
              )}
            </div>
          </section>
        ) : null}

        {/* Foot of page back link — anchor-scrolls to the Work grid on home */}
        <section className="px-6 py-16 sm:px-12">
          <div className="mx-auto w-full max-w-[1600px]">
            <Link
              href="/#work"
              className="inline-block border-2 border-cream px-6 py-3 font-display text-base uppercase tracking-wide text-cream transition-colors hover:border-mustard hover:text-mustard focus:outline-none focus-visible:ring-2 focus-visible:ring-mustard"
            >
              ← Back to all work
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
