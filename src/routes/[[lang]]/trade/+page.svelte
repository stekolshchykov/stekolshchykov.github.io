<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { site } from '$lib/data/site';
	import { imageWithFallback } from '$lib/utils/imageFallback';

	import SeoHead from '$lib/components/molecules/SeoHead.svelte';
	import PageHeroSection from '$lib/components/organisms/PageHeroSection.svelte';
	import Section from '$lib/components/atoms/Section.svelte';
	import SectionHeader from '$lib/components/atoms/SectionHeader.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import Input from '$lib/components/atoms/Input.svelte';
	import Textarea from '$lib/components/atoms/Textarea.svelte';
	import Button from '$lib/components/atoms/Button.svelte';

	const sectors = [
		{
			title: 'Residential Developments',
			text: 'Complete cabinetry packages for new homes and multi-unit developments.',
			image: '/images/placeholders/needs-photo.svg'
		},
		{
			title: 'Offices',
			text: 'Reception, storage and fitted furniture for considered workplaces.',
			image: '/images/placeholders/needs-photo.svg'
		},
		{
			title: 'Retail',
			text: 'Display, counters and storage shaped around the customer journey.',
			image: '/images/placeholders/needs-photo.svg'
		},
		{
			title: 'Hospitality',
			text: 'Durable cabinetry for hotels, restaurants and guest-facing spaces.',
			image: '/images/placeholders/needs-photo.svg'
		},
		{
			title: 'Salons, clinics & specialist spaces',
			text: 'Clean, functional furniture for rooms where detail matters.',
			image: '/images/placeholders/needs-photo.svg'
		}
	];

	const steps = [
		'Send drawings, plans or a brief.',
		'We help turn them into a clear cabinetry specification.',
		'Packages are shaped around scope, finish, scale and installation needs.',
		'Delivery and installation are coordinated in Ireland.'
	];

	let name = $state('');
	let company = $state('');
	let email = $state('');
	let projectType = $state('');
	let location = $state('');
	let scale = $state('');
	let timeline = $state('');
	let budget = $state('');
	let message = $state('');

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		const body = encodeURIComponent(
			`Name: ${name}\nCompany: ${company}\nEmail: ${email}\nProject type: ${projectType}\nLocation: ${location}\nUnits / scale: ${scale}\nTimeline: ${timeline}\nBudget: ${budget}\n\nMessage:\n${message}`
		);
		window.location.href = `mailto:${site.email}?subject=Trade enquiry&body=${body}`;
	}
</script>

<SeoHead
	title={$_('trade.meta_title')}
	description={$_('trade.meta_description')}
	image="{site.seo.siteUrl}/og-default.jpg"
	type="website"
	canonical="{site.seo.siteUrl}/trade/"
/>

<PageHeroSection
	eyebrow={$_('trade.hero_eyebrow')}
	headline={$_('trade.hero_headline')}
	subheadline={$_('trade.hero_subheadline')}
	image={imageWithFallback('/images/commercial/hero.webp', '/images/placeholders/needs-photo.svg')}
	height="large"
/>

<Section>
	<div class="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
		<SectionHeader
			eyebrow="Trade packages"
			headline="Complete cabinetry packages for new homes and multi-unit developments."
			statement="Kitchens, wardrobes, bathroom furniture, utility units and fitted storage, specified clearly and managed through installation."
			size="large"
			class="mb-0"
		/>
		<div class="grid gap-4 sm:grid-cols-2">
			{#each steps as step, i}
				<div class="border-t border-text-primary/10 pt-5">
					<p class="mb-4 font-serif text-3xl text-accent">{String(i + 1).padStart(2, '0')}</p>
					<p class="font-sans text-sm leading-relaxed text-text-secondary">{step}</p>
				</div>
			{/each}
		</div>
	</div>
</Section>

<Section tone="secondary">
	<SectionHeader
		eyebrow="Sectors"
		headline="Clear categories for professional spaces."
		statement="The page stays visual and premium while making the trade offer easy to understand."
		size="large"
	/>
	<div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
		{#each sectors as item}
			<div class="luxury-corners group overflow-hidden border border-text-primary/10 bg-bg-primary">
				<div class="image-warm-overlay relative aspect-[16/10] overflow-hidden">
					<img
						src={item.image}
						alt="Photo to be supplied for {item.title}"
						loading="lazy"
						class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
					/>
				</div>
				<div class="p-6">
					<h3 class="mb-3 font-serif text-2xl text-text-primary">{item.title}</h3>
					<p class="font-sans text-sm leading-relaxed text-text-secondary">{item.text}</p>
				</div>
			</div>
		{/each}
	</div>
</Section>

<Section>
	<div class="grid gap-12 lg:grid-cols-2 lg:gap-20">
		<div class="space-y-6">
			<Heading as="h2" variant="serif" class="text-3xl text-text-primary md:text-4xl lg:text-5xl">
				Send a Trade Enquiry
			</Heading>
			<p class="max-w-md font-sans text-body-lg text-text-secondary">
				Send drawings, plans, photos or moodboards if you already have them. Files can be added
				when the final form endpoint is connected.
			</p>
			<p class="max-w-md font-sans text-sm leading-relaxed text-text-secondary">
				Planned route: trade@arasliving.ie. Temporary route: arasliving26@gmail.com.
			</p>
		</div>
		<form onsubmit={handleSubmit} class="space-y-8">
			<div class="grid gap-6 md:grid-cols-2">
				<Input name="name" label="Name" required bind:value={name} />
				<Input name="company" label="Company" required bind:value={company} />
			</div>
			<div class="grid gap-6 md:grid-cols-2">
				<Input name="email" type="email" label="Email" required bind:value={email} />
				<Input name="projectType" label="Project type" bind:value={projectType} />
			</div>
			<div class="grid gap-6 md:grid-cols-2">
				<Input name="location" label="Location in Ireland" bind:value={location} />
				<Input name="scale" label="Number of units / project scale" bind:value={scale} />
			</div>
			<div class="grid gap-6 md:grid-cols-2">
				<Input name="timeline" label="Timeline" bind:value={timeline} />
				<Input name="budget" label="Approximate budget, if you have one" bind:value={budget} />
			</div>
			<Textarea name="message" label="Message" bind:value={message} />
			<Button variant="primary" type="submit">Send a Trade Enquiry</Button>
		</form>
	</div>
</Section>
