import Image from "next/image";
import { serviceVisuals } from "@/data/service-visuals";

export function ServiceVisual({ number }: { number: string }) {
  const visual = serviceVisuals[number];
  return <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-warm-cream/12 bg-carbon shadow-[0_28px_100px_rgb(60_25_15/0.28)]"><Image src={visual.src} alt={visual.alt} fill sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.025]" /></div>;
}
