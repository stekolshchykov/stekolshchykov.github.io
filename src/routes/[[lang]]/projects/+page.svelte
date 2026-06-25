<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { site } from '$lib/data/site';
	import { projects } from '$lib/data/projects';

	import Section from '$lib/components/atoms/Section.svelte';
	import SectionHeader from '$lib/components/atoms/SectionHeader.svelte';
	import SeoHead from '$lib/components/molecules/SeoHead.svelte';
	import PageHeroSection from '$lib/components/organisms/PageHeroSection.svelte';
	import ProjectGrid from '$lib/components/organisms/ProjectGrid.svelte';
</script>

<svelte:head>
	<title>{$_('projects.meta_title')}</title>
	<meta name="description" content={$_('projects.meta_description')} />
	<meta property="og:title" content={$_('projects.meta_title')} />
	<meta property="og:description" content={$_('projects.meta_description')} />
	<meta property="og:image" content="{site.seo.siteUrl}/og-projects.jpg" />
	<meta property="og:type" content="website" />
	<link rel="canonical" href="{site.seo.siteUrl}/projects/" />
</svelte:head>

<SeoHead
	title={$_('projects.meta_title')}
	description={$_('projects.meta_description')}
	image="{site.seo.siteUrl}/og-projects.jpg"
	type="website"
	canonical="{site.seo.siteUrl}/projects/"
/>

<PageHeroSection
	eyebrow={$_('projects.hero_eyebrow')}
	headline={$_('projects.hero_headline')}
	subheadline={$_('projects.hero_subheadline')}
	image="/images/projects-hero.jpg"
/>

<Section tone="secondary" container="content">
	<div class="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
		<SectionHeader
			eyebrow="How to read the work"
			headline="Each project shows a different kind of constraint."
			statement="The portfolio is arranged to show how Áras Living handles real rooms: awkward ceiling lines, period proportions, heavy daily use, commercial deadlines, and material palettes that need to age quietly."
			class="mb-0"
		/>
		<div class="grid gap-6 md:grid-cols-3">
			<div class="border-t border-text-primary/10 pt-5">
				<p class="mb-3 font-serif text-2xl text-accent">01</p>
				<h2 class="mb-3 font-sans text-xs uppercase tracking-[0.15em] text-text-primary">
					The room
				</h2>
				<p class="font-sans text-sm leading-relaxed text-text-secondary">
					Look at how the furniture meets existing architecture: chimney breasts, skirting,
					windows, floor lines, and circulation.
				</p>
			</div>
			<div class="border-t border-text-primary/10 pt-5">
				<p class="mb-3 font-serif text-2xl text-accent">02</p>
				<h2 class="mb-3 font-sans text-xs uppercase tracking-[0.15em] text-text-primary">
					The material
				</h2>
				<p class="font-sans text-sm leading-relaxed text-text-secondary">
					Each case study records the timber, lacquer, stone, hardware, and finish decisions that
					create the final atmosphere.
				</p>
			</div>
			<div class="border-t border-text-primary/10 pt-5">
				<p class="mb-3 font-serif text-2xl text-accent">03</p>
				<h2 class="mb-3 font-sans text-xs uppercase tracking-[0.15em] text-text-primary">
					The outcome
				</h2>
				<p class="font-sans text-sm leading-relaxed text-text-secondary">
					The strongest projects are not only photographed well. They change how the room works
					after handover.
				</p>
			</div>
		</div>
	</div>
</Section>

<Section>
	<ProjectGrid {projects} />
</Section>

<Section tone="secondary" container="content">
	<div class="grid gap-10 md:grid-cols-2">
		<div>
			<h2 class="mb-4 font-sans text-xs uppercase tracking-[0.15em] text-accent">
				Residential work
			</h2>
			<p class="font-sans leading-relaxed text-text-secondary">
				Residential projects usually begin with a room that is almost working: a wardrobe with wasted
				height, a kitchen that interrupts family routine, or a living room where storage has become
				visual noise. We use the case studies to show how fitted furniture can make those rooms calmer
				without making them feel over-designed.
			</p>
		</div>
		<div>
			<h2 class="mb-4 font-sans text-xs uppercase tracking-[0.15em] text-accent">
				Commercial work
			</h2>
			<p class="font-sans leading-relaxed text-text-secondary">
				Commercial projects are judged by a different pressure: footfall, programme, maintenance,
				brand consistency, and the quality of the first impression. Reception desks, retail fittings,
				workplaces, and hospitality joinery are designed to be handled every day and still feel
				considered.
			</p>
		</div>
	</div>
</Section>
