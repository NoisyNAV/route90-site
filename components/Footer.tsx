import { site } from "@/data/site";

// Bottom copyright bar closing Chapter 05. Forest field continuous with the
// Contact section above; hard 2px ink top edge, zero radius. Left: copyright.
// Right: "Built in Winnipeg, MB". Verbatim from data/site.ts.
export function Footer() {
  const { footer } = site;

  return (
    <footer className="border-t-2 border-ink bg-forest px-6 py-6 text-cream sm:px-12">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-start justify-between gap-2 font-mono text-xs uppercase tracking-widest text-cream/70 sm:flex-row sm:items-center">
        <span>{footer.copyright}</span>
        <span>{footer.builtIn}</span>
      </div>
    </footer>
  );
}
