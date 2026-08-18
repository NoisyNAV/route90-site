---
tags: [build-guide, route90, website]
created: 2026-07-15
status: locked
---

# Route90 Digital Solutions — Website Build Guide

Everything below is a **locked decision** from planning. Claude Code should
treat this as the source of truth and not re-open any of it — if something
here conflicts with a request mid-build, that's a signal to stop and bring
it back to planning, not improvise.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Forms | React Hook Form + Zod |
| Email | Resend (contact form → email) |
| Content | Typed `.ts` data files per section — no CMS |
| Hosting | Vercel |

## Visual System (locked from mockup)

```
Forest green   #1F3A2E   primary panel color
Near-black     #0E0E0E   base canvas
Cream          #F0EAD6   content panels / high-contrast text
Mustard yellow #E8A824   accent — badges, dividers, CTAs
White          #FFFFFF   sparingly — shield logo, contrast moments
```

- Hard-edged panels, visible borders, no rounded corners, no soft shadows
- Color-blocked sections alternating forest green / cream
- Dashed-line dividers as deliberate section separators
- Shield/badge mark as recurring anchor (nav + section markers)
- Condensed bold display face for headlines/labels (all-caps), clean sans
  for body copy, mono/stencil-adjacent face for numbers/tags

## Naming System (locked)

- **Chapter tags** (small eyebrow labels, e.g. "CHAPTER 01") stay exactly
  as in the mockup — this is the macro section numbering.
- **Service panel badges** drop the word "MILE" — plain numbers only
  (`10 / 20 / 30 / 40 / 50`, or renumber `01–05` later, doesn't matter yet).
- **No driving-metaphor copy anywhere** — no "Behind the Wheel," "Let's
  Roll Out," "Start the Trip," etc. Section headers use plain, direct
  language (About, Services, Work, Pricing, Contact).

## Page Structure (single scroll page, per original prompt)

1. Header / Hero — logo lockup, shield badge, tagline, dashed rule
2. Who — founder intro, cream panel, pull-quote
3. Services — 5 panels, green header bar + cream body, numbered badges
4. Work — portfolio pieces in bordered/boxed frames
5. Pricing — reuses services section's data, real numbers (TBD later)
6. Contact — form (React Hook Form + Zod + Resend), footer info

## Component Structure (derived from the actual mockup)

Re-checked the mockup screenshot section by section. Here's what's
actually on the page, top to bottom, and the component each maps to:

| Mockup section | What's in it | Component |
|---|---|---|
| Top nav | Logo mark, nav links, dark bg with faint grid pattern, "Get in Touch" button | `Nav.tsx` |
| Hero | Badge, eyebrow tag, 3-tone huge wordmark, subheadline, CTA button, dashed rule | `Hero.tsx` |
| Ticker strip | Yellow bar, diamond-separated labels (Websites ♦ Apps ♦ Print ♦ Brand Systems ♦ Winnipeg ♦ Route 90) | `TickerStrip.tsx` |
| About (Chapter 01) | Shield icon, chapter tag, big left-column headline, cream panel right with pull-quote + body + tag chips | `AboutSection.tsx` |
| Services (Chapter 02) | Chapter header + intro, 5× (green header bar with number/title/price + cream body with description + diamond-bulleted feature list) | `ServicesSection.tsx` + `ServicePanel.tsx` |
| Work (Chapter 03) | Chapter header + intro, grid of cards — each a browser-mockup-style frame (screenshot inside a bordered "browser" chrome) + status badge + short description | `WorkSection.tsx` + `WorkCard.tsx` (now expandable — see copy doc) |
| Pricing (Chapter 04) | Cream bg, chapter header, 4-column table (Mile/Service/Includes/From), CTA line + button | `PricingSection.tsx` |
| Contact/Footer (Chapter 05) | Green bg, badge + wordmark, tagline, contact form (name split fields, email, business name, service dropdown, message), left-side contact block, bottom copyright bar | `ContactSection.tsx` + `ContactForm.tsx` + `Footer.tsx` |

Shared/reused pieces across all of the above:
- `ShieldBadge.tsx` — the "90" shield mark, reused in nav/hero/about/footer
- `ChapterTag.tsx` — the small "CHAPTER 0X" eyebrow label
- `DashedDivider.tsx` — dashed rule, supports scroll-drawn stroke animation
- `DiamondBullet.tsx` — the ♦ bullet style used in the ticker and feature lists

```
/app
  layout.tsx
  page.tsx
  api/contact/route.ts        # Resend send handler
/components
  Nav.tsx
  Hero.tsx
  TickerStrip.tsx
  AboutSection.tsx
  ServicesSection.tsx
  ServicePanel.tsx
  WorkSection.tsx
  WorkCard.tsx                 # expandable — collapsed/expanded states
  PricingSection.tsx
  PricingTable.tsx
  ContactSection.tsx
  ContactForm.tsx
  Footer.tsx
  shared/
    ShieldBadge.tsx
    ChapterTag.tsx
    DashedDivider.tsx
    DiamondBullet.tsx
/data
  services.ts                    # typed service list (numbers, not "Mile")
  work.ts                        # portfolio entries — description, media[], link
  pricing.ts
  site.ts                        # contact info, nav labels, copy strings
/lib
  resend.ts
/styles
  globals.css                    # Tailwind base + design tokens
tailwind.config.ts               # colors, fonts, borders as design tokens
```

Note: the original mockup was generated through a third-party AI app
builder (Emergent). The breakdown above was reconstructed from the
screenshot — but the **actual export exists** and lives in the Obsidian
vault (`~/Documents/NavdeepVault/Projects/Route90_Digital/milepost-studio.preview.emergentagent.com-.../`).
When scaffolding, copy that export into `/reference` in the repo (see
CLAUDE.md and the Build Manual's Phase 0) so Claude Code can inspect the
real markup/structure directly instead of relying on this reconstructed
description. Treat it as a visual/structural reference only — the locked
naming, copy, and stack decisions in `CLAUDE.md` still win over whatever
that export contains.

## Content Data Shape (example)

```ts
// data/services.ts
export interface Service {
  number: string;        // "10" — no "MILE" prefix
  title: string;
  description: string;
  features: string[];
  priceFrom: string;
}

export const services: Service[] = [
  {
    number: "10",
    title: "Website & App Design",
    description: "Fast, responsive sites and web apps...",
    features: ["Custom design + build", "Mobile-first responsive", "Doc transactions", "Self-serve CMS"],
    priceFrom: "$1,400",
  },
  // ...
];
```

Keeping this typed means the panel components just map over the array —
adding/editing a service later is a data edit, not a layout edit.

```ts
// data/work.ts
export interface WorkItem {
  slug: string;
  title: string;
  status: "LIVE PROD" | "INTERNAL TOOL" | "COMMISSIONED";
  platform: "web" | "mobile";  // determines WorkCard frame + collapsed layout
  thumbnail: string;
  cardDescription: string;   // short — collapsed card state
  description: string;       // full — expanded state
  media: { type: "image" | "video"; src: string }[];
  link?: string;         // omit if no live link
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
      "A household expense splitting PWA with AI-powered receipt scanning. Snap a photo of any grocery receipt and Claude Haiku extracts every item automatically. Built with React, Vite, Supabase, and the Anthropic API.",
    media: [{ type: "image", src: "/work/splithouse-1.png" }],
  },
  // ...more real projects/mockups to be added as you provide assets
];
```

Array-based and unbounded on purpose — you mentioned having real mockups
and samples not yet used, so the grid and card component shouldn't assume
exactly 3 items.

## Animation Notes (Framer Motion)

- Panels: `whileInView` + `initial`/`animate` with a snap-like easing
  (short duration, minimal overshoot) — not soft fade, matches "structural"
  motion from the original prompt.
- Dashed dividers: animate `strokeDashoffset` on scroll for the "draw on"
  effect.
- Respect `prefers-reduced-motion` — disable non-essential motion via
  `useReducedMotion()` hook.

## Contact Form → Resend

- `ContactForm.tsx` validates with Zod, posts to `/api/contact`
- `api/contact/route.ts` calls Resend's send API server-side (API key in
  Vercel env vars, never client-exposed)
- Confirm on submit; basic error state if send fails

## Deployment

- Vercel, connected to the GitHub repo, auto-deploy on push to main
- Env vars (Resend API key) set in Vercel project settings, not committed

## Resolved Since First Draft

- Real pricing + service copy — drafted in `route90-service-copy-pricing.md`
- Full site copy (hero/about/work/contact/footer) — drafted in
  `route90-full-site-copy.md`, all driving-metaphor language removed
- Portfolio cards — expandable (collapsed → animated open with
  description, media, link), unbounded grid, more real assets coming
- Print pricing — flat "Starting at $40" on-site
- Domain: `route90digital.ca` (locked, pending purchase)

## Not Yet Decided

- Final asset files for the shield badge (currently only exists inside
  the mockup image, not as a clean SVG)
- Real screenshots/video for portfolio cards (user has unused assets to
  add, not yet supplied)

## Next Step

This guide + the project instructions doc together are what Claude Code
should be pointed at to scaffold the repo. Suggest starting with:
1. Scaffold Next.js + Tailwind + Framer Motion, empty sections
2. Build `ShieldBadge`, `Section`, `DashedDivider` first (everything else
   reuses these)
3. Wire one full section (Services) end-to-end before doing the rest
