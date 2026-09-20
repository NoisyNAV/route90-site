import { cn } from "@/lib/cn";

export function EmberBackdrop({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <div className="absolute right-[-20%] top-[6%] aspect-square w-[min(82vw,820px)] rounded-full bg-[radial-gradient(circle_at_32%_28%,#F39A68_0%,#D8683E_22%,#713226_48%,transparent_70%)] opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_34%,rgb(216_104_62/0.24)_0%,transparent_52%)]" />
      <div className="absolute inset-0 opacity-[0.035] [background-image:repeating-radial-gradient(circle_at_20%_20%,#fff_0,#fff_1px,transparent_1px,transparent_4px)]" />
    </div>
  );
}
