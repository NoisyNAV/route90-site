# Route90 “Ember Editorial” Redesign Specification

**Status:** Approved direction — Option A selected by the owner on 2026-09-19

## Outcome

Redesign Route90 Digital Solutions as a warm, editorial, high-contrast studio site that feels authored rather than templated. The page should remain direct and conversion-focused, but gain cinematic pacing, richer project presentation, a coherent image system, and a memorable visual identity.

The design must feel better than the current road-sign system without becoming a generic dark agency template. It should read as a small independent studio with strong taste: serious, warm, practical, and confident.

## Design idea

The visual theme is **Ember Editorial**.

The reference mockup’s circular “Mars” shape becomes an abstract **ember lens**, not a literal planet. It is a cropped field of copper light, soft grain, and uneven radial falloff that acts as a recurring source of warmth. Its job is to create depth and a directional light source, not to become an illustration or mascot.

The site combines:

- an ink-black/brown canvas;
- warm cream typography;
- copper and rust atmospheric light;
- a single acid-lime action color;
- oversized editorial serif headlines;
- compact mono labels and indexes;
- long, calm sections with asymmetric composition;
- authored project and service imagery without stock-photo people.

## Visual system

### Palette

| Token | Value | Use |
|---|---:|---|
| Ember ink | `#11100F` | Primary canvas |
| Carbon | `#1B1714` | Raised/alternate dark surfaces |
| Warm cream | `#F3EBDD` | Primary text and light sections |
| Paper | `#E7DCCB` | Secondary light surface |
| Copper | `#D8683E` | Atmospheric light and large decorative type |
| Ember | `#F39A68` | Gradient highlight |
| Oxide | `#713226` | Gradient depth |
| Signal lime | `#C8FF56` | Primary CTA, focus, selected state |
| Smoke | `#A69B8E` | Muted text on dark surfaces |

Copper is not used for small text because its contrast is unreliable. Signal lime is used sparingly: primary actions, active controls, and keyboard focus.

### Gradients and texture

Primary ember lens:

```css
background:
  radial-gradient(circle at 32% 28%, #F39A68 0%, #D8683E 22%, #713226 48%, transparent 70%);
```

Ambient hero field:

```css
background:
  radial-gradient(ellipse at 78% 34%, rgb(216 104 62 / 28%) 0%, transparent 52%),
  linear-gradient(180deg, #11100F 0%, #17120F 100%);
```

The lens receives a subtle CSS noise layer or a small locally stored monochrome noise texture. Grain opacity stays under `0.05`. No animated blur is used on scrolling containers.

### Typography

- Display: **Fraunces**, variable weight, used for large editorial headlines.
- Body: **Public Sans**, retained for clarity and to avoid unnecessary font churn.
- Metadata: **Martian Mono**, retained for section numbers, project state, and compact labels.

Headlines use tight tracking, optical line breaks, and `text-wrap: balance`. Body copy is limited to roughly 60–68 characters per line. Not every heading is uppercase; sentence case provides contrast against the compact mono labels.

### Shape and surface language

- Large containers use restrained radii in the `20–32px` range.
- Inner controls use `10–16px` radii.
- Pills are reserved for CTAs, filters, and compact state labels.
- Borders are low-contrast warm hairlines, not white boxes around everything.
- Shadows are tinted brown/copper and very diffuse.
- Light sections feel like heavy paper laid over the dark page.
- Images may bleed beyond the text grid, but interactive content remains aligned to a consistent container.

## Page flow

### 1. Floating navigation

A compact, detached navigation island sits near the top rather than using an edge-to-edge bar. It contains a text mark (`R90 / DIGITAL`), four anchors, and the primary “Get in Touch” action. On mobile it becomes a wordmark plus menu button and accessible full-screen sheet.

The existing placeholder shield is retired from the main interface. It can remain in the repository until a real logo decision is made, but it is not part of the new visual identity.

### 2. Hero: the ember lens

The hero uses the existing Route90 headline and copy. The composition is asymmetric:

- left: oversized serif wordmark/headline;
- lower left: supporting copy and CTA;
- right: cropped ember lens with a small capability index floating over it;
- bottom: a compact service/capability rail replacing the old ticker.

The lens moves subtly with scroll: a maximum of about 24px translation and 3% scale. The text does not drift. On initial load, headline lines reveal through masks and the CTA settles in after them.

### 3. About: founder-led proof

The About section becomes a cream editorial spread. The pull quote is large and serif-led; the body copy and capability tags form a narrow right column. A small “one founder / direct contact” proof note reinforces the studio model without adding invented marketing claims.

### 4. Services: five authored visual chapters

Services become a vertical sequence rather than equal cards. Each service row contains:

- large number;
- title and exact existing copy;
- feature list and starting price;
- a dedicated art frame.

Desktop alternates image left/right to create rhythm. Mobile becomes a clean stack. A sticky service index may be used on desktop only if it remains usable without scroll hijacking.

The five service visuals form one coherent abstract-material series:

1. Website & App Design — luminous glass slab with a fine interface grid.
2. Print Design & Sourcing — folded paper, ink registration marks, and material edges.
3. Content Creation — lens/prism, reflected light, and a cropped frame motif.
4. Digital Handling — layered signal bands and a controlled pulse/wave pattern.
5. Bundle Packages — stacked material tiles combining the previous four visual cues.

No fake people, fake offices, floating 3D icons, or generic AI hands. Assets are generated as abstract editorial still lifes, then reviewed individually. If an asset reads as obviously generated, the plan falls back to CSS/SVG composition rather than shipping it.

### 5. Work: cinematic proof

Keep the dedicated case-study routes. Homepage cards become larger and less boxed:

- one featured project spans more width;
- remaining projects form an asymmetric two-column flow;
- mobile projects retain device-shaped media where appropriate;
- card descriptions and status remain exact from data;
- hover reveals a subtle copper wash and directional arrow.

Project screenshots replace service-style artwork wherever real product media is available. Current placeholders remain visibly tracked as launch blockers.

### 6. Pricing: quiet ledger

Pricing becomes a warm-cream ledger with generous row spacing. The number, service name, included items, and price align across a responsive grid. Mobile rows collapse into labelled blocks without horizontal scrolling.

The “Request a Quote” action is visually tied to Contact through the signal-lime button treatment.

### 7. Contact: final glow

The final section returns to the dark canvas with a wider ember field behind the heading. The form uses large, calm fields with visible labels, inline validation, and an unmistakable submit state. Existing React Hook Form, shared Zod schema, honeypot, API route, and Resend flow remain intact.

The footer is minimal: contact details, location, hours, and copyright. It does not reintroduce the shield or road-sign motifs.

## Motion system

Motion supports the reading sequence:

- hero headline: masked line reveal;
- ember lens: limited scroll-linked translate/scale;
- section labels: quick opacity/translate reveal;
- service artwork: clipped reveal with slight opposing movement;
- work media: image scale from `1.02` to `1` as it enters;
- pricing rows: short stagger, capped so long lists do not feel slow;
- buttons: internal arrow movement and subtle pressed state.

Rules:

- Animate only `transform`, `opacity`, and clip/mask properties where supported.
- No scroll-jacking or forced horizontal page movement.
- No continuous decorative animation except an extremely subtle hero-field drift.
- All Framer Motion components use `useReducedMotion()`.
- Reduced motion renders the complete end state and disables Lenis.
- Avoid large scrolling `backdrop-filter` regions.

## Content and behavior retained

- Existing data modules remain the source of truth.
- Existing service names, descriptions, features, prices, contact information, and project copy remain unchanged.
- Work remains unbounded and links to statically generated `/work/[slug]` pages.
- Contact validation and delivery remain unchanged functionally.
- Unknown work slugs continue to 404.
- The site remains responsive at 375px and supports visible keyboard focus.
- Page metadata and future OG artwork use the new Ember system.

## Accessibility and performance

- Cream on ink and ink on cream are primary reading pairs.
- Lime on ink is permitted; lime text on cream is not.
- Copper is decorative or large-format only.
- Focus uses a two-layer lime/ink ring that remains visible on both themes.
- Service artwork uses empty alt text when decorative; real project screenshots receive descriptive alt text.
- Images use `next/image`, explicit responsive `sizes`, and locally stored optimized AVIF/WebP outputs.
- Hero visual is CSS-first so it does not delay LCP.
- Client components remain limited to actual interaction or motion boundaries.

## Explicit removals

- Placeholder shield as a recurring brand device.
- Dashed lane-style separators.
- Diamond bullets.
- Near-black square grid texture.
- Zero-radius global rule.
- Alternating road-sign panels.
- Continuous ticker marquee.
- Mechanical “signage snap” motion.

## Acceptance criteria

- The site feels recognizably derived from Option A without showing a literal planet.
- Hero, services, work, pricing, and contact form a coherent scroll narrative.
- Service imagery looks like one commissioned series, not five unrelated AI images.
- No production copy or pricing changes without a separate owner decision.
- Homepage and every case-study page share the new visual system.
- Keyboard, reduced-motion, TypeScript, lint, and production-build checks pass.
- Screenshots at 375px, 768px, 1440px, and 1920px show no overflow or unreadable text.
