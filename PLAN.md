# Route90 Site — Implementation Plan

> **For agentic workers:** Use `superpowers:subagent-driven-development` (recommended) or
> `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox
> (`- [ ]`) syntax for tracking.
>
> **Authority:** `CLAUDE.md` in this repo is the source of truth and wins over this plan
> if they ever disagree. This plan may go stale; `CLAUDE.md` may not. Where this plan and
> `CLAUDE.md` conflict, **stop and surface it** — do not silently pick one.

**Goal:** Build the single-page, scroll-driven marketing site for Route90 Digital Solutions
whose one job is to convince a small-business owner to make contact.

**Architecture:** Next.js 14+ App Router, one route (`app/page.tsx`) composing bordered,
color-blocked sections top-to-bottom. All copy/pricing lives in typed `.ts` files in `/data`
(no CMS). Motion is Framer Motion, structural and mechanical (panels *snap*, never float),
gated behind `useReducedMotion()`. Lenis provides smooth scroll, disabled under reduced motion.
The contact form is React Hook Form + Zod on the client posting to a Route Handler that sends
via Resend.

**Tech stack (locked in `CLAUDE.md`):** Next.js 14+ · TypeScript · pnpm · Tailwind CSS ·
Framer Motion · Lenis · React Hook Form + Zod · Resend · clsx + tailwind-merge · lucide-react.
**Explicitly rejected:** GSAP/ScrollTrigger, Three.js / R3F, any CMS.

---

## Verification gate (every phase must pass before it is "done")

This replaces the skill's default TDD loop, per `CLAUDE.md` workflow rules (which win over
skills). There is no unit-test framework in this project; the gate is:

```bash
pnpm tsc --noEmit && pnpm lint && pnpm build
```

Plus, for anything visual or runtime: **proof, not assertion** — a screenshot at 375px and at
desktop width, keyboard-tab pass on interactive elements, and no console errors. "The diff looks
right" is explicitly not confirmation.

Workflow rules also in force for every phase:
1. Investigate + report before fixing.
2. One topic per prompt — no mega-diffs.
3. **No auto-commit.** Leave changes in the working tree for manual review.
4. Conflicts get surfaced, not resolved silently.

---

## Blockers & prerequisites (read before starting content phases)

| # | Item | Blocks | Status |
|---|------|--------|--------|
| B1 | **`/docs` directory does not exist in the repo yet** — but all four files (`route90-BUILD-MANUAL.md`, `route90-service-copy-pricing.md`, `route90-full-site-copy.md`, `route90-build-guide.md`) **exist in the vault** at `~/Documents/NavdeepVault/Projects/Route90_Digital/`, alongside the Emergent mockup export. `CLAUDE.md` wants them living in the repo `/docs` (repo must be self-contained; vault is "not something you read directly"). | Phase 4 (data) and section phases. Not a real blocker — just a copy. | **RESOLVED PENDING COPY** — copy the four `.md`s into repo `/docs` (Phase 0). Optionally copy the mockup export into `/reference` for structural reference (visual only — does not override locked decisions). |
| B2 | Resend account + API key. | Phase 8 only. | Needed by Phase 8, not before. |
| B3 | Real shield logo SVG. | Launch (Phase 11). Placeholder ships Phase 3. | Not blocking build. |
| B4 | Portfolio screenshots/video. | Launch (Phase 11). Placeholders ship Phase 4. | Not blocking build. |
| B5 | Domain `route90digital.ca`. | Nothing — build against `*.vercel.app`. | Not blocking. |

**Scaffold (Phase 1) does not depend on any of these** and can proceed immediately on approval.

---

## Open decisions — STOP AND ASK when the phase reaches them

These are marked "undecided" in `CLAUDE.md`. Do **not** pick silently.

- **D1 — Fonts (display / body / mono).** Undecided. Phase 2 *proposes* three, owner approves,
  then the choice is written into `CLAUDE.md` as locked. Until then the scaffold ships a neutral
  system stack. **Phase 2 stops for approval before wiring any webfont.**
- **D2 — Service-badge numbering.** `CLAUDE.md` shows `10, 20, 30, 40, 50` in the Naming section
  but lists "`10–50` vs `01–05`" as still-undecided. Surface this at Phase 4 and get one answer;
  it must then be identical everywhere. Regardless of which is chosen: **plain numbers only —
  the word "MILE" appears nowhere, no driving/highway metaphor copy anywhere.**

---

## Locked design constraints (apply in every visual task)

- **Zero border radius. Anywhere.** No `rounded-*`.
- **No soft shadows.** Use hard, visible borders (≥2px) on panels instead. No `shadow-*` blur.
- Alternating **forest-green / cream** color-blocked sections down the scroll.
- **Dashed-line dividers** as deliberate section separators (may "draw on" via `strokeDashoffset`).
- **Shield/route badge** recurs as brand anchor: nav, hero, about, footer.
- Grid-based, **boxed/bordered cells** — not floating cards. On mobile they stack but keep the
  bordered/blocked feel.
- **Motion is structural:** panels *snap* into place (signage locking in), ~0.3–0.4s, minimal/no
  overshoot, `whileInView` with `once: true`.
- **`prefers-reduced-motion` respected in every animated component** via `useReducedMotion()`.
  Reduced motion = render the end state, no animation. Lenis fully disabled under reduced motion.
- **"CHAPTER 0X" eyebrow tags stay** (macro section numbering) — distinct from service badges.

Palette (exact — do not adjust):

```
forest green   #1F3A2E   primary panel color
near-black     #0E0E0E   base canvas
cream          #F0EAD6   content panels / high-contrast text areas
mustard yellow #E8A824   accent — badges, dividers, CTAs
white          #FFFFFF   sparingly — shield logo, key contrast moments
```

---

## File structure (locked folders from the task brief)

```
route90-site/
├─ app/
│  ├─ layout.tsx              # root layout, fonts (Phase 2), <LenisProvider>, metadata
│  ├─ page.tsx                # the single page — composes every section in locked order
│  ├─ globals.css             # imported once in layout; Tailwind layers + base tokens
│  └─ api/
│     └─ contact/route.ts     # POST handler → Resend (Phase 8)
├─ components/
│  ├─ Nav.tsx                 # Phase 6
│  ├─ Hero.tsx                # Phase 6
│  ├─ TickerStrip.tsx         # Phase 6
│  ├─ About.tsx               # Phase 6 (Chapter 01)
│  ├─ Services.tsx            # Phase 5 — the reference pattern, built first
│  ├─ Work.tsx                # Phase 7 (Chapter 03, expandable cards)
│  ├─ Pricing.tsx             # Phase 6 (Chapter 04)
│  ├─ Contact.tsx             # Phase 8 (Chapter 05, form) + footer
│  └─ shared/
│     ├─ ShieldBadge.tsx      # Phase 3 — placeholder SVG, swappable path
│     ├─ Section.tsx          # Phase 3 — color-blocked bordered section wrapper
│     ├─ ChapterTag.tsx       # Phase 3 — "CHAPTER 0X" eyebrow
│     ├─ DashedDivider.tsx    # Phase 3 — draw-on dashed rule
│     ├─ SnapIn.tsx           # Phase 3 — Framer motion wrapper (structural snap + RM guard)
│     └─ LenisProvider.tsx    # Phase 3 — smooth scroll, disabled under reduced motion
├─ data/
│  ├─ site.ts                 # Phase 4 — hero/about/work/contact/footer copy (from docs)
│  ├─ services.ts             # Phase 4 — Service[] (from docs)
│  ├─ pricing.ts              # Phase 4 — pricing (from docs)
│  └─ work.ts                 # Phase 4 — WorkItem[] (unbounded)
├─ lib/
│  ├─ cn.ts                   # Phase 1 — clsx + tailwind-merge helper
│  ├─ motion.ts               # Phase 3 — shared variants/transitions
│  └─ contact-schema.ts       # Phase 8 — Zod schema shared by form + route
├─ styles/                    # design-token partials if globals.css grows (Phase 2)
├─ public/
│  └─ work/                   # Phase 4 — placeholder images
├─ tailwind.config.ts         # Phase 1 (colors) → Phase 2 (fonts, once approved)
└─ (config: tsconfig, next.config, postcss, .eslintrc, .env.local.example)
```

`/data` interfaces (locked in `CLAUDE.md`):

```ts
export interface Service {
  number: string;        // "10" — plain number, NEVER "MILE 10"
  title: string;
  description: string;
  features: string[];
  priceFrom: string;
}

export interface WorkItem {
  slug: string;
  title: string;
  status: "LIVE PROD" | "INTERNAL TOOL" | "COMMISSIONED";
  thumbnail: string;
  cardDescription: string;   // short — collapsed card state
  description: string;       // full — expanded state
  media: { type: "image" | "video"; src: string }[];
  link?: string;
}
```
`work.ts` must be **unbounded** — the grid renders any N, not a fixed 3.

Page order (locked):
```
Nav → Hero → TickerStrip → About (Ch 01) → Services (Ch 02) →
Work (Ch 03) → Pricing (Ch 04) → Contact/Footer (Ch 05)
```

---

## Phase 1 — Scaffold (THIS phase; Part 2 of the request)

**Goal:** A clean, empty Next.js App Router project that boots with the full toolchain
installed and the palette wired into Tailwind — **no sections, no components built yet.**

**Files:** created by `create-next-app` + the edits below.

- [ ] **Step 1: Scaffold Next.js into the existing repo.** The repo already contains
  `CLAUDE.md`, `TODO.md`, `KNOWN-ISSUES.md`, `PLAN.md`, and `.git` — scaffold in place, do not
  wipe them.

```bash
cd /home/noisynav/Documents/code/Projects/route90-site
pnpm dlx create-next-app@latest . \
  --typescript --app --tailwind --eslint \
  --src-dir=false --import-alias "@/*" --use-pnpm --no-turbopack
```
If the CLI refuses because the directory is non-empty, scaffold into a temp dir and copy
`app/`, config files, and `package.json` in without overwriting the four existing docs.

- [ ] **Step 2: Install runtime + tooling deps.**

```bash
pnpm add framer-motion @studio-freight/lenis react-hook-form zod \
  @hookform/resolvers resend clsx tailwind-merge lucide-react
```
(`@studio-freight/lenis` is the current published Lenis package; if resolution fails, fall back
to `lenis`. Resend and Lenis are **installed but NOT wired up** this phase, per the brief.)

- [ ] **Step 3: Confirm Node/pnpm versions.** Node 20.x, pnpm present. Record versions in the
  Phase Log. Add `"engines": { "node": ">=20 <21" }` to `package.json`.

- [ ] **Step 4: Wire the palette via a Tailwind v4 `@theme` block in `app/globals.css`.**
  Tailwind v4 is CSS-first — there is **no `tailwind.config.ts`**. Colors and the zero-radius
  override are declared as CSS custom properties inside `@theme`; utilities like `bg-forest`,
  `text-mustard`, `border-cream` generate automatically from them (no `theme.extend.colors`
  equivalent needed). Colors only — **no fonts yet** (D1 undecided). No `content` globs needed —
  v4 auto-detects sources.

```css
@import "tailwindcss";

@theme {
  --color-forest: #1F3A2E;
  --color-ink: #0E0E0E;
  --color-cream: #F0EAD6;
  --color-mustard: #E8A824;

  /* Zero border radius — structural, not per-utility */
  --radius-xs: 0px;
  --radius-sm: 0px;
  --radius-md: 0px;
  --radius-lg: 0px;
  --radius-xl: 0px;
  --radius-2xl: 0px;
  --radius-3xl: 0px;
}
```
Forcing every `--radius-*` token to `0px` makes the "zero radius" rule structural — a stray
`rounded-lg` can't reintroduce corners.

- [ ] **Step 5: Create `lib/cn.ts`.**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 6: Create the locked empty folders** so structure is real from day one:
  `components/`, `components/shared/`, `data/`, `lib/`, `styles/`, `public/work/`. Add a
  `.gitkeep` to any that would otherwise be empty.

- [ ] **Step 7: Neutral base in `app/globals.css` and `app/page.tsx`.** Set body background to
  `#0E0E0E` (ink) and a system font stack as the temporary default (fonts land Phase 2). Replace
  the `create-next-app` demo `page.tsx` with a single placeholder heading — **no sections.**

- [ ] **Step 8: Add `.env.local.example`** (not `.env.local`) documenting the Phase-8 vars, so
  no secret is committed:

```
# Resend — wired up in Phase 8
RESEND_API_KEY=
CONTACT_TO_EMAIL=navi904133@gmail.com   # gmail until domain lands (see KNOWN-ISSUES)
CONTACT_FROM_EMAIL=onboarding@resend.dev
```

- [ ] **Step 9: Verification gate.**

```bash
pnpm tsc --noEmit && pnpm lint && pnpm build
pnpm dev   # confirm boots clean at http://localhost:3000, no console errors
```
Expected: dev server boots, placeholder page renders on ink background, zero errors/warnings.

- [ ] **Step 10: Report — do NOT commit.** Leave everything in the working tree. Tick Phase 1
  in `TODO.md`, append a Phase Log entry, and hand back for review.

---

## Phase 2 — Design tokens + typography  *(skills: ui-ux-pro-max, frontend-design)*

**Goal:** Lock the three font roles and turn the palette into a small, named token set.

- [ ] **Step 1: Propose D1 — three fonts** (display / body / mono) with rationale that fits the
  road-sign visual language + plain direct writing. **STOP and get owner approval.** Do not wire
  a webfont before approval.
- [ ] **Step 2:** On approval, load via `next/font` (self-hosted, zero layout shift). Map to
  `--font-display`, `--font-body`, `--font-mono`; expose as `fontFamily` in Tailwind.
- [ ] **Step 3:** Add semantic color tokens if useful (e.g. `panel`, `accent`) without changing
  the five locked hexes. Any type scale / spacing tokens go here.
- [ ] **Step 4:** Update `CLAUDE.md` "Currently undecided" → move the font decision into a locked
  section (owner-approved change).
- [ ] **Step 5: Gate + report.** `tsc && lint && build`; screenshot of a type-specimen block at
  375px and desktop. No commit.

---

## Phase 3 — Shared primitives  *(skill: frontend-design)*

**Goal:** Build the reusable bordered/motion vocabulary every section depends on. Structural
motion + reduced-motion guards live here so sections inherit them for free.

- [ ] **Step 1: `lib/motion.ts`** — shared transition + variants. Snap feel: short duration,
  minimal overshoot.

```ts
import type { Transition, Variants } from "framer-motion";
export const SNAP: Transition = { duration: 0.35, ease: [0.2, 0.9, 0.3, 1] };
export const snapIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: SNAP },
};
```

- [ ] **Step 2: `components/shared/SnapIn.tsx`** — `whileInView` + `once: true` wrapper that
  respects reduced motion (renders end state, no animation).

```tsx
"use client";
import { motion, useReducedMotion } from "framer-motion";
import { snapIn } from "@/lib/motion";

export function SnapIn({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={snapIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: `components/shared/Section.tsx`** — color-blocked, hard-bordered section wrapper.
  Props: `tone: "forest" | "cream"`, `id`, `children`. Enforces ≥2px border, zero radius, and
  the alternating background. No shadow.
- [ ] **Step 4: `components/shared/ChapterTag.tsx`** — renders `CHAPTER 0X` eyebrow (kept per
  naming rules). Distinct component from any service-badge number.
- [ ] **Step 5: `components/shared/DashedDivider.tsx`** — SVG dashed rule that draws on via
  `strokeDashoffset` on scroll, and renders fully drawn under reduced motion.
- [ ] **Step 6: `components/shared/ShieldBadge.tsx`** — placeholder shield SVG. Isolate the SVG
  path so the real asset is a one-line swap (log to `KNOWN-ISSUES.md` as placeholder). Accepts
  `size`/`className`.
- [ ] **Step 7: `components/shared/LenisProvider.tsx`** — `"use client"`, initializes Lenis,
  RAF loop, cleanup on unmount, and **short-circuits entirely under `useReducedMotion()`**
  (never instantiates Lenis). Then mount `<LenisProvider>` in `app/layout.tsx`.
- [ ] **Step 8: Gate + report.** Build a throwaway demo page mounting each primitive; screenshot
  375px + desktop; keyboard-tab check; toggle OS reduced-motion and confirm no animation + Lenis
  off. Remove the demo page. No commit.

---

## Phase 4 — Data layer  *(skill: using-superpowers)*  ⚠️ BLOCKED BY B1

**Goal:** Populate `/data` from the `/docs` source-of-truth files — **verbatim, no invention.**

- [ ] **Step 0: PREREQUISITE CHECK.** Confirm `/docs` exists with the four files named in
  `CLAUDE.md`. **If missing → STOP, report B1, do not proceed.** Copy is forbidden to invent.
- [ ] **Step 1: Resolve D2** (service-badge numbering `10–50` vs `01–05`). Get one answer; apply
  consistently. Plain numbers only.
- [ ] **Step 2: `data/services.ts`** — `Service[]` typed exactly per the locked interface, copy
  and `priceFrom` pulled from `docs/route90-service-copy-pricing.md`.
- [ ] **Step 3: `data/pricing.ts`** — from the same doc.
- [ ] **Step 4: `data/site.ts`** — hero/about/work/contact/footer copy from
  `docs/route90-full-site-copy.md`.
- [ ] **Step 5: `data/work.ts`** — `WorkItem[]`, **unbounded** array; placeholder images under
  `/public/work/` (log placeholders to `KNOWN-ISSUES.md`). Placeholder `media`/`thumbnail` paths.
- [ ] **Step 6: Gate + report.** `tsc && lint && build` (types must hold against the interfaces).
  No visual output this phase. No commit.

---

## Phase 5 — Services section (the reference pattern)  *(skill: frontend-design)*

**Goal:** Build `components/Services.tsx` (Chapter 02) as the canonical grid-of-bordered-cells +
`SnapIn` + `DashedDivider` pattern every later section copies. Consumes `data/services.ts`.

- [ ] **Step 1:** Bordered grid of service cells (plain-number badge, title, description,
  features, `priceFrom`). Zero radius, ≥2px borders, no shadow, stacks cleanly at 375px keeping
  the boxed feel.
- [ ] **Step 2:** Wrap cells in `SnapIn`; add a leading `ChapterTag` "CHAPTER 02" and trailing
  `DashedDivider`.
- [ ] **Step 3:** Mount in `app/page.tsx` in the correct scroll position.
- [ ] **Step 4: Gate + report.** Screenshot 375px + desktop; reduced-motion pass; keyboard pass.
  This pattern is the template — get it explicitly approved before Phase 6. No commit.

---

## Phase 6 — Remaining sections  *(skill: frontend-design)*

**Goal:** Nav, Hero, TickerStrip, About (Ch 01), Pricing (Ch 04) — following the approved Phase-5
pattern. All copy from `data/site.ts` / `data/pricing.ts` (no invention).

- [ ] **Step 1: `Nav.tsx`** — shield badge + section anchors; sticky, hard-bordered, zero radius.
- [ ] **Step 2: `Hero.tsx`** — headline (plain, direct — no highway puns), shield anchor, primary
  CTA to contact.
- [ ] **Step 3: `TickerStrip.tsx`** — marquee/ticker strip; respects reduced motion (static under
  RM).
- [ ] **Step 4: `About.tsx`** (Chapter 01) and **`Pricing.tsx`** (Chapter 04).
- [ ] **Step 5:** Assemble full page order in `app/page.tsx`; alternate forest/cream tones down
  the scroll; dashed dividers between sections.
- [ ] **Step 6: Gate + report.** Full-page screenshots 375px + desktop; RM + keyboard pass. No commit.

---

## Phase 7 — Work section (expandable cards)  *(skill: frontend-design)*

**Goal:** `components/Work.tsx` (Chapter 03) rendering `data/work.ts` as an **unbounded** grid of
bordered cards that expand to show `media` + description + optional link.

- [ ] **Step 1:** Grid renders any N items (not fixed 3). Card shows thumbnail, title, `status`
  badge (`LIVE PROD | INTERNAL TOOL | COMMISSIONED`).
- [ ] **Step 2:** Expand/collapse interaction — snap motion, not float. Reduced motion = instant
  toggle.
- [ ] **Step 3: Focus management** — expanded card must trap/manage focus and be Escape-closable
  and fully keyboard-operable (Watch-list item in `KNOWN-ISSUES.md`).
- [ ] **Step 4: Gate + report.** Screenshots collapsed + expanded, 375px + desktop; keyboard +
  focus-trap proof; RM pass. No commit.

---

## Phase 8 — Contact form + Resend  *(skill: using-superpowers)*  ⚠️ NEEDS B2

**Goal:** `Contact.tsx` (Chapter 05) + footer, RHF+Zod validation, posting to
`app/api/contact/route.ts` which sends via Resend to `navi904133@gmail.com` (gmail until domain).

- [ ] **Step 1: `lib/contact-schema.ts`** — one Zod schema shared by client and server (name,
  email, message, honeypot). Server re-validates; never trusts the client.
- [ ] **Step 2: `Contact.tsx`** — RHF + `zodResolver`, inline errors surfaced to UI (never
  swallowed), success/failure states. Footer with phone `647-807-9190`, email
  `hello@route90digital.ca`, Winnipeg MB · Canada, Mon–Fri 9–5 CST, shield badge.
- [ ] **Step 3: `app/api/contact/route.ts`** — POST handler: parse → Zod validate → Resend send
  to `process.env.CONTACT_TO_EMAIL`. Return typed JSON; handle Resend errors (surface, don't
  swallow). Read key from env only.
- [ ] **Step 4:** Confirm `.env.local` has real `RESEND_API_KEY` locally (never committed).
- [ ] **Step 5: Gate + report.** Real submit → email arrives at gmail (proof: screenshot of
  received mail). Validation-error states screenshotted. RM + keyboard pass. No commit.

---

## Phase 9 — Audit + verification  *(skills: web-design-guidelines, vercel-react-best-practices)*

**Goal:** Full-site correctness, accessibility, performance, and bundle pass before deploy.

- [ ] **Step 1:** Run `web-design-guidelines` review across all sections; fix findings.
- [ ] **Step 2: Contrast checks** (from `KNOWN-ISSUES.md` watch list): mustard-on-cream (flag any
  small text using it), cream-on-forest. Verify, don't assume.
- [ ] **Step 3: Reduced-motion audit** — every animated component renders end state; Lenis off.
- [ ] **Step 4: Bundle check** — Framer Motion + Lenis. **If Lenis isn't earning its weight, drop
  it** (watch-list decision). Apply `vercel-react-best-practices` (client components minimal,
  no barrel-import bloat, dynamic-import anything heavy).
- [ ] **Step 5:** Keyboard/focus pass site-wide, especially Work cards.
- [ ] **Step 6: Full gate + report.** `tsc && lint && build`; Lighthouse; screenshots. No commit.

---

## Phase 10 — Deploy

- [ ] **Step 1:** Push repo to GitHub; import to Vercel; set env vars (`RESEND_API_KEY`,
  `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`) in Vercel project settings.
- [ ] **Step 2:** Deploy to a `*.vercel.app` subdomain (domain B5 not yet purchased).
- [ ] **Step 3:** Smoke-test production: page renders, contact form sends, no console errors.

---

## Phase 11 — Pre-launch punch list (manual)

Launch-blocking (from `TODO.md` / `KNOWN-ISSUES.md`): real shield logo SVG, real portfolio
screenshots/video, favicon + OG image, basic SEO metadata. Non-blocking: domain connect,
`hello@route90digital.ca` mailbox, extra portfolio pieces.

---

## Self-review (against `CLAUDE.md`)

- **Stack** — every locked lib mapped to a phase; rejected libs (GSAP, R3F, CMS) never appear. ✅
- **Palette** — exact five hexes in Phase 1 Tailwind config; no adjustments. ✅
- **Visual rules** — zero radius forced at token level (Phase 1); hard borders / no shadow /
  alternating blocks / dashed dividers / shield / boxed cells covered in Phases 3, 5, 6. ✅
- **Motion rules** — structural snap, `once:true`, reduced-motion guard, Lenis-off-under-RM all
  centralized in Phase 3 primitives and inherited. ✅
- **Naming** — CHAPTER 0X kept (ChapterTag); service badges plain numbers; no "MILE"; no
  highway/trucking metaphor. Enforced in Phases 3–6 and called out in D2. ✅
- **Content** — all copy sourced from `/docs`, none invented; B1 gates it; interfaces reproduced
  verbatim; `work.ts` unbounded. ✅
- **Contact** — phone/email/location/hours + gmail send-to placeholder in Phase 8. ✅
- **Workflow** — no auto-commit, one-topic phases, verification gate, conflict-surfacing all
  encoded. ✅
- **Undecided** — fonts (D1) and badge numbering (D2) have explicit STOP gates, not silent picks. ✅
- **Placeholders** — ShieldBadge, `/public/work/*`, send-to address all tracked to KNOWN-ISSUES /
  Phase 11. ✅

**Open flag surfaced to owner:** B1 — the four planning docs exist in the vault
(`~/Documents/NavdeepVault/Projects/Route90_Digital/`) but not yet in the repo. Phase 1
(scaffold) can start immediately regardless; Phase 4 onward just needs those four `.md`s copied
into repo `/docs` first (Phase 0 work).
