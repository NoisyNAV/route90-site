import { WorkCard } from "@/components/WorkCard";
import { work } from "@/data/work";

export function WorkGallery() {
  return <div className="grid gap-5 md:grid-cols-2">{work.map((item, index) => <WorkCard key={item.slug} item={item} featured={index === 0} />)}</div>;
}
