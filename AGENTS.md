# Route90 Site — Locked Decisions

This file is the source of truth for this repo. It wins over any other doc.
Do not make decisions that aren't in here — if something's undecided,
**stop and ask**. Do not improvise.

## Ember Editorial redesign override — locked 2026-09-19

The owner approved a complete visual redesign. This section supersedes the
older Palette, Typography, Visual rules, Motion rules, and WorkCard frame
presentation below. The stack, typed content, contact behavior, static
case-study routes, accessibility requirements, and plain-language naming rules
remain locked.

- Primary canvas `#11100F`; raised dark surface `#1B1714`.
- Primary light/text `#F3EBDD`; secondary paper `#E7DCCB`.
- Copper `#D8683E`, ember `#F39A68`, and oxide `#713226` are atmospheric.
- Signal lime `#C8FF56` is reserved for CTA, focus, and selected states.
- Fraunces is the display face; Public Sans remains body; Martian Mono remains metadata.
- Large containers may use 20–32px radii; controls use 10–16px; pills are for actions/state.
- Retire the shield/grid/dashed/diamond road-sign language in favor of ember
  light, editorial type, warm paper surfaces, and low-contrast hairlines.
- Motion is cinematic but restrained: masked reveals, clipped media entrances,
  and limited hero parallax. No scroll-jacking. Reduced motion renders the end
  state and Lenis remains disabled.
- Service artwork is an abstract-material series with no fake people, offices,
  hands, fake UI, or generic floating 3D icons.

---

## Project

Marketing/portfolio site for **Route90 Digital Solutions** — a Winnipeg-based
solo design and development studio. Single-page, scroll-driven.

**The page's one job:** convince a small business owner to make contact.

Domain: `route90digital.ca` (locked, purchase pending — build against a
`.vercel.app` subdomain meanwhile).

---

## Stack (locked)

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Package manager | pnpm |
| Styling | Tailwind CSS v4 (CSS-first config — `@theme` in globals.css, no tailwind.config.ts) |
| Animation | Framer Motion |
| Smooth scroll | Lenis |
| Forms | React Hook Form + Zod |
| Email | Resend |
| Content | Typed `.ts` data files in `/data` — **no CMS** |
| Hosting | Vercel |
| Utilities | clsx + tailwind-merge, lucide-react (UI chrome icons only) |

React version: 19.2 (ships with Next 16, not independently pinned).
Node version: **22.x** (owner-blessed 2026-07-15; supersedes the global vault
default of 20.x for this project). `engines` set to `>=20`.

**Decision log:** `create-next-app@latest` resolved to Next 16 / React 19 /
Tailwind v4 during Phase 1 scaffold (2026-07-15), ahead of the original
Next 14 / Tailwind v3 assumption. Chosen deliberately — greenfield project,
no legacy code forcing the older baseline, and Tailwind v4's `@theme` block
is a clean fit for this project's small fixed token set. See PLAN.md Phase 1
Step 4 for the resulting config approach.

**Explicitly rejected:** GSAP/ScrollTrigger (Framer Motion covers everything
this design does), Three.js / @react-three/fiber (nothing here needs 3D), any
CMS (owner edits code directly).

---

## Palette (exact — do not adjust)

```
forest green   #1F3A2E   primary panel color
near-black     #0E0E0E   base canvas
cream          #F0EAD6   content panels / high-contrast text areas
mustard yellow #E8A824   accent — badges, dividers, CTAs
white          #FFFFFF   sparingly — shield logo, key contrast moments
```

---

## Typography (locked — Phase 2, "Interstate")

Three roles, self-hosted via `next/font` (no layout shift, no runtime request).
Wired in `app/layout.tsx`; tokens in `app/globals.css` `@theme`.

| Role | Font | Utility | Use |
|---|---|---|---|
| Display | **Anton** (400) | `font-display` | Condensed ultra-bold all-caps headlines/labels |
| Body | **Public Sans** | `font-body` / default | Body copy, plain and direct |
| Mono | **Martian Mono** | `font-mono` | Numbers, `CHAPTER 0X` tags, status/metadata |

Owner-approved 2026-07-15. Do not swap without approval.

---

## Visual rules (locked)

- **Zero border radius.** No rounded corners anywhere.
- **No soft shadows.** Hard, visible borders instead (2px+ on panels).
- Section background sequence (locked, verified against the original Emergent
  export via pixel sampling — NOT a simple green/cream alternation):
    - Hero: ink (#0E0E0E, with grid-pattern texture)
    - TickerStrip: mustard bar
    - About (Ch 01): cream
    - Services (Ch 02): ink (#0E0E0E) — panels inside are green header + cream
      body, but the section field itself is near-black
    - Work (Ch 03): forest
    - Pricing (Ch 04): cream
    - Contact/Footer (Ch 05): forest
  Each section uses Section.tsx's tone prop: 'forest' | 'cream' | 'ink'.
- **Grid-pattern texture on near-black (#0E0E0E) canvas sections only** —
  faint square grid lines behind Nav and Hero (confirmed against the
  original Emergent export: it spans the full hero, not just the nav strip).
  Forest-green and cream panels stay flat — no texture, color-block only. Do
  not apply the grid to green/cream sections.
- Dashed-line dividers as deliberate section separators.
- Shield/route badge recurring as the brand anchor (nav, hero, about, footer).
- Grid-based, boxed content — bordered cells, not floating cards.
- Fully responsive; boxy panels stack cleanly on mobile **without** losing
  the bordered/blocked feel.

## Motion rules (locked)

- **Structural and mechanical, not soft and ambient.** Panels *snap* into
  place like signage locking in — they do not float or drift up.
- Short durations (~0.3–0.4s), minimal-to-no overshoot.
- `whileInView` with `once: true`.
- Dashed dividers may "draw on" via `strokeDashoffset` on scroll.
- **`prefers-reduced-motion` respected in every animated component**, via
  `useReducedMotion()`. Reduced motion = render the end state, no animation.
  Lenis disabled entirely under reduced motion.

---

## Naming (locked — this matters most)

- **"CHAPTER 0X" eyebrow tags: KEEP.** This is the macro section numbering.
- **Service badges: `01` / `02` / `03` / `04` / `05`** — zero-padded, matches the
  CHAPTER 0X eyebrow format. Plain numbers only, never "MILE 01". Resolved
  2026-07-16, overriding the earlier `10`/`20`/`30`/`40`/`50` shown in drafts of
  this doc and in the standalone pricing-sheet PDF — those are now stale on this point.
- **The word "MILE" appears NOWHERE on this site.**
- **NO driving / trucking / highway metaphor copy anywhere.**

The distinction is the entire point and must not be blurred: the **visual
language** is road-sign. The **writing** is plain and direct. Rejected copy
from the original mockup included "Behind the Wheel," "Let's Roll Out,"
"Start the Trip," "worth pulling over for," "Not sure which mile? Let's map
it." Do not reintroduce puns of this kind under any framing.

---

## Reference docs (in this repo)

The full planning docs live in `/docs` in this repo. Read them when you need
content — do not work from memory or assumption, and do not ask the user to
paste them.

| File | Contains |
|---|---|
| `docs/route90-BUILD-MANUAL.md` | The phased build plan — every phase, prompt, and gate |
| `docs/route90-service-copy-pricing.md` | **All service copy and pricing.** Source of truth for `data/services.ts` and `data/pricing.ts` |
| `docs/route90-full-site-copy.md` | **All other site copy** — hero, about, work, contact, footer. Source of truth for `data/site.ts` |
| `docs/route90-build-guide.md` | Component breakdown derived from the original mockup |

**This file (`AGENTS.md`) wins over anything in `/docs` if they conflict.**
The `/docs` files are allowed to go stale; this one is not. If you spot a
conflict between them, surface it and stop — don't pick one silently.

The owner also keeps copies in their Obsidian vault at
`~/Documents/NavdeepVault/Projects/Route90_Digital/` — that folder also
contains the **original mockup export**
(`milepost-studio.preview.emergentagent.com-.../`), which is real source
code from the Emergent-built mockup, not just a screenshot. That vault
folder is outside this repo and not something you read directly — but if
the owner copies the mockup export into this repo (e.g. `/reference/`),
inspect it directly for the actual markup/component structure rather than
reconstructing sections from the screenshot description in
`route90-build-guide.md`. Treat anything in `/reference` as a visual/structural
reference only — it does not override the locked naming, copy, or stack
decisions in this file.

---

## Content (locked)

All copy comes from the planning docs in `/docs` (see table above).

**Do not invent, reword, estimate, or "improve" any copy, service name, or
price.** Missing content = stop and ask.

### Page order

```
Nav → Hero → TickerStrip → About (Ch 01) → Services (Ch 02) →
Work (Ch 03) → Pricing (Ch 04) → Contact/Footer (Ch 05)
```

### Data interfaces

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
  platform: "web" | "mobile";  // determines WorkCard frame + collapsed layout
  thumbnail: string;
  cardDescription: string;   // short — collapsed card state
  description: string;       // full — expanded state
  media: { type: "image" | "video"; src: string }[];
  link?: string;
}
```

**WorkItem note:** Split from a single `description` field on 2026-07-16 to
support short teaser (collapsed) vs full case-study (expanded) card states.
`platform` added 2026-07-17 — see "WorkCard frame rules (locked)" below.

`work.ts` must be unbounded — the grid supports any number of items, not a
fixed 3. More projects get added later.

---

## WorkCard frame rules (locked — 2026-07-17, revised)

The collapsed card is a `<Link href="/work/[slug]">` — clicking it navigates
to a dedicated case-study page (see below), NOT an in-place modal/expand. It
branches on the `WorkItem.platform` field:

- **platform: "web"** — vertical stack. Browser-chrome frame (three
  window-dots + a mono URL/slug label) on top, full card width,
  `object-fit: cover` cropped to the fixed content-zone height. Title +
  status bar and a 1-line-clamped `cardDescription` below the frame.

- **platform: "mobile"** — horizontal split at the `sm` breakpoint and
  above. Phone-screenshot frame (`object-fit: cover object-top`) that
  cover-fills a fixed-width left column (~150px, `shrink-0` so the text
  sibling can never compress it to icon size). Title + 5-line-clamped
  `cardDescription` in the remaining right column. **Below `sm`, reverts to
  the stacked layout** (frame on top full width, text below) — consistent
  with the site-wide "boxy panels stack cleanly on mobile" rule.

- **Both platforms**: the collapsed content zone is a FIXED 188px height
  (excluding the green title/status bar) so grid rows stay uniform
  regardless of platform. Both branches read it from ONE `CONTENT_ZONE_H`
  constant via a `--zone` CSS var on the card root — never a magic number
  duplicated per branch. The Work track is a single flex row (align
  stretch), so all cards equalize to the tallest.

- **Rounded-corner exception**: the phone-screenshot frame (card) and the
  phone-bezel hero (case-study page) ONLY may use `border-radius` to read as
  a physical device. This is the single deliberate exception to the "zero
  border radius anywhere" rule — flag it in a code comment so it isn't
  "fixed" later as a regression. No other element on the site gets rounded
  corners.

### Case-study pages (`/work/[slug]`)

- App Router dynamic route, `generateStaticParams` + `dynamicParams = false`
  — one static page per work item at build time, unknown slugs 404.
- Full viewport, real page scroll. Large hero screenshot (phone-bezel for
  mobile, browser-chrome for web), then the full `description` (not the
  clamped `cardDescription`), then the rest of `media[]` if more than one,
  then a styled "Back to Work" link that anchor-scrolls to `/#work`.
- Same locked palette / hard borders / zero-radius-except-bezel — same
  design system, different route. Server component (no client JS).

Confirmed project platforms:
- SplitHouse — mobile
- BorderLog — mobile
- Route90 Invoicer — web
- Route90 Trucking (`route90-trucking`) — web

---

## Contact

- Phone: `647-807-9190`
- Email (displayed on site): `route90digital@gmail.com`
- Contact form send-to (`CONTACT_TO_EMAIL` env var, in `.env.local`,
  gitignored): currently also `route90digital@gmail.com` — same mailbox as
  the displayed address for now. `KNOWN-ISSUES.md` and
  `docs/route90-BUILD-MANUAL.md` still say the send-to is
  `navi904133@gmail.com`; that's stale against the current `.env.local` and
  hasn't been reconciled yet.
- Location: Winnipeg, MB · Canada
- Hours: Mon–Fri · 9–5 CST

---

## Workflow rules (non-negotiable)

1. **Investigate and report BEFORE fixing.** Surface findings; don't write
   code until the fix is agreed.
2. **One topic per prompt.** No mega-diffs touching five things.
3. **No auto-commit.** Leave everything in the working tree for manual review.
4. **Verification gate** before anything is trusted:
   `pnpm tsc --noEmit && pnpm lint && pnpm build`
5. **Visual/runtime claims need proof** — a screenshot or an actual run. "The
   diff looks right" is not confirmation.
6. **Conflicts get surfaced, not silently resolved.** If two docs disagree,
   say so and stop.

---

## Known placeholders (tracked in KNOWN-ISSUES.md)

- `ShieldBadge.tsx` — placeholder SVG, real logo asset pending. Structure the
  path so it's trivially swappable.
- `/public/work/*` — placeholder images, real project screenshots pending.
- Contact form send-to address — gmail until the domain lands.

---

## Currently undecided (STOP AND ASK if you hit these)

_Nothing currently undecided._

_Resolved: fonts (Phase 2, 2026-07-15) — see Typography (locked). Service-badge
numbering = 01–05 (D2, 2026-07-16) — see Naming (locked)._
