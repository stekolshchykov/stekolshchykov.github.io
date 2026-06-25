<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { site, whyUsItems } from '$lib/data/site';
	import { team } from '$lib/data/team';
	import { materials } from '$lib/data/materials';

	import SeoHead from '$lib/components/molecules/SeoHead.svelte';
	import PageHeroSection from '$lib/components/organisms/PageHeroSection.svelte';
	import TeamGrid from '$lib/components/organisms/TeamGrid.svelte';
	import WhyUsGrid from '$lib/components/organisms/WhyUsGrid.svelte';
	import CTABannerSection from '$lib/components/organisms/CTABannerSection.svelte';
</script>

<svelte:head>
	<title>{$_('about.meta_title')}</title>
	<meta name="description" content={$_('about.meta_description')} />
	<meta property="og:title" content={$_('about.meta_title')} />
	<meta property="og:description" content={$_('about.meta_description')} />
	<meta property="og:image" content="{site.seo.siteUrl}/og-about.jpg" />
	<meta property="og:type" content="website" />
	<link rel="canonical" href="{site.seo.siteUrl}/about/" />
</svelte:head>

<SeoHead
	title={$_('about.meta_title')}
	description={$_('about.meta_description')}
	image="{site.seo.siteUrl}/og-about.jpg"
	type="website"
	canonical="{site.seo.siteUrl}/about/"
/>

<PageHeroSection
	eyebrow={$_('about.hero_eyebrow')}
	headline={$_('about.hero_headline')}
	subheadline={$_('about.hero_subheadline')}
	image="/images/about-hero.jpg"
	height="medium"
	alignment="center"
/>

<section class="bg-bg-primary py-20 md:py-28">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="grid gap-12 lg:grid-cols-2 lg:gap-20">
			<div>
				<span class="text-sm font-medium uppercase tracking-widest text-accent"
					>{$_('about.story_eyebrow')}</span
				>
				<h2 class="mt-4 font-serif text-3xl font-light md:text-4xl lg:text-5xl">
					{$_('about.story_headline')}
				</h2>
			</div>
			<div class="space-y-6 text-text-secondary">
				<p class="text-lg leading-relaxed">{$_('about.story_body_1')}</p>
				<p class="text-lg leading-relaxed">{$_('about.story_body_2')}</p>
			</div>
		</div>
	</div>
</section>

<section class="bg-bg-secondary py-20 md:py-28">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="grid gap-12 lg:grid-cols-2 lg:gap-20">
			<div class="order-2 lg:order-1">
				<img
					src="/images/craftsmanship.jpg"
					alt="Áras Living workshop craftsmanship"
					class="aspect-[4/3] w-full object-cover"
					loading="lazy"
				/>
			</div>
			<div class="order-1 lg:order-2">
				<span class="text-sm font-medium uppercase tracking-widest text-accent"
					>{$_('about.craft_eyebrow')}</span
				>
				<h2 class="mt-4 font-serif text-3xl font-light md:text-4xl lg:text-5xl">
					{$_('about.craft_headline')}
				</h2>
				<p class="mt-6 text-lg leading-relaxed text-text-secondary">{$_('about.craft_body')}</p>
				<ul class="mt-8 grid gap-3 text-text-secondary">
					{#each materials.slice(0, 4) as material (material.id)}
						<li class="flex items-center gap-3">
							<span class="h-1.5 w-1.5 bg-accent"></span>
							{material.name}
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>

<section class="bg-bg-primary py-20 md:py-28">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mb-12 max-w-2xl">
			<span class="text-sm font-medium uppercase tracking-widest text-accent"
				>{$_('about.team_eyebrow')}</span
			>
			<h2 class="mt-4 font-serif text-3xl font-light md:text-4xl lg:text-5xl">
				{$_('about.team_headline')}
			</h2>
			<p class="mt-6 text-lg leading-relaxed text-text-secondary">{$_('about.team_body')}</p>
		</div>
		<TeamGrid {team} />
	</div>
</section>

<section class="bg-bg-secondary py-20 md:py-28">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mb-12 text-center">
			<span class="text-sm font-medium uppercase tracking-widest text-accent"
				>{$_('about.why_us_eyebrow')}</span
			>
			<h2 class="mt-4 font-serif text-3xl font-light md:text-4xl lg:text-5xl">
				{$_('about.why_us_headline')}
			</h2>
		</div>
		<WhyUsGrid items={whyUsItems} />
	</div>
</section>

<CTABannerSection headline={$_('about.cta_headline')} ctaLabel={$_('about.cta_button')} />
