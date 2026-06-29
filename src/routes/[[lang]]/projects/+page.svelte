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
			eyebrow="How to read the examples"
			headline="Reference imagery, not completed Áras Living projects."
			statement="These examples show the type of cabinetry language, material mood and room categories Áras Living can shape. Final photography and permissions will be confirmed separately before launch."
			class="mb-0"
		/>
		<div class="grid gap-6 md:grid-cols-3">
			<div class="border-t border-text-primary/10 pt-5">
				<p class="mb-3 font-serif text-2xl text-accent">01</p>
				<h2 class="mb-3 font-sans text-xs uppercase tracking-[0.15em] text-text-primary">
					The category
				</h2>
				<p class="font-sans text-sm leading-relaxed text-text-secondary">
					Kitchen, wardrobe, fitted furniture and commercial examples are separated so visitors
					can quickly understand the range.
				</p>
			</div>
			<div class="border-t border-text-primary/10 pt-5">
				<p class="mb-3 font-serif text-2xl text-accent">02</p>
				<h2 class="mb-3 font-sans text-xs uppercase tracking-[0.15em] text-text-primary">
					The mood
				</h2>
				<p class="font-sans text-sm leading-relaxed text-text-secondary">
					Each example is there to communicate calm lines, warm finishes, storage logic and the
					feeling of a completed room.
				</p>
			</div>
			<div class="border-t border-text-primary/10 pt-5">
				<p class="mb-3 font-serif text-2xl text-accent">03</p>
				<h2 class="mb-3 font-sans text-xs uppercase tracking-[0.15em] text-text-primary">
					The next step
				</h2>
				<p class="font-sans text-sm leading-relaxed text-text-secondary">
					When approved photography is supplied, examples can be expanded into richer galleries.
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
				Home cabinetry
			</h2>
			<p class="font-sans leading-relaxed text-text-secondary">
				Home examples focus on the spaces clients ask about most often: kitchens, wardrobes,
				bathrooms, utilities, living rooms, media walls and hallway storage.
			</p>
		</div>
		<div>
			<h2 class="mb-4 font-sans text-xs uppercase tracking-[0.15em] text-accent">
				Commercial spaces
			</h2>
			<p class="font-sans leading-relaxed text-text-secondary">
				Commercial examples show how cabinetry can support residential developments, offices,
				retail, hospitality and professional rooms without losing a premium visual standard.
			</p>
		</div>
	</div>
</Section>
