# Route90 Site — Known Issues

Anything broken, deferred, or worked around. **Not** an active bug tracker —
this is the "we know about it, it's on purpose or it's scheduled" list.

If an issue is being fixed right now, it lives in `TODO.md` → In Progress.
It only lands here if it's staying broken for a while.

**Last updated:** 2026-07-15

---

## Open

| # | Issue | Severity | Phase found | Notes |
|---|---|---|---|---|
| 1 | No mobile nav menu | Minor | Phase 6 | Nav section-links are `hidden md:flex`; on <768px only the wordmark + "Get in Touch" CTA show. Needs a hamburger/drawer. Revisit at Phase 9 audit. |

Severity scale: **Blocker** (can't launch) · **Major** (visible to users,
launching anyway) · **Minor** (cosmetic/internal) · **Deferred** (deliberate,
scheduled).

---

## Placeholders

Expected, deliberate, tracked to Phase 11. Not bugs — but they *are* launch
blockers where marked.

| Item | Introduced | Replaced by | Blocking launch? |
|---|---|---|---|
| `/public/work/splithouse-*` (1×1 placeholder) | Phase 4 | Real SplitHouse screenshots/video | **Yes** |
| `/public/work/route90-invoicer-*` (1×1 placeholder) | Phase 4 | Real Route90 Invoicer screenshots/video | **Yes** |
| `/public/work/borderlog-*` (1×1 placeholder) | Phase 4 | Real BorderLog screenshots/video | **Yes** |
| `/public/work/route90-trucking-*` (1×1 placeholder) | Phase 4 | Real Route90 Trucking screenshots/video | **Yes** |
| Contact form send-to = `route90digital@gmail.com` | Phase 8 | Domain mailbox once available | No |
| Deployed at `*.vercel.app` | Phase 10 | `route90digital.ca` | No |
| Favicon | — | Final owned brand icon | **Yes** |

---

## Watch List

Things that aren't broken but are worth keeping an eye on.

| Item | Why it's here |
|---|---|
| Framer Motion + Lenis bundle size | Two motion-adjacent libs. Check the bundle at Phase 9; if Lenis isn't earning its ~3kb, drop it. |
| Framer Motion hydration | Core content must never depend on a hidden initial state; anchor navigation previously exposed this failure mode. |

---

## Resolved

| # | Issue | Found | Fixed in | Notes |
|---|---|---|---|---|
| 1 | Placeholder shield blocked launch | Phase 3 | Ember redesign | Shield retired; text wordmark is the approved identity treatment. |
| 2 | Missing OG image and metadata | Phase 11 | Ember redesign | Added a 1200×630 local social card and Open Graph/Twitter metadata. |
