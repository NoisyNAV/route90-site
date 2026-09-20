# Hero Rhythm and Case-Study Navigation

Date: 2026-09-19
Status: approved design, pending implementation

## Goal

Correct the desktop hero's visual proportion so it carries comparable weight to the sections that follow, and let visitors move sequentially between project case studies without returning to the work index.

## Responsive hero

- Keep the current stacked mobile composition below the `md` breakpoint.
- Keep the current two-column headline/CTA composition at `md` and above.
- Give the desktop/tablet hero a minimum height of approximately `76svh`.
- Vertically balance the headline and CTA within that height instead of pinning both to an excessively short panel.
- Preserve the existing gradient, typography, copy, CTA, animation, and reduced-motion behavior.
- Increase the navigation island's tablet/desktop height, link size, and horizontal spacing slightly so it does not look compressed beside the wider hero.
- Keep the navigation within its existing `1440px` maximum width and retain the mobile menu behavior.

## Case-study navigation

- Add a project navigator near the bottom of every `/work/[slug]` page, before the footer.
- Present three destinations: previous project, back to all work, and next project.
- Derive previous and next projects from their order in the unbounded `work` array; do not duplicate project metadata.
- The first project has a visibly disabled Previous control.
- The last project has a visibly disabled Next control. Navigation does not loop.
- Enabled project controls include the destination project's title so visitors know what they will open.
- Desktop uses a three-column row; mobile stacks or wraps into large touch-friendly controls.
- Use semantic links for enabled destinations and non-interactive, `aria-disabled="true"` elements for unavailable destinations.
- Preserve static generation, `dynamicParams = false`, existing case-study media/content, and the current Back to Work header link.

## Verification

- Run `pnpm tsc --noEmit`, `pnpm lint`, and `pnpm build`.
- Capture the hero at 375px, 980px, and 1440px widths.
- Verify first, middle, and last project navigation states.
- Confirm keyboard focus visibility and that disabled controls cannot receive focus or navigate.
- Confirm the mobile menu remains functional and reduced-motion behavior is unchanged.

## Scope boundaries

- No copy, pricing, project order, data interfaces, case-study content, or media changes.
- No new dependency.
- No automatic commit; the repository workflow requires changes to remain in the working tree for review.
