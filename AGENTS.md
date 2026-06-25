# Áras Living — Agent Notes

## Project

Premium dark-luxury static website for a custom furniture brand launching in Ireland. Built with SvelteKit 2.x, `adapter-static`, TypeScript, Tailwind CSS v4, and GSAP.

## Working directory

`/Users/mk/Documents/Personal/Code/tp`

## Key commands

- `npm run check` — Svelte + TypeScript diagnostics
- `npm run build` — static build (requires Node.js ≥ v22.13 for the bundled pnpm)
- `npm run preview -- --port 4185` — preview production build locally

If the environment is on Node.js v22.12, the build script fails because the installed `pnpm@11.5.2` requires v22.13+. Switch with:

```bash
source ~/.nvm/nvm.sh && nvm use 22.13.0
```

## Current state (v3 Option C — Full Product-Ready Expansion)

- Design tokens corrected to warm brass/cream palette (`#C4956A`, `#F0EBE3`, `#9A9590`).
- Homepage hero uses a Ken Burns zoom on an optimized WebP poster with JPG fallback.
- Primary CTA is brass, sharp-cornered, uppercase, no shadow.
- Global ambient noise overlay + brass scroll-progress bar.
- Image warm-overlay utility + skeleton loading placeholders.
- Refined card hover language (project, service, material cards) + `MagneticCard` hover.
- Rounded filter pills, bottom-border form inputs, custom checkbox atom.
- One-time preloader curtain + route-transition overlay.
- Mobile horizontal scroll-snap project grid + minimal cookie banner.
- New content layer: detailed material library, 8-moment process journey, showroom page, commercial/B2B page, 3 journal articles, searchable FAQ, enriched service and project detail pages.
- New WOW components: `StickyScrollNarrative`, `HorizontalMaterialGallery`, `MaterialPaletteBuilder`, `SplitTextReveal`, `MagneticCard`, `ImageReveal`.
- Expanded to 18+ routes (home, about, services, service detail, projects, project detail, materials, material detail, process, showroom, commercial, insights, insight detail, contact, FAQ, legal pages).

## Verification

- `npm run check`: 0 errors, 0 warnings
- `npm run lint`: passes
- `npm run build`: successful static output with 43 URLs
- Lighthouse scores pending QA Agent run (target mobile ≥ 90 across Performance, Accessibility, Best Practices, SEO)
- Core Web Vitals target: LCP < 2.5s, CLS < 0.1, TBT < 100ms

## Before launch

- Replace all placeholder/generated images with commissioned photography.
- Replace placeholder company/legal details in `src/lib/data/site.ts` and `src/lib/data/legal.ts` with real information.
- Replace placeholder team bios in `src/lib/data/team.ts` with real names and bios.
- Review and update privacy policy, terms, and cookie policy copy.
- Configure real Formspree/Basin form endpoint via environment variable.
- Confirm GA4 / Meta Pixel IDs and cookie consent behaviour.

## Notes

- v3 Option C added 9 new routes and enriched existing content; the site is now a full product-ready demo.
- `static/videos/hero-loop.*` files were removed; hero uses poster image only.
- `src/lib/components/atoms/Video.svelte` is unused after v3 but retained for future use.
- New routes use dynamic `+page.ts` with `entries()` for static prerendering.
- `src/lib/utils/imageFallback.ts` provides build-time fallbacks so placeholder images can be swapped cleanly later.
