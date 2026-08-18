// Source of truth: docs/route90-full-site-copy.md — verbatim, not reworded.
// Hero / about / work-intro / contact / footer copy. Section copy for services
// and pricing lives in data/services.ts and data/pricing.ts respectively.
//
// Casing note: values are stored in natural case; the road-sign all-caps look
// (e.g. ROUTE90DIGITAL@GMAIL.COM) is applied in the UI via `uppercase`, not baked in.
// Email shown is route90digital@gmail.com; the contact form actually SENDS to
// whatever CONTACT_TO_EMAIL is set to in .env.local (currently the same address).

export const site = {
  nav: {
    // Service-category + location tags, not metaphors (kept per copy doc).
    // These feed the TickerStrip.
    tags: [
      "Websites",
      "Apps",
      "Print",
      "Content",
      "Digital Handling",
      "Brand Systems",
      "Winnipeg",
      "Toronto",
      "Canada",
      "Route 90",
    ],
    // Section anchors for the nav bar. Labels are the LOCKED section names from
    // CLAUDE.md's page order + the copy-doc renames (Who's Behind the Wheel →
    // About; The Miles → Services) — NOT the stale "Who"/"The Miles" labels in the
    // /reference mockup, which the locked naming rules override. Anchors match the
    // section component ids. (Contact is reached via the `cta` button → #contact.)
    links: [
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Work", href: "#work" },
      { label: "Pricing", href: "#pricing" },
    ],
    cta: "Get in Touch",
    ctaHref: "#contact",
  },

  hero: {
    eyebrow: "LET · WINNIPEG, MB · DEVELOPMENT STUDIO",
    headline: "ROUTE 90 DIGITAL SOLUTIONS", // logo lockup, not copy
    subheadline:
      "We build websites, apps, and print for Winnipeg small businesses — clean design, built to last, done right the first time.",
    cta: "See the Services",
  },

  about: {
    eyebrow: "WHO — SECTION 01",
    // Locked section title from the copy-doc rename (Ch 01: "Who's Behind It" →
    // "About Route90", docs/route90-full-site-copy.md). Section eyebrow/numbering
    // is shown via the "CHAPTER 01" ChapterTag; the stale "WHO — SECTION 01"
    // string above is retained verbatim in data but not rendered (avoids the
    // CHAPTER-vs-SECTION drift flagged in Phase 4).
    headline: "About Route90",
    pullQuote:
      "Every small business deserves a brand that looks like it belongs — bold, clear, impossible to miss.",
    body: "Route90 is a Winnipeg design and development studio run by one founder who talks directly with every client. No account managers, no handoffs — just clear planning, honest pricing, and work that doesn't take a third revision to get right.",
    tags: ["WEB + APP", "PRINT + COLLATERAL", "BRAND SYSTEM", "WINNIPEG-BASED"],
  },

  work: {
    intro: "A few recent projects — real products, shipped and running.",
  },

  contact: {
    eyebrow: "LET'S TALK",
    headline: "ROUTE 90", // logo mark, not copy
    sub: "DIGITAL SOLUTIONS",
    body: "Tell us about your project. We'll scope the work and send a straightforward quote — no jargon, no pressure.",
    submit: "Send It",
    fields: {
      name: "Name",
      email: "Email",
      business: "Business Name",
      // Optional dropdown — options are the 5 service titles from data/services.ts.
      chapter: "Which Chapter",
      message: "Tell us about your project",
    },
  },

  footer: {
    email: "route90digital@gmail.com", // display only; sends to CONTACT_TO_EMAIL
    phone: "647-807-9190",
    location: "Winnipeg, MB · Canada",
    hours: "Mon–Fri · 9–5 CST",
    copyright: "© 2026 Route 90 Digital Solutions",
    builtIn: "Built in Winnipeg, MB",
  },
} as const;
