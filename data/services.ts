// Source of truth: docs/route90-service-copy-pricing.md (copy) — verbatim, not
// reworded. Badge numbers are 01–05 (D2, locked in CLAUDE.md). Card view: each
// service's `description` + `features` (the offerings) + headline `priceFrom`.
// The full tier×price breakdown lives in data/pricing.ts (Chapter 04 sheet).

export interface Service {
  number: string; // "01" — plain, zero-padded. NEVER "MILE 01".
  title: string;
  description: string;
  features: string[];
  priceFrom: string;
}

export const servicesIntro = "Five ways to work together — pick one, or bundle them.";

export const services: Service[] = [
  {
    number: "01",
    title: "Website & App Design",
    description:
      "From a simple business site to a fully custom web app with logins and booking, built and coded from scratch in React/Next.js so it's fast, easy to update, and actually yours.",
    features: [
      "Starter Site",
      "Business Site",
      "Advanced Site / Web App",
      "Monthly Maintenance",
    ],
    priceFrom: "From $250",
  },
  {
    number: "02",
    title: "Print Design & Sourcing",
    description:
      "You get professional print design without paying for equipment overhead — we design it, then source production through wholesale/trade printers so quality stays high and pricing stays fair.",
    features: ["Business Cards", "Flyers", "Small Banners", "T-Shirt Design"],
    priceFrom: "From $40",
  },
  {
    number: "03",
    title: "Content Creation",
    description:
      "Short-form clips for social, promo videos for your site or ads, or a full photo + video shoot bundle — filmed and edited to match your brand, not a generic template.",
    features: ["Short-Form Video", "Promo Video", "Photo + Video Bundle"],
    priceFrom: "From $80",
  },
  {
    number: "04",
    title: "Digital Handling",
    description:
      "Once your site and brand exist, someone has to keep them alive — regular posting, presence check-ins, or a custom retainer scoped to whatever your business actually needs.",
    features: ["Social Media Posting", "Online Presence Check-ins", "Custom Retainer"],
    priceFrom: "From $80/mo",
  },
  {
    number: "05",
    title: "Bundle Packages",
    description:
      "Combine services, save money, get one point of contact for all of it.",
    features: [
      "90A — Launch Package: Website + Print + Content",
      "90B — Full Brand Package: All Services + Digital Handling",
    ],
    priceFrom: "Save up to 20%",
  },
];
