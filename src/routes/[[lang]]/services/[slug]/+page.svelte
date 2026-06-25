<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/state';
	import { site } from '$lib/data/site';
	import { services } from '$lib/data/services';
	import { materialsDetailed } from '$lib/data/materialsDetailed';
	import type { MaterialDetailed } from '$lib/types/furniture';
	import { imageWithFallback } from '$lib/utils/imageFallback';

	import Section from '$lib/components/atoms/Section.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import SeoHead from '$lib/components/molecules/SeoHead.svelte';
	import PageHeroSection from '$lib/components/organisms/PageHeroSection.svelte';
	import ImageReveal from '$lib/components/molecules/ImageReveal.svelte';
	import SplitTextReveal from '$lib/components/molecules/SplitTextReveal.svelte';
	import MagneticCard from '$lib/components/molecules/MagneticCard.svelte';
	import TestimonialCard from '$lib/components/molecules/TestimonialCard.svelte';

	const service = $derived(services.find((s) => s.id === page.params.slug)!);
	const relatedMaterials = $derived(
		(service.relatedMaterials ?? [])
			.map((id) => materialsDetailed.find((m) => m.id === id))
			.filter((m): m is MaterialDetailed => !!m)
	);

	const ogImage = $derived(
		`${site.seo.siteUrl}${imageWithFallback(service.image.src, '/images/services-hero.jpg')}`
	);
</script>

<svelte:head>
	<title>{service.title} {$_('project_detail.meta_title_suffix')}</title>
	<meta name="description" content={service.description} />
	<meta property="og:title" content="{service.title} {$_('project_detail.meta_title_suffix')}" />
	<meta property="og:description" content={service.description} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:type" content="website" />
	<link rel="canonical" href="{site.seo.siteUrl}/services/{service.id}/" />
</svelte:head>

<SeoHead
	title="{service.title} {$_('project_detail.meta_title_suffix')}"
	description={service.description}
	image={ogImage}
	type="website"
	canonical="{site.seo.siteUrl}/services/{service.id}/"
/>

<PageHeroSection
	eyebrow={service.category}
	headline={service.title}
	subheadline={service.description}
	image={imageWithFallback(service.image.src, '/images/services-hero.jpg')}
	height="large"
/>

<Section container="content">
	<div class="grid gap-12 lg:grid-cols-3">
		<div class="lg:col-span-2">
			<p class="mb-8 font-serif text-2xl font-light leading-relaxed text-text-primary md:text-3xl">
				{service.longDescription}
			</p>
			<ul class="space-y-3">
				{#each service.features as feature}
					<li class="flex items-start gap-3 font-sans text-text-secondary">
						<span class="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent"></span>
						{feature}
					</li>
				{/each}
			</ul>
		</div>
		<div class="space-y-8 lg:col-span-1">
			{#if service.testimonial}
				<TestimonialCard {...service.testimonial} variant="default" />
			{/if}
		</div>
	</div>
</Section>

<Section tone="secondary" container="content">
	<div class="grid gap-12 md:grid-cols-2">
		<div>
			<Heading as="h2" variant="label" class="mb-6 text-accent">
				{$_('services.detail.process_label')}
			</Heading>
			<ol class="space-y-6">
				{#each service.process ?? [] as step, i}
					<li class="flex gap-4">
						<span class="font-serif text-2xl text-accent">{String(i + 1).padStart(2, '0')}</span>
						<p class="pt-1 font-sans text-text-secondary">{step}</p>
					</li>
				{/each}
			</ol>
		</div>
		<div>
			<Heading as="h2" variant="label" class="mb-6 text-accent">
				{$_('services.detail.deliverables_label')}
			</Heading>
			<ul class="space-y-3">
				{#each service.deliverables ?? [] as item}
					<li class="flex items-start gap-3 font-sans text-text-secondary">
						<span class="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent"></span>
						{item}
					</li>
				{/each}
			</ul>
		</div>
	</div>
</Section>

{#if service.gallery && service.gallery.length > 0}
	<Section>
		<h2 class="mb-12 font-serif text-3xl text-text-primary md:text-4xl">
			<SplitTextReveal as="span" text={$_('services.detail.gallery_label')} />
		</h2>
		<div class="grid gap-6 md:grid-cols-3">
			{#each service.gallery as image, i}
				<ImageReveal
					src={imageWithFallback(image.src, '/images/services-hero.jpg')}
					alt={image.alt}
					class="aspect-[4/3] w-full"
					direction={i % 2 === 0 ? 'up' : 'down'}
				/>
			{/each}
		</div>
	</Section>
{/if}

{#if relatedMaterials.length > 0}
	<Section tone="secondary">
		<h2 class="mb-12 font-serif text-3xl text-text-primary md:text-4xl">
			<SplitTextReveal as="span" text={$_('services.detail.materials_label')} />
		</h2>
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each relatedMaterials as material}
				<MagneticCard intensity={0.1}>
					<a href="/en/materials/{material.id}/" class="group block bg-bg-primary">
						<div class="image-warm-overlay relative aspect-square overflow-hidden">
							<img
								src={imageWithFallback(
									material.images.swatch.src,
									'/images/materials/european-oak.jpg'
								)}
								alt={material.images.swatch.alt}
								loading="lazy"
								class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
							/>
						</div>
						<div class="p-5">
							<p class="mb-1 font-sans text-[11px] uppercase tracking-[0.12em] text-accent">
								{material.family}
							</p>
							<h3 class="font-serif text-xl text-text-primary">{material.name}</h3>
						</div>
					</a>
				</MagneticCard>
			{/each}
		</div>
	</Section>
{/if}

<Section container="narrow" align="center">
	<Heading as="h2" variant="serif" class="mb-6 text-3xl font-light text-text-primary md:text-4xl">
		{$_('services.detail.cta_headline')}
	</Heading>
	<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
		<Button variant="primary" href="/en/contact/">
			{$_('services.detail.cta_button')}
		</Button>
		<Button variant="secondary" href="/en/services/">All services</Button>
	</div>
</Section>
