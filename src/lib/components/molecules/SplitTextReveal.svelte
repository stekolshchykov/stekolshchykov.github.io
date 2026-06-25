<script lang="ts">
	import { onMount } from 'svelte';
	import { cx } from '$lib/utils/helpers';

	interface Props {
		text: string;
		as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
		class?: string;
		stagger?: number;
		threshold?: number;
	}

	let {
		text,
		as: tag = 'p',
		class: className = '',
		stagger = 30,
		threshold = 0.2
	}: Props = $props();

	let container: HTMLElement;
	let visible = $state(false);

	const words = $derived(text.split(/\s+/).filter(Boolean));

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (prefersReducedMotion) {
			visible = true;
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						visible = true;
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold, rootMargin: '0px 0px -10% 0px' }
		);

		if (container) observer.observe(container);

		return () => observer.disconnect();
	});
</script>

<svelte:element this={tag} bind:this={container} class={cx('inline', className)} aria-label={text}>
	{#each words as word, i}
		<span class="inline-block overflow-hidden align-bottom">
			<span
				class="inline-block transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
				style="transition-delay: {visible ? `${i * stagger}ms` : '0ms'};"
				class:translate-y-0={visible}
				class:opacity-100={visible}
				class:translate-y-full={!visible}
				class:opacity-0={!visible}
			>
				{word}
			</span>
		</span>
		{#if i < words.length - 1}
			<span class="inline-block">&nbsp;</span>
		{/if}
	{/each}
</svelte:element>
