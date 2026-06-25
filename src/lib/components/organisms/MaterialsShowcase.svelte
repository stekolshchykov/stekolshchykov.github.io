<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import type { Material } from '$lib/types/furniture';
	import Eyebrow from '$lib/components/atoms/Eyebrow.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import Text from '$lib/components/atoms/Text.svelte';
	import MaterialCard from '$lib/components/molecules/MaterialCard.svelte';

	interface Props {
		materials: Material[];
		eyebrow?: string;
		headline?: string;
		statement?: string;
	}

	let {
		materials,
		eyebrow = $_('services.materials_eyebrow'),
		headline = $_('services.materials_headline'),
		statement = 'Materials chosen for how they age, feel, and fit.'
	}: Props = $props();
	let section: HTMLElement;

	const hero = $derived(materials[0]);
	const remainder = $derived(materials.slice(1));

	onMount(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.material-fade',
				{ y: 40, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					stagger: 0.1,
					ease: 'power3.out',
					scrollTrigger: { trigger: section, start: 'top 75%', immediateRender: false }
				}
			);
		}, section);

		return () => ctx.revert();
	});
</script>

<div bind:this={section}>
	<div class="mb-12 max-w-2xl md:mb-16">
		<div class="material-fade">
			<Eyebrow text={eyebrow} class="mb-4" />
		</div>
		<div class="material-fade">
			<Heading as="h2" variant="serif" class="text-3xl text-text-primary md:text-4xl lg:text-5xl">
				{headline}
			</Heading>
		</div>
		<div class="material-fade mt-6">
			<Text variant="body-lg" class="text-text-secondary">
				{statement}
			</Text>
		</div>
	</div>

	{#if hero}
		<div
			class="material-fade group relative mb-4 aspect-[21/9] overflow-hidden bg-bg-primary md:mb-6"
		>
			<img
				src={hero.image.src}
				alt={hero.image.alt}
				loading="lazy"
				class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
			/>
			<div
				class="absolute inset-0 bg-gradient-to-r from-bg-primary/80 via-bg-primary/20 to-transparent"
			></div>
			<div class="absolute inset-x-0 bottom-0 p-6 md:p-10">
				<p class="mb-2 font-sans text-xs font-medium uppercase tracking-[0.2em] text-accent">
					Featured material
				</p>
				<h3 class="font-serif text-3xl text-text-primary md:text-4xl lg:text-5xl">{hero.name}</h3>
			</div>
		</div>
	{/if}

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
		{#each remainder as material}
			<div class="material-fade">
				<MaterialCard {material} class="text-lg" />
			</div>
		{/each}
	</div>
</div>
