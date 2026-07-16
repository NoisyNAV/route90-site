import type { PricingGroup } from "@/data/pricing";

// One pricing group as a hard-bordered block: a forest header (mustard-bordered
// service number badge + name) over cream rows (tier + what's included on the
// left, the "from" price in mustard on the right). Same header/body pattern as
// ServicePanel — no new visual language. 2px ink borders, zero radius.
//
// Bundle names: the 05 rows are stored as "90A — Launch Package" / "90B — Full
// Brand Package" in data/pricing.ts, but the pricing sheet shows the PLAIN names
// (per Phase 6 spec — the 90A/90B route-number labels were the open naming
// question). Strip the prefix at render only; the data stays untouched.
function plainTier(tier: string): string {
  return tier.replace(/^90[AB]\s*—\s*/, "");
}

export function PricingTable({ group }: { group: PricingGroup }) {
  return (
    <div className="border-2 border-ink bg-cream">
      <header className="flex items-center gap-3 border-b-2 border-ink bg-forest px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
        <span className="border-2 border-mustard px-2 py-1 font-mono text-xs leading-none text-mustard">
          {group.number}
        </span>
        <h3 className="font-display text-xl uppercase leading-none tracking-tight text-cream sm:text-2xl">
          {group.title}
        </h3>
      </header>

      <ul>
        {group.rows.map((row, i) => (
          <li
            key={row.tier}
            className={`flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:px-6 ${
              i > 0 ? "border-t-2 border-dashed border-ink/40" : ""
            }`}
          >
            <div className="min-w-0">
              <p className="font-mono text-sm uppercase tracking-wide text-ink">
                {plainTier(row.tier)}
              </p>
              {row.included ? (
                <p className="mt-1 font-body text-sm leading-relaxed text-ink/70">
                  {row.included}
                </p>
              ) : null}
            </div>
            {/* Price in forest (not mustard) on cream: mustard-on-cream is on the
                KNOWN-ISSUES contrast watchlist and this is a price users must read.
                Forest passes AA on cream and stays on-brand. */}
            <span className="shrink-0 whitespace-nowrap font-mono text-sm font-semibold uppercase tracking-wide text-forest sm:text-base">
              {row.price}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
