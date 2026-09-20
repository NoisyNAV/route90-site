import Link from "next/link";
import type { WorkItem } from "@/data/work";

type ProjectNavigationProps = {
  previous: WorkItem | null;
  next: WorkItem | null;
};

function ProjectControl({ item, direction }: { item: WorkItem | null; direction: "previous" | "next" }) {
  const isPrevious = direction === "previous";
  const label = isPrevious ? "Previous project" : "Next project";
  const alignment = isPrevious ? "items-start text-left" : "items-end text-right";
  const contents = (
    <>
      <span className="font-mono text-[9px] uppercase tracking-[.16em] text-warm-cream/45">{isPrevious ? "← " : ""}{label}{isPrevious ? "" : " →"}</span>
      <span className="mt-2 line-clamp-2 font-display text-2xl font-semibold leading-none tracking-[-.035em] sm:text-3xl">{item?.title ?? "No more projects"}</span>
    </>
  );

  if (!item) {
    return <span aria-disabled="true" className={`flex min-h-28 flex-col justify-center rounded-[1.25rem] border border-warm-cream/8 bg-warm-cream/[.025] p-5 text-warm-cream/25 ${alignment}`}>{contents}</span>;
  }

  return <Link href={`/work/${item.slug}`} className={`group flex min-h-28 flex-col justify-center rounded-[1.25rem] border border-warm-cream/15 bg-warm-cream/[.045] p-5 text-warm-cream transition-colors duration-300 hover:border-signal/60 hover:bg-warm-cream/[.075] ${alignment}`}>{contents}</Link>;
}

export function ProjectNavigation({ previous, next }: ProjectNavigationProps) {
  return (
    <nav id="project-navigation" aria-label="Project navigation" className="px-4 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-[1200px] gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-stretch">
        <ProjectControl item={previous} direction="previous" />
        <Link href="/#work" className="flex min-h-16 items-center justify-center rounded-[1.25rem] border border-warm-cream/20 px-6 text-center text-sm font-semibold text-warm-cream transition-colors duration-300 hover:border-signal hover:text-signal sm:min-h-28">Back to all work</Link>
        <ProjectControl item={next} direction="next" />
      </div>
    </nav>
  );
}
