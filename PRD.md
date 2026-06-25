# Executive Summary

## Project Overview

This document specifies the product requirements for a premium custom furniture company website built to establish market presence in Ireland with a strategic growth path into the European Union and Canada. The brand operates on a factory-direct model, delivering European-grade craftsmanship to high-net-worth residential and commercial clients seeking bespoke furniture solutions. Three candidate brand identities — Áras Living, FRAOCH, and ARBOR & CRAFT — are under evaluation, all positioned at the luxury tier of the custom furniture market.

The website is an MVP static site built with **SvelteKit** using `adapter-static`, delivering a serverless, backend-free architecture. It targets high-net-worth individuals, interior designers, architects, and commercial property developers across Ireland initially, with infrastructure ready for French and German localization in Phase 2. No chatbot is included at launch — lead capture is handled through a single, friction-minimized "Discuss a Project" modal form designed for sub-60-second completion.

## Key Specifications at a Glance

| Parameter | Specification |
|---|---|
| **Framework** | SvelteKit 2.x with `adapter-static`, TypeScript, Tailwind CSS v4 |
| **Hosting** | Vercel (Edge Network, global CDN) |
| **Design System** | Dark luxury aesthetic — `#0A0A0F` background, `#C9A96E` gold accent, `#F5F0EB` cream text |
| **Typography** | Cormorant Garamond (display), Inter (body) |
| **Animation** | GSAP with ScrollTrigger — section reveals at 0.6s, parallax at 0.25x rate |
| **Grid** | 12-column responsive grid, 1200px max content width |
| **Pages** | Home, About, Services, Projects, Project Detail, Contact + legal pages |
| **Lead Form** | 7-field single-step modal (project type, res/com toggle, location, description, file upload, name, email, WhatsApp); Zod validation; Honeypot anti-spam; Formspree/Basin submission |
| **Video** | Cinematic silent loop backgrounds, MP4 + WebM dual-format, CDN delivery, Intersection Observer pause/resume, mobile-optimized under 2MB |
| **Analytics** | GA4 + Meta Pixel, 12 tracked conversion events, GDPR cookie consent banner |
| **i18n** | `svelte-i18n`, URL pattern `/{lang}/{page}`, EN launch / FR+DE Phase 2 |
| **Compliance** | GDPR cookie consent, SSL, privacy policy, terms of service |
| **Timeline** | 8 weeks: 2 design → 4 development → 1 content → 1 testing |
| **Budget** | **€8,500–14,500** project fee; **~€50/month** ongoing infrastructure |

## Success Criteria

The project is measured against five critical success factors: **visual impact** — the site must communicate luxury craftsmanship within 3 seconds of landing through cinematic video, editorial typography, and restrained gold-on-dark aesthetics; **performance** — sub-2.5s Largest Contentful Paint on 4G, sub-200ms Time to First Byte via Vercel Edge, Lighthouse score ≥90 across all categories; **lead generation** — the "Discuss a Project" form must achieve ≥5% modal-to-submission conversion through its single-step, sub-60-second design; **SEO visibility** — programmatic meta tags, semantic HTML5, structured data (Organization + LocalBusiness schema), sitemap, and robot.txt ensure discoverability for "custom furniture Ireland" and related terms; **scalability** — the static architecture, component-based SvelteKit structure, and `svelte-i18n` integration enable EU/Canada expansion and new page additions without architectural rework.

## Scope Boundaries

This is a **static presentation and lead-generation website** — not an e-commerce platform, not a CMS-driven content site, and not a real-time application. All content is compiled at build time and served as pre-rendered HTML. Form submissions route through third-party services (Formspree or Basin). Video content is hosted on CDN, not self-streamed. No user accounts, no database, no server-side logic, and no chatbot are included in the MVP scope. WhatsApp integration is limited to a click-to-chat floating button linking to a business account.


---

## 1. Brand Identity & Strategy

### 1.1 Project Naming

#### 1.1.1 Proposed brand name options for the website/project domain (3 variants with rationale)

The existing company name remains the legal entity for contracts and invoicing. The project name is the public-facing brand, domain, and marketing identity — it must evoke craftsmanship and precision while remaining pronounceable across English, French, and German-speaking markets for EU and Canada expansion.

**Option A: Áras Living**

Derived from Old Irish *tinne* ("iron bar, rod"), evoking structural precision and the metal hardware systems central to premium fitted furniture. Four letters, two syllables (ti-NEO), with an open vowel ending that works across Romance and Germanic languages. No conflicting furniture-sector trademarks in the EU. High domain availability for `.com` and `.ie`. Reads identically in English, French, German, Spanish, and Polish without translation.

**Option B: FRAOCH**

From Irish *fraoch* ("heather"), suggesting natural resilience and organic beauty. Signals Irish origin to international audiences while remaining cryptic enough to invite curiosity. Anglicized pronunciation (FRAY-ock) for international markets. Pairs well with messaging around natural materials and sustainable craftsmanship. Consideration: pronunciation barrier in German and French markets requires early brand voice establishment.

**Option C: ARBOR & CRAFT**

A compound pairing *arbor* (Latin for "tree") with *craft* — immediately communicating the brand vertical. The ampersand adds an editorial, design-forward sensibility. Self-explanatory with inherent SEO value for "craft furniture" and "custom wood furniture." Trade-off: length affects domain readability and email address length. The Latin root translates recognizably across European languages.

**Recommendation:** Áras Living (Option A). It balances brevity, cross-market pronounceability, premium phonetics, and a subtle Irish etymology that grounds the brand locally without limiting international perception.

#### 1.1.2 Domain name recommendations (.ie vs .com vs .eu strategy)

| Domain | Purpose | Priority | Rationale |
|--------|---------|----------|-----------|
| `arasliving.ie` | Primary domain — Irish launch | 1 (immediate) | `.ie` requires proof of Irish connection (CRO registration or Irish address). Strong local SEO signal. Establishes trust with Irish clients. |
| `arasliving.com` | Global redirect; future primary | 1 (immediate) | Secured simultaneously to prevent cybersquatting. 301-redirects to `arasliving.ie` at launch. Becomes canonical domain upon EU/Canada expansion, with `arasliving.ie` redirecting to `/ie/`. |
| `arasliving.eu` | EU market placeholder | 2 (reserve) | Register to block competitors. Activate during EU expansion. Requires EU-based registrant. |
| `arasliving.co.uk` | UK market placeholder | 3 (future) | Reserve for potential GB market entry. Northern Ireland clients use `.ie` in all phases. |

**DNS Strategy:** At launch, `arasliving.com` 301-redirects to `arasliving.ie`. All marketing materials use `arasliving.ie`. Upon EU expansion, `arasliving.com` becomes canonical with locale-based routing (`/ie/`, `/fr/`, `/de/`). The `.ie` domain redirects to `arasliving.com/ie/` to preserve SEO equity.

**Email:** Primary: `hello@arasliving.ie`. Aliases: `info@`, `projects@`, `support@`. On `.com` activation, `hello@arasliving.com` becomes the primary alias with `.ie` continuing to function.

#### 1.1.3 Naming constraints: existing company name is fixed, project name must complement it

The existing company name functions as the legal entity and commercial umbrella. Áras Living operates as a product brand under this entity. Practical implications:

- **Legal documents:** Contracts, invoices, and regulatory filings use the existing company name. Website footer includes: "A division of [Existing Company Name]."
- **Banking and payment:** Merchant accounts and payment processors register under the existing company name.
- **Legal pages:** Privacy Policy, Terms of Service, and Cookie Policy list the existing company name as data controller and contracting party.
- **Brand hierarchy:** Áras Living is the customer-facing brand. The parent company name appears only where legally required — footer, legal pages, and email signatures as secondary text.
- **Future flexibility:** If the furniture division spins off, Áras Living already has independent brand equity and domain assets.

### 1.2 Brand Philosophy

#### 1.2.1 Core brand pillars: craftsmanship, precision, premium materials, Irish market focus

**Craftsmanship.** Built to order in a European factory by trained artisans, not mass-produced. Communicated through process imagery, emphasis on bespoke dimensions, and the absence of "catalog" or "off-the-shelf" language. The product adapts to the space — not the other way around.

**Precision.** Measured in millimeters. Precision refers to hardware integration (Blum, Hettich, Grass mechanisms), edge alignment, and flush-fitting panels. The website reflects this through clean grid layouts, exact spacing values, and disciplined typographic hierarchy. No element is accidental.

**Premium Materials.** European-grade MDF, real wood veneers, matte and high-gloss lacquers, glass, leather, and integrated LED systems. Material quality is communicated visually — through close-up photography and video — rather than described in text. The website assumes the visitor can see quality without being told.

**Irish Market Focus.** Ireland is the launch market. The brand demonstrates operational fluence through references to Irish counties in form fields, Dublin location prominence, and familiarity with Irish residential architecture — period homes, new builds, and apartment constraints. No performative Irishness: no shamrocks, no cliches.

#### 1.2.2 Brand personality: understated luxury, confidence, attention to detail

**Understated Luxury.** Áras Living does not shout. No gold gradients, script fonts, or ornamental flourishes. Luxury is conveyed through restraint: generous whitespace, a limited color palette, and the absence of discount messaging, urgency timers, or sales language. The website feels expensive because it is calm, not because it is decorated.

**Confidence.** The brand knows its value and does not justify it. No hard-sell "why we are the best" section. Confidence manifests in direct statements ("Bespoke fitted furniture, built in Europe, designed for Ireland"), minimal navigation options, and a single primary CTA ("Discuss a Project") repeated consistently rather than diluted across competing actions.

**Attention to Detail.** Every micro-interaction is considered: project card hover lifts the image by 4px over 300ms with `cubic-bezier(0.4, 0, 0.2, 1)` easing. Form validation uses a subtle amber `#C9A96E` border instead of red error color. These details are invisible when they work and noticeable only when absent.

#### 1.2.3 Tone of voice: minimal text, confident, premium, no hard sell

- **Sentence length:** Max 20 words per sentence. Headlines: 2–6 words. Body: 15–40 words per paragraph.
- **Vocabulary:** No superlatives ("best," "unparalleled"). No jargon ("solutions," "leverage"). No filler ("we are passionate about").
- **Voice:** Active, subject-verb-object. "We build wardrobes" not "Wardrobes are built by us."
- **CTA language:** "Discuss a Project" — not "Get a Free Quote" or "Contact Us Now." "Discuss" implies partnership; the absence of "free" signals value.
- **Numbers:** Specific. "18mm European MDF" not "high-quality materials." "14-day installation" not "fast turnaround."
- **Pronouns:** "We" and "You." The brand speaks directly to the visitor as a peer.
- **Capitalization:** Sentence case for body. Title case for headings. No ALL CAPS except tracking labels (e.g., "PROJECT TYPE").

### 1.3 Competitive Positioning

#### 1.3.1 Irish furniture market landscape: key players and gaps (table: competitors, positioning, price segment)

| Competitor | Positioning | Price Segment | Est. Range (EUR) | Strengths | Gaps Áras Living Exploits |
|------------|-------------|---------------|------------------|-----------|---------------------|
| **Arnotts / Brown Thomas** | Dept. store furniture, accessible luxury | Mid-to-Premium | Wardrobe: €3k–€8k | Brand recognition, foot traffic, financing | No true bespoke; limited customization; mass-market feel |
| **Woodies / DFS Ireland** | Volume retail, fast delivery | Budget-to-Mid | Wardrobe: €800–€3k | Price accessibility, speed, advertising reach | No customization; flat-pack quality; no design consultation |
| **Boconcept Dublin** | Scandinavian design-led furniture | Premium | Wardrobe: €5k–€15k | Strong brand identity, design credentials, EU origin | Limited bespoke fitted furniture; freestanding focus; no Irish story |
| **Hammonds Furniture** | UK fitted furniture franchise | Mid | Wardrobe: €2.5k–€7k | Established fitted furniture model, UK recognition | Not Irish; limited premium positioning; franchise lacks factory-direct control |
| **Solo Custom Carpentry** | One-person carpentry services | Variable | Wardrobe: €2k–€10k | True bespoke, local relationship, flexible pricing | No brand or warranty; inconsistent quality; no showroom; single-person capacity |
| **SieMatic / Poggenpohl** | Ultra-luxury German kitchen brands | Ultra-Premium | Kitchen: €30k–€100k+ | Ultimate brand prestige, German engineering | Prohibitively expensive; kitchen-only focus; no wardrobe/closet specialization |
| **IKEA Ireland** | Democratic design, self-assembly | Budget | Wardrobe: €200–€1.5k | Price accessibility, brand trust, online tools | No bespoke; no premium installation; disposable perception |

**Market Gap:** The Irish fitted furniture market has clear whitespace between mid-range franchise operators (Hammonds) and ultra-luxury German kitchen imports (SieMatic). No Irish-positioned brand offers true factory-direct bespoke fitted furniture — wardrobes, kitchens, walk-in closets, and storage systems — at a premium-but-accessible price point with European manufacturing credentials and full-service design-to-installation support. Áras Living occupies this gap.

#### 1.3.2 Differentiation strategy: factory-direct, custom-made, European quality, full-service

**Factory-Direct.** Unlike retailers who markup third-party products or franchisees selling standardized systems, Áras Living operates as a direct channel from European manufacturing to Irish spaces. This eliminates intermediary costs and ensures quality control at every stage. Communicated through factory imagery and the explicit message: "Built in Europe. Designed for Ireland."

**Custom-Made.** Every project is measured, designed, and manufactured to exact specifications. No standard sizes or limited color options. The brand promises furniture that fits the space precisely — critical for Irish period homes with non-standard ceiling heights, alcoves, and irregular walls. Communicated through the project portfolio showing diverse room shapes and architectural contexts.

**European Quality.** Manufacturing under EU quality standards with certified materials (E1 emissions-grade board, FSC-certified wood options). Hardware partners: Blum, Hettich, or Grass — brands recognized by architects and interior designers as industry benchmarks. Validated through certification badges and material specification tables on project detail pages.

**Full-Service.** Áras Living manages the entire journey: consultation (in-person or virtual), 3D design visualization, manufacturing, delivery, and installation. The client does not coordinate between a designer, a carpenter, and an installer. The website's single CTA ("Discuss a Project") reflects this — the conversation is the entry point to a managed process.

#### 1.3.3 Target client personas: residential (homeowners, interior designers) and commercial (offices, hospitality, retail)

**Persona R1: The Discerning Homeowner**
Aged 35–55, Dublin/Leinster detached or semi-detached home or high-end apartment. Household income €120,000+. Currently renovating, extending, or furnishing a new home. Cannot find wardrobes that fit alcoves, sloped ceilings, or period architecture. Frustrated by flat-pack quality. Wants a single supplier who handles everything. Decision drivers: quality of finish, precision of fit, warranty, completed project examples. Price is secondary to value. Discovers Áras Living through Google ("bespoke wardrobes Dublin"), Instagram, or architect/builder referral. Needs: project gallery, process explanation, easy contact form, trust signals.

**Persona R2: The Interior Designer**
Self-employed or studio-based, working on 3–8 residential projects per year. Based in Dublin, Cork, or Galway. Sources furniture and joinery for clients. Pain points: unreliable contractors, inconsistent carpenter quality, coordination delays between design and build. Decision drivers: reliability, precision, turnaround speed, professional communication. Willing to pay a premium for predictability. Discovers through industry referrals, Instagram, trade events. Needs: high-resolution photography, specification details, downloadable press kit, professional contact channel.

**Persona C1: The Commercial Project Manager**
Facilities manager, hotel development consultant, or office fit-out PM. Manages budgets of €50,000–€500,000+ for interior fit-outs. Needs custom storage, reception desks, built-in shelving, or hotel wardrobe systems at scale. Decision drivers: large-scale project capability, compliance with commercial standards, PM capability, commercial references. Discovers through LinkedIn, industry directories, architect referrals. Needs: commercial case studies, scale messaging, B2B contact pathway, specification sheets, compliance documentation.

**Persona C2: The Hospitality Developer**
Hotel or serviced apartment developer refurbishing 20–100+ rooms. Needs consistent, high-quality fitted wardrobes, vanity units, and storage systems across all rooms. Pain points: inconsistent room finishes with multiple local carpenters. Needs a repeatable, scalable solution maintaining premium quality at volume. Decision drivers: consistency, volume pricing, installation speed, commercial durability, design-brief matching across units. Discovers through industry events and architect/interior designer recommendations. Needs: hospitality project examples, volume messaging, material durability specs, dedicated commercial enquiry form.


---

## 2. Information Architecture

### 2.1 Site Structure

#### 2.1.1 Complete Sitemap

The site is built as a SvelteKit static application with a flat, shallow hierarchy. The URL structure is designed for future i18n expansion: the default English locale serves from root paths (`/`, `/projects`, `/about`), while additional languages use prefixed paths (`/fr/`, `/de/`, `/ga/`). This follows the `/{lang?}/` optional segment pattern in SvelteKit routing, where the absence of a language prefix defaults to English. The entire site consists of 9 page routes plus a global popup component.

| Page Name | URL Slug | Purpose | Priority |
|-----------|----------|---------|----------|
| Home | `/` | Primary landing: brand impression, hero video, service overview, featured projects, CTA to form | Critical |
| Projects | `/projects` | Portfolio grid: filterable showcase of all case studies with category tags | High |
| Project Detail | `/projects/[slug]` | Full case study: image gallery, video, materials, testimonial | High |
| Services | `/services` | Service overview: residential and commercial offerings with process | High |
| About | `/about` | Brand story: craftsmanship philosophy, team, workshop | Medium |
| Contact | `/contact` | Minimal page: WhatsApp CTA, email, location map, link to form | Medium |
| Privacy Policy | `/privacy` | GDPR-compliant privacy policy, cookie preferences | Low |
| Cookie Policy | `/cookies` | Detailed cookie usage and consent management | Low |
| Terms of Service | `/terms` | Terms and conditions for service engagement | Low |
| Discuss a Project (Popup) | N/A — global component | Fullscreen modal form: project type, sector, location, description, file upload, contact details | Critical |

No blog, no shop, no booking system, no configurator. The sitemap is intentionally constrained to focus every path toward lead generation. The Project Detail pages use SvelteKit's dynamic routing with prerendered slugs generated at build time from a content file. All pages are static HTML outputs — no server-side rendering at request time.

The `Discuss a Project` popup is not a page route. It is a global Svelte component mounted in the root layout (`+layout.svelte`) that can be triggered from any page via a shared store (`projectFormOpen`). This ensures the form is accessible from every user position without navigation overhead. The popup renders as a fullscreen overlay with `position: fixed; inset: 0; z-index: 100`.

For i18n, the routing convention follows SvelteKit's optional parameter pattern: `src/routes/[[lang]]/+page.svelte` for Home, `src/routes/[[lang]]/projects/+page.svelte` for Projects, and so on. The `lang` parameter is validated against a whitelist (`['en', 'fr', 'de', 'ga']`). Invalid language codes trigger a 404. At initial launch, only English (`en`) is populated; other locales return a graceful fallback or a "Coming Soon" placeholder. All translatable content strings live in `src/lib/i18n/[lang].json` files, loaded via `import` based on the resolved locale parameter.

#### 2.1.2 Primary Navigation Structure

**Desktop Pattern (≥1024px):**

The desktop navigation is a fixed top bar with a minimalist composition. It consists of:

- **Left**: Brand wordmark (text logo, SVG, 140×24px viewBox), linking to `/`
- **Center**: Primary page links — Projects, Services, About, Contact — in a horizontal row with 32px gap between items. Each link uses the primary typeface at 15px, weight 400, letter-spacing 0.02em. Active page indicated by a 1px underline offset 6px below the text (color: primary text, transition: width 0.2s ease-out).
- **Right**: CTA button "Discuss a Project" — pill-shaped, height 40px, padding 0 24px, background: `#1A1A1A`, color: `#F5F3EF`, border-radius: 20px, font-size 14px, weight 500. Hover: background transitions to `#2C2C2C` over 0.15s.
- **Height**: 72px total. Background: `#F5F3EF` with `backdrop-filter: blur(12px)` and 90% opacity when scrolled past 100px. A 1px bottom border in `rgba(26,26,26,0.08)` appears on scroll.
- **Position**: `position: fixed; top: 0; width: 100%; z-index: 50`. Content padding: 0 48px (desktop), 0 24px (tablet).

The nav uses `scroll-padding-top: 80px` on `<html>` to account for the fixed header when anchor links are used.

**Mobile Pattern (<1024px):**

- **Visible bar**: 64px height. Left: wordmark. Right: hamburger icon (24×24px, 2px stroke, rounded caps) + CTA text button "Start" (shortened from "Discuss a Project") at 40px height, padding 0 16px.
- **Menu overlay**: Fullscreen slide-down from the nav bar. Background: `#F5F3EF`. Links stacked vertically, centered, font-size 32px, weight 300, line-height 1.4, 24px gap between items. Each link animates in with a 0.05s stagger, `opacity 0→1` and `translateY(20px)→0`, duration 0.4s, easing `cubic-bezier(0.25, 0.46, 0.45, 0.94)`.
- **Close**: X icon replaces hamburger, same position. Overlay dismisses on X click, link click, or Escape key.
- **Scroll lock**: `overflow: hidden` applied to `<body>` when menu is open. Restored on close.
- **Breakpoint**: Transition between patterns at 1024px (`lg` breakpoint in Tailwind terms).

The CTA button is always visible on both desktop and mobile — it is never hidden inside the hamburger menu. This maximizes conversion opportunity density.

#### 2.1.3 Footer Content Structure

The footer is a two-section layout on desktop, stacking on mobile:

**Top Section** (padding: 80px 48px 48px, border-top: 1px solid `rgba(26,26,26,0.1)`):

- **Left column (50%)**: Large CTA heading — "Have a project in mind?" — in display typeface, 48px, weight 300, line-height 1.15. Below: a text link "Discuss it with us →" that triggers the global project form popup. Below that: email address (`hello@company.com`) as a `mailto:` link, and WhatsApp number as a `wa.me/` link, both at 16px, with 8px vertical spacing.
- **Right column (50%)**: Three sub-columns of links:
  - **Pages**: Projects, Services, About, Contact — links to respective routes
  - **Services**: Residential, Commercial, Bespoke Design, Restoration — anchor links to Services page sections
  - **Legal**: Privacy Policy, Cookie Policy, Terms — links to `/privacy`, `/cookies`, `/terms`
  - Link style: 14px, weight 400, color `rgba(26,26,26,0.6)`, hover color `#1A1A1A`, transition 0.15s. Line-height 2.2 (generous vertical spacing for touch targets on mobile).

**Bottom Section** (padding: 24px 48px, border-top: 1px solid `rgba(26,26,26,0.06)`):

- **Left**: Copyright text "© 2025 [Company Name]. All rights reserved." — 12px, color `rgba(26,26,26,0.4)`
- **Center**: Location text "Handcrafted in Ireland" — 12px, color `rgba(26,26,26,0.4)`
- **Right**: Social links row — Instagram, Pinterest, LinkedIn — as 20×20px SVG icons with `opacity: 0.4`, hover `opacity: 1`, transition 0.2s. Links open in new tab (`target="_blank"`, `rel="noopener noreferrer"`).

**Mobile footer**: Stacks to single column. Top section CTA heading reduces to 32px. Link columns stack vertically with 32px gap between groups. Bottom section stacks: copyright, location, social — all centered, 8px vertical gap.

The footer renders on every page except the project form popup (which is a modal overlay above the footer).

---

### 2.2 Page Hierarchy Details

#### 2.2.1 Home Page

The Home page is the primary conversion surface. It is organized as a vertical scroll narrative with six distinct sections, each occupying a full or substantial viewport. The page has no sidebar, no secondary navigation, and no distracting elements.

**Section 1 — Hero**: Full-viewport (`100vh`), no scroll on entry. Background: autoplaying muted looped video (5s minimum, MP4/WebM, max 4MB, poster frame for LCP). Overlay: subtle gradient from bottom `rgba(26,26,26,0.3)` to transparent at 40% height for text legibility. Centered content: H1 "Bespoke Furniture, Crafted in Ireland" — display typeface, `clamp(36px, 5vw, 72px)`, weight 300, color `#F5F3EF`, text-shadow `0 2px 40px rgba(0,0,0,0.3)`. Below: one-line subtitle "Custom pieces for homes and spaces that demand more" — 18px, weight 400, color `rgba(245,243,239,0.85)`, max-width 480px, centered. CTA: pill button "Discuss Your Project" (same styling as nav CTA but inverted: bg `#F5F3EF`, text `#1A1A1A`, hover bg `#FFFFFF`) positioned 32px below subtitle. Scroll indicator: thin animated line (1px wide, 40px tall, `animation: bounce 2s infinite`) at bottom center.

**Section 2 — Intro Statement**: Padding `120px 48px`. Max-width 720px, centered. Large text: "We design and build one-of-a-kind furniture pieces for clients who value craft, material, and detail." — 28px, weight 300, line-height 1.5, color `#1A1A1A`. No images, no buttons — purely typographic for pacing.

**Section 3 — Featured Projects**: Horizontal scroll gallery (CSS `scroll-snap-type: x mandatory`) on mobile; 3-column grid on desktop (`grid-template-columns: repeat(3, 1fr)`, gap 24px). Each card: aspect-ratio 3:4, image with `object-fit: cover`, bottom overlay with project name (18px, weight 500) and category tag (12px, uppercase, letter-spacing 0.08em). Hover: image scales 1.03 over 0.6s `cubic-bezier(0.25, 0.46, 0.45, 0.94)`, overlay darkens slightly. Each card links to its Project Detail page. Section header: "Selected Work" — H2, 36px, weight 300, margin-bottom 48px.

**Section 4 — Services Overview**: Two-column layout on desktop (50/50). Left: H2 "What We Do" with a short descriptor (max 100 characters). Right: two service blocks — Residential and Commercial — each with an icon (48px SVG), title (20px, weight 500), and 2-3 lines of description (16px, color `rgba(26,26,26,0.7)`). Each block links to the Services page with the corresponding section hash. Background: slightly contrasting `#F0EDE8` to create visual rhythm.

**Section 5 — Craftsmanship Teaser**: Full-width image (aspect-ratio 21:9, `object-fit: cover`) with overlaid pull-quote centered: "Every piece tells the story of its making." — 32px italic, weight 300, color `#F5F3EF`, max-width 560px. This links to the About page.

**Section 6 — Final CTA**: Padding `160px 48px`, centered. H2 "Start Your Project" — `clamp(32px, 4vw, 56px)`, weight 300. Below: "Tell us what you're envisioning. We'll take it from there." — 18px, color `rgba(26,26,26,0.6)`. CTA button "Discuss a Project" triggers the global form popup. This section uses a subtle background texture (CSS noise pattern, `opacity: 0.03`) for depth.

#### 2.2.2 About Page

The About page is a single-column narrative scroll. It is intentionally text-light — no long paragraphs, no corporate boilerplate.

**Hero**: 60vh height, full-bleed workshop photograph (`object-fit: cover`), dark overlay `rgba(26,26,26,0.4)`. Centered H1 "Our Craft" — `clamp(40px, 6vw, 80px)`, weight 300, color `#F5F3EF`.

**Philosophy Section**: Padding `100px 24px`, max-width 640px, centered. Three short statements, each as a distinct block with 48px vertical spacing:
1. "We believe furniture should last generations." — 24px, weight 400
2. "Every piece begins with a conversation and ends with a relationship." — 24px, weight 400
3. "We source materials responsibly and craft with intention." — 24px, weight 400

**Process Section**: A visual 3-step horizontal flow on desktop (stacked on mobile). Each step: a number (01, 02, 03) in 72px display typeface with 10% opacity, a title (18px, weight 500), and a one-line description (16px). Steps: "Consult & Design", "Craft & Build", "Deliver & Install". Connected by thin horizontal lines (1px, `rgba(26,26,26,0.15)`) on desktop; vertical on mobile.

**Workshop Section**: Full-width image carousel (2-3 images, auto-advancing every 5s, no visible controls, swipe-enabled on mobile) showing the workshop environment. Below: a single pull-quote from the founder/lead craftsman — max 20 words, 20px italic, centered, max-width 500px.

**Team/Founder**: Optional single portrait (aspect-ratio 3:4, max-width 360px) with name and role caption. This section can be omitted if the client prefers brand-over-person positioning.

**Closing CTA**: Same pattern as Home Section 6 but with H2 "Work With Us".

#### 2.2.3 Services Page

The Services page uses a tabbed layout for residential vs. commercial, with a shared process section below.

**Hero**: 50vh, full-bleed image of a finished piece in situ. H1 "Services" — large display type, centered.

**Service Tabs**: Two toggle buttons — "Residential" / "Commercial" — side by side, centered. Active tab: bg `#1A1A1A`, color `#F5F3EF`, border-radius 20px. Inactive: bg transparent, border 1px `rgba(26,26,26,0.2)`, color `#1A1A1A`. Clicking switches content with a crossfade animation (0.3s opacity transition). Each tab panel contains:

- **Residential**: Grid of 4 service cards (2×2 on desktop, 1-column on mobile). Cards: Bespoke Kitchens, Built-in Cabinetry, Dining & Tables, Bedrooms & Wardrobes. Each card: image (aspect-ratio 4:3), title (18px, weight 500), one-line description (15px, `rgba(26,26,26,0.65)`), and a "Learn More" text link that triggers the project form popup with the service pre-selected.
- **Commercial**: Same card pattern. Cards: Office Fit-outs, Hospitality Interiors, Retail Displays, Custom Installations.

**Process Section**: Full-width, bg `#F0EDE8`, padding `100px 48px`. H2 "How We Work" centered. Four numbered steps in a horizontal timeline on desktop:
1. **Briefing** — "We listen to your needs, measure your space, and understand your vision."
2. **Design** — "Detailed drawings and material samples for your approval."
3. **Crafting** — "Hand-built in our workshop with precision and care."
4. **Delivery** — "Professional installation, finished to perfection."

Each step: number in large display type (48px, 8% opacity), title (16px, weight 500), description (15px). Steps connected by a horizontal progress line (2px, `#1A1A1A` at 20% opacity) with animated fill on scroll into view. Mobile: vertical stack with vertical connecting line.

**CTA**: "Ready to begin?" with form popup trigger. Same styling as Home final CTA.

#### 2.2.4 Projects Page

The Projects page is the primary content discovery surface for portfolio browsing.

**Hero**: 40vh, minimal. H1 "Projects" — large display type, left-aligned with 48px padding. One-line subtitle: "A selection of our bespoke work" — 16px, `rgba(26,26,26,0.6)`.

**Filter Bar**: Sticky below the nav (top: 72px, z-index: 40), bg `#F5F3EF`, border-bottom 1px `rgba(26,26,26,0.08)`, padding 16px 48px. Horizontal row of filter pills: All (default active), Residential, Commercial, Kitchens, Cabinetry, Furniture. Each pill: padding 6px 16px, border-radius 16px, font-size 13px, weight 500. Active: bg `#1A1A1A`, color `#F5F3EF`. Inactive: bg transparent, border 1px `rgba(26,26,26,0.15)`, color `rgba(26,26,26,0.6)`. Hover inactive: border-color `rgba(26,26,26,0.4)`. Multiple selection not supported — single filter only. Filtering uses CSS/JS client-side show/hide with a fade transition (opacity 0.2s) — no page reload.

**Project Grid**: CSS Grid, `grid-template-columns: repeat(auto-fill, minmax(380px, 1fr))`, gap 24px, padding 48px. Each project card:
- Image: aspect-ratio 4:5, `object-fit: cover`
- Overlay on hover: bg `rgba(26,26,26,0.5)`, content: project name (18px, weight 500, color `#F5F3EF`) and category tag (12px, uppercase, letter-spacing 0.06em, `rgba(245,243,239,0.7)`)
- Hover animation: overlay fades in 0.25s, text `translateY(8px)→0` 0.3s
- Click: navigates to `/projects/[slug]`
- Each card has a `data-category` attribute for filter matching

**Empty State**: If no projects match the active filter, display centered text "No projects in this category yet" with a link to "View all projects".

**Load Behavior**: All projects render on initial load (static HTML). No lazy loading or pagination — the portfolio is expected to contain 12-24 projects maximum.

#### 2.2.5 Project Detail Page

The Project Detail page is the deepest content page. It uses a flexible template driven by a content data file.

**Structure** (template-based, not CMS):

- **Header block**: Full-bleed hero image (aspect-ratio 16:9 on desktop, 4:3 on mobile). Project title overlaid bottom-left: H1 in display typeface, `clamp(32px, 5vw, 64px)`, weight 300, color `#F5F3EF`, text-shadow for legibility. Below title: category tag (pill, bg `rgba(245,243,239,0.15)`, backdrop-filter blur, 12px uppercase) and completion year (14px).
- **Meta bar**: Below hero, padding 24px 48px, border-bottom 1px `rgba(26,26,26,0.08)`. Three columns: Client/Location, Materials Used, Year/Duration. Each: label (12px, uppercase, letter-spacing 0.06em, `rgba(26,26,26,0.5)`) and value (15px, weight 500). Mobile: stacked, 16px gap.
- **Narrative sections**: Array of content blocks defined in the project data file. Supported block types:
  - `text`: Full-width text block, max-width 640px, centered. 18px, weight 400, line-height 1.7, color `rgba(26,26,26,0.85)`. Used for project description (2-4 sentences max).
  - `image`: Full-bleed image, `object-fit: cover`, with optional caption (14px, italic, centered below, 8px margin-top).
  - `image_grid`: 2-column image grid (gap 16px), each image aspect-ratio 1:1.
  - `video`: Full-width HTML5 video element (autoplay, muted, loop), max-height 80vh, with poster frame.
  - `quote`: Centered pull-quote, max-width 560px, 24px italic, weight 300, with decorative quotation marks in 10% opacity display type.
  - `specs`: Two-column spec list (label/value pairs), max-width 640px, centered. Label: 13px uppercase; value: 15px weight 500.

- **Navigation footer**: Padding 80px 48px, border-top 1px `rgba(26,26,26,0.08)`. Two columns: "Previous Project" and "Next Project" — each with project name (16px, weight 500) and "← Prev" / "Next →" label (13px, uppercase). Links cycle through the project array order. On the first/last project, the respective link is disabled (opacity 0.3, no pointer-events).

**SEO per project**: Each detail page generates unique `<title>`, `<meta name="description">`, and JSON-LD structured data (type: `Product` or `CreativeWork`) based on the project data file. Open Graph image set to the project's hero image.

#### 2.2.6 Contact Page

The Contact page is intentionally minimal. It does not contain the project form (that is the global popup). Instead, it provides direct contact pathways.

**Hero**: 40vh, full-bleed image of the workshop or a material texture. H1 "Get in Touch" — large display type, centered, color `#F5F3EF`.

**Contact Options**: Three-column layout on desktop (stacked on mobile), padding `80px 48px`. Each column centered:

1. **Email**: Mail icon (32px SVG). Label "Email us" (14px, uppercase). Value: `hello@company.com` as `mailto:` link (18px, weight 500). Subtext: "We reply within 24 hours" (14px, `rgba(26,26,26,0.5)`).
2. **WhatsApp**: WhatsApp icon (32px SVG). Label "WhatsApp" (14px, uppercase). Value: clickable `wa.me/` link with the business number (18px, weight 500). Subtext: "Direct message, any time" (14px).
3. **Location**: Pin icon (32px SVG). Label "Workshop" (14px, uppercase). Value: City/Region, Ireland (18px, weight 500). Subtext: "By appointment only" (14px).

**Map**: Below contact options, full-width embedded map (Google Maps iframe or Mapbox GL JS, height 400px, grayscale filter `filter: grayscale(100%) contrast(90%)` to match brand aesthetic). A custom pin marker in brand colors. Map is non-interactive until clicked ( `pointer-events: none` overlay with "Click to interact" text, removed on click).

**CTA Block**: Padding `100px 48px`, centered, bg `#F0EDE8`. H2 "Have a project to discuss?" — 32px, weight 300. Button "Open Project Form" triggers the global popup. Subtle text below: "Takes less than 2 minutes" — 14px, `rgba(26,26,26,0.5)`.

#### 2.2.7 Legal Pages

All three legal pages share a single layout template.

**Layout**: Narrow content column, max-width 720px, centered, padding `120px 24px 80px`. H1 page title (36px, weight 300, margin-bottom 48px). Content in clean typographic hierarchy: H2 (24px, weight 500, margin-top 48px), H3 (18px, weight 500, margin-top 32px), body text (16px, line-height 1.7, color `rgba(26,26,26,0.85)`), links (underlined, color `#1A1A1A`).

**Privacy Policy** (`/privacy`): GDPR-compliant structure covering: data controller identity, collected data types (form submissions via Formspree/EmailJS, analytics cookies), legal basis (legitimate interest/consent), data retention periods, user rights (access, rectification, erasure, portability), third-party processors (hosting, form backend, analytics), cookie usage details, contact information for data protection inquiries. Must include a link to the Cookie Policy page.

**Cookie Policy** (`/cookies`): Detailed breakdown of cookie categories (necessary, analytics, marketing), specific cookies used with names and purposes, retention durations, instructions for managing cookies via browser settings. Includes a live cookie preference toggle UI embedded in the page (mirrors the banner functionality) allowing users to change preferences after initial consent.

**Terms of Service** (`/terms`): Standard service terms covering: scope of services, quotation and payment terms, lead times and delivery, cancellation policy, warranty on workmanship, limitation of liability, governing law (Ireland/EU), dispute resolution.

**Cookie Consent Banner**: Fixed bottom bar (not a popup), bg `#1A1A1A`, color `#F5F3EF`, padding 16px 24px, z-index 60. Text: "We use cookies to improve your experience." — 14px. Two buttons: "Accept All" (pill, bg `#F5F3EF`, color `#1A1A1A`, 13px, padding 6px 16px) and "Manage" (text link, 13px, underline, opens expanded preference panel). Dismissed on choice, stored in `localStorage` as `cookieConsent: { necessary: true, analytics: [true|false], timestamp: ISOString }`. If no consent stored, banner reappears on next visit. The banner is not shown on legal pages themselves.

---

### 2.3 User Flows

#### 2.3.1 Primary Conversion Flow

The primary flow optimizes for lead capture through the project form. Every page supports entry into this flow, and the form is always reachable within one click.

| Step | Action | UI Element | Destination | Exit Points |
|------|--------|------------|-------------|-------------|
| 1. Landing | User arrives via organic search, referral, or direct | Any page (Home most common) | Current page | Bounce (leave site) |
| 2. Exploration | User scrolls or navigates to view work/services | Nav links, project cards, service cards | Projects, Services, About | WhatsApp click (diversion to secondary flow) |
| 3. Intent Signal | User clicks CTA to start a project | "Discuss a Project" button (nav or page CTA) | Fullscreen form popup | Close popup (X or Escape) |
| 4. Form Completion | User fills and submits the project form | 7-field form with file upload | Submission success state | Abandon (close without submit) |
| 5. Confirmation | Success message displayed in-popup | "Thank you. We'll be in touch within 24 hours." | Popup auto-closes after 4s | — |
| 6. Lead Notification | Form data sent to business email | Formspree/EmailJS POST | Business inbox | — |

**Flow details:**

- **Step 1**: The Home page hero video and featured projects section create immediate credibility. First Contentful Paint target: <1.5s. Largest Contentful Paint target: <2.5s (hero poster image).
- **Step 2**: Navigation is frictionless — no dropdowns, no nested menus. Every primary page is accessible from the nav. Project cards and service links use clear affordances (hover states, cursor pointer).
- **Step 3**: The "Discuss a Project" button is visually consistent across all locations: fixed nav (always visible), Home hero, Home final CTA, Services page CTA, Contact page CTA, and Project Detail page closing section. This redundant placement ensures the CTA is never more than one viewport-scroll away.
- **Step 4**: The form popup captures the full viewport. It uses a two-column layout on desktop (left: decorative image/texture; right: form fields) and single-column on mobile. The 7 fields are: Project Type (dropdown: Kitchen, Cabinetry, Furniture, Other), Sector (radio: Residential/Commercial), Location (text input, placeholder: "County/City"), Description (textarea, 4 rows, placeholder: "Tell us about your project..."), File Upload (drop zone, max 10MB, images and PDF only), Name (text), Email (email), WhatsApp (tel, optional). Submit button: full-width, bg `#1A1A1A`, color `#F5F3EF`, height 48px, "Send Inquiry". Form validation: HTML5 native (`required` attributes) plus visual error states (border-color `#C44B4B`, error text 13px below field).
- **Step 5**: On successful submission, the form content crossfades to a success message with a checkmark icon (48px, animated stroke draw, 0.5s). Message: "Thank you. We'll be in touch within 24 hours." Auto-close after 4 seconds, or user can click X immediately.
- **Step 6**: Form submissions route through Formspree (form ID configured in environment variables) or EmailJS, sending a formatted email to the business inbox. No data persists on the server — SvelteKit static build has no backend. Rate limiting is handled by the form service provider.

**Conversion targets**: Primary CTA click-through rate target ≥8% of unique visitors. Form completion rate target ≥40% of popup opens. Abandonment rate target <60%.

#### 2.3.2 Secondary Flow: WhatsApp Direct Contact

A parallel pathway for users who prefer instant messaging over form submission.

**Entry points:**
- WhatsApp icon in the footer (all pages)
- WhatsApp contact option on the Contact page
- Optional: a floating WhatsApp button (48px circle, bg `#25D366`, fixed bottom-right, 24px margin, z-index 45) on all pages except when the form popup is open

**Flow:**
1. User clicks any WhatsApp entry point
2. Link opens `https://wa.me/[number]?text=Hi,%20I'm%20interested%20in%20discussing%20a%20custom%20furniture%20project` in a new tab
3. Pre-filled message includes context so the business knows the origin
4. Conversation continues in WhatsApp native app

The WhatsApp button uses a subtle entrance animation on page load: `scale(0)→scale(1)`, 0.3s, `cubic-bezier(0.34, 1.56, 0.64, 1)` (slight overshoot bounce). It has a persistent subtle pulse ring animation (box-shadow ripple, 2s infinite) to draw attention without being intrusive.

#### 2.3.3 Content Discovery Flow

The portfolio browsing flow serves users in the research/evaluation phase.

**Entry:** Projects page (`/projects`) or direct click on a featured project card from Home.

**Filtering interaction:**
1. User arrives at Projects page — all projects visible, "All" filter active
2. User clicks a filter pill (e.g., "Residential")
3. Non-matching projects fade out (opacity 1→0, 0.2s) and are hidden (`display: none` after transition)
4. Matching projects reflow into the grid with a subtle `translateY(10px)→0` stagger (0.03s per item)
5. Browser URL updates to `/projects?filter=residential` via `history.pushState` (no page reload)
6. On direct navigation to a filtered URL, the filter state is read from the query parameter and applied on mount

**Project detail exploration:**
1. User clicks a project card
2. Navigate to `/projects/[slug]` with standard SvelteKit client-side navigation (`goto`)
3. Page scrolls to top smoothly (`behavior: smooth`)
4. User scrolls through the narrative: hero → meta bar → text → images → video → quote
5. Image blocks support click-to-expand: opens a lightbox overlay (fullscreen, dark bg `rgba(26,26,26,0.95)`, image centered, close on X/click outside/Escape, navigate between images with arrow keys)
6. Video blocks play inline (autoplay, muted, loop) — no click required
7. At the bottom, Previous/Next navigation links allow sequential browsing without returning to the grid
8. User clicks "Next Project" → navigates to next project in the array, scroll resets to top

**Exit paths from content discovery:**
- CTA within Project Detail page (closing section: "Inspired by this? Discuss Your Project →") triggers the global form popup
- Nav CTA "Discuss a Project" is always accessible
- WhatsApp floating button for direct messaging

**SEO consideration for discovery flow:** Every project detail page is independently crawlable with a unique URL, proper `<title>`, `meta description`, JSON-LD structured data, and semantic HTML (`<article>`, `<figure>`, `<figcaption>`). This maximizes organic discovery entry points beyond just the Home page.


---

## 3. Design System

### 3.1 Color Palette

The palette draws from furniture-making materials — deep walnut stains, raw brass, unbleached linen. Every color serves a purpose; no decorative hues are introduced. The overall impression is quiet confidence: dark enough to feel cinematic, warm enough to feel inviting.

#### 3.1.1 Primary Colors

These three colors account for approximately 95% of all color usage across the site.

| Token | Hex | Usage | Coverage |
|---|---|---|---|
| `--bg-primary` | `#0A0A0F` | Page backgrounds, section backgrounds, modal overlays | ~55% |
| `--bg-secondary` | `#111118` | Card backgrounds, elevated surfaces, nav bar background | ~15% |
| `--text-primary` | `#F0EBE3` | Headlines, primary body text, icon strokes | ~20% |
| `--text-secondary` | `#9A9590` | Captions, metadata, disabled states, placeholder text | ~8% |
| `--accent-primary` | `#C4956A` | CTAs, hover states, active indicators, decorative lines | ~2% |

`#0A0A0F` is a near-black with a subtle cool undertone that prevents the warmth of the accent from feeling muddy. It is two shades lighter than pure black to allow `#000000` to be reserved for maximum emphasis — the preloader screen and video letterboxing. The secondary background `#111118` provides just enough lift to create depth for cards and elevated surfaces.

`#F0EBE3` is a warm off-white reminiscent of aged vellum. It avoids the harshness of pure white while maintaining WCAG AAA contrast against the primary background (18.4:1). `#9A9590` is a warm mid-gray for timestamps and supporting information.

`#C4956A` is a muted brass tone referencing antique hardware patina. Used sparingly as a functional indicator of interactivity — never as a decorative fill. Contrast ratio against `#0A0A0F`: 5.8:1 (WCAG AA for text ≥18px).

#### 3.1.2 Secondary Colors

Secondary colors appear exclusively in image overlays, texture backgrounds, and material representation.

| Token | Hex | Usage |
|---|---|---|
| `--material-walnut` | `#3D2B1F` | Wood texture overlays, dark material swatches |
| `--material-oak` | `#6B4E3D` | Lighter wood tones |
| `--material-brass` | `#B8946A` | Metallic accent in product imagery |
| `--material-linen` | `#C8BFB5` | Fabric texture references |
| `--material-stone` | `#5C5855` | Stone/concrete material representation |
| `--overlay-warm` | `rgba(10, 10, 15, 0.75)` | Default overlay for heroes and project cards |
| `--overlay-cool` | `rgba(17, 17, 24, 0.6)` | Subtle overlay for dark underlying imagery |

Both overlays are composited over media using `mix-blend-mode: multiply` on pseudo-elements. The warm overlay is the default; the cool overlay is reserved for cases where the underlying imagery is already dark.

#### 3.1.3 Functional Colors

Functional colors communicate system state with muted, earth-adjacent tones.

| Token | Hex | Usage | Contrast on `#0A0A0F` |
|---|---|---|---|
| `--state-success` | `#7A8B6F` | Form confirmation, availability indicator | 4.5:1 |
| `--state-error` | `#9B5A5A` | Form validation errors | 4.8:1 |
| `--state-warning` | `#A68B5B` | Limited availability notice | 5.1:1 |
| `--state-info` | `#7A8290` | Informational notice | 4.3:1 |

Error states use three simultaneous cues: a 1px bottom border color change, error message text in `--state-error` at 14px, and a 3px solid left border on the input. No red background fills or shake animations — these violate the restrained aesthetic.

#### 3.1.4 Dark/Light Mode Considerations

The site ships with a single default dark theme. No light mode toggle, no system-preference detection. This is a deliberate product decision: the dark aesthetic is inseparable from the brand identity.

All color tokens are defined as CSS custom properties on `:root`, enabling future theming if requirements change. Light mode is reserved for one context only: `@media print` query inverts the palette to black text on white paper.

---

### 3.2 Typography

The typographic system is the primary carrier of hierarchy and emotion. With minimal text overall, every choice carries disproportionate weight.

#### 3.2.1 Primary Font: Cormorant Garamond

**Font family:** `Cormorant Garamond`, fallback `Georgia`, fallback `serif`  
**Weights loaded:** 300, 400, 500, 600  
**Font display:** `swap`

Cormorant Garamond is an open-source serif with high stroke contrast and delicate hairline terminals. It carries editorial gravitas while remaining legible at display sizes. Self-hosted via WOFF2 from `/public/fonts/`.

Used for: hero headlines, section headings (H1–H3), pull quotes, desktop nav links, footer brand name.

#### 3.2.2 Secondary Font: Inter

**Font family:** `Inter`, fallback `system-ui`, fallback `sans-serif`  
**Weights loaded:** 300, 400, 500  
**Font display:** `swap`

Inter is a neo-grotesque sans-serif designed for screen readability. Its large x-height and neutral character make it the ideal counterpoint to the ornamental serif.

Used for: body paragraphs, form labels and inputs, button text, captions, mobile nav links, footer utility text.

#### 3.2.3 Type Scale

The scale is rooted in a 1.25 major-third ratio. All sizes use `rem` with `16px` base.

| Token | Font | Desktop | Mobile | Line Height | Weight | Letter Spacing | Transform |
|---|---|---|---|---|---|---|---|
| `--type-display` | Cormorant Garamond | 80px / 5rem | 42px / 2.625rem | 1.05 | 300 | -0.02em | none |
| `--type-h1` | Cormorant Garamond | 64px / 4rem | 36px / 2.25rem | 1.1 | 400 | -0.015em | none |
| `--type-h2` | Cormorant Garamond | 48px / 3rem | 30px / 1.875rem | 1.15 | 400 | -0.01em | none |
| `--type-h3` | Cormorant Garamond | 32px / 2rem | 24px / 1.5rem | 1.2 | 500 | -0.005em | none |
| `--type-h4` | Inter | 24px / 1.5rem | 20px / 1.25rem | 1.3 | 400 | 0em | none |
| `--type-h5` | Inter | 18px / 1.125rem | 16px / 1rem | 1.4 | 500 | 0.02em | none |
| `--type-h6` | Inter | 14px / 0.875rem | 13px / 0.8125rem | 1.4 | 500 | 0.05em | uppercase |
| `--type-body` | Inter | 16px / 1rem | 15px / 0.9375rem | 1.65 | 400 | 0.005em | none |
| `--type-body-lg` | Inter | 18px / 1.125rem | 16px / 1rem | 1.6 | 400 | 0em | none |
| `--type-caption` | Inter | 13px / 0.8125rem | 12px / 0.75rem | 1.5 | 400 | 0.02em | none |
| `--type-button` | Inter | 14px / 0.875rem | 14px / 0.875rem | 1 | 500 | 0.06em | uppercase |
| `--type-nav` | Cormorant Garamond | 16px / 1rem | 20px / 1.25rem | 1 | 400 | 0.08em | uppercase |
| `--type-label` | Inter | 12px / 0.75rem | 11px / 0.6875rem | 1.3 | 500 | 0.08em | uppercase |

The display size (`--type-display`) is reserved exclusively for the homepage hero headline. At 80px with weight 300, it floats on the dark background with a weightless, monumental quality.

The transition from Cormorant Garamond to Inter occurs at H4, marking the shift from display hierarchy to functional information architecture. H6 and label tokens both render in uppercase with positive letter-spacing, creating a scannable information layer that does not compete with headlines.

#### 3.2.4 Line Heights, Letter Spacing, and Text Transformation Rules

**Line height:** Display and headline sizes use tight line heights (1.05–1.2) to prevent fragmentation. Body text uses 1.65 for extended reading comfort, calibrated for Inter's metrics. Captions use 1.3–1.5 to accommodate two-line wrapping.

**Letter spacing:** Negative tracking applies exclusively to Cormorant Garamond at display and headline sizes (—0.02em to —0.005em), creating optically denser word-shapes. Positive tracking (0.02em–0.08em) applies to uppercase text at small sizes to prevent letter collision.

**Text transformation:** Uppercase is used sparingly and only at sizes ≤14px where it enhances scannability. Uppercase is never applied to headline or body text.

**Rendering:** All text uses `-webkit-font-smoothing: antialiased` and `text-rendering: optimizeLegibility` for crisp thin strokes on macOS/iOS.

---

### 3.3 Spacing & Layout

The spacing system is built on an 8px base unit with a philosophy of radical generosity. Whitespace is a deliberate design material that creates hierarchy and communicates luxury.

#### 3.3.1 Grid System

The layout uses a custom 12-column grid with fluid columns and fixed gutters.

| Property | Desktop (≥1200px) | Tablet (600–1199px) | Mobile (≤599px) |
|---|---|---|---|
| Columns | 12 | 8 | 4 |
| Gutter | 32px | 24px | 16px |
| Margin (outer) | 64px | 40px | 20px |
| Max content width | 1200px | 100% — margins | 100% — margins |

Implemented via CSS Grid on desktop (`grid-template-columns: repeat(12, 1fr)`), reconfiguring to 8-column and 4-column on tablet and mobile. Key layout regions use specific column spans rather than generic divisions.

#### 3.3.2 Spacing Scale

| Token | Value | Common Usage |
|---|---|---|
| `--space-1` | 4px / 0.25rem | Micro-adjustments, icon padding |
| `--space-2` | 8px / 0.5rem | Tight component padding, small gaps |
| `--space-3` | 16px / 1rem | Default component padding, form field gaps |
| `--space-4` | 24px / 1.5rem | Card internal padding, medium gaps |
| `--space-5` | 32px / 2rem | Section sub-padding, nav item spacing |
| `--space-6` | 48px / 3rem | Content block separation, card grid gaps |
| `--space-7` | 64px / 4rem | Section internal padding (minor sections) |
| `--space-8` | 96px / 6rem | Section vertical padding (major sections) |
| `--space-9` | 128px / 8rem | Hero section padding, major section separation |
| `--space-10` | 192px / 12rem | Homepage hero top padding |

The scale doubles at each major step with 24px and 48px as interpolated values. All margins and paddings reference these tokens — no arbitrary pixel values in component styles.

#### 3.3.3 Container Widths

| Breakpoint | Min Width | Max Width | Container Padding |
|---|---|---|---|
| Desktop XL | 1400px | 100% | 64px |
| Desktop | 1200px | 1399px | 64px |
| Tablet | 768px | 1199px | 40px |
| Mobile Large | 480px | 767px | 24px |
| Mobile | 320px | 479px | 20px |

The container (`max-width: 1200px; margin: 0 auto`) centers content on large screens. Full-bleed sections (hero video, project showcases) extend to viewport edges.

#### 3.3.4 Section Vertical Rhythm

- **Hero sections:** `padding-top: 192px`, `padding-bottom: 128px` (desktop). Generous top padding positions the hero headline below the nav bar.
- **Content sections:** `padding-top: 96px`, `padding-bottom: 96px` on desktop; `64px`/`64px` on mobile.
- **Adjacent same-background sections:** `0px` separation; a 1px border `rgba(240, 235, 227, 0.06)` provides visual division.
- **Contrasting background sections:** no border; the color change (`#0A0A0F` to `#111118`) provides natural separation.

---

### 3.4 UI Components

All components are minimal and precise. Interactivity is signaled through subtle color changes and micro-movements rather than dramatic shifts.

#### 3.4.1 Button Styles

| Variant | Default State | Hover State | Active State | Disabled State |
|---|---|---|---|---|
| **Primary CTA** | bg `#C4956A`, text `#0A0A0F`, padding 16px 40px | bg `#D4A57A`, translateY(-1px) | bg `#B4845A`, translateY(0) | bg `rgba(196,149,106,0.3)`, text `rgba(10,10,15,0.4)` |
| **Secondary Outline** | border 1px `#F0EBE3`, text `#F0EBE3`, bg transparent, padding 16px 40px | border `#C4956A`, text `#C4956A`, bg `rgba(196,149,106,0.08)` | border `#B4845A`, text `#B4845A` | border `rgba(240,235,227,0.2)`, text `rgba(240,235,227,0.3)` |
| **Text Link** | text `#F0EBE3`, underline offset 4px | text `#C4956A`, 1px bottom border appears | text `#B4845A` | text `rgba(240,235,227,0.3)` |

All state changes animate over `0.25s` with `cubic-bezier(0.4, 0, 0.2, 1)`. Primary CTA hover lifts 1px via `transform` — no shadow-based lift. Border radius: `0px` on all buttons (square corners reinforce craftsmanship). Button font: `--type-button` (Inter 14px weight 500, uppercase, 0.06em letter spacing).

#### 3.4.2 Form Elements

**Text input:** Transparent background, bottom border only (`1px solid rgba(240, 235, 227, 0.2)`), height 56px, padding 16px 0, font `--type-body`. Focus border: `#C4956A`. Error border: `#9B5A5A`. Placeholder: `#9A9590`. Transition: `border-color 0.2s ease`.

**Textarea:** Same as text input, min-height 160px, resize vertical only, line height 1.65.

**Select:** Same base as input, custom 16px chevron (stroke `#9A9590`) right-aligned. Dropdown panel: bg `#111118`, border `1px solid rgba(240, 235, 227, 0.1)`. Option hover: `rgba(196, 149, 106, 0.08)`.

**Checkbox:** 20px × 20px, 1px border `rgba(240, 235, 227, 0.3)`, border-radius 0px. Checked: bg `#C4956A`, checkmark SVG in `#0A0A0F`. Transition: `all 0.15s ease`.

**File upload:** Dashed border 1px `rgba(240, 235, 227, 0.2)`, hover border `#C4956A`, padding 48px 32px. Upload icon 32px stroke `#9A9590`, text in `--type-caption`.

**Label:** `--type-label` font, color `#9A9590`, margin-bottom 8px, required indicator " *" in `--state-error`.

#### 3.4.3 Card Styles

**Project Card:**
- Aspect ratio 4:3 desktop, 3:4 mobile
- Image fills container (`object-fit: cover`)
- Hover: warm overlay fades in (0.3s), image scales 1.04 (0.5s ease), title translates up 8px (0.3s, 0.1s delay)
- Title: `--type-h3`, bottom-left, 24px padding
- Category: `--type-label` in `#C4956A` above title
- Border-radius: 0px

**Service Card:**
- Desktop: horizontal (image 50%, content 50%); mobile: stacked
- Content padding: 48px, title `--type-h3`, description `--type-body` in `#9A9590`, CTA text link
- Hover: card lifts `translateY(-4px)` (0.3s), image scales 1.02
- Divider: 1px top border `rgba(240, 235, 227, 0.06)` between consecutive cards

**Testimonial Card:**
- Background `#111118`, padding 48px, max-width 640px centered
- Quote: `--type-h4` in Cormorant Garamond italic weight 400
- 32px horizontal line in `#C4956A` above quote
- Attribution: `--type-caption`, name in `#F0EBE3`, title in `#9A9590`
- Border-radius: 0px

#### 3.4.4 Navigation

**Desktop Navbar:**
- Fixed position, height 80px, full width
- Background: transparent → `rgba(10, 10, 15, 0.92)` with `backdrop-filter: blur(12px)` after 100px scroll (0.3s ease)
- Logo (left): Cormorant Garamond 20px weight 400, 0.1em letter spacing, uppercase, text-based
- Nav links (center): `--type-nav`, color `#F0EBE3`, gap 40px
- Active link: color `#C4956A`, 1px bottom border `#C4956A`
- Hover: color → `#C4956A` (0.2s)

**Mobile Hamburger Menu:**
- Icon: two 24px-wide lines, 1px height, 6px gap
- Open: lines rotate ±45deg to form X (0.3s ease)
- Panel: full-screen overlay bg `#0A0A0F`, slides from right (0.4s `cubic-bezier(0.4, 0, 0.2, 1)`)
- Links: Inter 20px, uppercase, 32px vertical gap
- Close: X button, overlay tap, or Escape key

**Scroll Behavior:**
- Hides on scroll down (`translateY(-80px)`, 0.3s), reveals on scroll up (`translateY(0)`, 0.3s)
- Minimum direction change threshold: 10px
- Always visible within first 100px of page

#### 3.4.5 Modals and Overlays

**Contact Form Modal:**
- Overlay: `rgba(10, 10, 15, 0.85)` with `backdrop-filter: blur(4px)`
- Panel: max-width 600px, bg `#111118`, padding 64px desktop / 40px mobile
- Entry: overlay fades 0.3s, panel fades + translateY(-20px → 0) 0.4s with 0.1s delay
- Exit: reverse, 0.2s
- Close button: 24px X, top-right 24px, `#9A9590` → `#F0EBE3` on hover
- Focus trap implemented

**Image Lightbox:**
- Overlay: `rgba(10, 10, 15, 0.95)`
- Image: max 90vw/90vh, `object-fit: contain`
- Arrows: 40px stroke `#F0EBE3`, 24px from edges
- Counter: `--type-caption` bottom center ("3 / 12" format)
- Entry: scale 0.95→1 + fade, 0.3s ease
- Keyboard: Escape to close, arrows to navigate

**Video Player Overlay:**
- Overlay: `rgba(10, 10, 15, 0.95)`, video centered max 1200px 16:9
- Close: X button + Escape + click outside
- Background page video pauses on open, resumes on close

---

### 3.5 Animation & Motion

Animation guides attention and signals crafted quality. Motion is never decorative — it reinforces precision and patience.

#### 3.5.1 Page Load Animations

1. **Preloader (0–800ms):** Full-screen `#000000` overlay with brand name centered (Cormorant Garamond 14px, weight 300, 0.2em letter spacing, uppercase). Text fades in 0.3s, holds 0.2s, overlay fades out 0.3s.

2. **Hero reveal (800–2000ms):** Headline fades in + translateY(30px→0), 0.8s `cubic-bezier(0.4, 0, 0.2, 1)`. Subtitle follows at 0.15s delay. CTA at 0.3s delay. Navbar background transitions to blurred state, 0.5s.

3. **Background media:** Hero video begins immediately after preloader, playing behind still-fading text for a cinematic reveal.

#### 3.5.2 Scroll-Triggered Reveals

Intersection Observer triggers at 15% visibility (`threshold: 0.15`), firing once per element.

**Default pattern:** `opacity: 0→1`, `translateY(40px)→0`, duration 0.7s, easing `cubic-bezier(0.4, 0, 0.2, 1)`, sibling stagger 0.12s.

**Stagger groups:**
- Project card grids: 0.15s stagger in reading order
- Service cards: 0.2s stagger
- Feature list items: 0.1s stagger
- Testimonials: single reveal

**Headlines (H1–H3):** Clip-mask reveal — text slides up from behind `overflow: hidden` wrapper. `translateY(100%)→0`, 0.8s, `cubic-bezier(0.25, 0.1, 0.25, 1.0)`.

#### 3.5.3 Hover Interactions

Default transition: `0.25s cubic-bezier(0.4, 0, 0.2, 1)`. Color-only: `0.2s ease`. Transform: `0.3s cubic-bezier(0.4, 0, 0.2, 1)`.

- **Buttons:** See 3.4.1
- **Project cards:** overlay fades 0.3s, image scales 1.04 (0.5s), title up 8px (0.3s, 0.1s delay)
- **Service cards:** lift 4px (0.3s), image scales 1.02 (0.4s)
- **Gallery images:** scale 1.0→1.03 (0.4s)
- **Nav links:** color → `#C4956A` (0.2s), bottom border fades in offset 4px

#### 3.5.4 Video Transitions

- **Background video:** Autoplay, muted, looped, `playsinline`, no visible controls. Fade-in `opacity: 0→1` over 1.5s on `onloadeddata`. Between pages: outgoing fades 0.5s, incoming fades 1.0s — no hard cuts.
- **Inline video:** Plays on click. Poster fades out 0.3s, video fades in 0.3s. Custom play button: 64px circle, bg `rgba(10, 10, 15, 0.6)`, play icon `#F0EBE3`. Hover: bg → `rgba(196, 149, 106, 0.8)`, scale 1.05 (0.2s).

#### 3.5.5 Performance Guardrails

| Rule | Specification |
|---|---|
| Frame rate | 60fps minimum |
| Animated properties | Only `transform` and `opacity`. No layout-triggering properties. |
| Paint containment | `will-change: transform, opacity` applied pre-animation, removed after |
| Reduced motion | `prefers-reduced-motion: reduce` — all animations become instant (0.01ms) |
| Scroll events | `requestAnimationFrame` throttling, direct DOM via refs (no setState) |
| Observer cleanup | Intersection Observers disconnect after triggering |
| Concurrent limit | Maximum 8 concurrent CSS animations on screen |

**Reduced motion CSS:**

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

The 0.01ms duration renders motion instantaneous while preserving end states, ensuring no content remains hidden from unplayed entrance animations.


---

## 4. Technical Specification

### 4.1 Technology Stack

The technology stack is purposefully selected to deliver a fast, maintainable, and financially efficient MVP without sacrificing the production quality expected from a luxury furniture brand. Every tool was evaluated against three criteria: static-site compatibility, performance characteristics, and long-term maintainability.

#### 4.1.1 Framework: SvelteKit with Static Adapter

SvelteKit serves as the application framework, configured with `@sveltejs/adapter-static` to produce a fully static site deployable to any edge host without a server runtime. This decision directly addresses the client's requirement for a fast, scalable, backend-free MVP.

SvelteKit was chosen over alternatives on the following technical grounds:

| Criterion | SvelteKit + adapter-static | Next.js | Nuxt | Astro |
|---|---|---|---|---|
| Runtime overhead | Zero (compiled away) | React runtime (~40KB) | Vue runtime (~30KB) | Zero ( island architecture ) |
| Hydration model | Fine-grained, component-level | Full page hydration | Full page hydration | Partial hydration |
| Static output | First-class via adapter-static | Supported via `output: 'export'` | Supported via `ssr: false` | Native (default) |
| Bundle size (baseline) | ~5KB (Svelte runtime) | ~75KB (React + DOM) | ~55KB (Vue + runtime) | ~0KB (static pages) |
| Learning curve (for team) | Moderate | Moderate | Moderate | Low |
| Ecosystem maturity | Growing rapidly | Mature | Mature | Growing |
| Build speed | Fast (~2s HMR) | Moderate | Moderate | Very fast |

The static adapter renders all pages at build time. Each route becomes a self-contained HTML file with pre-rendered markup. Client-side navigation is handled by SvelteKit's router, which progressively hydrates only the interactive components on each page. This yields the performance benefits of a static site with the user experience of a single-page application.

**Key configuration:**

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-static';

export default {
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
```

The `trailingSlash: 'always'` setting ensures consistent URL formatting (`/about/` instead of `/about`), which simplifies relative asset referencing and avoids duplicate content issues. The `precompress: true` option generates `.gz` and `.br` compressed asset variants at build time, reducing server-side compression overhead.

#### 4.1.2 Language: TypeScript

All source code is written in TypeScript with `strict: true` mode enabled in `tsconfig.json`. TypeScript provides compile-time type checking that eliminates an entire class of runtime errors, enables precise IDE autocomplete for component props and stores, and documents the codebase implicitly through type annotations. For a project that will evolve with i18n support and potential CMS integration, type safety at the API boundary is non-negotiable.

**TypeScript configuration highlights:**

```json
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "strict": true,
    "resolveJsonModule": true,
    "allowJs": true,
    "checkJs": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  }
}
```

SvelteKit auto-generates the base `tsconfig.json` from `.svelte-kit/tsconfig.json`, ensuring that path aliases (`$lib`, `$routes`, etc.) resolve correctly. All `.svelte` files use `<script lang="ts">` for type-checked components.

#### 4.1.3 Styling: Tailwind CSS v4

Tailwind CSS v4 is the sole styling solution. The v4 release introduces significant architectural improvements: a Rust-based engine (Tailwind Oxide) that processes styles 10x faster than v3, native CSS cascade layers (`@layer`), and simplified configuration via CSS-only setup without a `tailwind.config.js` file.

Design tokens from Chapter 3 (Design System) are mapped to Tailwind's theme configuration directly in CSS:

```css
/* app.css — Tailwind v4 theme definition */
@import "tailwindcss";

@theme {
  --color-primary: #1a1a1a;
  --color-primary-light: #2d2d2d;
  --color-accent: #c8a97e;
  --color-accent-dark: #b8976a;
  --color-surface: #fafaf8;
  --color-surface-alt: #f0eeeb;
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #6b6b6b;
  --color-text-muted: #9a9a9a;
  --font-serif: "Playfair Display", ui-serif, Georgia, serif;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --spacing-section: 8rem;
}
```

This approach eliminates the need for a separate config file. All tokens are CSS custom properties that cascade naturally and can be overridden per-component when necessary. The `@theme` directive in Tailwind v4 generates the full set of utility classes automatically.

#### 4.1.4 Build Tool: Vite

Vite is the build tool bundled with SvelteKit. It provides:

- **Instant Hot Module Replacement (HMR)** via native ES modules in development — changes reflect in the browser within 50–100ms.
- **Rollup-based production bundling** that produces optimized, tree-shaken JavaScript bundles with automatic code splitting.
- **Asset pipeline** that handles CSS processing, image imports, font loading, and static asset hashing for cache-busting.
- **Plugin ecosystem** that allows integration of additional build-time tooling (image optimization, SVG processing) via Rollup-compatible plugins.

No custom Vite configuration is required beyond what SvelteKit provides by default. The `vite.config.ts` file is minimal:

```typescript
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()]
});
```

#### 4.1.5 Package Manager: pnpm

pnpm is the specified package manager. It provides:

- **Disk-space efficiency**: Packages are stored once globally and hard-linked into projects, reducing `node_modules` footprint by ~70% compared to npm.
- **Strict dependency resolution**: Only declared dependencies are accessible, preventing phantom dependency bugs.
- **Fast installation**: Parallelized downloads and installation typically complete in under 10 seconds for this project's dependency set.
- **Lockfile (`pnpm-lock.yaml`)**: Ensures deterministic installs across all environments (local, CI, production builds).

**Required version**: pnpm 9.x or later. Team members enforce this via `"packageManager": "pnpm@9.15.0"` in `package.json`.

---

### 4.2 Project Structure

#### 4.2.1 Directory Layout

The project follows SvelteKit's file-based routing convention with additional directories for component organization, utilities, and static assets.

| Folder | Purpose | Contents |
|---|---|---|
| `src/routes/` | File-based routing; each folder becomes a page | `+page.svelte`, `+page.ts`, `+layout.svelte` per route; e.g., `routes/about/+page.svelte` |
| `src/lib/components/` | Reusable Svelte components | Subdirectories: `atoms/`, `molecules/`, `organisms/` per atomic design |
| `src/lib/stores/` | Svelte 5 runes-based state | `cookieConsent.svelte.ts`, `navigation.svelte.ts`, `formState.svelte.ts` |
| `src/lib/utils/` | Helper functions and utilities | `seo.ts`, `validation.ts`, `analytics.ts`, `video.ts`, `helpers.ts` |
| `src/lib/types/` | TypeScript type definitions | `furniture.ts`, `form.ts`, `seo.ts`, `i18n.ts` (future-ready) |
| `src/lib/data/` | Static content data | `projects.ts`, `testimonials.ts`, `faq.ts`, `site.ts` — typed data objects |
| `src/lib/assets/` | Source assets before optimization | Raw images, videos, SVG illustrations; processed at build time |
| `static/` | Static files served at root | `favicon.ico`, `robots.txt`, `fonts/`, `sitemap.xml` (generated) |
| `scripts/` | Build and utility scripts | `generate-sitemap.ts`, `optimize-images.ts` |
| `e2e/` | End-to-end tests (future) | Playwright test files |

**Route structure (`src/routes/`):**

```
routes/
├── +layout.svelte              # Root layout: nav, footer, cookie banner, analytics
├── +page.svelte                # Homepage
├── about/
│   └── +page.svelte            # About / Craftsmanship page
├── projects/
│   ├── +page.svelte            # Projects listing
│   └── [slug]/
│       └── +page.svelte        # Individual project detail (generate from data)
├── services/
│   └── +page.svelte            # Services overview
├── materials/
│   └── +page.svelte            # Materials & finishes guide
├── process/
│   └── +page.svelte            # How we work
├── contact/
│   └── +page.svelte            # Contact form
├── privacy/
│   └── +page.svelte            # Privacy policy (GDPR requirement)
└── cookies/
    └── +page.svelte            # Cookie policy (GDPR requirement)
```

Dynamic project pages use SvelteKit's `[slug]` parameter syntax. Since the site is fully static, all project slugs are enumerated at build time via the `entries` export in `+page.ts`:

```typescript
// routes/projects/[slug]/+page.ts
import { projects } from '$lib/data/projects';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
  return projects.map((p) => ({ slug: p.slug }));
};

export const prerender = true;
```

#### 4.2.2 Component Architecture: Atomic Design

Components are organized using the atomic design methodology, adapted for Svelte's component model. This creates a clear hierarchy and ensures that UI elements are composed consistently.

**Atoms** — smallest, indivisible components with no internal dependencies:

- `Button.svelte` — primary, secondary, ghost variants; configurable size (`sm`, `md`, `lg`)
- `Input.svelte` — text input with label, error state, helper text
- `Textarea.svelte` — multi-line input with character counter
- `Heading.svelte` — h1 through h6 with serif/sans variants and size presets
- `Image.svelte` — responsive image component with WebP/AVIF srcset, lazy loading, blur placeholder
- `Video.svelte` — HTML5 video wrapper with intersection-observer pause/play
- `Icon.svelte` — SVG icon component accepting `name` prop; inline SVGs for core icons

**Molecules** — composed of 2–3 atoms:

- `ProjectCard.svelte` — image + heading + category tag + hover overlay
- `TestimonialCard.svelte` — quote text + author name + project reference
- `MaterialCard.svelte` — image swatch + material name + description
- `ContactForm.svelte` — form fields + submit button + validation errors
- `CookieBanner.svelte` — consent text + accept/reject/customize buttons

**Organisms** — complex, self-contained sections:

- `HeroSection.svelte` — full-width video/image background + headline + CTA
- `ProjectGrid.svelte` — filterable grid of `ProjectCard` molecules
- `ProcessTimeline.svelte` — vertical step-by-step process visualization
- `MaterialsShowcase.svelte` — interactive material gallery with detail panels
- `Footer.svelte` — multi-column footer with navigation, contact info, social links
- `Navigation.svelte` — desktop header + mobile hamburger menu with overlay

#### 4.2.3 State Management: Svelte 5 Runes

No external state management library (Redux, Zustand, Pinia) is required. Svelte 5's runes system provides reactive state management natively:

- `$state()` for reactive variables
- `$derived()` for computed values
- `$effect()` for side effects (analytics, DOM manipulation)
- `$props()` for component props with type safety

Example: cookie consent store implemented as a module-level rune:

```typescript
// src/lib/stores/cookieConsent.svelte.ts
import { browser } from '$app/environment';

const STORAGE_KEY = 'cookie_consent';

function createConsentStore() {
  let consent = $state<'pending' | 'accepted' | 'rejected'>(
    browser ? (localStorage.getItem(STORAGE_KEY) as 'accepted' | 'rejected' | null) ?? 'pending' : 'pending'
  );

  let analytics = $derived(consent === 'accepted');
  let marketing = $derived(consent === 'accepted');

  function accept() {
    consent = 'accepted';
    if (browser) localStorage.setItem(STORAGE_KEY, 'accepted');
  }

  function reject() {
    consent = 'rejected';
    if (browser) localStorage.setItem(STORAGE_KEY, 'rejected');
  }

  return {
    get consent() { return consent; },
    get analytics() { return analytics; },
    get marketing() { return marketing; },
    accept,
    reject
  };
}

export const cookieConsent = createConsentStore();
```

This pattern is used for all global state: navigation (mobile menu open/closed), form submission status, and active video elements. Module-level runes are imported wherever needed and automatically share state across component boundaries without prop drilling.

#### 4.2.4 Static Site Generation Strategy

All pages are pre-rendered at build time. The `prerender = true` setting is applied globally in `src/routes/+layout.ts`:

```typescript
// src/routes/+layout.ts
export const prerender = true;
export const trailingSlash = 'always';
```

For the projects detail pages (`[slug]`), the `entries` export (shown in 4.2.1) enumerates all valid slugs, enabling the static adapter to generate one HTML file per project at build time. This means zero runtime data fetching — every page is a complete, self-contained HTML document with all content inlined.

The static output in the `build/` directory contains:

- One `index.html` per route
- Hashed JavaScript bundles in `_app/immutable/` (cache-busted via content hash in filename)
- Hashed CSS in `_app/immutable/assets/`
- Copied static assets (fonts, pre-optimized images, videos) in their original paths

---

### 4.3 Dependencies & Libraries

The dependency philosophy is minimal and intentional. Every package added to the project must justify its bundle-size cost against the functionality it provides.

| Package | Version | Purpose | Approx. Bundle Impact |
|---|---|---|---|
| `svelte` | ^5.0.0 | UI framework (compiler) | ~5KB runtime |
| `@sveltejs/kit` | ^2.0.0 | Application framework | Included in SvelteKit build |
| `@sveltejs/adapter-static` | ^3.0.0 | Static site generation | Build-time only |
| `typescript` | ^5.6.0 | Type system | Build-time only |
| `tailwindcss` | ^4.0.0 | Utility-first CSS framework | 0KB (compiled to static CSS) |
| `gsap` | ^3.12.0 | Animation engine (ScrollTrigger included) | ~28KB (tree-shaken) |
| `embla-carousel-svelte` | ^8.0.0 | Touch-friendly carousel | ~12KB |
| `zod` | ^3.23.0 | Schema validation for forms | ~12KB |
| `@fontsource/playfair-display` | ^5.0.0 | Self-hosted serif font | ~120KB (variable font, loaded on demand) |
| `@fontsource/inter` | ^5.0.0 | Self-hosted sans-serif font | ~80KB (variable font, loaded on demand) |
| `@sveltejs/enhanced-img` | ^0.3.0 | Responsive image optimization | Build-time only |
| `lucide-svelte` | ^0.460.0 | Icon library (tree-shakeable) | ~2KB (per icon used) |

**Dev dependencies** (not shipped to client):

| Package | Version | Purpose |
|---|---|---|
| `vite` | ^6.0.0 | Build tool (bundled with SvelteKit) |
| `@sveltejs/vite-plugin-svelte` | ^4.0.0 | Svelte Vite integration |
| `svelte-check` | ^4.0.0 | TypeScript checking for .svelte files |
| `prettier` | ^3.3.0 | Code formatting |
| `prettier-plugin-svelte` | ^3.2.0 | Prettier support for Svelte files |
| `eslint` | ^9.0.0 | Code linting |
| `@types/node` | ^22.0.0 | Node.js type definitions |
| `tsx` | ^4.0.0 | TypeScript execution for build scripts |

#### 4.3.1 Core Runtime Dependencies: Minimal Footprint

The client-side JavaScript bundle is intentionally lean. With Svelte's compile-time approach, the framework itself ships only a ~5KB runtime. All other dependencies are either build-time only (Tailwind, TypeScript), tree-shakeable (GSAP, Lucide), or loaded on demand (fonts). The estimated total client-side JavaScript for a fully loaded homepage is under 100KB gzipped.

#### 4.3.2 Animation Libraries: GSAP with ScrollTrigger

GSAP (GreenSock Animation Platform) is the sole animation library. It provides:

- **ScrollTrigger plugin** for scroll-driven animations (parallax, fade-ins, pinned sections)
- **Timeline API** for choreographed, sequenced animations
- **Performance** — GSAP uses `requestAnimationFrame` and GPU-accelerated transforms exclusively; no layout-thrashing properties are animated

Usage pattern: animations are initialized in Svelte's `onMount` lifecycle hook and cleaned up in `onDestroy`. ScrollTrigger instances are created with scoped triggers and killed when components unmount to prevent memory leaks.

Example scroll-triggered reveal animation:

```typescript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// In component onMount
const triggers: ScrollTrigger[] = [];
const elements = section.querySelectorAll('.reveal');

elements.forEach((el) => {
  const st = ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    onEnter: () => {
      gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
    },
    once: true
  });
  triggers.push(st);
});

// Cleanup
return () => triggers.forEach((st) => st.kill());
```

#### 4.3.3 Carousel/Gallery: Embla Carousel

Embla Carousel is selected over Swiper for its smaller bundle size (~12KB vs. ~40KB) and fully tree-shakeable architecture. It provides touch/swipe support, loop mode, snap-to-slide behavior, and a Svelte-specific package (`embla-carousel-svelte`) with native rune integration.

Used in: project detail image galleries, material swatch carousels, and mobile testimonial sliders.

#### 4.3.4 Form Handling: Zod Validation + Formspree Submission

The contact form has no backend. Client-side validation and submission flow:

1. **Input validation** — Zod schema validates on blur and on submit:

```typescript
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  projectType: z.enum(['furniture', 'interior', 'consultation', 'other']),
  message: z.string().min(20, 'Please describe your project in at least 20 characters').max(2000),
  budget: z.enum(['under-5k', '5k-15k', '15k-50k', 'over-50k', 'not-sure']).optional(),
  honeypot: z.string().max(0).optional() // anti-spam: must be empty
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

2. **Honeypot field** — an invisible `honeypot` input field traps bots. If populated, the submission is silently rejected without user-facing error (to avoid revealing the defense mechanism).

3. **Form submission** — validated data is sent to Formspree (`https://formspree.io/f/{FORM_ID}`) via `fetch()` POST request. Formspree handles delivery to the client's email inbox with spam filtering and submission management dashboard.

4. **Alternative provider** — Basin (`https://usebasin.com`) is documented as a drop-in alternative with a similar API and comparable pricing ($4/month vs. Formspree's free tier).

5. **Submission states** — the form displays three states: `idle`, `submitting` (button shows spinner), `success` (confirmation message + tracking event), and `error` (field-level errors or network failure message).

#### 4.3.5 Image Optimization: Svelte Enhanced Images

`@sveltejs/enhanced-img` is the primary image optimization solution. It processes images at build time to generate:

- WebP and AVIF variants of each source image
- Responsive `srcset` attributes at multiple breakpoints (480w, 768w, 1200w, 1920w)
- Low-quality placeholder (LQIP) for blur-up loading effect
- Automatic width/height attributes to prevent layout shift

Usage in components:

```svelte
<script>
  import myImage from '$lib/assets/project-hero.jpg?enhanced';
</script>

<enhanced:img
  src={myImage}
  alt="Custom walnut dining table in modern interior"
  sizes="(min-width: 1200px) 1200px, 100vw"
  class="w-full h-auto"
/>
```

#### 4.3.6 Video Player: Native HTML5 Video

No external video player library is used. Videos are rendered with the native `<video>` element wrapped in a Svelte component that adds:

- `IntersectionObserver`-based play/pause (video pauses when scrolled out of viewport)
- Custom minimal controls overlay (play/pause button, mute toggle)
- Poster frame displayed before playback starts
- Lazy initialization: the `preload="none"` attribute is set until the video enters the viewport

```svelte
<video
  {poster}
  {src}
  muted
  loop
  playsinline
  preload="none"
  bind:this={videoElement}
  class="w-full h-full object-cover"
>
  <source src={mp4Src} type="video/mp4" />
  <source src={webmSrc} type="video/webm" />
</video>
```

---

### 4.4 Performance Strategy

Performance is a core feature of the brand experience. A luxury furniture website must feel instantaneous — any perceptible delay undermines the perception of quality.

#### 4.4.1 Core Web Vitals Targets

| Metric | Target | Luxury Benchmark | Measurement Tool |
|---|---|---|---|
| **LCP** (Largest Contentful Paint) | < 2.0s | < 2.5s (Google "Good") | Lighthouse, PageSpeed Insights |
| **INP** (Interaction to Next Paint) | < 150ms | < 200ms (Google "Good") | Chrome UX Report, Lighthouse |
| **CLS** (Cumulative Layout Shift) | < 0.05 | < 0.1 (Google "Good") | Lighthouse, PageSpeed Insights |
| **TTFB** (Time to First Byte) | < 600ms | < 800ms | WebPageTest, Chrome DevTools |
| **FCP** (First Contentful Paint) | < 1.2s | < 1.8s | Lighthouse |
| **Total Blocking Time** | < 150ms | < 200ms | Lighthouse |

These targets are 20–40% stricter than Google's "Good" thresholds, reflecting the luxury positioning. Every optimization in this section is oriented toward hitting these numbers.

#### 4.4.2 Image Optimization

All images follow a rigorous optimization pipeline:

- **Format**: WebP as primary format with AVIF fallback for browsers that support it (~85% global coverage as of 2024). AVIF provides 30–50% smaller file sizes than WebP at equivalent quality.
- **Quality setting**: 80 for WebP, 75 for AVIF — visually indistinguishable from source at these levels for photographic content.
- **Responsive srcset**: five breakpoints generated automatically: 480w, 768w, 1200w, 1920w, and original. The browser selects the optimal resolution based on device pixel density and viewport width.
- **Lazy loading**: all images below the fold use `loading="lazy"`. Above-the-fold images (hero, first project card) use `loading="eager"` with `fetchpriority="high"`.
- **Placeholder**: a 20px-wide LQIP (Low-Quality Image Placeholder) is inlined as a base64 data URI, blurred via CSS (`filter: blur(10px)`), and replaced by the full image on load. This eliminates layout shift and provides perceived-speed improvement.
- **Dimensions**: every image includes explicit `width` and `height` attributes (or `aspect-ratio` in CSS) to reserve space before the image loads, preventing layout shift.
- **CDN delivery**: all images are served from the hosting CDN with automatic format negotiation (serving AVIF to supporting browsers without developer intervention).

#### 4.4.3 Video Optimization

- **Format**: MP4 (H.264 codec) as primary, WebM (VP9 codec) as fallback. H.264 offers universal compatibility; VP9 provides 20–30% smaller file sizes for equivalent quality.
- **Compression target**: bitrate capped at 4 Mbps for 1080p hero videos, 2 Mbps for 720p inline videos. Videos are compressed using FFmpeg with two-pass encoding before being added to the project.
- **Poster frames**: each video has a JPEG poster frame (quality 80, WebP format) displayed while the video initializes. The poster is optimized through the same pipeline as static images.
- **Lazy initialization**: videos use `preload="none"` and only begin loading when the Intersection Observer detects the element within 200px of the viewport. When scrolled out of view for more than 500ms, the video pauses to conserve CPU and bandwidth.
- **File size budget**: no individual video exceeds 8MB. Hero videos target 3–5MB. Longer process videos are split into chapter segments loaded sequentially.
- **Hosting**: video files are served from a dedicated video CDN (Bunny.net Stream or Cloudflare Stream) with global edge caching, adaptive bitrate selection, and automatic format optimization. This offloads video bandwidth from the primary web host.

#### 4.4.4 Code Splitting

- **Route-based splitting**: SvelteKit automatically code-splits by route. Each page loads only the JavaScript required for that page. Shared code (layout, navigation, cookie banner) is extracted into a common chunk.
- **Dynamic imports**: heavy, below-the-fold components (carousel, video player, map embed) are loaded via `import()` dynamically when they approach the viewport:

```typescript
const Carousel = $derived(
  browser ? import('$lib/components/organisms/Carousel.svelte').then((m) => m.default) : null
);
```

- **GSAP tree-shaking**: only the required GSAP plugins are imported. The full GSAP bundle is ~90KB; tree-shaken usage is ~28KB.
- **Font loading strategy**: both fonts (`Playfair Display`, `Inter`) use the `display: swap` strategy with `@fontsource` npm packages that self-host the font files. The variable font format (VF) loads a single file instead of multiple weight-specific files, reducing font requests from 8+ to 2.

#### 4.4.5 Caching Strategy

- **Static assets**: all files in the `build/_app/immutable/` directory are served with `Cache-Control: public, max-age=31536000, immutable` headers. The content-hash in filenames ensures cache-busting on each deployment.
- **HTML pages**: served with `Cache-Control: public, max-age=0, must-revalidate` to allow stale-while-revalidate behavior at the CDN edge. Pages are cached at edge nodes for 60 seconds, then revalidated in the background.
- **CDN configuration**: the chosen hosting platform (see 4.6) provides global edge caching. All static assets are cached at 300+ edge locations, reducing latency to < 50ms for cached content worldwide.

---

### 4.5 SEO Implementation

#### 4.5.1 Meta Tags: Dynamic Per-Page

Every page generates unique `<title>`, `<meta name="description">`, Open Graph, and Twitter Card tags via a shared `SeoHead` component:

```svelte
<!-- src/lib/components/molecules/SeoHead.svelte -->
<script lang="ts">
  import { page } from '$app/stores';

  interface Props {
    title: string;
    description: string;
    image?: string;
    type?: 'website' | 'article';
  }

  let { title, description, image = '/og-default.jpg', type = 'website' }: Props = $props();

  const siteName = 'Atelier — Custom Furniture';
  const fullTitle = title === siteName ? siteName : `${title} | ${siteName}`;
</script>

<svelte:head>
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={`https://atelier-furniture.com${$page.url.pathname}`} />

  <!-- Open Graph -->
  <meta property="og:site_name" content={siteName} />
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={`https://atelier-furniture.com${image}`} />
  <meta property="og:type" content={type} />
  <meta property="og:url" content={`https://atelier-furniture.com${$page.url.pathname}`} />

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={fullTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={`https://atelier-furniture.com${image}`} />
</svelte:head>
```

Each page passes route-specific values:

| Page | Title | Description | OG Image |
|---|---|---|---|
| Home | Atelier — Custom Furniture | Bespoke furniture crafted by hand... | `/og-home.jpg` |
| About | About Our Craftsmanship | 20 years of artisan furniture making... | `/og-about.jpg` |
| Projects | Portfolio of Custom Work | Explore our collection of bespoke pieces... | `/og-projects.jpg` |
| Project Detail | [Project Name] — Atelier | [Project description]... | `/og-[slug].jpg` |
| Contact | Start Your Project | Get in touch to discuss your custom furniture... | `/og-contact.jpg` |

#### 4.5.2 Structured Data: JSON-LD

Every page includes relevant JSON-LD structured data in a `<script type="application/ld+json">` tag within `<svelte:head>`:

**Homepage — LocalBusiness + WebSite:**

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "name": "Atelier Custom Furniture",
      "description": "Bespoke furniture design and craftsmanship...",
      "url": "https://atelier-furniture.com/",
      "telephone": "+1-XXX-XXX-XXXX",
      "email": "hello@atelier-furniture.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "[City]",
        "addressRegion": "[State]",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "XX.XXXX",
        "longitude": "-XX.XXXX"
      },
      "openingHoursSpecification": [...],
      "priceRange": "$$$$",
      "image": "https://atelier-furniture.com/og-home.jpg"
    },
    {
      "@type": "WebSite",
      "url": "https://atelier-furniture.com/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://atelier-furniture.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
}
```

**Project Detail pages — Product schema:**

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "[Project Name]",
  "description": "[Project description]",
  "image": "https://atelier-furniture.com/projects/[slug]/hero.jpg",
  "brand": {
    "@type": "Brand",
    "name": "Atelier Custom Furniture"
  },
  "category": "[Category: Dining Tables / Cabinets / etc.]",
  "material": "[Wood type / Material]"
}
```

**Services page — Service schema** with nested `Service` entries for each service offering (custom design, restoration, consultation).

#### 4.5.3 Semantic HTML

All markup follows semantic HTML5 standards:

- `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` used appropriately
- Heading hierarchy: exactly one `<h1>` per page, `<h2>` for major sections, `<h3>` for subsections — strictly nested without skips
- `<figure>` and `<figcaption>` for all project images with contextual captions
- ARIA landmarks: `role="banner"`, `role="navigation"`, `role="main"`, `role="contentinfo"` where native elements are insufficient
- ARIA labels on interactive elements: icon-only buttons (`aria-label="Close menu"`), form inputs with associated `<label>` elements via `for` attribute
- Skip-to-content link as first focusable element: `<a href="#main-content" class="sr-only focus:not-sr-only">Skip to main content</a>`
- Color contrast: all text meets WCAG AA (4.5:1 for normal text, 3:1 for large text) and AAA (7:1) where possible with the primary text color `#1a1a1a` on surface `#fafaf8` yielding a 16.8:1 ratio

#### 4.5.4 Sitemap and robots.txt

The `sitemap.xml` is auto-generated at build time via a script (`scripts/generate-sitemap.ts`) that:

1. Reads all route files from `src/routes/`
2. Extracts dynamic entries from data files (`projects.ts`)
3. Generates a `sitemap.xml` with `<loc>`, `<lastmod>`, `<changefreq>`, and `<priority>` entries
4. Writes the file to `static/sitemap.xml` before the build completes

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://atelier-furniture.com/</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://atelier-furniture.com/projects/walnut-dining-table/</loc>
    <lastmod>2024-12-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- ... additional entries ... -->
</urlset>
```

The `robots.txt` file allows all crawlers and references the sitemap:

```
User-agent: *
Allow: /
Sitemap: https://atelier-furniture.com/sitemap.xml
```

#### 4.5.5 Canonical URLs and hreflang Preparation

Every page includes a canonical URL to prevent duplicate content issues. The canonical is derived from the current route path, ensuring consistent trailing-slash formatting.

For future i18n expansion, the `SeoHead` component is pre-built with an `alternate` links slot:

```svelte
<svelte:head>
  <!-- hreflang preparation — currently outputs nothing until i18n is implemented -->
  {#each languages as lang}
    <link rel="alternate" hreflang={lang} href={`https://atelier-furniture.com/${lang}${$page.url.pathname}`} />
  {/each}
  <link rel="alternate" hreflang="x-default" href={`https://atelier-furniture.com${$page.url.pathname}`} />
</svelte:head>
```

The `languages` array is currently empty (`[]`). When i18n is activated, adding language codes (`en`, `ru`) will automatically generate the full set of `hreflang` annotations. The directory structure (`routes/en/`, `routes/ru/`) and content sourcing from data files (rather than hardcoded strings) are designed to accommodate this transition with minimal refactoring.

---

### 4.6 Deployment & Hosting

#### 4.6.1 Recommended Hosting: Comparison

Three hosting platforms are evaluated for deployment. All three support static site hosting with global CDN, custom domains, and SSL.

| Feature | Vercel | Netlify | Cloudflare Pages |
|---|---|---|---|
| **Free tier bandwidth** | 100 GB/month | 100 GB/month | Unlimited |
| **Build time (free)** | 6,000 min/month | 300 min/month | 500 builds/month |
| **Edge network** | 100+ locations | 100+ locations | 300+ locations |
| **Deploy from Git** | Native (GitHub/GitLab/Bitbucket) | Native (GitHub/GitLab) | Native (GitHub/GitLab) |
| **Preview deployments** | Per-PR, per-branch | Per-PR, per-branch | Per-PR |
| **Analytics (built-in)** | Web Analytics ($0, privacy-friendly) | Analytics ($9/mo) | Privacy-friendly, basic |
| **Image optimization** | Edge-optimized images | Netlify Image CDN | Cloudflare Images (separate) |
| **Build caching** | Aggressive (Turbo) | Yes | Yes |
| **Custom headers** | `vercel.json` | `_headers` | `_headers` |
| **Redirect config** | `vercel.json` | `_redirects` | `_redirects` |
| **Price (pro tier)** | $20/mo | $19/mo | $5/mo |
| **SvelteKit integration** | First-class (Vercel sponsors Svelte) | Excellent | Good |

**Recommendation: Vercel**

Vercel is the recommended platform for the following reasons:

1. **SvelteKit sponsorship**: Vercel sponsors the Svelte open-source project, ensuring first-class adapter support and rapid bug resolution.
2. **Edge network performance**: sub-50ms TTFB for cached content across all major regions (tested via WebPageTest).
3. **Preview deployments**: every pull request generates a unique preview URL, enabling design review before merging.
4. **Build caching**: Vercel's Turbo build system caches dependencies and intermediate build artifacts, reducing build times from ~2 minutes to ~30 seconds on subsequent builds.
5. **Analytics**: built-in Web Analytics uses no client-side cookies (privacy-friendly) and tracks real user Core Web Vitals data at no additional cost.

Netlify is a viable alternative with near-identical feature parity. Cloudflare Pages offers the most aggressive free tier (unlimited bandwidth) but has slightly less mature SvelteKit integration.

#### 4.6.2 CDN Strategy

All static assets are served through the hosting platform's integrated CDN with the following configuration:

- **Asset optimization**: automatic Brotli and Gzip compression enabled for all text-based assets (HTML, CSS, JS, SVG)
- **Edge caching**: static assets cached for 1 year (`max-age=31536000`) due to content-hashed filenames; HTML pages cached for 60 seconds with stale-while-revalidate
- **Video delivery**: video files are hosted on Bunny.net Stream or Cloudflare Stream (separate from the web host) to avoid bandwidth charges on the primary host. These platforms provide dedicated video CDN with adaptive bitrate and global edge caching optimized for large media files.
- **Font delivery**: self-hosted fonts served from the same origin with `Cache-Control: public, max-age=31536000` to leverage HTTP/2 multiplexing and avoid additional DNS lookups from third-party font CDNs

#### 4.6.3 Custom Domain and SSL

- **Domain**: the client provides a custom domain (e.g., `atelier-furniture.com`). Vercel handles DNS configuration via CNAME or A record pointing.
- **SSL**: automatic SSL certificate provisioning via Let's Encrypt. Certificates renew automatically every 90 days. HTTPS is enforced — all HTTP requests redirect to HTTPS with a 301 status.
- **WWW redirect**: the `www` subdomain redirects to the apex domain (or vice versa, per client preference) to consolidate SEO authority on a single canonical domain.

#### 4.6.4 Build Pipeline: CI/CD via GitHub Actions

The continuous deployment pipeline is managed through GitHub integration with the hosting platform:

1. **Developer pushes** code to a feature branch on GitHub
2. **Vercel/Netlify** detects the push and builds a preview deployment
3. **Pull request** is opened; the preview URL is posted as a PR comment for visual review
4. **Code review** and approval; PR is merged to `main`
5. **Production build** triggers automatically on merge to `main`
6. **Build steps**: `pnpm install` → `pnpm run build` (SvelteKit static build) → `pnpm run check` (TypeScript + Svelte type-checking) → deploy
7. **Post-deploy**: Lighthouse CI runs automated performance audits; results posted to PR comments

The `package.json` scripts for the pipeline:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
    "lint": "eslint src --ext .ts,.svelte",
    "format": "prettier --write \"src/**/*.{ts,svelte,css}\"",
    "generate-sitemap": "tsx scripts/generate-sitemap.ts"
  }
}
```

Build duration target: under 90 seconds for a clean build, under 30 seconds with cached dependencies. The static output size target is under 25MB total (excluding externally hosted videos), ensuring fast deployments and efficient CDN caching.


---

# 5. Page Specifications

This chapter defines the complete page-by-page specifications for every screen in the Custom Furniture website. Each section details the layout structure, content elements, interactive behaviors, animation triggers, and responsive adaptations. All specifications reference the design system defined in Chapter 4: background `#0A0A0F`, primary text `#F5F0EB`, accent `#C9A96E`, heading font Cormorant Garamond, body font Inter, 12-column grid with 1440px max-width, and standard easing `cubic-bezier(0.4, 0, 0.2, 1)`.

---

## 5.1 Home Page

The Home page is a single-scroll experience composed of seven distinct sections plus the global footer. Each section occupies a distinct viewport or content band and transitions seamlessly via scroll-triggered animations. The page has no sidebar navigation, no breadcrumbs, and no sub-menus. The total scroll length is approximately 7–8 viewport heights on desktop.

### 5.1.1 Hero Section

The hero section is a fullscreen (`100vh`) immersive entry point. It contains a cinematic autoplay video background, a centered headline group, and a primary CTA button. There is no scroll indicator arrow, no downward bounce animation, and no gradient overlay on the video.

**Video Background**

| Parameter | Value |
|---|---|
| Source | 10–15s cinematic loop of furniture craftsmanship |
| Autoplay | `true` |
| Muted | `true` |
| Loop | `true` |
| Playsinline | `true` |
| Object-fit | `cover` |
| Object-position | center center |
| Z-index | 0 (behind all content) |

The video container is `position: absolute; inset: 0; overflow: hidden;`. A subtle dark overlay at `rgba(10, 10, 15, 0.35)` sits above the video at z-index 1 to ensure text legibility without obscuring the footage. No pattern overlay, no vignette effect, and no radial gradient are applied.

**Headline Group**

| Element | Specification |
|---|---|
| Position | Centered horizontally and vertically within viewport |
| Z-index | 10 |
| Headline font | Cormorant Garamond, 64px desktop / 36px mobile, weight 400 |
| Headline color | `#F5F0EB` |
| Headline max-width | 700px |
| Headline text | "Handcrafted Furniture, Designed for Your Space" |
| Subheadline font | Inter, 16px desktop / 14px mobile, weight 300 |
| Subheadline color | `rgba(245, 240, 235, 0.7)` |
| Subheadline max-width | 520px |
| Subheadline text | "Custom wardrobes, kitchens, and interiors. Built in Dublin, delivered across Ireland." |
| Line-height (headline) | 1.15 |
| Line-height (subheadline) | 1.6 |
| Letter-spacing (headline) | -0.01em |
| Gap between headline and subheadline | 24px |
| Gap between subheadline and CTA | 40px |

**CTA Button**

| Parameter | Value |
|---|---|
| Label | "Discuss a Project" |
| Background | `#C9A96E` |
| Text color | `#0A0A0F` |
| Padding | 16px 36px |
| Border-radius | 0px (sharp corners) |
| Font | Inter, 14px, weight 500, uppercase, letter-spacing 0.08em |
| Hover state | Background transitions to `#B8975E`, 250ms ease |
| Active state | Scale 0.97, 100ms ease |
| Action | Opens fullscreen "Discuss a Project" modal (see Chapter 7) |

**Entrance Animation**

The hero section loads immediately with the video playing. The headline group fades in with a staggered sequence: headline appears at `opacity: 0 → 1`, `translateY(30px) → 0`, duration 800ms, delay 400ms. Subheadline follows at delay 600ms. CTA button follows at delay 800ms. All use the standard easing curve. No parallax effect on the hero video.

**Responsive Behavior**

On mobile (`< 768px`), the headline drops to 36px, subheadline to 14px, and CTA button takes full width minus 48px padding (`width: calc(100% - 48px)`). The video source may switch to a mobile-optimized version (portrait crop, lower bitrate) via `<source media>` if provided.

---

### 5.1.2 Brand Introduction

The brand introduction section is a 2-column layout with text on the left and an atmospheric image on the right. It sits immediately below the hero fold. Background is solid `#0A0A0F`. Padding: 120px top/bottom desktop, 80px mobile.

**Layout Grid**

| Breakpoint | Text Column | Image Column | Gap |
|---|---|---|---|
| Desktop (≥1024px) | Columns 1–5 (5/12) | Columns 7–12 (6/12) | Column 6 as 1-col gutter |
| Tablet (768–1023px) | Columns 1–6 (6/12) | Columns 7–12 (6/12) | No gutter column |
| Mobile (<768px) | Full width, stacked first | Full width, stacked second | 40px vertical gap |

**Text Column Content**

| Element | Specification |
|---|---|
| Eyebrow label | "ABOUT US" — Inter 11px, weight 500, uppercase, letter-spacing 0.15em, color `#C9A96E` |
| Headline | "Where Craft Meets Design" — Cormorant Garamond 40px desktop / 28px mobile, weight 400, color `#F5F0EB`, line-height 1.2 |
| Body text | "We design and build custom furniture that transforms how you live. Every piece is handcrafted in our Dublin workshop using premium materials and joinery techniques refined over generations." — Inter 15px, weight 300, color `rgba(245, 240, 235, 0.65)`, line-height 1.7, max 3 lines |
| CTA link | "Learn Our Story →" — Inter 13px, weight 400, color `#C9A96E`, hover underline, links to `/about` |

**Image Column**

| Parameter | Value |
|---|---|
| Aspect ratio | 4:3 (desktop), 16:9 (mobile) |
| Object-fit | cover |
| Border-radius | 0px |
| Image content | Atmospheric workshop interior — warm lighting, wood textures, tools |
| Alt text | "Custom furniture workshop interior in Dublin" |

**Entrance Animation**: The eyebrow and headline slide in from `translateX(-40px)` with `opacity: 0 → 1`, duration 700ms. The body text follows at +150ms delay. The image slides in from `translateX(40px)` with the same timing. ScrollTrigger: `start: "top 75%"`, `toggleActions: "play none none none"`.

---

### 5.1.3 Services Preview

This section presents three service cards in a horizontal row with hover reveal interactions. Background: `#0A0A0F`. Padding: 120px top/bottom desktop. A thin 1px horizontal rule in `rgba(201, 169, 110, 0.15)` separates this section from the brand introduction above.

**Section Header**

| Element | Specification |
|---|---|
| Eyebrow | "WHAT WE DO" — same style as 5.1.2 eyebrow |
| Headline | "Bespoke Services" — Cormorant Garamond 40px, weight 400, color `#F5F0EB` |
| Alignment | Left-aligned, columns 1–6 |

**Service Cards Grid**

| Breakpoint | Layout |
|---|---|
| Desktop (≥1024px) | 3-column grid, equal width, 24px gap |
| Tablet (768–1023px) | 3-column grid, 16px gap |
| Mobile (<768px) | Single column stack, 24px gap |

**Individual Card Specifications**

| Parameter | Value |
|---|---|
| Background | `rgba(245, 240, 235, 0.03)` |
| Border | 1px solid `rgba(245, 240, 235, 0.08)` |
| Padding | 48px 36px |
| Border-radius | 0px |
| Icon size | 40×40px, stroke style, color `#C9A96E` |
| Icon margin-bottom | 32px |
| Title font | Cormorant Garamond 24px, weight 400, color `#F5F0EB` |
| Title margin-bottom | 16px |
| Description font | Inter 14px, weight 300, color `rgba(245, 240, 235, 0.6)`, line-height 1.6 |
| Description max | 3 lines |
| Hover border color | `rgba(201, 169, 110, 0.35)` |
| Hover background | `rgba(245, 240, 235, 0.05)` |
| Hover transition | 300ms ease all properties |

**Card Content**

| Card | Icon | Title | Description | Link |
|---|---|---|---|---|
| 1 | Wardrobe icon | "Residential Interiors" | "Custom wardrobes, walk-in closets, kitchens, and living spaces designed around your daily routines." | `/services#residential` |
| 2 | Building icon | "Commercial Spaces" | "Bespoke office fit-outs, retail interiors, and hospitality furniture that elevates your brand." | `/services#commercial` |
| 3 | Tree/wood icon | "Materials & Craft" | "Solid hardwoods, premium veneers, and hand-selected finishes. Built to last generations." | `/services#materials` |

Each card is fully clickable (entire card surface) and links to the relevant services page anchor. The cursor becomes `pointer` on hover.

**Entrance Animation**: Cards stagger in from `translateY(50px)`, `opacity: 0 → 1`, stagger 150ms per card, duration 700ms, ScrollTrigger `start: "top 75%"`.

---

### 5.1.4 Featured Projects

A curated showcase of three featured projects. Background: `#0A0A0F`. Padding: 120px top/bottom. Separated from services by a 1px rule in `rgba(201, 169, 110, 0.15)`.

**Section Header**

| Element | Specification |
|---|---|
| Eyebrow | "SELECTED WORK" — standard eyebrow style |
| Headline | "Featured Projects" — Cormorant Garamond 40px, color `#F5F0EB` |
| CTA link (right-aligned) | "View All Projects →" — Inter 13px, color `#C9A96E`, links to `/projects` |

**Projects Grid**

| Breakpoint | Layout |
|---|---|
| Desktop (≥1024px) | 3-column grid, 24px gap |
| Tablet (768–1023px) | 2-column grid (3rd spans full), 20px gap |
| Mobile (<768px) | Single column, 24px gap |

**Project Card Specifications**

| Parameter | Value |
|---|---|
| Aspect ratio | 4:5 (portrait) |
| Border-radius | 0px |
| Overflow | hidden |
| Image object-fit | cover |
| Image hover scale | `scale(1.05)` over 500ms ease |
| Overlay (default) | none |
| Overlay (hover) | Linear gradient from bottom `rgba(10, 10, 15, 0.85)` to transparent at 60% height |
| Content position | Bottom-left, padding 28px |
| Title font | Cormorant Garamond 22px, weight 400, color `#F5F0EB` |
| Meta font | Inter 12px, weight 300, color `rgba(245, 240, 235, 0.55)`, uppercase, letter-spacing 0.06em |
| Meta format | "{CATEGORY} — {LOCATION}" |

**Featured Projects Content**

| # | Title | Category | Location | Image |
|---|---|---|---|---|
| 1 | "Penthouse Wardrobe Suite" | Residential | Dublin 4 | Walk-in closet with floor-to-ceiling walnut storage |
| 2 | "The Shelbourne Fittings" | Commercial | Dublin 2 | Luxury hotel lobby and lounge furniture |
| 3 | "Blackrock Kitchen" | Residential | Blackrock, Co. Dublin | Bespoke handleless kitchen in matte charcoal |

On hover, the title and meta text fade in from `translateY(10px)`, `opacity: 0 → 1`, duration 300ms. On mobile, this content is always visible (no hover-dependent reveal).

**Entrance Animation**: Cards stagger in from `translateY(60px)`, `opacity: 0 → 1`, stagger 200ms, duration 800ms, ScrollTrigger `start: "top 72%"`.

---

### 5.1.5 Process Overview

A 4-step visual timeline illustrating the client journey. Background: `#0A0A0F`. Padding: 120px top/bottom. Separated by standard 1px rule.

**Section Header**

| Element | Specification |
|---|---|
| Eyebrow | "HOW WE WORK" |
| Headline | "From Concept to Completion" — Cormorant Garamond 40px |

**Process Steps Layout**

| Breakpoint | Layout |
|---|---|
| Desktop (≥1024px) | 4-column horizontal row, equal width, 32px gap |
| Tablet (768–1023px) | 2×2 grid, 24px gap |
| Mobile (<768px) | Single column stack, 40px gap |

**Step Component**

| Parameter | Value |
|---|---|
| Step number | Inter 11px, weight 500, color `#C9A96E`, uppercase, letter-spacing 0.12em, format "STEP 01" |
| Step title | Cormorant Garamond 22px, weight 400, color `#F5F0EB`, margin-top 20px |
| Step description | Inter 14px, weight 300, color `rgba(245, 240, 235, 0.6)`, line-height 1.6, margin-top 12px, max 2 lines |
| Connector line (desktop) | 1px horizontal line in `rgba(201, 169, 110, 0.2)` between steps, 32px long, vertically centered with step number |

**Process Steps Content**

| Step | Title | Description |
|---|---|---|
| 01 | "Consult" | "We visit your space, understand your needs, and discuss materials, timelines, and budget." |
| 02 | "Design" | "Our team creates detailed 3D visualisations and technical drawings for your approval." |
| 03 | "Craft" | "Every piece is built by hand in our Dublin workshop with precision and care." |
| 04 | "Install" | "We deliver and install your furniture, ensuring a perfect fit and finish." |

**Entrance Animation**: Steps stagger in from `translateY(40px)`, `opacity: 0 → 1`, stagger 120ms, duration 700ms. Connector lines animate width from `0 → 100%` over 500ms after all steps are visible. ScrollTrigger `start: "top 75%"`.

---

### 5.1.6 Testimonials Section

A section displaying 2–3 client testimonials. Background: `rgba(245, 240, 235, 0.02)` — a barely perceptible lift from the main background. Padding: 100px top/bottom. No separating rule above (the background shift provides visual separation).

**Section Header**

| Element | Specification |
|---|---|
| Eyebrow | "CLIENT WORDS" |
| Headline | "What They Say" — Cormorant Garamond 36px |

**Testimonials Layout**

| Breakpoint | Layout |
|---|---|
| Desktop (≥1024px) | 3-column grid, 32px gap |
| Tablet (768–1023px) | 1-column stack, centered, max-width 600px |
| Mobile (<768px) | Single column, full width |

**Testimonial Card**

| Parameter | Value |
|---|---|
| Quote marks | Decorative `"` character, Cormorant Garamond 72px, color `rgba(201, 169, 110, 0.25)`, positioned top-left |
| Quote text | Inter 16px, weight 300, italic, color `rgba(245, 240, 235, 0.75)`, line-height 1.7 |
| Client name | Inter 14px, weight 400, color `#F5F0EB`, margin-top 24px |
| Client location | Inter 12px, weight 300, color `rgba(245, 240, 235, 0.45)`, margin-top 4px |

**Testimonial Content**

| # | Quote | Name | Location |
|---|---|---|---|
| 1 | "The attention to detail was extraordinary. Our walk-in closet feels like a luxury hotel suite." | Sarah M. | Dublin 6 |
| 2 | "Professional from start to finish. The kitchen they built is the heart of our home now." | David & Aileen K. | Blackrock |
| 3 | "They understood our brand and delivered a retail interior that our customers constantly compliment." | James T. | Dublin 2 |

**Entrance Animation**: Cards fade in with `translateY(30px)` stagger 150ms, duration 700ms. ScrollTrigger `start: "top 78%"`.

---

### 5.1.7 CTA Section

A full-width banner section with a single clear call-to-action. Background: a subtle texture or gradient from `#0A0A0F` to `#0E0E14`. Padding: 140px top/bottom desktop, 100px mobile. A 1px rule above and below in `rgba(201, 169, 110, 0.12)`.

**Content**

| Element | Specification |
|---|---|
| Headline | "Ready to Transform Your Space?" — Cormorant Garamond 44px desktop / 28px mobile, weight 400, color `#F5F0EB`, centered |
| Subtext | "Let's discuss your project. No obligation, just expert advice." — Inter 15px, weight 300, color `rgba(245, 240, 235, 0.6)`, centered, margin-top 16px |
| CTA button | "Discuss a Project" — same specification as hero CTA, centered, margin-top 40px |
| Action | Opens fullscreen "Discuss a Project" modal |

**Entrance Animation**: Headline fades in from `translateY(30px)`, duration 800ms. Subtext at +200ms delay. Button at +400ms delay. ScrollTrigger `start: "top 70%"`.

---

### 5.1.8 Footer Integration

The global footer (defined in Chapter 4) appears at the bottom of the Home page. It contains the logo, navigation links, contact information, social links, and copyright notice. Background: `#060608`. Padding: 80px top, 40px bottom. The footer is identical across all pages and is not duplicated per-page.

### Home Page Sections Summary

| # | Section | Height | Key Content | Primary CTA | Animation Trigger |
|---|---|---|---|---|---|
| 1 | Hero | `100vh` | Video background, headline, subheadline | "Discuss a Project" modal | Page load |
| 2 | Brand Introduction | Auto (~400px) | 2-col: text + workshop image | "Learn Our Story →" /about | Scroll `top 75%` |
| 3 | Services Preview | Auto (~500px) | 3 service cards with icons | Card links to /services | Scroll `top 75%` |
| 4 | Featured Projects | Auto (~600px) | 3 project cards in grid | "View All Projects →" /projects | Scroll `top 72%` |
| 5 | Process Overview | Auto (~450px) | 4-step visual timeline | None (informational) | Scroll `top 75%` |
| 6 | Testimonials | Auto (~400px) | 3 client quote cards | None (social proof) | Scroll `top 78%` |
| 7 | CTA Banner | Auto (~380px) | Headline + CTA button | "Discuss a Project" modal | Scroll `top 70%` |
| 8 | Footer | Auto (~250px) | Logo, links, contact, copyright | None | None |

---

## 5.2 About Page

The About page is a content-rich page with a page-specific hero followed by four content sections. It uses the same 12-column grid, navigation, and footer as all other pages. The page has no sidebar, no floating widgets, and no scroll progress indicator.

### 5.2.1 Page Hero

The About page hero is a reduced-height atmospheric image section with the page title overlaid. It is NOT a fullscreen video hero — it uses a static high-resolution photograph.

| Parameter | Value |
|---|---|
| Height | `50vh` desktop, `40vh` mobile |
| Background image | Wide-angle workshop photograph — craftspeople at work, warm ambient lighting |
| Object-fit | cover |
| Object-position | center center |
| Dark overlay | `rgba(10, 10, 15, 0.55)` |
| Content position | Bottom-left, padding 0 0 60px 0 (desktop), aligned to grid columns 1–6 |
| Eyebrow | "ABOUT" — standard eyebrow style |
| Headline | "Our Story" — Cormorant Garamond 56px desktop / 32px mobile, weight 400, color `#F5F0EB` |
| Subheadline | "Two decades of craftsmanship, one piece at a time." — Inter 16px, weight 300, color `rgba(245, 240, 235, 0.65)`, max-width 480px |

**Entrance Animation**: Image fades in at `opacity: 0 → 1` over 1000ms. Text content slides up from `translateY(30px)` with stagger 150ms starting at 300ms delay.

---

### 5.2.2 Brand Story

A narrative section with a centered single-column layout. Background: `#0A0A0F`. Padding: 120px top/bottom.

**Layout**: Single column, max-width 720px, centered. On mobile, full width with 24px horizontal padding.

**Content**

| Element | Specification |
|---|---|
| Eyebrow | "THE BEGINNING" |
| Headline | "Built on Passion, Refined Over Time" — Cormorant Garamond 36px, centered |
| Body paragraph 1 | "Founded in Dublin over twenty years ago, we started as a small workshop with a singular belief: that furniture should be made to fit the life it serves. Every joint, every surface, every detail matters." — Inter 15px, weight 300, color `rgba(245, 240, 235, 0.65)`, line-height 1.75 |
| Body paragraph 2 | "Today, we design and build custom interiors for homes and businesses across Ireland. Our process blends traditional joinery with modern design thinking — the result is furniture that feels both timeless and entirely personal." — same typography |
| CTA link | "Explore Our Services →" — Inter 13px, color `#C9A96E`, links to `/services` |

**Entrance Animation**: Content fades in from `translateY(40px)`, duration 800ms, ScrollTrigger `start: "top 72%"`.

---

### 5.2.3 Craftsmanship Section

A 2-column layout highlighting quality standards, materials, and the factory process. Background: `rgba(245, 240, 235, 0.015)`. Padding: 120px top/bottom.

**Layout Grid**

| Breakpoint | Left Column | Right Column | Gap |
|---|---|---|---|
| Desktop (≥1024px) | Columns 1–5 | Columns 7–12 | Column 6 gutter |
| Mobile (<768px) | Full width, stacked | Full width, stacked | 48px gap |

**Left Column — Text**

| Element | Specification |
|---|---|
| Eyebrow | "CRAFTSMANSHIP" |
| Headline | "Quality in Every Detail" — Cormorant Garamond 32px |
| Body | "We use only solid hardwoods — oak, walnut, ash — sourced from sustainable European forests. Every piece is hand-finished in our workshop using traditional techniques: dovetailed drawers, mortise-and-tenon joints, and hand-rubbed oil finishes." — Inter 15px, weight 300, color `rgba(245, 240, 235, 0.65)`, line-height 1.7 |
| Quality badges | 3 inline items: "20+ Years Experience", "Hand-Built in Dublin", "Premium Hardwoods" — Inter 12px, weight 400, color `#C9A96E`, each prefixed with a small checkmark icon, arranged horizontally with 24px gap |

**Right Column — Image**

| Parameter | Value |
|---|---|
| Aspect ratio | 3:4 (portrait) |
| Content | Close-up of hand-cut dovetail joint or wood grain detail |
| Object-fit | cover |

**Entrance Animation**: Left column slides in from `translateX(-40px)`, right from `translateX(40px)`, both 800ms, ScrollTrigger `start: "top 75%"`.

---

### 5.2.4 Team Section

A section introducing key team members. Background: `#0A0A0F`. Padding: 120px top/bottom.

**Section Header**

| Element | Specification |
|---|---|
| Eyebrow | "THE TEAM" |
| Headline | "Meet the Makers" — Cormorant Garamond 36px |

**Team Grid**

| Breakpoint | Layout |
|---|---|
| Desktop (≥1024px) | 4-column grid, 24px gap |
| Tablet (768–1023px) | 2-column grid, 20px gap |
| Mobile (<768px) | 2-column grid, 16px gap |

**Team Member Card**

| Parameter | Value |
|---|---|
| Photo | 1:1 square aspect ratio, object-fit cover, grayscale filter default |
| Photo hover | Grayscale removes over 400ms, subtle `scale(1.03)` |
| Name | Inter 16px, weight 400, color `#F5F0EB`, margin-top 16px |
| Role | Inter 13px, weight 300, color `#C9A96E`, margin-top 4px |
| Card padding-bottom | 32px |

**Team Members**

| Name | Role | Photo Description |
|---|---|---|
| [Name] | Founder & Lead Designer | Portrait in workshop, natural light |
| [Name] | Workshop Manager | Portrait with woodworking tools |
| [Name] | Senior Craftsman | Portrait at workbench |
| [Name] | Design Consultant | Portrait in showroom |

Names are placeholders to be provided by the client. Each photo should be professionally shot, warm lighting, shallow depth of field.

**Entrance Animation**: Cards stagger in from `translateY(40px)`, stagger 100ms, duration 700ms, ScrollTrigger `start: "top 78%"`.

---

### 5.2.5 Why Us

A differentiators section with a grid of icon+text items. Background: `rgba(245, 240, 235, 0.015)`. Padding: 100px top/bottom.

**Section Header**

| Element | Specification |
|---|---|
| Headline | "Why Choose Us" — Cormorant Garamond 36px, centered |

**Differentiators Grid**

| Breakpoint | Layout |
|---|---|
| Desktop (≥1024px) | 3-column × 2-row grid, 32px gap |
| Tablet (768–1023px) | 2-column × 3-row, 24px gap |
| Mobile (<768px) | 2-column × 3-row, 16px gap |

**Differentiator Item**

| Parameter | Value |
|---|---|
| Icon | 32×32px, line style, color `#C9A96E` |
| Title | Inter 15px, weight 400, color `#F5F0EB`, margin-top 16px |
| Description | Inter 13px, weight 300, color `rgba(245, 240, 235, 0.55)`, margin-top 8px, max 2 lines |

**Differentiators Content**

| Icon | Title | Description |
|---|---|---|
| Ruler/compass | "Bespoke Design" | "Every piece is designed specifically for your space and requirements." |
| Tree | "Sustainable Materials" | "European hardwoods from certified sustainable forests." |
| Hand/tools | "Handcrafted" | "Built by skilled craftsmen in our Dublin workshop." |
| Clock | "On-Time Delivery" | "Clear timelines and reliable installation scheduling." |
| Shield | "Lifetime Quality" | "Built to last with premium hardware and joinery." |
| Chat | "Personal Service" | "Direct communication with your designer throughout." |

**Entrance Animation**: Items stagger in from `translateY(30px)`, stagger 80ms, duration 600ms, ScrollTrigger `start: "top 78%"`.

### About Page Sections Summary

| # | Section | Layout | Key Content | CTA |
|---|---|---|---|---|
| 1 | Page Hero | `50vh` image + overlay | Page title, tagline | None |
| 2 | Brand Story | Single column centered | Founding narrative, mission | "Explore Our Services →" |
| 3 | Craftsmanship | 2-column text + image | Quality standards, materials | None |
| 4 | Team | 4-column grid | Team member photos + roles | None |
| 5 | Why Us | 3×2 icon grid | 6 differentiators | None |

---

## 5.3 Services Page

The Services page is the most content-dense page, providing detailed breakdowns of residential and commercial offerings, the process, and available materials. It uses anchor navigation for sub-sections and features a mix of full-width and 2-column layouts.

### 5.3.1 Services Overview

A page hero section with introductory text and a key visual. This replaces the standard page hero pattern with a more content-forward design.

| Parameter | Value |
|---|---|
| Background | `#0A0A0F` |
| Top padding | 160px (accounting for fixed nav) |
| Bottom padding | 80px |
| Layout | 2-column: text left (columns 1–5), image right (columns 7–12) |

**Text Content**

| Element | Specification |
|---|---|
| Eyebrow | "OUR SERVICES" |
| Headline | "Bespoke Furniture, Tailored to You" — Cormorant Garamond 44px desktop / 30px mobile |
| Body | "From individual wardrobes to full interior fit-outs, we design and build custom furniture that transforms residential and commercial spaces across Ireland." — Inter 16px, weight 300, color `rgba(245, 240, 235, 0.65)`, line-height 1.7 |
| CTA | "Discuss Your Project →" — opens modal |

**Right Image**

| Parameter | Value |
|---|---|
| Content | Collage or single atmospheric image of completed interiors |
| Aspect ratio | 16:10 |
| Object-fit | cover |

**Entrance Animation**: Text slides from `translateX(-40px)`, image from `translateX(40px)`, both 800ms, triggered on page load (no scroll needed for hero).

---

### 5.3.2 Residential Services

A detailed section for residential offerings. Background: `#0A0A0F`. Padding: 100px top/bottom. Anchored with `id="residential"`.

**Section Header**

| Element | Specification |
|---|---|
| Eyebrow | "RESIDENTIAL" |
| Headline | "For Your Home" — Cormorant Garamond 36px |
| Intro text | "We create custom furniture that turns your home into a space that works perfectly for how you live." — Inter 15px, weight 300, color `rgba(245, 240, 235, 0.6)` |

**Service Items Layout**: Stacked full-width items, each separated by a 1px rule in `rgba(245, 240, 235, 0.06)`. Each item uses a 2-column layout: text left (columns 1–5), image right (columns 7–12). On mobile, stacked text-first. Vertical padding per item: 80px.

**Residential Service Item Specifications**

| Parameter | Value |
|---|---|
| Service name | Cormorant Garamond 28px, weight 400, color `#F5F0EB` |
| Description | Inter 15px, weight 300, color `rgba(245, 240, 235, 0.6)`, line-height 1.7, max 3 lines |
| Feature list | Bulleted list, Inter 14px, weight 300, color `rgba(245, 240, 235, 0.55)`, line-height 1.8. Bullet: 4px circle in `#C9A96E` |
| Image | 16:10 aspect ratio, object-fit cover |
| CTA | "Learn More →" — Inter 13px, color `#C9A96E` (non-linked, indicates future expansion) |

**Residential Services Content**

| Service | Description | Features | Image |
|---|---|---|---|
| Custom Wardrobes | "Fitted wardrobes designed around your clothing, your habits, and your space. Floor-to-ceiling storage that looks built-in because it is." | • Sliding or hinged doors, Interior layout customisation, Soft-close drawers and fittings, LED lighting integration | Completed wardrobe interior with warm lighting |
| Bespoke Kitchens | "Handleless, traditional, or contemporary — kitchens built around how you cook, entertain, and live. Every cabinet, every surface, considered." | • Solid hardwood cabinet carcasses, Stone or timber worktops, Integrated appliance housing, Under-cabinet lighting | Luxury kitchen with island and pendant lights |
| Walk-In Closets | "A private dressing space designed to feel like a boutique. Custom hanging, shelving, shoe storage, and integrated lighting." | • Island storage with jewellery drawers, Full-height mirror integration, Seating area design, Automated lighting | Spacious walk-in closet with central island |
| Living Spaces | "Media units, bookshelves, window seats, and alcove cabinets. Furniture that fills awkward spaces beautifully." | • Alcove and bay window fittings, TV and media integration, Hidden cable management, Bespoke shelving | Living room with built-in media wall |

**Entrance Animation**: Each service item animates independently on scroll. Text slides from `translateX(-40px)`, image from `translateX(40px)`, duration 800ms, ScrollTrigger `start: "top 75%"`.

---

### 5.3.3 Commercial Services

Identical structure to residential services but for commercial offerings. Background: `rgba(245, 240, 235, 0.015)`. Padding: 100px top/bottom. Anchored with `id="commercial"`.

**Section Header**

| Element | Specification |
|---|---|
| Eyebrow | "COMMERCIAL" |
| Headline | "For Your Business" — Cormorant Garamond 36px |
| Intro text | "Bespoke interiors that strengthen your brand and improve how your space works for employees and customers." — Inter 15px, weight 300 |

**Commercial Services Content**

| Service | Description | Features | Image |
|---|---|---|---|
| Office Fit-Outs | "Workspaces designed for productivity and brand identity. From reception desks to boardrooms and breakout areas." | • Reception and waiting area design, Meeting room furniture, Breakout and kitchen spaces, Cable management and tech integration | Modern office reception with timber accents |
| Retail Interiors | "Display units, shelving, and counter systems that showcase your products and guide customer flow." | • Custom display shelving, Counter and till units, Fitting room construction, Brand-aligned material choices | Boutique retail interior with timber shelving |
| Hospitality | "Hotels, restaurants, and bars — furniture that creates atmosphere and stands up to daily use." | • Bar and counter construction, Banquette and booth seating, Hotel room wardrobes and desks, Durable commercial-grade finishes | Hotel lobby with bespoke timber reception |
| Custom Solutions | "Have something unique in mind? We thrive on unusual briefs and one-off commissions." | • Bespoke one-off pieces, Unusual material combinations, Structural furniture design, Collaborative design process | Close-up of unique custom furniture piece |

**Entrance Animation**: Same as residential — alternating slide-in per item, ScrollTrigger `start: "top 75%"`.

---

### 5.3.4 Process Explanation

A detailed step-by-step process section with icons and descriptions. Background: `#0A0A0F`. Padding: 120px top/bottom.

**Section Header**

| Element | Specification |
|---|---|
| Eyebrow | "OUR PROCESS" |
| Headline | "How We Bring Your Vision to Life" — Cormorant Garamond 36px |
| Intro text | "A proven four-step process that takes your project from first conversation to final installation." — Inter 15px, weight 300 |

**Process Steps Layout**: Full-width vertical stack, each step in a 2-column layout (number+title left, description right). Separated by 1px rules. Each step: 80px vertical padding.

**Process Step Specifications**

| Parameter | Value |
|---|---|
| Step number | Cormorant Garamond 48px, weight 300, color `rgba(201, 169, 110, 0.3)` |
| Step title | Cormorant Garamond 24px, weight 400, color `#F5F0EB`, margin-top 8px |
| Step description | Inter 15px, weight 300, color `rgba(245, 240, 235, 0.6)`, line-height 1.7 |
| Icon (right column) | 64×64px line illustration, color `#C9A96E`, opacity 0.7 |

**Process Steps Content**

| # | Title | Description | Icon |
|---|---|---|---|
| 01 | "Initial Consultation" | "We visit your home or business to understand your space, your needs, and your vision. We discuss materials, timelines, and budget to establish a clear project brief." | Chat/consultation icon |
| 02 | "Design & Visualisation" | "Our designers create detailed technical drawings and 3D visualisations so you can see exactly how your furniture will look and function before we begin building." | Design/drawing icon |
| 03 | "Crafting & Construction" | "Every piece is built by hand in our Dublin workshop. We use traditional joinery techniques combined with precision machinery for flawless results." | Woodworking icon |
| 04 | "Delivery & Installation" | "Our team delivers and installs your furniture with care and precision. We ensure everything is perfect before we consider the project complete." | Installation/delivery icon |

**Entrance Animation**: Each step fades in from `translateY(30px)`, stagger 100ms as they enter viewport, duration 700ms, ScrollTrigger `start: "top 78%"` per item.

---

### 5.3.5 Materials & Finishes

A visual overview of available materials and finishes. Background: `rgba(245, 240, 235, 0.015)`. Padding: 120px top/bottom.

**Section Header**

| Element | Specification |
|---|---|
| Eyebrow | "MATERIALS" |
| Headline | "Only the Finest Materials" — Cormorant Garamond 36px |
| Intro text | "We work with premium hardwoods and high-quality finishes to ensure every piece looks exceptional and lasts a lifetime." — Inter 15px, weight 300 |

**Materials Grid**

| Breakpoint | Layout |
|---|---|
| Desktop (≥1024px) | 4-column grid, 20px gap |
| Tablet (768–1023px) | 2-column grid, 16px gap |
| Mobile (<768px) | 2-column grid, 12px gap |

**Material Card**

| Parameter | Value |
|---|---|
| Image | Square 1:1, object-fit cover, showing wood grain/material sample |
| Material name | Inter 15px, weight 400, color `#F5F0EB`, margin-top 16px |
| Description | Inter 13px, weight 300, color `rgba(245, 240, 235, 0.5)`, margin-top 6px |
| Hover | Image `scale(1.04)` over 400ms, name color shifts to `#C9A96E` |

**Materials Content**

| Material | Description | Image |
|---|---|---|
| European Oak | "Durable, distinctive grain, warm tone" | Close-up oak grain |
| American Walnut | "Rich, dark, luxurious appearance" | Close-up walnut grain |
| White Ash | "Light, contemporary, clean look" | Close-up ash grain |
| Painted Finishes | "Any colour, hand-finished perfection" | Painted cabinet surface |
| Veneer Options | "Premium wood veneers for large surfaces" | Veneered panel detail |
| Hardware | "Soft-close hinges, premium handles" | Brass handle detail |

**Entrance Animation**: Cards stagger in from `translateY(30px)`, stagger 80ms, duration 600ms, ScrollTrigger `start: "top 80%"`.

### Services Page Sections Summary

| # | Section | Layout | Anchor | Key Content |
|---|---|---|---|---|
| 1 | Services Overview | 2-column hero | — | Intro headline + atmospheric image |
| 2 | Residential Services | Stacked 2-col items | `#residential` | 4 service types with features |
| 3 | Commercial Services | Stacked 2-col items | `#commercial` | 4 service types with features |
| 4 | Process Explanation | Vertical step list | — | 4 steps with icons |
| 5 | Materials & Finishes | 4-column material grid | `#materials` | 6 material types with samples |

---

## 5.4 Projects Page

The Projects page presents a filterable grid of all completed projects. It is a browse-and-discover experience with category filtering, animated transitions, and clear pathways into individual case studies.

### 5.4.1 Page Layout

The Projects page opens with a minimal hero and transitions immediately into the filterable grid. Background throughout: `#0A0A0F`.

**Page Hero**

| Parameter | Value |
|---|---|
| Height | Auto, 120px top padding (after nav), 60px bottom padding |
| Eyebrow | "PORTFOLIO" |
| Headline | "Our Projects" — Cormorant Garamond 44px desktop / 30px mobile |
| Subheadline | "A selection of our recent residential and commercial work across Ireland." — Inter 15px, weight 300, color `rgba(245, 240, 235, 0.6)` |

**Filter Tabs**

Positioned directly below the hero, sticky at `top: 72px` (below fixed nav) once scrolled past. Background transitions to `rgba(10, 10, 15, 0.95)` with `backdrop-filter: blur(12px)` when sticky.

| Parameter | Value |
|---|---|
| Tab font | Inter 13px, weight 400, uppercase, letter-spacing 0.08em |
| Tab color (inactive) | `rgba(245, 240, 235, 0.45)` |
| Tab color (active) | `#0A0A0F` on `#C9A96E` background |
| Tab padding | 10px 24px |
| Tab border-radius | 0px |
| Active tab background | `#C9A96E` |
| Tab gap | 8px |
| Tab container padding | 16px 0 |

**Filter Categories**

| Tab Label | Filter Value | Count Display |
|---|---|---|
| "All" | `all` | Shows total project count |
| "Residential" | `residential` | Shows residential count |
| "Commercial" | `commercial` | Shows commercial count |

The count is displayed as a small superscript number next to the label, Inter 10px, color `rgba(245, 240, 235, 0.35)` for inactive tabs.

---

### 5.4.2 Project Card Design

Each project is presented as a card in the grid below the filter tabs.

**Projects Grid**

| Breakpoint | Layout |
|---|---|
| Desktop (≥1200px) | 3-column grid, 24px gap |
| Tablet (768–1199px) | 2-column grid, 20px gap |
| Mobile (<768px) | 2-column grid, 12px gap |

**Project Card Specifications**

| Parameter | Value |
|---|---|
| Aspect ratio | 4:5 (portrait) |
| Border-radius | 0px |
| Overflow | hidden |
| Background (while loading) | `rgba(245, 240, 235, 0.03)` |
| Image object-fit | cover |
| Image hover scale | `scale(1.06)` over 600ms ease |

**Card Content Overlay**

| Parameter | Value |
|---|---|
| Position | Absolute, bottom 0, full width |
| Background | Linear gradient from `transparent` at top to `rgba(10, 10, 15, 0.88)` at bottom |
| Padding | 28px 24px |
| Title font | Cormorant Garamond 20px, weight 400, color `#F5F0EB` |
| Meta font | Inter 12px, weight 300, color `rgba(245, 240, 235, 0.5)`, uppercase, letter-spacing 0.05em |
| Meta format | "{CATEGORY} · {LOCATION}" |

**Hover State**

On hover, the entire card receives a subtle brightness increase: `filter: brightness(1.05)` over 300ms. The title text shifts color to `#C9A96E` over 250ms. The image scales as specified above. On mobile, these hover effects are disabled — the content is always visible.

**Card Click Behavior**: Clicking a project card navigates to the Project Detail page at `/projects/{slug}`. The cursor is `pointer` on the entire card surface.

---

### 5.4.3 Filtering Interaction

When a filter tab is clicked, the grid updates with smooth animated transitions.

**Animation Specification**

| Parameter | Value |
|---|---|
| Exit animation | Cards not matching filter: `opacity: 1 → 0`, `scale: 1 → 0.95`, duration 300ms |
| Layout shift | GSAP Flip plugin or CSS grid transition for repositioning |
| Enter animation | Matching cards: `opacity: 0 → 1`, `scale: 0.95 → 1`, `translateY(20px) → 0`, duration 400ms, stagger 50ms |
| Easing | Standard easing `cubic-bezier(0.4, 0, 0.2, 1)` |
| Scroll behavior | Grid container scrolls to top with `scrollIntoView({ behavior: 'smooth', block: 'start' })` if scrolled past first row |

**Active State Management**: The active filter tab receives the gold background immediately on click (no delay). The URL updates to `?filter={category}` without page reload, enabling shareable filtered views. On page load with a filter param, the corresponding tab is pre-selected.

---

### 5.4.4 Load More / Pagination Strategy

The projects grid uses a "Load More" button rather than traditional pagination or infinite scroll.

| Parameter | Value |
|---|---|
| Initial load | 9 projects (3 rows of 3 on desktop) |
| Load more increment | 6 projects per click |
| Maximum | All projects loaded (no hard cap) |
| Button text | "Load More Projects" — Inter 13px, weight 400, uppercase, letter-spacing 0.06em |
| Button style | Border 1px solid `rgba(201, 169, 110, 0.4)`, background transparent, color `#C9A96E`, padding 14px 40px, border-radius 0px |
| Button hover | Background `#C9A96E`, color `#0A0A0F`, transition 250ms |
| Button position | Centered below grid, 48px margin-top |
| Button state (all loaded) | Hidden with `display: none` |
| Button state (loading) | Text changes to "Loading...", opacity 0.6, pointer-events none |

**Loading Behavior**: When "Load More" is clicked, new project cards animate in with the same stagger pattern as the initial load (`translateY(20px) → 0`, `opacity: 0 → 1`, stagger 50ms).

**Alternative for Small Datasets**: If total projects ≤ 9, the Load More button is not rendered at all. All projects display on initial load.

---

### 5.4.5 Empty States and Loading Skeletons

**Loading State (Initial)**

While project data is being fetched, skeleton placeholders display in the grid.

| Parameter | Value |
|---|---|
| Skeleton count | Matches expected grid layout (6 skeletons = 2 rows of 3) |
| Skeleton shape | Same aspect ratio as cards (4:5) |
| Skeleton color | `rgba(245, 240, 235, 0.04)` |
| Skeleton animation | Shimmer effect — a gradient sweep from left to right, `linear-gradient(90deg, transparent, rgba(245,240,235,0.06), transparent)`, animated left to right over 1.5s, infinite loop |
| Skeleton border-radius | 0px |
| Skeleton content lines | 2 small lines at bottom (title + meta) with same shimmer treatment |

**Empty State (No Projects in Category)**

If a filter category contains zero projects:

| Parameter | Value |
|---|---|
| Container | Centered in grid area, min-height 300px |
| Icon | 48×48 outline icon, folder or image icon, color `rgba(245, 240, 235, 0.15)` |
| Message | "No projects in this category yet." — Inter 15px, weight 300, color `rgba(245, 240, 235, 0.4)` |
| CTA | "View All Projects" — Inter 13px, color `#C9A96E`, click resets filter to "All" |

**Error State (Failed Load)**

If the project data fails to load:

| Parameter | Value |
|---|---|
| Message | "Unable to load projects. Please try again." — Inter 15px, color `rgba(245, 240, 235, 0.5)` |
| CTA | "Retry" button — same style as "Load More", click re-fetches data |

### Projects Grid Summary

| Parameter | Value |
|---|---|
| Grid columns (desktop) | 3 |
| Grid columns (tablet) | 2 |
| Grid columns (mobile) | 2 |
| Card aspect ratio | 4:5 |
| Gap (desktop) | 24px |
| Gap (mobile) | 12px |
| Initial load | 9 projects |
| Load more batch | 6 projects |
| Filter categories | All / Residential / Commercial |
| Filter animation | Fade + scale + stagger |
| Sticky filter bar | Yes, below nav with blur backdrop |
| Pagination type | Load More button |
| Empty state | Icon + message + reset CTA |
| Loading state | Shimmer skeletons |

---

## 5.5 Project Detail Page

The Project Detail page is a case study layout presenting a single project in depth. It combines large-format media, descriptive content, technical specifications, and related projects navigation. The page uses a mix of full-width and constrained layouts.

### 5.5.1 Page Header

The page header sits below the fixed navigation and contains project metadata. Background: `#0A0A0F`. Padding: 100px top (below nav), 40px bottom.

**Header Content**

| Element | Specification |
|---|---|
| Breadcrumb | "← Back to Projects" — Inter 13px, weight 400, color `#C9A96E`, hover underline. Links to `/projects` (preserves filter state if available) |
| Project title | Cormorant Garamond 48px desktop / 32px mobile, weight 400, color `#F5F0EB`, margin-top 24px |
| Location | Inter 14px, weight 300, color `rgba(245, 240, 235, 0.55)`, margin-top 12px. Format: "📍 {Location}" |
| Category tags | Horizontal row of tags, margin-top 16px |

**Category Tag**

| Parameter | Value |
|---|---|
| Font | Inter 11px, weight 400, uppercase, letter-spacing 0.08em |
| Color | `#C9A96E` |
| Background | `rgba(201, 169, 110, 0.1)` |
| Border | 1px solid `rgba(201, 169, 110, 0.2)` |
| Padding | 6px 14px |
| Border-radius | 0px |
| Gap between tags | 8px |

**Example**: A project titled "Penthouse Wardrobe Suite" would display tags: "RESIDENTIAL", "WARDROBES", "LUXURY".

---

### 5.5.2 Hero Gallery

A large-format media area featuring the project's primary visual. Background: `#0A0A0F`. Full width, no horizontal padding constraints.

**Main Image/Video**

| Parameter | Value |
|---|---|
| Container width | 100% |
| Height | `70vh` desktop, `50vh` mobile |
| Media type | Image (primary) or video (if available) |
| Object-fit | cover |
| Object-position | center center |
| Border-radius | 0px |

**Thumbnail Navigation**

Below the main media, a horizontal row of thumbnails allows quick navigation between project images.

| Parameter | Value |
|---|---|
| Container | Full width, horizontal scroll if needed |
| Thumbnail size | 100×75px desktop, 80×60px mobile |
| Thumbnail gap | 8px |
| Thumbnail border (inactive) | 2px solid transparent |
| Thumbnail border (active) | 2px solid `#C9A96E` |
| Thumbnail object-fit | cover |
| Click behavior | Updates main media area with crossfade animation |
| Crossfade duration | 400ms |

If the project has only one image, the thumbnail strip is not rendered.

---

### 5.5.3 Project Description

A 2-column layout with the project narrative. Background: `#0A0A0F`. Padding: 80px top/bottom.

**Layout Grid**

| Breakpoint | Left Column | Right Column | Gap |
|---|---|---|---|
| Desktop (≥1024px) | Columns 1–5 | Columns 7–12 | Column 6 gutter |
| Mobile (<768px) | Full width, stacked | Full width, stacked | 32px gap |

**Left Column**

| Element | Specification |
|---|---|
| Eyebrow | "THE PROJECT" |
| Headline | "Overview" — Cormorant Garamond 28px, color `#F5F0EB` |
| Scope text | Inter 15px, weight 300, color `rgba(245, 240, 235, 0.65)`, line-height 1.75. 2–4 sentences describing the project scope and client brief. |

**Right Column**

| Element | Specification |
|---|---|
| Headline | "Challenges & Solutions" — Cormorant Garamond 28px, color `#F5F0EB` |
| Body | Inter 15px, weight 300, color `rgba(245, 240, 235, 0.65)`, line-height 1.75. Description of design challenges and how they were solved. |

**Entrance Animation**: Both columns slide in from `translateY(40px)`, duration 800ms, stagger 100ms between columns, ScrollTrigger `start: "top 75%"`.

---

### 5.5.4 Media Gallery

A mixed-layout gallery of project images and videos. Background: `rgba(245, 240, 235, 0.015)`. Padding: 80px top/bottom.

**Gallery Layout**: CSS Grid with a masonry-inspired layout. The exact arrangement varies per project, but the standard pattern is:

| Row | Layout |
|---|---|
| Row 1 | Full-width image (12 columns) |
| Row 2 | Two images side by side (6 + 6 columns) |
| Row 3 | Full-width image or video (12 columns) |
| Row 4 | Optional: two images side by side (6 + 6) |

**Image Specifications**

| Parameter | Value |
|---|---|
| Gap | 16px desktop, 12px mobile |
| Border-radius | 0px |
| Object-fit | cover |
| Hover | `scale(1.02)` within container (overflow hidden), 400ms ease |
| Cursor | `zoom-in` |
| Click behavior | Opens lightbox |

**Video in Gallery**

Videos within the gallery follow the same grid placement as images. They autoplay when scrolled into view (muted, looped), pause when scrolled out of view. A subtle play/pause indicator appears on hover.

**Lightbox**

Clicking any image opens a fullscreen lightbox:

| Parameter | Value |
|---|---|
| Background | `rgba(10, 10, 15, 0.96)` |
| Image display | Centered, max 90vw × 85vh, object-fit contain |
| Navigation | Left/right arrows, keyboard arrow keys |
| Close | X button top-right, Escape key, click outside image |
| Transition | Fade in 300ms, image scales from `scale(0.95)` to `scale(1)` |
| Counter | "3 / 8" — Inter 13px, color `rgba(245, 240, 235, 0.5)`, bottom center |

---

### 5.5.5 Specifications

A technical details section presented as a structured table. Background: `#0A0A0F`. Padding: 80px top/bottom.

**Section Header**

| Element | Specification |
|---|---|
| Headline | "Specifications" — Cormorant Garamond 28px |

**Specifications Table**

| Parameter | Value |
|---|---|
| Layout | 2-column table, max-width 800px |
| Row separator | 1px solid `rgba(245, 240, 235, 0.06)` |
| Row padding | 16px 0 |
| Label column | Inter 14px, weight 400, color `rgba(245, 240, 235, 0.5)`, width 40% |
| Value column | Inter 14px, weight 300, color `#F5F0EB`, width 60% |

**Example Specifications**

| Label | Example Value |
|---|---|
| Client | Private Residence |
| Location | Dublin 4, Ireland |
| Category | Residential |
| Scope | Walk-in Wardrobe Suite |
| Materials | European Walnut, Brass Hardware |
| Finishes | Hand-Rubbed Oil, Satin Lacquer |
| Hardware | Blum Soft-Close Hinges, LED Integration |
| Timeline | 8 Weeks |
| Year | 2024 |

The specifications are project-specific and populated from the CMS. If a field is empty, the row is omitted (no placeholder text).

---

### 5.5.6 Related Projects

A section at the bottom of the page showing 2–3 related projects. Background: `#0A0A0F`. Padding: 80px top, 120px bottom. Separated by a 1px rule in `rgba(201, 169, 110, 0.12)`.

**Section Header**

| Element | Specification |
|---|---|
| Headline | "More Projects" — Cormorant Garamond 32px |
| Subheadline | "Explore more of our work." — Inter 14px, weight 300, color `rgba(245, 240, 235, 0.5)` |

**Related Projects Grid**

| Breakpoint | Layout |
|---|---|
| Desktop (≥1024px) | 3-column grid, 24px gap |
| Tablet (768–1023px) | 2-column grid (3rd hidden), 20px gap |
| Mobile (<768px) | 2-column grid, 12px gap |

Related project cards use the exact same design as the Projects page cards (section 5.4.2) but at a slightly reduced scale. Cards link to their respective project detail pages.

**Related Project Selection Logic**: Related projects are selected based on shared category (primary) and recency (secondary). If fewer than 3 projects share the category, the remainder are filled with the most recent projects from other categories.

---

### 5.5.7 CTA

A closing call-to-action section. Background: `rgba(245, 240, 235, 0.015)`. Padding: 100px top/bottom.

**Content**

| Element | Specification |
|---|---|
| Headline | "Inspired by This Project?" — Cormorant Garamond 36px, centered |
| Subtext | "Let's create something similar for your space." — Inter 15px, weight 300, color `rgba(245, 240, 235, 0.6)`, centered |
| CTA button | "Start Your Project" — same style as standard CTA, opens modal, centered, margin-top 32px |

**Entrance Animation**: Headline and button fade in from `translateY(30px)`, duration 700ms, ScrollTrigger `start: "top 75%"`.

### Project Detail Page Layout Summary

| # | Section | Layout | Key Content | Interaction |
|---|---|---|---|---|
| 1 | Page Header | Full width, text-left | Breadcrumb, title, location, tags | Back navigation |
| 2 | Hero Gallery | Full width, `70vh` | Main image + thumbnail strip | Thumbnail click, crossfade |
| 3 | Project Description | 2-column | Scope, challenges, solutions | Text content only |
| 4 | Media Gallery | Masonry grid | 4–8 images/videos | Lightbox on click |
| 5 | Specifications | 2-col table | Materials, hardware, timeline | Static content |
| 6 | Related Projects | 3-column grid | 2–3 related case studies | Card navigation |
| 7 | CTA | Centered single column | "Start Your Project" button | Opens modal |

---

## 5.6 Contact Page

The Contact page is intentionally minimal. The primary contact mechanism is the "Discuss a Project" modal triggered from the CTA button in the fixed navigation (present on all pages). The Contact page serves as a supplementary information destination for visitors who prefer traditional contact methods.

### 5.6.1 Contact Information

A simple information section. Background: `#0A0A0F`. Padding: 140px top (below fixed nav), 80px bottom.

**Layout**: Single column, centered, max-width 640px.

**Content**

| Element | Specification |
|---|---|
| Eyebrow | "GET IN TOUCH" |
| Headline | "Let's Talk" — Cormorant Garamond 44px, centered |
| Subtext | "Have a project in mind? Reach out and we'll get back to you within one business day." — Inter 16px, weight 300, color `rgba(245, 240, 235, 0.65)`, line-height 1.6, centered, max-width 480px |
| Divider | 1px horizontal rule, 60px wide, centered, color `rgba(201, 169, 110, 0.3)`, margin 40px auto |

**Contact Methods**

Below the divider, three contact methods are displayed in a vertical stack with 32px gap.

| Method | Label | Value | Display |
|---|---|---|---|
| Email | "Email Us" | `hello@company.ie` | Inter 16px, weight 400, color `#F5F0EB`. Clickable `mailto:` link |
| WhatsApp | "WhatsApp" | `+353 1 XXX XXXX` | Inter 16px, weight 400, color `#F5F0EB`. Clickable `https://wa.me/353...` link |
| Location | "Visit Us" | "Dublin, Ireland" | Inter 16px, weight 400, color `#F5F0EB`. Non-clickable |

Each method has a small icon (20×20px, color `#C9A96E`) to its left, with 16px gap between icon and text.

**Primary CTA**

Below the contact methods, a prominent CTA button:

| Parameter | Value |
|---|---|
| Label | "Discuss a Project" |
| Style | Standard gold CTA button (see 5.1.1) |
| Position | Centered, margin-top 48px |
| Action | Opens fullscreen "Discuss a Project" modal |

---

### 5.6.2 Map Integration

An embedded Google Map showing the Dublin location. Background: `#0A0A0F`. Padding: 0 (map bleeds to edges).

| Parameter | Value |
|---|---|
| Map height | 400px desktop, 300px mobile |
| Map style | Custom dark-themed map matching site palette (JSON style config provided below) |
| Zoom level | 13 |
| Center coordinates | Dublin city center (approx. 53.3498° N, 6.2603° W) |
| Marker | Custom gold-colored pin (`#C9A96E`) |
| Interactivity | Scroll to zoom enabled, dragging enabled |
| Border | None |

**Map Style JSON (Key Properties)**

The map uses a dark monochrome style with reduced landmark labels:

- `elementType: "geometry"` → `color: "#1a1a20"`
- `elementType: "labels.text.fill"` → `color: "#8a8a90"`
- `featureType: "water"` → `color: "#15151a"`
- `featureType: "road"` → `color: "#2a2a30"`
- `featureType: "poi"` → `visibility: "off"`
- `featureType: "transit"` → `visibility: "off"`

The exact Google Maps JavaScript API style array is provided in the developer assets package.

---

### 5.6.3 Business Hours and Response Time

A small information block below the map. Background: `rgba(245, 240, 235, 0.015)`. Padding: 60px top/bottom.

**Layout**: Single column, centered, max-width 480px.

| Element | Specification |
|---|---|
| Headline | "When to Reach Us" — Cormorant Garamond 24px, centered |
| Response time | "We respond to all enquiries within 1 business day." — Inter 14px, weight 300, color `rgba(245, 240, 235, 0.55)`, centered |
| Hours | "Monday – Friday: 9:00 – 17:30" — Inter 14px, weight 300, color `rgba(245, 240, 235, 0.55)`, centered |
| Note | "Weekend visits by appointment." — Inter 13px, weight 300, color `rgba(245, 240, 235, 0.4)`, centered, margin-top 8px, italic |

---

### 5.6.4 Direct WhatsApp CTA Button

A fixed floating WhatsApp button appears on all pages (not just the Contact page). This is a global component.

| Parameter | Value |
|---|---|
| Position | Fixed, bottom-right, 24px from edges |
| Size | 56×56px circle |
| Background | `#25D366` (WhatsApp brand green) |
| Icon | WhatsApp logo, 28×28px, white |
| Border-radius | 50% |
| Box-shadow | `0 4px 16px rgba(0, 0, 0, 0.3)` |
| Hover | `scale(1.08)`, box-shadow increases to `0 6px 20px rgba(0, 0, 0, 0.4)`, 200ms ease |
| Active | `scale(0.95)`, 100ms |
| Link | `https://wa.me/353XXXXXXXXX` (target blank) |
| Z-index | 100 (below modal overlay, above all page content) |
| Visibility | All pages, all breakpoints |
| Entrance | Fades in after 3 seconds on first page load, `opacity: 0 → 1`, 400ms |

On the Contact page specifically, in addition to the floating button, the WhatsApp contact method in the contact list (5.6.1) is given visual emphasis with a green accent border: `border-left: 2px solid #25D366`, padding-left 16px.

### Contact Page Sections Summary

| # | Section | Layout | Key Content | Interaction |
|---|---|---|---|---|
| 1 | Contact Info | Single column centered | Email, WhatsApp, location, CTA | `mailto:`, `wa.me` links, modal CTA |
| 2 | Map | Full bleed | Dark-styled Google Map | Zoom, pan |
| 3 | Business Hours | Single column centered | Response time, hours | Static info |
| 4 | WhatsApp FAB | Fixed bottom-right | WhatsApp button (global) | Opens WhatsApp chat |

---

## Page Specification Cross-Reference

The following table summarises all page-level specifications for quick reference during development:

| Page | Route | Sections | Primary CTA | Special Components |
|---|---|---|---|---|
| Home | `/` | 8 (incl. footer) | "Discuss a Project" modal | Hero video, process timeline |
| About | `/about` | 5 | "Explore Our Services →" | Team grid, icon differentiators |
| Services | `/services` | 5 | "Discuss Your Project →" | Anchor nav, material grid |
| Projects | `/projects` | 1 (filterable grid) | Project cards → detail | Filter tabs, load more, skeletons |
| Project Detail | `/projects/{slug}` | 7 | "Start Your Project" modal | Hero gallery, lightbox, specs table |
| Contact | `/contact` | 4 | "Discuss a Project" modal | Embedded map, WhatsApp FAB |

All pages share: fixed top navigation (transparent → solid on scroll), global footer, gold CTA button in nav opening the "Discuss a Project" modal, and the WhatsApp floating action button. Page transitions use a fade effect: outgoing page `opacity: 1 → 0` over 200ms, incoming page `opacity: 0 → 1` over 300ms with 100ms delay. The modal system is documented in Chapter 7 (Form & Interaction Design).


---

## 6. Video Strategy

Video is a non-negotiable element of the site's visual identity. Every page that supports video must use it — not as decorative filler, but as a primary communication tool that conveys quality, precision, and the tactile reality of custom furniture. All videos are silent, cinematic, and atmospheric. There are no talking heads, no voice-overs, and no dependency on audio for comprehension. The visual language borrows from luxury brand filmmaking: slow movement, shallow depth of field, warm color grading, and obsessive attention to material detail.

### 6.1 Video Content Types

Four distinct video categories serve different purposes across the site. Each has defined placement, duration, and production requirements.

#### 6.1.1 Hero Video: Homepage Background

The homepage hero section displays a full-viewport background video that establishes mood and brand tone before the user scrolls. This video does not feature products, logos, or text overlays — it is purely atmospheric.

**Content direction:** Slow, abstract footage of materials in motion — wood shavings drifting through warm light, dust particles floating over a polished surface, fabric draping in slow motion, or soft-focus reflections on lacquered cabinet doors. The imagery should suggest craftsmanship and luxury without showing a complete product.

**Placement:** Fixed-position background behind the hero section on the homepage. The video covers the full viewport width and height (`100vw × 100vh`) with `object-fit: cover`.

**Duration:** 10–15 seconds, seamlessly looped. No visible cut point at loop boundary.

**Aspect ratio:** 2.39:1 (cinematic anamorphic) for desktop, 16:9 for mobile. The desktop version uses letterboxing to reinforce the cinematic feel.

**Brightness and contrast:** The video must be graded dark enough that white hero text (Inter 300, `#F5F5F0`) maintains a minimum contrast ratio of 4.5:1 against all frames. A dark gradient overlay (`linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.1) 50%, rgba(10,10,10,0.6) 100%)`) is applied as a CSS layer above the video to guarantee text legibility regardless of frame content.

#### 6.1.2 Product Videos: Mechanism Demonstrations

Product videos demonstrate functional hardware mechanisms in action. These are sourced from manufacturer-provided footage or captured at the factory. Each video shows a single mechanism operating in a clean, controlled environment.

**Content scope:**
- Soft-close drawer slides (full extension, gentle deceleration, silent close)
- Lift-up cabinet door systems (pneumatic lift, smooth arc motion)
- Pocket door systems (sliding into carcass, space-saving reveal)
- Sliding wardrobe door systems (top-hung, silent roller track)
- Pantry pull-out systems (full extension, tiered storage access)
- Corner cabinet solutions (Le Mans pull-out, rotating carousel)

**Placement:** Embedded within product detail sections on the Hardware page, and inline within individual project case study pages where that mechanism was used. Video container width: 100% of content column (max-width `800px`), with `border-radius: 2px`.

**Duration:** 5–10 seconds per mechanism. Each video captures one complete operation cycle — open, demonstrate, close — with a 0.5s hold at the fully open position.

**Framing:** The mechanism occupies 60–70% of the frame, shot against a neutral background (matte grey or matching cabinet interior). No hands visible unless essential to demonstrate operation. When hands are necessary, use gloved hands (black nitrile) to maintain the premium, clinical aesthetic.

#### 6.1.3 Detail Videos: Texture Close-ups, Lighting Effects, Material Finishes

Detail videos are the shortest and most focused content type. They function as "visual texture samples" — replacing or supplementing static photography with motion that reveals surface qualities impossible to convey in still images.

**Content scope:**
- Wood grain under raking light (camera slowly pans across oak, walnut, or ash veneer)
- LED strip lighting activating inside a cabinet (fade-on sequence, warm white 3000K)
- Brass handle reflections (slow rotation, light catching machined edges)
- Lacquer surface depth (camera dollies parallel to surface, revealing reflection quality)
- Leather texture breathing (macro shot of stitched leather panel, subtle compression and release)
- Stone countertop veining (slow lateral movement, dramatic side-lighting)

**Placement:** Inline within material swatch sections on the Materials page, and as hover-triggered previews on project gallery cards (desktop only — see Section 6.3 for interaction rules).

**Duration:** 3–5 seconds, seamlessly looped. These are micro-moments designed for repeated ambient viewing.

**Framing:** Extreme close-up and macro. The subject fills 80–90% of the frame. Depth of field is intentionally shallow (f/1.8–f/2.8 equivalent) with bokeh in background elements.

#### 6.1.4 Process Videos: Craftsmanship Moments

Process videos capture moments of fabrication and assembly at the factory. These are not documentary-style workshop tours — they are carefully composed, cinematic fragments of craft.

**Content scope:**
- CNC router cutting a cabinet profile (slow-motion chip ejection, precise tool path)
- Veneer pressing (hydraulic press closing, veneer conforming to curved substrate)
- Edge banding application (hot-melt adhesive, precision trim, perfect seam)
- Hand-sanding a profile (sanding block following curved edge, dust in warm light)
- Lacquer spray application (gun movement, mist catching backlight, build-up on surface)
- Hardware installation (screwdriver turning, precise alignment, satisfying engagement click)
- Final quality inspection (cloth wiping surface, light raking across finish)

**Placement:** Dedicated "Craft" section on the About page, and select project case studies where a specific technique was employed. Container: full content width with `16:9` ratio, max-width `900px`.

**Duration:** 8–12 seconds each. These are longer than detail clips to allow the viewer to appreciate the rhythm and precision of the process.

**Availability note:** Process videos are contingent on factory access and filming permissions. If footage is unavailable, this content type is deferred rather than substituted with lower-quality material. Static photography with subtle Ken Burns CSS animation (`transform: scale(1.05)` over 20s) serves as the fallback.

### 6.2 Technical Video Requirements

All video assets must conform to the technical specifications in the table below. These parameters balance visual quality with performance constraints across devices and connection speeds.

#### 6.2.1 Formats: MP4 (H.264) + WebM (VP9) Dual Encoding

Every video is delivered in two formats to ensure cross-browser compatibility:

- **Primary:** MP4 with H.264 codec (High Profile, Level 4.1) — universal support across all target browsers
- **Fallback:** WebM with VP9 codec — superior compression efficiency for browsers that support it (Chrome, Firefox, Edge)

The `<video>` element lists the WebM source first (browsers select the first supported format), with MP4 as the second source:

```html
<video autoplay muted loop playsinline poster="frame.jpg">
  <source src="video.webm" type="video/webm;codecs=vp9">
  <source src="video.mp4" type="video/mp4;codecs=avc1.42E01E">
</video>
```

#### 6.2.2 Specifications Table

The following table defines encoding parameters, file size targets, and delivery requirements for each video type.

| Parameter | Hero Video | Product Video | Detail Video | Process Video |
|---|---|---|---|---|
| **Resolution (desktop)** | 1920 × 804 (2.39:1) | 1280 × 720 (16:9) | 960 × 960 (1:1) | 1280 × 720 (16:9) |
| **Resolution (mobile)** | 960 × 540 (16:9) | 854 × 480 (16:9) | 640 × 640 (1:1) | 854 × 480 (16:9) |
| **Codec — primary** | H.264 High Profile L4.1 | H.264 High Profile L3.1 | H.264 High Profile L3.1 | H.264 High Profile L3.1 |
| **Codec — fallback** | VP9 (WebM) | VP9 (WebM) | VP9 (WebM) | VP9 (WebM) |
| **Bitrate (desktop)** | 2.5–3.5 Mbps | 1.5–2.5 Mbps | 0.8–1.5 Mbps | 2.0–3.0 Mbps |
| **Bitrate (mobile)** | 1.0–1.5 Mbps | 0.8–1.2 Mbps | 0.5–0.8 Mbps | 1.0–1.5 Mbps |
| **Frame rate** | 24 fps | 30 fps | 24 fps | 24 fps (60 fps for slow-motion segments) |
| **Target file size** | ≤ 6 MB (desktop) / ≤ 3 MB (mobile) | ≤ 3 MB (desktop) / ≤ 1.5 MB (mobile) | ≤ 1.5 MB (desktop) / ≤ 800 KB (mobile) | ≤ 4.5 MB (desktop) / ≤ 2 MB (mobile) |
| **Color space** | Rec. 709, sRGB transfer | Rec. 709, sRGB transfer | Rec. 709, sRGB transfer | Rec. 709, sRGB transfer |
| **Audio track** | None | None | None | None |
| **Loop behavior** | Seamless loop, cross-fade 0.5s | Single play, no loop | Seamless loop | Single play, no loop |
| **Poster frame format** | JPEG quality 85, WEBP quality 80 | JPEG quality 85, WEBP quality 80 | JPEG quality 85, WEBP quality 80 | JPEG quality 85, WEBP quality 80 |

**Bitrate ceiling rule:** No individual video file may exceed its type's maximum bitrate, even if the file size target is not yet reached. Bitrate is the hard constraint — file size is a derived target based on the duration ranges specified in Section 6.1.

#### 6.2.3 Delivery: CDN-Hosted, Streaming-Optimized

All video files are served from a CDN with the following configuration:

- **Primary CDN:** Bunny.net (Pull Zone) — configured with Perma-Cache enabled for video assets
- **Backup CDN:** Cloudflare Stream — used for manufacturer videos that require re-encoding to meet site specifications
- **Origin:** AWS S3 bucket (region: eu-central-1) with CloudFront distribution
- **Caching headers:** `Cache-Control: public, max-age=31536000, immutable` — videos are versioned by filename (`hero-v1.mp4`, `hero-v2.mp4`) and never modified in place
- **CORS:** `Access-Control-Allow-Origin: *` for cross-origin video element playback
- **Compression:** Brotli and Gzip disabled for video files — they are already compressed by their codecs
- **HTTP/2 Server Push:** Not used for video — files are too large for push; rely on standard request prioritization

**Adaptive quality delivery:** The site implements a client-side quality selector using the `Network Information API` (with fallback to `navigator.connection.effectiveType`). Connection types map to quality tiers:

| Connection Type | Quality Tier | Video Suffix | Action |
|---|---|---|---|
| `4g`, `wifi` | Full quality | `-hq` | Load desktop/mobile resolution per breakpoint |
| `3g` | Reduced quality | `-lq` | Load mobile resolution on all devices |
| `2g`, `slow-2g` | Poster only | none | Display poster frame, no video load |
| API unavailable / null | Default quality | `-hq` | Assume full quality, downgrade if load time exceeds 3s |

The quality tier is determined once on initial page load and stored in a Svelte store (`videoQuality: 'hq' | 'lq' | 'poster'`). All subsequent video elements on the page read from this store.

#### 6.2.4 Poster Frames: High-Quality Placeholder Before Playback

Every `<video>` element includes a poster attribute pointing to a high-quality still frame extracted from the video's first meaningful frame (not frame 0, which may be black or transition-blurred).

**Poster frame specifications:**
- **Format:** Dual delivery — `<picture>` element with WEBP source and JPEG fallback
- **JPEG encoding:** Quality 85, progressive scan, optimized Huffman tables
- **WEBP encoding:** Quality 80, lossy, method 6 (slowest/best compression)
- **Dimensions:** Match the video resolution for the target quality tier
- **Color profile:** sRGB, embedded ICC profile
- **File size target:** ≤ 150 KB for hero posters, ≤ 80 KB for product/detail/process posters

**Poster display logic:** The poster frame is visible until the video's `canplay` event fires. A CSS transition (`opacity 0.3s ease-out`) fades the poster out as the first video frame renders, preventing visual flicker. If the video fails to load (network error, unsupported codec), the poster remains visible as the permanent fallback.

### 6.3 Video UX Patterns

Video playback behavior is carefully controlled to respect user attention, device resources, and data constraints. No video plays unexpectedly or consumes bandwidth while off-screen.

#### 6.3.1 Autoplay Rules: Muted, Looped, playsinline for Mobile

All videos that autoplay must satisfy the following HTML attributes and browser policy requirements:

```html
<video
  autoplay
  muted
  loop
  playsinline
  disableRemotePlayback
  x-webkit-airplay="deny"
  poster="poster-frame.webp"
>
```

**Attribute rationale:**
- `autoplay` + `muted` together: Required by all modern browsers for autoplay permission. Unmuted autoplay is blocked without user gesture.
- `loop`: Applied to hero and detail videos only. Product and process videos play once.
- `playsinline`: Prevents iOS from forcing fullscreen playback on tap. Essential for inline video layout.
- `disableRemotePlayback` + `x-webkit-airplay="deny"`: Prevents ChromeCast/AirPlay UI from appearing. The site controls its own video experience.

**Custom controls overlay:** Native browser controls are hidden (`controls` attribute omitted). A minimal custom control set is provided on hover/tap:
- Play/pause toggle (centered, 48 × 48px touch target, opacity 0 → 1 on hover)
- Mute toggle (not displayed — all videos are permanently muted, button is hidden)
- Progress bar (only for non-looping videos — product and process types)

Control styling: `background: rgba(10, 10, 10, 0.6); backdrop-filter: blur(8px); border-radius: 4px;`. Controls fade in over 200ms (`opacity transition`) on mouseenter and fade out after 2s of inactivity.

#### 6.3.2 Intersection-Based Playback: Pause When Off-Screen

All videos on the site are managed by a single Intersection Observer instance to minimize CPU and GPU load.

**Observer configuration:**
```javascript
const videoObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
        video.play().catch(() => {}); // catch autoplay policy rejection
      } else {
        video.pause();
      }
    });
  },
  {
    root: null,
    rootMargin: '100px', // preload buffer
    threshold: [0, 0.25]
  }
);
```

**Behavior rules:**
- Videos begin loading (fetching the first bytes) when they enter the `rootMargin` buffer zone (100px before the viewport edge)
- Videos begin playing when at least 25% of their container is visible
- Videos pause when less than 25% visible or fully off-screen
- The hero video on the homepage is exempt from intersection-based pause — it plays continuously while the page is active, pausing only on `document.visibilitychange` (tab switch)
- When a paused video returns to visibility, it resumes from the current position (not restarted)

**Performance limit:** Maximum 3 videos may be in the `playing` state simultaneously. If a fourth video enters the viewport, the oldest playing video (by time since last intersection) is paused. This prevents memory pressure on low-end devices.

#### 6.3.3 Loading Strategy: Lazy Load, Progressive Enhancement

Video loading follows a three-tier progressive enhancement strategy:

**Tier 1 — Poster frame only (immediate):**
The poster frame (JPEG/WEBP) loads with standard image priority. It is rendered in the video container immediately on page load. This ensures visual content is always present, even on the slowest connections.

**Tier 2 — Metadata preload (on scroll approach):**
When a video element enters the Intersection Observer's `rootMargin` buffer (100px before viewport), the video source is assigned and `preload="metadata"` is set. This downloads only enough data to determine video dimensions and extract the first frame (typically 50–200 KB). The poster remains visible.

**Tier 3 — Full load (on viewport entry):**
When the video is 25% visible, `preload` is upgraded to `"auto"` and playback begins. The full video data streams from the CDN. The poster fades out on `canplay`.

**Priority ordering:**
- Hero video: Tier 2 triggers on page load (no scroll delay), Tier 3 triggers when hero section is visible
- Above-the-fold videos (if any): Tier 2 on page load
- Below-the-fold videos: Tier 2 on scroll approach, Tier 3 on viewport entry

#### 6.3.4 Mobile Considerations: Reduced Quality, Data-Aware Loading

Mobile devices receive a tailored video experience:

**Quality reduction:** Mobile connections (detected via `Network Information API` or screen width ≤ 768px with no `4g`/`wifi` indicator) load the mobile resolution variant of all videos. The mobile variant is pre-transcoded at half the desktop resolution and approximately 40% of the desktop bitrate.

**Data saver mode:** When `navigator.connection.saveData === true`, all videos display poster frames only. No video files are downloaded. A subtle play icon overlay (centered, 64 × 64px, `opacity: 0.6`) invites the user to tap to load the video explicitly. On tap, the video loads and plays immediately — this counts as a user gesture, satisfying autoplay policies.

**Battery awareness:** On devices reporting `navigator.getBattery()`, if battery level is below 15% and not charging, videos default to poster-frame-only mode with the same tap-to-play overlay.

**Orientation changes:** On `resize` events that cross the 768px breakpoint, videos do not reload or switch quality tiers mid-playback. The current video continues playing. The quality tier is re-evaluated only on full page navigation.

**Fullscreen behavior:** On iOS Safari, tapping a video does not trigger native fullscreen because `playsinline` is set. A dedicated fullscreen button is available in the custom controls for users who want an immersive view. This button triggers `video.requestFullscreen()` with the video continuing from the current playback position.

### 6.4 Video Production Guidelines

These guidelines ensure visual consistency across all video content, whether produced in-house, captured at the factory, or sourced from hardware manufacturers.

#### 6.4.1 Visual Style: Cinematic, Slow-Motion, Macro Shots, Premium Lighting

The visual language for all site videos follows a unified aesthetic:

**Camera movement:**
- All movement is slow and deliberate. No fast pans, no handheld shake, no abrupt cuts.
- Preferred moves: linear dolly (parallel to surface), slow push-in (1cm per second), micro-pan (2° per second), static with subject motion only.
- Gimbal or slider required for all moving shots. Tripod mandatory for static shots. No handheld footage.

**Depth of field:**
- Shallow DOF is the default aesthetic. Subject in sharp focus, background defocused with smooth circular bokeh.
- Aperture equivalent: f/1.4–f/2.8 for detail and hero shots; f/4–f/5.6 for product mechanism shots where the full movement path must be legible.

**Lighting:**
- Warm key light: 3000–3200K color temperature, simulating tungsten/halogen ambiance.
- Accent highlights on metallic surfaces (brass, chrome) to emphasize machining quality.
- No flat lighting. Every shot must have dimensionality — visible highlights and controlled shadows.
- Backlight/rim light for translucent materials (glass, onyx, resin) to reveal internal structure.

**Color grading:**
- Warm shadows (amber/gold bias in dark tones)
- Desaturated midtones (reduced saturation in background wood and walls)
- Slight teal in shadows for cinematic contrast (subtle — no "orange and teal" cliche)
- Lifted blacks (not crushed to 0 — detail visible in deepest shadows)
- Soft highlight roll-off (no clipped whites on metallic reflections)
- Overall LUT direction: reference films — *Blade Runner 2049* (interior warmth), *The Grand Budapest Hotel* (controlled palette), luxury brand campaigns (Bottega Veneta, Poliform)

**Aspect ratios by type:**
- Hero: 2.39:1 (anamorphic widescreen)
- Product mechanism: 16:9 (standard widescreen)
- Detail/texture: 1:1 (square, for flexible layout placement)
- Process: 16:9 (standard widescreen)

#### 6.4.2 No Audio Rule: All Videos Silent, No Voice-Over, No Music Dependency

Every video on the site is completely silent. There are no exceptions.

**Rationale:**
- Silent videos autoplay reliably across all browsers without user gesture requirements
- The site has no audio UI (no volume controls, no mute indicators) — adding audio would require introducing controls that conflict with the minimal design
- The target audience browses in professional environments (offices, showrooms) where unexpected audio is intrusive
- The brand identity is visual and tactile, not auditory

**Manufacturer video handling:** Many hardware manufacturers provide promotional videos with music tracks or narration. These videos must be processed before site integration:
- Strip all audio tracks during re-encoding
- If the original video contains spoken narration that explains the mechanism, evaluate whether the video still communicates effectively without sound
- If a manufacturer video depends on narration to be understood, it is rejected and replaced with a silent demonstration captured specifically for the site
- No subtitles or captions are added — the video must communicate through visuals alone

#### 6.4.3 Duration Guidelines

Maximum durations are strict. Videos that exceed these limits must be edited down or split.

| Video Type | Minimum Duration | Target Duration | Maximum Duration | Loop |
|---|---|---|---|---|
| Hero | 8s | 12s | 15s | Yes (seamless) |
| Product mechanism | 4s | 7s | 10s | No |
| Detail/texture | 2s | 4s | 5s | Yes (seamless) |
| Process | 6s | 10s | 12s | No |

**Seamless loop technique:** For looping videos (hero, detail), the final 0.5 seconds cross-fades with the opening 0.5 seconds. The cross-fade is baked into the video file, not applied via CSS. This produces a loop with no perceptible cut point even when the start and end frames differ.

**Single-play videos:** Product and process videos that play once include a 0.3s fade-in from the poster frame at the start and end with a subtle hold (0.5s freeze on the final frame) before the video element resets to the poster frame. No replay button is shown — if the user wants to rewatch, they scroll the video out of and back into view.

#### 6.4.4 Content Checklist: Factory and Manufacturer Capture

The following table specifies what video content must be captured or sourced, organized by source and priority. Items marked **Required** must be completed before launch. Items marked **Desirable** enhance the site but are not blocking.

| # | Content Item | Source | Priority | Duration Target | Notes |
|---|---|---|---|---|---|
| 1 | Hero — atmospheric material abstract | Custom shoot / stock license | **Required** | 12s loop | Original footage preferred; licensed stock acceptable if exclusive rights secured |
| 2 | Soft-close drawer full extension | Hettich / Grass manufacturer video | **Required** | 7s | Strip audio; isolate mechanism against neutral background |
| 3 | Lift-up door system (pneumatic) | Blum manufacturer video | **Required** | 7s | AVENTOS HK-S or HK-XS system demonstration |
| 4 | Pocket door sliding system | Blum manufacturer video | **Required** | 8s | REVEGO system — show door sliding into carcass |
| 5 | Top-hung sliding wardrobe door | Hettich / custom capture | **Required** | 7s | Silent roller track, smooth glide |
| 6 | Pantry pull-out full extension | Kesseböhmer manufacturer video | **Required** | 8s | DISPENSA or TANDEM system — tiered storage visible |
| 7 | Corner solution (Le Mans pull-out) | Kesseböhmer manufacturer video | **Required** | 8s | LEMANS II system — rotating shelf demonstration |
| 8 | LED interior lighting fade-on | Hafele manufacturer video / custom | **Required** | 4s loop | Warm white 3000K strip, gradual illumination |
| 9 | Wood grain texture — oak | Custom macro shoot | **Required** | 4s loop | Raking light, slow pan across grain |
| 10 | Wood grain texture — walnut | Custom macro shoot | **Required** | 4s loop | Raking light, slow pan across grain |
| 11 | Brass handle — reflection study | Custom macro shoot | **Required** | 4s loop | Slow rotation, light catching machined edges |
| 12 | Lacquer surface depth | Custom macro shoot | Desirable | 4s loop | Camera dollies parallel to surface |
| 13 | Leather texture macro | Custom macro shoot | Desirable | 4s loop | Stitched panel, subtle compression |
| 14 | Stone countertop veining | Custom macro shoot | Desirable | 4s loop | Dramatic side-lighting, lateral movement |
| 15 | CNC router cutting profile | Factory capture | Desirable | 10s | Slow-motion chip ejection |
| 16 | Veneer pressing | Factory capture | Desirable | 10s | Hydraulic press, veneer conforming |
| 17 | Edge banding application | Factory capture | Desirable | 10s | Hot-melt adhesive, precision trim |
| 18 | Hand-sanding profile | Factory capture | Desirable | 10s | Warm light, dust particles visible |
| 19 | Lacquer spray application | Factory capture | Desirable | 10s | Backlit mist, build-up on surface |
| 20 | Hardware installation | Factory capture | Desirable | 8s | Alignment, engagement click audible in source (removed) |
| 21 | Final quality inspection | Factory capture | Desirable | 8s | Cloth wiping, raking light across finish |
| 22 | Drawer interior organization | Custom shoot | Desirable | 6s | Felt-lined dividers, accessory trays in motion |
| 23 | Wardrobe lighting sequence | Custom shoot | Desirable | 5s | Sensor-activated light strip, door-open trigger |
| 24 | Hinge soft-close detail | Hettich manufacturer video | Desirable | 5s | Sensys hinge, silent closing action |
| 25 | Sliding system load test | Manufacturer video | Desirable | 6s | Heavy drawer, full load, smooth operation |

**Manufacturer video acquisition process:**
1. Contact each manufacturer's marketing department (Hettich, Blum, Grass, Kesseböhmer, Hafele) to request high-resolution video assets for their flagship systems
2. Request files in ProRes or highest-available quality — the site will re-encode to MP4/WebM
3. Review all received footage for brand consistency — color grade to match the site's warm palette if necessary
4. Strip all audio tracks during re-encoding
5. Crop/reframe to the aspect ratios specified in the table above
6. Extract poster frames from the reframed video at the most visually compelling moment

**Factory capture coordination:**
1. Schedule filming during active production hours for authentic process footage
2. Minimum equipment: DSLR/mirrorless capable of 4K 24p, 50mm macro lens, 85mm portrait lens, LED panel (3000K), slider rail, tripod
3. Capture each checklist item with 3 takes minimum for editorial selection
4. Review footage on-site for focus, exposure, and composition before leaving
5. All factory footage is the property of the client and may not be used by the factory for their own marketing without written agreement


---

## 7. Form & Lead Capture Specification

### 7.1 Form UX Design

#### 7.1.1 Trigger: "Discuss a Project" CTA opens fullscreen modal overlay

The form is accessed exclusively through the "Discuss a Project" CTA button, which appears in the homepage hero, sticky navigation bar, projects page, and footer. Clicking any instance fires the `form_open` analytics event (Section 8.1.3) with a `cta_location` parameter, then opens the contact form modal rendered as a portal on `document.body` at `z-index: 900`. The click handler is debounced at 300ms to prevent double-opening.

#### 7.1.2 Modal behavior: dark overlay, centered form, close button, ESC to close, scroll lock

The overlay covers the full viewport with `background: rgba(10, 10, 15, 0.85)` and `backdrop-filter: blur(4px)`, fading in over `0.3s` with `cubic-bezier(0.4, 0, 0.2, 1)` easing. On mobile, the blur is disabled for compositing performance.

The form panel is centered at `max-width: 600px`, `width: 90vw`, background `#111118`, padding `64px` desktop / `40px` mobile. Entry animation: `opacity 0→1` + `translateY(-20px)→0` over `0.4s` with `0.1s` delay. Exit: reverse over `0.2s`.

Close mechanisms: (1) 24px Lucide `X` icon top-right at `24px`, color `#9A9590` → `#F0EBE3` on hover; (2) Escape key listener on `document`; (3) click on overlay backdrop. Body scroll is locked via `overflow: hidden` with scrollbar gap compensation. Focus trap cycles through tabbable elements; focus returns to the trigger button on close.

The panel has `max-height: 85vh` and `overflow-y: auto` with a custom scrollbar: `8px` width, track `rgba(240, 235, 227, 0.06)`, thumb `rgba(240, 235, 227, 0.2)`.

#### 7.1.3 Form layout: single column, generous spacing, no step indicator

The form uses a **single-step layout** — all seven fields are visible at once, scrollable within the modal. This is a deliberate decision: the client explicitly rejected a multi-step configurator, and the form must feel effortless and completable in under 60 seconds.

**Field order:** Project Type Toggle → Location → Description → File Upload → Full Name → Email → WhatsApp → Submit. The sequence follows a logical what-then-who flow: project details precede contact information. Spacing between field groups is `32px` (`--space-5`). Each field group reserves `20px` min-height below the input for error messages, preventing layout shift.

The modal header displays the title in `--type-h3` (Cormorant Garamond, 32px desktop / 24px mobile, weight 500): "Discuss a Project". Subtitle in `--type-body` (Inter, 16px, `#9A9590`): "Tell us about your project and we'll respond within 24 hours." A `1px solid rgba(240, 235, 227, 0.08)` border separates the header from the form body.

#### 7.1.4 Visual design: minimal labels, static label pattern, clean inputs

Labels use `--type-label` (Inter, 12px, weight 500, uppercase, `0.08em` letter spacing, `#9A9590`), positioned above the input with `8px` margin-bottom. Required fields show a `" *"` suffix in `--state-error` (`#9B5A5A`).

Inputs follow Section 3.4.2: transparent background, bottom border only (`1px solid rgba(240, 235, 227, 0.2)`), height `56px`, padding `16px 0`, font `--type-body` (Inter, 16px, `#F0EBE3`). Focus: border transitions to `#C4956A` over `0.2s`. Error: border `#9B5A5A` with a `3px` solid left border. Placeholder text: `#9A9590`.

Static labels are used instead of floating labels — no animation complexity, cleaner i18n implementation (Section 9). The submit button is full-width primary CTA, `--type-button` font, height `56px`, bg `#C4956A`, text `#0A0A0F`. Loading state replaces text with a spinning 16px Lucide `Loader2` icon. Disabled state: `opacity: 0.6`, `cursor: not-allowed`.

---

### 7.2 Form Fields Specification

#### 7.2.1 Field-by-field specification (table): name, type, required, validation rules, placeholder text

| # | Field Name | Input Type | Required | Validation Rules | Placeholder |
|---|---|---|---|---|---|
| 1 | Project Type | Toggle (Residential / Commercial) | Yes | One option must be selected | — |
| 2 | Location | Text input | Yes | Min 2 chars, max 100 chars; letters, spaces, commas, periods, hyphens | "e.g., County Dublin" |
| 3 | Description | Textarea | Yes | Min 10 chars, max 1000 chars; HTML tags stripped | "Brief description of your project..." |
| 4 | File Upload | File input (drag-and-drop) | No | Max 5 files, 10 MB each; JPG/PNG/WebP/MP4/MOV/PDF accepted | "Drop files here or click to browse" |
| 5 | Full Name | Text input | Yes | Min 2 chars, max 80 chars; Unicode letters, spaces, hyphens, apostrophes | "Your full name" |
| 6 | Email | Email input | Yes | Valid email format (RFC 5322 subset); exactly one `@` | "your@email.com" |
| 7 | WhatsApp | Tel input | Yes | E.164 format: `+` followed by 6–19 digits | "+353 87 123 4567" |

**Field order rationale:** The what-then-who sequencing puts project information before personal details. Users describe their project first, then provide contact information. This respects the mental model and keeps the user focused on their needs rather than feeling interrogated.

#### 7.2.2 Project type selection: visual toggle buttons (Residential / Commercial)

The project type selector is a two-pill toggle — not a dropdown. Toggles require one click; dropdowns require two.

**Visual spec:** Flex row container, gap `8px`, full width. Each pill: `flex: 1`, height `48px`, centered `--type-button` text. Inactive: transparent bg, border `1px solid rgba(240, 235, 227, 0.2)`, color `#9A9590`. Active: bg `#C4956A`, border `#C4956A`, color `#0A0A0F`. Hover (inactive): border `rgba(240, 235, 227, 0.4)`, color `#F0EBE3`. Transition: `all 0.2s ease`.

Clicking a pill selects it and deselects the other. Defaults to no selection on open — an active choice is required. Stored values: `"residential"` or `"commercial"`. The Residential pill shows a Lucide `Home` icon (18px, left of text); Commercial shows `Building2` (18px).

#### 7.2.3 Location field: text input with autocomplete hint for Irish counties

Free-text input with an autocomplete dropdown suggesting Irish locations. Data source: a static array of 40 entries — 26 county names ("County Dublin", "County Cork", etc.) plus 14 major towns ("Dublin City", "Galway City", "Dundalk", "Waterford", etc.).

Autocomplete triggers after 2 characters, displays max 5 matches. Dropdown panel: bg `#111118`, border `1px solid rgba(240, 235, 227, 0.1)`. Selection via click or arrow keys + Enter. Closes on blur, Escape, or selection. Custom Svelte component — no external library.

Validation: minimum 2 characters, maximum 100. Permitted characters: letters (including Unicode), spaces, commas, periods, hyphens.

#### 7.2.4 Description field: textarea with character limit indicator

Min-height `120px`, `resize: vertical`, `line-height: 1.65`. Transparent background with bottom border per Section 3.4.2.

Character counter: positioned bottom-right, `--type-caption` (Inter 13px), `"X / 1000"` format in `#9A9590`. At 900+ chars: color shifts to `--state-warning` (`#A68B5B`). At 1000: color shifts to `--state-error` and further input is blocked. Updates on every `input` event.

Validation: minimum 10 characters (prevents unusable entries like "wardrobe"). Maximum 1000. HTML tags (`<`, `>`) stripped client-side before submission.

#### 7.2.5 File upload: drag-and-drop zone, multiple files, type validation, size limit, preview thumbnails

Upload zone: full width, min-height `120px`, dashed border `1px dashed rgba(240, 235, 227, 0.2)`, padding `32px 24px`. Default content: Lucide `Upload` icon 32px (`#9A9590`), "Drop files here or click to browse" in `--type-body`, helper "JPG, PNG, PDF, MP4 — up to 10MB each" in `--type-caption`. Drag-over state: border `#C4956A`, bg `rgba(196, 149, 106, 0.04)`. Click triggers a hidden `<input type="file" multiple>`.

Constraints: max 5 files, 10 MB per file, 50 MB total. Accepted MIME types: `image/jpeg`, `image/png`, `image/webp`, `video/mp4`, `video/quicktime`, `application/pdf`.

Preview thumbnails: each file renders as a row — image/video thumbnails at 48×48px (`object-fit: cover`), PDFs show `FileText` icon, videos show `Play` overlay. Filename in `--type-caption` truncated to 30 chars. File size displayed (e.g., "2.4 MB"). Remove button: 16px `X`, `#9A9590` → `#9B5A5A` on hover. Invalid files (wrong type or oversized) display an inline `--state-error` message and are excluded from submission but remain visible until removed.

#### 7.2.6 Name field: single full-name field (no first/last split)

A single input — not split into first/last. Reduces field count and respects name diversity. Placeholder: "Your full name". Validation: 2–80 characters; regex `[\p{L}\s'-]{2,80}` allows Unicode letters, spaces, hyphens, apostrophes. Autocomplete: `autocomplete="name"`.

#### 7.2.7 Email field: standard email validation

Input type `email` with `inputmode="email"` for mobile keyboard optimization. Placeholder: "your@email.com". Validation: RFC 5322 subset — exactly one `@`, domain part with at least one dot, no spaces, minimum 5 characters. Autocomplete: `autocomplete="email"`.

#### 7.2.8 WhatsApp field: phone input with +353 country code default

Input type `tel` with `inputmode="tel"`. Default value: `+353 ` pre-filled. Placeholder: "+353 87 123 4567". Auto-formatting inserts spaces for Irish numbers (`+353 XX XXX XXXX`); no formatting for other prefixes. Validation: 7–15 digits after country code; must start with `+`. The `+353` prefix is removable for international numbers. Basic E.164 length validation applies globally.

---

### 7.3 Form Submission Flow

#### 7.3.1 Client-side validation: real-time with Zod schema

Validation runs client-side via Zod (Section 4.3.4) before any network request. It is **real-time** — errors display on `blur` and clear on `input` once corrected.

**Zod schema:**

```typescript
const projectFormSchema = z.object({
  projectType: z.enum(['residential', 'commercial']),
  location: z.string().min(2).max(100).regex(/^[\p{L}\s',.-]+$/u),
  description: z.string().min(10).max(1000),
  files: z.array(z.instanceof(File)).max(5).optional(),
  fullName: z.string().min(2).max(80).regex(/^[\p{L}\s'-]+$/u),
  email: z.string().email(),
  whatsapp: z.string().min(7).max(20).regex(/^\+[\d\s]{6,19}$/)
});
```

Validation triggers: `blur` validates the field and displays errors; `input` clears errors once valid; submit validates the entire form, scrolls to and focuses the first error if invalid.

**Error display:** Error text below input in `--state-error` (`#9B5A5A`), 13px Inter, `margin-top: 6px`. A `3px` solid left border on the input. Error container has `min-height: 20px` to prevent layout shift.

#### 7.3.2 Submission: POST to Formspree endpoint (no backend)

The form submits to Formspree (form ID stored in `PUBLIC_FORMSPREE_ID`). Formspree is the primary choice: 50 free submissions/month, native file upload via `FormData` multipart POST, built-in spam protection, and webhook support for Google Sheets integration (Section 7.4.3). Backup option: Basin (100 submissions/month).

The submit handler constructs a `FormData` object, appending all fields and files, plus a honeypot field (`website`, empty string). POSTs to `https://formspree.io/f/{FORM_ID}` with `Accept: 'application/json'` header. Analytics event `form_submit` fires on success with `project_type` and `form_duration_seconds` parameters.

#### 7.3.3 Success state: confirmation message with expected response time

On success, form content is replaced with: `CheckCircle2` icon (48px, `--state-success` `#7A8B6F`), "Thank You" headline (`--type-h3`, centered), body text "We've received your project details and will respond within 24 hours" (`--type-body`, max-width `400px`), and caption "A confirmation has been sent to your email" (`--type-caption`, `#9A9590`). A "Close" button (secondary outline style) is centered below. Auto-close after 8 seconds.

#### 7.3.4 Error handling: field-level errors, network error retry, graceful degradation

Field-level errors are handled by Zod. Network errors map to human-friendly messages: timeout (>10s) → "Connection timed out. Please check your internet and try again"; HTTP 4xx → "Please check your entries and try again"; HTTP 5xx → "Our form service is temporarily unavailable. Please try again in a few minutes, or contact us directly via WhatsApp" with a WhatsApp link.

Retry: submit button becomes "Retry", preserving all form data. Max 3 retries. After 3 failures, display a fallback WhatsApp CTA: "Contact us directly on WhatsApp" linking to `https://wa.me/{BUSINESS_NUMBER}?text=Hi, I'd like to discuss a project.`

#### 7.3.5 Anti-spam: honeypot field, rate limiting, optional reCAPTCHA v3

| Layer | Implementation | User Impact |
|---|---|---|
| **Honeypot** | Hidden `website` field (CSS `opacity: 0; pointer-events: none; tabindex="-1"`). Bots fill it; submissions with non-empty value are silently rejected. | None |
| **Rate limiting** | Client-side: 3-second cooldown between submit attempts. Server-side: Formspree limits 20 submissions/hour per IP. | Minimal |
| **reCAPTCHA v3** | Via Formspree's built-in integration. Invisible scoring; triggered only for scores below 0.5. Enable later without code changes. | None |

---

### 7.4 Post-Submission

#### 7.4.1 Email notification: admin alert with all form data and attachments

Formspree sends an email to the admin address on each submission. Subject: `[Áras Living] New Project Inquiry — {projectType} from {fullName}`. All form fields are included in a structured readable format. Uploaded files are attached; Formspree stores files for 30 days on the free tier. Multiple notification recipients are supported via the Formspree dashboard.

#### 7.4.2 Auto-reply: confirmation email to user (optional)

Formspree's auto-responder sends a confirmation to the submitter. Subject: "We received your project inquiry — Áras Living". Body: "Thank you for reaching out about your project. We've received your details and will be in touch within 24 hours. In the meantime, feel free to browse our project gallery at arasliving.ie/projects." This is configured in the Formspree dashboard, not in code. **Recommendation:** Enable it — it confirms receipt, sets expectations, and drives traffic back to the gallery.

#### 7.4.3 Google Sheets integration: new row append via Formspree webhook or Make/Zapier

Pipeline: `Formspree → Webhook → Make → Google Sheets`. A two-module Make scenario: (1) Webhook trigger receiving Formspree POST payload; (2) Google Sheets Append Row. Sheet columns: A: Timestamp, B: Project Type, C: Location, D: Description (truncated to 200 chars), E: Full Name, F: Email, G: WhatsApp, H: File Count, I: Formspree Submission ID, J: File URLs. Make free tier: 1,000 operations/month — sufficient for MVP.

#### 7.4.4 WhatsApp notification: optional admin alert via WhatsApp Business API

Optional post-MVP enhancement: add a WhatsApp module to the Make scenario. Sends a pre-approved template message to the admin's WhatsApp Business account: "New project inquiry from {fullName} ({location}). Project type: {projectType}. Email: {email}. Check your email for full details."

Requires a Meta Developer account and verified WhatsApp Business number. The notification contains only name, location, and project type — never the submitter's email or full phone number. The form and email pipeline operate fully without this layer.


---

## 8. Analytics, Compliance & Integrations

### 8.1 Analytics Setup

#### 8.1.1 Google Analytics 4: page views, events, conversions, custom dimensions

Google Analytics 4 (GA4) serves as the primary analytics platform. All tracking operates under a privacy-first model — no cookies are set without explicit user consent, and all data collection respects the `analytics_storage` consent state managed by the GDPR banner (see Section 8.2).

**Base configuration:**

| Parameter | Value |
|---|---|
| Property type | GA4 (Web) |
| Measurement ID | G-XXXXXXXXXX (provided during deployment) |
| Data stream | Web — all pages |
| Enhanced measurement | Page views (on), Scrolls (off — custom ScrollDepth used), Outbound clicks (on), Site search (off), Form interactions (off — custom events used), Video engagement (on) |
| Data retention | 14 months (events), 2 months (user-level data) |
| IP anonymization | Enabled by default (GA4 does not log IP addresses) |
| Google Signals | Disabled (to avoid cross-site tracking without explicit consent) |
| Ad personalization | Disabled |

**Custom dimensions (user-scoped):**

| Dimension name | Scope | Description | Example values |
|---|---|---|---|
| `consent_analytics` | User | Whether analytics consent was granted | `granted`, `denied` |
| `consent_marketing` | User | Whether marketing consent was granted | `granted`, `denied` |
| `project_interest` | User | Last project category viewed | `dining-tables`, `wardrobes`, `bookcases` |

**Custom dimensions (event-scoped):**

| Dimension name | Scope | Description | Example values |
|---|---|---|---|
| `form_step` | Event | Current form step (1–4) when step_changed fires | `1`, `2`, `3`, `4` |
| `project_slug` | Event | Slug of the project viewed | `ash-dining-table-2024` |
| `filter_category` | Event | Category selected in project filter | `all`, `tables`, `storage`, `seating` |

**GA4 Consent mode implementation:** The site uses Google Consent Mode v2. The default consent state is `denied` for both `ad_storage` and `analytics_storage`. When the user grants analytics consent via the cookie banner, a `gtag('consent', 'update', { analytics_storage: 'granted' })` call is fired, enabling GA4 to begin collecting data. No GA4 script executes before this update occurs.

#### 8.1.2 Meta Pixel: PageView, Lead, Contact events

The Meta Pixel (formerly Facebook Pixel) is deployed for retargeting and conversion tracking. Like GA4, it only loads after the user grants marketing consent.

**Pixel ID:** Provided during deployment. Loaded via the noscript fallback in `<head>` with the `consent="marketing"` attribute for the consent management platform to gate loading.

**Tracked events:**

| Event | Trigger condition | Payload |
|---|---|---|
| `PageView` | Fires on every page load (after consent granted) | Standard page metadata |
| `Lead` | Fires on successful form submission | `{ content_name: 'Project Inquiry' }` |
| `Contact` | Fires when WhatsApp button is clicked | `{ content_name: 'WhatsApp Chat Initiated' }` |

The Meta Pixel script is wrapped in a conditional loader that checks the `marketing_storage` consent state. If consent is denied, the Pixel ID is not initialized and no data reaches Meta servers. The noscript `<img>` fallback must also be gated behind the same consent check.

#### 8.1.3 Key events to track: form opens, form submissions, WhatsApp clicks, project views

The full event tracking list defines every interaction captured across GA4. All events follow GA4's recommended naming convention (`lowercase_with_underscore`).

| Event name | Trigger | GA4 | Meta Pixel | Parameters | Notes |
|---|---|---|---|---|---|
| `page_view` | Automatic on route change | Yes | Yes (as `PageView`) | `page_location`, `page_title`, `page_referrer` | Fires on all route changes in SPA context |
| `scroll_depth` | User scrolls past 25%, 50%, 75%, 90% | Yes | No | `percent_scrolled` | Debounced, fires max once per depth per page |
| `form_open` | User clicks "Discuss a Project" CTA | Yes | No | `cta_location`: `hero`, `nav`, `about`, `footer`, `project_page` | Captures which CTA drove the form open |
| `form_step_changed` | User advances or retreats between form steps | Yes | No | `form_step` (1–4), `direction`: `next` or `back` | Tracks completion funnel |
| `form_submit` | Form passes validation and submits successfully | Yes | Yes (as `Lead`) | `project_type`, `form_duration_seconds` | project_type from Step 1 selection |
| `form_error` | Validation fails or server rejects submission | Yes | No | `error_field`, `error_message` | Does not log user input values for privacy |
| `whatsapp_click` | User clicks any WhatsApp button or link | Yes | Yes (as `Contact`) | `location`: `floating_button`, `form_inline`, `project_page` | See Section 8.3 |
| `project_view` | User navigates to a project detail page | Yes | No | `project_slug`, `project_category` | See Section 5 |
| `project_filter` | User clicks a category filter | Yes | No | `filter_category`: `all`, `tables`, `storage`, `seating` | Resets after 5-second debounce |
| `video_play` | User clicks play on any project video | Yes | No | `project_slug`, `video_duration_seconds` | Also tracks pause and 25%/50%/75%/complete |
| `consent_granted` | User clicks "Accept All" or "Accept Analytics" | Yes | No | `consent_categories`: array of granted categories | Records granular consent choices |
| `consent_denied` | User clicks "Reject All" or closes banner without action | Yes | No | `consent_categories`: `[]` | Records explicit denial |

**Event throttling:** `scroll_depth` and `project_filter` events are debounced at 200ms to prevent flooding the data layer. `video_play` and its progress companions fire at most once per video per session.

#### 8.1.4 Privacy-first analytics considerations

All analytics implementation follows these privacy constraints:

- **No cross-site tracking:** Google Signals, advertising features, and demographic/interest reports are disabled. GA4 collects only aggregated, anonymized behavioral data.
- **No PII in events:** Event parameters never include names, emails, phone numbers, or any form input values. The `form_error` event logs only the field name (e.g., `error_field: "email"`) and generic error type (e.g., `error_message: "invalid_format"`), never the entered value.
- **Consent gating:** Both GA4 and Meta Pixel are blocked by default. Scripts load only after `analytics_storage` or `marketing_storage` consent is granted via the GDPR banner. The consent decision is stored in `localStorage` under `furniture_consent_v1` and persists for 180 days before re-prompting.
- **Data retention:** GA4 is configured for the minimum retention period (14 months for event data, 2 months for user-level data). After this period, data is automatically purged by Google.
- **No third-party cookies:** GA4 operates using first-party cookies only, with the `cookie_flags` parameter set to `SameSite=Lax;Secure`.
- **EU data residency:** GA4 data is processed within the European Economic Area (EEA) where possible. No data is transferred to the US under Privacy Shield.

### 8.2 GDPR Compliance

#### 8.2.1 Cookie consent banner: design, behavior, categories (necessary, analytics, marketing)

The cookie consent banner is the first visual element new visitors encounter. Its design language aligns with the site's luxury aesthetic — it does not look like a generic compliance popup but rather a refined, integrated component.

**Visual design:**

| Element | Specification |
|---|---|
| Position | Bottom-center, floating 24px from viewport bottom |
| Width | 640px on desktop (min-width 320px, max-width 90vw on mobile) |
| Background | `rgba(250, 248, 245, 0.98)` with `backdrop-filter: blur(12px)` |
| Border | 1px solid `#E8E4DF` |
| Border radius | `8px` |
| Box shadow | `0 4px 24px rgba(10, 10, 10, 0.08)` |
| Text color | `#0A0A0A` (primary), `#6B6560` (secondary) |
| Font | Cormorant Garamond 16px / 400 (heading), DM Sans 14px / 400 (body) |
| Animation | Slide-up from `translateY(40px)` to `translateY(0)`, duration 500ms, easing `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| Close button | None — the banner requires an explicit action and cannot be dismissed without choice |

**Content:**

The banner heading reads "Your Privacy Matters" in Cormorant Garamond Italic. The body text explains: "We use cookies to improve your experience. Necessary cookies are always active. You can choose whether to allow analytics and marketing cookies." The body uses DM Sans 14px at `#6B6560`.

Three action buttons are arranged horizontally on desktop, stacked vertically on mobile (`< 640px`):

| Button | Label | Style | Action |
|---|---|---|---|
| Primary | "Accept All" | Background `#0A0A0A`, text `#FAF8F5`, 12px padding vertical, 24px horizontal, border-radius 4px | Grants all consent categories, fires `gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted' })`, records consent timestamp |
| Secondary | "Essential Only" | Background transparent, text `#0A0A0A`, 1px border `#D5CFC9`, same padding | Grants only `necessary` category, denies analytics and marketing, loads no tracking scripts |
| Tertiary | "Customize" | Text-only link, `#6B6560` underline on hover | Expands inline accordion to reveal granular toggles for each cookie category |

**Granular toggle panel (visible after clicking "Customize"):**

| Category | Label | Default state | Description shown |
|---|---|---|---|
| Necessary | "Essential" | Locked ON (no toggle) | "Required for the website to function. Cannot be disabled." |
| Analytics | "Analytics" | OFF | "Helps us understand how visitors use our site so we can improve." |
| Marketing | "Marketing" | OFF | "Allows us to deliver relevant ads and measure their performance." |

Each toggle uses a custom switch component: 40px wide, 20px tall, track color `#D5CFC9` (OFF) / `#0A0A0A` (ON), thumb color `#FAF8F5`, transition 200ms ease. A "Save Preferences" button (same style as primary) appears below the toggles and commits the selected configuration.

**Cookie categories table:**

| Category | Purpose | Cookies / Identifiers | Duration | Controlled by |
|---|---|---|---|---|
| Necessary | Core site functionality: language preference, form progress recovery, consent state, CSRF token | `furniture_lang` (i18n), `furniture_consent_v1` (consent record), `furniture_form_draft` (form autosave), session cookie | `furniture_lang`: 1 year; `furniture_consent_v1`: 180 days; `furniture_form_draft`: 7 days; session: browser session | Cannot be disabled |
| Analytics | Website usage analysis via Google Analytics 4 | `_ga` (GA4 client ID), `_ga_<MEASUREMENT_ID>` (session), `analytics_storage` consent state | `_ga`: 2 years; `_ga_*`: 1 year | Toggle in banner |
| Marketing | Conversion tracking and retargeting via Meta Pixel | `_fbp` (Pixel browser ID), `marketing_storage` consent state | `_fbp`: 3 months | Toggle in banner |

**Banner behavior logic:**

- The banner checks `localStorage` for `furniture_consent_v1` on every page load. If found and not expired (timestamp < 180 days), it does not display.
- If no consent record exists, the banner renders after a 1.5-second delay to avoid blocking the hero section LCP (Largest Contentful Paint).
- The banner is `position: fixed` with `z-index: 9999` and sits above all other UI layers.
- On mobile (`< 640px`), the banner expands to full width minus 16px margin on each side, and buttons stack vertically with 8px gaps.
- After consent is recorded, the banner animates out with a 300ms fade + slide-down to `translateY(40px)` and `opacity: 0`, then removes itself from the DOM.

#### 8.2.2 Privacy Policy: required sections for Irish/EU law

The Privacy Policy is a dedicated page at `/privacy` linked in the site footer. It is written in clear, accessible language — no unnecessary legal jargon. The policy is structured for Irish/EU compliance and covers all required GDPR disclosures.

**Required sections:**

1. **Identity and Contact Details of the Data Controller**
   - Company name, registered address in Ireland, company registration number, contact email (hello@domain.com).

2. **Data Protection Officer (DPO)**
   - Name and contact of the DPO (or statement that the company is not required to appoint one under Article 37, with alternative contact for data protection queries).

3. **Categories of Personal Data Collected**
   - From the contact form: name, email address, phone/WhatsApp number, project type, location, project description.
   - From analytics: anonymized behavioral data (pages visited, scroll depth, click events) — only if analytics consent is granted.
   - From marketing cookies: anonymized cross-site behavior — only if marketing consent is granted.
   - No data is collected from visitors who deny all optional consent.

4. **Purposes and Legal Basis for Processing**
   - **Contract performance (Art. 6(1)(b)):** Processing form submissions to respond to project inquiries and deliver quotes.
   - **Legitimate interest (Art. 6(1)(f)):** Necessary cookies and core site functionality; operational communication with existing clients.
   - **Consent (Art. 6(1)(a)):** Analytics and marketing tracking; any use of data for marketing communications beyond the initial inquiry response.

5. **Recipients or Categories of Recipients**
   - Web hosting provider (form data storage), email service provider (form notification delivery), Google LLC (analytics data — only with analytics consent), Meta Platforms Inc. (conversion data — only with marketing consent).

6. **Transfers to Third Countries**
   - Google and Meta may process data in the US. Standard Contractual Clauses (SCCs) are in place with both providers. The privacy policy references these SCCs and the user's right to request a copy.

7. **Retention Periods**
   - Form submissions: 2 years from last contact (see Section 8.2.5).
   - Analytics data: 14 months (GA4 default, see Section 8.1.1).
   - Marketing data: 3 months (Meta Pixel `_fbp` cookie lifetime).

8. **Data Subject Rights**
   - The right to access, rectify, erase, restrict processing, object, and data portability. Instructions on how to exercise each right (emailing hello@domain.com with subject line "Data Subject Request").

9. **Right to Lodge a Complaint**
   - Contact details for the Data Protection Commission (Ireland): www.dataprotection.ie.

10. **Whether Providing Data is a Statutory or Contractual Requirement**
    - Clarification that form fields are voluntary but necessary for the company to respond to inquiries.

11. **Automated Decision-Making**
    - Statement that no automated decision-making or profiling is performed.

The Privacy Policy page uses the same typographic system as the rest of the site: Cormorant Garamond for section headings, DM Sans for body text. Section headings are `<h2>` elements with 32px top margin. The page includes a "Last Updated" date in the footer of the policy document, updated whenever the policy changes.

#### 8.2.3 Data processing justification: legitimate interest vs consent

Every data processing activity on the site has a defined legal basis under GDPR Article 6.

| Processing Activity | Legal Basis | Justification |
|---|---|---|
| Operating necessary cookies (language, consent record, form draft) | Legitimate interest (Art. 6(1)(f)) | Essential for delivering the service the user explicitly requested. Minimal impact on privacy. |
| Responding to form submissions | Contract performance (Art. 6(1)(b)) | The user initiates a pre-contractual inquiry. Processing is necessary to take steps at the user's request prior to entering a contract. |
| Sending project quotes via email | Contract performance (Art. 6(1)(b)) | Direct continuation of the inquiry. Necessary to fulfill the user's request. |
| Google Analytics 4 tracking | Consent (Art. 6(1)(a)) | Not necessary for service delivery. User must opt in via cookie banner. |
| Meta Pixel conversion tracking | Consent (Art. 6(1)(a)) | Not necessary for service delivery. Used for marketing measurement only. |
| Storing form submission data for 2 years | Legitimate interest (Art. 6(1)(f)) | Enables follow-up communication, quality assurance, and dispute resolution. Balanced against user rights with clear retention limits. |

The legitimate interest assessment (LIA) for the 2-year retention of form data weighs the company's operational need (managing long sales cycles typical of custom furniture projects) against the user's privacy rights. The data is limited to what is necessary (name, contact, project description), stored securely, and deletion is available on request at any time.

#### 8.2.4 Right to erasure: process for data deletion requests

The site provides a clear, accessible mechanism for users to request deletion of their personal data.

**Request channels:**

- **Primary:** Email to `hello@domain.com` with subject line "Data Subject Request — Right to Erasure"
- **Secondary:** Postal mail to the registered business address (listed on `/privacy`)

**Handling process:**

| Step | Action | Timeline |
|---|---|---|
| 1. Receipt | Automated acknowledgment email sent to requester confirming receipt of the request | Within 24 hours |
| 2. Identity verification | If the requester is a known contact (matched by email in form submissions), the request is authenticated by email address. If not, a follow-up email requests proof of identity | Within 48 hours |
| 3. Data identification | All records associated with the verified identity are located: form submission entries, any related email correspondence, any CRM records | Within 5 business days |
| 4. Deletion execution | All identified personal data is permanently deleted from the database, email inboxes, and any backup systems. Anonymized analytics data (which cannot be linked to an individual) is retained | Within 20 calendar days of receipt |
| 5. Confirmation | Written confirmation sent to the requester listing what data was deleted and from which systems | Within 25 calendar days of receipt |

The 30-day statutory response window under GDPR Article 12(3) is the outer limit. The target is completion within 25 calendar days. If the request is complex or numerous, the response may be extended by two months with written explanation to the requester.

Form submissions are stored in a database table with a `deleted_at` timestamp field. Deletion requests set this field rather than hard-deleting records, preserving the anonymized transaction log (submission date, project type) for business accounting while removing all personal identifiers.

#### 8.2.5 Data retention policy: form submission retention periods

| Data Type | Retention Period | Trigger for Deletion | Storage Location |
|---|---|---|---|
| Form submission (active lead) | 2 years from date of submission or last contact | No activity for 2 years | Primary database |
| Form submission (converted to project) | Duration of project + 2 years | Project completion date + 2 years | Primary database + CRM |
| Form submission (deleted on request) | Immediate upon verified request | Data subject erasure request received | Soft-delete with `deleted_at` timestamp |
| Email notifications (form alerts) | 90 days | Automatic purge after 90 days | Email service provider inbox |
| Analytics data (GA4) | 14 months | Automatic GA4 data retention expiry | Google Analytics servers |
| Marketing data (Meta Pixel) | 3 months | Cookie expiry | Meta servers |
| Form draft (localStorage) | 7 days | Automatic browser expiry or successful form submission | User's browser only |
| Consent records | 180 days | Consent re-prompted after expiry | localStorage + server log |

A monthly automated job reviews all form submissions. Records with `last_contact_at` older than 2 years and no associated active project trigger a soft-delete (anonymization). An annual manual audit confirms the automated process is functioning correctly.

### 8.3 WhatsApp Integration

#### 8.3.1 WhatsApp Business CTA: floating button and inline links

The WhatsApp integration provides two touchpoints for visitors to initiate conversation.

**Floating button:**

| Element | Specification |
|---|---|
| Position | Bottom-right, 24px from right edge, 96px from bottom (sits above the cookie banner when visible, otherwise 24px from bottom) |
| Size | 56px diameter circle |
| Background | `#25D366` (WhatsApp brand green) |
| Icon | WhatsApp logo, 28px, white `#FFFFFF` |
| Border radius | `50%` |
| Box shadow | `0 2px 12px rgba(37, 211, 102, 0.3)` |
| Hover state | Scale to 1.08, box-shadow expands to `0 4px 20px rgba(37, 211, 102, 0.4)`, transition 200ms ease |
| Animation | Slides in from right (`translateX(80px)` to `translateX(0)`) after 3-second page load delay; duration 400ms, easing `cubic-bezier(0.34, 1.56, 0.64, 1)` (spring-like overshoot) |
| Scroll behavior | Fixed position, always visible on scroll |
| z-index | 50 (below cookie banner at 9999) |
| Label | None — icon-only for minimal visual footprint |

The floating button is hidden on pages where it would conflict with the primary CTA flow: the form success page (where a direct "Send us a message on WhatsApp" inline link is provided instead) and any fullscreen overlay states.

**Inline links:** WhatsApp links also appear in two inline locations: (1) within the contact form on Step 4 (file upload step), displayed as a text link reading "Prefer to chat on WhatsApp?" in `#6B6560` with the WhatsApp icon prefix, and (2) on the project detail pages, positioned below the project description as a secondary action: "Discuss this project on WhatsApp".

All WhatsApp links use `target="_blank"` and `rel="noopener noreferrer"`.

#### 8.3.2 Click-to-chat API: pre-filled message template

All WhatsApp links use the WhatsApp Click to Chat API (`https://wa.me/<number>`) with a pre-filled message parameter.

**URL format:**
```
https://wa.me/353XXXXXXXXX?text=Hello%21%20I%27m%20interested%20in%20discussing%20a%20custom%20furniture%20project.
```

**Pre-filled message (English):** `Hello! I'm interested in discussing a custom furniture project.`

The message is URL-encoded and passed via the `?text=` query parameter. When the user clicks the link, WhatsApp opens (web or native app) with the message already populated in the chat input field, ready to send.

On project detail pages, the pre-filled message is customized to reference the specific project:

**Project-specific message:** `Hello! I'm interested in the [Project Name] project. I'd love to discuss something similar.`

The project name is dynamically inserted from the project data. The message is truncated at 200 characters if the project name is exceptionally long.

**Tracking:** Every WhatsApp link click fires the `whatsapp_click` event (see Section 8.1.3) with a `location` parameter identifying the source of the click.

#### 8.3.3 WhatsApp Business account setup guidance

The following setup steps are required before deployment:

1. **Create a WhatsApp Business account** using the WhatsApp Business app (mobile) or WhatsApp Business Platform (API). A phone number dedicated to business use is required — do not use a personal WhatsApp number.
2. **Verify the business profile** with a complete business name, address (Ireland), website URL, business hours, and category ("Furniture Store" or "Custom Furniture Maker").
3. **Obtain the business phone number** in international format: `+353` followed by the Irish number without leading zero.
4. **Set up away messages** and greeting messages in the WhatsApp Business app to manage customer expectations when the business is not immediately responsive.
5. **Add the number to the site configuration** as the `WHATSAPP_NUMBER` environment variable. This number is used in all `wa.me` links site-wide.

### 8.4 Email Setup

#### 8.4.1 Business email: professional domain email (hello@, info@)

The site uses domain-anchored professional email addresses to reinforce brand credibility.

| Email Address | Purpose | Displayed publicly |
|---|---|---|
| `hello@domain.com` | Primary contact, form replies, client communication | Yes — footer, contact section, Privacy Policy |
| `info@domain.com` | General inquiries, press, partnership requests | Yes — footer secondary |
| `noreply@domain.com` | Automated system emails (form confirmations) | No — used only as sender address |

Email is delivered through a professional email hosting provider (Google Workspace or Microsoft 365 recommended). SPF, DKIM, and DMARC records must be configured on the domain's DNS to ensure form notification emails do not land in spam folders.

#### 8.4.2 Form notification routing: primary and backup recipients

When a visitor submits the "Discuss a Project" form, the following email delivery occurs:

| Recipient | Address | Timing | Content |
|---|---|---|---|
| Primary | `hello@domain.com` | Immediate (< 30 seconds) | Full form submission: name, email, phone, project type, location, description, file attachment links |
| Backup | `info@domain.com` | Immediate (< 30 seconds) | Identical copy as redundancy against primary inbox failure |
| Auto-reply (visitor) | Submitter's email | Immediate (< 60 seconds) | Confirmation: "Thank you for your inquiry. We've received your project details and will respond within 48 hours." |

**Email format:** All form notification emails use a clean, branded HTML template matching the site's visual identity — `background: #FAF8F5`, Cormorant Garamond for the greeting, DM Sans for form field labels and values. No external images are embedded (to avoid spam filtering). The template includes the business logo rendered as text ("Atelier" in Cormorant Garamond Italic).

**File attachments:** If the visitor uploaded files, they are stored on the server and delivered as secure download links in the notification email (not as direct attachments, to prevent large email rejection). Links expire after 30 days.

**Failure handling:** If the primary SMTP server is unreachable, the system attempts delivery via the backup SMTP endpoint (a secondary email provider). If both fail, the submission is flagged in the database with `email_delivered: false` and an alert is logged for manual review. Form data is never lost — all submissions are persisted in the database regardless of email delivery status.


---

## 9. Internationalization Strategy

### 9.1 i18n Architecture

#### 9.1.1 Framework: svelte-i18n with JSON Translation Files

The project uses `svelte-i18n` (v3.7.4 or later) as the core internationalization framework. This is the de facto standard for Svelte/SvelteKit applications with a stable API, SSR compatibility, and active maintenance.

Translation data is stored in per-locale JSON files located at `src/lib/i18n/locales/{locale}.json`. At launch, only `en.json` contains active content. Placeholder files (`fr.json`, `de.json`, `es.json`, `pl.json`) are created with empty objects `{}` as structural stubs for future population.

The library is initialized in `src/lib/i18n/index.js`:

```javascript
import { register, init, getLocaleFromNavigator } from 'svelte-i18n';
import { browser } from '$app/environment';

register('en', () => import('./locales/en.json'));
register('fr', () => import('./locales/fr.json'));
register('de', () => import('./locales/de.json'));
register('es', () => import('./locales/es.json'));
register('pl', () => import('./locales/pl.json'));

init({
  fallbackLocale: 'en',
  initialLocale: browser ? getLocaleFromNavigator() : 'en'
});
```

This module is imported once at app entry (`src/routes/+layout.svelte`) to ensure the i18n store is available across all pages and components. Lazy-loading via `register()` ensures only the active locale's JSON is fetched at runtime, keeping initial bundle size minimal.

#### 9.1.2 Locale Structure

The application supports the following locale codes and regional configurations:

| Code | Language | Region | Currency | Date Format | Status |
|------|----------|--------|----------|-------------|--------|
| `en` | English | Ireland (default) | EUR | DD/MM/YYYY | Active — launch |
| `fr` | French | Canada (Quebec) | CAD | YYYY-MM-DD | Phase 2 |
| `de` | German | Germany | EUR | DD.MM.YYYY | Phase 2 |
| `fr` | French | France | EUR | DD/MM/YYYY | Phase 3 |
| `es` | Spanish | Spain | EUR | DD/MM/YYYY | Phase 3 |
| `pl` | Polish | Poland | EUR | DD.MM.YYYY | Phase 3 |

The `en` locale is hardcoded as the fallback. The `de` and `fr` codes are reused across regions (Germany and France share `fr` with Quebec), but content differentiation is handled through locale-specific JSON file variants if needed — e.g., `fr-CA.json` versus `fr-FR.json` — or through region overrides within the same file. For Phase 2, `fr` targets Quebec exclusively; a separate `fr-FR` file is created only when France enters Phase 3.

The `$locale` store from `svelte-i18n` drives all reactive UI updates. When the locale changes, all `$t()` and `$format()` calls re-render automatically without page reload.

#### 9.1.3 URL Strategy

All routes live under `src/routes/[[lang]]/`, where `lang` is an optional path parameter. The double-bracket notation `[[lang]]` makes the segment optional — the route matches both `/` and `/en/`, `/fr/`, etc.

Routing behavior is defined as follows:

- **Root `/`**: The server responds with a 302 redirect to `/en/`. This redirect is handled at the edge (CDN level if possible, otherwise in `src/routes/+page.server.js` via `redirect(302, '/en/')`). No content renders at the root path.
- **Language prefix `/en/`**: Renders the English locale. This is the canonical URL for all Ireland-launch content.
- **Future prefixes `/fr/`, `/de/`**: Render their respective locales once Phase 2 translation files are populated and the locale switcher is enabled.
- **Invalid prefix** (e.g., `/it/` where Italian is unsupported): Returns a 404. No fallback or auto-detection occurs for unsupported language codes.

Locale detection follows a strict priority order:

1. **URL path**: The `lang` segment is authoritative. If the URL is `/de/contact`, the German locale loads regardless of browser settings.
2. **Browser preference**: On first visit to `/`, the redirect target (`/en/` or `/fr/`) is determined by `Accept-Language` header. If the header contains `fr-CA`, the user is redirected to `/fr/`. If it contains `de`, to `/de/`. If no match, to `/en/`.
3. **Default fallback**: `en` in all other cases.

This order is implemented in `src/routes/+page.server.js` for the root redirect, and in `src/routes/[[lang]]/+layout.server.js` for subsequent page loads.

#### 9.1.4 Translation Key Organization

Translation keys follow a dot-notation hierarchy organized by page and component. This structure prevents key collisions, enables partial loading if needed in the future, and makes the JSON files scannable for translators.

Key naming convention: `{page_or_section}.{element}.{property}`

Example structure from `en.json`:

```json
{
  "nav": {
    "home": "Home",
    "collection": "Collection",
    "craft": "Craft",
    "contact": "Contact"
  },
  "hero": {
    "headline": "Furniture That Outlasts Trends",
    "subhead": "Handcrafted in Ireland. Built for generations.",
    "cta_primary": "Explore the Collection",
    "cta_secondary": "Meet the Maker"
  },
  "collection": {
    "page_title": "Collection",
    "filter_all": "All Pieces",
    "filter_tables": "Tables",
    "filter_seating": "Seating",
    "detail_material": "Material",
    "detail_finish": "Finish",
    "detail_lead_time": "Lead Time"
  },
  "contact": {
    "page_title": "Contact",
    "form_name_label": "Full Name",
    "form_name_placeholder": "Your name",
    "form_email_label": "Email",
    "form_message_label": "Message",
    "form_submit": "Send Enquiry",
    "phone_display": "+353 87 123 4567",
    "address_line1": "The Workshop",
    "address_line2": "Kinsale, Co. Cork",
    "address_country": "Ireland"
  },
  "footer": {
    "copyright": "© {year} — All rights reserved.",
    "privacy_link": "Privacy"
  }
}
```

Keys are grouped into four top-level namespaces: `nav` (shared navigation), `hero`, `collection`, `contact` (page-specific), and `footer` (shared). Interpolation (e.g., `{year}` in the copyright string) uses `svelte-i18n`'s built-in variable substitution: `$t('footer.copyright', { values: { year: 2025 } })`.

No nested components deeper than three levels. All keys use `snake_case`. Every user-facing string in the application must exist in this file — no hardcoded text in Svelte components.

---

### 9.2 Content Strategy for i18n

#### 9.2.1 Minimal Text Approach: Benefits for Translation

The site's content strategy deliberately minimizes the total volume of translatable text. The full `en.json` file at launch contains fewer than 120 keys and approximately 1,800 words. This is not a content-heavy editorial site — it is a product showcase where visual assets carry the communication load.

This minimal-text approach delivers three direct benefits for internationalization:

1. **Reduced translation cost**: Professional translation for the full site into French or German requires translating ~1,800 words, not 10,000+. At standard agency rates (EUR 0.12–0.18 per word), each new language costs roughly EUR 220–320 for the full site copy.
2. **Faster time-to-market for new locales**: A translator can complete the full French or German JSON file in 1–2 business days. No complex CMS workflows, no content migration, no string-by-string review across dozens of pages.
3. **Lower maintenance overhead**: When copy changes (e.g., a headline update, a new contact phone number), the diff is small and easy to propagate across all locale files. There is no risk of pages falling out of sync because they share a single source of truth.

#### 9.2.2 Visual-First Content: Reducing Translation Dependency

The design system is built around large-format photography, material texture close-ups, and product hero videos. Product names (e.g., "The Kinsale Table", "The Bandon Bench") are proper nouns and remain unchanged across all locales. Descriptions are limited to 2–3 short material or dimension lines.

The following elements are **non-translatable by design**:

- Product names: proper nouns, fixed strings
- Wood species labels: "Walnut", "Oak", "Ash" — these are material identifiers used in the workshop and recognized internationally
- Dimension values: always numeric (e.g., `2400 × 1000 × 750 mm`)
- Photography captions: none exist; images speak without text
- Video content: no voiceover or on-screen text; ambient sound only

The following elements **require translation** and are stored in JSON:

- Navigation labels
- Hero headlines and CTAs
- Form labels, placeholders, and button text
- Footer legal links and copyright
- Contact information (phone, address) — locale-specific values per region
- Error and success messages (form validation, 404 page)

#### 9.2.3 Locale-Specific Considerations

Each target region requires localized formatting for contact details, dates, and addresses. These are not just display preferences — they signal local presence and legal compliance.

**Date formatting**: `svelte-i18n` integrates with `Intl.DateTimeFormat`. The format object is configured per locale:

| Locale | Date Format | Example | `Intl` locale |
|--------|-------------|---------|---------------|
| `en` (IE) | DD/MM/YYYY | 15/06/2025 | `en-IE` |
| `fr` (CA) | YYYY-MM-DD | 2025-06-15 | `fr-CA` |
| `de` | DD.MM.YYYY | 15.06.2025 | `de-DE` |

**Phone numbers**: Each locale displays a region-specific contact number. These are stored as discrete translation keys (not formatted through a library), since the actual number changes per market:

| Market | Display Phone | Key path |
|--------|--------------|----------|
| Ireland | +353 87 123 4567 | `contact.phone_display` |
| Canada | +1 514 555 0199 | `contact.phone_display` |
| Germany | +49 89 555 0187 | `contact.phone_display` |

**Address format**: The contact section address block is fully localized per region. Irish addresses use the standard two-line + county format. German addresses follow `Street + Number, Postal Code + City` structure. These are stored as complete strings in the locale JSON rather than assembled from parts, because address formatting rules differ too much across cultures to be componentized.

**Currency display**: Prices are displayed as text strings (e.g., "From EUR 4,200") and are not subject to real-time conversion or transaction processing. Each locale JSON contains the appropriate currency symbol and formatting convention. The `Intl.NumberFormat` API with `style: 'currency'` handles formatting when the site moves to dynamic pricing in later phases.

---

### 9.3 Expansion Roadmap

#### 9.3.1 Phase 1: English Only (Ireland Launch)

At launch, the site operates as a single-locale English application. The i18n infrastructure is fully wired but only `en.json` contains data. All placeholder locale files exist as empty stubs.

Deliverables for Phase 1:

- `en.json` fully populated with all site copy
- `fr.json`, `de.json`, `es.json`, `pl.json` created as `{}`
- Root `/` redirecting to `/en/`
- `$locale` store initialized to `'en'` on every page load
- `hreflang` tags rendering only `<link rel="alternate" hreflang="en" href="..." />` and `<link rel="alternate" hreflang="x-default" href="..." />`
- Locale switcher UI component exists in source but is not rendered (commented out or hidden behind a feature flag)

#### 9.3.2 Phase 2: French (Canada Quebec) and German (EU Central)

Phase 2 adds two locales simultaneously. This requires translated JSON files, regional content customization, and UI enablement.

Deliverables for Phase 2:

- `fr.json` populated with Quebec French translation (contracted translator, 1–2 days turnaround)
- `de.json` populated with High German translation
- `contact.phone_display` updated to `+1 514 555 0199` in `fr.json`, `+49 89 555 0187` in `de.json`
- `contact.address_*` keys updated to Montreal and Munich addresses respectively
- Currency string updated to `CAD` in `fr.json`, `EUR` in `de.json`
- Root `/` redirect updated to read `Accept-Language` and route `fr` and `de` visitors appropriately
- `hreflang` tags expanded to include `fr` and `de` entries
- Locale switcher UI enabled: a minimal language toggle in the header (desktop) or footer (mobile) showing language codes (`EN | FR | DE`)
- Sitemap updated to include `/fr/` and `/de/` route trees

#### 9.3.3 Phase 3: Full EU Language Coverage

Phase 3 expands to France, Spain, and Poland. This is a scaled repetition of the Phase 2 workflow.

Deliverables for Phase 3:

- `fr-FR.json` created (distinct from `fr-CA.json` if Quebec and France diverge in copy or contact details)
- `es.json` populated with Castilian Spanish translation
- `pl.json` populated with Polish translation
- Regional contact details updated for each locale file
- Locale switcher expanded to include all six options: `EN | FR | DE | ES | PL`
- `hreflang` tags updated for all supported locales
- SEO metadata translated per locale (page titles, meta descriptions)

#### 9.3.4 Technical Preparation: hreflang Tags and Locale Switcher UI Placeholder

Two pieces of i18n infrastructure are implemented in Phase 1 but remain dormant until Phase 2:

**hreflang tags**: Implemented in `src/routes/[[lang]]/+layout.svelte` as a reactive `<svelte:head>` block. At Phase 1, it renders only the `en` and `x-default` entries. The loop iterates over a `supportedLocales` array defined in `src/lib/config.js`:

```javascript
export const supportedLocales = ['en']; // Expand to ['en', 'fr', 'de'] in Phase 2
```

The hreflang block generates one `<link rel="alternate">` per supported locale plus one `x-default` pointing to `/en/`. Canonical URLs always include the language prefix (`/en/contact`, `/fr/contact`).

**Locale switcher UI**: A `LocaleSwitcher.svelte` component is built in Phase 1 and imported into the header layout, but its rendering is controlled by `{#if $showLocaleSwitcher}` where `showLocaleSwitcher` is a boolean store initialized to `false`. Flipping this store to `true` (manually or via a feature-flag config) reveals the switcher instantly. The component displays language codes as text links, styled in the site's secondary typeface (Inter, 14px, weight 400). The active locale is indicated by `opacity: 1.0`; inactive locales at `opacity: 0.5`. Hover state transitions opacity over `150ms ease`.

The following table summarizes the full expansion timeline:

| Phase | Timeline | Locales Added | Markets | Effort |
|-------|----------|---------------|---------|--------|
| Phase 1 | Launch (Month 0) | `en` | Ireland | Baseline — i18n infra built, one locale active |
| Phase 2 | Month 3–4 | `fr` (Quebec), `de` | Canada (Quebec), Germany | 2 translators, 1 week dev + QA, enable locale switcher |
| Phase 3 | Month 6–9 | `fr` (France), `es`, `pl` | France, Spain, Poland | 3 translators, 1 week dev + QA, expand hreflang |

The i18n architecture is designed so that adding a new locale in any phase requires only: (1) populating a new JSON file, (2) adding the locale code to `supportedLocales`, (3) updating regional contact/currency strings, and (4) verifying SEO metadata. No routing changes, no component rewrites, and no structural modifications are needed after Phase 1.


---

## 10. Content Requirements & Asset List

### 10.1 Image Assets

Every image on the site serves a functional purpose — establishing atmosphere, demonstrating craft quality, or guiding navigation. No decorative stock images or generic lifestyle scenes are permitted. All images must be captured specifically for the project or sourced from factory/manufacturer partners with documented quality standards.

#### 10.1.1 Hero Images/Videos: Specifications and Quantity Per Page

The following table specifies hero asset requirements for every page:

| Page | Asset Type | Dimensions | Format | Specs | Quantity |
|------|-----------|------------|--------|-------|----------|
| Home | Video loop | 1920×1080 | MP4 H.264 + WebM VP9 | 10–15s loop, 5–8 Mbps, no audio, atmospheric craft focus | 1 |
| About | Image | 2400×1600 | WebP (JPEG fallback) | Landscape, warm tones, workshop or material texture | 1 |
| Services | Image | 2400×1350 | WebP | Dramatic craft detail or wide workshop shot | 1 |
| Projects | Image | 2400×1350 | WebP | Finished project hero, high-end residential interior | 1 |
| Contact | Image | 2400×1350 | WebP | Subtle atmospheric, muted tones | 0–1 (optional) |

All hero images must be minimum 2400px on the longest edge to support retina displays. Preferred aspect ratio: 16:9. Images are cropped via `object-fit: cover`. Required quality: sRGB color space, 8-bit, professionally color-corrected, no compression artifacts, model/property releases obtained.

#### 10.1.2 Project Photography: Required Shots Per Project

Each project requires a standardized photography package. Projects without 5+ quality images are held back for Phase 2.

**Required shot list per project:**

| Shot Category | Count | Priority | Description |
|---------------|-------|----------|-------------|
| Wide establishing | 1–2 | Required | Full room showing furniture in context |
| Primary detail | 2–3 | Required | Close-up of signature element (joint, surface, hardware) |
| Secondary detail | 1–2 | Required | Texture, material grain, finish quality |
| Function/usage | 1–2 | Optional | Open drawer, extended mechanism, lit interior |
| Wide architectural | 1 | Optional | Integration with architecture and proportions |

**Photography specs:** Minimum 2400px longest edge (3600px preferred), 3:2 or 4:3 ratio, natural or controlled lighting, spaces clean and styled, no work-in-progress shots. Post-processing: color-corrected, exposure-balanced, lens-distortion corrected.

**Launch requirement:** 6 residential + 2 commercial = 8 total projects minimum. 12+ is ideal. Projects in production should be scheduled for photography 2–3 weeks before launch.

#### 10.1.3 Team Photos: Headshots, Specs

Team section is **deferred to Phase 2**. If included at launch: square crop 800×800px (1600×1600px preferred), consistent neutral background (`#F5F5F0`) or workshop shallow DOF, soft even lighting, natural expression with direct eye contact, WebP with PNG fallback.

#### 10.1.4 Brand Assets: Logo Variants, Favicon, Social Share Image

| Asset | Formats | Dimensions | Notes |
|-------|---------|------------|-------|
| Primary logo (dark) | SVG, PNG | Variable SVG, 1200×400 PNG | Light backgrounds |
| Primary logo (light) | SVG, PNG | Variable SVG, 1200×400 PNG | Dark/image backgrounds |
| Monogram / icon | SVG, PNG | 512×512 | Favicon source, small-space usage |
| Favicon package | ICO, PNG | 32×32, 180×180 | Multi-resolution package |
| Social share image | PNG, JPEG | 1200×630 | Open Graph / Twitter Card default |
| Logo clear space | — | 0.5× logo height | Minimum spacing on all sides |

SVGs must be cleaned of unnecessary paths; PNGs run through lossless compression. Monogram must remain legible at 32×32px.

#### 10.1.5 UI Icons: Lucide Icon Set, Consistent Sizing

All functional icons use the Lucide React icon set exclusively.

- **Default:** 24×24px, stroke-width 1.5px
- **Navigation:** 20×20px, stroke-width 1.5px
- **Inline:** 16×16px, stroke-width 1.5px
- **Large feature:** 48×48px, stroke-width 1px
- **Color:** `currentColor`, hover `opacity: 0.7`, 200ms ease transition

No icon set mixing. Missing icons are custom-drawn following Lucide conventions.

### 10.2 Video Assets

#### 10.2.1 Factory-Provided Content: Catalog and Licensing

The factory partner provides production facility and material photographs for Home, About, and Services pages. Before use, confirm these licensing terms in writing:

| Term | Required |
|------|----------|
| License scope | Non-exclusive minimum |
| Duration | Perpetual preferred |
| Territory | No geographic restrictions |
| Modifications | Color grading and cropping permitted |
| Attribution | Confirm if credit line required |
| Resolution | Minimum 1920px deliverable |

Expected quantity: 20–40 usable images. All factory images are reviewed against lighting, resolution, and compositional standards before acceptance.

#### 10.2.2 Hardware Manufacturer Videos: Hettich, Blum, Grass — Usage Rights

Hardware mechanism videos demonstrate product quality without custom production costs.

| Manufacturer | Content | Access | Licensing |
|-------------|---------|--------|-----------|
| Hettich | Mechanism demos, product overviews | Partner portal / press download | Usually free with logo credit |
| Blum | Motion clips, installation demos | Media database (registration) | Free for authorized partners |
| Grass | Drawer system animations | Regional distributor | Verify through local rep |

**Action items:** Confirm hardware brands used, register for media access, download highest-quality MP4 (minimum 1080p), confirm usage rights in writing. Required: 3–5 mechanism demonstration clips, 10–30 seconds each. Total hardware video runtime on site: under 2 minutes. Videos are embedded inline (not auto-play) on Services and Project detail pages.

#### 10.2.3 Custom Video Production: Shot List for Videographer

**Home hero video — shot list:**

| Shot | Description | Duration | Camera |
|------|-------------|----------|--------|
| 1 | Saw blade entering timber, macro | 3–4s | Static or micro-slide |
| 2 | Hand guiding wood through machine, mid | 3–4s | Slow lateral tracking |
| 3 | Wood grain texture, raking light, ECU | 2–3s | Static |
| 4 | Dust particles in shaft of light | 3–4s | Static, silhouette |
| 5 | Finished joint detail, slow reveal | 3–4s | Micro-pan or rack focus |

**Production specs:** 10–15s edited loop, 1920×1080 minimum (4K source preferred), 24fps, ProRes 422 HQ source, graded Rec.709 delivery, no audio, seamless loop (matching first/last frames).

**Detail clips (2–3 additional):** Drawer soft-close side angle, wardrobe interior slow open, sliding door full travel — 8–12s each for Services and Project pages.

#### 10.2.4 Video Editing Requirements: Color Grading, Speed, Format Conversion

**Color grading:** Warm neutral palette, slightly desaturated, lifted shadows, controlled highlights, no crushed blacks, consistent 5500K white balance, no visible noise or banding.

**Speed:** Hero loop slow and contemplative; mechanism clips real-time or 0.75× for smoothness emphasis; all camera movement uses ease-in/ease-out.

**Format conversion:**

| Format | Codec | Bitrate | Purpose |
|--------|-------|---------|---------|
| MP4 | H.264 | 5–8 Mbps | Primary, universal compatibility |
| WebM | VP9 | 4–6 Mbps | Modern browsers, 30–50% smaller |

Deliver both formats; source WebM with MP4 fallback via `<video>` element. Per-page video payload must not exceed 15MB. Each video requires a hand-selected poster frame (WebP, 1920×1080).

### 10.3 Copy & Text Content

The site follows a minimal text philosophy — every word is functional. Total text budget: ~1,800 words across all pages.

#### 10.3.1 Home Page Copy: All Headlines, Body Text, CTAs

| Section | Element | Text / Target | Max Length |
|---------|---------|---------------|------------|
| Hero | Headline | "Custom Furniture. Built to Last." | 40 chars |
| Hero | CTA | "Explore Our Work" | 20 chars |
| Brand intro | Label | "Since [YEAR]" | 15 chars |
| Brand intro | Body | 2 sentences on craft philosophy | 200 chars |
| Brand intro | CTA | "About Us" | 10 chars |
| Services | Heading | "What We Do" | 15 chars |
| Services | Labels | "Residential", "Commercial", "Custom Projects" | 18 chars max |
| Projects | Heading | "Selected Work" | 15 chars |
| Projects | CTA | "View All Projects" | 20 chars |
| Testimonials | Heading | "Client Words" | 15 chars |
| Testimonials | Quotes | 2–3 sentences each (client-provided) | 300 chars each |
| Testimonials | Attribution | Name, project type, year | 60 chars |

**Home page target:** ~400 words total including navigation, CTAs, and footer.

#### 10.3.2 About Page: Brand Story Narrative

Three short sections:

- **"Our Story"** — 3–4 sentences on founding, years in operation, core values. Target: 100 words.
- **"How We Work"** — 3–4 sentences on process, materials, quality standards. Target: 100 words.
- **"The People"** (Phase 2) — 1 sentence per team member. Target: 50 words.

**About page target:** ~500 words.

#### 10.3.3 Services: Service Descriptions

| Service | Heading | Body Target |
|---------|---------|-------------|
| Residential | "Residential Interiors" | 80–100 words — wardrobes, kitchens, closets, living |
| Commercial | "Commercial Spaces" | 80–100 words — offices, retail, hospitality, custom |
| Custom | "Bespoke Projects" | 60–80 words — one-off commissions, collaborations |
| Process | "Our Process" | 4 step descriptions × 20 words each |

**Services page target:** ~500 words.

#### 10.3.4 Legal Pages: Privacy Policy, Terms Template

| Page | Source | Adaptation |
|------|--------|------------|
| Privacy Policy | GDPR/CCPA template | Company name, contact, form data collection, cookies |
| Terms of Service | Standard template | Company name, jurisdiction, service descriptions |

Legal pages are excluded from the word count target. Client reviews and approves all legal text; developer provides templates only.

### 10.4 Client Deliverables Checklist

#### 10.4.1 Immediate Needs for MVP Launch

| # | Asset | Format | Deadline | Owner | Notes |
|---|-------|--------|----------|-------|-------|
| 1 | Company name (final) | Text | Week 1 | Client | Confirm spelling and legal vs. trade name |
| 2 | Year established | Text | Week 1 | Client | For brand intro section |
| 3 | Logo — primary dark | SVG + PNG | Week 2 | Client/Designer | For light backgrounds |
| 4 | Logo — primary light | SVG + PNG | Week 2 | Client/Designer | For dark/image backgrounds |
| 5 | Logo — monogram | SVG + PNG 512² | Week 2 | Client/Designer | Favicon and small-space usage |
| 6 | Favicon package | ICO + PNG | Week 2 | Designer | Multi-resolution from monogram |
| 7 | Social share image | PNG 1200×630 | Week 3 | Designer | Open Graph / Twitter Card |
| 8 | Home hero video | MP4 + WebM 1080p | Week 4 | Videographer | 10–15s atmospheric loop |
| 9 | Hero poster frame | WebP 1920×1080 | Week 4 | Photographer | Matching still frame |
| 10 | Factory image archive | JPEG/RAW ≥1920px | Week 2 | Client/Factory | 20–40 production images |
| 11 | Project 1 photos | WebP, 5–8 images | Week 3 | Photographer | Residential, completed |
| 12 | Project 2 photos | WebP, 5–8 images | Week 3 | Photographer | Residential, completed |
| 13 | Project 3 photos | WebP, 5–8 images | Week 4 | Photographer | Residential or commercial |
| 14 | Project 4 photos | WebP, 5–8 images | Week 4 | Photographer | Residential or commercial |
| 15 | Project 5 photos | WebP, 5–8 images | Week 5 | Photographer | Commercial preferred |
| 16 | Project 6 photos | WebP, 5–8 images | Week 5 | Photographer | Any type |
| 17 | Hardware demo videos | MP4 1080p | Week 4 | Client/Designer | 3–5 mechanism clips |
| 18 | Video licensing docs | Written confirmation | Week 4 | Client | Manufacturer permissions |
| 19 | Service category images | WebP, 9 images | Week 5 | Photographer | 5 residential + 4 commercial |
| 20 | Process step images | WebP, 4 images | Week 5 | Photographer | Consult → Design → Build → Install |
| 21 | Brand story images | WebP, 2–3 images | Week 5 | Photographer | Workshop, materials, craft |
| 22 | Testimonials | Text + photo | Week 5 | Client | 2–3 quotes with name/project/year |
| 23 | Home page copy | Text document | Week 3 | Client/Copywriter | Headlines, body, CTAs |
| 24 | About page copy | Text document | Week 4 | Client/Copywriter | Brand story narrative |
| 25 | Services copy | Text document | Week 4 | Client/Copywriter | Descriptions and process steps |
| 26 | Contact details | Text | Week 1 | Client | Address, phone, email, hours |
| 27 | Legal review | Approved text | Week 6 | Client | Privacy policy and terms approval |

**Critical path:** Week 1–2 items (name, logo, contact details) block all template work. Project photography has the longest lead time and determines the launch date.

#### 10.4.2 Phase 2 Assets (Post-Launch)

| Asset | Format | Timeline | Owner | Adds Value To |
|-------|--------|----------|-------|---------------|
| Team headshots | WebP 800×800 | Month 2–3 | Photographer | About page — trust |
| Additional projects (4–6) | WebP 5–8 each | Month 2–3 | Photographer | Projects — depth |
| Project detail videos | MP4 + WebM 1080p | Month 2–3 | Videographer | Project pages — engagement |
| Custom mechanism clips | MP4 + WebM 1080p | Month 2–3 | Videographer | Services — quality proof |
| Material swatch library | WebP, consistent size | Month 3–4 | Designer | Services — reference |
| Process video | MP4 + WebM 60–90s | Month 3–4 | Videographer | About — behind-the-scenes |
| Client video testimonials | MP4 + WebM 30–60s | Month 4–6 | Client/Videographer | Social proof upgrade |
| Blog/case study template | — | Month 4–6 | Designer | Content marketing |

Phase 2 assets are integrated without downtime via CMS and feature flags.

#### 10.4.3 Ongoing Content: Blog/Case Study Pipeline

| Type | Frequency | Format | Purpose | Owner |
|------|-----------|--------|---------|-------|
| Case study | Monthly | 1 project, 6–10 images | New work, SEO keywords | Company/Photographer |
| Material spotlight | Quarterly | 1 material with detail shots | Educational, long-tail SEO | Company/Designer |
| Process note | Bi-monthly | 1 technique explanation | Authority, craft credibility | Company |

**Case study template:** Project title + location → 1-sentence challenge → 3–4 finished images → 1 paragraph solution (80–100 words) → 2–3 process images → materials/hardware list → 1 client quote.

**Content workflow:** Project completion → photography scheduled (+1–2 weeks) → images delivered (+2–3 weeks) → copy drafted (+3–4 weeks) → published (+4–5 weeks). Target: 1 case study per month minimum, doubling portfolio depth within the first year.


---

# 11. Implementation Roadmap & Costs

## 11.1 Development Phases

The project follows a structured four-phase delivery model spanning **8 weeks from kickoff to public launch**. Each phase has defined deliverables, approval gates, and duration. The timeline assumes immediate client availability for feedback and asset delivery — delays in approvals or content provision extend the schedule proportionally.

### 11.1.1 Phase 1 — Design (Weeks 1–2)

Phase 1 establishes the complete visual foundation before any code is written. This phase produces the Figma design files for all pages, the component design system, and animation specification documents.

**Week 1 activities:**
- Discovery session (1× 90-minute video call): brand review, competitive analysis, content audit, technical requirements confirmation
- Homepage wireframe and high-fidelity visual design in Figma
- Component style guide: typography scale (Display 72px, H1 48px, H2 36px, Body 18px, Caption 14px), color palette (#1A1A1A, #C8A97E, #F5F0EB, #FFFFFF, #8A8A8A), spacing system (8px base grid), button states (default, hover, active, disabled)
- Two revision rounds included

**Week 2 activities:**
- Interior page designs: About, Process, Portfolio, Contact, Sustainability, Blog
- Mobile breakpoint designs (375px, 768px, 1024px, 1440px)
- Animation specification document: every scroll-triggered transition, hover state timing (0.3s ease-out default, 0.6s cubic-bezier(0.22, 1, 0.36, 1) for reveals), loader sequence duration (2.5s), parallax depth values
- Design system documentation exported as PDF for future reference
- Client sign-off required before Phase 2 begins

**Phase 1 deliverables:** Figma file with all screens, design system PDF, animation spec document. **Duration: 2 weeks.**

### 11.1.2 Phase 2 — Development (Weeks 3–6)

Phase 2 converts all approved designs into production SvelteKit code. This is the longest phase and runs in two parallel tracks: core page construction and interactive component development.

**Week 3 activities:**
- Project scaffolding: SvelteKit setup with static adapter, Tailwind CSS configuration, folder structure, global styles, font loading (PP Editorial New via @font-face, Inter via Google Fonts)
- Global components: Navigation (fixed, z-index: 100), Footer, PageTransition wrapper, Preloader (brand text reveal sequence)
- Homepage build: hero section with video background, feature grid, process preview, CTA banner — all with specified animations

**Week 4 activities:**
- Interior pages: About, Process, Portfolio grid, Portfolio detail template, Contact form layout
- Core animation library implementation: ScrollTrigger configurations, IntersectionObserver utilities, parallax directive, GSAP timelines
- Responsive behavior implementation across all breakpoints

**Week 5 activities:**
- Contact page: form validation (client-side with zod schema), success/error states, integration point for form backend service
- Blog listing and blog post template pages
- Sustainability page with full content sections
- Image optimization pipeline: AVIF/WebP generation, responsive srcset markup, lazy loading with blur-up placeholders

**Week 6 activities:**
- Video integration: hero background video (compressed H.264 MP4, max 4MB), portfolio detail video embeds, poster frame fallback images
- Performance optimization: Lighthouse audit targeting 95+ performance score, Core Web Vitals validation (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- SEO implementation: meta tags, Open Graph images, structured data (Organization, LocalBusiness, Service schemas), sitemap.xml, robots.txt
- Internal build review and polish pass

**Phase 2 deliverables:** Complete static site build, source code repository (GitHub), staging deployment URL. **Duration: 4 weeks.**

### 11.1.3 Phase 3 — Content Population (Week 7)

All final production content — photography, video, copy — is integrated during this phase. Content must be delivered by the client (or their designated photographer/copywriter) before Week 7 begins.

**Week 7 activities:**
- Image upload and optimization: all hero images, portfolio project photos, team photos, process documentation images — processed through the AVIF/WebP pipeline
- Video file hosting: hero background video uploaded to BunnyCDN or Cloudflare Stream, portfolio detail videos embedded via optimized iframe or `<video>` element with proper codec selection (H.264 baseline for compatibility, HEVC for Safari)
- Copy integration: all page copy entered into Svelte component markup or imported from markdown files, typography review for readability at all breakpoints
- Alt text and accessibility labels added to all images and interactive elements
- Final content review with client (1× revision round included)

**Phase 3 deliverables:** Content-complete staging site. **Duration: 1 week.**

### 11.1.4 Phase 4 — Testing & Launch (Week 8)

The final phase validates everything before public deployment and executes the go-live.

**Week 8 activities:**
- Cross-browser testing: Chrome (latest), Safari (macOS + iOS), Firefox, Edge — all at 1440px, 1024px, 768px, and 375px viewports
- Mobile testing: iPhone 14 Pro (iOS 17), Samsung Galaxy S23 (Android 14), iPad Pro (iPadOS 17)
- Performance audit: Lighthouse CI run (performance, accessibility, best practices, SEO — all targeting 90+)
- Form submission end-to-end test: submit → backend service → email delivery → success state display
- SEO validation: Google Rich Results Test, Facebook Sharing Debugger, sitemap submission readiness
- DNS configuration: A/AAAA or CNAME records pointed to hosting platform, SSL certificate provisioning (automatic via hosting provider)
- Production deployment: static files pushed to CDN edge nodes
- Post-launch verification: 24-hour monitoring of page load times, form functionality, and error logs

**Phase 4 deliverables:** Live production website, deployment documentation, DNS configuration notes, 30-day error monitoring setup. **Duration: 1 week.**

### 11.1.5 Total Timeline

The complete 8-week timeline from kickoff to public launch is summarized in the table below.

| Phase | Activity | Duration | Week Range | Key Deliverable |
|---|---|---|---|---|
| 1 | Visual Design & Design System | 2 weeks | Week 1–2 | Figma files, Design system PDF, Animation spec |
| 2 | SvelteKit Development | 4 weeks | Week 3–6 | Complete static site, GitHub repo, Staging URL |
| 3 | Content Population | 1 week | Week 7 | Content-complete staging site |
| 4 | Testing & Launch | 1 week | Week 8 | Live production site, Deployment docs |
| **Total** | | **8 weeks** | **Week 1–8** | **Public website** |

*Table: Development phases timeline from project kickoff to public launch. Assumes immediate client feedback turnaround. One-week delay in approvals extends the timeline by one week.*

**Critical path note:** Phase 2 cannot begin until Phase 1 design sign-off is received. Phase 3 cannot begin until all content assets are delivered. The longest single dependency is Phase 2 (development) at 4 weeks — no parallel work can reduce this duration below 4 weeks due to the sequential nature of page building and component dependency chains.

---

## 11.2 Cost Breakdown

The total project investment ranges from **€8,500 to €14,500** depending on scope decisions made during Phase 1 (number of portfolio detail pages, complexity of custom animations, whether content is outsourced). All figures exclude VAT (23% in Ireland).

### 11.2.1 Development Cost

| Line Item | Description | Duration | Cost (EUR) |
|---|---|---|---|
| Visual Design | Figma design for all pages, design system, animation specs | 2 weeks | €2,000 – €3,500 |
| Frontend Development | SvelteKit build, all components, animations, responsive implementation | 4 weeks | €5,000 – €8,000 |
| Content Population | Image optimization, video integration, copy entry, alt text | 1 week | €500 – €1,000 |
| Testing & Deployment | Cross-browser testing, performance audit, launch, DNS config | 1 week | €500 – €1,000 |
| **Subtotal: Development** | | **8 weeks** | **€8,000 – €13,500** |

*Table: Itemized development cost breakdown. Range depends on animation complexity and number of portfolio project detail pages (6–12 projects).*

**Design cost drivers:** A €2,000 design package covers the homepage plus 5 interior pages with standard animations. The €3,500 tier adds complex custom page transitions, additional portfolio detail templates, and up to 3 rounds of revision.

**Development cost drivers:** A €5,000 build covers all pages with standard scroll animations and the preloader sequence. The €8,000 tier adds advanced WebGL or canvas-based effects, more than 8 portfolio detail pages, and extensive cross-browser polish.

### 11.2.2 Third-Party Services (Monthly Recurring)

These services are required for the website to function post-launch. All are operational costs, not part of the initial development investment.

| Service | Provider | Purpose | Monthly Cost (EUR) |
|---|---|---|---|
| Hosting + CDN | Vercel Pro (recommended) | Static site hosting, global CDN, automatic SSL, edge caching | €18 |
| Domain | Namecheap / Cloudflare Registrar | .ie domain registration (annual, amortized monthly) | ~€1.50 |
| Form Backend | Basin (recommended) | Contact form processing, spam filtering, email notifications | €8 |
| Video CDN | BunnyCDN Stream | Hero video hosting, streaming delivery (pay-per-use) | ~€5–15 |
| Analytics | Plausible Analytics (self-hosted or cloud) | Privacy-focused visitor analytics, no cookie banner required | €9 |
| **Subtotal: Monthly Infrastructure** | | | **€42 – €52** |

*Table: Monthly third-party service costs. Video CDN cost varies with traffic volume. All figures exclude VAT.*

**Total estimated monthly operating cost: €42 – €52** (approximately €50/month at typical traffic levels). This falls comfortably within the client's €50–150/month target range and leaves headroom for traffic growth or additional services.

### 11.2.3 Content Costs (If Outsourced)

If the client does not provide final photography, video, or copy, these services must be contracted separately. These are optional costs — the client may supply all content internally.

| Service | Description | Estimated Cost (EUR) |
|---|---|---|
| Professional Photography | Interior/product shoot: photographer (1 day), equipment, editing, 30–50 final images | €800 – €1,500 |
| Video Production | Brand/sizzle reel: videographer (½ day), editing, color grading, 30–60s final cut | €600 – €1,000 |
| Copywriting | All page copy (homepage, about, process, services, sustainability): professional copywriter | €400 – €800 |
| **Subtotal: Content (outsourced)** | | **€1,800 – €3,300** |

*Table: Optional content production costs if outsourced. These are market-rate estimates for Ireland. Client-provided content eliminates these costs entirely.*

### 11.2.4 Post-Launch Support

After launch, two support models are available:

| Retainer Tier | Monthly Cost (EUR) | What's Included |
|---|---|---|
| **Essential** | €300/month | Security patches, dependency updates (quarterly), uptime monitoring, email support (48h response), minor text/copy updates (up to 2 per month) |
| **Growth** | €600/month | Everything in Essential plus: priority support (24h response), content updates (unlimited), performance monitoring, monthly analytics report, A/B test setup assistance, quarterly strategy call |

*Table: Post-launch support retainer options. Both tiers are month-to-month with 30-day cancellation notice. No long-term contract required.*

**One-off updates** outside a retainer are billed at €75/hour with a 2-hour minimum. Typical one-off tasks: adding a new portfolio project (2–3 hours), updating team photos (1 hour), copy changes across multiple pages (1–2 hours).

---

## 11.3 Technology Comparison

### 11.3.1 Why SvelteKit Over WordPress, Webflow, or Framer

The recommendation for a custom SvelteKit build over no-code or CMS-based alternatives is based on four factors critical to this project: performance, customization depth, long-term scalability, and total cost of ownership.

**Performance.** SvelteKit compiles to vanilla JavaScript at build time — no runtime framework overhead. The resulting static HTML files are served directly from a CDN edge node, achieving sub-100ms Time to First Byte (TTFB) globally. WordPress requires server-side PHP rendering and database queries on every request (TTFB: 200–500ms). Webflow and Framer generate JavaScript-heavy bundles that inflate page weight and increase load times on mobile networks. For a premium furniture brand where the website is the primary sales tool, performance directly impacts conversion.

**Customization.** The project specification includes custom scroll-triggered animations, a branded preloader sequence, parallax effects, and video-centric layouts. These require precise control over the DOM, animation timelines, and asset loading — capabilities that no-code platforms constrain through their visual editors and component libraries. SvelteKit provides full control over every pixel and every millisecond of animation timing.

**Scalability.** The client's stated growth path includes: international expansion (Ireland → EU → Canada), multilingual support (EN → FR → DE), a headless CMS integration, and eventually a chatbot/CRM system. SvelteKit's built-in i18n routing, adapter-based deployment model, and component architecture accommodate each of these additions without platform migration. A Webflow or Framer site would require a complete rebuild to add multilingual support or backend integration. WordPress's plugin architecture becomes fragile at scale — plugin conflicts and security vulnerabilities increase maintenance burden exponentially.

**Total cost of ownership.** While SvelteKit requires a higher upfront development investment (€8,000–€13,500 vs. €3,000–€6,000 for a Webflow build), the long-term savings are significant: no platform subscription fees (Webflow: €18–45/month, Framer: €15–40/month), no plugin licensing costs, no performance degradation requiring periodic rebuilds, and no vendor lock-in. Over a 3-year horizon, the SvelteKit build is the more economical choice for a business with growth ambitions.

### 11.3.2 Hosting Platform Comparison

Three hosting platforms are evaluated for static SvelteKit deployment. All three support the SvelteKit static adapter output and provide global CDN distribution.

| Factor | Vercel | Netlify | Cloudflare Pages |
|---|---|---|---|
| **Monthly cost** | €18 (Pro plan) | €19 (Pro plan) | €0 (free tier sufficient) |
| **Build time limit** | 45 minutes | 15 minutes | 20 minutes |
| **CDN edge locations** | 100+ | 100+ | 300+ |
| **Analytics included** | Basic (Pro: advanced) | Basic (Pro: advanced) | Detailed (free) |
| **Branch previews** | Yes | Yes | Yes |
| **Custom headers** | Full config | Full config | Full config |
| **Edge functions** | Yes (Vercel Functions) | Yes (Netlify Functions) | Yes (Cloudflare Workers) |
| **Support quality** | Excellent | Good | Good |
| **SvelteKit integration** | First-class (same team) | Excellent | Good |

*Table: Hosting platform comparison for SvelteKit static deployment. All three are production-viable; the recommendation weighs cost, build limits, and integration depth.*

**Recommendation: Vercel Pro.** Vercel's first-class SvelteKit support (the SvelteKit team and Vercel collaborate directly), 45-minute build limit (required for sites with many optimized images and videos), and advanced analytics justify the €18/month cost. The 45-minute build limit is the deciding factor — Cloudflare Pages' 20-minute limit risks build failures as the image and video asset library grows, and Netlify's 15-minute limit is insufficient for this project's asset pipeline. For a business website where build reliability is critical, Vercel Pro provides the necessary margin.

Cloudflare Pages is a viable free alternative for the initial launch if budget is constrained, with migration to Vercel Pro recommended before the portfolio grows beyond 8 projects.

### 11.3.3 Form Backend Comparison

Four form processing services are evaluated for the contact form, which is the primary lead capture mechanism on the site.

| Factor | Formspree | Basin | GetForm | Custom (AWS/Cloudflare) |
|---|---|---|---|---|
| **Monthly cost** | €8 (Gold plan) | €8 (Pro plan) | €8 (Pro plan) | €0–€5 |
| **Submissions/month** | 1,000 | Unlimited | 1,000 | Unlimited |
| **Spam filtering** | reCAPTCHA / hCaptcha | Honeypot + Akismet | reCAPTCHA | Custom implementation |
| **File uploads** | Up to 10MB | Up to 25MB | Up to 5MB | Unlimited |
| **Email notifications** | Yes | Yes | Yes | Yes (manual config) |
| **Auto-responses** | Yes | Yes | No | Custom implementation |
| **Webhook / Zapier** | Yes | Yes | Yes | Yes |
| **Dashboard** | Clean, intuitive | Minimal | Functional | None (logs only) |
| **GDPR compliance** | EU data processing addendum | EU-hosted, GDPR-native | DPA available | Configurable |
| **Setup complexity** | Low (HTML action attribute) | Low (endpoint URL) | Low (endpoint URL) | High (custom API endpoint) |

*Table: Form backend service comparison for contact form processing. All four options work with static SvelteKit sites via fetch API calls.*

**Recommendation: Basin.** Basin's GDPR-native compliance (EU-based infrastructure, no data leaving the EU), unlimited submissions, generous 25MB file upload limit (for design brief attachments), and straightforward JSON endpoint integration make it the best fit for an Irish business serving European clients. The €8/month cost is fixed regardless of lead volume — important for a site where marketing campaigns may drive submission spikes. Formspree is an acceptable alternative if auto-response emails are prioritized, but requires additional GDPR configuration.

A custom serverless function (Cloudflare Workers or AWS Lambda) is not recommended at this stage — the setup and maintenance overhead outweigh the €8/month savings for a single contact form.

---

## 11.4 Ongoing Maintenance

### 11.4.1 Monthly Infrastructure Costs

The recurring monthly cost to keep the website operational is estimated at **€50/month** at launch, scaling to approximately **€80–€120/month** at Year 2 with increased traffic and expanded content.

| Cost Item | Launch (Month 1–6) | Growth (Month 7–18) |
|---|---|---|
| Vercel Pro (hosting + CDN + SSL) | €18 | €18 |
| Basin Pro (form processing) | €8 | €8 |
| BunnyCDN Stream (video delivery) | €5 | €15–€25 |
| Plausible Analytics | €9 | €9 |
| Domain (.ie, amortized annually) | ~€1.50 | ~€1.50 |
| **Monthly Total** | **~€42** | **~€52–€62** |

*Cost evolution: Video CDN costs grow with traffic. If traffic exceeds 100K monthly pageviews, Vercel Pro's bandwidth limit (1TB) may require a tier upgrade to Business (€35/month). Annual cost at launch: ~€500/year. Annual cost at Year 2: ~€750–€900/year.*

### 11.4.2 Content Updates

Content updates fall into two categories: self-managed and developer-assisted.

**Self-managed updates** (no developer required after CMS integration):
- Blog posts: added via headless CMS (Sanity/Strapi) — recommended at Month 9–12
- Portfolio projects: added via CMS after integration
- Team member updates: text and photo changes via CMS

**Developer-assisted updates** (charged at €75/hour or included in Growth retainer):
- Adding a new portfolio project page with custom layout: 2–3 hours
- Creating a new landing page for a marketing campaign: 3–4 hours
- Updating homepage hero video or featured project: 1–2 hours
- Seasonal design refresh (color accents, promotional banners): 2–3 hours

**Recommendation:** Budget for 2–4 hours of developer-assisted updates per month during active marketing periods, and 1–2 hours per month during quiet periods. The Growth retainer (€600/month) includes unlimited content updates and is cost-effective if the client expects frequent changes.

### 11.4.3 Technical Maintenance

Technical maintenance ensures the site remains secure, performant, and compatible with evolving browser standards.

**Quarterly tasks (included in both retainer tiers):**
- SvelteKit framework and dependency version updates (npm audit fix, minor version bumps)
- Tailwind CSS and GSAP library updates
- Lighthouse performance audit — verify scores remain above 90 across all four categories
- Broken link check and SEO health scan
- SSL certificate renewal verification (automatic on Vercel, but confirmed quarterly)

**Annual tasks:**
- Major dependency review: assess SvelteKit major version upgrades, breaking changes in animation libraries
- Full cross-browser regression test on latest browser versions
- CDN and hosting plan review: assess whether traffic growth requires infrastructure scaling
- Security audit: review form submission logs for spam patterns, verify GDPR compliance documentation

**Estimated time:** 4–6 hours per quarter for Essential retainer, 6–8 hours per quarter for Growth retainer (which includes additional monitoring and reporting).

### 11.4.4 Growth Path

The 8-week MVP launch establishes the foundation. The following roadmap outlines when and why to add capabilities as the business grows.

| Timeline | Addition | Purpose | Est. Cost |
|---|---|---|---|
| **Month 3–4** | Multilingual support (FR, DE) | EU market expansion; SvelteKit i18n routing + translated content | €1,500 – €2,500 |
| **Month 6** | Chatbot / AI assistant | Lead qualification, 24/7 visitor engagement, FAQ automation | €800 – €1,500 (integration) + €30–€80/month (service) |
| **Month 9–12** | Headless CMS (Sanity) | Client self-manages blog posts, portfolio projects, team content without developer dependency | €2,000 – €3,500 (setup) + €0–€15/month (Sanity free tier sufficient) |
| **Month 12+** | CRM integration (HubSpot Free) | Lead tracking, email automation, sales pipeline management | €0 (HubSpot free tier) + €500–€1,000 (integration) |
| **Month 12+** | E-commerce capability (Stripe + cart) | Direct online sales of smaller furniture items or design consultations | €3,000 – €5,000 |
| **Month 18+** | Canadian market (.ca domain + EN/FR) | North American expansion; duplicate site structure with localized content | €2,000 – €3,000 |

*Table: Growth roadmap showing recommended additions in priority order. All costs exclude VAT. Timeline assumes steady business growth; earlier additions are viable if budget and need accelerate.*

**Critical dependency:** The headless CMS integration (Month 9–12) is the gateway to self-managed content. Until this is implemented, all content updates require developer involvement. Prioritizing the CMS before the chatbot or CRM is recommended — it reduces ongoing operational costs and empowers the client's team.

**Total 18-month technology investment (development + growth features + infrastructure):**
- Conservative scenario: €8,500 (MVP) + €4,300 (growth) + €900 (18 months infra) = **€13,700**
- Comprehensive scenario: €14,500 (MVP) + €10,500 (growth) + €1,500 (18 months infra) = **€26,500**

Both scenarios represent a fractional investment compared to the revenue potential of a high-converting website for a premium furniture brand operating across Ireland, the EU, and Canada.


---

