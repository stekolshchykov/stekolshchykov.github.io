<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/state';
	import { site } from '$lib/data/site';
	import { insights } from '$lib/data/insights';
	import { projects } from '$lib/data/projects';
	import { imageWithFallback } from '$lib/utils/imageFallback';

	import SeoHead from '$lib/components/molecules/SeoHead.svelte';
	import PageHeroSection from '$lib/components/organisms/PageHeroSection.svelte';
	import ProjectCard from '$lib/components/molecules/ProjectCard.svelte';
	import MagneticCard from '$lib/components/molecules/MagneticCard.svelte';
	import Section from '$lib/components/atoms/Section.svelte';
	import SectionHeader from '$lib/components/atoms/SectionHeader.svelte';

	const article = $derived(insights.find((a) => a.slug === page.params.slug)!);
	const related = $derived(
		projects.filter((p) => article.relatedProjects.includes(p.slug)).slice(0, 3)
	);

	const ogImage = $derived(
		`${site.seo.siteUrl}${imageWithFallback(article.heroImage.src, '/images/hero-poster.jpg')}`
	);

	const blogSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: article.title,
		description: article.excerpt,
		image: ogImage,
		datePublished: article.date,
		author: {
			'@type': 'Person',
			name: article.author
		},
		publisher: {
			'@type': 'Organization',
			name: site.brand,
			logo: {
				'@type': 'ImageObject',
				url: `${site.seo.siteUrl}${site.seo.defaultImage}`
			}
		}
	});
</script>

<svelte:head>
	<title>{article.title} {$_('project_detail.meta_title_suffix')}</title>
	<meta name="description" content={article.excerpt} />
	<meta property="og:title" content="{article.title} {$_('project_detail.meta_title_suffix')}" />
	<meta property="og:description" content={article.excerpt} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:type" content="article" />
	<link rel="canonical" href="{site.seo.siteUrl}/insights/{article.slug}/" />
	{@html '<script type="application/ld+json">' + JSON.stringify(blogSchema) + '</script>'}
</svelte:head>

<SeoHead
	title="{article.title} {$_('project_detail.meta_title_suffix')}"
	description={article.excerpt}
	image={ogImage}
	type="article"
	canonical="{site.seo.siteUrl}/insights/{article.slug}/"
	publishedAt={article.date}
	author={article.author}
/>

<PageHeroSection
	eyebrow={article.category}
	headline={article.title}
	subheadline="{article.readTime} — {article.author}"
	image={imageWithFallback(article.heroImage.src, '/images/hero-poster.jpg')}
	height="large"
/>

<Section container="narrow" containerClass="max-w-3xl">
	<div
		class="mb-12 flex items-center gap-4 font-sans text-xs uppercase tracking-[0.12em] text-text-secondary"
	>
		<span>{article.category}</span>
		<span class="h-px w-6 bg-text-secondary/40"></span>
		<time datetime={article.date}>
			{new Date(article.date).toLocaleDateString('en-IE', {
				day: 'numeric',
				month: 'long',
				year: 'numeric'
			})}
		</time>
	</div>

	<div class="space-y-16">
		{#each article.body as section}
			<div>
				<h2 class="mb-6 font-serif text-2xl text-text-primary md:text-3xl">{section.heading}</h2>
				<div class="space-y-4">
					{#each section.paragraphs as paragraph}
						<p class="font-sans leading-relaxed text-text-secondary">{paragraph}</p>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	{#if article.quote}
		<blockquote class="my-16 border-l border-accent pl-6 md:pl-8">
			<p class="mb-4 font-serif text-2xl font-light leading-snug text-text-primary md:text-3xl">
				"{article.quote.text}"
			</p>
			{#if article.quote.attribution}
				<cite class="font-sans text-sm not-italic text-accent">{article.quote.attribution}</cite>
			{/if}
		</blockquote>
	{/if}
</Section>

{#if related.length > 0}
	<Section tone="secondary">
		<SectionHeader headline={$_('insights.related_projects_label')} />
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each related as project}
				<MagneticCard intensity={0.1}>
					<ProjectCard {project} />
				</MagneticCard>
			{/each}
		</div>
	</Section>
{/if}

<Section>
	<a
		href="/en/insights/"
		class="group inline-flex items-center gap-3 font-sans text-sm uppercase tracking-widest text-text-primary transition-colors hover:text-accent"
	>
		<span class="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
		{$_('insights.back_to_insights')}
	</a>
</Section>
