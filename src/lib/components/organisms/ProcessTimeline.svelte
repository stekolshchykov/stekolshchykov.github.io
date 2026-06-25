<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import type { ProcessStep as ProcessStepType } from '$lib/types/furniture';
	import ProcessStep from '$lib/components/molecules/ProcessStep.svelte';

	interface Props {
		steps: ProcessStepType[];
	}

	let { steps }: Props = $props();
	let section: HTMLElement;

	onMount(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.timeline-fade',
				{ x: -30, opacity: 0 },
				{
					x: 0,
					opacity: 1,
					duration: 0.8,
					stagger: 0.15,
					ease: 'power3.out',
					scrollTrigger: { trigger: section, start: 'top 75%', immediateRender: false }
				}
			);
		}, section);

		return () => ctx.revert();
	});
</script>

<div bind:this={section} class="mx-auto max-w-4xl">
	<div class="relative">
		<div class="absolute top-0 bottom-0 left-8 w-px bg-text-primary/10 md:left-1/2"></div>
		<div class="space-y-12">
			{#each steps as step, i}
				<div class="timeline-fade relative grid gap-8 md:grid-cols-2 md:items-center">
					<div class="md:text-right {i % 2 === 1 ? 'md:order-2 md:text-left' : ''}">
						<ProcessStep number={step.number} title={step.title} description={step.description} />
					</div>
					<div class="hidden md:block {i % 2 === 1 ? 'md:order-1' : ''}"></div>
					<div
						class="absolute top-0 left-8 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border border-text-primary/10 bg-bg-secondary md:left-1/2"
					>
						<span class="font-serif text-xl text-accent">{step.number}</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
