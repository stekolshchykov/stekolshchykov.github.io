<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { fade } from 'svelte/transition';
	import { prefersReducedMotion } from '$lib/utils/motion';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import type { Testimonial } from '$lib/types/furniture';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import Eyebrow from '$lib/components/atoms/Eyebrow.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import TestimonialCard from '$lib/components/molecules/TestimonialCard.svelte';

	interface Props {
		testimonials: Testimonial[];
	}

	let { testimonials }: Props = $props();
	let section: HTMLElement;
	let index = $state(0);

	const current = $derived(testimonials[index]);

	function next() {
		index = (index + 1) % testimonials.length;
	}

	function prev() {
		index = (index - 1 + testimonials.length) % testimonials.length;
	}

	onMount(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.testimonials-fade',
				{ y: 40, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					stagger: 0.12,
					ease: 'power3.out',
					scrollTrigger: { trigger: section, start: 'top 75%', immediateRender: false }
				}
			);
		}, section);

		return () => ctx.revert();
	});
</script>

<section bind:this={section} class="bg-bg-primary py-20 md:py-32 lg:py-40">
	<div class="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
		<div class="mb-12 md:mb-16">
			<Eyebrow text={$_('home.testimonials_eyebrow')} class="testimonials-fade mb-4" />
			<Heading
				as="h2"
				variant="serif"
				class="testimonials-fade text-3xl text-text-primary md:text-4xl lg:text-5xl"
			>
				{$_('home.testimonials_headline')}
			</Heading>
		</div>

		<div class="testimonials-fade relative">
			{#key current}
				<div
					transition:fade={{ duration: prefersReducedMotion() ? 0 : 400 }}
					class="mx-auto max-w-4xl"
				>
					<TestimonialCard {...current} variant="large" />
				</div>
			{/key}

			{#if testimonials.length > 1}
				<div class="mt-12 flex items-center justify-center gap-6">
					<button
						type="button"
						aria-label="Previous testimonial"
						class="group inline-flex h-12 w-12 items-center justify-center border border-text-primary/10 text-text-primary transition-colors hover:border-accent hover:text-accent"
						onclick={prev}
					>
						<ChevronLeft size={20} />
					</button>
					<span class="font-sans text-sm text-text-secondary">
						{String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
					</span>
					<button
						type="button"
						aria-label="Next testimonial"
						class="group inline-flex h-12 w-12 items-center justify-center border border-text-primary/10 text-text-primary transition-colors hover:border-accent hover:text-accent"
						onclick={next}
					>
						<ChevronRight size={20} />
					</button>
				</div>
			{/if}
		</div>
	</div>
</section>
