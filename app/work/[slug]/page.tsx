import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EmberBackdrop } from "@/components/shared/EmberBackdrop";
import { Footer } from "@/components/Footer";
import { ProjectNavigation } from "@/components/ProjectNavigation";
import { work, type WorkItem } from "@/data/work";

export const dynamicParams = false;

export function generateStaticParams() {
  return work.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = work.find((entry) => entry.slug === slug);
  return item ? { title: item.title, description: item.cardDescription } : { title: "Case study" };
}

function ProjectFrame({ item, src }: { item: WorkItem; src: string }) {
  if (item.platform === "mobile") {
    return (
      <div className="mx-auto w-full max-w-[360px] rounded-[2.5rem] border border-warm-cream/18 bg-carbon p-2 shadow-[0_35px_120px_rgb(45_18_10/0.45)]">
        <div className="relative aspect-[1290/2796] overflow-hidden rounded-[2rem]">
          <Image src={src} alt={`${item.title} app screenshot`} fill priority sizes="(max-width: 640px) 88vw, 360px" className="object-cover object-top" />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-warm-cream/15 bg-carbon shadow-[0_35px_120px_rgb(45_18_10/0.45)]">
      <div className="flex items-center gap-2 border-b border-warm-cream/12 px-5 py-4">
        <span className="size-2 rounded-full bg-copper" />
        <span className="size-2 rounded-full bg-warm-cream/35" />
        <span className="ml-3 font-mono text-[9px] tracking-[.14em] text-warm-cream/45">{item.link ? item.link.replace(/^https?:\/\//, "") : `route90 / ${item.slug}`}</span>
      </div>
      <div className="relative aspect-[16/10]">
        <Image src={src} alt={`${item.title} screenshot`} fill priority sizes="(max-width: 1024px) 100vw, 1100px" className="object-cover object-top" />
      </div>
    </div>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = work.find((entry) => entry.slug === slug);
  if (!item) notFound();

  const currentIndex = work.findIndex((entry) => entry.slug === slug);
  const previous = currentIndex > 0 ? work[currentIndex - 1] : null;
  const next = currentIndex < work.length - 1 ? work[currentIndex + 1] : null;
  const heroSrc = item.media[0]?.src ?? item.thumbnail;
  const extraMedia = item.media.slice(1);

  return (
    <div className="min-h-screen bg-ember-ink text-warm-cream">
      <header className="fixed inset-x-0 top-0 z-30 px-4 pt-4 sm:px-8">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between rounded-full border border-warm-cream/15 bg-ember-ink/90 px-5 py-3 backdrop-blur-xl">
          <Link href="/#top" className="font-mono text-xs tracking-[.16em]">R90 <span className="text-copper">/</span> DIGITAL</Link>
          <Link href="/#work" className="font-body text-sm text-warm-cream/65 hover:text-signal">← Back to work</Link>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-4 pb-24 pt-40 sm:px-8 sm:pb-32 sm:pt-48 lg:px-12">
          <EmberBackdrop className="opacity-70" />
          <div className="relative mx-auto max-w-[1440px]">
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-signal">Case study / {item.status}</p>
            <h1 className="text-balance mt-7 max-w-6xl font-display text-[clamp(4rem,9vw,9rem)] font-semibold leading-[.82] tracking-[-.07em]">{item.title}</h1>
            <div className="mt-16"><ProjectFrame item={item} src={heroSrc} /></div>
          </div>
        </section>

        <section className="bg-paper px-4 py-24 text-ember-ink sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[820px]">
            <p className="whitespace-pre-line text-pretty text-lg leading-8 sm:text-xl sm:leading-9">{item.description}</p>
            {item.link ? <a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex rounded-full bg-ember-ink px-6 py-3 text-sm font-semibold text-warm-cream hover:bg-oxide">View project ↗</a> : null}
          </div>
        </section>

        {extraMedia.length ? (
          <section className="px-4 py-24 sm:px-8">
            <div className="mx-auto flex max-w-[1100px] flex-col gap-8">
              {extraMedia.map((media, index) => media.type === "video" ? (
                <video key={media.src} src={media.src} controls className="w-full rounded-2xl border border-warm-cream/15" />
              ) : (
                <div key={media.src} className="relative aspect-video overflow-hidden rounded-2xl">
                  <Image src={media.src} alt={`${item.title} screenshot ${index + 2}`} fill sizes="(max-width: 1024px) 100vw, 1100px" className="object-cover object-top" />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <ProjectNavigation previous={previous} next={next} />
      </main>
      <Footer />
    </div>
  );
}
