# Áras Living Premium Custom Furniture Website — PRD

## Vision

Build a premium, dark-luxury static website for a custom furniture brand launching in Ireland. The site establishes market presence through cinematic visuals, editorial typography, and a friction-minimized lead-capture flow. It is an MVP: static SvelteKit, no backend, no CMS, no e-commerce.

## Functional Requirements

- Home page with fullscreen hero video/poster, brand intro, services preview, featured projects, process timeline, testimonials, and CTA banner.
- About page with page hero, brand story, craftsmanship section, team grid, and differentiators.
- Services page with residential/commercial offerings, process explanation, and materials showcase.
- Projects page with filterable grid, load-more behavior, and empty/loading states.
- Project detail page with hero gallery, description, media gallery with lightbox, specifications, and related projects.
- Contact page with contact methods, embedded map, business hours, and WhatsApp floating button.
- Global "Discuss a Project" modal form with Zod validation, file upload, honeypot, and Formspree/Basin submission.
- Cookie consent banner with necessary/analytics/marketing toggles and GDPR-compliant legal pages.
- i18n infrastructure (svelte-i18n) with English active and stubs for FR/DE/ES/PL.

## Non-Functional Requirements

- SvelteKit 2.x + adapter-static + TypeScript + Tailwind CSS v4.
- Lighthouse score ≥ 90 across Performance, Accessibility, Best Practices, SEO.
- LCP < 2.5s, CLS < 0.1 on 4G.
- Fully prerendered static HTML, deployable to Vercel Edge/CDN.
- GSAP ScrollTrigger animations with reduced-motion support.

## Architecture Decisions

- **Framework:** SvelteKit with `adapter-static` for backend-free static output.
- **Styling:** Tailwind CSS v4 CSS-only configuration with custom `@theme` tokens.
- **State:** Svelte 5 runes for form, consent, navigation, and lightbox state.
- **Images:** `@sveltejs/enhanced-img` for responsive images; static folder for favicon/robots/sitemap.
- **Form:** Client-side submission to Formspree/Basin endpoint configured via env var.
- **Analytics:** GA4 + Meta Pixel gated by cookie consent; scripts load only after grant.
- **i18n:** Optional route parameter `[[lang]]` with English as default; other locales stubbed.

## Constraints

- No server-side runtime; all content compiled at build time.
- No CMS; content lives in typed TypeScript data files.
- No real video files shipped; hero uses a static poster image.
- Placeholder images are generated in a Poggenpohl-inspired dark-moody style; they must be replaced with commissioned photography before launch.
- Legal copy uses consistent placeholders derived from `site.ts`; real company details and legal review are required before production.

## Current Focus

Design v3 Option C — Full Product-Ready Expansion is in progress. After completing the focused polish pass, the plan was approved to add 9 new routes, deep content layers, and cinematic WOW interactions inspired by Poggenpohl Segmento. Work is being executed in parallel by content, design-system, assets, page, and QA agents. The site will use fictional but premium placeholder content to demonstrate a launch-ready product, with real client details and commissioned photography to be swapped in before public launch.

## Design v2 — Poggenpohl +SEGMENTO Direction

- **Reference:** https://www.poggenpohl.com/en/kitchen-architecture/products/segmento/
- **Principles translated to Áras Living:** handleless minimalism, thin planes, material honesty, calm objectivity, monolithic effect, timelessness.
- **Visual system:** dark-luxury foundation with a quieter material palette (`#A68A64` accent, `#B8B4AD` stone, `#F5F3EF` text); display serif + technical sans; generous whitespace; thin hairline rules; no rounded corners on images.
- **Components:** off-white primary CTA, outline secondary, ghost arrow links; refined SVG wordmark; image-first project/service/material cards; typographic principles block instead of icon feature cards; minimal cookie banner; no WhatsApp FAB.
- **Motion:** slower GSAP reveals (0.9–1.2s), clip-mask heading reveals, parallax, reduced-motion guard.
- **Content:** brand voice rewritten to be restrained, architectural, material-first; tagline "Furniture, measured in millimetres."; services renamed (Wardrobes & Dressing Rooms, Kitchens, Living Joinery, Workplaces, etc.); projects page "Selected Work".
- **Imagery:** 94 new Poggenpohl-inspired placeholder JPEGs generated via Pillow (hero, page heroes, services, materials, 8 project sets, team, OG images).

## Verification Results

- `npm run check`: 0 errors, 0 warnings
- `npm run build`: successful static output
- **Lighthouse home page (mobile):** Performance 94, Accessibility 100, Best Practices 100, SEO 100
- **Core Web Vitals:** LCP 2.5s, CLS 0.059, TBT 40ms

## Design v3 — Focused Premium Polish

- **Goal:** Raise perceived premiumness without adding new placeholder content or routes.
- **Colour tokens corrected:** accent `#C4956A` brass, primary text `#F0EBE3` warm cream, secondary `#9A9590` warm gray, borders `rgba(240,235,227,0.08)`.
- **Typography:** global antialiasing + `text-rendering: optimizeLegibility`; `text-balance` on display/serif headings.
- **Primary CTA:** brass, sharp-cornered, uppercase, no shadow; used consistently in nav and footer.
- **Hero:** Ken Burns zoom on optimized WebP poster (29KB) with JPG fallback; uniform warm overlay; centered headline with text-shadow.
- **Image treatment:** warm multiply overlay utility, skeleton loading placeholder, explicit width/height support.
- **Micro-interactions:** unified `--ease-ui` / `--ease-image`; project cards scale 1.05 + overlay fade + title lift; service/material card lift; nav brass hover dot.
- **Filter pills:** rounded-full, 13px medium, refined active/inactive states.
- **Forms:** bottom-border inputs, error left border, custom checkbox atom.
- **Ambient details:** fixed film-grain noise overlay, 2px brass scroll-progress bar.
- **Transitions:** one-time preloader curtain (monogram + brass line), route-change crossfade overlay.
- **Mobile:** horizontal scroll-snap project grid, minimal cookie banner, animated hamburger-to-X.

## Design v3 Option C — Full Product-Ready Expansion

- **Goal:** Transform the MVP into a cohesive, premium, product-ready experience that creates a genuine WOW first impression.
- **Reference:** https://www.poggenpohl.com/en/kitchen-architecture/products/segmento/
- **Approach:** Add 9 new static routes, enrich existing data, introduce cinematic interactions, and generate ~35–45 new premium placeholder images.
- **New routes:** `/materials`, `/materials/[slug]`, `/process`, `/showroom`, `/commercial`, `/insights`, `/insights/[slug]`, `/services/[slug]`, `/faq`.
- **Content layers:** expanded material library with swatches and applications; 8-moment process journey; showroom visit page with maker spotlights; B2B commercial landing; 3 journal articles; searchable FAQ; enriched service and project detail pages.
- **WOW components:** sticky-scroll narrative, horizontal material gallery, material palette builder/configurator, split-text reveal, magnetic card hover, clip-path image reveal, parallax layers.
- **Content strategy:** high-quality fictional but realistic placeholder copy and generated imagery to maximise demo impact; real copy and photography to replace placeholders before launch.
- **Performance guardrails:** lazy-load GSAP ScrollTrigger, respect `prefers-reduced-motion`, keep Lighthouse mobile ≥ 90, images as WebP ≤ 200 KB.

## Decisions Log

- **2026-06-25** — Selected **Áras Living** as public brand name (Option A from PRD) for brevity, cross-lingual pronounceability, and subtle Irish etymology.
- **2026-06-25** — Confirmed SvelteKit 2 + adapter-static + Tailwind CSS v4 + GSAP stack per PRD technical specification.
- **2026-06-25** — Decided to ship poster-fallback hero video (no real video files) to keep repo lightweight while retaining video component readiness.
- **2026-06-25** — Completed design v2 refactor inspired by Poggenpohl +SEGMENTO: new tokens, components, content, and 94 regenerated placeholder images.
- **2026-06-25** — Completed design v3 focused polish: corrected tokens, Ken Burns hero, card hover language, ambient texture, transitions, and mobile refinements.
- **2026-06-25** — Approved and began design v3 Option C — Full Product-Ready Expansion: 9 new routes, deep content, WOW components, and ~35–45 new images.
