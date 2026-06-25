<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import Text from '$lib/components/atoms/Text.svelte';
	import Button from '$lib/components/atoms/Button.svelte';

	interface Props {
		videoPoster: string;
		headline?: string;
		subheadline?: string;
		ctaLabel?: string;
	}

	let { videoPoster, headline, subheadline, ctaLabel }: Props = $props();
</script>

<section class="relative flex min-h-screen items-end overflow-hidden">
	<div class="hero-bg absolute inset-0 z-0">
		<div class="hero-bg-inner image-warm-overlay h-full w-full overflow-hidden">
			<picture>
				<source srcset="/images/hero-poster.webp" type="image/webp" />
				<img
					class="hero-bg-image h-full w-full object-cover"
					src={videoPoster}
					alt=""
					fetchpriority="high"
					loading="eager"
					decoding="sync"
					width="1920"
					height="1080"
				/>
			</picture>
		</div>
		<div class="absolute inset-0 bg-bg-primary/35"></div>
	</div>

	<div class="relative z-10 w-full max-w-[1440px] px-6 pb-24 pt-32 md:px-12 md:pb-32 lg:px-16">
		<div class="mx-auto max-w-3xl text-center">
			<Heading
				as="h1"
				variant="display"
				class="hero-fade hero-headline mb-6 text-4xl text-text-primary md:text-6xl lg:text-7xl"
			>
				{headline ?? $_('home.hero_headline')}
			</Heading>
			<Text variant="body-lg" class="hero-fade mx-auto mb-10 max-w-2xl text-text-primary/90">
				{subheadline ?? $_('home.hero_subheadline')}
			</Text>
			<div class="hero-fade flex justify-center">
				<Button variant="primary" size="lg" href="/en/contact/">
					{ctaLabel ?? $_('home.hero_cta')}
				</Button>
			</div>
		</div>
	</div>

	<div
		class="scroll-indicator absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
	>
		<span class="font-sans text-[10px] uppercase tracking-[0.2em] text-text-primary/60">Scroll</span>
		<div class="relative h-12 w-px overflow-hidden bg-text-primary/20">
			<div
				class="absolute top-0 left-0 h-full w-full origin-top bg-text-primary/60 animate-scroll-line"
			></div>
		</div>
	</div>
</section>

<style>
	:global(.hero-headline) {
		text-shadow: 0 2px 40px rgba(0, 0, 0, 0.3);
	}

	.hero-bg-inner {
		opacity: 1;
	}

	.hero-bg-image {
		animation: hero-ken-burns 20s ease-in-out infinite alternate;
	}

	.hero-fade {
		opacity: 0;
		transform: translateY(40px);
		animation: hero-content-fade 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards;
	}

	.hero-fade:nth-child(1) {
		animation-delay: 0.3s;
	}
	.hero-fade:nth-child(2) {
		animation-delay: 0.45s;
	}
	.hero-fade:nth-child(3) {
		animation-delay: 0.6s;
	}

	.scroll-indicator {
		opacity: 0;
		transform: translateY(-10px);
		animation: hero-scroll-fade 0.8s cubic-bezier(0.4, 0, 0.2, 1) 1.2s forwards;
	}

	@keyframes hero-fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes hero-ken-burns {
		from {
			transform: scale(1);
		}
		to {
			transform: scale(1.08);
		}
	}

	@keyframes hero-content-fade {
		from {
			opacity: 0;
			transform: translateY(40px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes hero-scroll-fade {
		from {
			opacity: 0;
			transform: translate(-50%, -10px);
		}
		to {
			opacity: 1;
			transform: translate(-50%, 0);
		}
	}

	@keyframes scroll-line {
		0% {
			transform: scaleY(0);
			transform-origin: top;
		}
		50% {
			transform: scaleY(1);
			transform-origin: top;
		}
		50.1% {
			transform-origin: bottom;
		}
		100% {
			transform: scaleY(0);
			transform-origin: bottom;
		}
	}

	.animate-scroll-line {
		animation: scroll-line 2s ease-in-out infinite;
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-bg-inner,
		.hero-bg-image,
		.hero-fade,
		.scroll-indicator {
			animation: none;
			opacity: 1;
			transform: none;
		}
	}
</style>
