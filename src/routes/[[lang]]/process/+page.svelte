<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { site } from '$lib/data/site';
	import { processMoments } from '$lib/data/processDetailed';
	import { imageWithFallback } from '$lib/utils/imageFallback';

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

<section class="bg-bg-secondary py-20 md:py-32 lg:py-40">
	<div class="mx-auto max-w-4xl px-6 text-center md:px-12 lg:px-16">
		<h2 class="mb-6 font-serif text-3xl font-light text-text-primary md:text-4xl">
			{$_('process.cta_headline')}
		</h2>
		<a
			href="/en/contact/"
			class="inline-flex items-center gap-3 bg-accent px-8 py-3 font-sans text-sm font-medium uppercase tracking-[0.06em] text-bg-primary transition-colors duration-200 hover:bg-[#D4A57A]"
		>
			{$_('process.cta_button')}
		</a>
	</div>
</section>
