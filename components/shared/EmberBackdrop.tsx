import { cn } from "@/lib/cn";

export function EmberBackdrop({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_92%_4%,rgb(243_154_104/0.72)_0%,rgb(216_104_62/0.34)_24%,transparent_56%),radial-gradient(ellipse_at_58%_58%,rgb(113_50_38/0.52)_0%,transparent_60%),linear-gradient(132deg,#11100f_10%,#1d1512_42%,#4a241c_72%,#11100f_100%)]" />
      <div className="absolute -right-[16%] top-[-30%] h-[105%] w-[72%] rotate-[-12deg] rounded-[45%] bg-[linear-gradient(112deg,transparent_12%,rgb(243_235_221/0.04)_34%,rgb(243_154_104/0.32)_49%,rgb(243_235_221/0.08)_57%,transparent_76%)] blur-3xl" />
      <div className="absolute -left-[24%] bottom-[-35%] h-[72%] w-[105%] rotate-[8deg] bg-[radial-gradient(ellipse,rgb(216_104_62/0.17),transparent_67%)] blur-3xl" />
      <div className="absolute right-[8%] top-[16%] h-[42%] w-px rotate-[28deg] bg-gradient-to-b from-transparent via-warm-cream/35 to-transparent blur-[1px]" />
      <div className="absolute inset-0 opacity-[0.035] [background-image:repeating-radial-gradient(circle_at_20%_20%,#fff_0,#fff_1px,transparent_1px,transparent_4px)]" />
    </div>
  );
}
