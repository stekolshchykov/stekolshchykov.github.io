<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { addMessages, init } from 'svelte-i18n';
	import en from '$lib/i18n/locales/en.json';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	import Navigation from '$lib/components/organisms/Navigation.svelte';
	import Footer from '$lib/components/organisms/Footer.svelte';
	import ContactFormModal from '$lib/components/organisms/ContactFormModal.svelte';
	import CookieBanner from '$lib/components/molecules/CookieBanner.svelte';
	import Preloader from '$lib/components/atoms/Preloader.svelte';
	import PageTransition from '$lib/components/atoms/PageTransition.svelte';
	import NoiseOverlay from '$lib/components/atoms/NoiseOverlay.svelte';
	import ScrollProgress from '$lib/components/atoms/ScrollProgress.svelte';
	import LuxuryCursor from '$lib/components/atoms/LuxuryCursor.svelte';
	import WoodSoundLayer from '$lib/components/atoms/WoodSoundLayer.svelte';
	import { cookieConsent } from '$lib/stores/cookieConsent.svelte';

	addMessages('en', en);
	init({ fallbackLocale: 'en', initialLocale: 'en' });

	if (browser) {
		gsap.registerPlugin(ScrollTrigger);
	}

	let { children } = $props();

	let modalOpen = $state(false);
	let enhancementsReady = $state(false);

	onMount(() => {
		type IdleCallback = (deadline: { didTimeout: boolean; timeRemaining: () => number }) => void;
		const idleWindow = window as Window & {
			requestIdleCallback?: (callback: IdleCallback, options?: { timeout?: number }) => number;
			cancelIdleCallback?: (handle: number) => void;
		};

		if (idleWindow.requestIdleCallback) {
			const idleHandle = idleWindow.requestIdleCallback(() => {
				enhancementsReady = true;
			}, { timeout: 900 });

			return () => idleWindow.cancelIdleCallback?.(idleHandle);
		}

		const timeoutHandle = window.setTimeout(() => {
			enhancementsReady = true;
		}, 450);

		return () => window.clearTimeout(timeoutHandle);
	});
</script>

<div
	class="relative min-h-screen overflow-x-hidden bg-bg-primary text-text-primary antialiased selection:bg-accent/30 selection:text-text-primary"
>
	<Preloader />
	<PageTransition />
	<NoiseOverlay />
	<ScrollProgress />
	{#if enhancementsReady}
		<LuxuryCursor />
		<WoodSoundLayer />
	{/if}
	<div class="luxury-ambient" aria-hidden="true">
		<span></span>
		<span></span>
	</div>

	<Navigation />

	<main class={cookieConsent.state === 'pending' ? 'pb-32 md:pb-36' : ''}>
		{@render children()}
	</main>

	<Footer />

	<ContactFormModal open={modalOpen} />

	<CookieBanner />
</div>
