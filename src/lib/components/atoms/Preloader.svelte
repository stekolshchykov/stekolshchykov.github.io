<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Logo from '$lib/components/atoms/Logo.svelte';

	let visible = $state(false);
	let hiding = $state(false);

	onMount(() => {
		if (!browser) return;

		visible = true;

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const hide = () => {
			if (prefersReducedMotion) {
				visible = false;
				return;
			}
			hiding = true;
			setTimeout(() => {
				visible = false;
				hiding = false;
			}, 650);
		};

		const fallback = setTimeout(hide, 600);

		document.fonts.ready.then(() => {
			clearTimeout(fallback);
			requestAnimationFrame(hide);
		});

		return () => {
			clearTimeout(fallback);
		};
	});
</script>

{#if visible}
	<div
		class="preloader fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-primary transition-transform duration-[650ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
		class:-translate-y-full={hiding}
		aria-hidden="true"
	>
		<div class="preloader-logo mb-6 w-12">
			<Logo mode="monogram" variant="light" class="block h-auto w-full" />
		</div>
		<div class="preloader-line h-px w-32 overflow-hidden bg-accent/20">
			<div class="preloader-line-inner h-full w-full origin-left bg-accent"></div>
		</div>
	</div>
{/if}

<style>
	.preloader-logo {
		opacity: 0;
		animation: fadeIn 0.6s ease forwards;
	}

	.preloader-line-inner {
		transform: scaleX(0);
		animation: growLine 1s ease-in-out 0.2s forwards;
	}

	@media (prefers-reduced-motion: reduce) {
		.preloader-logo,
		.preloader-line-inner {
			animation: none;
		}
		.preloader-logo {
			opacity: 1;
		}
		.preloader-line-inner {
			transform: scaleX(1);
		}
	}

	@keyframes fadeIn {
		to {
			opacity: 1;
		}
	}

	@keyframes growLine {
		to {
			transform: scaleX(1);
		}
	}
</style>
