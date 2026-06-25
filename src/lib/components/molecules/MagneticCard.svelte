<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import { cx } from '$lib/utils/helpers';
	import { prefersReducedMotion } from '$lib/utils/motion';

	interface Props {
		children: Snippet;
		class?: string;
		intensity?: number;
		reveal?: boolean;
		revealDelay?: number;
	}

	let {
		children,
		class: className = '',
		intensity = 0.15,
		reveal = true,
		revealDelay = 0
	}: Props = $props();

	let wrapper: HTMLElement;
	let card: HTMLElement;
	let transform = $state('');
	let isTouch = $state(false);
	let revealed = $state(false);

	const MAX_ROTATION = 6;

	onMount(() => {
		if (!reveal || prefersReducedMotion()) {
			revealed = true;
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						revealed = true;
						observer.unobserve(entry.target);
					}
				}
			},
			{ threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
		);

		if (wrapper) observer.observe(wrapper);

		return () => observer.disconnect();
	});

	function handleMouseMove(e: MouseEvent) {
		if (isTouch || !card) return;

		const rect = card.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const percentX = (e.clientX - centerX) / (rect.width / 2);
		const percentY = (e.clientY - centerY) / (rect.height / 2);

		const rotateX = -percentY * MAX_ROTATION * intensity;
		const rotateY = percentX * MAX_ROTATION * intensity;
		const translateX = percentX * 8 * intensity;
		const translateY = percentY * 8 * intensity;

		transform = `perspective(1000px) translate3d(${translateX}px, ${translateY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
	}

	function handleMouseLeave() {
		transform = 'perspective(1000px) translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)';
	}

	function handleTouchStart() {
		isTouch = true;
		transform = '';
	}
</script>

<div
	bind:this={wrapper}
	class={cx(
		'transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
		revealed ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-8 opacity-0 blur-[2px]',
		className
	)}
	style={`transition-delay: ${revealed ? revealDelay : 0}ms;`}
	role="group"
	onmousemove={handleMouseMove}
	onmouseleave={handleMouseLeave}
	onmouseenter={() => (isTouch = false)}
	ontouchstart={handleTouchStart}
>
	<div
		bind:this={card}
		class="h-full will-change-transform transition-transform duration-200 ease-out"
		style={transform ? `transform: ${transform};` : undefined}
	>
		{@render children()}
	</div>
</div>
