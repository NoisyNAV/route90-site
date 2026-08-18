// Source of truth: docs/route90-full-site-copy.md (Ch 03) + owner-provided project
// copy (2026-07-16). Verbatim — not reworded. UNBOUNDED on purpose: the grid renders
// any N, not a fixed count; more projects get added later.
//
// Interface split 2026-07-16: cardDescription (short, collapsed card) vs description
// (full, expanded card). See CLAUDE.md "WorkItem note".
//
// platform field 2026-07-17: "web" | "mobile" — drives WorkCard's collapsed frame
// (browser-chrome vs phone-bezel) and layout. See CLAUDE.md "WorkCard frame rules".
//
// ⚠️ Thumbnails/media are placeholder 1×1 PNGs (KNOWN-ISSUES.md, launch blocker) —
// real screenshots/video pending for all four. Filenames match each slug.
//
// Note: "per-mile rate calculations" (Route90 Invoicer) and "live on the road"
// (BorderLog) are kept verbatim. Owner resolved 2026-07-16: these are factual product
// descriptions, NOT Route90-voice puns — the "no MILE / no highway metaphor" rule
// governs the site's own marketing voice, not accurate copy about what a tool does.

export interface WorkItem {
  slug: string;
  title: string;
  status: "LIVE PROD" | "INTERNAL TOOL" | "COMMISSIONED";
  platform: "web" | "mobile"; // determines WorkCard frame + collapsed layout
  thumbnail: string;
  cardDescription: string; // short — collapsed card state
  description: string; // full — expanded state
  media: { type: "image" | "video"; src: string }[];
  link?: string;
}

export const work: WorkItem[] = [
  {
    slug: "splithouse",
    title: "SplitHouse",
    status: "LIVE PROD",
    platform: "mobile",
    thumbnail: "/work/splithouse-thumb.png",
    cardDescription:
      "A household expense-splitting PWA with AI-powered receipt scanning — built with React, Vite, Supabase, and Claude.",
    description:
      "A household expense splitting PWA with AI-powered receipt scanning. Snap a photo of any grocery receipt and Claude Haiku extracts every item automatically — building a purchase history that tells your household when you're running low on dish soap or paper towels. Built with React, Vite, Supabase, and the Anthropic API. Installable on iOS and Android, no App Store required.",
    media: [{ type: "image", src: "/work/splithouse-1.png" }],
  },
  {
    slug: "route90-invoicer",
    title: "Route90 Invoicer",
    status: "LIVE PROD",
    platform: "web",
    thumbnail: "/work/route90-invoicer-thumb.png",
    cardDescription:
      "Full-stack invoicing tool for trucking companies — PDF generation, Supabase auth/DB, and AI document scanning, built with Next.js.",
    description:
      "A purpose-built invoicing and payroll tool for small trucking fleets. Generates polished PDF transportation invoices and contractor pay statements with automatic per-mile rate calculations, GST, and stop-pay handling. Includes AI-powered trip sheet scanning (Anthropic API) to speed up data entry, and a custom 'Prairie Glass' design system. Built with Next.js 14, Supabase (auth + Postgres), and @react-pdf/renderer.",
    media: [{ type: "image", src: "/work/route90-invoicer-1.png" }],
  },
  {
    slug: "borderlog",
    title: "BorderLog",
    status: "LIVE PROD",
    platform: "mobile",
    thumbnail: "/work/borderlog-thumb.png",
    cardDescription:
      "BorderLog — a physical-presence tracker that helps Canadian permanent residents count their way to citizenship, built for people who live on the road.",
    description:
      "BorderLog is a cross-border trip tracker built for Canadian permanent residents working toward citizenship eligibility. It automates IRCC's physical-presence day-counting rules so users always know where they stand — no spreadsheets, no guesswork. Available as a live PWA (app.borderlog.ca), with a native mobile app in development. Free tier plus a one-time $9.99 unlock — no subscriptions, no ads. Built with React/TypeScript, Supabase, and (for native) Expo + React Native.",
    media: [{ type: "image", src: "/work/borderlog-1.png" }],
    link: "https://app.borderlog.ca",
  },
  {
    slug: "route90-trucking",
    title: "Route90 Trucking — Dark-Mode Freight Website",
    status: "COMMISSIONED",
    platform: "web",
    thumbnail: "/work/route90-trucking-thumb.png",
    cardDescription:
      "A full redesign of a Winnipeg-based trucking subcontractor's site, rebuilt from a standard 4-page light-theme template into a premium, Apple-inspired dark experience. Reduced to 3 focused pages, centered on an interactive Leaflet coverage map and a distraction-free multi-step quote wizard. Built with Next.js, TypeScript, Tailwind, and Framer Motion.",
    description:
      "Route90 Trucking Inc. — Website Redesign. Owner-operator trucking subcontractor, Winnipeg, MB. The brief: take an existing 4-page trucking website built on a generic light-theme template and rebuild it from scratch as a premium, dark-mode experience that would make a freight dispatcher feel like they're booking with a top-tier operator. Approach: collapsed the information architecture from 4 pages to 3, merging Services into an interactive coverage map and folding the driver profile into a homepage 'Operator' section. Designed a dark, Apple-esque visual system from scratch: near-black surfaces, glass-morphism cards, a single restrained orange accent used only for CTAs and key states, and generous whitespace instead of decoration. Built the standout feature — an interactive Leaflet map with dark tiles showing three real coverage zones (local, Western Canada, cross-border), with clickable regions that surface relevant services. Replaced the buried contact form with a focused, full-screen multi-step quote wizard. Implemented with 32 reusable, token-driven components. Stack: Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, Leaflet/react-leaflet, Zod, Lucide icons.",
    media: [{ type: "image", src: "/work/route90-trucking-1.png" }],
  },
];
