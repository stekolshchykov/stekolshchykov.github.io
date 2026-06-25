# Ultra-Premium Furniture & Interior Websites — Interaction Design Study for TINEO

**Date:** 2026-06-25  
**Scope:** Deconstruct the “WOW” interaction language of ultra-premium furniture / interior brands and translate it into concrete, buildable patterns for TINEO’s SvelteKit + GSAP stack.

**References studied**

- https://www.poggenpohl.com/en/kitchen-architecture/products/segmento/
- https://www.molteni.it/en/landing/inspiration-kitchen
- https://www.poliform.it/us/
- https://www.boffi.com/en/
- https://www.minotti.com/en
- https://www.flexform.it/en
- https://www.depadova.com/

**Methodology**

- Fetched live pages (HTML/inline CSS/JS) to identify the animation libraries, loading strategies and DOM patterns each brand actually uses.
- Ran targeted web searches for published interaction analyses of luxury furniture sites.
- Cross-referenced observations against common premium UX patterns (SplitType, ScrollTrigger, custom cursor, masking, etc.).

---

## 1. What the references actually do

### 1.1 Page-load sequence and intro animations

| Brand | Observed load behaviour |
|-------|--------------------------|
| **Boffi** | Hides the page until Swiper is ready (`body.swiper-loaded.home { visibility: visible; opacity: 1; }`), then fades in. Hero uses a looping Splide carousel. |
| **Poggenpohl** | Shopware-based. Uses a base64 SVG lazy-loading skeleton, jQuery-driven theme and breakpoint-driven JS. Hero image + headline fade in after DOM is ready. |
| **Molteni** | Custom Symfony/PHP frontend. Hero copy fades up; sections below are revealed as the user scrolls. No heavy preload curtain. |
| **Poliform** | WordPress custom theme (`app.css`, jQuery). Likely relies on CSS fade-ins and scroll-triggered classes rather than a full SPA transition. |
| **Minotti** | Older custom stack with `font-observer` class on `<html>`; body starts white and fades content once webfonts load. |
| **De Padova** | Bootstrap-based nav; shows a `#loading-modal` while menu items load; uses Fancybox for lightbox imagery. |

**Key insight:** Premium sites do not let the user see an un-styled DOM. They either:

1. Start with `opacity: 0` / `visibility: hidden` and fade in once fonts + first image are ready, or
2. Show a tasteful brand curtain / loader that disappears with a wipe or fade.

### 1.2 Scroll-driven narratives and parallax

- **Molteni** structures long-form landing pages as a vertical story: hero → product carousel → “Dada Engineered” manifesto → designer cards → form. Each block is visually separated by generous whitespace and likely triggered fade/slide animations.
- **Boffi** uses full-width video sections and a looping image slider to create a “living” homepage.
- **Poggenpohl** product pages stack large lifestyle images with short captions, letting the product itself be the narrative.

Common pattern: **sticky image + scrolling text panel**. One side pins while the other scrolls, creating a magazine-style read.

### 1.3 Hover / micro-interactions on images, cards, links

- **Image zoom on hover** — image scales from `1.0` to `1.06` inside an `overflow: hidden` mask (Boffi product cards, Poliform lookbook).
- **Secondary-image swap** — on product grids, hovering reveals an alternate angle or lifestyle shot (Molteni, Minotti collections).
- **Link underline expansion** — text links animate a `scaleX` underline from 0 → 1 centered or left-aligned.
- **Button magnetic pull** — CTA buttons subtly follow the cursor within a small radius.

### 1.4 Cursor behavior

- Most of these brands keep the **native cursor** for accessibility but add a **contextual custom cursor** only inside galleries / project cards:
  - “Discover”, “View”, “Drag”, circular cursor with `mix-blend-mode: difference`.
  - Cursor scales up on clickable media and shrinks on text.
- Boffi/De Padova do not replace the cursor globally; they reserve custom cursor states for immersive sections.

### 1.5 Page transitions

- Boffi/Poliform/De Padova are multi-page WordPress/PHP sites, so transitions are minimal (hard page loads with fade-in on ready).
- Molteni/Minotti also use traditional MPAs.
- For TINEO (SvelteKit), the opportunity is to implement **SPA-style cross-fades** between routes, which these legacy sites cannot easily do. This is a genuine differentiator.

### 1.6 Image reveal techniques

Observed / inferred:

- **Clip-path inset wipe** — `clip-path: inset(0 100% 0 0)` → `inset(0 0 0 0)` for a horizontal reveal.
- **Scale-down + opacity** — image starts at `scale(1.12)` / `opacity: 0` and settles to `scale(1)` / `opacity: 1`.
- **Overlay curtain** — a solid colour block slides away to reveal the image beneath (common in Poliform-style editorial layouts).
- **Lazy skeleton** — Poggenpohl uses an inline SVG shimmer before the real image appears.

### 1.7 Text reveal techniques

- **Line-by-line clip reveal** — `overflow: hidden` on each line, translate text from `y: 100%` to `0`.
- **Word/char stagger** — SplitType splits headings into lines/words/chars; each element animates with a tiny stagger.
- **Fade + blur** — some headings animate `filter: blur(6px)` → `blur(0)` together with opacity for a “focus into view” effect.

### 1.8 How they handle material / configuration stories

- **Boffi** product detail pages show huge swatch grids (woods, stones, metals). Selecting a finish updates the hero image / colour name without a full reload.
- **Molteni** frames kitchens as configurable systems: “200+ finishes”, “customized layouts”.
- **Poggenpohl** uses text + image pairings to explain material choices (“smoked oak”, “natural stone frames the drawers”).

The pattern: a **configurator is not a separate tool** — it is woven into the storytelling. Each material gets a cinematic image and a short sentence about tactility.

### 1.9 Mobile-specific premium interactions

- Almost all sites hide heavy hover effects on touch.
- **Swipeable carousels** (Splide/Swiper) become the primary navigation pattern on mobile.
- **Bottom sheets** for filters and material selectors instead of sidebars.
- **Reduced parallax** — desktop parallax is dampened or removed on mobile to preserve frame rate and prevent motion sickness.
- **Tap-to-reveal** cards expand inline instead of relying on hover.

### 1.10 What NOT to do (gimmicks that backfire)

1. **Scroll hijacking / smooth-scroll libraries that take over native scrolling.** Feels heavy, breaks accessibility, and hurts performance.
2. **Persistent custom cursor everywhere.** Annoying for text selection and forms; reserve it for specific zones.
3. **Auto-playing ambient sound.** Premium ≠ intrusive.
4. **Intro animations longer than ~1.2 s.** Users want to browse, not watch a movie.
5. **Heavy WebGL just for the sake of it.** Beautiful but costly; only use if it communicates materiality (e.g. fabric simulation).
6. **Excessive parallax layers.** Causes judder on low-end devices and looks amateurish if overdone.
7. **Text that animates in too slowly.** Reading flow should never wait for animation.
8. **Loading screens on every route.** A one-time initial curtain is fine; per-page spinners feel cheap.

---

## 2. TINEO interaction patterns to adopt

The following 14 patterns are chosen because they:

- Appear repeatedly across the reference brands.
- Can be implemented cleanly in **SvelteKit + GSAP**.
- Degrade gracefully on mobile and respect `prefers-reduced-motion`.

---

### Pattern 1 — Cinematic page-load curtain

**What it is:** A full-screen brand-colour panel that wipes/fades away once critical assets and webfonts are ready.

**Why adopt:** Boffi, Minotti and Poggenpohl all avoid showing an un-styled DOM. A curtain creates instant perceived premiumness.

**SvelteKit + GSAP pseudocode**

```svelte
<!-- +layout.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  let curtain: HTMLDivElement;
  let ready = false;

  onMount(() => {
    // Wait for fonts + first meaningful paint
    Promise.all([
      document.fonts.ready,
      new Promise((r) => requestAnimationFrame(r))
    ]).then(() => {
      ready = true;
      gsap.to(curtain, {
        yPercent: -100,
        duration: 1.0,
        ease: 'power3.inOut',
        onComplete: () => curtain?.remove()
      });
    });
  });
</script>

{#if !ready}
  <div bind:this={curtain} class="fixed inset-0 z-[100] bg-stone-100" aria-hidden="true" />
{/if}
<slot />
```

---

### Pattern 2 — Hero image scale-reveal with clip-path

**What it is:** The hero image starts slightly zoomed and masked, then settles into full view while the mask wipes open.

**Why adopt:** Poliform and Boffi hero imagery uses this “camera settle” effect to add gravitas.

**SvelteKit + GSAP pseudocode**

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  let wrapper: HTMLDivElement;
  let img: HTMLImageElement;

  onMount(() => {
    const tl = gsap.timeline();
    tl.from(wrapper, { clipPath: 'inset(0 100% 0 0)', duration: 1.2, ease: 'power3.out' })
      .from(img, { scale: 1.15, duration: 1.4, ease: 'power2.out' }, 0);
  });
</script>

<div bind:this={wrapper} class="overflow-hidden" style="clip-path: inset(0 0 0 0);">
  <img bind:this={img} src="/images/hero.jpg" alt="..." class="w-full h-full object-cover" />
</div>
```

---

### Pattern 3 — Staggered split-text headline reveal

**What it is:** The main headline animates in line-by-line or word-by-word with a short stagger.

**Why adopt:** Molteni and Poggenpohl use large editorial headlines; splitting them makes the page feel crafted.

**SvelteKit + GSAP pseudocode**

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import SplitType from 'split-type';

  let heading: HTMLHeadingElement;

  onMount(() => {
    const split = new SplitType(heading, { types: 'lines,words' });
    gsap.from(split.words, {
      y: '110%',
      opacity: 0,
      duration: 0.9,
      stagger: 0.04,
      ease: 'power3.out',
      delay: 0.4
    });
  });
</script>

<h1 bind:this={heading} class="overflow-hidden text-6xl">
  Kitchens that create a visual experience
</h1>
```

---

### Pattern 4 — Scroll-scrubbed parallax hero

**What it is:** The hero image translates vertically at a slower rate than the scroll while the text fades out.

**Why adopt:** Adds depth without the heavy feel of full scroll-hijacking; used by Poliform and Molteni landing pages.

**SvelteKit + GSAP pseudocode**

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  let heroImg: HTMLImageElement;
  let heroText: HTMLDivElement;

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(heroImg, {
      yPercent: 25,
      ease: 'none',
      scrollTrigger: {
        trigger: heroImg,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.to(heroText, {
      opacity: 0,
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: heroText,
        start: 'top top',
        end: '+=400',
        scrub: true
      }
    });
  });
</script>
```

---

### Pattern 5 — Horizontal “material story” scroll section

**What it is:** A horizontal scroll container that is pinned while the user scrolls vertically, revealing material cards one by one.

**Why adopt:** Boffi and Poggenpohl rely on material storytelling; horizontal scrolling makes it feel like a curated gallery.

**SvelteKit + GSAP pseudocode**

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  let track: HTMLDivElement;

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);
    const cards = track.querySelectorAll('.material-card');
    const totalWidth = track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: track,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        pin: true,
        scrub: 1
      }
    });
  });
</script>

<div bind:this={track} class="flex gap-8 px-8">
  {#each materials as m}
    <article class="material-card min-w-[80vw] md:min-w-[40vw]">...</article>
  {/each}
</div>
```

---

### Pattern 6 — Image mask wipe on scroll

**What it is:** As an image enters the viewport, a solid overlay slides away or the clip-path opens to reveal it.

**Why adopt:** Poggenpohl product pages and Poliform editorial layouts use this to make imagery feel “unveiled”.

**SvelteKit + GSAP pseudocode**

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  let figure: HTMLElement;

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      figure,
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: figure,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
</script>

<figure bind:this={figure}>
  <img src="/images/kitchen.jpg" alt="..." />
</figure>
```

---

### Pattern 7 — Magnetic “Discover” cursor

**What it is:** Inside project/image cards the cursor becomes a small circle with a label; it magnetically sticks to clickable media and uses `mix-blend-mode: difference`.

**Why adopt:** Adds a tactile, gallery-like feel without replacing the cursor everywhere.

**SvelteKit + GSAP pseudocode**

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  let cursor: HTMLDivElement;
  let zone: HTMLElement;

  onMount(() => {
    zone.addEventListener('mousemove', (e) => {
      const rect = zone.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      gsap.to(cursor, { x, y, duration: 0.25, ease: 'power2.out' });
    });
    zone.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 }));
    zone.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 }));
  });
</script>

<div bind:this={zone} class="relative cursor-none">
  <img src="/images/project.jpg" alt="..." />
  <div bind:this={cursor} class="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white text-black mix-blend-difference flex items-center justify-center opacity-0 scale-0">
    Discover
  </div>
</div>
```

---

### Pattern 8 — Hover image zoom + secondary image reveal

**What it is:** On product cards, hovering scales the primary image and crossfades to a lifestyle/alternate shot.

**Why adopt:** Molteni and Minotti collection grids rely on this to show more product context without clutter.

**SvelteKit + GSAP pseudocode**

```svelte
<script lang="ts">
  import { gsap } from 'gsap';

  let card: HTMLElement;
  let primary: HTMLImageElement;
  let secondary: HTMLImageElement;

  function onEnter() {
    gsap.to(primary, { scale: 1.06, opacity: 0, duration: 0.5 });
    gsap.fromTo(secondary, { scale: 1.06, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 });
  }
  function onLeave() {
    gsap.to(primary, { scale: 1, opacity: 1, duration: 0.5 });
    gsap.to(secondary, { opacity: 0, duration: 0.5 });
  }
</script>

<article bind:this={card} class="relative overflow-hidden" onmouseenter={onEnter} onmouseleave={onLeave}>
  <img bind:this={primary} src="/images/product-1.jpg" alt="..." class="w-full object-cover" />
  <img bind:this={secondary} src="/images/product-1-hover.jpg" alt="..." class="absolute inset-0 w-full object-cover opacity-0" />
</article>
```

---

### Pattern 9 — Text-image pinning narrative

**What it is:** A long editorial section where the image pins on one side while text paragraphs scroll on the other, each paragraph triggering a subtle image update.

**Why adopt:** Used by Molteni “Dada Engineered” manifesto and Poggenpohl product storytelling.

**SvelteKit + GSAP pseudocode**

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  let section: HTMLElement;

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      pin: section.querySelector('.pin-image'),
      pinSpacing: false
    });

    section.querySelectorAll('.story-step').forEach((step, i) => {
      gsap.from(step, {
        opacity: 0,
        y: 40,
        scrollTrigger: {
          trigger: step,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  });
</script>

<section bind:this={section} class="grid md:grid-cols-2">
  <div class="pin-image h-screen sticky top-0">...</div>
  <div class="space-y-[60vh] py-[20vh]">
    {#each steps as step}
      <div class="story-step">{step.text}</div>
    {/each}
  </div>
</section>
```

---

### Pattern 10 — Underline / stroke link micro-interaction

**What it is:** Text links have a thin underline that grows from `scaleX(0)` to `scaleX(1)` on hover.

**Why adopt:** Almost every reference brand uses this for navigation and inline links; it is the signature of a premium editorial site.

**SvelteKit + GSAP pseudocode**

```svelte
<script lang="ts">
  import { gsap } from 'gsap';

  let line: HTMLSpanElement;

  function enter() { gsap.to(line, { scaleX: 1, duration: 0.35, transformOrigin: 'left', ease: 'power2.out' }); }
  function leave() { gsap.to(line, { scaleX: 0, duration: 0.35, transformOrigin: 'right', ease: 'power2.out' }); }
</script>

<a href="/" onmouseenter={enter} onmouseleave={leave} class="relative inline-block">
  Discover more
  <span bind:this={line} class="absolute bottom-0 left-0 w-full h-px bg-current scale-x-0 origin-left" />
</a>
```

---

### Pattern 11 — Product card 3D tilt / lift

**What it is:** Cards subtly rotate in 3D toward the cursor and lift with a soft shadow on hover.

**Why adopt:** Adds physicality to product grids; works well for furniture thumbnails.

**SvelteKit + GSAP pseudocode**

```svelte
<script lang="ts">
  import { gsap } from 'gsap';

  let card: HTMLElement;

  function onMove(e: MouseEvent) {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotationY: x * 8,
      rotationX: -y * 8,
      y: -8,
      boxShadow: '0 24px 40px rgba(0,0,0,0.12)',
      duration: 0.4,
      ease: 'power2.out'
    });
  }
  function onLeave() {
    gsap.to(card, { rotationY: 0, rotationX: 0, y: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.06)', duration: 0.4 });
  }
</script>

<article bind:this={card} onmousemove={onMove} onmouseleave={onLeave} class="transform-gpu perspective-1000" style="transform-style: preserve-3d;">
  ...
</article>
```

---

### Pattern 12 — Material swatch crossfade configurator

**What it is:** A set of material swatches; clicking one crossfades the product visual and updates the finish name with a text reveal.

**Why adopt:** Boffi and Poggenpohl product pages are essentially finish configurators; this pattern makes selection feel tactile.

**SvelteKit + GSAP pseudocode**

```svelte
<script lang="ts">
  import { gsap } from 'gsap';

  let activeFinish = finishes[0];
  let imageWrap: HTMLDivElement;

  function select(finish) {
    if (finish.id === activeFinish.id) return;
    gsap.to(imageWrap, { opacity: 0, duration: 0.25, onComplete: () => {
      activeFinish = finish;
      gsap.to(imageWrap, { opacity: 1, duration: 0.4 });
    }});
  }
</script>

<div class="grid md:grid-cols-2 gap-12">
  <div bind:this={imageWrap}>
    <img src={activeFinish.image} alt={activeFinish.name} />
  </div>
  <div class="flex flex-wrap gap-3">
    {#each finishes as f}
      <button onclick={() => select(f)} class="w-12 h-12 rounded-full border" style="background: {f.color}">
        <span class="sr-only">{f.name}</span>
      </button>
    {/each}
    <p class="w-full mt-4">{activeFinish.name}</p>
  </div>
</div>
```

---

### Pattern 13 — Page transition crossfade overlay

**What it is:** When the user navigates to a new route, a semi-transparent overlay fades in, the route changes, then the overlay fades out.

**Why adopt:** SvelteKit enables true SPA transitions; this gives TINEO a cinematic feel that legacy WordPress sites cannot match.

**SvelteKit + GSAP pseudocode**

```svelte
<!-- +layout.svelte -->
<script lang="ts">
  import { beforeNavigate, afterNavigate } from '$app/navigation';
  import { gsap } from 'gsap';

  let overlay: HTMLDivElement;

  beforeNavigate(() => {
    return new Promise((resolve) => {
      gsap.to(overlay, { opacity: 1, pointerEvents: 'auto', duration: 0.35, ease: 'power2.out', onComplete: resolve });
    });
  });

  afterNavigate(() => {
    gsap.to(overlay, { opacity: 0, pointerEvents: 'none', duration: 0.5, ease: 'power2.inOut' });
  });
</script>

<div bind:this={overlay} class="fixed inset-0 z-[90] bg-white opacity-0 pointer-events-none" aria-hidden="true" />
<slot />
```

---

### Pattern 14 — Mobile-first bottom-sheet gallery + reduced motion

**What it is:** On mobile, image galleries open in a bottom sheet; all non-essential motion is disabled when `prefers-reduced-motion: reduce` is active.

**Why adopt:** Boffi/De Padova use mobile nav overlays and lightboxes; TINEO should do the same while remaining accessible.

**SvelteKit + GSAP pseudocode**

```svelte
<script lang="ts">
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';

  let sheet: HTMLDivElement;
  let prefersReduced = false;

  onMount(() => {
    prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  function open() {
    if (prefersReduced) {
      sheet.style.transform = 'translateY(0)';
      sheet.style.opacity = '1';
    } else {
      gsap.fromTo(sheet, { yPercent: 100 }, { yPercent: 0, duration: 0.5, ease: 'power3.out' });
    }
  }
</script>

<div bind:this={sheet} class="fixed inset-x-0 bottom-0 z-50 translate-y-full bg-white rounded-t-2xl p-6">
  ...gallery content...
</div>
```

---

## 3. Implementation checklist for TINEO

- [ ] Add `prefers-reduced-motion` guard around all GSAP timelines.
- [ ] Keep the native cursor; use custom cursor only inside immersive zones.
- [ ] Use `transform` and `opacity` for animations; avoid animating `width`, `margin`, `top`, etc.
- [ ] Lazy-load below-the-fold images and decode them asynchronously.
- [ ] Register `ScrollTrigger` once in a layout effect and `ScrollTrigger.refresh()` after SvelteKit navigation.
- [ ] Avoid scroll-hijacking; let native scroll drive ScrollTrigger.
- [ ] Set a max intro curtain duration of ~1.2 s.
- [ ] Test on real mid-range mobile devices, not just desktop emulators.
- [ ] Provide static fallbacks when JS fails (server-rendered content should still be readable).

---

## 4. Summary

The ultra-premium furniture sites studied share a quiet, editorial interaction language: **reveal, don’t announce**. They use restrained motion — clip-path wipes, staggered text, subtle zooms, and sticky narratives — to let the product remain the hero. TINEO can stand out by executing the same patterns in a modern SvelteKit SPA while avoiding the legacy constraints (hard page loads, jQuery bloat) that limit these brands.

The 14 patterns above are ordered from foundational (load curtain, hero reveal) to advanced (custom cursor, configurator, transitions). Implement them incrementally, measure Core Web Vitals after each addition, and always offer a reduced-motion path.
