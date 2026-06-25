<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { site } from '$lib/data/site';
	import { legal } from '$lib/data/legal';

	import SeoHead from '$lib/components/molecules/SeoHead.svelte';
	import LegalDocumentSection from '$lib/components/organisms/LegalDocumentSection.svelte';

	const pageData = legal.terms;
</script>

<svelte:head>
	<title>{pageData.title} — {site.brand}</title>
	<meta name="description" content="Terms of Service for {site.brand}." />
	<meta property="og:title" content="{pageData.title} — {site.brand}" />
	<meta property="og:description" content="Terms of Service for {site.brand}." />
	<meta property="og:image" content="{site.seo.siteUrl}{site.seo.defaultImage}" />
	<meta property="og:type" content="website" />
	<link rel="canonical" href="{site.seo.siteUrl}/terms/" />
</svelte:head>

<SeoHead
	title="{pageData.title} — {site.brand}"
	description="Terms of Service for {site.brand}."
	image="{site.seo.siteUrl}{site.seo.defaultImage}"
	type="website"
	canonical="{site.seo.siteUrl}/terms/"
/>

<LegalDocumentSection document={pageData} />
