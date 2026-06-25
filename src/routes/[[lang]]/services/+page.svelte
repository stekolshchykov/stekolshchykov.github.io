<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { site } from '$lib/data/site';
	import { services } from '$lib/data/services';
	import { processSteps } from '$lib/data/processSteps';
	import { materials } from '$lib/data/materials';

	import Section from '$lib/components/atoms/Section.svelte';
	import SectionHeader from '$lib/components/atoms/SectionHeader.svelte';
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

<Section tone="secondary">
	<SectionHeader
		eyebrow={$_('services.residential_eyebrow')}
		headline={$_('services.residential_headline')}
		statement={$_('services.residential_body')}
		size="large"
	/>
	<ServicesListSection id="residential" services={residentialServices} />
</Section>

<Section>
	<SectionHeader
		eyebrow={$_('services.commercial_eyebrow')}
		headline={$_('services.commercial_headline')}
		statement={$_('services.commercial_body')}
		size="large"
	/>
	<ServicesListSection id="commercial" services={commercialServices} />
</Section>

<Section tone="secondary">
	<SectionHeader
		eyebrow={$_('services.process_eyebrow')}
		headline={$_('services.process_headline')}
		align="center"
		size="large"
	/>
	<ProcessTimeline steps={processSteps} />
</Section>

<Section>
	<MaterialsShowcase {materials} />
</Section>

<CTABannerSection headline={$_('services.cta_headline')} ctaLabel={$_('services.cta_button')} />
