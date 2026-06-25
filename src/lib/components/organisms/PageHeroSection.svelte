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
		full: 'min-h-screen',
		large: 'min-h-[70vh]',
		medium: 'min-h-[50vh]'
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
	class="relative flex overflow-hidden {heightClasses[height]} {alignmentClasses[alignment]}"
>
	<div class="absolute inset-0 z-0">
		<Image src={image} alt="" class="h-full w-full object-cover" loading="eager" overlay />
	</div>

	<div class="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-32 pb-20 md:px-12 lg:px-16">
		<div class={alignment === 'center' ? 'mx-auto max-w-3xl' : 'max-w-3xl'}>
			<Eyebrow text={eyebrow} class="page-hero-fade mb-4" />
			<Heading
				as="h1"
				variant="display"
				class="page-hero-fade mb-4 text-4xl text-text-primary md:text-5xl lg:text-6xl"
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
</section>
