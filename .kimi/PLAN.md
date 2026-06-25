# Áras Living Premium Custom Furniture Website — Implementation Plan

> Based on PRD v1.0 (`/Users/mk/Documents/Personal/Code/tp/PRD.md`)  
> Framework: SvelteKit 2 + `adapter-static` + TypeScript + Tailwind CSS v4  
> Target host: Vercel Edge/CDN  
> Scope: MVP static lead-generation site, no backend, no CMS, no e-commerce.

---

## 1. Brand & Naming Decision

| Decision | Value |
|---|---|
| Public brand name | **Áras Living** (Option A) |
| Legal entity | `[Existing Company Name]` — remains on contracts, invoices, footer, legal pages |
| Primary domain | `https://arasliving.ie` |
| Secondary domain | `https://arasliving.com` → 301-redirects to `arasliving.ie` at launch |
| Future EU/Canada switch | `arasliving.com` becomes canonical; `arasliving.ie` 301-redirects to `arasliving.com/ie/` |
| Email | `hello@arasliving.ie` (primary), aliases: `info@`, `projects@`, `support@` |
| Social handles | Instagram, Pinterest, LinkedIn (`@arasliving`) |

**Rationale:** Áras Living is short, cross-lingual, premium-sounding, has high domain availability, and carries a subtle Irish etymology (`tinne`, Old Irish for iron bar / rod) that signals precision and structural craft.

---

## 2. Content Inventory

### 2.1 Global Text Content
- Brand tagline: *"Handcrafted Furniture, Designed for Your Space"*
- Sub-tagline: *"Custom wardrobes, kitchens, and interiors. Built in Dublin, delivered across Ireland."*
- CTA: *"Discuss a Project"* (global)
- Footer CTA: *"Have a project in mind?"*
- Company legal name placeholder: `[Existing Company Name]`
- Address: `Dublin, Ireland` (by appointment only)
- WhatsApp: `+353 [XX XXX XXXX]` (env var)
- Business hours: Mon–Fri 09:00–17:30

### 2.2 Projects (minimum 8)

| Slug | Title | Category | Location | Short Description | Key Specs | Image Placeholders |
|---|---|---|---|---|---|---|
| `penthouse-wardrobe-suite` | Penthouse Wardrobe Suite | Residential | Dublin 4 | Floor-to-ceiling walnut walk-in closet with soft-close drawers, LED lighting, and brass hardware. | Materials: European Walnut, Brass Hardware. Finishes: Hand-rubbed oil, satin lacquer. Hardware: Blum soft-close, LED strips. Timeline: 8 weeks. Year: 2024. | `/images/projects/penthouse-wardrobe-suite/hero.jpg`, `detail-1.jpg`…`detail-5.jpg` |
| `blackrock-kitchen` | Blackrock Kitchen | Residential | Blackrock, Co. Dublin | Handleless matte charcoal bespoke kitchen with island, stone worktop, and integrated appliances. | Materials: Charcoal lacquer, quartz worktop, oak internals. Hardware: Grass drawer systems. Timeline: 10 weeks. Year: 2024. | `/images/projects/blackrock-kitchen/hero.jpg`, `detail-1.jpg`…`detail-5.jpg` |
| `shelbourne-fittings` | The Shelbourne Fittings | Commercial | Dublin 2 | Luxury hotel lobby lounge furniture and reception joinery for a 5-star property. | Materials: American Walnut, brass, velvet upholstery. Finish: Satin lacquer. Timeline: 12 weeks. Year: 2023. | `/images/projects/shelbourne-fittings/hero.jpg`, `detail-1.jpg`…`detail-5.jpg` |
| `ranelagh-alcove-library` | Ranelagh Alcove Library | Residential | Ranelagh, Dublin 6 | Built-in bookshelves and window seat designed around a period bay window. | Materials: European Oak, hand-painted backing. Hardware: LED strip. Timeline: 6 weeks. Year: 2024. | `/images/projects/ranelagh-alcove-library/hero.jpg`, `detail-1.jpg`…`detail-5.jpg` |
| `dublin-office-fitout` | Dublin Office Fit-out | Commercial | Dublin 1 | Reception desk, boardroom table, and breakout kitchen for a creative agency. | Materials: White Ash, Fenix worktops, black steel. Timeline: 14 weeks. Year: 2023. | `/images/projects/dublin-office-fitout/hero.jpg`, `detail-1.jpg`…`detail-5.jpg` |
| `howth-walk-in-closet` | Howth Walk-in Closet | Residential | Howth, Co. Dublin | Boutique-style dressing room with central island, full-height mirror, and automated lighting. | Materials: American Walnut, brushed brass, glass. Hardware: Hettich sliding, LED sensors. Timeline: 9 weeks. Year: 2024. | `/images/projects/howth-walk-in-closet/hero.jpg`, `detail-1.jpg`…`detail-5.jpg` |
| `dalkey-retail-interior` | Dalkey Retail Interior | Commercial | Dalkey, Co. Dublin | Bespoke display shelving, counter, and fitting-room joinery for an independent boutique. | Materials: European Oak, brass, micro-cement. Timeline: 8 weeks. Year: 2024. | `/images/projects/dalkey-retail-interior/hero.jpg`, `detail-1.jpg`…`detail-5.jpg` |
| `malahide-media-wall` | Malahide Media Wall | Residential | Malahide, Co. Dublin | Floor-to-ceiling media unit with concealed cable management and integrated storage. | Materials: Painted finish, oak shelving, black steel. Hardware: Push-latch doors. Timeline: 7 weeks. Year: 2024. | `/images/projects/malahide-media-wall/hero.jpg`, `detail-1.jpg`…`detail-5.jpg` |

### 2.3 Services

**Residential**
1. Custom Wardrobes — fitted, sliding/hinged doors, soft-close, LED.
2. Bespoke Kitchens — handleless, traditional, contemporary, stone/timber tops.
3. Walk-in Closets — boutique-style dressing spaces, islands, mirrors.
4. Living Spaces — media units, bookshelves, alcove cabinets, window seats.

**Commercial**
1. Office Fit-outs — reception desks, boardrooms, breakout spaces.
2. Retail Interiors — display shelving, counters, fitting rooms.
3. Hospitality — bars, banquette seating, hotel wardrobes.
4. Custom Solutions — one-off commissions, unusual briefs.

### 2.4 Materials

| Material | Description | Image Placeholder |
|---|---|---|
| European Oak | Durable, distinctive grain, warm tone. | `/images/materials/european-oak.jpg` |
| American Walnut | Rich, dark, luxurious appearance. | `/images/materials/american-walnut.jpg` |
| White Ash | Light, contemporary, clean look. | `/images/materials/white-ash.jpg` |
| Painted Finishes | Any colour, hand-finished perfection. | `/images/materials/painted-finishes.jpg` |
| Veneer Options | Premium wood veneers for large surfaces. | `/images/materials/veneer-options.jpg` |
| Hardware | Soft-close hinges, premium handles. | `/images/materials/hardware.jpg` |

### 2.5 Testimonials

| Quote | Name | Location |
|---|---|---|
| "The attention to detail was extraordinary. Our walk-in closet feels like a luxury hotel suite." | Sarah M. | Dublin 6 |
| "Professional from start to finish. The kitchen they built is the heart of our home now." | David & Aileen K. | Blackrock |
| "They understood our brand and delivered a retail interior that our customers constantly compliment." | James T. | Dublin 2 |

### 2.6 Team Members (Phase 2 / placeholders for MVP)

| Name | Role | Photo Placeholder |
|---|---|---|
| `[Founder Name]` | Founder & Lead Designer | `/images/team/founder.jpg` |
| `[Workshop Manager Name]` | Workshop Manager | `/images/team/workshop-manager.jpg` |
| `[Senior Craftsman Name]` | Senior Craftsman | `/images/team/senior-craftsman.jpg` |
| `[Design Consultant Name]` | Design Consultant | `/images/team/design-consultant.jpg` |

### 2.7 Legal Pages Content Structure

**Privacy Policy (`/privacy`)**
1. Identity & contact details of data controller
2. Data Protection Officer (or statement of exemption)
3. Categories of personal data collected (form + optional analytics/marketing cookies)
4. Purposes & legal basis (contract, legitimate interest, consent)
5. Recipients / third-party processors
6. International transfers & SCCs
7. Retention periods
8. Data subject rights
9. Right to lodge a complaint (Data Protection Commission Ireland)
10. Voluntary nature of data / no automated decision-making
11. Last updated date

**Terms of Service (`/terms`)**
1. Scope of services
2. Quotations, deposits & payment terms
3. Lead times, delivery & installation
4. Cancellations & refunds
5. Warranty on workmanship
6. Limitation of liability
7. Governing law & jurisdiction (Ireland / EU)
8. Dispute resolution

**Cookie Policy (`/cookies`)**
1. What cookies are
2. Categories: Necessary, Analytics, Marketing
3. Specific cookies table (name, purpose, duration, controller)
4. How to manage / withdraw consent
5. Embedded live preference toggle (mirrors banner)
6. Last updated date

---

## 3. File Structure

```
aras-living-website/
├── .kimi/
│   └── PLAN.md
├── scripts/
│   ├── generate-sitemap.ts
│   └── optimize-images.ts          # optional pre-build image script
├── src/
│   ├── app.css                     # Tailwind v4 + custom theme tokens
│   ├── app.html
│   ├── lib/
│   │   ├── assets/
│   │   │   ├── fonts/
│   │   │   ├── images/             # source images (processed by enhanced-img)
│   │   │   └── videos/             # source video poster frames only for MVP
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   │   ├── Button.svelte
│   │   │   │   ├── Input.svelte
│   │   │   │   ├── Textarea.svelte
│   │   │   │   ├── Select.svelte
│   │   │   │   ├── TogglePill.svelte
│   │   │   │   ├── FileDrop.svelte
│   │   │   │   ├── Heading.svelte
│   │   │   │   ├── Text.svelte
│   │   │   │   ├── Eyebrow.svelte
│   │   │   │   ├── Divider.svelte
│   │   │   │   ├── Image.svelte
│   │   │   │   ├── Video.svelte
│   │   │   │   ├── Icon.svelte
│   │   │   │   └── Logo.svelte
│   │   │   ├── molecules/
│   │   │   │   ├── ProjectCard.svelte
│   │   │   │   ├── ServiceCard.svelte
│   │   │   │   ├── MaterialCard.svelte
│   │   │   │   ├── TestimonialCard.svelte
│   │   │   │   ├── ProcessStep.svelte
│   │   │   │   ├── TeamCard.svelte
│   │   │   │   ├── FilterPill.svelte
│   │   │   │   ├── SeoHead.svelte
│   │   │   │   ├── CookieBanner.svelte
│   │   │   │   ├── ContactMethod.svelte
│   │   │   │   ├── Lightbox.svelte
│   │   │   │   ├── VideoPlayer.svelte
│   │   │   │   ├── Autocomplete.svelte
│   │   │   │   └── WhatsappLink.svelte
│   │   │   └── organisms/
│   │   │       ├── Navigation.svelte
│   │   │       ├── Footer.svelte
│   │   │       ├── WhatsAppFab.svelte
│   │   │       ├── ContactFormModal.svelte
│   │   │       ├── HeroSection.svelte
│   │   │       ├── BrandIntroSection.svelte
│   │   │       ├── ServicesPreviewSection.svelte
│   │   │       ├── FeaturedProjectsSection.svelte
│   │   │       ├── ProcessOverviewSection.svelte
│   │   │       ├── TestimonialsSection.svelte
│   │   │       ├── CTABannerSection.svelte
│   │   │       ├── PageHeroSection.svelte
│   │   │       ├── ProjectGrid.svelte
│   │   │       ├── ProjectDetailHeader.svelte
│   │   │       ├── ProjectGallery.svelte
│   │   │       ├── SpecificationsTable.svelte
│   │   │       ├── RelatedProjects.svelte
│   │   │       ├── ServicesListSection.svelte
│   │   │       ├── MaterialsShowcase.svelte
│   │   │       ├── ProcessTimeline.svelte
│   │   │       ├── TeamGrid.svelte
│   │   │       ├── WhyUsGrid.svelte
│   │   │       ├── ContactInfoSection.svelte
│   │   │       └── MapEmbed.svelte
│   │   ├── data/
│   │   │   ├── site.ts             # global site config / contacts / socials
│   │   │   ├── projects.ts         # project case-study data
│   │   │   ├── services.ts         # residential + commercial services
│   │   │   ├── materials.ts
│   │   │   ├── testimonials.ts
│   │   │   ├── team.ts
│   │   │   ├── processSteps.ts
│   │   │   ├── locations.ts        # Irish county/city autocomplete list
│   │   │   └── legal.ts            # structured legal page copy
│   │   ├── i18n/
│   │   │   ├── index.ts
│   │   │   └── locales/
│   │   │       ├── en.json         # fully populated
│   │   │       ├── fr.json         # `{}` stub
│   │   │       ├── de.json         # `{}` stub
│   │   │       ├── es.json         # `{}` stub
│   │   │       └── pl.json         # `{}` stub
│   │   ├── stores/
│   │   │   ├── cookieConsent.svelte.ts
│   │   │   ├── formState.svelte.ts
│   │   │   ├── navigation.svelte.ts
│   │   │   ├── projectFilter.svelte.ts
│   │   │   └── lightbox.svelte.ts
│   │   ├── types/
│   │   │   ├── furniture.ts
│   │   │   ├── form.ts
│   │   │   ├── seo.ts
│   │   │   └── i18n.ts
│   │   └── utils/
│   │       ├── seo.ts
│   │       ├── validation.ts
│   │       ├── analytics.ts
│   │       ├── video.ts
│   │       ├── helpers.ts
│   │       └── constants.ts
│   └── routes/
│       ├── +layout.svelte          # nav, footer, cookie banner, modal, analytics gating
│       ├── +layout.ts              # prerender = true, trailingSlash = 'always'
│       ├── +error.svelte
│       ├── [[lang]]/
│       │   ├── +page.svelte        # Home
│       │   ├── +page.ts            # optional: load featured data
│       │   ├── about/
│       │   │   └── +page.svelte
│       │   ├── services/
│       │   │   └── +page.svelte
│       │   ├── projects/
│       │   │   ├── +page.svelte
│       │   │   └── [slug]/
│       │   │       ├── +page.svelte
│       │   │       └── +page.ts    # entries generator
│       │   ├── contact/
│       │   │   └── +page.svelte
│       │   ├── privacy/
│       │   │   └── +page.svelte
│       │   ├── terms/
│       │   │   └── +page.svelte
│       │   └── cookies/
│       │       └── +page.svelte
│       └── +page.server.ts         # root `/` redirect to `/en/` (or edge config)
├── static/
│   ├── fonts/
│   │   ├── CormorantGaramond-*.woff2
│   │   └── Inter-*.woff2
│   ├── favicon.ico
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── og-default.jpg
│   ├── og-home.jpg
│   ├── og-about.jpg
│   ├── og-services.jpg
│   ├── og-projects.jpg
│   ├── og-contact.jpg
│   ├── robots.txt
│   └── sitemap.xml                 # generated by scripts/generate-sitemap.ts
├── .env.example
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── package.json
├── pnpm-lock.yaml
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 4. Component List

### 4.1 Atoms

| Component | Props | Notes |
|---|---|---|
| `Button` | `variant: 'primary' \| 'secondary' \| 'ghost'`, `size: 'sm' \| 'md' \| 'lg'`, `type`, `disabled`, `children`, `onclick` | Square corners, gold primary |
| `Input` | `name`, `type`, `label`, `placeholder`, `required`, `error`, `value` (bindable), `autocomplete` | Bottom-border-only dark theme |
| `Textarea` | `name`, `label`, `placeholder`, `required`, `error`, `maxlength`, `value` (bindable) | Character counter via parent |
| `Select` | `name`, `label`, `options`, `value` (bindable), `error` | Custom chevron |
| `TogglePill` | `options: string[]`, `value` (bindable), `name`, `icons?` | Residential / Commercial toggle |
| `FileDrop` | `name`, `accept`, `maxFiles`, `maxSizeMB`, `files` (bindable), `error` | Drag-and-drop + preview list |
| `Heading` | `as: 'h1'..'h6'`, `variant: 'display' \| 'serif' \| 'sans'`, `class?` | Typography tokens |
| `Text` | `variant: 'body' \| 'body-lg' \| 'caption' \| 'muted'`, `class?` | Body text wrapper |
| `Eyebrow` | `text: string` | Uppercase label in gold |
| `Divider` | `class?` | 1px rule |
| `Image` | `src`, `alt`, `sizes`, `loading?`, `priority?`, `class?` | Wraps `enhanced:img` |
| `Video` | `mp4`, `webm?`, `poster`, `autoplay?`, `loop?`, `muted?`, `class?` | Intersection observer play/pause |
| `Icon` | `name: string`, `size?: number`, `strokeWidth?: number`, `class?` | Lucide icon wrapper |
| `Logo` | `variant: 'light' \| 'dark'`, `class?` | SVG text logo |

### 4.2 Molecules

| Component | Props | Notes |
|---|---|---|
| `ProjectCard` | `project: Project` | 4:5 aspect, hover overlay, category/location |
| `ServiceCard` | `service: Service`, `variant: 'horizontal' \| 'stacked'` | Icon, title, description, CTA |
| `MaterialCard` | `material: Material` | 1:1 swatch, hover scale |
| `TestimonialCard` | `quote, name, location` | Decorative quote mark |
| `ProcessStep` | `number, title, description` | For 4-step timeline |
| `TeamCard` | `member: TeamMember` | Grayscale→color hover |
| `FilterPill` | `label, value, count, active, onclick` | Sticky filter bar |
| `SeoHead` | `title, description, image?, type?, noindex?` | `<svelte:head>` wrapper |
| `CookieBanner` | — | Consent accept/reject/customize |
| `ContactMethod` | `icon, label, value, href?, subtext?` | Email/WhatsApp/Location |
| `Lightbox` | `images: ImageItem[], startIndex, open, onclose` | Keyboard navigation |
| `VideoPlayer` | `sources, poster, controls?` | Custom play/pause overlay |
| `Autocomplete` | `value (bindable), options, maxResults, placeholder` | Irish locations |
| `WhatsappLink` | `message?, class?, children?` | Pre-filled wa.me link |

### 4.3 Organisms

| Component | Props | Notes |
|---|---|---|
| `Navigation` | — | Fixed header, mobile hamburger, CTA |
| `Footer` | — | Multi-column, socials, legal |
| `WhatsAppFab` | — | Fixed floating button |
| `ContactFormModal` | `preselectedType?: 'residential' \| 'commercial'` | Fullscreen modal form |
| `HeroSection` | `videoPoster, headline, subheadline, ctaLabel` | 100vh video/image hero |
| `BrandIntroSection` | — | 2-col text + workshop image |
| `ServicesPreviewSection` | — | 3 service cards |
| `FeaturedProjectsSection` | `projects: Project[]` | 3-card curated grid |
| `ProcessOverviewSection` | — | 4-step horizontal timeline |
| `TestimonialsSection` | `testimonials: Testimonial[]` | 3-column grid |
| `CTABannerSection` | `headline, subtext?, ctaLabel` | Full-width closing CTA |
| `PageHeroSection` | `eyebrow, headline, subheadline?, image, height?` | Interior page hero |
| `ProjectGrid` | `projects: Project[]` | Filterable grid + load more |
| `ProjectDetailHeader` | `project: Project` | Breadcrumb, title, tags, location |
| `ProjectGallery` | `media: MediaItem[]` | Masonry grid + lightbox |
| `SpecificationsTable` | `specs: Record<string,string>` | 2-col spec table |
| `RelatedProjects` | `currentSlug, projects: Project[]` | 2–3 related by category |
| `ServicesListSection` | `services: Service[], id` | Stacked 2-col service items |
| `MaterialsShowcase` | `materials: Material[]` | 4-col grid |
| `ProcessTimeline` | `steps: ProcessStep[]` | Vertical step list |
| `TeamGrid` | `team: TeamMember[]` | 4-col grid |
| `WhyUsGrid` | `items: WhyUsItem[]` | 3×2 icon grid |
| `ContactInfoSection` | — | Email/WhatsApp/Location + CTA |
| `MapEmbed` | — | Google Maps iframe with dark style |

---

## 5. Page Specifications

### 5.1 Home (`/en/` → canonical `/`)

| # | Section | Components Used | Data Source | SEO |
|---|---|---|---|---|
| 1 | Hero | `HeroSection`, `Button` | `site.ts` (headline/CTA) | Title: *Áras Living — Custom Furniture, Crafted in Ireland*; Desc: *Bespoke wardrobes, kitchens and interiors. Built in Dublin, delivered across Ireland.*; OG: `og-home.jpg` |
| 2 | Brand Intro | `BrandIntroSection`, `Eyebrow`, `Heading`, `Text`, `Image`, `Button` | `site.ts`, `projects.ts` | — |
| 3 | Services Preview | `ServicesPreviewSection`, `ServiceCard` | `services.ts` | — |
| 4 | Featured Projects | `FeaturedProjectsSection`, `ProjectCard` | `projects.ts` (featured flag) | — |
| 5 | Process Overview | `ProcessOverviewSection`, `ProcessStep` | `processSteps.ts` | — |
| 6 | Testimonials | `TestimonialsSection`, `TestimonialCard` | `testimonials.ts` | — |
| 7 | CTA Banner | `CTABannerSection`, `Button` | `site.ts` | — |
| 8 | Footer | `Footer` | `site.ts` | — |

### 5.2 About (`/en/about/`)

| # | Section | Components Used | Data Source | SEO |
|---|---|---|---|---|
| 1 | Page Hero | `PageHeroSection` | `site.ts` | Title: *About — Áras Living*; Desc: *Two decades of craftsmanship, one piece at a time.*; OG: `og-about.jpg` |
| 2 | Brand Story | `Eyebrow`, `Heading`, `Text`, `Button` | `site.ts` / `legal.ts` narrative | — |
| 3 | Craftsmanship | `Heading`, `Text`, `Image`, icon list | `materials.ts` | — |
| 4 | Team | `TeamGrid`, `TeamCard` | `team.ts` | — |
| 5 | Why Us | `WhyUsGrid` | `site.ts` | — |
| 6 | CTA Banner | `CTABannerSection` | `site.ts` | — |

### 5.3 Services (`/en/services/`)

| # | Section | Components Used | Data Source | SEO |
|---|---|---|---|---|
| 1 | Services Overview | `PageHeroSection`, `Image`, `Button` | `site.ts` | Title: *Services — Áras Living*; Desc: *Bespoke furniture and interior fit-outs for residential and commercial spaces across Ireland.*; OG: `og-services.jpg`; Schema: `Service` |
| 2 | Residential Services | `ServicesListSection`, `ServiceCard` | `services.ts` (residential) | — |
| 3 | Commercial Services | `ServicesListSection`, `ServiceCard` | `services.ts` (commercial) | — |
| 4 | Process Explanation | `ProcessTimeline`, `ProcessStep` | `processSteps.ts` | — |
| 5 | Materials & Finishes | `MaterialsShowcase`, `MaterialCard` | `materials.ts` | — |
| 6 | CTA Banner | `CTABannerSection` | `site.ts` | — |

### 5.4 Projects (`/en/projects/`)

| # | Section | Components Used | Data Source | SEO |
|---|---|---|---|---|
| 1 | Page Hero | `Eyebrow`, `Heading`, `Text` | `site.ts` | Title: *Projects — Áras Living*; Desc: *A selection of recent residential and commercial bespoke furniture work across Ireland.*; OG: `og-projects.jpg` |
| 2 | Filter Bar | `FilterPill` | hardcoded filter categories | — |
| 3 | Project Grid | `ProjectGrid`, `ProjectCard` | `projects.ts` | — |
| 4 | Load More | `Button` | local state | — |
| 5 | Footer | `Footer` | `site.ts` | — |

### 5.5 Project Detail (`/en/projects/[slug]/`)

| # | Section | Components Used | Data Source | SEO |
|---|---|---|---|---|
| 1 | Header | `ProjectDetailHeader` | `projects.ts` by slug | Title: *{Project Name} — Áras Living*; Desc: project short description; OG: project hero image; Schema: `Product` / `CreativeWork` |
| 2 | Hero Gallery | `Image`, `Video`, thumbnail strip | `project.media` | — |
| 3 | Description | `Eyebrow`, `Heading`, `Text` | `project.overview`, `project.challenges` | — |
| 4 | Media Gallery | `ProjectGallery`, `Lightbox` | `project.gallery` | — |
| 5 | Specifications | `SpecificationsTable` | `project.specs` | — |
| 6 | Related Projects | `RelatedProjects`, `ProjectCard` | `projects.ts` | — |
| 7 | CTA | `CTABannerSection` | `site.ts` | — |

### 5.6 Contact (`/en/contact/`)

| # | Section | Components Used | Data Source | SEO |
|---|---|---|---|---|
| 1 | Contact Info | `ContactInfoSection`, `ContactMethod`, `Button` | `site.ts` | Title: *Contact — Áras Living*; Desc: *Get in touch to discuss your custom furniture project in Ireland.*; OG: `og-contact.jpg` |
| 2 | Map | `MapEmbed` | hardcoded coords + style JSON | — |
| 3 | Business Hours | `Heading`, `Text` | `site.ts` | — |
| 4 | WhatsApp FAB | `WhatsAppFab` | `site.ts` | — |

### 5.7 Legal Pages

| Page | Sections | Components | Data Source | SEO |
|---|---|---|---|---|
| Privacy (`/en/privacy/`) | Hero title + 11 policy sections | `Heading`, `Text`, `Divider` | `legal.ts` structured copy | Title: *Privacy Policy — Áras Living*; noindex? false; canonical |
| Terms (`/en/terms/`) | Title + 8 sections | `Heading`, `Text`, `Divider` | `legal.ts` | Title: *Terms of Service — Áras Living* |
| Cookies (`/en/cookies/`) | Title + 6 sections + live toggle | `Heading`, `Text`, `CookieBanner` (embedded), `Divider` | `legal.ts` | Title: *Cookie Policy — Áras Living* |

---

## 6. Dependencies

Use `pnpm` (specify `"packageManager": "pnpm@10.6.0"` or current stable 9.x/10.x).

### Runtime dependencies

| Package | Version | Purpose |
|---|---|---|
| `svelte` | `^5.25.0` | UI compiler / framework |
| `@sveltejs/kit` | `^2.20.0` | Application framework |
| `@sveltejs/adapter-static` | `^3.0.8` | Static site generation |
| `tailwindcss` | `^4.1.0` | Utility-first CSS (CSS-only config) |
| `gsap` | `^3.12.7` | Animation engine + ScrollTrigger |
| `zod` | `^3.24.2` | Form schema validation |
| `svelte-i18n` | `^4.0.1` | i18n framework |
| `lucide-svelte` | `^0.487.0` | Icon library |
| `embla-carousel-svelte` | `^8.6.0` | Touch carousels / galleries |
| `@fontsource/cormorant-garamond` | `^5.2.5` | Self-hosted serif font |
| `@fontsource/inter` | `^5.2.5` | Self-hosted sans font |
| `@sveltejs/enhanced-img` | `^0.4.4` | Build-time responsive images |

### Dev dependencies

| Package | Version | Purpose |
|---|---|---|
| `vite` | `^6.2.0` | Build tool |
| `@sveltejs/vite-plugin-svelte` | `^5.0.3` | Svelte Vite plugin |
| `typescript` | `^5.8.0` | Type system |
| `svelte-check` | `^4.1.0` | Svelte type checking |
| `prettier` | `^3.5.0` | Code formatting |
| `prettier-plugin-svelte` | `^3.3.0` | Prettier Svelte support |
| `eslint` | `^9.21.0` | Linting |
| `eslint-plugin-svelte` | `^3.0.0` | Svelte lint rules |
| `typescript-eslint` | `^8.26.0` | TS ESLint parser/plugin |
| `@types/node` | `^22.13.0` | Node types |
| `tsx` | `^4.19.0` | TS execution for scripts |

### Environment variables (`.env.example`)

```bash
PUBLIC_SITE_URL=https://arasliving.ie
PUBLIC_FORMSPREE_ID=xxxxxxxx
PUBLIC_WHATSAPP_NUMBER=353XXXXXXXXX
PUBLIC_GA4_ID=G-XXXXXXXXXX
PUBLIC_META_PIXEL_ID=xxxxxxxxxx
PUBLIC_MAPS_EMBED_URL=https://www.google.com/maps/embed?pb=...
```

---

## 7. Build & Deploy

### `package.json` scripts

```json
{
  "packageManager": "pnpm@10.6.0",
  "scripts": {
    "dev": "vite dev",
    "build": "pnpm generate-sitemap && vite build",
    "preview": "vite preview",
    "check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
    "lint": "eslint src --ext .ts,.svelte",
    "format": "prettier --write \"src/**/*.{ts,svelte,css}\" \"scripts/**/*.ts\"",
    "generate-sitemap": "tsx scripts/generate-sitemap.ts"
  }
}
```

### `svelte.config.js`

```js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: true,
      strict: true
    }),
    prerender: {
      entries: ['*'],
      crawl: true
    },
    trailingSlash: 'always'
  }
};

export default config;
```

### `vercel.json`

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "build",
  "installCommand": "pnpm install",
  "cleanUrls": false,
  "trailingSlash": true,
  "headers": [
    {
      "source": "/_app/immutable/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ],
  "redirects": [
    { "source": "/arasliving.com/(.*)", "destination": "https://arasliving.ie/$1", "permanent": true }
  ]
}
```

### Sitemap generation

`scripts/generate-sitemap.ts` runs before every build. It:
1. Imports `projects` from `src/lib/data/projects.ts`.
2. Defines static routes: `/`, `/about/`, `/services/`, `/projects/`, `/contact/`, `/privacy/`, `/terms/`, `/cookies/`.
3. Generates project detail URLs: `/projects/{slug}/`.
4. Writes `static/sitemap.xml` with `<loc>`, `<lastmod>`, `<changefreq>`, `<priority>`.
5. `robots.txt` references `https://arasliving.ie/sitemap.xml`.

Deployment flow:
1. Push to `main` → Vercel builds preview.
2. Merge → production build + deploy to global edge.
3. DNS `arasliving.ie` CNAME/A → Vercel; SSL auto-provisioned.
4. `arasliving.com` 301-redirects to `arasliving.ie`.

---

## 8. Risk & Simplifications

### MVP simplifications

| Area | Simplification | Notes |
|---|---|---|
| Imagery | Use Unsplash-style placeholder images or client-provided factory images | Replace with commissioned photography before/after launch |
| Video | No real video files in repo | Ship `<Video>` component with poster image + optional CDN URL env var; hero uses still poster fallback |
| Form backend | Formspree ID from env var | No custom backend; switch to Basin by changing endpoint |
| Map | Google Maps embed iframe with grayscale filter | Replace with Mapbox GL JS later if needed |
| Team section | Optional / placeholder names | Can be hidden behind feature flag until headshots ready |
| i18n | English only active | `fr/de/es/pl` JSON stubs created; switcher hidden |
| Analytics | GA4 + Meta Pixel IDs via env var | Scripts load only after consent granted |
| WhatsApp | Single business number via env var | Floating button + inline links |
| Legal copy | Template structure with placeholders | Requires client/legal review and final company details |
| CMS | None | All content in typed TS data files; CMS considered Month 9–12 |

### Key risks & mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Real photography/video not ready by launch | High | Use high-quality placeholders; defer process videos to Phase 2 |
| Tailwind v4 CSS-only theming unfamiliarity | Medium | Document tokens in `app.css`; keep config minimal |
| Static adapter + dynamic project pages | Low | Use `entries` export in `[slug]/+page.ts` |
| GDPR consent blocking analytics | Low | Build consent gating first; track only after grant |
| Form service deliverability | Medium | Test Formspree/Basin end-to-end in staging |
| Lighthouse performance target (<2.5s LCP) | Medium | Optimize hero poster, lazy-load below-fold, use `enhanced-img` |
| Build time on Vercel as assets grow | Low | Start on Vercel Pro (45-min build limit); monitor |

---

## 9. Out-of-Scope for MVP

- E-commerce / online payments
- User accounts / authentication
- Real-time chatbot
- CMS integration
- Multilingual content (infrastructure ready, content not)
- Self-hosted video streaming (use CDN or poster-only)
- Custom serverless API endpoints
- Blog / case-study pipeline (template can be added later)

---

## 10. Next Steps After This Plan

1. Finalize `[Existing Company Name]` and legal contact details.
2. Register `arasliving.ie` and `arasliving.com`; configure DNS + redirects.
3. Set up Formspree/Basin form and WhatsApp Business number.
4. Collect/produce hero image, 8 project image sets, and service/material images.
5. Scaffold SvelteKit project with dependencies above.
6. Build components in order: design tokens → atoms → molecules → organisms → pages.
7. Generate sitemap, run Lighthouse audit, deploy to Vercel staging.
8. Legal review + content sign-off → production launch.
