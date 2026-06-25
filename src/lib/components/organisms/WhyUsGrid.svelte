<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import type { WhyUsItem } from '$lib/types/furniture';

	interface Props {
		items: WhyUsItem[];
	}

	let { items }: Props = $props();
	let section: HTMLElement;

	onMount(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.why-fade',
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
	<div class="border-t border-text-primary/10">
		{#each items as item, i}
			<div
				class="why-fade flex flex-col gap-4 border-b border-text-primary/10 py-8 md:flex-row md:items-baseline md:gap-12 lg:gap-20"
			>
				<span class="font-sans text-xs font-medium uppercase tracking-[0.2em] text-accent">
					{String(i + 1).padStart(2, '0')}
				</span>
				<h3 class="flex-1 font-serif text-2xl font-light text-text-primary md:text-3xl lg:text-4xl">
					{item.title}
				</h3>
				<p class="flex-1 font-sans text-text-secondary md:max-w-md">
					{item.description}
				</p>
			</div>
		{/each}
	</div>
</div>
