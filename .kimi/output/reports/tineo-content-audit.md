# TINEO Website Content Audit
**Objective:** Elevate the brand voice from “premium custom furniture” to true luxury positioning, inspired by Poggenpohl-level restraint, precision, and confidence.

**Scope:** `src/lib/data/site.ts`, `projects.ts`, `services.ts`, `materials.ts`, `processSteps.ts`, `testimonials.ts`, `team.ts`; `src/lib/i18n/locales/en.json`; route-level inline copy in `src/routes/[[lang]]/+page.svelte` and siblings.

---

## 1. Brand Voice Guide for TINEO

### 1.1 Positioning Statement
TINEO is a Dublin workshop that builds bespoke furniture and interiors for clients who expect precision, material honesty, and quiet confidence. We sit between mid-market fitted furniture and ultra-luxury German imports — factory-direct, Irish-rooted, European in material quality.

### 1.2 Tone
- **Restrained.** We never shout. Confidence is shown through specificity, not superlatives.
- **Warm but not familiar.** We speak as a peer, not a salesperson.
- **Architectural.** We describe space, proportion, light, material, and use — not “lifestyle” abstractions.
- **Patient.** Our language reflects a process that cannot be rushed.

### 1.3 Sentence Structure
- Headlines: 2–6 words, often noun phrases or short statements.
- Sentences: max 20 words. Active voice, subject-verb-object.
- Paragraphs: 15–40 words. One idea each.

### 1.4 Vocabulary to Favor
- **Craft:** made, built, drawn, measured, joined, finished, scribed, settled.
- **Material:** timber, grain, veneer, lacquer, stone, brass, oak, walnut, ash.
- **Space:** proportion, ceiling line, alcove, reveal, bay, circulation, volume.
- **Quality:** precise, durable, considered, balanced, quiet, refined, exacting.

### 1.5 Vocabulary to Avoid
- Superlatives: *best, unparalleled, perfect, exquisite, finest, ultimate.*
- Clichés: *passionate about, no job too big, from concept to completion, attention to detail, start to finish.*
- Jargon: *solutions, leverage, deliverables, synergy, bespoke* when used repeatedly.
- Hard-sell language: *free quote, contact us now, limited time, book today.*
- Casual phrasing: *awkward spaces, clutter, toys, daily family life* in luxury contexts.
- Empty adjectives: *beautiful, stunning, gorgeous, nice.*

### 1.6 CTA Language
- Use: *Discuss a Project, Start a Conversation, Arrange a Consultation, Begin Your Project.*
- Avoid: *Get a Free Quote, Contact Us Now, Submit.*

### 1.7 Pronouns & Person
- First person plural “We” and direct “You.” Treat the client as a co-creator, not a lead.

---

## 2. Placeholder & Legal Text That Must Be Fixed

These are blockers for any public launch and must be replaced with real information.

| File | Field / Key | Current Value | Required Fix |
|---|---|---|---|
| `site.ts` | `companyLegalName` | `[Existing Company Name]` | Real legal entity name |
| `site.ts` | `phone` | `+353 87 123 4567` | Real business phone |
| `site.ts` | `whatsapp` | `+353 87 123 4567` | Real WhatsApp number |
| `site.ts` | `address` | `Dublin, Ireland` | Full operational/showroom address |
| `team.ts` | All `name` fields | `[Founder Name]`, `[Workshop Manager Name]`, etc. | Real names or remove team section |
| `legal.ts` privacy controller | Data controller | `[Existing Company Name]` | Real legal entity |
| `legal.ts` privacy address | Registered address | `[Registered Office Address], Ireland` | Real registered office |
| `legal.ts` terms scope | Operator | `[Existing Company Name]` | Real legal entity |
| `legal.ts` terms/warranty | Contracting party | `[Existing Company Name]` | Real legal entity |
| `legal.ts` cookies table | Controller | `[Existing Company Name]` | Real legal entity |
| `en.json` | `footer.company_placeholder` | `[Existing Company Name] trading as TINEO` | Should pull from `site.companyLegalName`; remove placeholder |

**Recommendation:** Replace `site.companyLegalName` once, then update `Footer.svelte` to use that value directly instead of a separate translation key. This eliminates duplication and future placeholder risk.

---

## 3. Content Area-by-Area Audit

### 3.1 Brand Taglines & Site Metadata (`site.ts`)

**Current:**
- `tagline`: “Handcrafted Furniture, Designed for Your Space”
- `subTagline`: “Custom wardrobes, kitchens, and interiors. Built in Dublin, delivered across Ireland.”
- `ctaLabel`: “Discuss a Project”
- `footerCta`: “Have a project in mind?”
- SEO default title: “TINEO — Custom Furniture, Crafted in Ireland”
- SEO default description: “Bespoke wardrobes, kitchens and interiors. Built in Dublin, delivered across Ireland.”

**Tone & Positioning:** Polished but safe. Reads like a capable local bespoke joiner rather than a luxury atelier. “Handcrafted,” “designed for your space,” and “custom” are category words, not brand words.

**What Works:**
- “Discuss a Project” is excellent — consultative, not transactional.
- The Dublin/Ireland framing is correct for the launch market.

**What Feels Generic/Template-like:**
- “Handcrafted Furniture, Designed for Your Space” could belong to any Etsy shop.
- “Custom wardrobes, kitchens, and interiors” is a category list, not a promise.
- “Built in Dublin, delivered across Ireland” is functional logistics, not brand story.

**Rewrite Suggestions:**
- **Tagline:** “Furniture, measured in millimetres.”
- **Sub-tagline:** “Bespoke wardrobes, kitchens, and interiors from our Dublin workshop.”
- **SEO title:** “TINEO — Bespoke Furniture & Interiors, Dublin”
- **SEO description:** “Wardrobes, kitchens, and interior joinery designed around Irish homes and built in our Dublin workshop.”
- **Footer CTA:** “Begin your project.”

**Inconsistencies:** The tagline in `site.ts` is duplicated in `en.json` (`home.hero_headline`) and in `Footer.svelte` (`site.tagline`). A single source of truth would prevent drift.

---

### 3.2 Why Us Items (`site.ts`)

**Current Items:**
1. Truly Bespoke — “No templates. No compromises.”
2. Irish Craftsmanship — “Built in our Dublin workshop by experienced makers…”
3. Premium Materials — “Solid hardwoods, curated veneers, and hardware from trusted European suppliers chosen for longevity.”
4. End-to-End Service — “From first sketch to final installation, one team guides your project through every stage.”
5. Quiet Luxury — “Understated detailing, refined proportions, and finishes that age gracefully in real homes.”
6. Precision Fit — “Site surveys and meticulous templating ensure every unit sits perfectly, even in awkward spaces.”

**Tone & Positioning:** Mostly premium, but several lines slip into brochure-speak. “No templates. No compromises.” is a slogan, not an explanation. “Awkward spaces” undermines the luxury register.

**What Works:**
- “Quiet Luxury” item is the strongest — sensory, architectural, and ownable.
- “Premium Materials” is solid; “curated veneers” and “longevity” are good cues.

**What Feels Generic/Template-like:**
- “No templates. No compromises.” — overly punchy and unverifiable.
- “From first sketch to final installation” — cliché.
- “one team guides your project through every stage” — vague.
- “experienced makers” — tells rather than shows.
- “awkward spaces” — too casual; replace with “challenging proportions” or “period architecture.”

**Rewrite Suggestions:**

| ID | New Title | New Description |
|---|---|---|
| bespoke-design | Made to Measure | Every piece is drawn around your room, your habits, and the light. No standard sizes. No concessions. |
| irish-craft | Dublin Workshop | Built in our Dublin workshop by makers who understand timber, tolerance, and the weight of a well-made joint. |
| premium-materials | Materials First | Solid hardwoods, curated veneers, and European hardware chosen for how they age, not just how they look. |
| full-service | One Studio | From first drawing to final installation, the same team designs, builds, and sets every piece in place. |
| quiet-luxury | Quiet Luxury | Understated detailing, refined proportions, and finishes that settle into a room over decades. |
| guaranteed-fit | Precision Fit | Site surveys and meticulous templating ensure every unit sits exactly — even in rooms that refuse straight lines. |

---

### 3.3 Projects (`projects.ts`)

**Featured Projects:**
1. Penthouse Wardrobe Suite — Dublin 4
2. Blackrock Kitchen — Blackrock, Co. Dublin
3. The Shelbourne Fittings — Dublin 2

**Tone & Positioning:** Strong material detail and good project structure. The writing is clear and specific, but often reads like a real-estate or interior-design brief rather than a luxury brand case study. Several overviews lean on functional description rather than emotional or architectural framing.

**What Works:**
- Material specs are excellent (American Walnut, Brass, Blum, Hettich, Fenix).
- Challenge/Solution structure gives narrative shape.
- Specific locations and timelines build credibility.

**What Feels Generic/Template-like:**
- “generous storage,” “calm material palette,” “morning routine to evening retreat” — lifestyle-magazine phrasing.
- “daily family life as well as weekend entertaining” — generic.
- “impress clients and support a hybrid working culture” — corporate buzzword.
- “The hotel remained operational throughout, so installation windows were tight” — could be more precise and less apologetic.
- Project titles are descriptive but flat. Consider more architectural or evocative titles.

**Rewrite Suggestions:**

#### Project 1: Penthouse Wardrobe Suite
- **New title:** “Dublin Bay Dressing Room”
- **Description:** “A master-suite dressing room in American walnut, designed to follow the ceiling line and frame the bay.”
- **Overview:** “A new penthouse overlooking Dublin Bay needed a dressing room that matched the scale of the view. The brief was for storage that felt calm, generous, and quietly luxurious.”
- **Challenge:** “Full-height glazing and a sloping ceiling ruled out standard cabinetry. The client needed hanging, shoe display, and accessory storage without crowding the room.”
- **Solution:** *(keep current, strong)* “We designed a perimeter system of American walnut cabinetry that followed the ceiling line, with a central island for folded items and jewellery. Integrated LED strips with dimming zones highlight display areas while soft-close Blum drawers keep daily essentials silent and smooth.”

#### Project 2: Blackrock Kitchen
- **New title:** “Blackrock Family Kitchen”
- **Description:** “A handleless charcoal kitchen with island and honed stone worktop, set within a Victorian house in Blackrock.”
- **Overview:** “A full kitchen redesign for a Victorian-era home in Blackrock. The family wanted a contemporary kitchen that respected the original proportions of the house and could absorb both weekday routine and larger gatherings.”
- **Challenge:** *(keep, good specificity)* “Ceiling heights varied across the room, and the existing chimney breast limited wall-run continuity. The client also requested a large island with seating without sacrificing circulation.”
- **Solution:** “We wrapped the chimney breast in handleless charcoal lacquer and extended the run with floor-to-ceiling units. The island houses a sink, bin, and breakfast storage beneath a honed quartz worktop. Oak internals add warmth each time a door opens.”

#### Project 3: The Shelbourne Fittings
- **New title:** “Hotel Reception & Lounge”
- **Description:** “Reception joinery and lounge seating for a five-star Dublin hotel, built to withstand high traffic while feeling residential.”
- **Overview:** “A commission to create reception joinery and lounge seating for a landmark five-star hotel in Dublin city centre. The work needed to feel established yet fresh, and to endure constant guest traffic.”
- **Challenge:** “The hotel remained open throughout, so every installation happened in narrow overnight windows. Materials had to meet fire-retardant and durability standards while retaining a warm, residential feel.”
- **Solution:** *(keep current)* “We built the reception desk in American walnut with brass inlays and a leather-wrapped front counter. Lounge seating combined walnut frames with velvet upholstery in a deep forest tone. Every joint and finish was specified for daily commercial use.”

**Non-Featured Projects:** Apply the same principle — lead with architectural or sensory framing, remove lifestyle clichés, keep material specificity.

---

### 3.4 Services (`services.ts`)

**Current Service Titles/Descriptions:**
- Custom Wardrobes
- Bespoke Kitchens
- Walk-in Closets
- Living Spaces
- Office Fit-outs
- Retail Interiors
- Hospitality
- Custom Solutions

**Tone & Positioning:** Feature-led and practical. Reads like a capable service catalogue. Missing the “why this matters to you” layer that justifies premium pricing.

**What Works:**
- Service list is comprehensive and well-categorized.
- Feature bullets are clear and specific.

**What Feels Generic/Template-like:**
- “Kitchens built to last a lifetime” — cliché.
- “If it can be drawn, it can be built — we thrive on solving spatial problems with craft” — slightly eager and generic.
- “show your products at their best and guide the customer journey” — retail jargon.
- “elevating the guest experience” — hospitality cliché.
- Titles are plain: “Custom Wardrobes,” “Living Spaces.”

**Rewrite Suggestions:**

| Current Title | New Title | New Description |
|---|---|---|
| Custom Wardrobes | Wardrobes & Dressing Rooms | Fitted wardrobes designed around the architecture of your room and the rhythm of your day. |
| Bespoke Kitchens | Kitchens | Kitchens built for how you cook, gather, and live. Handleless contemporary, classic timber, or something quietly in between. |
| Walk-in Closets | Dressing Rooms | Calm, organised dressing rooms where every garment has its place and every morning starts with ease. |
| Living Spaces | Living Joinery | Media walls, libraries, alcove cabinets, and window seats that bring order and warmth to the rooms you use most. |
| Office Fit-outs | Workplaces | Reception desks, boardroom tables, and breakout joinery that communicate quality before anyone sits down. |
| Retail Interiors | Retail Spaces | Display shelving, counters, and fitting-room joinery that let the merchandise speak. |
| Hospitality | Hotels & Restaurants | Bars, banquettes, wardrobes, and reception joinery built to endure daily use without losing character. |
| Custom Solutions | One-Off Commissions | Unusual briefs and singular pieces. If the drawing exists, we can find the right way to make it. |

**Feature Lists:** Trim from five bullets to 3–4 and lead with the most differentiating points. Avoid repeating “soft-close” on every service — mention it only where it is the key detail.

---

### 3.5 Materials (`materials.ts`)

**Current descriptions:**
- European Oak — “Durable, distinctive grain, warm tone…”
- American Walnut — “Rich, dark, luxurious appearance…”
- White Ash — “Light, contemporary, clean look…”
- Painted Finishes — “Any colour, hand-finished perfection.”
- Veneer Options — “Premium wood veneers for large surfaces…”
- Hardware — “Soft-close hinges, premium handles…”

**Tone & Positioning:** Short, useful, but uneven. “Luxurious appearance” and “hand-finished perfection” use superlatives the brand guide should avoid.

**What Works:**
- Material names are clear.
- Descriptions are concise.

**What Feels Generic/Template-like:**
- “hand-finished perfection” — *perfection* is a forbidden superlative.
- “luxurious appearance” — *luxurious* is overused and vague.
- “trusted European manufacturers” — repeated from services.

**Rewrite Suggestions:**

| Material | New Description |
|---|---|
| European Oak | Durable, open-grained, and warm. A timber that feels as natural in a period home as in a contemporary interior. |
| American Walnut | Deep in colour, fine in grain. Prized for its depth and elegant figuring in fine furniture. |
| White Ash | Pale, even, and quietly textured. Ideal for interiors that need light without sterility. |
| Painted Finishes | Mixed, sprayed, and hand-finished in any colour. From muted neutrals to deep, saturated tones. |
| Veneer Options | Premium veneers for large surfaces: consistent grain, stable construction, refined visual impact. |
| Hardware | Hinges, handles, and drawer systems from European specialists — chosen for feel after years of daily use. |

---

### 3.6 Process Steps (`processSteps.ts`)

**Current:**
1. Consult — “We visit your home or site, listen to how you live, and define the brief, budget, and timeline together.”
2. Design — “Our designers develop detailed drawings, material samples, and 3D visuals so you can see every detail before we cut timber.”
3. Craft — “Your furniture is made in our Dublin workshop by skilled craftspeople using premium materials and precision joinery.”
4. Install — “We deliver and install with care, leaving your space clean, finished, and ready to use.”

**Tone & Positioning:** Clear and reassuring. Slightly procedural. Could feel more like a studio process than a factory workflow.

**What Works:**
- “before we cut timber” is a nice, concrete phrase.
- Four steps is the right level of simplicity.

**What Feels Generic/Template-like:**
- “We visit your home or site” — plain.
- “skilled craftspeople” — tells rather than shows.
- “leaving your space clean, finished, and ready to use” — generic closer.

**Rewrite Suggestions:**

| Step | New Title | New Description |
|---|---|---|
| 1 | Consult | We visit your home or site, listen to how you live, and define the brief, budget, and timeline together. |
| 2 | Design | Drawings, material samples, and 3D visuals let you see every detail before the first piece of timber is cut. |
| 3 | Craft | Your furniture is made in our Dublin workshop by makers who measure twice, cut once, and finish by hand. |
| 4 | Install | We deliver and install with the same care we built it with, then leave the space ready to live in. |

---

### 3.7 Testimonials (`testimonials.ts`)

**Current:**
1. “The attention to detail was extraordinary. Our walk-in closet feels like a luxury hotel suite.” — Sarah M., Dublin 6
2. “Professional from start to finish. The kitchen they built is the heart of our home now.” — David & Aileen K., Blackrock
3. “They understood our brand and delivered a retail interior that our customers constantly compliment.” — James T., Dublin 2

**Tone & Positioning:** Positive but clichéd. “Attention to detail,” “professional from start to finish,” and “heart of our home” are overused in every tradesman website.

**What Works:**
- Location attribution adds credibility.
- Specific project types (walk-in closet, kitchen, retail interior) are good.

**What Feels Generic/Template-like:**
- “attention to detail” — forbidden cliché.
- “professional from start to finish” — forbidden cliché.
- “heart of our home” — lifestyle cliché.
- “customers constantly compliment” — weak verb.

**Rewrite Suggestions:**
1. “Every drawer, every light, every joint feels considered. The dressing room has become the calmest room in the house.” — Sarah M., Dublin 6
2. “They understood the house before they designed the kitchen. The result respects the original rooms and works perfectly for how we live.” — David & Aileen K., Blackrock
3. “Our customers notice the joinery before they notice the product. That is exactly what we wanted.” — James T., Dublin 2

---

### 3.8 Team (`team.ts`)

**Current:** All four names are placeholders: `[Founder Name]`, `[Workshop Manager Name]`, `[Senior Craftsman Name]`, `[Design Consultant Name]`.

**Tone & Positioning:** Bios are well-written and restrained. They already match the desired voice.

**What Works:**
- “the quiet details that distinguish a TINEO piece” — excellent brand phrase.
- “would this sit comfortably in our own home?” — good internal standard.

**What Feels Generic/Template-like:**
- “Over two decades of experience designing bespoke furniture and interiors for Ireland's most discerning homes and commercial spaces.” — “discerning” is slightly pretentious.

**Rewrite Suggestions:**
- Founder bio: “Two decades of designing and building bespoke furniture and interiors for homes and spaces across Ireland.”
- Otherwise keep bios; only replace placeholder names.

**Inconsistencies:** The PRD says the team section can be omitted for “brand-over-person” positioning. If real names cannot be provided, consider removing the team grid and replacing it with a workshop philosophy statement.

---

### 3.9 UI Copy (`src/lib/i18n/locales/en.json`)

**Home Page:**
- `hero_headline`: “Handcrafted Furniture, Designed for Your Space” — generic, duplicate of tagline.
- `hero_subheadline`: “Custom wardrobes, kitchens, and interiors. Built in Dublin, delivered across Ireland.” — functional.
- `intro_eyebrow`: “The Studio” — good.
- `intro_headline`: “Quiet luxury, made to measure” — excellent.
- `intro_body`: “For over two decades, TINEO has designed and built bespoke furniture for Ireland's finest homes and commercial spaces. Every piece begins with a conversation and ends with a perfect fit.” — “finest homes” is slightly pretentious; “perfect fit” uses *perfect*.
- `services_headline`: “What we make” — plain.
- `projects_headline`: “Recent Work” — PRD specifies “Selected Work.”
- `process_headline`: “From Sketch to Space” — good.
- `cta_headline`: “Have a project in mind?” — okay but not premium.
- `cta_subheadline`: “Tell us about your space. We will respond within two business days.” — functional, good.
- `cta_button`: “Start a Conversation” — excellent.

**About Page:**
- `hero_headline`: “Craftsmanship, considered” — excellent.
- `hero_subheadline`: “A Dublin workshop where traditional skill meets contemporary design.” — good.
- `story_headline`: “Built on patience and precision” — excellent.
- `story_body_1`: “TINEO was founded on the belief that the best furniture is made slowly, by people who understand timber.” — uses *best*; replace with “finest” or “most enduring.”
- `craft_headline`: “Materials that endure” — excellent.
- `craft_body`: “We source solid hardwoods and premium veneers from trusted European suppliers. Our finishes are applied by hand, and our hardware is chosen for how it feels after ten thousand uses.” — excellent.
- `team_body`: “A small team of designers, makers, and installers. Everyone who works on your project shares the same standard: would this sit comfortably in our own home?” — excellent.
- `why_us_headline`: “The Difference” — okay, could be stronger.
- `cta_headline`: “Experience the difference” — slightly generic.

**Services Page:**
- `hero_headline`: “Bespoke furniture and interiors” — generic.
- `hero_subheadline`: “Residential and commercial work, designed and built in Dublin.” — functional.
- `residential_headline`: “For Your Home” — plain.
- `commercial_headline`: “For Your Business” — plain.
- `process_headline`: “How We Work” — okay.
- `materials_headline`: “Finishes & Materials” — good.
- `materials_cta`: “Discuss Material Options” — good.
- `cta_headline`: “Ready to begin?” — okay.

**Projects Page:**
- `hero_headline`: “Recent Work” — should be “Selected Work.”
- `hero_subheadline`: “Residential and commercial projects built with care in our Dublin workshop.” — generic.

**Project Detail:**
- `cta_headline`: “Like what you see?” — too casual for luxury.
- `cta_button`: “Discuss a Similar Project” — good.

**Contact Page:**
- `hero_headline`: “Start a Conversation” — excellent.
- `form_title`: “Project Enquiry” — good.
- `form_subtitle`: “Fill in the form below and we will be in touch.” — could be warmer.
- `info_headline`: “How to reach us” — okay.
- `info_subheadline`: “Email, call, or visit us by appointment. We reply within two business days.” — good.

**Form:**
- Placeholders are generic but functional: “Your name”, “you@example.com”, “Describe your space, timeline, and any inspiration...”
- Could be elevated with examples: “e.g. Georgian terrace, Dublin 6” or “Tell us about the room, your timeline, and any materials you are drawn to.”

**Footer:**
- `cta_title`: “Have a project in mind?” — replace with “Begin your project.”
- `company_placeholder`: placeholder text.

---

## 4. Priority List of Content Changes (Top 20)

1. **Fix legal placeholder** — replace `[Existing Company Name]` in `site.ts` and `legal.ts`.
2. **Fix team placeholders** — replace all `[Name]` placeholders in `team.ts` or remove team grid.
3. **Fix contact details** — replace fake phone/WhatsApp and vague address in `site.ts`.
4. **Rewrite hero headline** in `en.json` and `site.ts` for luxury positioning.
5. **Rewrite hero subheadline** to lead with workshop credibility, not geography.
6. **Rewrite `site.tagline`** to be ownable and precise.
7. **Update SEO default title/description** in `site.ts`.
8. **Rewrite why-us descriptions** to remove clichés and elevate specificity.
9. **Rewrite service descriptions** to focus on transformation, not feature lists.
10. **Rename selected service titles** for architectural weight (e.g., “Wardrobes & Dressing Rooms”).
11. **Rewrite featured project titles/descriptions** to be less catalogue-like.
12. **Update Projects page headline** from “Recent Work” to “Selected Work.”
13. **Rewrite project detail CTA** “Like what you see?” to something more premium.
14. **Rewrite materials descriptions** to remove “perfection” and “luxurious.”
15. **Update About page story copy** to remove “best” and “finest homes.”
16. **Rewrite testimonials** to remove “attention to detail” and “start to finish” clichés.
17. **Move hardcoded contact subtexts** into `en.json` for i18n consistency.
18. **Elevate form placeholders** with contextual examples rather than generic prompts.
19. **Decide i18n strategy** for empty `fr.json`, `de.json`, `es.json`, `pl.json` files — either translate or remove.
20. **Create a single source of truth** for tagline/hero headline to prevent future drift between `site.ts` and `en.json`.

---

## 5. Specific Rewrite Examples (Ready to Use)

### 5.1 Tagline
**Current:** “Handcrafted Furniture, Designed for Your Space”
**Premium rewrite:** “Furniture, measured in millimetres.”

### 5.2 Hero Subtext
**Current:** “Custom wardrobes, kitchens, and interiors. Built in Dublin, delivered across Ireland.”
**Premium rewrite:** “Bespoke wardrobes, kitchens, and interior joinery from our Dublin workshop.”

### 5.3 Three Featured Projects

**Penthouse Wardrobe Suite**
- Title: “Dublin Bay Dressing Room”
- Description: “A master-suite dressing room in American walnut, designed to follow the ceiling line and frame the bay.”

**Blackrock Kitchen**
- Title: “Blackrock Family Kitchen”
- Description: “A handleless charcoal kitchen with island and honed stone worktop, set within a Victorian house in Blackrock.”

**The Shelbourne Fittings**
- Title: “Hotel Reception & Lounge”
- Description: “Reception joinery and lounge seating for a five-star Dublin hotel, built to withstand high traffic while feeling residential.”

### 5.4 Three Services

**Custom Wardrobes → Wardrobes & Dressing Rooms**
- Description: “Fitted wardrobes designed around the architecture of your room and the rhythm of your day.”

**Bespoke Kitchens → Kitchens**
- Description: “Kitchens built for how you cook, gather, and live. Handleless contemporary, classic timber, or something quietly in between.”

**Walk-in Closets → Dressing Rooms**
- Description: “Calm, organised dressing rooms where every garment has its place and every morning starts with ease.”

### 5.5 Three Why-Us Items

**Truly Bespoke → Made to Measure**
- Description: “Every piece is drawn around your room, your habits, and the light. No standard sizes. No concessions.”

**Irish Craftsmanship → Dublin Workshop**
- Description: “Built in our Dublin workshop by makers who understand timber, tolerance, and the weight of a well-made joint.”

**Premium Materials → Materials First**
- Description: “Solid hardwoods, curated veneers, and European hardware chosen for how they age, not just how they look.”

### 5.6 CTA Copy

**Current:** “Have a project in mind?”
**Premium rewrite:** “Begin your project.”

**Current:** “Like what you see?” (project detail)
**Premium rewrite:** “Discuss a similar project.”

**Current:** “Ready to begin?” (services page)
**Premium rewrite:** “Start a conversation.”

---

## 6. Inconsistencies to Resolve

1. **Tagline duplication:** `site.ts` `tagline`, `en.json` `home.hero_headline`, and `Footer.svelte` all repeat the same line. Centralize or intentionally differentiate.
2. **Sub-tagline duplication:** `site.ts` `subTagline` equals `en.json` `home.hero_subheadline`.
3. **Company name duplication:** `site.ts` `companyLegalName` and `en.json` `footer.company_placeholder` both hold the legal entity. Use `site.companyLegalName` everywhere.
4. **Project page headline mismatch:** PRD says “Selected Work”; current code uses “Recent Work.”
5. **Locale files empty:** `fr.json`, `de.json`, `es.json`, `pl.json` are empty objects. Either provide translations or remove unsupported locales.
6. **Hardcoded English day names** in `contact/+page.svelte` break i18n if French/German launch proceeds.
7. **Mixed tone in legal copy:** Legal text is appropriately formal, but placeholders make it unusable. Fix placeholders first, then do a consistency pass.

---

## 7. Summary Recommendation

The TINEO site already has strong visual architecture and a sensible content structure. The biggest leap to luxury positioning will come from:

1. **Removing placeholders and fake contact details** — these instantly destroy credibility.
2. **Rewriting the hero/tagline** to be precise and ownable rather than descriptive.
3. **Elevating service language** from feature lists to transformation statements.
4. **Editing project copy** for architectural and sensory specificity, removing lifestyle clichés.
5. **Applying the brand voice guide consistently** across every i18n key and data file.

With these changes, the copy will match the dark, precise, confident aesthetic already established in the design system.
