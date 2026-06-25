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
	import Section from '$lib/components/atoms/Section.svelte';
	import SectionHeader from '$lib/components/atoms/SectionHeader.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import Button from '$lib/components/atoms/Button.svelte';

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

	const consultationMaterials = materialsDetailed.filter((material) =>
		['american-walnut', 'european-oak', 'aged-brass', 'honed-quartz'].includes(material.id)
	);

	const consultationSteps = [
		{ label: '01', value: 'Bring room dimensions or drawings' },
		{ label: '02', value: 'Compare timber, lacquer, stone, and hardware in daylight' },
		{ label: '03', value: 'Leave with a practical shortlist for your quote' }
	];
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

<Section>
	<div
		class="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end"
	>
		<div class="max-w-2xl">
			<Heading as="h2" variant="serif" class="text-3xl text-text-primary md:text-4xl lg:text-5xl">
				{$_('materials.hero_headline')}
			</Heading>
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
		{#each filteredMaterials as material, i}
			<MagneticCard intensity={0.1} revealDelay={(i % 6) * 70}>
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
</Section>

<Section tone="secondary" border="top">
	<SectionHeader
		headline="Build your palette"
		statement="Select up to four materials to request samples or discuss on your project."
	/>
	<MaterialPaletteBuilder materials={paletteMaterials} />
</Section>

<Section border="y" container="none" class="relative overflow-hidden">
	<div class="absolute inset-0 opacity-80" aria-hidden="true">
		<div
			class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
		></div>
		<div
			class="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_center,rgba(196,149,106,0.12),transparent_55%)]"
		></div>
	</div>

	<div class="relative mx-auto grid max-w-[1440px] gap-0 lg:grid-cols-[1.05fr_0.95fr]">
		<div class="px-6 py-20 md:px-12 md:py-28 lg:px-16 lg:py-32">
			<p class="mb-5 font-sans text-[11px] uppercase tracking-[0.18em] text-accent">
				Material consultation
			</p>
			<Heading
				as="h2"
				variant="display"
				class="max-w-3xl text-4xl font-light leading-tight text-text-primary md:text-5xl lg:text-6xl"
			>
				{$_('materials.cta_headline')}
			</Heading>
			<p class="mt-6 max-w-2xl font-sans text-base leading-relaxed text-text-secondary md:text-lg">
				Bring a room, a mood, or a difficult finish decision. We will compare samples under real
				light, explain how each surface ages, and shape a palette that can be priced and built.
			</p>

			<div class="mt-10 grid gap-4 border-y border-text-primary/10 py-6 md:grid-cols-3">
				{#each consultationSteps as step}
					<div class="grid grid-cols-[40px_minmax(0,1fr)] gap-4 md:block">
						<span class="font-serif text-2xl text-accent md:mb-3 md:block">{step.label}</span>
						<p class="font-sans text-sm leading-relaxed text-text-secondary">{step.value}</p>
					</div>
				{/each}
			</div>

			<div class="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
				<Button variant="primary" size="lg" href="/en/contact/">Book material consultation</Button>
				<Button variant="secondary" size="lg" href="/en/showroom/">Visit the showroom</Button>
			</div>
		</div>

		<div
			class="relative min-h-[520px] border-t border-text-primary/10 bg-bg-secondary lg:border-l lg:border-t-0"
		>
			<img
				src="/images/generated/material-detail.webp"
				alt="Walnut, brass, stone and lacquer samples arranged for specification"
				loading="lazy"
				class="absolute inset-0 h-full w-full object-cover opacity-55"
			/>
			<div
				class="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/52 to-bg-primary/10"
			></div>

			<div class="relative z-10 flex h-full flex-col justify-end p-6 md:p-10 lg:p-12">
				<div class="mb-8 max-w-sm">
					<p class="mb-3 font-sans text-[11px] uppercase tracking-[0.18em] text-text-secondary">
						Starter palette
					</p>
					<h3 class="font-serif text-3xl font-light text-text-primary md:text-4xl">
						Warm timber, aged metal, quiet stone.
					</h3>
				</div>

				<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
					{#each consultationMaterials as material}
						<a
							href="/en/materials/{material.id}/"
							class="group grid grid-cols-[72px_minmax(0,1fr)] items-center gap-4 border border-text-primary/12 bg-bg-primary/72 p-3 backdrop-blur-sm transition-colors hover:border-accent/70"
						>
							<img
								src={imageWithFallback(
									material.images.swatch.src,
									'/images/materials/european-oak.jpg'
								)}
								alt={material.images.swatch.alt}
								loading="lazy"
								class="aspect-square w-full object-cover"
							/>
							<span>
								<span
									class="mb-1 block font-sans text-[10px] uppercase tracking-[0.14em] text-accent"
								>
									{material.family}
								</span>
								<span class="block font-serif text-lg leading-tight text-text-primary">
									{material.name}
								</span>
							</span>
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
</Section>
