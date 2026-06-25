<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { site } from '$lib/data/site';

	import Section from '$lib/components/atoms/Section.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import SectionHeader from '$lib/components/atoms/SectionHeader.svelte';
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

<Section tone="secondary" container="content">
	<div class="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
		<SectionHeader
			eyebrow="Before we meet"
			headline="A useful first conversation starts with context."
			statement="You do not need finished drawings before getting in touch. A few photographs, approximate dimensions, and a sense of what is not working in the room are enough for us to shape the next step."
			class="mb-0"
		/>
		<div class="grid gap-6 md:grid-cols-3">
			<div class="border-t border-text-primary/10 pt-5">
				<p class="mb-3 font-serif text-2xl text-accent">01</p>
				<h2 class="mb-3 font-sans text-xs uppercase tracking-[0.15em] text-text-primary">
					Send the room
				</h2>
				<p class="font-sans text-sm leading-relaxed text-text-secondary">
					Photos, a rough plan, ceiling height, and any awkward corners help us understand the
					scope before the site survey.
				</p>
			</div>
			<div class="border-t border-text-primary/10 pt-5">
				<p class="mb-3 font-serif text-2xl text-accent">02</p>
				<h2 class="mb-3 font-sans text-xs uppercase tracking-[0.15em] text-text-primary">
					Share the routine
				</h2>
				<p class="font-sans text-sm leading-relaxed text-text-secondary">
					Tell us how the room is used now, what feels frustrating, what must be stored, and how
					you want the space to feel.
				</p>
			</div>
			<div class="border-t border-text-primary/10 pt-5">
				<p class="mb-3 font-serif text-2xl text-accent">03</p>
				<h2 class="mb-3 font-sans text-xs uppercase tracking-[0.15em] text-text-primary">
					Agree the next step
				</h2>
				<p class="font-sans text-sm leading-relaxed text-text-secondary">
					After the call we confirm whether a showroom visit, site survey, material consultation,
					or commercial briefing session is the right path.
				</p>
			</div>
		</div>
	</div>
</Section>

<Section tone="secondary">
	<div class="grid gap-12 lg:grid-cols-2">
		<div>
			<Heading as="h2" variant="serif" class="text-2xl font-light text-text-primary md:text-3xl">
				{$_('contact.hours_label')}
			</Heading>
			<p class="mt-5 max-w-md font-sans leading-relaxed text-text-secondary">
				Appointments are private and focused. We use showroom visits for materials and full-size
				details, site surveys for measured layouts, and video calls for early commercial or remote
				briefs before a project is formally priced. Each route ends with a clear next action.
			</p>
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
