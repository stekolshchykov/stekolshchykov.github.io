<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import type { ProcessStep as ProcessStepType } from '$lib/types/furniture';

	interface Props {
		steps: ProcessStepType[];
	}

	let { steps }: Props = $props();
	let section: HTMLElement;

	onMount(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.timeline-fade',
				{ y: 28, opacity: 0 },
				{
					y: 0,
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

<div bind:this={section} class="mx-auto max-w-[1120px]">
	<div class="relative">
		<div
			class="absolute top-9 left-[12.5%] hidden h-px w-[75%] bg-gradient-to-r from-transparent via-text-primary/15 to-transparent lg:block"
		></div>

		<ol class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			{#each steps as step, i}
				<li
					class="timeline-fade group relative overflow-hidden border border-text-primary/10 bg-bg-primary/45 p-6 transition-colors duration-500 hover:border-accent/40 md:p-7"
				>
					<div
						class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
					></div>

					<div class="mb-8 flex items-center justify-between gap-4">
						<div
							class="flex h-12 w-12 items-center justify-center border border-accent/35 bg-bg-secondary text-accent"
							aria-hidden="true"
						>
							<span class="font-serif text-xl leading-none">{step.number}</span>
						</div>
						<span class="font-sans text-[10px] uppercase tracking-[0.18em] text-text-secondary/70">
							0{i + 1}
						</span>
					</div>

					<div>
						<h3 class="font-serif text-2xl font-light text-text-primary md:text-3xl">
							{step.title}
						</h3>
						<p class="mt-4 font-sans text-sm leading-relaxed text-text-secondary">
							{step.description}
						</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</div>
