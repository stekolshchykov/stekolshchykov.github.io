<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
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
	let direction = $state(1);

	const current = $derived(testimonials[index]);

	function next() {
		direction = 1;
		index = (index + 1) % testimonials.length;
	}

	function prev() {
		direction = -1;
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
		<div class="mx-auto grid max-w-4xl">
			{#each testimonials as testimonial, i}
				<div
					class="col-start-1 row-start-1 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
					class:opacity-100={i === index}
					class:opacity-0={i !== index}
					class:translate-x-0={i === index}
					class:translate-x-6={i !== index && direction > 0}
					class:-translate-x-6={i !== index && direction < 0}
					class:pointer-events-none={i !== index}
					aria-hidden={i !== index}
				>
					<TestimonialCard {...testimonial} variant="large" />
				</div>
			{/each}
		</div>

		<div class="sr-only" aria-live="polite">
			{current.quote} — {current.name}, {current.location}
		</div>

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
