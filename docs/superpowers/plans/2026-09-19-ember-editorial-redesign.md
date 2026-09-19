# Ember Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Route90’s road-sign visual system with the approved Ember Editorial direction while preserving all typed content, work routes, contact behavior, accessibility, and production readiness.

**Architecture:** Keep the existing Next.js App Router and typed data layer. Replace visual primitives incrementally, isolate client-side motion to small boundaries, keep the hero atmosphere CSS-first, add a reviewed local service-art series, and restyle the homepage and case-study routes against one shared token system.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lenis, React Hook Form, Zod, Resend, `next/image`, Fraunces/Public Sans/Martian Mono.

**Design source:** `docs/superpowers/specs/2026-09-19-ember-editorial-redesign.md`

---

## Execution rules

- Use the installed `frontend-design`, `redesign-existing-projects`, and `high-end-visual-design` skills during visual implementation.
- Use `imagegen` only for the five approved abstract service visuals; do not generate people, offices, fake UI screenshots, or copy.
- Use `vercel-react-best-practices` after editing React components and `web-design-guidelines` for the final accessibility audit.
- Work from the existing `ui-redesign` branch. The stable rollback is commit/tag `7045ed7` / `pre-ui-redesign`.
- Do not include `.superpowers/brainstorm/` in commits.
- Keep each task reviewable and run the verification gate before every checkpoint commit.
- Never change production copy or prices as part of a visual task.

## Target file map

### Create

- `components/shared/EmberBackdrop.tsx` — CSS-first atmospheric background.
- `components/shared/Reveal.tsx` — one reduced-motion-safe entrance primitive.
- `components/shared/ArrowLink.tsx` — shared CTA/link treatment.
- `components/ServiceVisual.tsx` — responsive service art frame.
- `components/MobileNav.tsx` — accessible mobile menu.
- `data/service-visuals.ts` — mapping from service number to reviewed local artwork.
- `public/services/service-01.avif` through `service-05.avif` — reviewed service art.
- `public/brand/route90-og.png` — Ember social card.

### Modify

- `AGENTS.md` — replace old visual locks with approved Ember rules; preserve stack/content/work/contact decisions.
- `.gitignore` — ignore `.superpowers/brainstorm/` only.
- `app/globals.css` — palette, radius, typography, selection/focus, texture, global rhythm.
- `app/layout.tsx` — Fraunces font and complete metadata.
- `app/page.tsx` — retain content order, remove stale comments.
- `lib/motion.ts` — new motion constants.
- `components/Nav.tsx`, `Hero.tsx`, `TickerStrip.tsx`, `About.tsx`.
- `components/ServicesSection.tsx`, `ServicePanel.tsx`.
- `components/WorkSection.tsx`, `WorkGallery.tsx`, `WorkCard.tsx`.
- `components/PricingSection.tsx`, `PricingTable.tsx`.
- `components/ContactSection.tsx`, `ContactForm.tsx`, `Footer.tsx`.
- `components/shared/Section.tsx`, `LenisProvider.tsx`.
- `app/work/[slug]/page.tsx` — restyle static case studies.
- `TODO.md`, `KNOWN-ISSUES.md` — record resolved/still-blocked launch items.

### Retire from active use

- `components/shared/ShieldBadge.tsx`
- `components/shared/ChapterTag.tsx`
- `components/shared/DashedDivider.tsx`
- `components/shared/DiamondBullet.tsx`
- `components/shared/GridTexture.tsx`
- `components/shared/SnapIn.tsx`

Do not delete retired files until `rg` confirms there are no imports. Removing them is the final cleanup step, not the first.

---

### Task 1: Establish the redesign authority and clean checkpoint

**Files:**
- Modify: `AGENTS.md`
- Modify: `.gitignore`
- Reference: `docs/superpowers/specs/2026-09-19-ember-editorial-redesign.md`

- [ ] **Step 1: Verify the rollback point and working tree**

Run:

```bash
git show --no-patch --oneline pre-ui-redesign
git status --short --branch
git diff -- components/Hero.tsx
```

Expected: tag `pre-ui-redesign` resolves to `7045ed7`; the current hero exploration remains visible as an uncommitted diff.

- [ ] **Step 2: Keep visual brainstorm files out of source control**

Append this exact entry to `.gitignore`:

```gitignore
# Local visual-companion prototypes
.superpowers/brainstorm/
```

- [ ] **Step 3: Update `AGENTS.md` visual authority**

Replace the old palette/zero-radius/road-sign/motion sections with the following decisions:

```markdown
## Visual system — Ember Editorial (locked 2026-09-19)

- Primary canvas `#11100F`; raised dark surface `#1B1714`.
- Primary light/text `#F3EBDD`; secondary paper `#E7DCCB`.
- Copper `#D8683E`, ember `#F39A68`, oxide `#713226` are atmospheric/decorative.
- Signal lime `#C8FF56` is reserved for CTA, focus, and selected states.
- Fraunces is the display face; Public Sans remains body; Martian Mono remains metadata.
- Large containers may use 20–32px radii; controls use 10–16px; pills only for actions/state.
- Replace the shield/grid/dashed/diamond road-sign language with ember light, editorial type,
  warm paper surfaces, and low-contrast hairlines.
- Motion is cinematic but restrained: masked reveals, clipped media entrances, and limited
  hero parallax. No scroll-jacking. Reduced motion always renders the end state; Lenis stays off.
- Service artwork is an abstract-material series with no fake people, offices, hands, or fake UI.
```

Keep the existing stack, content, page goal, work-route, data, contact, and workflow decisions.

- [ ] **Step 4: Remove contradictory visual requirements only**

Search:

```bash
rg -n "zero border radius|road-sign|dashed|ShieldBadge|grid-pattern|forest green|mustard|mechanical" AGENTS.md
```

Expected: no old statement remains that would prohibit the approved redesign. Historical notes may remain only when clearly labelled superseded.

- [ ] **Step 5: Run documentation and source checks**

```bash
git diff --check
rg -n "MILE|Behind the Wheel|Let's Roll Out|Start the Trip" app components data
```

Expected: only prohibitive comments or factual project copy; no new marketing metaphor.

- [ ] **Step 6: Checkpoint commit**

```bash
git add .gitignore AGENTS.md docs/superpowers/specs/2026-09-19-ember-editorial-redesign.md docs/superpowers/plans/2026-09-19-ember-editorial-redesign.md
git commit -m "docs: lock ember editorial redesign plan"
```

---

### Task 2: Replace tokens and typography

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Modify: `lib/motion.ts`

- [ ] **Step 1: Replace Tailwind v4 theme tokens**

Use this token core in `app/globals.css`:

```css
@theme {
  --color-ember-ink: #11100f;
  --color-carbon: #1b1714;
  --color-warm-cream: #f3ebdd;
  --color-paper: #e7dccb;
  --color-copper: #d8683e;
  --color-ember: #f39a68;
  --color-oxide: #713226;
  --color-signal: #c8ff56;
  --color-smoke: #a69b8e;

  --radius-sm: 0.625rem;
  --radius-md: 0.875rem;
  --radius-lg: 1.25rem;
  --radius-xl: 1.75rem;
  --radius-2xl: 2rem;

  --font-display: var(--font-fraunces), Georgia, serif;
  --font-body: var(--font-public-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-martian-mono), ui-monospace, monospace;
}
```

- [ ] **Step 2: Add global base, focus, selection, and reduced-motion styles**

```css
html { background: var(--color-ember-ink); scroll-padding-top: 6rem; }
body {
  background: var(--color-ember-ink);
  color: var(--color-warm-cream);
  font-family: var(--font-body);
}
::selection { background: var(--color-signal); color: var(--color-ember-ink); }
:focus-visible {
  outline: 2px solid var(--color-signal);
  outline-offset: 4px;
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

- [ ] **Step 3: Replace Anton with Fraunces**

In `app/layout.tsx`, import and configure:

```tsx
import { Fraunces, Public_Sans, Martian_Mono } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});
```

Replace `anton.variable` with `fraunces.variable` on `<html>`.

- [ ] **Step 4: Define new shared motion constants**

Replace the signage `SNAP` language in `lib/motion.ts` with:

```ts
import type { Transition, Variants } from "framer-motion";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const REVEAL: Transition = { duration: 0.72, ease: EASE_OUT };

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: REVEAL },
};
```

- [ ] **Step 5: Verify tokens and fonts**

```bash
pnpm tsc --noEmit
pnpm lint
pnpm build
```

Expected: all pass; build output includes `/`, four `/work/[slug]` pages, and `/api/contact`.

- [ ] **Step 6: Commit**

```bash
git add app/globals.css app/layout.tsx lib/motion.ts
git commit -m "design: establish ember editorial tokens"
```

---

### Task 3: Build the reusable Ember primitives

**Files:**
- Create: `components/shared/EmberBackdrop.tsx`
- Create: `components/shared/Reveal.tsx`
- Create: `components/shared/ArrowLink.tsx`
- Modify: `components/shared/Section.tsx`

- [ ] **Step 1: Create `EmberBackdrop`**

Implement a server component with decorative layers only:

```tsx
import { cn } from "@/lib/cn";

export function EmberBackdrop({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <div className="absolute right-[-18%] top-[8%] aspect-square w-[min(68vw,760px)] rounded-full bg-[radial-gradient(circle_at_32%_28%,#F39A68_0%,#D8683E_22%,#713226_48%,transparent_70%)] opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_34%,rgb(216_104_62/0.24)_0%,transparent_52%)]" />
      <div className="absolute inset-0 opacity-[0.035] [background-image:url('/brand/noise.svg')]" />
    </div>
  );
}
```

Create a compact monochrome `public/brand/noise.svg`; keep it under 4 KB.

- [ ] **Step 2: Create the reduced-motion-safe `Reveal` boundary**

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { revealUp } from "@/lib/motion";

export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={revealUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-8% 0px" }}>
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Create `ArrowLink`**

Support `href`, children, and light/dark variants. Use a signal-lime primary variant and a quiet text variant. Include `active:scale-[0.98]`, visible focus, and an internally animated arrow container.

- [ ] **Step 4: Simplify `Section`**

Replace `forest | cream | ink` with `dark | carbon | paper`. Give all sections a shared `max-w-[1440px]` content width and asymmetric vertical spacing (`pt-24 pb-28`, increasing on desktop).

- [ ] **Step 5: Search for old primitives before migration**

```bash
rg -n "SnapIn|DashedDivider|DiamondBullet|GridTexture|ShieldBadge|tone=\"forest\"|tone=\"cream\"|tone=\"ink\"" components app
```

Record the list in the task notes. Do not delete anything yet.

- [ ] **Step 6: Verify and commit**

```bash
pnpm tsc --noEmit && pnpm lint && pnpm build
git add components/shared public/brand/noise.svg
git commit -m "feat: add ember layout primitives"
```

---

### Task 4: Produce and approve the service-art series

**Files:**
- Create: `data/service-visuals.ts`
- Create: `public/services/service-01.avif`
- Create: `public/services/service-02.avif`
- Create: `public/services/service-03.avif`
- Create: `public/services/service-04.avif`
- Create: `public/services/service-05.avif`
- Create: `components/ServiceVisual.tsx`

- [ ] **Step 1: Generate one contact sheet before individual assets**

Use the `imagegen` skill with this shared art direction:

```text
Create a five-panel editorial still-life contact sheet for a small independent digital studio.
Dark warm-brown studio, copper and rust directional light, cream materials, one restrained
acid-lime detail. Macro product photography and abstract material studies, not icons.
Panels: luminous glass interface slab; folded print paper with registration marks; optical
prism/lens and cropped frame; layered signal bands; stacked mixed-material tiles.
No people, hands, faces, offices, text, logos, floating app screens, neon cyberpunk, or glossy
generic 3D icons. Consistent camera, lighting, grain, and art direction across all five panels.
```

Review the contact sheet at desktop and phone size. Reject it if any panel looks like stock imagery or generic AI product art.

- [ ] **Step 2: Generate five individual landscape assets**

Use the accepted contact sheet as the visual reference. Generate each at 1600×1200 or larger, with the subject biased away from the text-safe side. Keep identical light direction and material treatment.

- [ ] **Step 3: Convert and optimize**

Use the available image tooling to create AVIF outputs. Target each asset below 250 KB without visible banding. Do not upscale a small result.

- [ ] **Step 4: Create the visual mapping**

```ts
export const serviceVisuals: Record<string, { src: string; alt: string }> = {
  "01": { src: "/services/service-01.avif", alt: "Abstract glass interface slab in copper light" },
  "02": { src: "/services/service-02.avif", alt: "Folded paper and print registration details" },
  "03": { src: "/services/service-03.avif", alt: "Optical prism and framed light study" },
  "04": { src: "/services/service-04.avif", alt: "Layered signal bands in warm studio light" },
  "05": { src: "/services/service-05.avif", alt: "Stacked mixed-material tiles" },
};
```

- [ ] **Step 5: Implement `ServiceVisual` with `next/image`**

Use an aspect ratio of `4 / 3`, a `24px` outer radius, warm hairline, restrained inset highlight, and exact `sizes` values for mobile and desktop. No blur on the scrolling image container.

- [ ] **Step 6: Verify asset quality and commit**

```bash
du -h public/services/*
pnpm tsc --noEmit && pnpm lint && pnpm build
git add public/services data/service-visuals.ts components/ServiceVisual.tsx
git commit -m "feat: add ember service artwork"
```

---

### Task 5: Rebuild navigation and hero

**Files:**
- Create: `components/MobileNav.tsx`
- Modify: `components/Nav.tsx`
- Modify: `components/Hero.tsx`
- Modify: `components/TickerStrip.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Rebuild desktop navigation as a detached island**

Use a semantic `<nav aria-label="Primary">`, the text mark `R90 / DIGITAL`, existing anchors from `site.nav.links`, and the existing CTA. Keep the navigation server-rendered; only the mobile menu boundary is client-side.

- [ ] **Step 2: Implement accessible mobile navigation**

Requirements:

- menu button has `aria-expanded` and `aria-controls`;
- Escape closes the panel;
- focus moves into the open panel and returns to the button;
- background scrolling is disabled while open;
- every link closes the panel;
- reduced motion removes stagger/transform effects.

- [ ] **Step 3: Rebuild the hero around the ember lens**

Keep exact `site.hero` content. Use a two-column desktop composition and a single-column mobile composition. Use `EmberBackdrop` for atmosphere and a small client component only for the lens’s scroll-linked transform. Cap movement to `24px` translation and `1.03` scale.

- [ ] **Step 4: Replace ticker marquee with a static capability rail**

Render one copy of the existing category labels in a wrapping rail. Do not auto-scroll. Use separators and spacing rather than repeated content.

- [ ] **Step 5: Verify hero behavior**

Run:

```bash
pnpm dev
```

Check at 375, 768, 1440, and 1920 pixels:

- no clipped wordmark;
- no horizontal overflow;
- nav remains reachable at 200% zoom;
- hero LCP is text/CSS, not a large bitmap;
- reduced motion has no parallax or reveal delay;
- every link receives a visible focus ring.

- [ ] **Step 6: Gate and commit**

```bash
pnpm tsc --noEmit && pnpm lint && pnpm build
git add components/Nav.tsx components/MobileNav.tsx components/Hero.tsx components/TickerStrip.tsx app/page.tsx
git commit -m "feat: rebuild ember navigation and hero"
```

---

### Task 6: Redesign About and Services as the reference pattern

**Files:**
- Modify: `components/About.tsx`
- Modify: `components/ServicesSection.tsx`
- Modify: `components/ServicePanel.tsx`

- [ ] **Step 1: Build the cream editorial About spread**

Use existing About headline, pull quote, body, and tags. Put the pull quote in the dominant left column and body/tags in the right column. Add no new marketing claims.

- [ ] **Step 2: Rebuild Services as alternating chapters**

For each item in `services`, render:

- mono number;
- title;
- exact description;
- feature list;
- `priceFrom`;
- mapped `ServiceVisual`.

Alternate media placement using the mapped index, not hard-coded service numbers. Mobile always renders number/title/copy before image.

- [ ] **Step 3: Add restrained section motion**

Wrap only the service text block and image frame in `Reveal`; do not make every feature bullet animate independently. Use one clipped image entrance per service.

- [ ] **Step 4: Prove the reference pattern visually**

Capture screenshots at 375px and 1440px for Hero → About → first two services. Verify:

- body lines remain under roughly 68 characters;
- image/text order is logical on mobile;
- signal lime appears only on actions/focus;
- copper is not used for small body text;
- no service row resembles a generic equal-height card grid.

- [ ] **Step 5: Gate and commit**

```bash
pnpm tsc --noEmit && pnpm lint && pnpm build
git add components/About.tsx components/ServicesSection.tsx components/ServicePanel.tsx
git commit -m "feat: redesign about and services"
```

Stop for owner review here during execution. This is the design-quality gate before propagating the system to the remainder of the site.

---

### Task 7: Redesign Work and case-study pages

**Files:**
- Modify: `components/WorkSection.tsx`
- Modify: `components/WorkGallery.tsx`
- Modify: `components/WorkCard.tsx`
- Modify: `app/work/[slug]/page.tsx`

- [ ] **Step 1: Replace the equal horizontal card rail with an asymmetric work grid**

Use the first work item as a large feature and render remaining items in a responsive two-column grid. Preserve unbounded mapping: do not special-case four items beyond choosing `index === 0` for the featured span.

- [ ] **Step 2: Preserve platform-specific media treatment**

Mobile projects retain a device frame; web projects retain a restrained browser frame. Remove road-sign diamonds and forest title bars. Use warm hairlines, carbon surfaces, and copper hover wash.

- [ ] **Step 3: Preserve link and focus semantics**

Each entire card stays a `Link` to `/work/[slug]`, with a clear accessible name and visible focus. No modal or in-place expansion is reintroduced.

- [ ] **Step 4: Restyle case-study routes**

Retain `generateStaticParams`, `dynamicParams = false`, metadata, full description, additional media, project link, and Back to Work navigation. Apply the Ember hero, paper reading section, and shared footer.

- [ ] **Step 5: Verify all case-study routes**

```bash
pnpm build
```

Expected static routes:

```text
/work/splithouse
/work/route90-invoicer
/work/borderlog
/work/route90-trucking
```

Open each route and verify image aspect ratio, Back to Work behavior, and external-link focus style.

- [ ] **Step 6: Gate and commit**

```bash
pnpm tsc --noEmit && pnpm lint && pnpm build
git add components/WorkSection.tsx components/WorkGallery.tsx components/WorkCard.tsx app/work/'[slug]'/page.tsx
git commit -m "feat: redesign work and case studies"
```

---

### Task 8: Redesign Pricing, Contact, and Footer

**Files:**
- Modify: `components/PricingSection.tsx`
- Modify: `components/PricingTable.tsx`
- Modify: `components/ContactSection.tsx`
- Modify: `components/ContactForm.tsx`
- Modify: `components/Footer.tsx`

- [ ] **Step 1: Build the responsive pricing ledger**

Desktop row columns: number, service/tier, included text, price. Mobile row: number/service, included text, price. Preserve all values from `data/pricing.ts`.

- [ ] **Step 2: Restyle Contact without changing behavior**

Keep React Hook Form, the shared Zod resolver, honeypot, field names, fetch request, server errors, success focus transfer, loading state, and submit copy. Change only layout and classes.

- [ ] **Step 3: Add contact atmosphere**

Use a wider, lower-opacity EmberBackdrop behind the heading. Do not put a large blur behind form inputs. Inputs use visible labels, warm hairlines, and signal-lime focus.

- [ ] **Step 4: Simplify Footer**

Render email, phone, location, hours, copyright, and `builtIn` with no shield. Keep phone/email as real links.

- [ ] **Step 5: Keyboard-test the complete conversion path**

Using keyboard only:

1. Open/close mobile navigation.
2. Activate hero CTA.
3. Navigate each Work link.
4. Reach pricing CTA.
5. Submit an empty contact form and confirm focus lands on the first error.
6. Submit valid data only in a safe non-delivery test environment or with the owner’s explicit live-send approval.

- [ ] **Step 6: Gate and commit**

```bash
pnpm tsc --noEmit && pnpm lint && pnpm build
git add components/PricingSection.tsx components/PricingTable.tsx components/ContactSection.tsx components/ContactForm.tsx components/Footer.tsx
git commit -m "feat: redesign pricing contact and footer"
```

---

### Task 9: Metadata, OG artwork, and cleanup

**Files:**
- Modify: `app/layout.tsx`
- Create: `public/brand/route90-og.png`
- Delete after verification: retired shared primitives
- Modify: `TODO.md`
- Modify: `KNOWN-ISSUES.md`

- [ ] **Step 1: Create the Ember OG image**

Create a 1200×630 image with ink background, cropped copper ember lens, cream `ROUTE90 DIGITAL SOLUTIONS`, and small `WINNIPEG · DESIGN + DEVELOPMENT`. Do not use service artwork or fake screenshots.

- [ ] **Step 2: Complete metadata**

Add:

```ts
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://route90digital.ca"),
  title: { default: "Route90 Digital Solutions", template: "%s · Route90 Digital" },
  description: "Winnipeg design and development studio. Websites, apps, print, and digital support for small businesses.",
  openGraph: {
    type: "website",
    title: "Route90 Digital Solutions",
    description: "Design and development for Winnipeg small businesses.",
    images: [{ url: "/brand/route90-og.png", width: 1200, height: 630 }],
  },
};
```

- [ ] **Step 3: Confirm retired primitives are unused**

```bash
rg -n "ShieldBadge|ChapterTag|DashedDivider|DiamondBullet|GridTexture|SnapIn" app components
```

Expected: no imports or usage. Then delete only the six retired primitive files.

- [ ] **Step 4: Update tracking documents**

Mark the old shield dependency as no longer a launch blocker. Keep real portfolio media and live contact delivery as blockers until proven. Record the favicon and OG image status accurately.

- [ ] **Step 5: Gate and commit**

```bash
pnpm tsc --noEmit && pnpm lint && pnpm build
git diff --check
git add app/layout.tsx public/brand TODO.md KNOWN-ISSUES.md components/shared
git commit -m "chore: finish ember metadata and cleanup"
```

---

### Task 10: Full audit and visual proof

**Files:**
- Modify only files implicated by audit findings.

- [ ] **Step 1: Run the complete static gate**

```bash
pnpm tsc --noEmit && pnpm lint && pnpm build
```

Expected: zero errors and all homepage/case-study routes generated.

- [ ] **Step 2: Run production locally**

```bash
pnpm start
```

Verify `/`, all four case studies, and a 404 work slug.

- [ ] **Step 3: Capture responsive evidence**

Capture full-page screenshots at:

- 375×812
- 768×1024
- 1440×1200
- 1920×1200

Also capture the mobile menu open, a focused CTA, contact validation errors, and one mobile case study.

- [ ] **Step 4: Run accessibility passes**

Check:

- keyboard order and focus visibility;
- mobile-menu focus containment/return;
- 200% zoom;
- reduced-motion emulation;
- headings follow a logical outline;
- decorative service art does not create noisy announcements;
- cream/ink, lime/ink, and muted text pairs meet WCAG AA.

- [ ] **Step 5: Run performance review**

Using `vercel-react-best-practices`, confirm:

- server components remain the default;
- Framer Motion client boundaries are narrow;
- no unnecessary barrel imports;
- all `next/image` instances have accurate `sizes`;
- no large scrolling backdrop blur;
- no repeated continuous animations;
- generated service assets meet the agreed size budget.

- [ ] **Step 6: Run generic-design review**

Using `redesign-existing-projects` and `web-design-guidelines`, reject and correct:

- equal three-card feature rows;
- excessive pill badges;
- purple/blue AI gradients;
- generic floating glass cards;
- repeated identical reveal animations;
- overly centered sections;
- copper small text with inadequate contrast;
- service art that reads as generic AI imagery.

- [ ] **Step 7: Final source scans**

```bash
rg -n -i "\bmile\b|behind the wheel|let.s roll out|start the trip|worth pulling over" app components data
rg -n "#[0-9A-Fa-f]{6}" components app --glob '!app/globals.css'
rg -n "rounded-\[|shadow-\[|backdrop-blur" components app
```

Expected: factual product-copy exception only; colors live in tokens; special radii/shadows are deliberate and reviewed.

- [ ] **Step 8: Final checkpoint commit**

```bash
git add -A
git diff --cached --check
git commit -m "feat: complete ember editorial redesign"
git tag ember-redesign-review
```

Do not push or deploy until the owner reviews the screenshots and approves the redesign.

---

## Rollback and review points

- Stable original: `git switch main` or inspect tag `pre-ui-redesign`.
- Approved design-system checkpoint: commit created after Task 2.
- Reference-pattern review: stop after Task 6.
- Full redesign review: tag `ember-redesign-review` after Task 10.

Do not use destructive reset commands. If a comparison is needed, use a separate worktree or inspect tagged files with `git show`.
