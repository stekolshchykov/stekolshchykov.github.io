<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { site } from '$lib/data/site';
	import { commercialData } from '$lib/data/commercial';
	import { imageWithFallback } from '$lib/utils/imageFallback';

	import SeoHead from '$lib/components/molecules/SeoHead.svelte';
	import PageHeroSection from '$lib/components/organisms/PageHeroSection.svelte';
	import ImageReveal from '$lib/components/molecules/ImageReveal.svelte';
	import Section from '$lib/components/atoms/Section.svelte';
	import SectionHeader from '$lib/components/atoms/SectionHeader.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import Input from '$lib/components/atoms/Input.svelte';
	import Textarea from '$lib/components/atoms/Textarea.svelte';
	import Button from '$lib/components/atoms/Button.svelte';

	let company = $state('');
	let sector = $state('');
	let email = $state('');
	let phone = $state('');
	let location = $state('');
	let budget = $state('');
	let programme = $state('');
	let scope = $state('');

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		const body = encodeURIComponent(
			`Company: ${company}\nSector: ${sector}\nEmail: ${email}\nPhone: ${phone}\nLocation: ${location}\nBudget: ${budget}\nProgramme: ${programme}\n\nScope:\n${scope}`
		);
		window.location.href = `mailto:${site.email}?subject=Commercial enquiry&body=${body}`;
	}
</script>

<SeoHead
	title={$_('commercial.meta_title')}
	description={$_('commercial.meta_description')}
	image="{site.seo.siteUrl}/og-default.jpg"
	type="website"
	canonical="{site.seo.siteUrl}/commercial/"
	includeLocalBusiness={true}
/>

<PageHeroSection
	eyebrow={$_('commercial.hero_eyebrow')}
	headline={$_('commercial.hero_headline')}
	subheadline={$_('commercial.hero_subheadline')}
	image={imageWithFallback('/images/commercial/hero.webp', '/images/hero-poster.jpg')}
	height="large"
/>

<Section>
	<SectionHeader headline={$_('commercial.sectors_title')} size="large" />
	<div class="grid gap-6 md:grid-cols-2">
		{#each commercialData.sectors as item}
			<div class="group bg-bg-secondary">
				<div class="image-warm-overlay relative aspect-[16/10] overflow-hidden">
					<img
						src={imageWithFallback(item.image.src, '/images/commercial/hero.webp')}
						alt={item.image.alt}
						loading="lazy"
						class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
					/>
				</div>
				<div class="p-6 md:p-8">
					<h3 class="mb-3 font-serif text-2xl text-text-primary">{item.title}</h3>
					<p class="font-sans text-sm leading-relaxed text-text-secondary">{item.description}</p>
				</div>
			</div>
		{/each}
	</div>
</Section>

<Section tone="secondary">
	<SectionHeader headline={$_('commercial.case_studies_title')} />
	<div class="space-y-16">
		{#each commercialData.caseStudies as study, i}
			<div class="grid items-center gap-8 md:grid-cols-2 md:gap-12">
				<div class={i % 2 === 1 ? 'md:order-2' : ''}>
					<ImageReveal
						src={imageWithFallback(study.image.src, '/images/commercial/hero.webp')}
						alt={study.image.alt}
						class="aspect-[4/3] w-full"
						direction={i % 2 === 0 ? 'right' : 'left'}
					/>
				</div>
				<div class="space-y-6 {i % 2 === 1 ? 'md:order-1' : ''}">
					<div
						class="flex flex-wrap items-center gap-4 font-sans text-xs uppercase tracking-[0.12em] text-accent"
					>
						<span>{study.sector}</span>
						<span class="h-px w-6 bg-accent/40"></span>
						<span>{study.location}</span>
					</div>
					<h3 class="font-serif text-2xl text-text-primary md:text-3xl">{study.client}</h3>
					<p class="font-sans text-sm leading-relaxed text-text-secondary">
						<strong class="text-text-primary">Scope:</strong>
						{study.scope}
					</p>
					<p class="font-sans text-sm leading-relaxed text-text-secondary">
						<strong class="text-text-primary">Outcome:</strong>
						{study.outcome}
					</p>
				</div>
			</div>
		{/each}
	</div>
</Section>

<Section>
	<div class="grid gap-12 lg:grid-cols-2 lg:gap-20">
		<Heading as="h2" variant="serif" class="text-3xl text-text-primary md:text-4xl">
			{$_('commercial.process_title')}
		</Heading>
		<ol class="space-y-6">
			{#each commercialData.b2bDifferences as difference, i}
				<li class="flex gap-6">
					<span class="font-serif text-3xl text-accent">{String(i + 1).padStart(2, '0')}</span>
					<p class="pt-2 font-sans text-body-lg text-text-secondary">{difference}</p>
				</li>
			{/each}
		</ol>
	</div>
</Section>

<Section tone="secondary">
	<div class="grid gap-12 lg:grid-cols-2 lg:gap-20">
		<div class="space-y-6">
			<Heading as="h2" variant="serif" class="text-3xl text-text-primary md:text-4xl lg:text-5xl">
				{$_('commercial.form_title')}
			</Heading>
			<p class="max-w-md font-sans text-body-lg text-text-secondary">
				Tell us about your project and we will respond within two business days.
			</p>
		</div>
		<form onsubmit={handleSubmit} class="space-y-8">
			<div class="grid gap-6 md:grid-cols-2">
				<Input name="company" label="Company name" required bind:value={company} />
				<Input name="sector" label="Sector" bind:value={sector} />
			</div>
			<div class="grid gap-6 md:grid-cols-2">
				<Input name="email" type="email" label="Email" required bind:value={email} />
				<Input name="phone" type="tel" label="Phone" bind:value={phone} />
			</div>
			<div class="grid gap-6 md:grid-cols-2">
				<Input name="location" label="Project location" bind:value={location} />
				<Input name="budget" label="Approximate budget" bind:value={budget} />
			</div>
			<Input name="programme" label="Required programme or opening date" bind:value={programme} />
			<Textarea name="scope" label="Scope of joinery required" bind:value={scope} />
			<Button variant="primary" type="submit">
				{$_('commercial.form_button')}
			</Button>
		</form>
	</div>
</Section>

<Section container="narrow" align="center">
	<Heading as="h2" variant="serif" class="mb-6 text-3xl font-light text-text-primary md:text-4xl">
		{$_('commercial.cta_headline')}
	</Heading>
	<Button variant="primary" size="lg" href="/en/contact/">
		{$_('commercial.cta_button')}
	</Button>
</Section>
