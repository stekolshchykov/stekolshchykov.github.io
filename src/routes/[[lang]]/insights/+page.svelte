<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { site } from '$lib/data/site';
	import { insights } from '$lib/data/insights';
	import { imageWithFallback } from '$lib/utils/imageFallback';

	import SeoHead from '$lib/components/molecules/SeoHead.svelte';
	import PageHeroSection from '$lib/components/organisms/PageHeroSection.svelte';
	import SplitTextReveal from '$lib/components/molecules/SplitTextReveal.svelte';
	import MagneticCard from '$lib/components/molecules/MagneticCard.svelte';

	const heroInsight = insights[0];
</script>

<SeoHead
	title={$_('insights.meta_title')}
	description={$_('insights.meta_description')}
	image="{site.seo.siteUrl}/og-default.jpg"
	type="website"
	canonical="{site.seo.siteUrl}/insights/"
/>

<PageHeroSection
	eyebrow={$_('insights.hero_eyebrow')}
	headline={$_('insights.hero_headline')}
	subheadline={$_('insights.hero_subheadline')}
	image={imageWithFallback(heroInsight?.heroImage.src, '/images/hero-poster.jpg')}
	height="large"
/>

<section class="bg-bg-primary py-20 md:py-32 lg:py-40">
	<div class="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
		<h2 class="mb-12 font-serif text-3xl text-text-primary md:text-4xl lg:text-5xl">
			<SplitTextReveal as="span" text={$_('insights.hero_headline')} />
		</h2>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each insights as article}
				<MagneticCard intensity={0.1}>
					<article class="group bg-bg-secondary">
						<a href="/en/insights/{article.slug}/" class="block">
							<div class="image-warm-overlay relative aspect-[16/10] overflow-hidden bg-bg-primary">
								<img
									src={imageWithFallback(article.heroImage.src, '/images/hero-poster.jpg')}
									alt={article.heroImage.alt}
									loading="lazy"
									class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
								/>
							</div>
							<div class="p-6">
								<div
									class="mb-3 flex items-center gap-4 font-sans text-xs uppercase tracking-[0.12em] text-text-secondary"
								>
									<span>{article.category}</span>
									<span class="h-px w-6 bg-text-secondary/40"></span>
									<span>{article.readTime}</span>
								</div>
								<h3
									class="mb-3 font-serif text-xl text-text-primary transition-colors group-hover:text-accent"
								>
									{article.title}
								</h3>
								<p class="mb-4 font-sans text-sm leading-relaxed text-text-secondary line-clamp-3">
									{article.excerpt}
								</p>
								<p class="font-sans text-xs uppercase tracking-[0.12em] text-accent">
									{$_('insights.author_label')}
									{article.author}
								</p>
							</div>
						</a>
					</article>
				</MagneticCard>
			{/each}
		</div>
	</div>
</section>
