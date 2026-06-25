<script lang="ts">
	import { site } from '$lib/data/site';
	import type { SeoPageType } from '$lib/types/seo';

	interface Props {
		title: string;
		description: string;
		image?: string;
		canonical: string;
		type?: SeoPageType;
		noindex?: boolean;
		nofollow?: boolean;
		publishedAt?: string;
		modifiedAt?: string;
		author?: string;
		keywords?: string[];
		includeLocalBusiness?: boolean;
		preloadImage?: string;
		preloadImageType?: string;
	}

	let {
		title,
		description,
		image,
		canonical,
		type = 'website',
		noindex = false,
		nofollow = false,
		publishedAt,
		modifiedAt,
		author,
		keywords,
		includeLocalBusiness = false,
		preloadImage,
		preloadImageType = 'image/webp'
	}: Props = $props();

	const fullImage = $derived(
		image?.startsWith('http') ? image : `${site.seo.siteUrl}${image ?? site.seo.defaultImage}`
	);

	const robots = $derived(
		noindex || nofollow
			? `${noindex ? 'noindex' : ''}${noindex && nofollow ? ',' : ''}${nofollow ? 'nofollow' : ''}`
			: null
	);

	const localBusinessSchema = $derived(
		includeLocalBusiness
			? {
					'@context': 'https://schema.org',
					'@type': 'LocalBusiness',
					name: site.brand,
					image: `${site.seo.siteUrl}${site.seo.defaultImage}`,
					url: site.seo.siteUrl,
					telephone: site.phone,
					email: site.email,
					address: {
						'@type': 'PostalAddress',
						addressLocality: site.address,
						addressCountry: 'IE'
					},
					description: site.seo.defaultDescription
				}
			: null
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	{#if keywords?.length}
		<meta name="keywords" content={keywords.join(', ')} />
	{/if}
	{#if robots}
		<meta name="robots" content={robots} />
	{/if}
	<link rel="canonical" href={canonical} />

	{#if preloadImage}
		<link rel="preload" as="image" href={preloadImage} type={preloadImageType} />
	{/if}

	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={fullImage} />
	{#if site.seo.twitterHandle}
		<meta name="twitter:site" content={site.seo.twitterHandle} />
	{/if}
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={fullImage} />

	{#if publishedAt}
		<meta property="article:published_time" content={publishedAt} />
	{/if}
	{#if modifiedAt}
		<meta property="article:modified_time" content={modifiedAt} />
	{/if}
	{#if author}
		<meta property="article:author" content={author} />
	{/if}

	{#if localBusinessSchema}
		{@html '<script type="application/ld+json">' + JSON.stringify(localBusinessSchema) + '</script>'}
	{/if}
</svelte:head>
