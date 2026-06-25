<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/state';
	import { site } from '$lib/data/site';
	import { materialsDetailed } from '$lib/data/materialsDetailed';
	import { imageWithFallback } from '$lib/utils/imageFallback';

	import SeoHead from '$lib/components/molecules/SeoHead.svelte';
	import PageHeroSection from '$lib/components/organisms/PageHeroSection.svelte';
	import ImageReveal from '$lib/components/molecules/ImageReveal.svelte';
	import MagneticCard from '$lib/components/molecules/MagneticCard.svelte';
	import Section from '$lib/components/atoms/Section.svelte';
	import SectionHeader from '$lib/components/atoms/SectionHeader.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import Button from '$lib/components/atoms/Button.svelte';

	const material = $derived(materialsDetailed.find((m) => m.id === page.params.slug)!);
	const related = $derived(
		materialsDetailed
			.filter((m) => m.family === material.family && m.id !== material.id)
			.slice(0, 3)
	);

	const ogImage = $derived(
		`${site.seo.siteUrl}${imageWithFallback(material.images.application.src, '/images/materials/european-oak.jpg')}`
	);

	const productSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: material.name,
		description: material.description,
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
	<title>{material.name} {$_('project_detail.meta_title_suffix')}</title>
	<meta name="description" content={material.description} />
	<meta property="og:title" content="{material.name} {$_('project_detail.meta_title_suffix')}" />
	<meta property="og:description" content={material.description} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:type" content="product" />
	<link rel="canonical" href="{site.seo.siteUrl}/materials/{material.id}/" />
	{@html '<script type="application/ld+json">' + JSON.stringify(productSchema) + '</script>'}
</svelte:head>

<SeoHead
	title="{material.name} {$_('project_detail.meta_title_suffix')}"
	description={material.description}
	image={ogImage}
	type="product"
	canonical="{site.seo.siteUrl}/materials/{material.id}/"
/>

<PageHeroSection
	eyebrow={material.family}
	headline={material.name}
	subheadline={material.tagline}
	image={imageWithFallback(material.images.application.src, '/images/materials/european-oak.jpg')}
	height="large"
/>

<Section container="content">
	<div class="grid gap-12 lg:grid-cols-3">
		<div class="lg:col-span-2">
			<p class="mb-8 font-serif text-2xl font-light leading-relaxed text-text-primary md:text-3xl">
				{material.description}
			</p>
			<p class="font-sans leading-relaxed text-text-secondary">
				<strong class="text-text-primary">{$_('materials.origin_label')}:</strong>
				{material.origin}
			</p>
		</div>
		<div class="space-y-8 lg:col-span-1">
			<div>
				<h2 class="mb-4 font-sans text-xs uppercase tracking-[0.15em] text-accent">
					{$_('materials.characteristics_label')}
				</h2>
				<ul class="space-y-2">
					{#each material.characteristics as characteristic}
						<li class="flex items-start gap-3 font-sans text-text-secondary">
							<span class="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent"></span>
							{characteristic}
						</li>
					{/each}
				</ul>
			</div>
			<div>
				<h2 class="mb-4 font-sans text-xs uppercase tracking-[0.15em] text-accent">
					{$_('materials.best_for_label')}
				</h2>
				<ul class="space-y-2">
					{#each material.bestFor as use}
						<li class="flex items-start gap-3 font-sans text-text-secondary">
							<span class="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent"></span>
							{use}
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</Section>

<Section tone="secondary">
	<div class="grid gap-6 md:grid-cols-2">
		<ImageReveal
			src={imageWithFallback(material.images.application.src, '/images/materials/european-oak.jpg')}
			alt={material.images.application.alt}
			class="aspect-[4/3] w-full"
			direction="right"
		/>
		<ImageReveal
			src={imageWithFallback(material.images.detail.src, '/images/materials/european-oak.jpg')}
			alt={material.images.detail.alt}
			class="aspect-[4/3] w-full"
			direction="left"
		/>
	</div>
</Section>

<Section container="content">
	<div class="grid gap-12 md:grid-cols-2">
		<div>
			<h2 class="mb-4 font-sans text-xs uppercase tracking-[0.15em] text-accent">
				{$_('materials.maintenance_label')}
			</h2>
			<p class="leading-relaxed text-text-secondary">{material.maintenance}</p>
		</div>
		<div>
			<h2 class="mb-4 font-sans text-xs uppercase tracking-[0.15em] text-accent">
				{$_('materials.sustainability_label')}
			</h2>
			<p class="leading-relaxed text-text-secondary">{material.sustainability}</p>
		</div>
	</div>
</Section>

{#if related.length > 0}
	<Section tone="secondary">
		<SectionHeader headline="Related materials" />
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each related as item}
				<MagneticCard intensity={0.1}>
					<a href="/en/materials/{item.id}/" class="group block bg-bg-primary">
						<div class="image-warm-overlay relative aspect-square overflow-hidden">
							<img
								src={imageWithFallback(
									item.images.swatch.src,
									'/images/materials/european-oak.jpg'
								)}
								alt={item.images.swatch.alt}
								loading="lazy"
								class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
							/>
						</div>
						<div class="p-5">
							<p class="mb-1 font-sans text-[11px] uppercase tracking-[0.12em] text-accent">
								{item.family}
							</p>
							<h3 class="font-serif text-xl text-text-primary">{item.name}</h3>
						</div>
					</a>
				</MagneticCard>
			{/each}
		</div>
	</Section>
{/if}

<Section container="narrow" align="center">
	<Heading as="h2" variant="serif" class="mb-6 text-3xl font-light text-text-primary md:text-4xl">
		{$_('materials.cta_headline')}
	</Heading>
	<Button variant="secondary" href="/en/contact/">
		{$_('materials.cta_button')}
	</Button>
</Section>
