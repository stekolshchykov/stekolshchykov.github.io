<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { site } from '$lib/data/site';
	import { legal } from '$lib/data/legal';

	import SeoHead from '$lib/components/molecules/SeoHead.svelte';
	import CookieBanner from '$lib/components/molecules/CookieBanner.svelte';

	const pageData = legal.cookies;
</script>

<svelte:head>
	<title>{pageData.title} — {site.brand}</title>
	<meta name="description" content="Cookie Policy for {site.brand}." />
	<meta property="og:title" content="{pageData.title} — {site.brand}" />
	<meta property="og:description" content="Cookie Policy for {site.brand}." />
	<meta property="og:image" content="{site.seo.siteUrl}{site.seo.defaultImage}" />
	<meta property="og:type" content="website" />
	<link rel="canonical" href="{site.seo.siteUrl}/cookies/" />
</svelte:head>

<SeoHead
	title="{pageData.title} — {site.brand}"
	description="Cookie Policy for {site.brand}."
	image="{site.seo.siteUrl}{site.seo.defaultImage}"
	type="website"
	canonical="{site.seo.siteUrl}/cookies/"
/>

<section class="bg-bg-primary py-24 md:py-32">
	<div class="mx-auto max-w-3xl px-6 lg:px-8">
		<h1 class="font-serif text-4xl font-light md:text-5xl lg:text-6xl">{pageData.title}</h1>
		<p class="mt-4 text-sm text-text-secondary">
			{$_('legal.last_updated')}: {pageData.lastUpdated}
		</p>

		<div class="mt-16 space-y-12">
			{#each pageData.sections as section (section.id)}
				<article>
					<h2 class="font-serif text-2xl font-light md:text-3xl">{section.title}</h2>
					<div class="mt-4 space-y-4 text-text-secondary">
						{#each section.content as paragraph, i (i)}
							<p class="leading-relaxed">{paragraph}</p>
						{/each}
					</div>
				</article>
			{/each}
		</div>

		<aside class="mt-16 border border-accent/20 bg-bg-secondary p-8">
			<h2 class="font-serif text-2xl font-light md:text-3xl">{$_('legal.preferences_title')}</h2>
			<p class="mt-2 text-text-secondary">{$_('legal.preferences_description')}</p>
			<div class="mt-6">
				<CookieBanner embedded={true} />
			</div>
		</aside>
	</div>
</section>
