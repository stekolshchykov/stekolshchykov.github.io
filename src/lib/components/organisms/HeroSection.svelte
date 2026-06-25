<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import Text from '$lib/components/atoms/Text.svelte';
	import Button from '$lib/components/atoms/Button.svelte';

	interface Props {
		videoPoster: string;
		videoSrc?: string;
		webpPoster?: string;
		headline?: string;
		subheadline?: string;
		ctaLabel?: string;
	}

	let {
		videoPoster,
		videoSrc = '/videos/hero.mp4',
		webpPoster = '/images/generated/hero-wardrobe.webp',
		headline,
		subheadline,
		ctaLabel
	}: Props = $props();

	const proofItems = [
		{ label: 'Recent project', value: 'Dublin Bay Dressing Room' },
		{ label: 'Featured material', value: 'American walnut + aged brass' },
		{ label: 'Made in Ireland', value: 'Measured, built, installed' }
	];
</script>

<section class="relative flex min-h-[100svh] items-end overflow-hidden bg-bg-primary">
	<div class="hero-bg absolute inset-0 z-0">
		<div class="hero-bg-inner h-full w-full overflow-hidden">
			<video
				class="hero-bg-video h-full w-full object-cover"
				poster={videoPoster}
				autoplay
				muted
				loop
				playsinline
				preload="metadata"
				aria-hidden="true"
			>
				<source src={videoSrc} type="video/mp4" />
			</video>
			<picture>
				<source srcset={webpPoster} type="image/webp" />
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
		<div class="hero-shade absolute inset-0"></div>
		<div class="hero-light absolute inset-0"></div>
	</div>

	<div class="relative z-10 w-full px-6 pb-44 pt-32 md:px-12 md:pb-24 lg:px-16">
		<div class="mx-auto max-w-[1440px]">
			<div class="max-w-4xl text-left">
				<Heading
					as="h1"
					variant="display"
					class="hero-fade hero-headline mb-6 max-w-[11ch] text-[clamp(4rem,10vw,8.5rem)] text-text-primary"
				>
					{headline ?? $_('home.hero_headline')}
				</Heading>
				<Text variant="body-lg" class="hero-fade mb-10 max-w-xl text-text-primary/88">
					{subheadline ?? $_('home.hero_subheadline')}
				</Text>
				<div class="hero-fade flex flex-wrap items-center gap-5">
					<Button variant="primary" size="lg" href="/en/contact/">
						{ctaLabel ?? $_('home.hero_cta')}
					</Button>
					<a
						href="/en/projects/penthouse-wardrobe-suite/"
						class="group hidden items-center gap-3 font-sans text-xs font-medium uppercase tracking-[0.16em] text-text-primary/80 transition-colors hover:text-accent sm:inline-flex"
					>
						View flagship project
						<span
							class="h-px w-8 bg-text-primary/40 transition-all duration-300 group-hover:w-12 group-hover:bg-accent"
							aria-hidden="true"
						></span>
					</a>
				</div>
			</div>
		</div>
	</div>

	<div
		class="hero-fade absolute right-8 bottom-28 z-20 hidden w-[min(360px,30vw)] border-l border-text-primary/15 pl-7 lg:block xl:right-16"
	>
		<div class="space-y-5">
			{#each proofItems as item}
				<a
					href={item.label === 'Recent project'
						? '/en/projects/penthouse-wardrobe-suite/'
						: item.label === 'Featured material'
							? '/en/materials/american-walnut/'
							: '/en/about/'}
					class="group grid grid-cols-[64px_minmax(0,1fr)_28px] items-center gap-4 border-b border-text-primary/12 pb-4"
				>
					<span
						class="block aspect-square overflow-hidden border border-text-primary/15 bg-bg-secondary"
					>
						<img
							src={item.label === 'Featured material'
								? '/images/generated/material-detail.webp'
								: item.label === 'Recent project'
									? '/images/generated/hero-wardrobe.webp'
									: '/images/generated/workshop-makers.webp'}
							alt=""
							class="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
						/>
					</span>
					<span>
						<span
							class="mb-2 block font-sans text-[10px] uppercase tracking-[0.18em] text-text-secondary"
						>
							{item.label}
						</span>
						<span class="block font-sans text-sm leading-snug text-text-primary">
							{item.value}
						</span>
					</span>
					<span
						class="h-px w-full bg-text-primary/45 transition-colors duration-300 group-hover:bg-accent"
						aria-hidden="true"
					></span>
				</a>
			{/each}
		</div>
	</div>

	<div
		class="scroll-indicator absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
	>
		<span class="font-sans text-[10px] uppercase tracking-[0.2em] text-text-primary/60">Scroll</span
		>
		<div class="relative h-12 w-px overflow-hidden bg-text-primary/20">
			<div
				class="absolute top-0 left-0 h-full w-full origin-top bg-text-primary/60 animate-scroll-line"
			></div>
		</div>
	</div>
</section>

<style>
	:global(.hero-headline) {
		text-shadow: 0 2px 46px rgba(0, 0, 0, 0.46);
	}

	.hero-bg-inner {
		opacity: 1;
	}

	.hero-bg-video,
	.hero-bg-image {
		animation: hero-ken-burns 20s ease-in-out infinite alternate;
	}

	.hero-bg-video {
		position: absolute;
		inset: 0;
		z-index: 1;
	}

	.hero-bg-image {
		position: absolute;
		inset: 0;
		z-index: 0;
	}

	.hero-shade {
		z-index: 2;
		background:
			linear-gradient(
				90deg,
				rgba(10, 10, 15, 0.86) 0%,
				rgba(10, 10, 15, 0.45) 42%,
				rgba(10, 10, 15, 0.2) 100%
			),
			linear-gradient(
				0deg,
				rgba(10, 10, 15, 0.72) 0%,
				rgba(10, 10, 15, 0.04) 44%,
				rgba(10, 10, 15, 0.38) 100%
			);
	}

	.hero-light {
		z-index: 3;
		background: radial-gradient(circle at 72% 52%, rgba(196, 149, 106, 0.16), transparent 34%);
		mix-blend-mode: screen;
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
			transform: scale(1.01);
		}
		to {
			transform: scale(1.055);
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
		.hero-bg-video,
		.hero-bg-image,
		.hero-fade,
		.scroll-indicator {
			animation: none;
			opacity: 1;
			transform: none;
		}

		.hero-bg-video {
			display: none;
		}
	}

	@media (max-width: 767px) {
		:global(.hero-headline) {
			font-size: 3.55rem;
			line-height: 0.96;
		}

		.hero-shade {
			background:
				linear-gradient(
					0deg,
					rgba(10, 10, 15, 0.82) 0%,
					rgba(10, 10, 15, 0.36) 52%,
					rgba(10, 10, 15, 0.72) 100%
				),
				linear-gradient(90deg, rgba(10, 10, 15, 0.56), rgba(10, 10, 15, 0.18));
		}
	}
</style>
