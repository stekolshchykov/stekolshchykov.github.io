# TINEO Website — Design v2 Specification
## Inspired by Poggenpohl +SEGMENTO

---

## 1. Design Strategy

Move TINEO from "dark-luxury template" to "Irish atelier with Poggenpohl-level restraint." Keep the dark cinematic foundation but refine it with material-derived colours, architectural typography, generous whitespace, and image-first hierarchy.

**Key shifts:**
- Accent colour: from brassy gold `#C4956A` to quieter taupe/stone `#A68A64` and warm grey `#B8B4AD`.
- Typography: tighter display tracking, larger scale contrast, small-caps labels.
- Components: remove generic icons and feature-card boxes; lead with photography and thin rules.
- Layout: asymmetric editorial grids, edge-bleed images, generous vertical rhythm.
- Motion: slower, editorial reveals; clip-mask headings; reduced-motion support.

---

## 2. Colour Palette

### Semantic tokens (update `src/app.css`)

| Token | Value | Usage |
|---|---|---|
| `--color-bg-primary` | `#0A0A0F` | Main page background |
| `--color-bg-secondary` | `#111118` | Cards, lifted surfaces |
| `--color-bg-tertiary` | `#1A1A22` | Hover states, subtle panels |
| `--color-surface` | `#16161D` | Form inputs, modal panels |
| `--color-text-primary` | `#F5F3EF` | Primary text (warmer off-white) |
| `--color-text-secondary` | `#B8B4AD` | Secondary text, labels |
| `--color-text-muted` | `#7A7770` | Disabled, captions |
| `--color-accent` | `#A68A64` | Links, rules, focus rings, small moments |
| `--color-stone` | `#B8B4AD` | Dividers, hairlines, hover underlines |
| `--color-walnut` | `#5A4636` | Image tints, warm accents |
| `--color-brass` | `#A68A64` | Metallic accent (same as accent) |
| `--color-glass` | `rgba(245,243,239,0.06)` | Glass panels, borders |
| `--color-border` | `rgba(184,180,173,0.12)` | Subtle borders |

Rules:
- No pure white `#FFFFFF` anywhere.
- Accent `#A68A64` is used sparingly: links, 1px rules, focus rings.
- No filled accent buttons except one primary CTA per page, and even then prefer off-white fill.

---

## 3. Typography

### Font stack

Keep current Google Fonts but load weights:
- Cormorant Garamond: 300, 400, 500, 600
- Inter: 300, 400, 500

Add:
- `--font-serif: "Cormorant Garamond", ui-serif, Georgia, serif;`
- `--font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;`

### Scale

| Use | Font | Size (mobile / desktop) | Weight | Tracking | Line-height |
|---|---|---|---|---|---|
| Display H1 | Serif | 48px / 80–96px | 300 | -0.03em | 1.05 |
| H2 Section | Serif | 36px / 56px | 400 | -0.02em | 1.1 |
| H3 | Serif | 28px / 36px | 400 | -0.01em | 1.2 |
| H4 / Card title | Serif | 22px / 28px | 400 | 0 | 1.25 |
| Body | Sans | 16px / 17px | 300 | 0 | 1.6 |
| Body large | Sans | 18px / 20px | 300 | 0 | 1.55 |
| Label / caption | Sans | 11px / 12px | 500 | 0.12em | 1.4 |
| Eyebrow | Sans | 11px / 12px | 500 | 0.15em | 1.4 |

Rules:
- All labels/eyebrows are uppercase with wide letter-spacing.
- Display headings use very light weight (300) and tight negative tracking.
- Body text never exceeds `max-w-[65ch]`.

---

## 4. Spacing & Layout

### Section rhythm

- Section vertical padding: `py-20 md:py-32 lg:py-40` (80–160 px)
- Container max-width: `max-w-[1440px]` with `px-6 md:px-12 lg:px-16`
- Grid gap: `gap-4 md:gap-6` for tight image grids, `gap-12 md:gap-20` for text-image pairs

### Rules / dividers

- Hairline: 1px `rgba(184,180,173,0.12)`
- Section rule: 1px `rgba(184,180,173,0.2)`
- Use hairlines instead of borders or background colour changes.

---

## 5. Components

### Button

Variants:
1. **primary** — off-white fill `#F5F3EF` with near-black text, no border. Hover: `translateY(-1px)` + subtle shadow.
2. **secondary** — transparent bg, 1px `text-primary` border. Hover: bg fills to `rgba(245,243,239,0.08)`.
3. **outline-stone** — transparent bg, 1px `--color-stone` border. Hover: border colour transitions to `--color-accent`.
4. **ghost** — text only with right arrow. Hover: arrow `translateX(4px)`, underline grows from left.

No brass/gold filled buttons.

### Heading

- Add `reveal` boolean prop. When true, wrap in overflow-hidden container for GSAP translateY reveal.
- `display` variant: only `h1`, font-light, tracking-[-0.03em], leading-[1.05].
- Add `label` variant for small-caps labels.

### Text

- `body` and `body-lg` render as `<p>`.
- Add `editorial` variant: serif, larger, secondary colour.
- Add `caption` variant: small uppercase label.

### Image

- Keep current atom but:
  - Slow fade-in to 900 ms.
  - Add optional parallax container.
  - Enforce aspect ratio via wrapper.
  - Remove rounded corners everywhere.

### Logo

- Create a refined SVG wordmark with custom kerning.
- Add a "T" monogram variant for favicon and compact states.
- Letters: T I N E O, spaced with architectural evenness.

### ProjectCard

- No border, no shadow.
- Full-bleed image with thin bottom gradient (30% height).
- Caption bottom-left: small-caps category/year + serif title.
- On hover: image scale 1.03, reveal "View project →" with animated underline.
- Add `featured` variant: spans 2 columns, larger title.

### ServiceCard

- Remove icons entirely.
- Editorial variant: full-bleed image left, text right (or stacked).
- Title in serif, description in sans, thin arrow link.
- No bullet lists.

### MaterialCard

- 1:1 macro image.
- Small material swatch circle bottom-right (actual texture).
- Caption: small-caps origin/finish + serif material name.
- Hover: caption shifts up 8px.

### TestimonialCard

- No border, no background.
- Large opening quotation mark in low-opacity stone.
- Quote in serif, attribution in sans small-caps.
- Use one large quote per viewport (carousel) or masonry editorial layout.

### ProcessStep

- Remove numbered square.
- Use thin 2px circle or oversized ghost number (10% opacity) behind title.
- Vertical connecting hairline between steps.
- One-line descriptions.

### Navigation

- Height: 80px desktop.
- Links: 14px uppercase, letter-spacing 0.08em.
- Active link: 1px underline in `--color-stone`.
- CTA: outline-stone button, not filled.
- Mobile: full-screen overlay with large serif links.

### Footer

- Top: thin 1px hairline.
- CTA headline: display serif size.
- Social: minimal SVG icons (Instagram, Pinterest, LinkedIn).
- Bottom bar: copyright + "Handcrafted in Ireland".

### CookieBanner

- Minimal dark bar.
- Small text, outline buttons.
- No accent fill.

### WhatsAppFab

- Remove entirely.
- Keep WhatsApp only on contact page and footer.

---

## 6. Page-by-Page Changes

### Home `/`

Sections in order:
1. **Hero** — full-bleed image/video, lower-left headline, scroll indicator.
2. **BrandIntro** — two-column: text left, image right. Add pull-quote below.
3. **MaterialStory** — NEW full-bleed macro material image with overlaid small-caps labels.
4. **ServicesPreview** — two large editorial cards (Residential / Commercial) + small list.
5. **FeaturedProjects** — asymmetric grid: 1 featured spanning 2 cols + 2 stacked.
6. **ProcessOverview** — horizontal timeline with hairline and ghost numbers.
7. **Testimonials** — single large quote carousel.
8. **CTABanner** — split-panel CTA (text left, image right).

### About `/about`

1. **PageHero** — centered, smaller, generous whitespace.
2. **Story** — asymmetric text + image.
3. **Craftsmanship** — full-bleed image with overlaid statement.
4. **Principles** — typographic list replacing WhyUsGrid.
5. **Team** — keep but refine hover overlay.
6. **CTA**

### Services `/services`

1. **PageHero**
2. **Residential** — image-led service cards.
3. **Commercial** — image-led service cards.
4. **ProcessTimeline**
5. **MaterialsShowcase** with section header.
6. **CTA**

### Projects `/projects`

1. **PageHero**
2. **FilterPills** — outline style, active = off-white fill.
3. **ProjectGrid** — asymmetric featured + standard cards.
4. **LoadMore**

### Project Detail `/projects/[slug]`

1. **ProjectDetailHeader** — large hero image, small-caps metadata.
2. **Description** — challenge/solution with thin rule separators.
3. **ProjectGallery** — masonry or grid with lightbox.
4. **SpecificationsTable** — minimal table with hairlines.
5. **RelatedProjects**
6. **CTA**

### Contact `/contact`

1. **PageHero**
2. **ContactInfo + Form** — split layout.
3. **Hours** — right-aligned column with hairlines.
4. **Map** — keep grayscale embed.

---

## 7. Motion Specification

### Global reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Entrance animations

- **Hero image:** opacity 0→1, scale 1.05→1, duration 1200ms, ease `power2.out`.
- **Hero text:** stagger children, y 40→0, opacity 0→1, duration 900ms, delay 300ms.
- **Section headings:** clip-mask reveal y 100%→0, duration 800ms, ease `power3.out`.
- **Body text / cards:** y 30→0, opacity 0→1, duration 700ms, stagger 0.1s.
- **Images:** opacity 0→1, duration 900ms.

### Hover

- Images: scale 1.03, duration 600ms.
- Buttons: translateY(-1px), duration 200ms.
- Arrow links: arrow translateX(4px), underline width 0→100%.

### Scroll

- Hero background parallax: yPercent -10 to 10.
- Section elements use ScrollTrigger with `immediateRender: false`.

---

## 8. Imagery Direction

Since professional photography is not available, generate premium placeholders that follow this style:

- Warm, desaturated colour grade.
- Dark moody interiors with soft natural light.
- Material-first: oak grain, walnut, brass, stone, lacquer surfaces.
- Wide shots 21:9, detail shots 1:1 or 4:5.
- No text on images.
- Consistent lighting direction (soft window light from left).

All new images go to `static/images/` replacing current placeholders.

---

## 9. Content Direction

Apply brand voice from `tineo-content-audit.md`:
- Restrained, architectural, warm but not familiar.
- Avoid superlatives and clichés.
- Headlines 2–6 words.
- Sentences max 20 words.
- Lead with material and space, not lifestyle.

Key rewrites:
- Tagline: "Furniture, measured in millimetres."
- Hero sub: "Bespoke wardrobes, kitchens, and interior joinery from our Dublin workshop."
- Services: rename to "Wardrobes & Dressing Rooms", "Kitchens", "Dressing Rooms", "Living Joinery", "Workplaces", "Retail Spaces", "Hotels & Restaurants", "One-Off Commissions".
- Projects page: "Selected Work".
- CTA: "Begin your project."

---

## 10. Implementation Phases

### Phase 1 — Foundation
- Update `src/app.css` tokens.
- Update `src/app.html` fonts and preloader.
- Update `src/routes/+layout.svelte`.
- Implement reduced-motion CSS.

### Phase 2 — Atoms
- Refactor `Button`, `Heading`, `Text`, `Image`, `Logo`, `Divider`, `Eyebrow`.

### Phase 3 — Molecules
- Refactor `ProjectCard`, `ServiceCard`, `MaterialCard`, `TestimonialCard`, `ProcessStep`, `CookieBanner`, `FilterPill`.

### Phase 4 — Organisms
- Refactor `Navigation`, `HeroSection`, `Footer`, `FeaturedProjectsSection`, `ServicesPreviewSection`, `MaterialsShowcase`, `BrandIntroSection`, `ProcessOverviewSection`, `TestimonialsSection`, `PageHeroSection`, `WhyUsGrid`, `ContactFormModal`, `CTABannerSection`.

### Phase 5 — Content
- Rewrite `site.ts`, `projects.ts`, `services.ts`, `materials.ts`, `processSteps.ts`, `testimonials.ts`, `en.json`.

### Phase 6 — Imagery
- Generate all new placeholders.

### Phase 7 — Verify
- `pnpm check`, `pnpm build`, `pnpm lint`.
- Lighthouse audit.
- Visual regression screenshots.
