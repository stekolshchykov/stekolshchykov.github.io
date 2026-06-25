<script lang="ts">
	import { onMount } from 'svelte';
	import { cx } from '$lib/utils/helpers';

	interface Props {
		src: string;
		alt: string;
		class?: string;
		direction?: 'left' | 'right' | 'up' | 'down';
		threshold?: number;
	}

	let { src, alt, class: className = '', direction = 'right', threshold = 0.2 }: Props = $props();

	let wrapper: HTMLElement;
	let revealed = $state(false);

	const clipStart = $derived.by(() => {
		switch (direction) {
			case 'left':
				return 'inset(0 100% 0 0)';
			case 'right':
				return 'inset(0 0 0 100%)';
			case 'up':
				return 'inset(100% 0 0 0)';
			case 'down':
				return 'inset(0 0 100% 0)';
		}
	});

	const clipEnd = 'inset(0 0 0 0)';

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (prefersReducedMotion) {
			revealed = true;
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						revealed = true;
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold, rootMargin: '0px 0px -10% 0px' }
		);

		if (wrapper) observer.observe(wrapper);

		return () => observer.disconnect();
	});
</script>

<div bind:this={wrapper} class={cx('relative overflow-hidden bg-bg-secondary', className)}>
	<div
		class="transition-[clip-path] duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
		style="clip-path: {revealed ? clipEnd : clipStart};"
	>
		<img {src} {alt} loading="lazy" decoding="async" class="block h-full w-full object-cover" />
	</div>
</div>
