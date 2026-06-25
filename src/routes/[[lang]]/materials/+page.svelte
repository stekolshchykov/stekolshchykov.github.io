<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { site } from '$lib/data/site';
	import { materialsDetailed } from '$lib/data/materialsDetailed';
	import { imageWithFallback } from '$lib/utils/imageFallback';

	import SeoHead from '$lib/components/molecules/SeoHead.svelte';
	import PageHeroSection from '$lib/components/organisms/PageHeroSection.svelte';
	import FilterPill from '$lib/components/molecules/FilterPill.svelte';
	import MaterialPaletteBuilder from '$lib/components/molecules/MaterialPaletteBuilder.svelte';
	import MagneticCard from '$lib/components/molecules/MagneticCard.svelte';
	import SplitTextReveal from '$lib/components/molecules/SplitTextReveal.svelte';

	const families = Array.from(new Set(materialsDetailed.map((m) => m.family)));
	let activeFamily = $state<string>('all');

	const filteredMaterials = $derived(
		activeFamily === 'all'
			? materialsDetailed
			: materialsDetailed.filter((m) => m.family === activeFamily)
	);

	const paletteMaterials = $derived(
		materialsDetailed.map((m) => ({
			id: m.id,
			name: m.name,
			image: imageWithFallback(m.images.swatch.src, '/images/materials/european-oak.jpg')
		}))
	);
</script>

<SeoHead
	title={$_('materials.meta_title')}
	description={$_('materials.meta_description')}
	image="{site.seo.siteUrl}/og-default.jpg"
	type="website"
	canonical="{site.seo.siteUrl}/materials/"
/>

<PageHeroSection
	eyebrow={$_('materials.hero_eyebrow')}
	headline={$_('materials.hero_headline')}
	subheadline={$_('materials.hero_subheadline')}
	image={imageWithFallback('/images/materials/european-oak.jpg', '/images/hero-poster.jpg')}
/>

<section class="bg-bg-primary py-20 md:py-32 lg:py-40">
	<div class="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
		<div
			class="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end"
		>
			<div class="max-w-2xl">
				<h2 class="font-serif text-3xl text-text-primary md:text-4xl lg:text-5xl">
					<SplitTextReveal as="span" text={$_('materials.hero_headline')} />
				</h2>
			</div>
			<div class="flex flex-wrap gap-2">
				<FilterPill
					label={$_('projects.filter_all')}
					value="all"
					active={activeFamily === 'all'}
					onclick={() => (activeFamily = 'all')}
				/>
				{#each families as family}
					<FilterPill
						label={family}
						value={family}
						active={activeFamily === family}
						count={materialsDetailed.filter((m) => m.family === family).length}
						onclick={() => (activeFamily = family)}
					/>
				{/each}
			</div>
		</div>

		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each filteredMaterials as material}
				<MagneticCard intensity={0.1}>
					<a href="/en/materials/{material.id}/" class="group block bg-bg-secondary">
						<div class="image-warm-overlay relative aspect-square overflow-hidden bg-bg-primary">
							<img
								src={imageWithFallback(
									material.images.swatch.src,
									'/images/materials/european-oak.jpg'
								)}
								alt={material.images.swatch.alt}
								loading="lazy"
								width="800"
								height="800"
								class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
							/>
						</div>
						<div class="p-5">
							<p class="mb-1 font-sans text-[11px] uppercase tracking-[0.12em] text-accent">
								{material.family}
							</p>
							<h3 class="mb-2 font-serif text-xl text-text-primary">{material.name}</h3>
							<p class="font-sans text-sm leading-relaxed text-text-secondary line-clamp-2">
								{material.tagline}
							</p>
						</div>
					</a>
				</MagneticCard>
			{/each}
		</div>
	</div>
</section>

<section class="border-t border-text-primary/10 bg-bg-secondary py-20 md:py-32 lg:py-40">
	<div class="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
		<div class="mb-10 max-w-2xl md:mb-14">
			<h2 class="mb-4 font-serif text-3xl text-text-primary md:text-4xl">Build your palette</h2>
			<p class="font-sans text-body-lg text-text-secondary">
				Select up to four materials to request samples or discuss on your project.
			</p>
		</div>
		<MaterialPaletteBuilder materials={paletteMaterials} />
	</div>
</section>

<section class="bg-bg-primary py-20 md:py-28">
	<div class="mx-auto max-w-4xl px-6 text-center lg:px-8">
		<h2 class="mb-6 font-serif text-3xl font-light text-text-primary md:text-4xl">
			{$_('materials.cta_headline')}
		</h2>
		<a
			href="/en/contact/"
			class="inline-flex items-center gap-3 border border-text-primary px-8 py-3 font-sans text-sm font-medium uppercase tracking-[0.06em] text-text-primary transition-colors duration-200 hover:border-accent hover:text-accent"
		>
			{$_('materials.cta_button')}
		</a>
	</div>
</section>
