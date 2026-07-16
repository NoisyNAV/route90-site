---
tags: [build-manual, route90, claude-code, prompts]
created: 2026-07-15
status: ready
supersedes: route90-claude-code-prompts.md
---

# Route90 Website — Full Build Manual

Start-to-finish manual for building `route90digital.ca`. Contains every
step, every Claude Code prompt, which skills to invoke, which model to
use, and what to log after each phase.

**Read this first, run it in order.** Each phase has a verification gate.
Don't start the next phase until the current one passes.

---

## 0. How This Guide Works

| Element | Meaning |
|---|---|
| **Phase** | A logical chunk of work. One phase = one Claude Code session, roughly. |
| **Skills** | Skills to invoke in that phase's prompt. Claude Code won't reliably auto-discover them — name them explicitly. |
| **Model** | Which model to switch to (`/model` in Claude Code). |
| **Prompt** | Copy-paste into Claude Code. One topic each — don't merge them. |
| **Gate** | What must pass before moving on. |
| **Log** | What to write into `TODO.md` / `KNOWN-ISSUES.md`. |

**Rules that apply to every phase:**
- No auto-commit. Everything sits in the working tree; you review and
  commit yourself.
- Investigate-and-report before fix. If something's broken, get the report
  first, decide here, then fix.
- If Claude Code hits an undecided question, it stops and asks — it does
  not improvise a design or naming decision.
- Visual claims need a screenshot or a real browser check. "The diff looks
  right" is not confirmation.

---

## 1. Prerequisites (do these before Phase 1)

| Item | Status | Notes |
|---|---|---|
| Node 20+ / pnpm installed | ☐ | `node -v && pnpm -v` |
| Git repo created (GitHub) | ☐ | Private is fine to start |
| Obsidian vault folder | ☐ | `navdeepvault/Route90/` — drop all 5 planning docs there |
| Vercel account | ☐ | Free tier is fine |
| Resend account + API key | ☐ | Needed at Phase 8, not before |
| Domain `route90digital.ca` | ☐ | Not blocking — build/deploy works on a `.vercel.app` subdomain first |
| Shield logo SVG | ☐ | Placeholder ships in Phase 3; real asset needed before launch |
| Portfolio screenshots/video | ☐ | Placeholder paths in Phase 5; real assets needed before launch |

Nothing above blocks starting except Node/pnpm/git.

---

## 2. Skills Reference

Invoke these by name in the prompt. Claude Code's skill discovery is not
reliable enough to leave implicit.

| Skill | Used in | Why |
|---|---|---|
| `using-superpowers` | Every session, first line | Meta-skill — establishes skill-discovery behavior. Cheap insurance. |
| `writing-plans` | Phase 1 only | Turns the locked spec into an implementation plan before any code |
| `ui-ux-pro-max` | Phase 2 | Design tokens, palette, typography scale |
| `frontend-design` | Phases 3–7 | The workhorse — every component build |
| `vercel-react-best-practices` | Phases 1, 9 | Next.js structure at scaffold, perf pass at the end |
| `web-design-guidelines` | Phase 9 | Accessibility + interface audit gate |
| `find-skills` | Ad-hoc only | If a phase needs something not covered |

**Deliberately not used:** `supabase` (no DB — typed data files),
`remotion-best-practices` (no programmatic video), `sleek-design-mobile-apps`
(web, not native), `ai-image-generation` (shield needs real vector, not a
raster gen), `to-prd` (spec docs already exist), `skill-creator`,
`microsoft-foundry`, `caveman`.

---

## 3. Model Strategy

Switch with `/model` in Claude Code.

| Model | Use for | Phases |
|---|---|---|
| **Opus** | Architecture, design-heavy component work, anything where taste matters or a wrong call is expensive | 1, 2, 3, 4 (services pattern), 7 (expandable cards) |
| **Sonnet** | Repetitive implementation against an established pattern, data entry, wiring | 5, 6, 8 |
| **Haiku** | Trivial mechanical edits, renames, formatting | Ad-hoc only |

Rough rule: **Opus sets the pattern, Sonnet repeats it.** Phase 4 builds
the services section — that's the pattern every other boxy section copies,
so it's worth Opus. Phase 6 (remaining sections) is Sonnet copying that
pattern seven more times.

---

## 4. Library Stack

### Locked (decided, don't re-open)

| Library | Purpose |
|---|---|
| Next.js 14+ (App Router) | Framework |
| TypeScript | Language |
| Tailwind CSS | Styling — utility-driven, matches the hard-edged panel system |
| Framer Motion | All animation — panel snap-in, card expansion, divider draw |
| React Hook Form + Zod | Contact form + validation |
| Resend | Contact form email delivery |
| next/font | Self-hosted fonts, no layout shift |

### Optional add-ons — decide before Phase 3

| Library | What it adds | My take |
|---|---|---|
| **Lenis** | Smooth/eased scroll feel across the whole page | **Recommend yes.** ~3kb, one provider wrapper. The snap-in panels land noticeably better against smoothed scroll than native jank. Low cost, real payoff. |
| **clsx + tailwind-merge** | Clean conditional class composition | **Yes.** Standard, tiny, you'll want it by the third component. |
| **lucide-react** | Icon set | **Yes, sparingly.** For UI chrome (menu, arrow, external-link on work cards). The shield stays custom. |
| **@react-three/fiber** | 3D | **No.** Nothing in this design needs it. Would be effect-for-effect's-sake. |
| **GSAP + ScrollTrigger** | Advanced scroll choreography | **No.** Considered in an earlier direction; Framer Motion covers everything this design actually does. Two animation libs is a maintenance tax for no gain. |

**Motion approach, per locked direction:** structural and mechanical, not
soft and ambient. Short durations (~0.3–0.4s), minimal overshoot,
`whileInView` with `once: true`. Panels *snap* into place. Every animated
component respects `prefers-reduced-motion` via `useReducedMotion()`.

---

## 5. Documentation Setup

Two files live in the repo root, updated after every phase. Claude Code
maintains them; you review them.

- **`TODO.md`** — what's done, what's next, what's blocked
- **`KNOWN-ISSUES.md`** — anything broken, deferred, or worked around

Templates for both are at the bottom of this manual (§8). Create them in
Phase 0.

Also drop `CLAUDE.md` at repo root — the canonical locked-decisions file
Claude Code reads first every session. Contents in §8 too.

---

## PHASE 0 — Repo + Docs

**Model:** none (manual)
**Skills:** none

No prompt — this is yours to do by hand. **Phase 1 reads `CLAUDE.md`, so it
must exist and be populated before you start.**

`CLAUDE.md` goes at the repo root. Everything else Claude Code needs to
read goes in `/docs`, plus the real mockup export goes in `/reference` —
this matters because that folder is **actual source code** from the
Emergent-built mockup, not just a screenshot, so Claude Code should inspect
it directly rather than working from the reconstructed description in
`route90-build-guide.md`.

```bash
# 1. Create the repo
mkdir route90-site && cd route90-site
git init
mkdir docs reference

# 2. Copy CLAUDE.md to the repo root
cp ~/Documents/NavdeepVault/Projects/Route90_Digital/route90-repo-docs/CLAUDE.md .
cp ~/Documents/NavdeepVault/Projects/Route90_Digital/route90-repo-docs/TODO.md .
cp ~/Documents/NavdeepVault/Projects/Route90_Digital/route90-repo-docs/KNOWN-ISSUES.md .

# 3. Copy the planning docs into /docs
cp ~/Documents/NavdeepVault/Projects/Route90_Digital/route90-BUILD-MANUAL.md docs/
cp ~/Documents/NavdeepVault/Projects/Route90_Digital/route90-build-guide.md docs/
cp ~/Documents/NavdeepVault/Projects/Route90_Digital/route90-service-copy-pricing.md docs/
cp ~/Documents/NavdeepVault/Projects/Route90_Digital/route90-full-site-copy.md docs/

# 4. Copy the real mockup export into /reference
cp -r ~/Documents/NavdeepVault/Projects/Route90_Digital/milepost-studio.preview.emergentagent.com-1784162327646 reference/

# 5. Verify everything landed and CLAUDE.md isn't empty
wc -l CLAUDE.md docs/*.md
ls reference/
```

**Gate:**
- Repo exists, git initialized
- `CLAUDE.md` at repo root, populated (`wc -l` shows real line counts, not 0)
- `/docs` has all four planning docs
- `/reference` has the real mockup export

**Note:** delete the old `route90-claude-code-prompts.md` if you still have
a copy anywhere — this manual supersedes it, and a stale prompt doc is
exactly the kind of thing that drifts a build off-spec.

---

## PHASE 1 — Scaffold + Implementation Plan

**Model:** Opus
**Skills:** `using-superpowers`, `writing-plans`, `vercel-react-best-practices`

```
Use the using-superpowers, writing-plans, and vercel-react-best-practices skills.

Read CLAUDE.md in the repo root first — it contains the locked decisions
for this project and points to /docs for the full planning docs and
/reference for the original mockup export. Do not make design, naming, or
stack decisions that aren't already in CLAUDE.md or /docs; if you hit
something undecided, stop and ask.

Task, in two parts:

PART 1 — Write an implementation plan (writing-plans skill) covering the
full build of this site, based on CLAUDE.md. Save it as PLAN.md in the
repo root. Do not write any code yet. Report the plan back to me for
review.

PART 2 — After I approve the plan, scaffold the project:
- Next.js 14+ App Router, TypeScript, pnpm
- Tailwind CSS
- Framer Motion
- React Hook Form + Zod
- Resend (installed, not wired up yet)
- Lenis (installed, not wired up yet)
- clsx + tailwind-merge
- lucide-react

Folder structure:
/app, /components, /components/shared, /data, /lib, /styles

Confirm the dev server boots clean. Do not build any sections or
components yet.
```

**Gate:** `pnpm dev` boots clean. `PLAN.md` reviewed and approved by you.
**Log:** TODO — mark Phase 1 done, Phase 2 next.

---

## PHASE 2 — Design Tokens + Typography

**Model:** Opus
**Skills:** `using-superpowers`, `ui-ux-pro-max`, `frontend-design`

```
Use the using-superpowers, ui-ux-pro-max, and frontend-design skills.
Read CLAUDE.md first.

Set up the design system foundation in tailwind.config.ts and
styles/globals.css.

Palette (exact, do not adjust):
- forest green  #1F3A2E
- near-black    #0E0E0E
- cream         #F0EAD6
- mustard       #E8A824
- white         #FFFFFF

Hard requirements:
- borderRadius default 0 — no rounded corners anywhere in the base theme
- No soft shadows in the base theme
- Border widths should be deliberate and visible (2px+ for panel borders)

Typography — three roles, pick and configure real fonts via next/font:
1. Display: bold, condensed, blocky, all-caps headlines (the "ROUTE 90
   DIGITAL SOLUTIONS" lockup energy). Free/open-license only.
2. Body: clean, legible sans for dense service/pricing copy.
3. Mono/technical: for numbers, chapter tags, metadata labels — echoes
   highway signage numerals.

Propose the three specific fonts with reasoning BEFORE installing them.
Then set up a type scale as Tailwind tokens.

Report the token config and font choices back before moving on.
```

**Gate:** You approve the font choices. Tokens compile.
**Log:** TODO + note the chosen fonts in `CLAUDE.md` (they become locked).

---

## PHASE 3 — Shared Primitives

**Model:** Opus
**Skills:** `using-superpowers`, `frontend-design`

```
Use the using-superpowers and frontend-design skills. Read CLAUDE.md first.

Build four shared components in /components/shared. These are reused
across every section — get them right before anything else is built.

1. ShieldBadge.tsx
   - SVG-based highway route shield, "90" centered
   - Clean geometric construction, not clipart
   - Props: size, variant (light/dark background)
   - This is a PLACEHOLDER for a final logo asset — structure it so the
     SVG path is trivially swappable later

2. ChapterTag.tsx
   - Small eyebrow label, e.g. "CHAPTER 01 — SERVICES"
   - Uppercase, letter-spaced, mono font
   - Props: chapter number, label text, variant (on-dark / on-cream)

3. DashedDivider.tsx
   - Horizontal dashed rule, lane-marking style
   - Prop: animated?: boolean — when true, animates strokeDashoffset as it
     scrolls into view (Framer Motion)
   - MUST respect prefers-reduced-motion via useReducedMotion() — skip the
     animation entirely, render the static rule

4. DiamondBullet.tsx
   - Small ♦ marker used in feature lists and the ticker strip
   - Props: color variant

Also wire Lenis in app/layout.tsx as a smooth-scroll provider — but
disable it entirely when prefers-reduced-motion is set.

Build each in isolation with sensible defaults. No page assembly yet.
Screenshot each one rendered before reporting done.
```

**Gate:** Screenshots of all four. Reduced-motion verified (toggle it in
DevTools → Rendering → Emulate CSS prefers-reduced-motion).
**Log:** TODO. KNOWN-ISSUES — note the shield is a placeholder.

---

## PHASE 4 — Data Layer

**Model:** Sonnet
**Skills:** `using-superpowers`

```
Use the using-superpowers skill. Read CLAUDE.md first, then read
docs/route90-service-copy-pricing.md and docs/route90-full-site-copy.md in
full — those are the source of truth for every string below. Use ONLY that
content — do not invent, reword, estimate, or "improve" any copy, service
name, or price. If something seems missing, stop and ask.

Create the typed data files in /data:

- data/site.ts    — nav labels, contact info, hero/about/section copy,
  sourced from docs/route90-full-site-copy.md
- data/services.ts — Service interface + 5 entries (10/20/30/40/50),
  sourced from docs/route90-service-copy-pricing.md
- data/work.ts     — WorkItem interface + 3 entries, placeholder asset
  paths for now (real assets come later)
- data/pricing.ts  — same 5 services, table-formatted (mile/service/
  includes/from) for the pricing sheet section

Interfaces:

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

work.ts gets 4 entries — SplitHouse, Route90 Invoicer, BorderLog, Route90
Trucking — with placeholder paths under /public/work/. The array must be
unbounded; more projects get added later.
```

**Gate:** `pnpm tsc --noEmit` clean. You spot-check that no copy was
invented or reworded.
**Log:** TODO.

---

## PHASE 5 — Services Section (the pattern)

**Model:** Opus
**Skills:** `using-superpowers`, `frontend-design`

This is the most important phase. Every other boxy section copies this
pattern — if it's wrong here, it's wrong eight more times.

```
Use the using-superpowers and frontend-design skills. Read CLAUDE.md first.

Build the Services section (Chapter 02) — this establishes the pattern all
other sections reuse, so prioritize getting it exactly right over speed.

Components:
1. ServicesSection.tsx
   - ChapterTag "CHAPTER 02 — SERVICES"
   - Big display headline left, intro line right-aligned
   - Maps over data/services.ts

2. ServicePanel.tsx — one row per service:
   - Green (#1F3A2E) header bar: number badge (PLAIN NUMBER — the word
     "MILE" appears nowhere on this site), title in display font, "FROM
     $X" right-aligned in mustard
   - Cream (#F0EAD6) body below: description on the left, feature list on
     the right using DiamondBullet
   - Hard borders, zero radius, no shadow

Motion (Framer Motion):
- Panels animate in with whileInView, once: true
- SNAP feel: short duration (~0.3s), minimal/no overshoot, structural not
  floaty. This is signage locking into place, not a soft fade-up.
- Respect prefers-reduced-motion — no motion, just render

Screenshot the full section at desktop AND mobile widths before reporting
done. Confirm panels stack cleanly on mobile without losing the bordered
look.
```

**Gate:** Desktop + mobile screenshots. You confirm the motion feel is
right — this is subjective and needs your eyes, not a diff.
**Log:** TODO.

---

## PHASE 6 — Remaining Sections

**Model:** Sonnet
**Skills:** `using-superpowers`, `frontend-design`

```
Use the using-superpowers and frontend-design skills. Read CLAUDE.md first.

Build the remaining sections, reusing the exact patterns established in
ServicePanel.tsx — same borders, spacing rhythm, motion timing, and token
usage. Do not introduce new patterns.

1. Nav.tsx — ShieldBadge, nav links from data/site.ts, "Get in Touch"
   button, dark bg with a subtle grid pattern
2. Hero.tsx — badge, eyebrow tag, three-tone wordmark (ROUTE 90 white /
   DIGITAL mustard / SOLUTIONS white), subheadline, CTA "See the
   Services", DashedDivider beneath
3. TickerStrip.tsx — full-width mustard bar, DiamondBullet-separated
   category labels
4. AboutSection.tsx — Chapter 01. Shield + big headline in left column,
   cream panel right with pull-quote (bold, mustard highlight treatment),
   body copy, tag chips beneath
5. PricingSection.tsx + PricingTable.tsx — Chapter 04, cream background,
   4-column table from data/pricing.ts, CTA line + "Request a Quote" button
6. ContactSection.tsx + Footer.tsx — Chapter 05, green background,
   ShieldBadge + wordmark, tagline, left contact block, bottom copyright
   bar. Form component comes in Phase 8 — leave a placeholder slot.

Assemble into app/page.tsx in order:
Nav → Hero → TickerStrip → About → Services → [Work placeholder] →
Pricing → Contact/Footer

Screenshot the full page at desktop and mobile before reporting done.
```

**Gate:** Full-page screenshots both widths. Nothing visually drifts from
the Services pattern.
**Log:** TODO.

---

## PHASE 7 — Work Section (expandable cards)

**Model:** Opus
**Skills:** `using-superpowers`, `frontend-design`

Separate phase because the expand interaction is the one genuinely novel
piece of UI on the site.

```
Use the using-superpowers and frontend-design skills. Read CLAUDE.md first.

Build the Work section (Chapter 03) with EXPANDABLE project cards.

WorkSection.tsx:
- ChapterTag "CHAPTER 03 — SELECTED WORK"
- Headline + intro line
- Responsive grid, must support ANY number of items (not a fixed 3)

WorkCard.tsx — two states:

COLLAPSED (default):
- Browser-chrome-style bordered frame containing the thumbnail
- Project title + status badge (LIVE PROD / INTERNAL TOOL / COMMISSIONED)
- Short description beneath
- Clear affordance that it opens (cursor, hover state, an expand icon)

EXPANDED (on click/tap):
- Animates open via Framer Motion layout animation
- Full description
- Media gallery — images or video, from the media[] array
- "View Project" external link (lucide external-link icon) — only render
  if link is present
- Close affordance (click outside, Esc key, and an explicit close button)

Requirements:
- Keyboard accessible: focusable, Enter/Space to open, Esc to close, focus
  trapped while open, focus returns to the trigger on close
- Motion stays structural — snap, not float. Consistent with panel timing.
- prefers-reduced-motion: card still opens, just without the animation
- Only one card expanded at a time

Screenshot collapsed and expanded states, desktop and mobile. Demonstrate
keyboard-only operation before reporting done.
```

**Gate:** Screenshots of both states. Keyboard-only walkthrough confirmed.
**Log:** TODO. KNOWN-ISSUES — note placeholder media still in place.

---

## PHASE 8 — Contact Form + Resend

**Model:** Sonnet
**Skills:** `using-superpowers`

```
Use the using-superpowers skill. Read CLAUDE.md first.

Wire the contact form end to end.

ContactForm.tsx:
- React Hook Form + Zod
- Fields: First Name, Last Name, Email, Business Name (optional), Service
  (dropdown — the 5 services from data/services.ts), Message (textarea)
- Inline validation errors, styled to match the design system (mustard or
  a red that doesn't fight the palette)
- Submit button "Send It" — disabled + loading state while sending
- Success and error states

app/api/contact/route.ts:
- Server route, re-validates with the SAME Zod schema (never trust the
  client)
- Sends via Resend using RESEND_API_KEY from env — server-side only, never
  exposed to the client
- Sends to navi904133@gmail.com for now (hello@route90digital.ca once the
  domain is live)
- Returns proper status codes

Also:
- Add RESEND_API_KEY to .env.local.example with a fake value
- Confirm .env.local is gitignored
- Basic rate limiting or honeypot field — this form will get bot traffic

Report the schema and route back before I add the real API key.
```

**Gate:** Test send works with a real key. Check spam folder. Confirm
`.env.local` is gitignored.
**Log:** TODO. KNOWN-ISSUES — note email goes to gmail until domain lands.

---

## PHASE 9 — Audit + Verification

**Model:** Opus
**Skills:** `using-superpowers`, `web-design-guidelines`, `vercel-react-best-practices`

```
Use the using-superpowers, web-design-guidelines, and
vercel-react-best-practices skills. Read CLAUDE.md first.

INVESTIGATE AND REPORT ONLY — do not fix anything yet. I want the findings
first, then we decide what's worth fixing.

1. Run the gate:
   pnpm tsc --noEmit && pnpm lint && pnpm build
   Report any errors verbatim.

2. Accessibility audit (web-design-guidelines):
   - Color contrast across every text/background pairing in the palette —
     cream on green, mustard on green, mustard on near-black etc. Flag
     anything under WCAG AA.
   - Keyboard navigation through the entire page, including work card
     expand/collapse
   - Visible focus states everywhere (this was an explicit requirement)
   - Semantic HTML and heading hierarchy
   - Form labels and error announcement
   - prefers-reduced-motion honored in EVERY animated component

3. Performance (vercel-react-best-practices):
   - Client/server component boundaries — is anything a client component
     that doesn't need to be?
   - Image optimization — next/image used properly
   - Font loading strategy
   - Bundle size, especially Framer Motion and Lenis

Report everything as a prioritized list. Do not fix.
```

**Then** a separate scoped prompt per real issue found. One topic each.

**Gate:** Type-check, lint, build all pass. No AA contrast failures. Full
keyboard walkthrough works.
**Log:** KNOWN-ISSUES — anything deliberately deferred.

---

## PHASE 10 — Deploy

**Model:** Haiku
**Skills:** none

Mostly manual:

1. Push to GitHub
2. Import repo in Vercel
3. Add `RESEND_API_KEY` in Vercel → Settings → Environment Variables
4. Deploy — lands on `route90-site.vercel.app`
5. Test the contact form on the live deployment (not just locally)
6. When `route90digital.ca` is purchased: add domain in Vercel, update DNS,
   set up `hello@route90digital.ca` mailbox, verify the domain in Resend,
   switch the send-to address

**Gate:** Live site loads, contact form delivers a real email.
**Log:** TODO — mark launched.

---

## PHASE 11 — Pre-Launch Punch List

Not code — the real-asset swaps that placeholders are standing in for.

| Item | Blocking launch? |
|---|---|
| Real shield logo SVG replacing the placeholder | Yes |
| Real portfolio screenshots/video for all 3 projects | Yes |
| Additional portfolio pieces from your unused mockups | No — post-launch |
| Domain purchased + connected | No — `.vercel.app` works meanwhile |
| `hello@route90digital.ca` mailbox live | No — gmail works meanwhile |
| Favicon + OG image | Yes |
| Basic SEO metadata per section | Yes |

---

## 8. Doc Templates

> **These are reference copies.** The real, fuller versions ship ready-made
> in `route90-repo-docs/` — copy those into the repo in Phase 0 rather than
> retyping from here. This section exists so the manual is self-contained if
> those files ever go missing.

### `CLAUDE.md` (repo root — Claude Code reads this first, every session)

```markdown
# Route90 Site — Locked Decisions

This file is the source of truth. It wins over any other doc. Do not make
decisions that aren't in here — if something's undecided, STOP AND ASK.

## Stack (locked)
Next.js 14+ App Router · TypeScript · Tailwind · Framer Motion · Lenis ·
React Hook Form + Zod · Resend · Vercel · typed .ts data files (NO CMS)

## Palette (exact)
forest green #1F3A2E · near-black #0E0E0E · cream #F0EAD6 ·
mustard #E8A824 · white #FFFFFF

## Visual rules (locked)
- Zero border radius. No soft shadows. Visible hard borders.
- Alternating green/cream color-blocked sections
- Dashed dividers as section separators
- Shield badge recurring as brand anchor
- Motion is structural/mechanical — snap, not float. ~0.3s, no overshoot.
- prefers-reduced-motion respected everywhere

## Naming (locked — this matters)
- "CHAPTER 0X" eyebrow tags: KEEP
- Service badges: PLAIN NUMBERS ONLY (10, 20, 30, 40, 50)
- The word "MILE" appears NOWHERE on this site
- NO driving/trucking/highway metaphor copy anywhere. The visual language
  is road-sign; the WRITING is plain and direct. This distinction is the
  whole point — do not reintroduce puns.

## Content (locked)
All copy comes from the planning docs. Do not invent, reword, estimate, or
"improve" any copy, service name, or price. Missing content = stop and ask.

## Contact
Phone 647-807-9190 · hello@route90digital.ca (domain pending — send to
navi904133@gmail.com meanwhile)

## Workflow rules
- Investigate and report BEFORE fixing
- One topic per prompt
- No auto-commit — leave changes in the working tree
- Visual/runtime claims need a screenshot or real run, not "the diff looks
  right"
- Gate before trusting anything: pnpm tsc --noEmit && pnpm lint && pnpm build
```

### `TODO.md`

```markdown
# Route90 Site — TODO

## Status
Current phase: 0
Last updated: 2026-07-15

## Phases
- [ ] 0 — Repo + docs
- [ ] 1 — Scaffold + implementation plan
- [ ] 2 — Design tokens + typography
- [ ] 3 — Shared primitives
- [ ] 4 — Data layer
- [ ] 5 — Services section (pattern)
- [ ] 6 — Remaining sections
- [ ] 7 — Work section (expandable cards)
- [ ] 8 — Contact form + Resend
- [ ] 9 — Audit + verification
- [ ] 10 — Deploy
- [ ] 11 — Pre-launch punch list

## In Progress
(nothing yet)

## Blocked
(nothing yet)

## Phase Log
<!-- After each phase: what was built, what passed the gate, what changed -->
```

### `KNOWN-ISSUES.md`

```markdown
# Route90 Site — Known Issues

Anything broken, deferred, or worked around. Not a bug tracker for things
being actively fixed — this is the "we know, it's on purpose or it's next"
list.

## Open

| # | Issue | Severity | Phase found | Notes |
|---|---|---|---|---|
| | | | | |

## Placeholders (expected, tracked to Phase 11)

| Item | Replaced by | Blocking launch? |
|---|---|---|
| Shield badge SVG | Real logo asset | Yes |
| /public/work/* images | Real project screenshots | Yes |
| Send-to email (gmail) | hello@route90digital.ca | No |

## Resolved

| # | Issue | Fixed in |
|---|---|---|
| | | |
```

---

## 9. Quick Reference

| Phase | Model | Skills | Output |
|---|---|---|---|
| 0 | Haiku | — | Repo + 3 docs |
| 1 | Opus | using-superpowers, writing-plans, vercel-react-best-practices | PLAN.md + scaffold |
| 2 | Opus | using-superpowers, ui-ux-pro-max, frontend-design | Tokens + fonts |
| 3 | Opus | using-superpowers, frontend-design | 4 shared primitives + Lenis |
| 4 | Sonnet | using-superpowers | /data files |
| 5 | Opus | using-superpowers, frontend-design | Services section |
| 6 | Sonnet | using-superpowers, frontend-design | All other sections |
| 7 | Opus | using-superpowers, frontend-design | Expandable work cards |
| 8 | Sonnet | using-superpowers | Contact form + Resend |
| 9 | Opus | using-superpowers, web-design-guidelines, vercel-react-best-practices | Audit report |
| 10 | Haiku | — | Live site |
| 11 | — | — | Real assets swapped in |

## 10. Still Open (decide before the phase that needs it)

| Decision | Needed by | Notes |
|---|---|---|
| Lenis yes/no | Phase 1 | Recommended yes — see §4 |
| Font choices (3 roles) | Phase 2 | Claude Code proposes, you approve, then it's locked |
| Real shield logo | Phase 11 | Placeholder ships in Phase 3 |
| Portfolio assets | Phase 11 | Placeholders ship in Phase 4 |
