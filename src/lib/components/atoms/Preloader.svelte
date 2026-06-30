<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	const STORAGE_KEY = 'aras_living_preloader_seen';

	function delay(ms: number) {
		return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
	}

	function nextPaint() {
		return new Promise<void>((resolve) => {
			requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
		});
	}

	async function waitForHeroImage() {
		const image = document.querySelector<HTMLImageElement>('.hero-bg-image');
		if (!image) return;
		if (image.complete && image.naturalWidth > 0) return;

		await Promise.race([
			new Promise<void>((resolve) => {
				image.addEventListener('load', () => resolve(), { once: true });
				image.addEventListener('error', () => resolve(), { once: true });
			}),
			delay(1200)
		]);
	}

	onMount(() => {
		if (!browser) return;

		const root = document.documentElement;
		const preloader = document.getElementById('aras-initial-preloader');
		if (!preloader || root.classList.contains('aras-preloader-done')) return;

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const alreadySeen = sessionStorage.getItem(STORAGE_KEY) === '1';
		const minimumDuration = prefersReducedMotion ? 120 : alreadySeen ? 360 : 1150;
		const startedAt = performance.now();

		const finish = async () => {
			const remaining = Math.max(0, minimumDuration - (performance.now() - startedAt));
			await delay(remaining);
			await nextPaint();

			root.classList.add('aras-preloader-exit');
			sessionStorage.setItem(STORAGE_KEY, '1');

			window.setTimeout(
				() => {
					preloader.remove();
					root.classList.add('aras-preloader-done');
					root.classList.remove('aras-preloader-exit');
				},
				prefersReducedMotion ? 80 : 980
			);
		};

		const fontsReady = document.fonts?.ready?.catch(() => undefined) ?? Promise.resolve();

		Promise.race([Promise.all([fontsReady, waitForHeroImage()]), delay(2400)])
			.then(finish)
			.catch(finish);
	});
</script>
