<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { fade } from 'svelte/transition';
	import { prefersReducedMotion } from '$lib/utils/motion';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import type { Testimonial } from '$lib/types/furniture';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import Section from '$lib/components/atoms/Section.svelte';
	import SectionHeader from '$lib/components/atoms/SectionHeader.svelte';
	import TestimonialCard from '$lib/components/molecules/TestimonialCard.svelte';

	interface Props {
		testimonials: Testimonial[];
	}

	let { testimonials }: Props = $props();
	let section = $state<HTMLElement | undefined>(undefined);
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

<Section bind:element={section}>
	<SectionHeader
		eyebrow={$_('home.testimonials_eyebrow')}
		headline={$_('home.testimonials_headline')}
		size="large"
		class="testimonials-fade"
	/>

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
</Section>
