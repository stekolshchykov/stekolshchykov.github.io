<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { site } from '$lib/data/site';
	import { projects } from '$lib/data/projects';

	import SeoHead from '$lib/components/molecules/SeoHead.svelte';
	import PageHeroSection from '$lib/components/organisms/PageHeroSection.svelte';
	import ProjectGrid from '$lib/components/organisms/ProjectGrid.svelte';
</script>

<svelte:head>
	<title>{$_('projects.meta_title')}</title>
	<meta name="description" content={$_('projects.meta_description')} />
	<meta property="og:title" content={$_('projects.meta_title')} />
	<meta property="og:description" content={$_('projects.meta_description')} />
	<meta property="og:image" content="{site.seo.siteUrl}/og-projects.jpg" />
	<meta property="og:type" content="website" />
	<link rel="canonical" href="{site.seo.siteUrl}/projects/" />
</svelte:head>

<SeoHead
	title={$_('projects.meta_title')}
	description={$_('projects.meta_description')}
	image="{site.seo.siteUrl}/og-projects.jpg"
	type="website"
	canonical="{site.seo.siteUrl}/projects/"
/>

<PageHeroSection
	eyebrow={$_('projects.hero_eyebrow')}
	headline={$_('projects.hero_headline')}
	subheadline={$_('projects.hero_subheadline')}
	image="/images/projects-hero.jpg"
/>

<section class="bg-bg-primary py-20 md:py-28">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<ProjectGrid {projects} />
	</div>
</section>
