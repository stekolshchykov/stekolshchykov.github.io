<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { site } from '$lib/data/site';

	import Section from '$lib/components/atoms/Section.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import SeoHead from '$lib/components/molecules/SeoHead.svelte';
	import PageHeroSection from '$lib/components/organisms/PageHeroSection.svelte';
	import ContactInfoSection from '$lib/components/organisms/ContactInfoSection.svelte';
	import MapEmbed from '$lib/components/organisms/MapEmbed.svelte';

	const { businessHours } = site;

	const days = [
		{ key: 'monday', label: 'Monday' },
		{ key: 'tuesday', label: 'Tuesday' },
		{ key: 'wednesday', label: 'Wednesday' },
		{ key: 'thursday', label: 'Thursday' },
		{ key: 'friday', label: 'Friday' },
		{ key: 'saturday', label: 'Saturday' },
		{ key: 'sunday', label: 'Sunday' }
	] as const;
</script>

<svelte:head>
	<title>{$_('contact.meta_title')}</title>
	<meta name="description" content={$_('contact.meta_description')} />
	<meta property="og:title" content={$_('contact.meta_title')} />
	<meta property="og:description" content={$_('contact.meta_description')} />
	<meta property="og:image" content="{site.seo.siteUrl}/og-contact.jpg" />
	<meta property="og:type" content="website" />
	<link rel="canonical" href="{site.seo.siteUrl}/contact/" />
</svelte:head>

<SeoHead
	title={$_('contact.meta_title')}
	description={$_('contact.meta_description')}
	image="{site.seo.siteUrl}/og-contact.jpg"
	type="website"
	canonical="{site.seo.siteUrl}/contact/"
/>

<PageHeroSection
	eyebrow={$_('contact.hero_eyebrow')}
	headline={$_('contact.hero_headline')}
	subheadline={$_('contact.hero_subheadline')}
	image="/images/contact-hero.jpg"
	height="medium"
	alignment="center"
/>

<Section>
	<ContactInfoSection />
</Section>

<Section tone="secondary">
	<div class="grid gap-12 lg:grid-cols-2">
		<div>
			<Heading as="h2" variant="serif" class="text-2xl font-light text-text-primary md:text-3xl">
				{$_('contact.hours_label')}
			</Heading>
		</div>
		<div>
			<dl>
				{#each days as day}
					<div
						class="flex justify-between gap-4 border-b border-border py-3 first:border-t md:text-right"
					>
						<dt class="font-sans text-xs font-medium uppercase tracking-widest text-text-secondary">
							{day.label}
						</dt>
						<dd class="text-text-primary">{businessHours[day.key]}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</div>
</Section>

<MapEmbed />
