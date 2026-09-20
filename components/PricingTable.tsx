import type { PricingGroup } from "@/data/pricing";

export function PricingTable({ group }: { group: PricingGroup }) {
  return <section className="py-8 sm:py-10"><div className="mb-7 grid grid-cols-[auto_1fr] gap-5"><span className="font-mono text-[10px] tracking-[.18em] text-signal">{group.number}</span><h3 className="font-display text-3xl font-semibold leading-none tracking-[-.04em] sm:text-4xl">{group.title}</h3></div><div className="space-y-4 pl-0 sm:pl-10">{group.rows.map((row) => <div key={`${row.tier}-${row.price}`} className="grid gap-2 rounded-xl bg-warm-cream/[.035] p-4 sm:grid-cols-[1fr_1.15fr_auto] sm:items-center sm:gap-5"><span className="text-sm text-warm-cream/85">{row.tier}</span><span className="text-xs leading-5 text-warm-cream/50">{row.included ?? ""}</span><strong className="font-mono text-[10px] uppercase tracking-[.1em] text-signal">{row.price}</strong></div>)}</div></section>;
}
