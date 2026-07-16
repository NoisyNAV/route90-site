// Phase 6 — the full single-page assembly in the locked order (CLAUDE.md):
// Nav → Hero → TickerStrip → About (Ch01) → Services (Ch02) → Work (Ch03,
// placeholder) → Pricing (Ch04) → Contact (Ch05) → Footer. Section background
// sequence follows the pixel-verified tone map: ink+grid → mustard → cream →
// ink → forest → cream → forest. The contact form (Phase 8) and the expandable
// Work cards (Phase 7) are reserved placeholders.

import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TickerStrip } from "@/components/TickerStrip";
import { About } from "@/components/About";
import { ServicesSection } from "@/components/ServicesSection";
import { WorkSection } from "@/components/WorkSection";
import { PricingSection } from "@/components/PricingSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TickerStrip />
        <About />
        <ServicesSection />
        <WorkSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
