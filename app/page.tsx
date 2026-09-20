// Single-page composition. Content order remains direct and conversion-focused;
// visuals follow the Ember Editorial system approved 2026-09-19.

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
      <a href="#main-content" className="fixed left-4 top-4 z-50 -translate-y-24 rounded-full bg-signal px-5 py-3 text-sm font-semibold text-ember-ink transition-transform focus:translate-y-0">
        Skip to content
      </a>
      <Nav />
      <main id="main-content">
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
