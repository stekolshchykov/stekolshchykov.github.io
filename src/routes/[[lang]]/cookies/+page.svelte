<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { site } from '$lib/data/site';
	import { legal } from '$lib/data/legal';

	import SeoHead from '$lib/components/molecules/SeoHead.svelte';
	import CookieBanner from '$lib/components/molecules/CookieBanner.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import Text from '$lib/components/atoms/Text.svelte';
	import LegalDocumentSection from '$lib/components/organisms/LegalDocumentSection.svelte';

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

<LegalDocumentSection document={pageData}>
	{#snippet aside()}
		<aside class="mt-16 border border-accent/20 bg-bg-secondary p-8">
			<Heading as="h2" variant="serif" class="text-2xl font-light text-text-primary md:text-3xl">
				{$_('legal.preferences_title')}
			</Heading>
			<Text variant="body" class="mt-2 text-text-secondary">
				{$_('legal.preferences_description')}
			</Text>
			<div class="mt-6">
				<CookieBanner embedded={true} />
			</div>
		</aside>
	{/snippet}
</LegalDocumentSection>
