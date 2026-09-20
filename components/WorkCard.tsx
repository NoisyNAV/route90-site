import Image from "next/image";
import Link from "next/link";
import type { WorkItem } from "@/data/work";

const atmospheres = [
  "from-copper via-oxide to-ember-ink",
  "from-[#a65a3e] via-carbon to-ember-ink",
  "from-[#59683f] via-[#2b2b21] to-ember-ink",
  "from-[#7b5141] via-oxide to-ember-ink",
];

export function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  return (
    <Link
      href={`/work/${item.slug}`}
      aria-label={`${item.title} — view case study`}
      data-work-card
      className="group relative aspect-[4/5] w-[84vw] max-w-[430px] shrink-0 snap-start overflow-hidden rounded-[1.75rem] bg-ember-ink text-warm-cream shadow-[0_28px_80px_rgb(60_25_15/0.2)] sm:w-[46vw] lg:w-[30vw] lg:max-w-[480px]"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${atmospheres[index % atmospheres.length]}`} />
      <div aria-hidden="true" className="absolute -right-[20%] -top-[12%] size-[72%] rounded-full border border-warm-cream/15 bg-warm-cream/[.06] shadow-[inset_0_1px_0_rgb(255_255_255/0.16)] backdrop-blur-xl" />
      <Image src={item.thumbnail} alt="" fill sizes="(max-width: 640px) 84vw, (max-width: 1024px) 46vw, 30vw" className="object-cover object-top opacity-60 mix-blend-luminosity transition duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.035] group-hover:opacity-75" />
      <div className="absolute inset-0 bg-gradient-to-t from-ember-ink via-ember-ink/30 to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-5 top-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[.14em] text-warm-cream/70">
        <span>{item.status}</span>
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
        <div className="mb-5 h-px origin-left bg-warm-cream/25 transition-transform duration-500 group-hover:scale-x-90" />
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="text-balance font-display text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[.88] tracking-[-.055em]">{item.title}</h3>
            <p className="mt-4 line-clamp-3 max-w-sm text-sm leading-6 text-warm-cream/72">{item.cardDescription}</p>
          </div>
          <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-full border border-warm-cream/25 bg-warm-cream/[.08] text-lg shadow-[inset_0_1px_0_rgb(255_255_255/0.12)] backdrop-blur-md transition-colors group-hover:bg-signal group-hover:text-ember-ink">↗</span>
        </div>
      </div>
    </Link>
  );
}
