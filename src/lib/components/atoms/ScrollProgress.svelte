<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let progress = $state(0);
	let prefersReducedMotion = $state(false);

	onMount(() => {
		prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const onScroll = () => {
			const scrollTop = window.scrollY;
			const docHeight = document.documentElement.scrollHeight - window.innerHeight;
			progress = docHeight > 0 ? scrollTop / docHeight : 0;
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();

		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

{#if browser && !prefersReducedMotion}
	<div
		class="fixed top-0 left-0 z-[100] h-[2px] w-full origin-left bg-accent"
		style="transform: scaleX({progress});"
		aria-hidden="true"
	></div>
{/if}
