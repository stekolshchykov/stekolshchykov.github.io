# TINEO v2 — Content Depth Audit

**Scope:** Static SvelteKit site at `/Users/mk/Documents/Personal/Code/tp`  
**Files reviewed:** `site.ts`, `projects.ts`, `services.ts`, `materials.ts`, `processSteps.ts`, `testimonials.ts`, `team.ts`, `en.json`, and all `src/routes/[[lang]]/*.svelte` page files.  
**Brand goal:** Make a visitor say *“this studio really knows its craft.”*

---

## Executive Summary

TINEO’s current content is polished, brand-consistent, and well-structured for an MVP. However, it reads like a premium *brochure* rather than a deep *craft narrative*. The site tells visitors that TINEO is precise and bespoke, but it rarely shows *how* the precision happens, *who* does it, *what standards* govern it, or *what the experience* of commissioning a piece feels like. The biggest gaps are: (1) no deep material or process pages, (2) case studies that stop at high-level challenge/solution, (3) thin trust signals, and (4) missed SEO long-tail opportunities around Irish fitted-furniture search terms.

This audit identifies the top 15 content improvements, gives copy examples for 5 of them, proposes a new page architecture, and recommends `en.json` key additions.

---

## 1. Top 15 Content Improvements

| # | Improvement | Why it matters for craft credibility | Priority |
|---|-------------|--------------------------------------|----------|
| 1 | **Create a dedicated `/materials` Materials Library** | Materials are currently a 6-item carousel on Services. A library with origins, grades, finishes, applications, and care turns timber from a texture into a decision. | High |
| 2 | **Build a `/process` page** | The 4-step timeline is on Services and Home but never unpacked. A dedicated page lets the workshop story breathe. | High |
| 3 | **Add an `/insights` or `/journal` editorial hub** | Luxury buyers research for weeks. A journal answers long-tail questions (“how to fit a wardrobe to a period alcove”) and signals authority. | High |
| 4 | **Create `/showroom` (or `/visit`) page** | Currently only a generic address on Contact. A visit page turns the Dublin workshop into a destination and supports local SEO. | High |
| 5 | **Add an Awards, Press & Certifications page/section** | No awards, press logos, FSC/Blum/partner badges, or certifications appear anywhere. These are essential trust proxies for HNW buyers. | High |
| 6 | **Deepen every project case study** | Challenge/solution is good, but missing: construction details, maker notes, tolerances, hardware spec sheets, client brief, before/after, outcome quotes. | High |
| 7 | **Add service detail pages `/services/:slug`** | Services are one-liners. Detail pages can include starting-price signals, timelines, deliverables, options, and warranty. | Medium |
| 8 | **Expand the About page into a heritage story** | Two generic paragraphs + placeholder team bios. Missing founder origin, workshop milestones, the TINEO name story, and workshop photography. | Medium |
| 9 | **Add verified, richer testimonials** | Only 3 testimonials, all initials-only, no project link or photo. Stronger social proof would link quotes to case studies. | Medium |
| 10 | **Add FAQ / Project Planner page** | Reduces friction, captures SEO, and qualifies leads before they open the form. | Medium |
| 11 | **Create `/commercial` capability page** | Commercial services exist, but there is no scale/compliance/PM narrative for hospitality developers or office fit-out managers. | Medium |
| 12 | **Strengthen sustainability & quality credentials** | FSC/E1/Blum/Hettich are mentioned in the PRD but absent from site copy. | Medium |
| 13 | **Improve SEO metadata per page** | Meta descriptions are generic. Each page should target distinct keywords (e.g., “bespoke wardrobes Dublin”, “custom kitchens Ireland”). | Medium |
| 14 | **Add craft-detail micro-sections to project detail pages** | A “Craft notes” or “In the workshop” panel alongside specs would make the technical table feel human. | Medium |
| 15 | **Create cross-page storytelling arcs** | Link pages into a journey: Home → Process → Materials → Project → Visit. Use shared language (“From forest to finish”, “Measured in millimetres”). | Low/Medium |

---

## 2. Specific Copy Examples (5 improvements)

### 2.1 Materials Library page — hero + material card

**Page intro:**

> **Materials, chosen for how they age.**  
> Every TINEO piece begins with a raw board. We source solid hardwoods and curated veneers from European mills we have worked with for years, then finish them by hand in our Dublin workshop. Below is the library we draw from — each timber with its provenance, its best use, and the care it asks for in return.

**European Oak material card:**

> **European Oak**  
> *Origin:* sustainably managed forests in France and Germany.  
> *Character:* open grain, warm honey tone, naturally hard-wearing. Quarter-sawn where stability matters.  
> *Best for:* libraries, alcove joinery, kitchen cabinetry, and anywhere a period home needs timber that feels original.  
> *Finishes:* natural hardwax oil, matte lacquer, limed, or fumed.  
> *Care:* wipe with a damp cloth; refresh the oil every few years and the grain will deepen rather than fade.

### 2.2 Process page — Step 3, “Craft”

> **3. Craft**  
> Your drawings become timber in our Dublin workshop. Each board is selected for grain match, machined to tolerance, and assembled by hand. Joints are cut, not hidden. Edges are softened by hand before finishing. We photograph key stages so you can see the piece take shape before it reaches your home.

### 2.3 About page — heritage/workshop story

> **Our Story**  
> TINEO was founded on the belief that a fitted wardrobe should feel as considered as the room around it. For more than twenty years we have worked from a Dublin workshop, designing and building furniture for Irish homes and the people who live in them.  
>  
> The name comes from the Old Irish *tinne* — an iron bar or rod — a quiet nod to the precision hardware and exact tolerances that hold every piece together. We do not chase trends. We chase proportion, material honesty, and the kind of fit that makes a cabinet look like it grew in place.

### 2.4 Service detail page — Wardrobes & Dressing Rooms

> **Wardrobes & Dressing Rooms**  
> Fitted wardrobes designed around the architecture of your room and the rhythm of your day.
>
> **What the process includes:**
> - In-home consultation and laser site survey
> - CAD drawings and photorealistic 3D visuals
> - Hand-finished sample boards
> - Manufacture in our Dublin workshop
> - Delivery, installation, and final adjustment
>
> **Typical timeline:** 8–12 weeks from signed drawings.  
> **Investment guide:** from €12,000 for a full-height fitted wardrobe; dressing rooms from €25,000.  
> **Warranty:** 10-year structural guarantee on all carcasses and installation.

### 2.5 Project case study craft notes — Dublin Bay Dressing Room

> **Craft notes**  
> Because the ceiling line slopes, every cabinet was scribed to the plaster by hand rather than packed out with filler. The American walnut was selected from a single batch to keep grain continuity around the room. Brass hanging rails were machined to length on site so the fixings sit flush, and each LED dimming zone was programmed to match the morning and evening light across the bay.

---

## 3. Proposed New Page / Section Architecture

### 3.1 Primary sitemap additions

```
/
/projects
/projects/[slug]
/services
/services/[slug]              ← NEW
/materials                    ← NEW
/materials/[materialSlug]     ← NEW (optional)
/process                      ← NEW
/about
/insights                     ← NEW
/insights/[articleSlug]       ← NEW
/showroom                     ← NEW (or /visit)
/commercial                   ← NEW
/faq                          ← NEW
/contact
/privacy
/terms
/cookies
```

### 3.2 Navigation updates

**Desktop nav:** `Projects | Services | Materials | Process | About | Insights | Contact`  
Keep “Discuss a Project” CTA fixed on the right.

**Footer additions:**
- Materials
- Process
- Showroom / Visit
- Commercial
- Insights
- FAQ
- Press & Awards (small link)

### 3.3 Page-level section recommendations

**Homepage**
- Add a “From the workshop” preview section (3 small craft-detail cards + link to Process).
- Add a trust-strip with 3–4 credibility marks (e.g., *FSC-certified timber • Blum / Hettich hardware • 10-year guarantee • Dublin workshop*).
- Link testimonials to their project pages.

**Services page**
- Each service card links to `/services/[slug]`.
- Keep the 4-step process timeline, but add a “What to expect” accordion.
- Surface the Materials Library link more explicitly.

**Project detail page**
- Add `craftNotes` field under the existing `challenge`/`solution` grid.
- Add `maker` / `designLead` attribution.
- Add `clientOutcome` quote.
- Add downloadable PDF spec sheet CTA for trade visitors.

**About page**
- Replace placeholder team bios with real ones.
- Add a workshop timeline/milestones section.
- Add a “By the numbers” credibility block (years, projects, sqm installed, counties served).
- Add press/awards logos.

**Contact page**
- Add a “Plan your visit” card linking to `/showroom`.
- Add WhatsApp CTA copy that explains response time.

---

## 4. Recommended Additions to `en.json`

Keep the existing nested structure. Add the following new top-level namespaces:

### `materials`

```json
"materials": {
  "meta_title": "Materials Library — TINEO",
  "meta_description": "Explore the solid hardwoods, veneers, painted finishes, and hardware used in TINEO bespoke furniture.",
  "hero_eyebrow": "Materials",
  "hero_headline": "Chosen for how they age",
  "hero_subheadline": "European timbers and finishes, selected and applied by hand in our Dublin workshop.",
  "origin_label": "Origin",
  "character_label": "Character",
  "best_for_label": "Best for",
  "finishes_label": "Finishes",
  "care_label": "Care",
  "request_sample": "Request a Sample",
  "cta_headline": "See and feel the options.",
  "cta_button": "Book a Showroom Visit"
}
```

### `process`

```json
"process": {
  "meta_title": "Our Process — TINEO",
  "meta_description": "From consultation to installation: how TINEO designs and builds bespoke furniture in Dublin.",
  "hero_eyebrow": "Process",
  "hero_headline": "From sketch to space",
  "hero_subheadline": "A four-stage journey built around precision, material, and quiet collaboration.",
  "step_consult_title": "Consult",
  "step_consult_body": "We visit your home or site, listen to how you live, and define the brief, budget, and timeline together.",
  "step_design_title": "Design",
  "step_design_body": "Drawings, material samples, and 3D visuals let you see every detail before the first piece of timber is cut.",
  "step_craft_title": "Craft",
  "step_craft_body": "Your furniture is made in our Dublin workshop by makers who measure twice, cut once, and finish by hand.",
  "step_install_title": "Install",
  "step_install_body": "We deliver and install with the same care we built it with, then leave the space ready to live in.",
  "quality_title": "Quality at every stage",
  "timeline_title": "Typical timelines",
  "cta_headline": "Begin your project.",
  "cta_button": "Arrange a Consultation"
}
```

### `showroom`

```json
"showroom": {
  "meta_title": "Visit Our Showroom — TINEO",
  "meta_description": "Visit the TINEO showroom and workshop in Dublin by appointment. Explore materials, finishes, and recent work.",
  "hero_eyebrow": "Showroom",
  "hero_headline": "See the work up close",
  "hero_subheadline": "Our Dublin workshop is open by appointment. Touch the materials, open the drawers, and discuss your project with our team.",
  "address_label": "Address",
  "hours_label": "Opening Hours",
  "appointment_title": "Visit by appointment",
  "appointment_body": "We keep the showroom calm and unhurried. Book a 45-minute appointment and we will have samples ready for your project.",
  "book_button": "Book a Visit",
  "what_to_expect_title": "What to expect",
  "cta_headline": "Begin your project.",
  "cta_button": "Discuss a Project"
}
```

### `commercial`

```json
"commercial": {
  "meta_title": "Commercial Joinery & Fit-outs — TINEO",
  "meta_description": "Bespoke joinery for offices, hotels, retail, and hospitality projects across Ireland.",
  "hero_eyebrow": "Commercial",
  "hero_headline": "Craft at scale",
  "hero_subheadline": "Reception desks, hotel joinery, retail interiors, and office fit-outs built to commercial standards.",
  "capabilities_title": "Capabilities",
  "compliance_title": "Compliance & Standards",
  "case_studies_title": "Commercial case studies",
  "contact_title": "Discuss a commercial project",
  "contact_button": "Enquire Now"
}
```

### `insights`

```json
"insights": {
  "meta_title": "Journal — TINEO",
  "meta_description": "Thoughts on materials, Irish interiors, and the craft of bespoke furniture from the TINEO studio.",
  "hero_eyebrow": "Journal",
  "hero_headline": "Notes from the workshop",
  "hero_subheadline": "Ideas on timber, proportion, and designing for Irish homes.",
  "read_more": "Read article",
  "category_craft": "Craft",
  "category_materials": "Materials",
  "category_design": "Design"
}
```

### `trust`

```json
"trust": {
  "years_experience": "20+ years of craft",
  "dublin_workshop": "Dublin workshop",
  "ten_year_guarantee": "10-year guarantee",
  "premium_hardware": "Blum, Hettich & Grass hardware",
  "sustainably_sourced": "Sustainably sourced timber",
  "awards_title": "Recognition",
  "press_title": "Press"
}
```

### `faq`

```json
"faq": {
  "meta_title": "FAQ — TINEO",
  "meta_description": "Answers to common questions about bespoke furniture, timelines, pricing, and the TINEO process.",
  "hero_headline": "Questions",
  "hero_subheadline": "Everything you need to know before starting a project.",
  "pricing_question": "How much does a bespoke kitchen or wardrobe cost?",
  "timeline_question": "How long does a typical project take?",
  "area_question": "Do you work outside Dublin?",
  "sample_question": "Can I see materials before deciding?",
  "installation_question": "Do you handle delivery and installation?"
}
```

### `service_detail` (reusable across `/services/[slug]`)

```json
"service_detail": {
  "meta_title_suffix": "— TINEO Services",
  "overview_eyebrow": "Overview",
  "what_to_expect_eyebrow": "What to expect",
  "investment_guide": "Investment guide",
  "typical_timeline": "Typical timeline",
  "warranty": "Warranty",
  "options_title": "Options",
  "cta_headline": "Discuss this with us.",
  "cta_button": "Start a Conversation"
}
```

### `project_detail` additions

Extend the existing `project_detail` namespace with:

```json
"project_detail": {
  "craft_notes_eyebrow": "Craft Notes",
  "maker_label": "Lead Maker",
  "designer_label": "Design Lead",
  "client_outcome_eyebrow": "The Result",
  "download_spec_sheet": "Download Spec Sheet",
  "visit_showroom_cta": "See this material in the showroom"
}
```

---

## 5. Quick-Win SEO Opportunities

- **Homepage meta description:** currently generic. Target: *“Bespoke wardrobes, kitchens, and interior joinery built in our Dublin workshop. Precision-fit furniture for Irish homes and commercial spaces.”*
- **Services page:** add sub-headings and copy for *“bespoke wardrobes Dublin”*, *“custom kitchens Ireland”*, *“fitted furniture Dublin”*.
- **Projects page:** include a short intro paragraph with target keywords before the grid.
- **Project detail:** use `project.description` as meta description; consider adding a `metaKeywords` field per project for niche terms (e.g., *walk-in closet Dublin 4*).
- **Schema:** extend `Product` schema with `material`, `brand`, `aggregateRating` once testimonials are richer.

---

## 6. Summary for the Parent Agent / Next Steps

1. **Content-first priorities:** write the `/materials`, `/process`, and `/showroom` pages first — they fill the largest credibility gaps.
2. **Case-study upgrade:** add `craftNotes`, `clientOutcome`, `maker`, and `designer` fields to `projects.ts`, then surface them on `project_detail`.
3. **Service depth:** convert service list items into full detail pages with pricing signals and deliverables.
4. **Trust layer:** add a `trust` content object and render it as a strip on Home, About, and Services.
5. **i18n expansion:** add the recommended JSON keys before building new pages so FR/DE translation gaps are visible early.

*End of audit.*
