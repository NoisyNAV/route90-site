import Link from "next/link";
import { cn } from "@/lib/cn";

export function ArrowLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  const classes = cn("group inline-flex w-fit items-center gap-3 rounded-full bg-signal py-2 pl-5 pr-2 font-body text-sm font-semibold text-ember-ink transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[.98]", className);
  const content = <>{children}<span aria-hidden="true" className="grid size-9 place-items-center rounded-full bg-ember-ink text-warm-cream transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span></>;
  return href.startsWith("/") ? <Link href={href} className={classes}>{content}</Link> : <a href={href} className={classes}>{content}</a>;
}
