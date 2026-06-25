<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { site } from '$lib/data/site';
	import { showroom } from '$lib/data/showroom';
	import { imageWithFallback } from '$lib/utils/imageFallback';

	import SeoHead from '$lib/components/molecules/SeoHead.svelte';
	import PageHeroSection from '$lib/components/organisms/PageHeroSection.svelte';
	import MapEmbed from '$lib/components/organisms/MapEmbed.svelte';
	import ImageReveal from '$lib/components/molecules/ImageReveal.svelte';
	import SplitTextReveal from '$lib/components/molecules/SplitTextReveal.svelte';
	import Input from '$lib/components/atoms/Input.svelte';
	import Textarea from '$lib/components/atoms/Textarea.svelte';
	import Button from '$lib/components/atoms/Button.svelte';

	const days = [
		{ key: 'monday', label: 'Monday' },
		{ key: 'tuesday', label: 'Tuesday' },
		{ key: 'wednesday', label: 'Wednesday' },
		{ key: 'thursday', label: 'Thursday' },
		{ key: 'friday', label: 'Friday' },
		{ key: 'saturday', label: 'Saturday' },
		{ key: 'sunday', label: 'Sunday' }
	] as const;

	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let preferredDate = $state('');
	let message = $state('');

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		const body = encodeURIComponent(
			`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nPreferred date: ${preferredDate}\n\n${message}`
		);
		window.location.href = `mailto:${site.email}?subject=Showroom appointment request&body=${body}`;
	}
</script>

<SeoHead
	title={$_('showroom.meta_title')}
	description={$_('showroom.meta_description')}
	image="{site.seo.siteUrl}/og-default.jpg"
	type="website"
	canonical="{site.seo.siteUrl}/showroom/"
	includeLocalBusiness={true}
/>

<PageHeroSection
	eyebrow={$_('showroom.hero_eyebrow')}
	headline={$_('showroom.hero_headline')}
	subheadline={$_('showroom.hero_subheadline')}
	image={imageWithFallback('/images/showroom/interior.webp', '/images/hero-poster.jpg')}
	height="large"
/>

<section class="bg-bg-primary py-20 md:py-32 lg:py-40">
	<div class="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
		<div class="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
			<div class="space-y-8">
				<h2 class="font-serif text-3xl text-text-primary md:text-4xl lg:text-5xl">
					<SplitTextReveal as="span" text={$_('showroom.atmosphere_label')} />
				</h2>
				<p class="max-w-[65ch] font-sans text-body-lg leading-relaxed text-text-secondary">
					{showroom.atmosphere}
				</p>
			</div>
			<div>
				<ImageReveal
					src={imageWithFallback('/images/showroom/detail.webp', '/images/craftsmanship.jpg')}
					alt="Detail of material samples in the Áras Living showroom"
					class="aspect-[4/3] w-full"
					direction="up"
				/>
			</div>
		</div>
	</div>
</section>

<section class="bg-bg-secondary py-20 md:py-32 lg:py-40">
	<div class="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
		<h2 class="mb-12 font-serif text-3xl text-text-primary md:text-4xl">
			<SplitTextReveal as="span" text={$_('showroom.spotlights_label')} />
		</h2>
		<div class="grid gap-8 md:grid-cols-3">
			{#each showroom.spotlights as person}
				<div class="group">
					<div class="image-warm-overlay relative mb-6 aspect-[3/4] overflow-hidden bg-bg-primary">
						<img
							src={imageWithFallback(person.image.src, '/images/team/founder.jpg')}
							alt={person.image.alt}
							loading="lazy"
							class="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
						/>
					</div>
					<p class="mb-2 font-sans text-xs uppercase tracking-[0.15em] text-accent">
						{person.role}
					</p>
					<h3 class="mb-3 font-serif text-xl text-text-primary">{person.name}</h3>
					<blockquote class="font-sans text-sm leading-relaxed text-text-secondary">
						“{person.quote}”
					</blockquote>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="bg-bg-primary py-20 md:py-32 lg:py-40">
	<div class="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
		<div class="grid gap-12 lg:grid-cols-2 lg:gap-20">
			<div class="space-y-8">
				<h2 class="font-serif text-3xl text-text-primary md:text-4xl lg:text-5xl">
					<SplitTextReveal as="span" text={$_('showroom.booking_cta_title')} />
				</h2>
				<p class="max-w-md font-sans text-body-lg text-text-secondary">
					{showroom.bookingCta}
				</p>
				<p class="max-w-md font-sans text-sm text-text-secondary">
					{showroom.virtualTourTeaser}
				</p>
			</div>

			<form onsubmit={handleSubmit} class="space-y-8">
				<div class="grid gap-6 md:grid-cols-2">
					<Input name="name" label="Name" required bind:value={name} />
					<Input name="email" type="email" label="Email" required bind:value={email} />
				</div>
				<div class="grid gap-6 md:grid-cols-2">
					<Input name="phone" type="tel" label="Phone" bind:value={phone} />
					<Input
						name="preferred-date"
						type="date"
						label="Preferred date"
						bind:value={preferredDate}
					/>
				</div>
				<Textarea name="message" label="Message" bind:value={message} />
				<Button variant="primary" type="submit">
					{$_('showroom.booking_cta_button')}
				</Button>
			</form>
		</div>
	</div>
</section>

<section class="bg-bg-secondary py-20 md:py-32 lg:py-40">
	<div class="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
		<div class="grid gap-12 lg:grid-cols-2 lg:gap-20">
			<div>
				<h2 class="mb-6 font-serif text-2xl font-light text-text-primary md:text-3xl">
					{$_('showroom.hours_label')}
				</h2>
				<dl>
					{#each days as day}
						<div
							class="flex justify-between gap-4 border-b border-border py-3 first:border-t md:text-right"
						>
							<dt
								class="font-sans text-xs font-medium uppercase tracking-widest text-text-secondary"
							>
								{day.label}
							</dt>
							<dd class="text-text-primary">{showroom.hours[day.key]}</dd>
						</div>
					{/each}
				</dl>
			</div>
			<div class="space-y-6">
				<h2 class="font-serif text-2xl font-light text-text-primary md:text-3xl">
					{$_('showroom.address_label')}
				</h2>
				<p class="font-sans text-body-lg text-text-secondary">{showroom.address}</p>
				<p class="font-sans text-sm leading-relaxed text-text-secondary">{showroom.directions}</p>
			</div>
		</div>
	</div>
</section>

<MapEmbed />
