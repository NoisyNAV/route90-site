---
tags: [locked-decision, route90, workcard]
created: 2026-07-17
status: locked
---

# WorkCard — Platform-Specific Frame Layout (Locked)

Paste the sections below into the real repo docs — the "CLAUDE.md addendum"
section into `CLAUDE.md`, the "build-guide addendum" into
`docs/route90-build-guide.md`. Then run the Claude Code prompt at the
bottom as a Phase 7 (or Phase 7-revision) session.

---

## CLAUDE.md addendum

Add under the existing "Naming (locked)" or a new "WorkCard frame rules
(locked)" section:

```markdown
## WorkCard frame rules (locked)

WorkItem gets a new field:

  platform: "web" | "mobile"

Collapsed-card layout branches on `platform`:

- **platform: "web"** — vertical stack. Browser-chrome frame (three dots +
  fake address bar) on top, `object-fit: cover` cropped to a fixed
  content-zone height. Title + 1-line clamped description below the frame.

- **platform: "mobile"** — horizontal split at `sm` breakpoint and above.
  Phone-bezel frame (object-fit: contain, scaled to fit) in a fixed-width
  left column (~110px). Title + 5-line clamped description in the
  remaining right column. **Below `sm`, reverts to stacked** (frame on
  top, text below) — consistent with the site-wide "boxy panels stack
  cleanly on mobile" rule already locked elsewhere in this file.

- **Both platforms**: collapsed-card content zone is a FIXED height
  (188px, excluding the green header bar) so grid rows stay uniform
  regardless of which platform a given card is. Full description + media
  gallery still only render in the expanded state — unchanged from the
  original spec.

- **Rounded-corner exception**: the phone-bezel frame only may use
  `border-radius` (~14–18px) to read as a physical device silhouette.
  This is a narrow, deliberate exception to "zero border radius,
  anywhere" — no other element on the site gets rounded corners.

Confirmed project platforms:
- SplitHouse — mobile
- BorderLog — mobile
- Route90 Invoicer — web
- Route90 Trucking (slug `route90-trucking`, "Dark-Mode Freight
  Website", COMMISSIONED) — web
```

---

## route90-build-guide.md addendum

Update the `WorkItem` interface in the "Content Data Shape" section:

```ts
export interface WorkItem {
  slug: string;
  title: string;
  status: "LIVE PROD" | "INTERNAL TOOL" | "COMMISSIONED";
  platform: "web" | "mobile";   // NEW — determines WorkCard frame + layout
  thumbnail: string;
  cardDescription: string;      // short — collapsed card state
  description: string;          // full — expanded card state
  media: { type: "image" | "video"; src: string }[];
  link?: string;
}
```

**Note:** `platform` is the ONLY new field. The `cardDescription` /
`description` split is already locked (2026-07-16) and rendered in
`WorkCard.tsx` — do not collapse it back to a single `description`.

---

## Claude Code prompt (Phase 7 — WorkCard platform layout)

One topic: the collapsed-card frame/layout logic only. Does not touch
expanded-state behavior, Contact, Pricing, or any other section.

```
Use the using-superpowers and frontend-design skills. Read CLAUDE.md first
— it now has a locked "WorkCard frame rules" section this prompt
implements.

Update components/WorkCard.tsx (and data/work.ts's WorkItem type, and the
4 existing entries) so the collapsed card branches on a new `platform`
field:

1. Add `platform: "web" | "mobile"` to the WorkItem interface in
   data/work.ts (alongside — not replacing — the existing cardDescription /
   description split). Set platform for the 4 existing entries per CLAUDE.md
   (SplitHouse: mobile, BorderLog: mobile, Route90 Invoicer: web,
   route90-trucking: web).

2. WorkCard.tsx collapsed state:
   - platform "web": existing browser-chrome frame, full card width, on
     top. Title + description below, description clamped to 1 line
     (line-clamp-1). Frame content-zone is a fixed height (use a shared
     constant, not a magic number repeated in both branches).
   - platform "mobile": phone-bezel frame in a fixed-width (~110px) left
     column at `sm:` breakpoint and above, object-fit: contain, scaled to
     the same fixed content-zone height as the web variant. Title +
     description (line-clamp-5) in the remaining right column, separated
     by a 1px border. Below `sm`, stack vertically instead (frame on top
     full width, text below) — reuse whatever stacking pattern the rest
     of the site already uses at this breakpoint, don't invent a new one.
   - Both variants: total collapsed-card height must match regardless of
     platform, so the Work grid's rows stay even.

3. Phone-bezel frame gets `border-radius` (~14–18px) — flag in a code
   comment that this is the one locked exception to the site's
   zero-border-radius rule, so nobody "fixes" it later thinking it's a
   regression.

4. Expanded state is UNCHANGED — full description, media gallery, link —
   this prompt only touches the collapsed card.

Screenshot the grid with all 4 real work items (2 mobile-platform, 2
web-platform) at 375px and desktop width before reporting done. Confirm
row heights are visually even. No commit.
```

**Gate:** screenshots at 375px + desktop, row heights visually even
across mixed platforms, reduced-motion pass (existing WorkCard motion
should be untouched by this change), keyboard pass on card focus/expand
still works.

**Log to TODO.md / KNOWN-ISSUES.md:** note this as a Phase 7 revision if
Phase 7 was already run once with the old single-frame-type design.
