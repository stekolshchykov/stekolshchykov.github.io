<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { ArrowRight } from 'lucide-svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import Text from '$lib/components/atoms/Text.svelte';
	import Image from '$lib/components/atoms/Image.svelte';

	interface Props {
		headline: string;
		subtext?: string;
		ctaLabel?: string;
		ctaHref?: string;
		image?: string;
	}

	let {
		headline,
		subtext,
		ctaLabel,
		ctaHref = '/en/contact/',
		image = '/images/craftsmanship.jpg'
	}: Props = $props();

	let section: HTMLElement;

	onMount(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.cta-fade',
				{ y: 40, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.9,
					stagger: 0.15,
					ease: 'power3.out',
					scrollTrigger: { trigger: section, start: 'top 75%', immediateRender: false }
				}
			);
		}, section);

		return () => ctx.revert();
	});
</script>

<section bind:this={section} class="bg-bg-primary">
	<div class="mx-auto max-w-[1440px]">
		<div class="grid min-h-[420px] lg:grid-cols-2">
			<div
				class="relative flex flex-col justify-center border-b border-text-secondary/20 bg-bg-secondary px-6 py-16 md:px-12 lg:border-b-0 lg:border-r lg:px-16"
			>
				<Heading
					as="h2"
					variant="display"
					class="cta-fade mb-6 max-w-lg text-4xl text-text-primary md:text-5xl"
				>
					{headline}
				</Heading>
				{#if subtext}
					<Text variant="body-lg" class="cta-fade mb-10 max-w-md text-text-secondary">
						{subtext}
					</Text>
				{/if}
				<a
					href={ctaHref}
					class="cta-fade group inline-flex items-center gap-3 font-serif text-xl text-text-primary transition-colors duration-200 hover:text-accent"
				>
					<span class="relative">
						{ctaLabel ?? $_('home.cta_button')}
						<span
							class="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full"
						></span>
					</span>
					<ArrowRight class="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
				</a>
			</div>

			<div class="relative min-h-[320px] lg:min-h-full">
				<Image
					src={image}
					alt=""
					class="absolute inset-0 h-full w-full object-cover"
					loading="lazy"
				/>
			</div>
		</div>
	</div>
</section>
