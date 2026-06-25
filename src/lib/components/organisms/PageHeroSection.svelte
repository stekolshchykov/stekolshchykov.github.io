<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Eyebrow from '$lib/components/atoms/Eyebrow.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import Text from '$lib/components/atoms/Text.svelte';
	import Image from '$lib/components/atoms/Image.svelte';

	interface Props {
		eyebrow: string;
		headline: string;
		subheadline?: string;
		image: string;
		height?: 'full' | 'large' | 'medium';
		alignment?: 'start' | 'center';
	}

	let {
		eyebrow,
		headline,
		subheadline,
		image,
		height = 'large',
		alignment = 'start'
	}: Props = $props();
	let section: HTMLElement;

	const isWebp = $derived(image.endsWith('.webp'));
	const preloadType = $derived(isWebp ? 'image/webp' : 'image/jpeg');

	const heightClasses = {
		full: 'min-h-[100svh]',
		large: 'min-h-[72svh]',
		medium: 'min-h-[58svh]'
	};

	const alignmentClasses = {
		start: 'items-end text-left',
		center: 'items-center justify-center text-center'
	};

	onMount(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.page-hero-fade',
				{ y: 40, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 1,
					stagger: 0.15,
					ease: 'power3.out',
					scrollTrigger: { trigger: section, start: 'top 75%', immediateRender: false }
				}
			);
		}, section);

		return () => ctx.revert();
	});
</script>

<svelte:head>
	<link rel="preload" as="image" href={image} type={preloadType} />
</svelte:head>

<section
	bind:this={section}
	class="page-hero relative flex overflow-hidden bg-bg-primary {heightClasses[
		height
	]} {alignmentClasses[alignment]}"
>
	<div class="absolute inset-0 z-0">
		<Image src={image} alt="" class="page-hero-image h-full w-full object-cover" loading="eager" />
		<div class="page-hero-shade absolute inset-0"></div>
	</div>

	<div
		class="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-32 pb-16 md:px-12 md:pb-20 lg:px-16"
	>
		<div
			class={alignment === 'center'
				? 'mx-auto max-w-4xl text-center'
				: 'max-w-4xl border-l border-text-primary/14 pl-6 md:pl-8'}
		>
			<Eyebrow text={eyebrow} class="page-hero-fade mb-4" />
			<Heading
				as="h1"
				variant="display"
				class="page-hero-fade mb-5 text-5xl text-text-primary md:text-6xl lg:text-7xl"
			>
				{headline}
			</Heading>
			{#if subheadline}
				<Text
					variant="body-lg"
					class="page-hero-fade text-text-primary/80 {alignment === 'center'
						? 'mx-auto max-w-2xl'
						: 'max-w-2xl'}"
				>
					{subheadline}
				</Text>
			{/if}
		</div>
	</div>

	<div
		class="page-hero-fade absolute bottom-0 left-0 right-0 z-10 hidden border-t border-text-primary/10 bg-bg-primary/24 backdrop-blur-[2px] md:block"
		aria-hidden="true"
	>
		<div
			class="mx-auto grid max-w-[1440px] grid-cols-3 divide-x divide-text-primary/10 px-12 lg:px-16"
		>
			<span class="py-4 font-sans text-[10px] uppercase tracking-[0.18em] text-text-secondary">
				Dublin workshop
			</span>
			<span class="px-8 py-4 font-sans text-[10px] uppercase tracking-[0.18em] text-text-secondary">
				Measured interiors
			</span>
			<span
				class="px-8 py-4 text-right font-sans text-[10px] uppercase tracking-[0.18em] text-text-secondary"
			>
				Built in Ireland
			</span>
		</div>
	</div>
</section>

<style>
	:global(.page-hero-image img),
	:global(.page-hero-image) {
		transform-origin: center;
		animation: page-hero-drift 18s ease-in-out infinite alternate;
	}

	.page-hero-shade {
		background:
			linear-gradient(
				90deg,
				rgba(10, 10, 15, 0.82) 0%,
				rgba(10, 10, 15, 0.48) 44%,
				rgba(10, 10, 15, 0.18) 100%
			),
			linear-gradient(
				0deg,
				rgba(10, 10, 15, 0.72) 0%,
				rgba(10, 10, 15, 0.08) 50%,
				rgba(10, 10, 15, 0.42) 100%
			);
	}

	@keyframes page-hero-drift {
		from {
			transform: scale(1.01);
		}
		to {
			transform: scale(1.055);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.page-hero-image img),
		:global(.page-hero-image) {
			animation: none;
			transform: none;
		}
	}

	@media (max-width: 767px) {
		.page-hero-shade {
			background:
				linear-gradient(
					0deg,
					rgba(10, 10, 15, 0.8) 0%,
					rgba(10, 10, 15, 0.34) 54%,
					rgba(10, 10, 15, 0.72) 100%
				),
				linear-gradient(90deg, rgba(10, 10, 15, 0.6), rgba(10, 10, 15, 0.18));
		}
	}
</style>
