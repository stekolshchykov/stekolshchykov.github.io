<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { site } from '$lib/data/site';
	import { processMoments } from '$lib/data/processDetailed';
	import { imageWithFallback } from '$lib/utils/imageFallback';

	import Section from '$lib/components/atoms/Section.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import SeoHead from '$lib/components/molecules/SeoHead.svelte';
	import PageHeroSection from '$lib/components/organisms/PageHeroSection.svelte';
	import StickyScrollNarrative from '$lib/components/organisms/StickyScrollNarrative.svelte';

	const narrativeItems = processMoments.map((m) => ({
		id: m.id,
		number: m.number,
		title: m.title,
		subtitle: m.subtitle,
		description: m.description,
		craftNote: m.craftNote,
		duration: m.duration,
		image: imageWithFallback(m.image.src, '/images/process/discovery.webp')
	}));
</script>

<SeoHead
	title={$_('process.meta_title')}
	description={$_('process.meta_description')}
	image="{site.seo.siteUrl}/og-default.jpg"
	type="website"
	canonical="{site.seo.siteUrl}/process/"
/>

<PageHeroSection
	eyebrow={$_('process.hero_eyebrow')}
	headline={$_('process.hero_headline')}
	subheadline={$_('process.hero_subheadline')}
	image={imageWithFallback('/images/process/discovery.webp', '/images/hero-poster.jpg')}
	height="large"
/>

<StickyScrollNarrative items={narrativeItems} eyebrow={$_('process.hero_eyebrow')} />

<Section tone="secondary" container="narrow" align="center">
	<Heading as="h2" variant="serif" class="mb-6 text-3xl font-light text-text-primary md:text-4xl">
		{$_('process.cta_headline')}
	</Heading>
	<Button variant="primary" href="/en/contact/">
		{$_('process.cta_button')}
	</Button>
</Section>
