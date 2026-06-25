<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/state';
	import { site } from '$lib/data/site';
	import { projects } from '$lib/data/projects';

	import Section from '$lib/components/atoms/Section.svelte';
	import SectionHeader from '$lib/components/atoms/SectionHeader.svelte';
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

<Section container="content">
	<div class="space-y-16">
		<SectionHeader
			eyebrow={$_('project_detail.overview_eyebrow')}
			headline={project.title}
			statement={project.overview}
			class="mb-0"
		/>
		<div class="grid gap-12 md:grid-cols-2">
			<SectionHeader
				eyebrow={$_('project_detail.challenge_eyebrow')}
				statement={project.challenge}
				class="mb-0"
			/>
			<SectionHeader
				eyebrow={$_('project_detail.solution_eyebrow')}
				statement={project.solution}
				class="mb-0"
			/>
		</div>
	</div>
</Section>

<ProjectGallery media={project.media.gallery} />

<SpecificationsTable specs={project.specs} />

<RelatedProjects currentSlug={project.slug} {projects} />

<CTABannerSection
	headline={$_('project_detail.cta_headline')}
	ctaLabel={$_('project_detail.cta_button')}
/>
