<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { site } from '$lib/data/site';
	import { projects } from '$lib/data/projects';
	import { imageWithFallback } from '$lib/utils/imageFallback';

	import SeoHead from '$lib/components/molecules/SeoHead.svelte';
	import HeroSection from '$lib/components/organisms/HeroSection.svelte';
	import BrandIntroSection from '$lib/components/organisms/BrandIntroSection.svelte';
	import ServicesPreviewSection from '$lib/components/organisms/ServicesPreviewSection.svelte';
	import FeaturedProjectsSection from '$lib/components/organisms/FeaturedProjectsSection.svelte';
	import ProcessOverviewSection from '$lib/components/organisms/ProcessOverviewSection.svelte';
	import CTABannerSection from '$lib/components/organisms/CTABannerSection.svelte';
	import Section from '$lib/components/atoms/Section.svelte';
	import SectionHeader from '$lib/components/atoms/SectionHeader.svelte';
	import Eyebrow from '$lib/components/atoms/Eyebrow.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import Text from '$lib/components/atoms/Text.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import ImageReveal from '$lib/components/molecules/ImageReveal.svelte';
	import MagneticCard from '$lib/components/molecules/MagneticCard.svelte';

	const featuredProjects = projects.filter((p) => p.featured);
	const materialWorld = [
		{
			family: 'Painted & lacquered fronts',
			name: 'Calm colour. Clean lines.',
			tagline: 'A finished room begins with the surface you see every day.',
			images: {
				swatch: {
					src: '/images/materials/satin-lacquer/swatch.webp',
					alt: 'Painted and lacquered cabinetry front sample'
				}
			}
		},
		{
			family: 'Wood veneers & warm finishes',
			name: 'Warmth before touch.',
			tagline: 'Grain, depth and tone chosen for how the space should feel.',
			images: {
				swatch: {
					src: '/images/materials/crown-walnut-veneer/swatch.webp',
					alt: 'Warm wood veneer cabinetry finish'
				}
			}
		},
		{
			family: 'Worktops, hardware & details',
			name: 'Surface, movement, touch.',
			tagline: 'Stone, metal, glass and internal systems resolved as one layer.',
			images: {
				swatch: {
					src: '/images/generated/material-detail.webp',
					alt: 'Worktop, hardware and detail samples'
				}
			}
		}
	];

	const stats = [
		{ value: '01', label: 'Site measure in Ireland' },
		{ value: '02', label: 'Clear specification' },
		{ value: '03', label: 'Export-ready production' },
		{ value: '04', label: 'Coordinated installation' }
	];

	const localBusinessSchema = {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		name: site.brand,
		description: site.subTagline,
		url: site.seo.siteUrl,
		email: site.email,
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
<Section class="relative overflow-hidden lg:py-36">
	<div class="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
		<div class="order-2 space-y-8 lg:order-1">
			<SectionHeader
				headline="The detail is the design."
				statement="Every handle, veneer run and drawer shadow is resolved before the specification is approved."
				size="large"
				class="mb-0"
			/>
			<div class="divide-y divide-text-primary/10 border-y border-text-primary/10">
				{#each [['01', 'Matched grain sets across every visible elevation'], ['02', 'Brass and stone specified by touch, not catalogue code'], ['03', 'Technical drawings checked against the room millimetre by millimetre']] as detail}
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
</Section>

<!-- Material World -->
<Section>
	<SectionHeader
		eyebrow={$_('home.material_world_eyebrow')}
		headline={$_('home.material_world_headline')}
		statement={$_('home.material_world_statement')}
		align="between"
		size="large"
	>
		{#snippet actions()}
			<Button variant="ghost" href="/en/materials/">
				{$_('home.material_world_cta')}
			</Button>
		{/snippet}
	</SectionHeader>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
		{#each materialWorld as material}
			<MagneticCard intensity={0.12}>
				<a
					href="/en/materials/"
					class="luxury-corners group grid h-full overflow-hidden border border-text-primary/10 bg-bg-secondary transition-all duration-500 hover:-translate-y-1 hover:border-accent/45"
				>
					<div class="luxury-surface image-warm-overlay relative aspect-[4/3] overflow-hidden bg-bg-primary">
						<img
							src={imageWithFallback(
								material.images.swatch.src,
								'/images/materials/european-oak.jpg'
							)}
							alt={material.images.swatch.alt}
							loading="lazy"
							class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
						/>
					</div>
					<div class="grid min-h-[164px] content-start p-6 md:min-h-[180px] md:p-7">
						<p class="mb-3 font-sans text-[11px] uppercase tracking-[0.18em] text-accent">
							{material.family}
						</p>
						<h3 class="mb-3 min-h-[2.1em] font-serif text-2xl leading-none text-text-primary md:text-3xl">
							{material.name}
						</h3>
						<p class="max-w-xs font-sans text-sm leading-relaxed text-text-secondary line-clamp-2">
							{material.tagline}
						</p>
					</div>
				</a>
			</MagneticCard>
		{/each}
	</div>
</Section>

<ServicesPreviewSection />

<!-- By the Numbers -->
<Section tone="secondary" border="y" spacing="none" containerClass="py-14 md:py-16 lg:py-20">
	<div class="grid grid-cols-2 items-center gap-8 md:grid-cols-4 md:gap-12">
		{#each stats as stat}
			<div class="text-center md:text-left">
				<p class="mb-2 font-serif text-5xl text-accent md:text-6xl lg:text-7xl">{stat.value}</p>
				<p class="font-sans text-xs uppercase tracking-[0.15em] text-text-secondary">
					{stat.label}
				</p>
			</div>
		{/each}
	</div>
</Section>

<FeaturedProjectsSection projects={featuredProjects} />

<ProcessOverviewSection />

<CTABannerSection
	headline={$_('home.cta_headline')}
	subtext={$_('home.cta_subheadline')}
	ctaLabel={$_('home.cta_button')}
/>
