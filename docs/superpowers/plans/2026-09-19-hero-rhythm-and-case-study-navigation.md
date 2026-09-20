# Hero Rhythm and Case-Study Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebalance the desktop hero and add bounded previous/next navigation to every generated case-study page.

**Architecture:** Responsive sizing remains in the existing Hero and Nav Tailwind classes. A focused server component renders project navigation, while the dynamic case-study route derives adjacent items from the canonical `work` array so ordering remains data-driven and unbounded.

**Tech Stack:** Next.js 16 App Router, React 19 server/client components, TypeScript, Tailwind CSS v4, Framer Motion.

---

### Task 1: Rebalance the responsive hero and navigation

**Files:**
- Modify: `components/Hero.tsx`
- Modify: `components/Nav.tsx`

- [x] **Step 1: Update the hero's tablet/desktop height and alignment**

Keep the existing mobile `min-h-[92svh]`. At `md`, use `md:min-h-[76svh]` on the section and `md:min-h-[calc(76svh-9rem)] md:items-center` on the content grid. Retain the existing two-column breakpoint and all motion/copy.

- [x] **Step 2: Increase tablet/desktop navigation breathing room**

Add `md:px-6 md:py-3` to the navigation island, change the desktop link gap from `gap-6` to `gap-7 lg:gap-8`, and use `text-[15px]` for desktop links. Keep the current mobile menu and `max-w-[1440px]` constraint.

- [x] **Step 3: Run static checks**

Run: `pnpm tsc --noEmit && pnpm lint`

Expected: both commands exit `0` with no diagnostics.

### Task 2: Add bounded project navigation

**Files:**
- Create: `components/ProjectNavigation.tsx`
- Modify: `app/work/[slug]/page.tsx`

- [x] **Step 1: Create the server navigation component**

Define props using `WorkItem | null` for `previous` and `next`. Render enabled destinations as `Link` elements to `/work/${slug}` and unavailable destinations as non-focusable `span aria-disabled="true"` elements. Render the center `/\#work` link at all times. Use a one-column mobile grid and `sm:grid-cols-[1fr_auto_1fr]` on larger screens.

- [x] **Step 2: Derive adjacent projects from canonical data**

After resolving `item`, compute:

```ts
const currentIndex = work.findIndex((entry) => entry.slug === slug);
const previous = currentIndex > 0 ? work[currentIndex - 1] : null;
const next = currentIndex < work.length - 1 ? work[currentIndex + 1] : null;
```

Import and render `ProjectNavigation` before `Footer`, replacing the current single bottom Back link. Keep the header Back link unchanged.

- [x] **Step 3: Verify generated route behavior**

Run: `pnpm build`

Expected: build succeeds and lists all four `/work/[slug]` static routes.

### Task 3: Visual and interaction verification

**Files:**
- Verify only; no production files created.

- [x] **Step 1: Capture responsive hero screenshots**

Capture `/` at `375x812`, `980x1000`, and `1440x1000`. Confirm mobile remains stacked; 980px and 1440px show a balanced two-column hero around three-quarters viewport height with a readable navigation island.

- [x] **Step 2: Verify navigation edge states**

Check `/work/splithouse`, `/work/route90-invoicer`, and `/work/route90-trucking`. Confirm the first page disables Previous, the middle page enables both directions, and the last page disables Next without wrapping.

- [x] **Step 3: Run the final gate**

Run: `pnpm tsc --noEmit && pnpm lint && pnpm build`

Expected: all commands exit `0`; no untracked temporary verification files remain in the repository.

- [x] **Step 4: Restart the preview**

Restart `pnpm exec next start -H 0.0.0.0 -p 3000` and confirm it reports `Ready`. Leave changes uncommitted per repository workflow.
