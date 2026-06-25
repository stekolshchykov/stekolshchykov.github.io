<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion } from '$lib/utils/motion';

	let x = $state(0);
	let y = $state(0);
	let visible = $state(false);
	let active = $state(false);

	onMount(() => {
		if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return;

		function move(event: MouseEvent) {
			x = event.clientX;
			y = event.clientY;
			visible = true;
			active = !!(event.target as Element | null)?.closest(
				'a, button, input, textarea, select, [role="button"]'
			);
		}

		function leave() {
			visible = false;
		}

		window.addEventListener('mousemove', move, { passive: true });
		window.addEventListener('mouseleave', leave);

		return () => {
			window.removeEventListener('mousemove', move);
			window.removeEventListener('mouseleave', leave);
		};
	});
</script>

<div
	class="luxury-cursor fixed left-0 top-0 z-[120] hidden pointer-events-none md:block"
	class:luxury-cursor--visible={visible}
	class:luxury-cursor--active={active}
	style="transform: translate3d({x}px, {y}px, 0);"
	aria-hidden="true"
>
	<span class="luxury-cursor__ring"></span>
	<span class="luxury-cursor__dot"></span>
</div>

<style>
	.luxury-cursor {
		opacity: 0;
		transition: opacity 220ms ease;
	}

	.luxury-cursor--visible {
		opacity: 1;
	}

	.luxury-cursor__ring,
	.luxury-cursor__dot {
		position: absolute;
		left: 0;
		top: 0;
		border-radius: 999px;
		transform: translate(-50%, -50%);
	}

	.luxury-cursor__ring {
		width: 42px;
		height: 42px;
		border: 1px solid rgba(196, 149, 106, 0.42);
		background: radial-gradient(circle, rgba(196, 149, 106, 0.08), transparent 62%);
		backdrop-filter: blur(1px);
		transition:
			width 260ms cubic-bezier(0.22, 1, 0.36, 1),
			height 260ms cubic-bezier(0.22, 1, 0.36, 1),
			border-color 260ms ease,
			background 260ms ease;
	}

	.luxury-cursor__dot {
		width: 4px;
		height: 4px;
		background: var(--color-accent);
		box-shadow: 0 0 20px rgba(196, 149, 106, 0.55);
	}

	.luxury-cursor--active .luxury-cursor__ring {
		width: 68px;
		height: 68px;
		border-color: rgba(196, 149, 106, 0.72);
		background: radial-gradient(circle, rgba(196, 149, 106, 0.16), transparent 66%);
	}
</style>
