import type { PricingGroup } from "@/data/pricing";

export function PricingTable({ group }: { group: PricingGroup }) {
  return (
    <section className="rounded-[1.5rem] border border-warm-cream/12 bg-warm-cream/[.045] p-5 shadow-[inset_0_1px_0_rgb(255_255_255/0.045)] sm:p-7">
      <div className="mb-7 grid grid-cols-[auto_1fr] gap-5">
        <span className="pt-1 font-mono text-[10px] tracking-[.18em] text-signal">{group.number}</span>
        <h3 className="font-display text-4xl font-semibold leading-none tracking-[-.04em] sm:text-5xl">{group.title}</h3>
      </div>
      <div className="space-y-3 sm:pl-10">
        {group.rows.map((row) => (
          <div key={`${row.tier}-${row.price}`} className="grid gap-3 rounded-xl border border-warm-cream/10 bg-warm-cream/[.065] p-5 transition-colors hover:bg-warm-cream/[.09] sm:grid-cols-[1fr_1.15fr_auto] sm:items-center sm:gap-6">
            <span className="text-base font-medium leading-6 text-warm-cream">{row.tier}</span>
            <span className="text-sm leading-6 text-warm-cream/68">{row.included ?? ""}</span>
            <strong className="font-mono text-[11px] uppercase leading-5 tracking-[.08em] text-signal sm:max-w-40 sm:text-right">{row.price}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
