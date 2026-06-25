<script lang="ts">
	interface Props {
		src: string;
		alt: string;
		sizes?: string;
		loading?: 'eager' | 'lazy';
		class?: string;
		parallax?: boolean;
		aspect?: 'auto' | 'video' | 'square' | 'portrait' | 'landscape';
		width?: number | string;
		height?: number | string;
		objectPosition?: string;
		overlay?: boolean;
	}

	let {
		src,
		alt,
		sizes,
		loading = 'lazy',
		class: className = '',
		parallax = false,
		aspect = 'auto',
		width,
		height,
		objectPosition,
		overlay = false
	}: Props = $props();

	let loaded = $state(false);

	const eager = $derived(loading === 'eager');

	const aspectClasses = {
		auto: '',
		video: 'aspect-video',
		square: 'aspect-square',
		portrait: 'aspect-[3/4]',
		landscape: 'aspect-[4/3]'
	};
</script>

{#if parallax}
	<div
		class="parallax-wrapper relative overflow-hidden {aspectClasses[aspect]} {className}"
		class:image-warm-overlay={overlay}
	>
		{#if !eager}
			<div class="image-skeleton absolute inset-0"></div>
		{/if}
		<img
			{src}
			{alt}
			{sizes}
			{loading}
			{width}
			{height}
			decoding={eager ? 'sync' : 'async'}
			onload={() => (loaded = true)}
			class="parallax-image relative z-10 block h-full w-full object-cover {eager
				? 'opacity-100'
				: 'transition-opacity duration-900 ' + (loaded ? 'opacity-100' : 'opacity-0')}"
			style={objectPosition ? `object-position: ${objectPosition};` : undefined}
		/>
	</div>
{:else if aspect !== 'auto' || overlay}
	<div class="relative {aspectClasses[aspect]} {className}" class:image-warm-overlay={overlay}>
		{#if !eager}
			<div class="image-skeleton absolute inset-0"></div>
		{/if}
		<img
			{src}
			{alt}
			{sizes}
			{loading}
			{width}
			{height}
			decoding={eager ? 'sync' : 'async'}
			onload={() => (loaded = true)}
			class="relative z-10 block h-full w-full object-cover {eager
				? 'opacity-100'
				: 'transition-opacity duration-900 ' + (loaded ? 'opacity-100' : 'opacity-0')}"
			style={objectPosition ? `object-position: ${objectPosition};` : undefined}
		/>
	</div>
{:else}
	<img
		{src}
		{alt}
		{sizes}
		{loading}
		{width}
		{height}
		decoding={eager ? 'sync' : 'async'}
		onload={() => (loaded = true)}
		class="block h-auto max-w-full object-cover {aspectClasses[aspect]} {eager
			? 'opacity-100'
			: 'transition-opacity duration-900 ' + (loaded ? 'opacity-100' : 'opacity-0')} {className}"
		style={objectPosition ? `object-position: ${objectPosition};` : undefined}
	/>
{/if}

<style>
	.image-warm-overlay {
		position: relative;
	}

	.image-warm-overlay::after {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 20;
		background: linear-gradient(
			to top,
			rgba(10, 10, 15, 0.65) 0%,
			rgba(90, 70, 54, 0.12) 50%,
			rgba(10, 10, 15, 0.35) 100%
		);
	}

	.image-skeleton {
		background: linear-gradient(
			90deg,
			rgba(245, 243, 239, 0.02) 0%,
			rgba(245, 243, 239, 0.07) 50%,
			rgba(245, 243, 239, 0.02) 100%
		);
		background-size: 200% 100%;
		animation: shimmer 1.6s infinite linear;
	}

	@keyframes shimmer {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}
</style>
