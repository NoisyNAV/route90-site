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
| — | _(none yet)_ | | | |

Severity scale: **Blocker** (can't launch) · **Major** (visible to users,
launching anyway) · **Minor** (cosmetic/internal) · **Deferred** (deliberate,
scheduled).

---

## Placeholders

Expected, deliberate, tracked to Phase 11. Not bugs — but they *are* launch
blockers where marked.

| Item | Introduced | Replaced by | Blocking launch? |
|---|---|---|---|
| `ShieldBadge.tsx` placeholder SVG | Phase 3 | Real logo asset (clean vector, owned) | **Yes** |
| `/public/work/splithouse-*` (1×1 placeholder) | Phase 4 | Real SplitHouse screenshots/video | **Yes** |
| `/public/work/route90-invoicer-*` (1×1 placeholder) | Phase 4 | Real Route90 Invoicer screenshots/video | **Yes** |
| `/public/work/borderlog-*` (1×1 placeholder) | Phase 4 | Real BorderLog screenshots/video | **Yes** |
| `/public/work/route90-trucking-*` (1×1 placeholder) | Phase 4 | Real Route90 Trucking screenshots/video | **Yes** |
| Contact form send-to = `navi904133@gmail.com` | Phase 8 | `hello@route90digital.ca` once domain lands | No |
| Deployed at `*.vercel.app` | Phase 10 | `route90digital.ca` | No |
| Favicon / OG image | — | Real assets | **Yes** |

---

## Watch List

Things that aren't broken but are worth keeping an eye on.

| Item | Why it's here |
|---|---|
| Framer Motion + Lenis bundle size | Two motion-adjacent libs. Check the bundle at Phase 9; if Lenis isn't earning its ~3kb, drop it. |
| Contrast: mustard `#E8A824` on cream `#F0EAD6` | Likely fails WCAG AA for body text. Fine for large display type / borders — flag any small text using this pair at Phase 9. |
| Contrast: cream on forest green | Should pass, but verify rather than assume at Phase 9. |
| Work card focus trap | Expandable cards need proper focus management. Easy to regress if the card is refactored later. |

---

## Resolved

| # | Issue | Found | Fixed in | Notes |
|---|---|---|---|---|
| — | _(none yet)_ | | | |
