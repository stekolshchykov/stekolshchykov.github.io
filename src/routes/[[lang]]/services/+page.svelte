<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { site } from '$lib/data/site';
	import { services } from '$lib/data/services';
	import { processSteps } from '$lib/data/processSteps';
	import { materials } from '$lib/data/materials';

	import SeoHead from '$lib/components/molecules/SeoHead.svelte';
	import PageHeroSection from '$lib/components/organisms/PageHeroSection.svelte';
	import ServicesListSection from '$lib/components/organisms/ServicesListSection.svelte';
	import ProcessTimeline from '$lib/components/organisms/ProcessTimeline.svelte';
	import MaterialsShowcase from '$lib/components/organisms/MaterialsShowcase.svelte';
	import CTABannerSection from '$lib/components/organisms/CTABannerSection.svelte';

	const residentialServices = services.filter((s) => s.category === 'residential');
	const commercialServices = services.filter((s) => s.category === 'commercial');

	const serviceSchema = {
		'@context': 'https://schema.org',
		'@type': 'Service',
		name: 'Áras Living Bespoke Furniture Services',
		description: $_('services.meta_description'),
		provider: {
			'@type': 'LocalBusiness',
			name: site.brand,
			address: {
				'@type': 'PostalAddress',
				addressLocality: 'Dublin',
				addressCountry: 'IE'
			}
		},
		areaServed: 'Ireland'
	};
</script>

<svelte:head>
	<title>{$_('services.meta_title')}</title>
	<meta name="description" content={$_('services.meta_description')} />
	<meta property="og:title" content={$_('services.meta_title')} />
	<meta property="og:description" content={$_('services.meta_description')} />
	<meta property="og:image" content="{site.seo.siteUrl}/og-services.jpg" />
	<meta property="og:type" content="website" />
	<link rel="canonical" href="{site.seo.siteUrl}/services/" />
	{@html '<script type="application/ld+json">' + JSON.stringify(serviceSchema) + '</script>'}
</svelte:head>

<SeoHead
	title={$_('services.meta_title')}
	description={$_('services.meta_description')}
	image="{site.seo.siteUrl}/og-services.jpg"
	type="website"
	canonical="{site.seo.siteUrl}/services/"
/>

<PageHeroSection
	eyebrow={$_('services.hero_eyebrow')}
	headline={$_('services.hero_headline')}
	subheadline={$_('services.hero_subheadline')}
	image="/images/services-hero.jpg"
/>

<section class="bg-bg-secondary py-20 md:py-28">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mb-12 max-w-2xl">
			<span class="text-sm font-medium uppercase tracking-widest text-accent"
				>{$_('services.residential_eyebrow')}</span
			>
			<h2 class="mt-4 font-serif text-3xl font-light md:text-4xl lg:text-5xl">
				{$_('services.residential_headline')}
			</h2>
			<p class="mt-6 text-lg leading-relaxed text-text-secondary">
				{$_('services.residential_body')}
			</p>
		</div>
		<ServicesListSection id="residential" services={residentialServices} />
	</div>
</section>

<section class="bg-bg-primary py-20 md:py-28">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mb-12 max-w-2xl">
			<span class="text-sm font-medium uppercase tracking-widest text-accent"
				>{$_('services.commercial_eyebrow')}</span
			>
			<h2 class="mt-4 font-serif text-3xl font-light md:text-4xl lg:text-5xl">
				{$_('services.commercial_headline')}
			</h2>
			<p class="mt-6 text-lg leading-relaxed text-text-secondary">
				{$_('services.commercial_body')}
			</p>
		</div>
		<ServicesListSection id="commercial" services={commercialServices} />
	</div>
</section>

<section class="bg-bg-secondary py-20 md:py-28">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mb-12 text-center">
			<span class="text-sm font-medium uppercase tracking-widest text-accent"
				>{$_('services.process_eyebrow')}</span
			>
			<h2 class="mt-4 font-serif text-3xl font-light md:text-4xl lg:text-5xl">
				{$_('services.process_headline')}
			</h2>
		</div>
		<ProcessTimeline steps={processSteps} />
	</div>
</section>

<section class="bg-bg-primary py-20 md:py-28">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mb-12 text-center">
			<span class="text-sm font-medium uppercase tracking-widest text-accent"
				>{$_('services.materials_eyebrow')}</span
			>
			<h2 class="mt-4 font-serif text-3xl font-light md:text-4xl lg:text-5xl">
				{$_('services.materials_headline')}
			</h2>
		</div>
		<MaterialsShowcase {materials} />
	</div>
</section>

<CTABannerSection headline={$_('services.cta_headline')} ctaLabel={$_('services.cta_button')} />
