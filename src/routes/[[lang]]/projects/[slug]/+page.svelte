<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/state';
	import { site } from '$lib/data/site';
	import { projects } from '$lib/data/projects';

	import SeoHead from '$lib/components/molecules/SeoHead.svelte';
	import ProjectDetailHeader from '$lib/components/organisms/ProjectDetailHeader.svelte';
	import ProjectGallery from '$lib/components/organisms/ProjectGallery.svelte';
	import SpecificationsTable from '$lib/components/organisms/SpecificationsTable.svelte';
	import RelatedProjects from '$lib/components/organisms/RelatedProjects.svelte';
	import CTABannerSection from '$lib/components/organisms/CTABannerSection.svelte';

	const project = $derived(projects.find((p) => p.slug === page.params.slug)!);

	const ogImage = $derived(`${site.seo.siteUrl}${project.media.hero.src}`);

	const productSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: project.title,
		description: project.description,
		image: ogImage,
		brand: {
			'@type': 'Brand',
			name: site.brand
		},
		manufacturer: {
			'@type': 'Organization',
			name: site.brand,
			url: site.seo.siteUrl
		}
	});
</script>

<svelte:head>
	<title>{project.title} {$_('project_detail.meta_title_suffix')}</title>
	<meta name="description" content={project.description} />
	<meta property="og:title" content="{project.title} {$_('project_detail.meta_title_suffix')}" />
	<meta property="og:description" content={project.description} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:type" content="article" />
	<link rel="canonical" href="{site.seo.siteUrl}/projects/{project.slug}/" />
	{@html '<script type="application/ld+json">' + JSON.stringify(productSchema) + '</script>'}
</svelte:head>

<SeoHead
	title="{project.title} {$_('project_detail.meta_title_suffix')}"
	description={project.description}
	image={ogImage}
	type="product"
	canonical="{site.seo.siteUrl}/projects/{project.slug}/"
/>

<ProjectDetailHeader {project} />

<section class="bg-bg-primary py-20 md:py-28">
	<div class="mx-auto max-w-4xl px-6 lg:px-8">
		<div class="space-y-16">
			<div>
				<span class="text-sm font-medium uppercase tracking-widest text-accent"
					>{$_('project_detail.overview_eyebrow')}</span
				>
				<h2 class="mt-4 font-serif text-3xl font-light md:text-4xl">{project.title}</h2>
				<p class="mt-6 text-lg leading-relaxed text-text-secondary">{project.overview}</p>
			</div>
			<div class="grid gap-12 md:grid-cols-2">
				<div>
					<span class="text-sm font-medium uppercase tracking-widest text-accent"
						>{$_('project_detail.challenge_eyebrow')}</span
					>
					<p class="mt-4 leading-relaxed text-text-secondary">{project.challenge}</p>
				</div>
				<div>
					<span class="text-sm font-medium uppercase tracking-widest text-accent"
						>{$_('project_detail.solution_eyebrow')}</span
					>
					<p class="mt-4 leading-relaxed text-text-secondary">{project.solution}</p>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="bg-bg-secondary py-20 md:py-28">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<span class="text-sm font-medium uppercase tracking-widest text-accent"
			>{$_('project_detail.gallery_eyebrow')}</span
		>
		<h2 class="mt-4 font-serif text-3xl font-light md:text-4xl">{project.title}</h2>
		<div class="mt-12">
			<ProjectGallery media={project.media.gallery} />
		</div>
	</div>
</section>

<section class="bg-bg-primary py-20 md:py-28">
	<div class="mx-auto max-w-4xl px-6 lg:px-8">
		<span class="text-sm font-medium uppercase tracking-widest text-accent"
			>{$_('project_detail.specs_eyebrow')}</span
		>
		<h2 class="mt-4 font-serif text-3xl font-light md:text-4xl">
			{$_('project_detail.specs_eyebrow')}
		</h2>
		<div class="mt-12">
			<SpecificationsTable specs={project.specs} />
		</div>
	</div>
</section>

<RelatedProjects currentSlug={project.slug} {projects} />

<CTABannerSection
	headline={$_('project_detail.cta_headline')}
	ctaLabel={$_('project_detail.cta_button')}
/>
