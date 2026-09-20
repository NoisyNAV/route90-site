# Route90 Site — TODO

Phase tracking. Updated after every phase, before moving to the next one.
See `route90-BUILD-MANUAL.md` in the vault for the full prompts and gates.

**Current phase:** 8 — Contact form + Resend (code-complete; live Resend send pending owner confirmation).
**Last updated:** 2026-07-16

---

## Phases

- [x] **0 — Repo + docs** · Haiku · no skills
- [x] **1 — Scaffold + implementation plan** · Opus · using-superpowers, writing-plans, vercel-react-best-practices
- [x] **2 — Design tokens + typography** · Opus · using-superpowers, ui-ux-pro-max, frontend-design
- [x] **3 — Shared primitives** · Opus · using-superpowers, frontend-design
- [x] **4 — Data layer** · Sonnet · using-superpowers
- [x] **5 — Services section (the pattern)** · Opus · using-superpowers, frontend-design
- [x] **6 — Remaining sections** · Sonnet · using-superpowers, frontend-design
- [x] **7 — Work section (expandable cards)** · Opus · using-superpowers, frontend-design
- [ ] **8 — Contact form + Resend** · Sonnet · using-superpowers
- [ ] **9 — Audit + verification** · Opus · using-superpowers, web-design-guidelines, vercel-react-best-practices
- [ ] **10 — Deploy** · Haiku · no skills
- [ ] **11 — Pre-launch punch list** · manual

---

## In Progress

_(nothing yet)_

---

## Blocked

_(nothing yet)_

---

## Prerequisites

- [x] Node 20+ / pnpm installed _(Node **22.x** blessed for this project 2026-07-15 — locked in CLAUDE.md)_
- [ ] GitHub repo created
- [x] Planning docs copied to repo `/docs` _(4 files, from the vault; vault left read-only)_
- [ ] Vercel account
- [ ] Resend account + API key _(needed at Phase 8, not before)_
- [ ] Domain `route90digital.ca` purchased _(not blocking)_
- [ ] Shield logo SVG _(not blocking — placeholder ships Phase 3)_
- [ ] Portfolio screenshots/video _(not blocking — placeholders ship Phase 4)_

---

## Pre-Launch Punch List (Phase 11)

| Item | Blocking launch? |
|---|---|
| Real portfolio screenshots/video for all 4 projects | Yes |
| Final owned favicon | Yes |
| OG image | No — Ember social card added |
| Basic SEO metadata | No — title, description, Open Graph, and Twitter card added |
| Additional portfolio pieces from unused mockups | No — post-launch |
| Domain purchased + connected | No — `.vercel.app` works meanwhile |
| `hello@route90digital.ca` mailbox live | No — gmail works meanwhile |

---

## Phase Log

<!--
After each phase, append an entry:

### Phase X — <name> — YYYY-MM-DD
- Built: <what shipped>
- Gate: <what passed — type-check/lint/build, screenshots, keyboard check>
- Decisions made: <anything that should be promoted into CLAUDE.md>
- Deferred: <anything logged into KNOWN-ISSUES.md>
-->

### Phase 0 — Repo + docs — 2026-07-15
- Built: Copied the 4 planning docs into repo `/docs` and the Emergent mockup export into
  `/reference`, both from the vault (`~/Documents/NavdeepVault/Projects/Route90_Digital/`).
  Vault read from only, never written to. Verified: `wc -l` on each doc (118–789 lines),
  `ls` on `/reference` (index.html + images/scripts/styles present).
- Deferred: nothing.

### Phase 1 — Scaffold + implementation plan — 2026-07-15
- Built: PLAN.md (full build plan, repo root). Scaffolded Next.js App Router + TypeScript + pnpm
  via create-next-app. Installed framer-motion, lenis, react-hook-form, zod, @hookform/resolvers,
  resend, clsx, tailwind-merge, lucide-react. **Resend + Lenis installed, NOT wired.** Palette +
  zero-radius wired via Tailwind v4 `@theme` in `app/globals.css`. Added `lib/cn.ts`; created the
  six locked folders (components, components/shared, data, lib, styles, public/work) with
  `.gitkeep`; added `.env.local.example`. Neutral placeholder page, no sections/components.
- Gate: `pnpm exec tsc --noEmit` ✅ · `pnpm lint` ✅ (after ignoring `/reference` minified JS) ·
  `pnpm build` ✅ (static, clean) · `pnpm dev` ✅ (Ready in 543ms, HTTP 200, placeholder renders,
  no console errors). Proof = clean dev.log + curl HTTP 200 + rendered heading; no browser
  screenshot taken (placeholder page only).
- Decisions made (promoted into CLAUDE.md): **stack baseline moved to Next 16 / React 19 /
  Tailwind v4** (owner-approved during this phase); Tailwind v4 uses `@theme` in globals.css,
  no `tailwind.config.ts`. PLAN.md Phase 1 Step 4 updated to match.
- Deferred / needs decision:
  - **Node version:** machine runs Node 22.22.2; global CLAUDE.md says Node 20.x. `engines` set to
    `>=20` to keep installs clean. Owner to decide: pin to 20 (nvm) or bless 22.
  - **D1 fonts** — unresolved, gates Phase 2.
  - **D2 service-badge numbering** — unresolved, gates Phase 4.
- Not committed — everything left in the working tree for manual review (workflow rule 3).

### Phase 2 — Design tokens + typography — 2026-07-15
- Built: Wired the "Interstate" type system via `next/font` (self-hosted) in `app/layout.tsx` —
  **Anton** (display) / **Public Sans** (body) / **Martian Mono** (mono). Added `--font-display`
  / `--font-body` / `--font-mono` / `--font-sans` tokens to the `@theme` block in
  `app/globals.css`; body now uses `var(--font-body)`. Replaced the bare placeholder page with a
  temporary type specimen exercising all three roles + palette + hard borders.
- Gate: `tsc` ✅ · `lint` ✅ · `build` ✅ · dev run ✅ (Ready in 521ms, HTTP 200). Fonts proven
  self-hosted: 10 woff2 files in `.next/static/media`, and `<html>` carries the three generated
  `*_variable` classes. Proof is a headless run + bundled-asset check, not a pixel screenshot.
- Decisions promoted into CLAUDE.md: fonts locked (Typography section); D1 resolved & removed from
  "Currently undecided"; Node 22.x blessed (supersedes global 20.x default), `engines` = `>=20`.
- Deferred: **D2** service-badge numbering still open (gates Phase 4). Type specimen is temporary —
  gets replaced by real sections from Phase 5.
- Not committed — working tree only.

### Phase 3 — Shared primitives — 2026-07-15
- Built: `lib/motion.ts` (SNAP transition + snapIn variants). `components/shared/`: `SnapIn`
  (whileInView + once + RM guard), `Section` (forest/cream color-block, hard-bordered, server
  component), `ChapterTag` (mono mustard "CHAPTER 0X"), `DashedDivider` (CSS dashed border,
  scaleX draw-on to preserve dashes, drawn under RM), `ShieldBadge` (placeholder highway shield,
  swappable path), `LenisProvider` (RAF loop, cleanup, **never inits under RM**). Mounted
  `LenisProvider` in `app/layout.tsx`; added Lenis CSS to `globals.css`. Home page is now an
  interim primitives demo (replaced at Phase 5).
- Gate: `tsc` ✅ · `lint` ✅ · `build` ✅ (static) · dev run ✅ (HTTP 200, no console errors;
  ShieldBadge, dashed divider, bordered cells, display h1 all render).
- Limitation: RM guards + Lenis on/off are code-verified, not exercised via an emulated
  `prefers-reduced-motion` browser run — deferred to the Phase 9 audit (add to that gate).
- Deferred: **D2** still open (gates Phase 4).
- Not committed — working tree only.

### Phase 4 — Data layer — 2026-07-16
- Built: `data/services.ts` (Service[] × 5, badges 01–05), `data/pricing.ts` (authoritative
  tier×price sheet + Ch04 framing), `data/site.ts` (hero/about/work-intro/contact/footer, verbatim),
  `data/work.ts` (WorkItem[], unbounded). Copy/prices verbatim from the docs — none invented or
  reworded. Created 1×1 placeholder PNGs in `/public/work/` so paths resolve (real assets pending).
- Gate: `tsc` ✅ · `lint` ✅ · `build` ✅. (Data not yet consumed by the page — wired at Phase 5.)
- FLAGS needing owner input (surfaced, not guessed silently):
  1. **work.ts status mapping** — only SplitHouse=LIVE PROD is doc-confirmed. Route90 Invoicer
     (INTERNAL TOOL) + CanadaTracker (COMMISSIONED) are INFERRED from the remaining status set.
  2. **work.ts descriptions** — Route90 Invoicer + CanadaTracker are `PLACEHOLDER`; real copy pending.
  3. **work.ts links** — all omitted (real URLs unknown; build-guide's was a placeholder domain).
  4. **Bundle names 90A/90B** — the copy doc flags this as open (keep route-number naming vs plain).
     Used the doc's literal "90A/90B" for now.
  5. **Card `description`** — used each service's "Description" paragraph verbatim; the doc's separate
     "one-liner" isn't stored (locked Service interface has a single description field).
  6. **Derived priceFrom** — 04 = "From $80/mo" (floor of "$80–$150/mo"); 05 = "Save up to 20%"
     (from Save 15%/20%). Print = flat "From $40" per the docs' "Resolved" (was "$40–$80").
  7. Minor doc drift: about eyebrow is "WHO — SECTION 01" in the copy doc vs the "CHAPTER 0X" pattern
     elsewhere — stored verbatim; reconcile at the section-build phase.
- Not committed — working tree only.

### Phase 4 addendum — WorkItem interface split + real projects — 2026-07-16
- WorkItem interface: `description` split into `cardDescription` (collapsed) + `description`
  (expanded). Updated in CLAUDE.md (+ note), PLAN.md, docs/route90-build-guide.md, AND
  docs/route90-BUILD-MANUAL.md (4th file — owner named 3; updated for "all must match exactly",
  flagged in report).
- work.ts rewritten: four real projects verbatim — SplitHouse (LIVE PROD), Route90 Invoicer
  (LIVE PROD), BorderLog (LIVE PROD, links app.borderlog.ca), Route90 Trucking (COMMISSIONED).
  **CanadaTracker removed** — it was an invalid AI-mockup placeholder, purged from all spec/reference
  docs and its placeholder PNGs deleted. This SUPERSEDES Phase 4 flags 1–3 above (status mapping,
  placeholder descriptions, links) — all now resolved with real content.
- Placeholders: 1×1 PNGs renamed to the four slugs; KNOWN-ISSUES Placeholders expanded to one row
  per project (all launch blockers).
- RESOLVED 2026-07-16 (all three prior flags closed by owner):
  - "per-mile rate calculations" + "live on the road" — kept verbatim. Factual product copy,
    not Route90-voice puns; the no-MILE/no-highway rule governs the site's own voice only.
  - BUILD-MANUAL 4th-file interface edit — approved (correct to keep all four docs in sync).
  - build-guide's worked `work.ts` EXAMPLE — updated (lines ~172) to the new
    cardDescription/description shape so it no longer contradicts the real interface.
- Gate: `tsc --noEmit` ✅ · `lint` ✅ · `build` ✅. Not committed.

### Phase 5 — Services section (the reference pattern) — 2026-07-16
- Built: `components/ServicesSection.tsx` (Ch 02 — the canonical section pattern: color-blocked
  `Section` on an ink/near-black field (corrected from forest to #0E0E0E after pixel-sampling the
  Emergent export), header row with big display title left + intro right, `DashedDivider`,
  then a stack of panels each wrapped in `SnapIn`), `components/ServicePanel.tsx` (forest header bar
  with mustard-bordered PLAIN number badge + display title + verbatim `priceFrom`; cream body with
  description left, `DiamondBullet` feature list right; 2px ink borders, zero radius, no shadow), and
  `components/shared/DiamondBullet.tsx` (rotated-square mustard marker — hard-edged by construction).
  Maps `data/services.ts` 01–05 verbatim. Replaced the interim primitives-demo `app/page.tsx` with the
  live section (remaining sections slot around it in later phases per the locked page order).
- Motion: each panel snaps in via `SnapIn` (`whileInView`, `once:true`, SNAP easing, reduced-motion
  renders end state) — reuses the Phase 3 primitive, no new motion code.
- Gate: `tsc --noEmit` ✅ · `lint` ✅ · `build` ✅ (static). Runtime proof: Playwright full-page
  captures at 375×812 and 1440×900 → `review/phase-05/*.png` (`review/` gitignored). Desktop + mobile
  both verified: all five panels render, mobile stacks cleanly (header wraps badge+title/price,
  body → ink rule → bulleted list) with the bordered/blocked look intact.
- Screenshot harness note: `SnapIn` gates content on real viewport intersection, so the capture script
  (`review/phase-05/shot.mjs`) step-scrolls the full page before the full-page shot — a straight
  jump-to-bottom leaves mid panels at their hidden end-state. Not a layout bug.
- Not committed — working tree only.

### Phase 6 — Remaining sections — 2026-07-16
- Built the full single-page assembly in the locked order (`app/page.tsx`): Nav → Hero → TickerStrip
  → About (Ch01) → Services (Ch02) → Work (Ch03, placeholder) → Pricing (Ch04) → Contact (Ch05) →
  Footer. New components: `Nav`, `Hero`, `TickerStrip`, `About`, `WorkSection` (placeholder),
  `PricingSection` + `PricingTable`, `ContactSection`, `Footer`, and shared `GridTexture`.
- Reference-driven fidelity: `GridTexture` values are pixel-sampled from the Emergent export
  (cream 1px lines, 80px cells, opacity 0.12); Nav dashed-mustard bottom edge, About green-accent
  12-col panel, and the marquee (28s) all taken from the export markup — but LOCKED naming overrode
  the export's stale "Who"/"The Miles" nav labels (used About/Services/Work/Pricing instead).
- Reused patterns only (no new visual language): 2px ink borders, zero radius, no shadow, `SnapIn`
  reveals, ServicePanel-style forest-header/cream-body blocks for Pricing. Marquee keyframes added to
  `globals.css`, disabled under `prefers-reduced-motion`.
- Data additions (locked copy, not invented): `site.nav.links` (section anchors, labels from the
  page order + copy-doc renames) + `site.nav.ctaHref`; `site.about.headline = "About Route90"` (copy-doc
  Ch01 rename). Bundle rows show plain names (90A/90B prefix stripped at render only; data untouched).
- Deliberate deviation: Pricing "from" prices are forest (not mustard) on cream — mustard-on-cream is
  on the KNOWN-ISSUES contrast watchlist and prices must be legible. Forest passes AA, stays on-brand.
- Gate: `tsc --noEmit` ✅ · `lint` ✅ · `build` ✅ (static). Runtime proof: Playwright full-page
  captures at 375×812 + 1440×900 → `review/phase-06/full-page-{mobile,desktop}-*.png`. Desktop +
  mobile both verified: Nav/Hero grid continuous, all sections render, mobile stacks cleanly.
- Deferred / flagged:
  - Work section is a PLACEHOLDER (static collapsed cards + note) — expandable cards are Phase 7.
  - Contact form is a reserved bordered slot — RHF+Zod+Resend wiring is Phase 8.
  - Nav section-links are `hidden md:flex`; no mobile hamburger menu yet (out of scope this phase) —
    on <768px only the wordmark + "Get in Touch" CTA show. Logged to KNOWN-ISSUES.
- Not committed — working tree only.

### Phase 7 — Work section (expandable cards) — 2026-07-16
- Replaced the Phase 6 Work placeholder with the real interaction. New components: `WorkGallery`
  (client island — holds open-item state, `AnimatePresence`, restores focus to the trigger on close),
  `WorkCard` (collapsed "browser-window" card from the export: ink chrome bar + diamond dots + mono
  URL/slug label → thumbnail with hover-zoom → forest title/status bar → cream teaser + "View case
  study →"; the whole card is a button), and `WorkCardModal` (expanded case-study dialog). `WorkSection`
  stays a server component; only the grid is client. Grid is unbounded (any N; 4 today).
- Dialog: snaps open over an ink/85 backdrop (SNAP transition; instant under reduced motion via
  `useReducedMotion`). Accessible — `role="dialog"` + `aria-modal`, labelled by the title, Escape +
  backdrop-click close, focus moved in on open + trapped (Tab cycles), focus returned to the opening
  card on close, background scroll locked, scroll area marked `data-lenis-prevent`. Shows the media
  gallery (`item.media`, image/video), the full `description`, and a "View Project ↗" external link
  only when `item.link` exists (SplitHouse/Invoicer/Trucking have none → no button; BorderLog does).
- Reused patterns only: 2px cream/ink borders, zero radius, no shadow, `SnapIn` card reveals, next/image
  (lint-clean vs `<img>`). No new visual language introduced.
- Gate: `tsc --noEmit` ✅ · `lint` ✅ · `build` ✅ (static). Runtime proof: Playwright drove the click —
  `review/phase-07/work-collapsed-{mobile,desktop}.png` (all 4 cards) + `work-modal-{mobile,desktop}.png`
  (SplitHouse dialog open). Verified: cards render, dialog opens/animates, description + backdrop correct,
  no View-Project button when link absent, mobile stacks + dialog scrolls.
- Resolves the KNOWN-ISSUES "Work card focus trap" watch item (focus trap + return-focus implemented).
- Deferred: media are still the 1×1 placeholder PNGs (launch blocker, already tracked). Contact form
  is Phase 8.
- Screenshot harness note: `SnapIn` gates on intersection, so `review/phase-07/shot.mjs` step-scrolls
  to reveal all cards before the collapsed capture (else row-2 card stays at opacity 0). Not a bug.
- Not committed — working tree only.

### Phase 8 — Contact form + Resend — 2026-07-16 (code-complete; live send pending owner confirm)
- Built: `lib/contact-schema.ts` (ONE Zod schema shared by client + server; service dropdown options
  derived from `data/services.ts`, never hardcoded; honeypot `website` field), `components/ContactForm.tsx`
  (RHF + zodResolver, inline errors, submitting/success/error states), `app/api/contact/route.ts` (POST,
  re-validates with the same schema, silent honeypot drop, Resend send, typed JSON + status codes,
  surfaces Resend errors). Slotted the live form into `ContactSection.tsx` (Phase 6 placeholder removed).
- Colors: errors + success/error panels use **mustard** — a locked hex — so no new color introduced.
  Submit button = "Send It" verbatim from `data/site.ts`, disabled/"Sending…" while in flight.
- Security: `.env.local` gitignored (verified — `.gitignore` line 34 `.env*`). RESEND_API_KEY read
  server-side only in the route, never sent to the client. Sends to `process.env.CONTACT_TO_EMAIL`
  (navi904133@gmail.com per example) from `CONTACT_FROM_EMAIL`.
- Gate: `tsc --noEmit` ✅ · `lint` ✅ (added `review/**` to eslint ignores — gitignored scratch) ·
  `build` ✅ (`/api/contact` = dynamic ƒ).
- Proof so far (no real email sent): Playwright captured empty / validation / loading / success / error
  at 375 + 1440 → `review/phase-08/form-*.png`. Server curl: honeypot (website filled) → 200
  `{ok:true,delivered:false}` (no send); empty body → 422 with per-field errors. Both correct.
- PENDING (owner gate): the REAL Resend send. Key IS present in `.env.local` (detected, not printed),
  but a live external email is held until owner says go. NOTE: the inbox screenshot the owner asked for
  can't be produced by me — navi904133@gmail.com is not an inbox I can access; on go I'll fire the send
  and report Resend's message-id/response, owner confirms receipt.
- Not committed — working tree only.
