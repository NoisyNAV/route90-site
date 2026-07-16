// Phase 5 — the Services section (Chapter 02) is the first real, data-driven
// section and the reference pattern for every other one. Rendered alone for now;
// the remaining sections (Nav, Hero, About, Work, Pricing, Contact) land in later
// phases and slot in around it per the locked page order in CLAUDE.md.

import { ServicesSection } from "@/components/ServicesSection";

export default function Home() {
  return (
    <main>
      <ServicesSection />
    </main>
  );
}
