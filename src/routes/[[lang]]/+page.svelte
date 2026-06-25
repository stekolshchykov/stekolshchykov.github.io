<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { site } from '$lib/data/site';
	import { projects } from '$lib/data/projects';
	import { testimonials } from '$lib/data/testimonials';
	import { materialsDetailed } from '$lib/data/materialsDetailed';
	import { insights } from '$lib/data/insights';
	import { imageWithFallback } from '$lib/utils/imageFallback';

	import SeoHead from '$lib/components/molecules/SeoHead.svelte';
	import HeroSection from '$lib/components/organisms/HeroSection.svelte';
	import BrandIntroSection from '$lib/components/organisms/BrandIntroSection.svelte';
	import ServicesPreviewSection from '$lib/components/organisms/ServicesPreviewSection.svelte';
	import FeaturedProjectsSection from '$lib/components/organisms/FeaturedProjectsSection.svelte';
	import ProcessOverviewSection from '$lib/components/organisms/ProcessOverviewSection.svelte';
	import TestimonialsSection from '$lib/components/organisms/TestimonialsSection.svelte';
	import CTABannerSection from '$lib/components/organisms/CTABannerSection.svelte';
	import Eyebrow from '$lib/components/atoms/Eyebrow.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import Text from '$lib/components/atoms/Text.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import ImageReveal from '$lib/components/molecules/ImageReveal.svelte';
	import MagneticCard from '$lib/components/molecules/MagneticCard.svelte';

	const featuredProjects = projects.filter((p) => p.featured);
	const materialWorld = materialsDetailed.slice(0, 3);
	const journalTeaser = insights.slice(0, 2);

	const stats = [
		{ value: $_('home.trust_years_value'), label: $_('home.trust_years_label') },
		{ value: $_('home.trust_projects_value'), label: $_('home.trust_projects_label') },
		{ value: $_('home.trust_makers_value'), label: $_('home.trust_makers_label') },
		{ value: $_('home.trust_warranty_value'), label: $_('home.trust_warranty_label') }
	];

	const localBusinessSchema = {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		name: site.brand,
		description: site.subTagline,
		url: site.seo.siteUrl,
		email: site.email,
		telephone: site.phone,
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Dublin',
			addressCountry: 'IE'
		},
		image: `${site.seo.siteUrl}${site.seo.defaultImage}`,
		priceRange: '€€€'
	};
</script>

<svelte:head>
	<title>{$_('home.meta_title')}</title>
	<meta name="description" content={$_('home.meta_description')} />
	<meta property="og:title" content={$_('home.meta_title')} />
	<meta property="og:description" content={$_('home.meta_description')} />
	<meta property="og:image" content="{site.seo.siteUrl}/og-home.jpg" />
	<meta property="og:type" content="website" />
	<link rel="canonical" href="{site.seo.siteUrl}/" />
	<link
		rel="preload"
		as="image"
		href="/images/generated/hero-wardrobe.webp"
		type="image/webp"
		fetchpriority="high"
	/>
	{@html '<script type="application/ld+json">' + JSON.stringify(localBusinessSchema) + '</script>'}
</svelte:head>

<SeoHead
	title={$_('home.meta_title')}
	description={$_('home.meta_description')}
	image="{site.seo.siteUrl}/og-home.jpg"
	type="website"
	canonical="{site.seo.siteUrl}/"
/>

<HeroSection
	videoPoster="/images/generated/hero-wardrobe.jpg"
	webpPoster="/images/generated/hero-wardrobe.webp"
	videoSrc="/videos/hero.mp4"
	headline={$_('home.hero_headline')}
	subheadline={$_('home.hero_subheadline')}
	ctaLabel={$_('home.hero_cta')}
/>

<BrandIntroSection />

<!-- Signature Detail -->
<section class="relative overflow-hidden bg-bg-primary py-20 md:py-32 lg:py-40 lg:py-36">
	<div
		class="mx-auto grid max-w-[1440px] items-center gap-10 px-6 md:px-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-16"
	>
		<div class="order-2 space-y-8 lg:order-1">
			<div>
				<Heading
					as="h2"
					variant="serif"
					class="max-w-xl text-3xl text-text-primary md:text-4xl lg:text-6xl"
				>
					The detail is the design.
				</Heading>
				<Text variant="body-lg" class="mt-6 max-w-lg text-text-secondary">
					Every handle, veneer run and drawer shadow is resolved before a board reaches the saw.
				</Text>
			</div>
			<div class="divide-y divide-text-primary/10 border-y border-text-primary/10">
				{#each [['01', 'Matched grain sets across every visible elevation'], ['02', 'Brass and stone specified by touch, not catalogue code'], ['03', 'Workshop drawings checked against the room millimetre by millimetre']] as detail}
					<div class="grid grid-cols-[48px_minmax(0,1fr)] gap-5 py-5">
						<span class="font-serif text-2xl text-accent">{detail[0]}</span>
						<p class="font-sans text-sm leading-relaxed text-text-primary/84">{detail[1]}</p>
					</div>
				{/each}
			</div>
			<Button variant="ghost" href="/en/process/">See the process</Button>
		</div>
		<div class="order-1 lg:order-2">
			<ImageReveal
				src="/images/generated/material-detail.webp"
				alt="Walnut, brass, stone and lacquer samples arranged for bespoke furniture specification"
				class="aspect-[5/4] w-full"
				direction="right"
			/>
		</div>
	</div>
</section>

<!-- Material World -->
<section class="bg-bg-primary py-20 md:py-32 lg:py-40">
	<div class="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
		<div
			class="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end"
		>
			<div class="max-w-2xl">
				<Eyebrow text={$_('home.material_world_eyebrow')} class="mb-4" />
				<Heading as="h2" variant="serif" class="text-3xl text-text-primary md:text-4xl lg:text-5xl">
					{$_('home.material_world_headline')}
				</Heading>
				<Text variant="body-lg" class="mt-6 max-w-xl text-text-secondary">
					{$_('home.material_world_statement')}
				</Text>
			</div>
			<Button variant="ghost" href="/en/materials/">
				{$_('home.material_world_cta')}
			</Button>
		</div>

		<div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
			{#each materialWorld as material}
				<MagneticCard intensity={0.12}>
					<a
						href="/en/materials/{material.id}/"
						class="group relative block aspect-[4/5] overflow-hidden bg-bg-secondary"
					>
						<ImageReveal
							src={imageWithFallback(
								material.images.swatch.src,
								'/images/materials/european-oak.jpg'
							)}
							alt={material.images.swatch.alt}
							class="absolute inset-0 h-full w-full"
							direction="up"
						/>
						<div
							class="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/30 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90"
						></div>
						<div
							class="absolute inset-x-0 bottom-0 translate-y-0 p-6 opacity-100 transition-all duration-500 ease-ui md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
						>
							<p class="mb-2 font-sans text-xs uppercase tracking-[0.2em] text-accent">
								{material.family}
							</p>
							<h3 class="mb-2 font-serif text-2xl text-text-primary md:text-3xl">
								{material.name}
							</h3>
							<p class="max-w-xs font-sans text-sm leading-relaxed text-text-secondary">
								{material.tagline}
							</p>
						</div>
					</a>
				</MagneticCard>
			{/each}
		</div>
	</div>
</section>

<ServicesPreviewSection />

<!-- By the Numbers -->
<section class="border-y border-text-primary/10 bg-bg-secondary py-20 md:py-32 lg:py-40">
	<div class="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
		<div class="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
			{#each stats as stat}
				<div class="text-center md:text-left">
					<p class="mb-2 font-serif text-5xl text-accent md:text-6xl lg:text-7xl">{stat.value}</p>
					<p class="font-sans text-xs uppercase tracking-[0.15em] text-text-secondary">
						{stat.label}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<FeaturedProjectsSection projects={featuredProjects} />

<ProcessOverviewSection />

<!-- Journal Teaser -->
<section class="bg-bg-secondary py-20 md:py-32 lg:py-40">
	<div class="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
		<div
			class="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end"
		>
			<div class="max-w-2xl">
				<Eyebrow text={$_('home.journal_teaser_eyebrow')} class="mb-4" />
				<Heading as="h2" variant="serif" class="text-3xl text-text-primary md:text-4xl lg:text-5xl">
					{$_('home.journal_teaser_headline')}
				</Heading>
			</div>
			<Button variant="ghost" href="/en/insights/">
				{$_('home.journal_teaser_cta')}
			</Button>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
			{#each journalTeaser as article}
				<article class="group">
					<a href="/en/insights/{article.slug}/" class="block">
						<div
							class="image-warm-overlay relative mb-6 aspect-[16/10] overflow-hidden bg-bg-primary"
						>
							<img
								src={imageWithFallback(article.heroImage.src, '/images/hero-poster.jpg')}
								alt={article.heroImage.alt}
								loading="lazy"
								class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
							/>
						</div>
						<div
							class="mb-3 flex items-center gap-4 font-sans text-xs uppercase tracking-[0.12em] text-text-secondary"
						>
							<span>{article.category}</span>
							<span class="h-px w-6 bg-text-secondary/40"></span>
							<span>{article.readTime}</span>
						</div>
						<h3
							class="mb-3 font-serif text-2xl text-text-primary transition-colors group-hover:text-accent md:text-3xl"
						>
							{article.title}
						</h3>
						<p class="max-w-xl font-sans text-sm leading-relaxed text-text-secondary line-clamp-3">
							{article.excerpt}
						</p>
					</a>
				</article>
			{/each}
		</div>
	</div>
</section>

<TestimonialsSection {testimonials} />

<!-- Showroom Invitation -->
<section class="bg-bg-primary py-20 md:py-32 lg:py-40">
	<div class="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
		<div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
			<div class="order-2 lg:order-1">
				<ImageReveal
					src={imageWithFallback('/images/showroom/interior.webp', '/images/craftsmanship.jpg')}
					alt="Áras Living showroom interior with full-size installations and material samples"
					class="aspect-[4/3] w-full"
					direction="left"
				/>
			</div>
			<div class="order-1 space-y-8 lg:order-2">
				<Eyebrow text={$_('home.showroom_invitation_eyebrow')} />
				<Heading as="h2" variant="serif" class="text-3xl text-text-primary md:text-4xl lg:text-5xl">
					{$_('home.showroom_invitation_headline')}
				</Heading>
				<Text variant="body-lg" class="max-w-md text-text-secondary">
					{$_('home.showroom_invitation_body')}
				</Text>
				<Button variant="primary" size="md" href="/en/showroom/">
					{$_('home.showroom_invitation_cta')}
				</Button>
			</div>
		</div>
	</div>
</section>

<CTABannerSection
	headline={$_('home.cta_headline')}
	subtext={$_('home.cta_subheadline')}
	ctaLabel={$_('home.cta_button')}
/>
