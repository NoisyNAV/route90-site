# Route90 Site — TODO

Phase tracking. Updated after every phase, before moving to the next one.
See `route90-BUILD-MANUAL.md` in the vault for the full prompts and gates.

**Current phase:** 6 — Remaining sections (About, Pricing, ticker/nav shells).
**Last updated:** 2026-07-16

---

## Phases

- [x] **0 — Repo + docs** · Haiku · no skills
- [x] **1 — Scaffold + implementation plan** · Opus · using-superpowers, writing-plans, vercel-react-best-practices
- [x] **2 — Design tokens + typography** · Opus · using-superpowers, ui-ux-pro-max, frontend-design
- [x] **3 — Shared primitives** · Opus · using-superpowers, frontend-design
- [x] **4 — Data layer** · Sonnet · using-superpowers
- [x] **5 — Services section (the pattern)** · Opus · using-superpowers, frontend-design
- [ ] **6 — Remaining sections** · Sonnet · using-superpowers, frontend-design
- [ ] **7 — Work section (expandable cards)** · Opus · using-superpowers, frontend-design
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
| Real shield logo SVG replacing placeholder | Yes |
| Real portfolio screenshots/video for all 3 projects | Yes |
| Favicon + OG image | Yes |
| Basic SEO metadata | Yes |
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
