---
tags: [copy, route90]
created: 2026-07-15
status: draft-for-review
---

# Route90 — Site Copy, Part 2 (Hero / About / Work / Contact / Footer)

Continues from `route90-service-copy-pricing.md`. Same rule: keep the
Chapter/number badge system, drop driving-metaphor language everywhere
else.

---

## Nav

`Websites` `Apps` `Print` `Brand Systems` `Winnipeg` `Route 90` stays as
nav/badge tags — these are just service categories + location, not a
metaphor, no change needed.

CTA button (top-right): **Get in Touch** *(was "Get in Touch" already —
keep)*

---

## Chapter 00 — Header / Hero

**Eyebrow tag:** `LET · WINNIPEG, MB · DEVELOPMENT STUDIO`

**Headline:** ROUTE 90 DIGITAL SOLUTIONS *(unchanged — this is the logo
lockup, not copy)*

**Subheadline:**
> We build websites, apps, and print for Winnipeg small businesses —
> clean design, built to last, done right the first time.

**CTA button:** **See the Services** *(replaces "Start the Trip ...")*

---

## Chapter 01 — Who's Behind It → "About Route90"

**Section label:** `WHO — SECTION 01`

**Pull-quote (kept bold, dropped the "highway" line):**
> "Every small business deserves a brand that looks like it belongs —
> bold, clear, impossible to miss."

**Body copy:**
> Route90 is a Winnipeg design and development studio run by one founder
> who talks directly with every client. No account managers, no handoffs
> — just clear planning, honest pricing, and work that doesn't take a
> third revision to get right.

**Tags below (kept, these are just service labels):** `WEB + APP` ·
`PRINT + COLLATERAL` · `BRAND SYSTEM` · `WINNIPEG-BASED`

---

## Chapter 02 — Services

Section label: `CHAPTER 02 — SERVICES` (was "THE MILES")

Intro line above the panels:
> Five ways to work together — pick one, or bundle them.

*(Panel content = the service copy/pricing doc, already drafted.)*

---

## Chapter 03 — Selected Work

Section label: `CHAPTER 03 — SELECTED WORK` *(was "THE WORK" — fine as-is,
kept mostly unchanged, just aligned numbering)*

**Intro line:**
> A few recent projects — real products, shipped and running.

Project labels: **SplitHouse**, **Route90 Invoicer**, **BorderLog**,
**Route90 Trucking** — with the small badge-style status tags (`LIVE PROD`,
`INTERNAL TOOL`, `COMMISSIONED`).

**Interaction (new, locked):** cards are expandable, not static. Collapsed
state = current mockup card (screenshot, title, tag). Clicking/tapping
opens the card with an animation into an expanded view showing:
- Full project description
- Screenshot gallery or embedded video
- A "View Project" link (external, if live)

This means `WorkCard.tsx` needs a collapsed/expanded state (Framer Motion
`layout` animation is the natural fit) rather than being purely static.
Grid should support any number of cards, not just 3 — more real projects
and mockups are coming later.

---

## Chapter 04 — Pricing Sheet

Section label: `CHAPTER 04 — PRICING`

**Intro line:**
> Straightforward pricing. What's included, starting price, no surprise
> line items.

**CTA button:** **Request a Quote** *(was "Request a Quote ..." — keep)*

**Footer note under table:** **Not sure what you need? Let's talk it
through.** *(replaces "Not sure which mile? Let's map it.")*

---

## Chapter 05 — Contact / Footer

Section label: `LET'S TALK` *(replaces "LET'S ROLL OUT")*

**Headline:** ROUTE 90 *(kept — logo mark, not copy)*
**Sub:** DIGITAL SOLUTIONS *(kept)*

**Body copy:**
> Tell us about your project. We'll scope the work and send a
> straightforward quote — no jargon, no pressure.

**Form fields (unchanged, already generic):** Name, Email, Business Name,
Which Chapter (optional — dropdown of the 5 services), Tell us about your
project (textarea)

**Submit button:** **Send It** *(fine as-is — plain, not a driving pun)*

**Footer strip:**
- Left: `HELLO@ROUTE90DIGITAL.CA` · `647-807-9190`
- Right: `WINNIPEG, MB · CANADA` · `MON–FRI · 9–5 CST`
- Bottom bar: `© 2026 ROUTE 90 DIGITAL SOLUTIONS` · `BUILT IN WINNIPEG, MB`

**Domain: `route90digital.ca` (locked, not yet purchased).** Build the
email as `hello@route90digital.ca` now — it'll just need the actual mailbox
set up once the domain's bought. Phone stays `647-807-9190` in the
meantime.

---

## Summary — Everything Renamed

| Original | New |
|---|---|
| Who's Behind the Wheel | About Route90 |
| The Miles | Services |
| Let's Roll Out | Let's Talk |
| Start the Trip (CTA) | See the Services |
| Not sure which mile? Let's map it. | Not sure what you need? Let's talk it through. |
| The Work | Selected Work *(kept, just renumbered)* |
| "...no shortcuts" (hero) | "...done right the first time" |
| "worth pulling over for" (Work intro) | "real products, shipped and running" |
| "Tell us where you're headed" (contact) | "Tell us about your project" |

Everything else (nav tags, chapter numbers, badge system, "Send It",
"Request a Quote") had no road/driving language to begin with and stays
untouched. Full sweep done — no remaining trucking/highway phrasing
anywhere in the copy.

## Resolved

- Domain: `route90digital.ca` (locked, pending purchase)
- Print pricing: flat "Starting at $40" on-site
- Work section: expandable cards with description, media, and link — spec
  above
