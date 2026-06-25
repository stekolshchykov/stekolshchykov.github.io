# TINEO v2 — Visual & Interaction Critique

**Site inspected:** `http://localhost:4185` (live preview confirmed, HTTP 200)  
**Scope:** `src/lib/components/`, `src/routes/`, `src/app.css`, `static/images/`, `PRD.md`, `lighthouse-report.json`  
**Goal:** Surface the highest-impact visual and interaction gaps that stop the site from feeling like a Poggenpohl/Segmento-level premium furniture experience.

---

## Executive Summary

The TINEO v2 foundation is solid—dark palette, serif/sans pairing, GSAP reveals, responsive grid—but the **luxury perception is being undermined by a handful of repeated, systemic issues** rather than one or two bugs:

1. **Color tokens have drifted** from the intended brass/cream spec to a desaturated olive-and-cool-white that reads generic.
2. The **primary CTA is styled like a light “submit” button**, not a brass luxury trigger.
3. The **homepage hero is a static poster** instead of the cinematic loop specified in the PRD.
4. **Images are treated inconsistently**—no warm multiply overlays, no color grading, no focal control.
5. **Typography is not optically tuned**—no text-rendering smoothing, no balance, no editorial details.
6. **Every section uses the same centered-container pattern**, making the page feel templated.
7. **Micro-interactions are basic** (scale 1.03, opacity fades) and do not match the PRD easing/language.
8. **Loading/placeholder strategy is absent**—images just pop in, LCP is 2.7s.
9. **Mobile details are under-developed**—plain hamburger, stacked grids, intrusive cookie banner.
10. **Missing premium signals** found on top-tier competitor sites: custom cursor, scroll progress, ambient grain, parallax, before/after reveal, refined form inputs.

The recommendations below are ranked by **visual impact** (how much they affect first impression and perceived value) and are written to be directly actionable by a developer.

---

## Priority 1 — Color Tokens Have Drifted from the Luxury Spec
**Visual impact:** Highest (affects every element)  
**Files:** `src/app.css`, plus every component consuming `--color-accent`, `--color-text-primary`, `--color-text-secondary`

| Token | Current value | Spec/intended value | Why the current value fails |
|---|---|---|---|
| Accent | `#a68a64` | `#C4956A` / `#C9A96E` brass | Reads as olive/khaki, not antique brass. The PRD calls this “muted brass referencing antique hardware patina.” |
| Text primary | `#f5f3ef` | `#F0EBE3` warm cream | Too cool/white; clashes with the warm walnut imagery. |
| Text secondary | `#b8b4ad` | `#9A9590` warm gray | Too light and warm, collapsing hierarchy with primary text. |
| Border | `rgba(184,180,173,0.12)` | `rgba(240,235,227,0.06–0.12)` | Currently uses the secondary text color, making hairlines feel dirty rather than refined. |

**What to change:**

```css
/* src/app.css */
@theme {
  --color-text-primary: #F0EBE3;
  --color-text-secondary: #9A9590;
  --color-accent: #C4956A;
  --color-stone: #9A9590;
  --color-border: rgba(240, 235, 227, 0.08);
}
```

- Replace any hardcoded `#a68a64` in components (search: `grep -R "#a68a64" src/`).
- Update `Divider.svelte` (`border-stone`) and `Eyebrow.svelte` (`text-accent`) so they pull from the corrected tokens.

---

## Priority 2 — Primary CTA Looks Like a Generic Light Button
**Visual impact:** Very high (the main conversion element)  
**File:** `src/lib/components/atoms/Button.svelte`

**Current primary class:**
```svelte
'bg-text-primary text-bg-primary hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(245,243,239,0.12)]'
```

This is an off-white button with a shadow lift. The PRD specifies:
- Background: `#C4956A` (brass)
- Text: `#0A0A0F`
- No border-radius (sharp corners = craftsmanship)
- Hover: background `#D4A57A`, `translateY(-1px)`
- Active: `scale(0.97)`
- Transition: `0.25s cubic-bezier(0.4, 0, 0.2, 1)`

**What to change:**

```svelte
const variantClasses = {
  primary:
    'bg-accent text-bg-primary rounded-none uppercase tracking-[0.06em] text-sm font-medium ' +
    'hover:bg-[#D4A57A] hover:-translate-y-px active:scale-[0.97] ' +
    'transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]'
};
```

- Remove the `shadow-[...]` utility from primary entirely (the PRD explicitly forbids shadow-based lift).
- Update the nav CTA in `Navigation.svelte` (line 75) and the footer CTA in `Footer.svelte` (line 44) to use the same `Button` component or at least the same token set, instead of inline duplicated styles.

---

## Priority 3 — Homepage Hero Is a Static Poster, Not Cinematic
**Visual impact:** Very high (first 3 seconds)  
**File:** `src/lib/components/organisms/HeroSection.svelte`

**Current state:**
- Uses `<img src="/images/hero-poster.jpg" ...>`.
- Text is left-aligned (`max-w-3xl`, no `mx-auto`).
- Gradient overlay is `bg-gradient-to-b from-bg-primary/25 via-bg-primary/15 to-bg-primary/30`.
- No `text-shadow`.

**PRD spec:**
- Fullscreen muted looped video (MP4/WebM), max ~4MB.
- Centered headline group.
- Subtle uniform overlay: `rgba(10, 10, 15, 0.35)`.
- Headline: Cormorant Garamond 64px desktop / 36px mobile, weight 400, text-shadow `0 2px 40px rgba(0,0,0,0.3)`.
- CTA: brass, sharp corners.

**What to change:**

```svelte
<div class="hero-bg absolute inset-0 z-0">
  <div class="hero-bg-inner h-full w-full">
    <video
      autoplay muted loop playsinline
      poster={videoPoster}
      class="h-full w-full object-cover"
    >
      <source src="/videos/hero-loop.mp4" type="video/mp4" />
      <source src="/videos/hero-loop.webm" type="video/webm" />
    </video>
    <div class="absolute inset-0 bg-bg-primary/35"></div>
  </div>
</div>

<div class="relative z-10 mx-auto w-full max-w-[1440px] px-6 ...">
  <div class="mx-auto max-w-3xl text-center">
    <Heading as="h1" variant="display" class="hero-fade mb-6 [text-shadow:0_2px_40px_rgba(0,0,0,0.3)]">
      ...
    </Heading>
    ...
  </div>
</div>
```

- Add `fetchpriority="high"` to the poster/video.
- The scroll indicator is fine, but reduce its visual weight or make it fade out after first scroll.

---

## Priority 4 — Image Treatments Are Flat and Inconsistent
**Visual impact:** High (portfolio is the product)  
**Files:** `ProjectCard.svelte`, `ServiceCard.svelte`, `MaterialCard.svelte`, `PageHeroSection.svelte`, `ProjectDetailHeader.svelte`

**Current state:**
- ProjectCard uses `bg-gradient-to-t from-bg-primary/80 via-bg-primary/20 to-transparent`.
- ServiceCard uses `bg-gradient-to-t from-bg-primary/90 via-bg-primary/30 to-transparent`.
- No `mix-blend-mode`, no warm color grade, no focal-point control.

**Why it fails:** Premium furniture sites (Poggenpohl, Boffi, Minotti) grade imagery with warm, desaturated overlays and consistent black-point lifts so every photo feels like one campaign. TINEO’s images currently sit raw on the page.

**What to change:**

Add a reusable warm overlay pattern via a global utility or an `<ImageOverlay />` atom:

```css
.image-warm-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(10, 10, 15, 0.35);
  mix-blend-mode: multiply;
  pointer-events: none;
}

.image-vignette::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, transparent 40%, rgba(10,10,15,0.25) 100%);
  pointer-events: none;
}
```

- Apply `.image-warm-overlay` to hero/page-hero media.
- On project/service cards, keep the bottom gradient but composite it over the warm multiply layer so text remains legible while the image feels graded.
- Add `object-position` support to the `Image.svelte` atom so art directors can control focal points (`object-[50%_30%]` for tall cabinetry shots).

---

## Priority 5 — Typography Lacks Optical Refinement
**Visual impact:** High (luxury lives in type details)  
**Files:** `src/app.css`, `src/lib/components/atoms/Heading.svelte`, `Text.svelte`, `BrandIntroSection.svelte`

**Current state:**
- No `text-rendering: optimizeLegibility`.
- No `-webkit-font-smoothing: antialiased` / `-moz-osx-font-smoothing: grayscale`.
- No `text-wrap: balance` on headlines.
- No hanging punctuation, no drop caps in editorial paragraphs.
- `Heading.svelte` default variant uses `font-sans font-medium` which is indistinguishable from body.

**What to change:**

```css
/* src/app.css */
html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
```

- In `Heading.svelte`, add `text-balance` to `display` and `serif` variants:
  ```svelte
  case 'display':
    return `font-serif font-light text-display tracking-display leading-display text-text-primary text-balance ${className}`;
  ```
- Add a `.drop-cap` utility for the intro body in `BrandIntroSection.svelte`:
  ```css
  .drop-cap::first-letter {
    float: left;
    font-family: var(--font-serif);
    font-size: 3.5rem;
    line-height: 0.85;
    padding-right: 0.6rem;
    color: var(--color-accent);
  }
  ```
- Reduce nav link letter-spacing from `tracking-[0.08em]` to `tracking-[0.04em]` for a more refined, less “military” feel.

---

## Priority 6 — Section Rhythm Is Repetitively Centered-Container
**Visual impact:** High (templated feel)  
**Files:** Most organisms (`BrandIntroSection.svelte`, `ServicesPreviewSection.svelte`, `FeaturedProjectsSection.svelte`, etc.)

**Current state:** Almost every section follows the exact same formula:
```svelte
<section class="bg-bg-primary py-20 md:py-32 lg:py-40">
  <div class="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
    ...
  </div>
</section>
```

This produces a vertical “stack of bands” with no tension, no asymmetry, and no editorial pacing.

**What to change:**

- Introduce a 12-column editorial grid and use intentional column spans instead of generic halves:
  - `BrandIntroSection`: text `col-span-5`, image `col-span-6 col-start-7`, per the PRD.
- Alternate alignments: left-locked section headers on one band, right-locked CTA on the next.
- Use full-bleed image breaks between content bands (e.g. a 60vh workshop image with a thin brass rule).
- Reduce vertical padding between adjacent same-background sections to `0` and separate them with a `border-t border-border` instead of repeating the same gutter.
- Vary motion entrance: some elements should slide from the left/right (`translateX`) rather than always fading up, to create rhythm.

---

## Priority 7 — Micro-interactions & Hover Language Are Basic
**Visual impact:** High (premium = motion quality)  
**Files:** `Button.svelte`, `ProjectCard.svelte`, `ServiceCard.svelte`, `Navigation.svelte`, `MaterialCard.svelte`

**Current state:**
- Cards scale to `1.03` over `duration-[600ms]`.
- Arrows translate 4px.
- Nav links only change color; active state is an underline.

**What to change:**

- Adopt a single easing family across the site. The PRD specifies `cubic-bezier(0.4, 0, 0.2, 1)` for UI and `cubic-bezier(0.25, 0.46, 0.45, 0.94)` for image reveals. Expose them as tokens:
  ```css
  --ease-ui: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-image: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  ```
- **Project cards:**
  - Image scale `1.05` over 500ms `ease-image`.
  - Bottom overlay fades in (opacity 0 → 1) only on hover, not visible by default.
  - Title translates `8px → 0` with a 100ms delay.
- **Service cards:** `translateY(-4px)` lift on hover, image scale `1.02`.
- **Nav links:** hover color becomes `text-accent` (brass), not just `text-text-primary`; active state should use `text-accent` or a small brass dot, not an underline.
- **Buttons:** add a subtle “press” state: `active:scale-[0.98]` for primary/outline, `transition-transform duration-100`.

---

## Priority 8 — No Loading / Placeholder / Perceived-Performance Strategy
**Visual impact:** High (cheapens the reveal)  
**File:** `src/lib/components/atoms/Image.svelte`, hero media

**Current state:**
```svelte
<img ... class="... transition-opacity duration-900 {loaded ? 'opacity-100' : 'opacity-0'}" />
```
Images simply pop from transparent to opaque. The Lighthouse report shows LCP at 2.7s and FCP at 2.4s.

**What to change:**

- Add a skeleton/placeholder container behind every lazy image:
  ```svelte
  <div class="relative bg-bg-secondary overflow-hidden">
    {#if !loaded}
      <div class="absolute inset-0 animate-pulse bg-gradient-to-r from-bg-secondary via-bg-tertiary to-bg-secondary"></div>
    {/if}
    <img ... />
  </div>
  ```
- For LCP hero: use `fetchpriority="high"`, `loading="eager"`, and ideally a tiny blurred LQIP placeholder that cross-fades.
- Add `decoding="async"` is already present; also add `width`/`height` attributes to prevent layout shift.
- Consider a short, elegant preloader for the first visit: a centered monogram + thin brass line, not a spinner.

---

## Priority 9 — Mobile Patterns Feel Unfinished
**Visual impact:** Medium-High (tablet/phone is a large share of HNWI browsing)  
**Files:** `Navigation.svelte`, `ProjectGrid.svelte`, `FilterPill.svelte`, `CookieBanner.svelte`, `ContactFormModal.svelte`

**Current issues:**
- Hamburger icon is an instant swap between `Menu` and `X` from `lucide-svelte`; no morph animation.
- Project grid on mobile simply stacks into a long feed; the PRD specifies horizontal scroll-snap.
- Filter pills are rectangular buttons that can overflow; no “pill” radius or bottom-sheet treatment.
- Cookie banner is a full-width block that pushes content up.
- Contact modal is a two-column grid that becomes cramped on small screens.

**What to change:**

- **Hamburger:** implement a custom SVG hamburger that animates the three lines into an X with `transform` (or use a small CSS-only animation).
- **Project grid mobile:**
  ```css
  .project-scroll {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
  }
  .project-scroll > * { scroll-snap-align: start; flex: 0 0 85vw; }
  ```
- **Filter pills:** switch to `rounded-full px-4 py-1.5 text-[13px]` and a scrollable row or bottom sheet on mobile.
- **Cookie banner:** collapse to a minimal bottom bar on mobile with a single “Accept / Customize” action, and move the detailed preferences into a modal.
- **Contact modal:** on `<md`, make the left image panel hidden and the form panel full-screen with safe-area padding.

---

## Priority 10 — Form UI Deviates from the Luxury Spec
**Visual impact:** Medium-High (the form is a conversion moment)  
**File:** `src/lib/components/organisms/ContactFormModal.svelte`

**Current state:**
- Inputs are boxed: `border border-text-primary/20 bg-surface px-4 py-3`.
- Default browser checkboxes.
- Errors are just `text-red-400` text.

**PRD spec:**
- Inputs: transparent background, bottom border only, 56px height, padding `16px 0`.
- Focus border: `#C4956A`.
- Error border: `#9B5A5A` + 3px solid left border on the input.
- Checkboxes: 20×20px, 1px border, `border-radius: 0`, checked background `#C4956A`.

**What to change:**

```svelte
<input
  class="w-full border-0 border-b border-white/20 bg-transparent py-4 font-sans text-base text-text-primary
         placeholder:text-text-secondary/60 focus:border-accent focus:outline-none
         transition-colors duration-200"
/>
```

- For errors, add `border-l-4 border-l-[#9B5A5A]` and change the bottom border to `[#9B5A5A]`.
- Build a custom `Checkbox.svelte` atom and replace the native checkboxes in `CookieBanner.svelte` and the form.
- Replace the static walnut image on the left of the modal with either a video loop or a higher-resolution texture that subtly zooms on open.

---

## Priority 11 — Featured Projects Layout Is Bento-Generic
**Visual impact:** Medium-High  
**File:** `src/lib/components/organisms/FeaturedProjectsSection.svelte`

**Current state:**
```svelte
<div class="grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-6">
  <div class="... {i === 0 ? 'md:col-span-2 lg:col-span-2 lg:row-span-2' : ''}">
```
First project spans two columns/rows, the remaining two stack beside/below. This creates an uneven, Pinterest-style block that competes for attention.

**PRD spec:** 3-column equal grid on desktop, 2-column tablet, 1-column mobile.

**What to change:**

```svelte
<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
  {#each featured as project}
    <ProjectCard {project} />
  {/each}
</div>
```

- Remove the `featured` prop on `ProjectCard` or keep it only for typography sizing, not layout spanning.
- If you want editorial drama, use a deliberate asymmetric layout (e.g. two large + one tall) with consistent gutters, not an accidental bento.

---

## Priority 12 — Filter Pills Are Rectangular, Not Refined
**Visual impact:** Medium  
**File:** `src/lib/components/molecules/FilterPill.svelte`

**Current class:**
```svelte
'border px-4 py-1.5 font-sans text-xs uppercase tracking-widest transition-colors'
```

**PRD spec:** `border-radius: 16px`, padding `6px 16px`, 13px weight 500, active fill `#1A1A1A` / `#0A0A0F`.

**What to change:**

```svelte
const baseClasses = 'rounded-full px-4 py-1.5 font-sans text-[13px] font-medium tracking-wide transition-all duration-200';

const stateClasses = active
  ? 'bg-text-primary text-bg-primary'
  : 'border border-white/15 text-text-secondary hover:border-white/40 hover:text-text-primary';
```

- Add optional `count` display styled as `opacity-60`.

---

## Priority 13 — Missing Ambient Texture & Depth Cues
**Visual impact:** Medium (premium sites use these to “feel expensive”)  
**Scope:** Site-wide

**Current state:** flat `#0A0A0F` backgrounds, no noise, no subtle borders, no depth.

**What to change:**

- Add a global noise overlay at very low opacity:
  ```css
  .noise::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.03;
    background-image: url("data:image/svg+xml,...feTurbulence...");
  }
  ```
- Use 1px hairline separators in `rgba(240,235,227,0.06)` between same-background sections instead of large padding gaps.
- Add a very subtle inner shadow to elevated cards (`bg-bg-secondary`) via a `box-shadow: inset 0 1px 0 rgba(255,255,255,0.03)` to lift them off the page.

---

## Priority 14 — Map Embed Is a Generic Grayscale Google Map
**Visual impact:** Medium  
**File:** `src/lib/components/organisms/MapEmbed.svelte`

**Current state:** iframe with `grayscale` filter. The standard Google Maps UI (zoom buttons, attribution, Google logo) breaks the luxury aesthetic.

**What to change:**

- Replace the iframe with a custom-styled static map image (e.g. Mapbox static API or Google Static Map) cropped to the location.
- Overlay a refined location card with the address and “Get directions” link on top of the map image.
- If an interactive map is required, use Mapbox GL JS with a custom dark style and hide all default UI chrome.

---

## Priority 15 — Logo Is SVG Text with Manual Metrics
**Visual impact:** Low-Medium (but visible on every page)  
**File:** `src/lib/components/atoms/Logo.svelte`

**Current state:** five separate `<text>` elements with hardcoded `x` positions. This relies on the browser’s text metrics and can shift subtly across devices, and the spacing looks mechanical rather than optically kerned.

**What to change:**

- Convert the wordmark to SVG `<path>` outlines (or a single `<text>` with proper `letter-spacing` and `font-feature-settings`).
- If keeping text, use `letter-spacing: 0.12em` on a single `TINEO` string rather than five separate elements.
- Add a monogram variant (`mode="monogram"`) that is a clean path-based “T” for favicon/social use.

---

## Honorable Mentions (Lower Priority but Worth Logging)

- **Parallax prop is non-functional.** `Image.svelte` accepts `parallax` but only adds a `.parallax-image` class with no CSS/JS. Either implement GSAP `yPercent` parallax or remove the prop.
- **VideoPlayer overlay is too dark.** `bg-bg-primary/20` over a paused video is heavy; reduce to `bg-bg-primary/10` and use a larger, brass-rimmed play button.
- **No page transition.** SvelteKit page changes are instant. A 300ms cross-fade or slide on route change would add polish.
- **No scroll progress indicator.** Top-tier sites often use a thin brass line at the top of the viewport.
- **About page uses inline markup** instead of the `Heading`/`Text` atoms, creating inconsistent styling and harder maintenance.

---

## Recommended Implementation Order

1. **Color tokens** (1 hour, touches every component).
2. **Button primary + nav CTA** (30 min).
3. **Hero video + centering + text-shadow** (2–4 hours, needs asset).
4. **Image warm overlay + object-position** (2 hours).
5. **Typography rendering + text-balance + drop cap** (1 hour).
6. **Section editorial grid / asymmetric layouts** (4–6 hours).
7. **Hover/micro-interaction pass** (2–3 hours).
8. **Image skeleton + LCP optimization** (2 hours).
9. **Mobile hamburger / grid / cookie** (3–4 hours).
10. **Form restyle + custom checkbox** (3 hours).
11. **Featured projects layout + filter pills** (1–2 hours).
12. **Noise/texture + map + logo polish** (2–3 hours).

---

## Summary Table

| # | Issue | Component(s) | Fix Complexity | Visual Impact |
|---|---|---|---|---|
| 1 | Color token drift | `app.css`, all atoms | Low | Highest |
| 2 | Primary CTA wrong | `Button.svelte`, `Navigation.svelte`, `Footer.svelte` | Low | Very High |
| 3 | Hero is static poster | `HeroSection.svelte` | Medium | Very High |
| 4 | Image treatments inconsistent | `ProjectCard`, `ServiceCard`, `PageHeroSection`, `Image` | Medium | High |
| 5 | Typography not optically tuned | `app.css`, `Heading.svelte`, `Text.svelte` | Low | High |
| 6 | Templated centered-container rhythm | All organisms | Medium-High | High |
| 7 | Basic hover/micro-interactions | `Button`, `ProjectCard`, `ServiceCard`, `Navigation` | Medium | High |
| 8 | No loading/placeholder strategy | `Image.svelte`, hero | Medium | High |
| 9 | Mobile patterns unfinished | `Navigation`, `ProjectGrid`, `CookieBanner`, modal | Medium | Medium-High |
| 10 | Form UI off-spec | `ContactFormModal.svelte` | Medium | Medium-High |
| 11 | Featured projects bento layout | `FeaturedProjectsSection.svelte` | Low | Medium |
| 12 | Filter pills rectangular | `FilterPill.svelte` | Low | Medium |
| 13 | Missing ambient texture | Site-wide | Low | Medium |
| 14 | Generic grayscale map | `MapEmbed.svelte` | Medium | Medium |
| 15 | Logo is text-with-manual-spacing | `Logo.svelte` | Low | Low-Medium |
