<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cx } from '$lib/utils/helpers';

	interface Props {
		children: Snippet;
		class?: string;
		intensity?: number;
	}

	let { children, class: className = '', intensity = 0.15 }: Props = $props();

	let card: HTMLElement;
	let transform = $state('');
	let isTouch = $state(false);

	const MAX_ROTATION = 6;

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
	bind:this={card}
	class={cx('will-change-transform transition-transform duration-200 ease-out', className)}
	style={transform ? `transform: ${transform};` : undefined}
	role="group"
	onmousemove={handleMouseMove}
	onmouseleave={handleMouseLeave}
	onmouseenter={() => (isTouch = false)}
	ontouchstart={handleTouchStart}
>
	{@render children()}
</div>
