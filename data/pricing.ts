// Source of truth: docs/route90-service-copy-pricing.md (pricing tables) +
// docs/route90-full-site-copy.md (Chapter 04 framing). Verbatim prices.
// This is the authoritative tier×price sheet; data/services.ts is the card view.
// Print pricing resolved to a flat "From $40" (was "$40–$80"); see build-guide "Resolved".

export interface PriceRow {
  tier: string;
  included?: string;
  price: string;
}

export interface PricingGroup {
  number: string; // matches Service.number (01–05)
  title: string;
  rows: PriceRow[];
}

export const pricingIntro =
  "Straightforward pricing. What's included, starting price, no surprise line items.";
export const pricingCta = "Request a Quote";
export const pricingNote = "Not sure what you need? Let's talk it through.";

export const pricing: PricingGroup[] = [
  {
    number: "01",
    title: "Website & App Design",
    rows: [
      {
        tier: "Starter Site",
        included: "1–3 pages (home, about, contact), mobile-responsive, basic SEO",
        price: "From $250",
      },
      {
        tier: "Business Site",
        included: "4–7 pages, contact form, gallery/portfolio section, custom design",
        price: "From $500",
      },
      {
        tier: "Advanced Site / Web App",
        included: "Booking systems, e-commerce, client logins, custom functionality",
        price: "From $1,200",
      },
      {
        tier: "Monthly Maintenance",
        included: "Hosting coordination, content updates, small fixes",
        price: "From $50/mo",
      },
    ],
  },
  {
    number: "02",
    title: "Print Design & Sourcing",
    rows: [
      {
        tier: "Business Cards, Flyers, Small Banners, T-Shirt Design",
        included: "Design fee + print cost passthrough",
        price: "From $40",
      },
    ],
  },
  {
    number: "03",
    title: "Content Creation",
    rows: [
      { tier: "Short-Form Video", price: "From $80" },
      { tier: "Promo Video", price: "From $200" },
      { tier: "Photo + Video Bundle", price: "From $350" },
    ],
  },
  {
    number: "04",
    title: "Digital Handling",
    rows: [
      { tier: "Social Media Posting", price: "$80–$150/mo" },
      { tier: "Online Presence Check-ins", price: "$100–$200" },
      { tier: "Custom Retainer", price: "From $350" },
    ],
  },
  {
    number: "05",
    title: "Bundle Packages",
    rows: [
      {
        tier: "90A — Launch Package",
        included: "Website + Print + Content",
        price: "Save 15%",
      },
      {
        tier: "90B — Full Brand Package",
        included: "All Services + Digital Handling",
        price: "Save 20%",
      },
    ],
  },
];
