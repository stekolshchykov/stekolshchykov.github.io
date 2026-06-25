# TINEO Premium Website — Design Audit Report

**Audit goal:** Compare the current TINEO SvelteKit site against a Poggenpohl / Segmento-level premium aesthetic and identify the highest-impact changes required to reach it.

**Reference principles:** handleless minimalism, ultra-thin worktops, precise lines, calm surfaces, natural stone/wood/metal, warm neutrals with occasional bold accents, sculptural islands, glass display cases, material-first storytelling, editorial typography, generous whitespace, restrained motion.

---

## 1. Global Theme Tokens — `src/app.css`

### Current visual approach
- 5-color token system: near-black `#0A0A0F`, lifted black `#111118`, warm off-white `#F0EBE3`, muted warm gray `#9A9590`, and a brassy gold accent `#C4956A`.
- Fonts: Cormorant Garamond (display) and Inter (body) loaded via Google Fonts.
- Tailwind v4 `@theme` block; no semantic spacing, line-height, or letter-spacing tokens.

### Strengths
- The dark/warm palette is directionally correct for luxury furniture.
- Cormorant Garamond gives an editorial serif presence.
- High contrast off-white on near-black is legible.

### Weaknesses vs. Poggenpohl-level premium
- **Accent is too “golden” and loud.** Poggenpohl / Segmento use restrained warm greys, taupes, stone, and concrete; metallic accents appear in photography, not as broad UI fills.
- **No material-derived palette.** Missing tokens for walnut, oak, brushed brass, honed stone, concrete, linen, glass.
- **No typographic scale tokens.** Line heights, letter-spacing, and optical sizing are hard-coded per component, leading to inconsistent rhythm.
- **No elevation, border, or surface tokens.** Everything is either flat black or lifted black with opaque borders.

### Concrete recommendations
1. Expand `src/app.css` with a material palette:
   ```css
   --color-stone: #b8b2a7;
   --color-concrete: #8a8580;
   --color-walnut: #3d2b1f;
   --color-oak: #a68b6a;
   --color-brass: #bfa07a;
   --color-glass: rgba(240,235,227,0.08);
   ```
2. Replace `--color-accent` usage as a primary fill with a quieter taupe/stone; reserve warm metal for small indicators, focus rings, and one primary CTA per page.
3. Add type tokens for display, editorial, body, and microcopy with tight negative tracking on large serif type and generous line heights on body.
4. Add spacing tokens that enforce a much larger section rhythm (e.g., `--space-section: 12rem` desktop).

---

## 2. Typography Atoms

### `src/lib/components/atoms/Heading.svelte`
**Current approach:** Renders any heading tag with `display`, `serif`, or `sans` variant plus hard-coded Tailwind size classes.

**Strengths:** Flexible tag/variant split; `svelte:element` keeps semantics correct.

**Weaknesses:**
- `display` variant does not enforce `as="h1"` — it can be applied to any tag, breaking hierarchy.
- Sizes jump from `text-4xl` to `7xl` but tracking remains a single `tracking-tight` token; lacks optical refinement.
- No upper-case or letter-spacing rules for section headers.
- No clip-mask reveal hook for scroll animations.

**Recommendations:**
- Restrict `variant="display"` to `as="h1"` only (or add a dev warning).
- Add tighter negative tracking for display sizes (`tracking-[-0.03em]`) and lighter weights (`font-thin` at ≥5xl).
- Add a `reveal` prop that wraps the slot in an overflow-hidden container so GSAP can animate `translateY(100%) → 0`.

### `src/lib/components/atoms/Text.svelte`
**Current approach:** Four text variants rendered as `<span>`.

**Strengths:** Consistent color/leading presets.

**Weaknesses:**
- `<span>` is semantically wrong for body copy and breaks vertical rhythm.
- `body-lg` at `text-lg leading-relaxed` is too loose for premium editorial layouts.

**Recommendations:**
- Render `body` and `body-lg` as `<p>` by default; add an `as` prop for exceptions.
- Reduce body line-height to ~1.55 and add a max-width token (e.g., `max-w-[65ch]`) to improve readability.
- Add an `editorial` variant: larger serif, warm secondary color, for pull-quotes.

---

## 3. Surface & Media Atoms

### `src/lib/components/atoms/Button.svelte`
**Current approach:** Primary (accent fill), secondary (accent outline), ghost (underlined text). Three sizes.

**Strengths:** Clean props API, focus rings, disabled state.

**Weaknesses:**
- Primary button fills entire CTA with brassy `#C4956A` — feels more e-commerce than ultra-premium.
- No lift/press micro-motion; only color transition.
- Ghost variant uses underline, which is too utilitarian.
- No “quiet” tertiary style for inline links with arrows.

**Recommendations:**
- Make primary button an off-white (`#F0EBE3`) fill on dark with near-black text for the hero; use a thin 1px warm-stroke outline button for secondary actions.
- Add `transition-transform duration-300` with `hover:-translate-y-px` and `active:translate-y-0`.
- Replace ghost underline with an arrowed text-link style (`group-hover:translate-x-1` arrow).
- Add `variant="quiet"` for subtle dark buttons used in nav/footer.

### `src/lib/components/atoms/Image.svelte`
**Current approach:** `<img>` with fade-in on load.

**Strengths:** Simple fade; `decoding="async"`.

**Weaknesses:**
- No responsive `srcset`, no WebP/AVIF, no blur placeholder, no aspect-ratio enforcement.
- Fade duration is only 500 ms; premium sites often use slower, smoother reveals.
- No parallax or scale-on-scroll capability.

**Recommendations:**
- Integrate `@sveltejs/enhanced-img` or generate `<picture>` with WebP/AVIF `srcset`.
- Add `aspectRatio` and `objectPosition` props; default to `object-cover`.
- Add optional blur-up placeholder via CSS background.
- Wrap in a container that supports optional parallax / scale transforms.

### `src/lib/components/atoms/Video.svelte` / `VideoPlayer.svelte`
**Current approach:** Autoplay background video with IntersectionObserver pause/play; inline player with play/pause overlay.

**Strengths:** Performance-aware pause/play.

**Weaknesses:**
- No poster fade, no reduced-quality fallback, no muted iconography.
- Inline player overlay is generic.
- Background video in `HeroSection` is hard-coded to `/videos/hero.mp4`.

**Recommendations:**
- Add `mp4` + `webm` sources and a poster fallback.
- Fade video opacity from 0 over 1.5 s once `loadeddata` fires.
- Provide a tiny sound/unmute UI only where narration exists.
- For hero, prefer a short 5–8 s ambient loop under 2 MB.

### `src/lib/components/atoms/Logo.svelte`
**Current approach:** SVG `<text>` rendering “TINEO” in Cormorant Garamond with wide letter-spacing.

**Strengths:** Crisp at all sizes, theme-aware variant.

**Weaknesses:**
- Text-based wordmark is not a designed logotype; lacks bespoke character spacing and a monogram.
- No SVG mark for favicon/social.

**Recommendations:**
- Commission or create a custom wordmark SVG with refined kerning; consider a “T” monogram for favicon and nav compact state.
- Keep Cormorant Garamond only if it is manually kerned; otherwise move to a more architectural display serif (e.g., Cormorant SC or Allumi).

### `src/lib/components/atoms/Divider.svelte`
**Current approach:** Single 1 px line at 20% opacity.

**Strengths:** Minimal.

**Weaknesses:** Too faint to register as a deliberate architectural line.

**Recommendations:**
- Introduce two weights: hairline (`1px`) for subtle separation and rule (`2px`) for section breaks.
- Use warm stone tint rather than text color for a softer, material feel.

---

## 4. Card & Content Molecules

### `src/lib/components/molecules/ProjectCard.svelte`
**Current approach:** 4:5 image card with gradient overlay, category eyebrow, title, location, hover arrow badge.

**Strengths:** Good image-to-text ratio; hover scale is smooth.

**Weaknesses:**
- Gradient overlay covers too much of the image.
- Circular arrow badge is generic and small.
- Location text is secondary clutter on a card meant to sell craft.
- Uniform grid lacks editorial tension.

**Recommendations:**
- Reduce overlay to a thin bottom gradient (30–40% height) so joinery details remain visible.
- Remove the arrow badge; instead, reveal a thin rule and “View project” text link on hover.
- Drop the location line from cards; reserve it for the detail page.
- Support an “editorial” layout variant: full-bleed image with title overlay bottom-left for featured projects.

### `src/lib/components/molecules/ServiceCard.svelte`
**Current approach:** Icon in a circular badge, category label, title, description, bullet features, text CTA. Horizontal and stacked variants.

**Strengths:** Clear information hierarchy; horizontal variant works for lists.

**Weaknesses:**
- **Generic Lucide icons destroy premium feel.** Poggenpohl sites never use off-the-shelf icons for service categories.
- Bullet feature lists feel like a SaaS pricing page, not bespoke furniture.
- Service images from `services.ts` are not displayed at all.

**Recommendations:**
- Remove icons entirely; lead with a full-bleed material/room photograph for each service.
- Replace bullet lists with 1–2 sentences of quiet copy and a thin arrow link.
- Rename `horizontal` variant to an editorial image-left / text-right pattern.

### `src/lib/components/molecules/MaterialCard.svelte`
**Current approach:** Square swatch image, material name, short description.

**Strengths:** Clean, image-first.

**Weaknesses:**
- Square crop is too small and abstract to convey material tactility.
- No origin, finish, or application metadata.

**Recommendations:**
- Increase image size and use macro photography showing grain, joint, or surface.
- Add micro-labels: origin, finish, best use.
- Support a “featured material” variant with full-bleed background and large type for hero sections.

### `src/lib/components/molecules/TestimonialCard.svelte`
**Current approach:** Bordered card with Quote icon, serif quote, name/location.

**Strengths:** Readable; good use of serif for the quote.

**Weaknesses:**
- Quote icon in accent is visually heavy.
- Card border makes testimonials feel boxed rather than editorial.

**Recommendations:**
- Remove the border and icon; use a large opening quotation mark in a low-opacity stone color.
- Center align within a generous column, or use a pull-quote layout over a full-bleed image.

### `src/lib/components/molecules/ProcessStep.svelte`
**Current approach:** Number in a 48 px bordered square, title, description.

**Strengths:** Clear numbering.

**Weaknesses:**
- Boxed number feels like a checklist, not a crafted journey.
- No connecting line or spatial rhythm.

**Recommendations:**
- Replace the square with a thin 2 px circle or simply a large number in 10% opacity behind the title.
- Use a vertical or horizontal connecting hairline between steps.
- Keep descriptions to one line each.

### `src/lib/components/molecules/TeamCard.svelte`
**Current approach:** 3:4 portrait, grayscale-to-color hover, name, role.

**Strengths:** Grayscale hover effect adds refinement.

**Weaknesses:**
- Simple text below image is flat.
- No title or craft role context.

**Recommendations:**
- Overlay name/role on hover with a subtle gradient rather than always-visible text.
- Use tighter crops and consistent lighting across portraits.

---

## 5. Section Organisms

### `src/lib/components/organisms/HeroSection.svelte`
**Current approach:** Full-viewport background video, centered headline/subheadline/CTA, GSAP fade-in + parallax.

**Strengths:** Cinematic full-screen entry; parallax adds depth.

**Weaknesses:**
- Centered text stack is the default startup-hero layout; lacks editorial composition.
- No scroll indicator or cue that this is a scroll narrative.
- Video overlay is heavy (`from-bg-primary/60 via-bg-primary/40 to-bg-primary`).

**Recommendations:**
- Move headline to lower-left, keep subheadline/CTA aligned to the same vertical rhythm.
- Lighten overlay to 20–30% so video texture remains visible.
- Add a subtle scroll indicator (thin animated line) at bottom center.
- Consider a large ghosted “T” monogram or year established as a background texture, not a second headline.

### `src/lib/components/organisms/Navigation.svelte`
**Current approach:** Fixed header, transparent-to-solid on scroll, hide on scroll-down, mobile slide-down menu.

**Strengths:** Functional; good accessibility attributes.

**Weaknesses:**
- CTA button is the same brassy primary everywhere, competing with the hero.
- Nav links lack an active-state indicator.
- Mobile menu is a simple slide-down; could be a full-screen editorial overlay.

**Recommendations:**
- Make nav CTA a quiet outline or off-white button, not a gold fill.
- Add active-page underline in stone/warm gray.
- Increase nav height to 80 px on desktop and use 15 px Inter with 0.02 em tracking.
- Mobile menu: full-screen overlay with large serif links and a thin dividing line.

### `src/lib/components/organisms/Footer.svelte`
**Current approach:** Two-column CTA + link grid, divider, bottom bar with legal/social text.

**Strengths:** Clear link hierarchy.

**Weaknesses:**
- Social links are text, not iconography.
- CTA heading uses `text-3xl` — too small for a closing statement.
- “Discuss a Project” button repeats the same brass fill.

**Recommendations:**
- Increase CTA heading to display size (`text-5xl`+).
- Replace social text with minimal SVG icons (Instagram, Pinterest, LinkedIn) at 20 px.
- Use a thin 1 px top border in warm gray instead of a full-width divider component.
- Add “Handcrafted in Ireland” as a small centered location line.

### `src/lib/components/organisms/FeaturedProjectsSection.svelte`
**Current approach:** Header + 3-column grid of `ProjectCard`.

**Strengths:** Consistent, responsive.

**Weaknesses:**
- Uniform 3-column grid is predictable; no “hero project” treatment.
- Section header sits above grid with a ghost CTA.

**Recommendations:**
- Use an asymmetric layout: first project spans 2 columns, next two stack vertically.
- Or implement a horizontal scroll gallery on mobile with snap points.
- Add a thin section rule above the header.

### `src/lib/components/organisms/ServicesPreviewSection.svelte`
**Current approach:** Same 3-column grid pattern as projects.

**Weaknesses:**
- Services are shown without imagery, relying on icons.

**Recommendations:**
- Replace grid with two large editorial cards (Residential / Commercial) featuring full-bleed photography and minimal text, then a secondary list below.

### `src/lib/components/organisms/MaterialsShowcase.svelte`
**Current approach:** 4-column grid of `MaterialCard`, no section header.

**Strengths:** Surface-level material presence.

**Weaknesses:**
- No storytelling; feels like a swatch book appendix.
- Missing a headline or editorial framing.

**Recommendations:**
- Add a section header: eyebrow + large serif headline + short statement.
- Consider a full-bleed material hero (e.g., walnut grain macro) followed by the grid.
- Use 2-column larger cards on desktop rather than 4 tiny squares.

### `src/lib/components/organisms/BrandIntroSection.svelte`
**Current approach:** Two-column text + image, GSAP reveal.

**Strengths:** Clear story block.

**Weaknesses:**
- Image uses `rounded-sm` — rounded corners contradict precise craftsmanship.
- Text stack is too compact; lacks pull-quote or typographic moment.

**Recommendations:**
- Remove all `rounded-sm` classes from image containers.
- Increase whitespace between eyebrow, headline, body, and CTA.
- Add a pull-quote or large standalone statement below the image.

### `src/lib/components/organisms/ProcessOverviewSection.svelte`
**Current approach:** Centered header + 4-column grid of `ProcessStep`.

**Strengths:** Reuses the step molecule.

**Weaknesses:**
- Grid is too dense for a “crafted journey” narrative.

**Recommendations:**
- Use the `ProcessTimeline` organism here instead of the grid.
- Increase vertical padding and reduce copy to one sentence per step.

### `src/lib/components/organisms/TestimonialsSection.svelte`
**Current approach:** Centered header + 3-column grid.

**Weaknesses:**
- Testimonials compete visually with service/project grids.

**Recommendations:**
- Use a single large testimonial per viewport with a subtle carousel, or a masonry-style editorial block.
- Add a thin horizontal rule in accent above each quote, not a border around the card.

### `src/lib/components/organisms/PageHeroSection.svelte`
**Current approach:** Full-bleed image, bottom-left text, gradient overlay.

**Strengths:** Consistent page entry.

**Weaknesses:**
- Gradient overlay is heavy and darkens photography too much.
- Text always bottom-left; could vary by page.

**Recommendations:**
- Reduce overlay opacity and prefer `from-bg-primary/40 via-transparent to-transparent`.
- On About/Contact, consider a centered, smaller hero with generous whitespace.

### `src/lib/components/organisms/WhyUsGrid.svelte`
**Current approach:** 3-column cards with Lucide icon, title, description, border, background lift.

**Weaknesses:**
- This is the most “SaaS landing page” component on the site. Icons + bordered cards + feature-grid layout is the opposite of Poggenpohl quiet luxury.

**Recommendations:**
- Remove icons and cards entirely.
- Replace with a typographic list of commitments: “Bespoke design / Irish craft / Premium materials / Full service / Quiet luxury / Precision fit” set in large serif or sans with thin rules between.
- Or convert to a full-bleed image with overlaid text statements.

### `src/lib/components/organisms/WhatsAppFab.svelte`
**Current approach:** Fixed bright green `#25D366` button with pulse animation.

**Weaknesses:**
- Bright WhatsApp green is visually loud and cheapens the entire experience.
- Pulse animation is distracting.

**Recommendations:**
- Remove the FAB entirely, or replace with a subtle dark icon-only button with no pulse.
- Move WhatsApp contact to the Contact page and footer only.

### `src/lib/components/organisms/ContactFormModal.svelte`
**Current approach:** Full-screen modal with bottom-border inputs, file drop, project-type pills.

**Strengths:** Functional form; good validation.

**Weaknesses:**
- Form fields feel utilitarian.
- Success/error states are plain.
- No decorative left panel or image.

**Recommendations:**
- Add a left-side material image panel on desktop (50/50 split).
- Use full outlined boxes or minimal floating labels instead of bottom-border-only inputs.
- Add a subtle background texture to the modal.

---

## 6. Page Files

### `src/routes/[[lang]]/+page.svelte`
**Current approach:** Hero → BrandIntro → ServicesPreview → FeaturedProjects → ProcessOverview → Testimonials → CTA.

**Strengths:** Clear conversion path; single CTA repeated.

**Weaknesses:**
- No full-bleed editorial image moment between sections.
- No material-first storytelling.
- Services preview uses icons, not photography.
- Sequence is predictable.

**Recommendations:**
- Insert a full-bleed workshop/material image section after the intro with a pull-quote.
- Replace ServicesPreview with large image-led residential/commercial blocks.
- End with a strong typographic CTA section, not just a centered button.

### `src/routes/[[lang]]/services/+page.svelte`
**Current approach:** Hero → Residential list → Commercial list → ProcessTimeline → MaterialsShowcase → CTA.

**Weaknesses:**
- Service list sections use horizontal `ServiceCard` with icons; service images are unused.
- Section headers are repeated inline rather than using shared section components.

**Recommendations:**
- Use service hero images as full-width section dividers.
- Convert service list to large image + text pairs.
- Add a “Materials Library” page or deeper material section rather than a small grid.

### `src/routes/[[lang]]/about/+page.svelte`
**Current approach:** Hero → Story two-col → Craftsmanship two-col → Team grid → WhyUs grid → CTA.

**Weaknesses:**
- WhyUsGrid is the weakest visual element.
- Craftsmanship image is small and not full-bleed.

**Recommendations:**
- Make craftsmanship image full-bleed with overlaid statement.
- Replace WhyUsGrid with a quiet typographic principles block.

### `src/routes/[[lang]]/projects/+page.svelte`
**Current approach:** Hero → filter pills → project grid → load more.

**Strengths:** Clean filtering.

**Weaknesses:**
- Filter pills use brassy active state.
- Grid is uniform.

**Recommendations:**
- Make active filter pill off-white fill on dark, inactive a thin outline.
- Introduce featured project hero above the grid.

### `src/routes/[[lang]]/contact/+page.svelte`
**Current approach:** Hero → contact info + hours → map.

**Weaknesses:**
- Business hours table is functional but not luxurious.
- Map is standard Google Maps grayscale embed.

**Recommendations:**
- Move hours to a smaller, right-aligned column with hairline separators.
- Replace map with a static Mapbox/Styled Google Maps image that opens on click, or keep embed but with warmer grayscale/contrast.

---

## 7. Imagery & Static Assets (`static/images/`, `static/videos/`)

### Current state
- Placeholder JPEGs are 30–55 KB, 800–1400 px wide, standard quality.
- All images are generated placeholders, not professional photography.
- No WebP/AVIF, no srcset, no blur placeholders.
- `/videos/hero.mp4` is 19 KB — likely a very short/low-res loop.

### Strengths
- File names and alt text are descriptive and SEO-friendly.
- Aspect ratios are defined in components.

### Weaknesses vs. premium
- **Resolution and quality are far below what a €30k+ furniture brand needs.** Poggenpohl sites use full-bleed 4K+ photography with careful grading.
- Placeholder images lack consistent lighting, color grading, and shallow depth of field.
- No video poster optimization.

### Concrete recommendations
1. Replace every image with professionally shot, color-graded photography: wide shots at 21:9, details at macro, consistent warm/neutral grading.
2. Produce WebP/AVIF variants and responsive `srcset` for all images.
3. Add low-quality inline blur placeholders to eliminate layout shift.
4. Re-shoot or source hero video at high bitrate; keep under 2 MB but at higher resolution.

---

## 8. Motion & Interaction

### Current approach
- GSAP `ScrollTrigger` fade-up (`y: 40 → 0`, `opacity: 0 → 1`) on nearly every section.
- Hero parallax on background video.
- Hover scale on cards/images.

### Strengths
- Consistent entrance pattern; performant `transform`/`opacity` usage.

### Weaknesses
- **Every section animates identically** — creates monotony, not rhythm.
- No clip-mask text reveals.
- No `prefers-reduced-motion` guardrails.
- Hover states are mostly scale/fade; no magnetic buttons or cursor-aware image reveals.

### Concrete recommendations
1. Add `@media (prefers-reduced-motion: reduce)` reset in `src/app.css`.
2. Vary animations: clip-mask headings, staggered image reveals, parallax on material cards.
3. Slow down default durations: 0.9–1.2 s for section reveals, 0.5–0.7 s for hovers.
4. Use `cubic-bezier(0.25, 0.1, 0.25, 1)` for editorial reveals.

---

## 9. Global Components That Break Premium Feel

### `src/lib/components/molecules/CookieBanner.svelte`
- Bright accent buttons and dense bottom bar feel transactional.
- **Recommendation:** Minimal dark bar, small text, outline buttons, no accent fill.

### `src/lib/components/organisms/WhatsAppFab.svelte`
- Bright green + pulse is the single most anti-premium element.
- **Recommendation:** Remove or replace with a dark, icon-only, non-pulsing button.

### `src/app.html`
- Font preconnect is good, but no critical CSS inline, no preloader.
- **Recommendation:** Add a minimal preloader overlay for the hero entry.

---

## Top 15 Prioritized Changes (Biggest Visual Impact)

1. **Replace all placeholder photography with premium, color-graded, high-resolution imagery and implement WebP/AVIF + responsive srcset.**
   Files: `static/images/**/*`, `static/videos/hero.mp4`, `src/lib/components/atoms/Image.svelte`.

2. **Remove or neutralize the WhatsApp FAB.**
   File: `src/lib/components/organisms/WhatsAppFab.svelte`.

3. **Redesign the accent color: move from brassy gold `#C4956A` to a quieter taupe/stone palette.**
   File: `src/app.css`; ripple through `Button.svelte`, `Eyebrow.svelte`, `FilterPill.svelte`.

4. **Eliminate generic Lucide icons in service and why-us sections; lead with photography and typography.**
   Files: `src/lib/components/molecules/ServiceCard.svelte`, `src/lib/components/organisms/WhyUsGrid.svelte`, `src/lib/components/organisms/ServicesPreviewSection.svelte`.

5. **Elevate typography: tighten display tracking, render body text as `<p>`, add editorial line-heights, and implement clip-mask heading reveals.**
   Files: `src/lib/components/atoms/Heading.svelte`, `src/lib/components/atoms/Text.svelte`, `src/app.css`.

6. **Remove all `rounded-sm` / rounded corners on images and cards.**
   Files: audit `BrandIntroSection.svelte`, `ProjectGallery.svelte`, `MapEmbed.svelte`, `ContactFormModal.svelte`.

7. **Rework the Button atom: primary as off-white fill on dark, secondary as thin 1 px outline, ghost as arrow text-link.**
   File: `src/lib/components/atoms/Button.svelte`.

8. **Make the Navigation more refined: quieter CTA, active underline, larger desktop height, full-screen mobile menu.**
   File: `src/lib/components/organisms/Navigation.svelte`.

9. **Introduce editorial asymmetry in the home project showcase.**
   Files: `src/lib/components/organisms/FeaturedProjectsSection.svelte`, `src/lib/components/molecules/ProjectCard.svelte`.

10. **Add a material-first storytelling section with full-bleed macro photography and material metadata.**
    Files: new organism `src/lib/components/organisms/MaterialsStorySection.svelte`, update `src/lib/components/organisms/MaterialsShowcase.svelte`.

11. **Redesign the process section as a minimal timeline with generous whitespace and thin connecting rules.**
    Files: `src/lib/components/organisms/ProcessOverviewSection.svelte`, `src/lib/components/molecules/ProcessStep.svelte`, `src/lib/components/organisms/ProcessTimeline.svelte`.

12. **Replace the WhyUsGrid feature-cards with a typographic principles block.**
    File: `src/lib/components/organisms/WhyUsGrid.svelte`.

13. **Add reduced-motion support and diversify GSAP animations (clip-mask headings, staggered image reveals, parallax).**
    Files: `src/app.css`, all `organisms/*Section.svelte`.

14. **Redesign the cookie banner to a minimal dark bar with outline actions.**
    File: `src/lib/components/molecules/CookieBanner.svelte`.

15. **Create a custom logotype/monogram and replace the SVG text logo.**
    File: `src/lib/components/atoms/Logo.svelte`, add SVG assets to `static/fonts/` or `src/lib/assets/`.

---

**Summary:** TINEO has a solid technical foundation and the correct dark-luxury direction, but it currently reads as a polished template rather than a bespoke premium brand. The fastest path to “wow” is better photography, a quieter palette, the removal of generic icons and the WhatsApp FAB, sharper typography, and editorial asymmetric layouts. These 15 changes will move the site from “premium-ish” to Poggenpohl/Segmento territory.
