<script lang="ts">
	import type { MediaItem } from '$lib/types/furniture';
	import { X, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { cx } from '$lib/utils/helpers';

	interface Props {
		images: MediaItem[];
		open: boolean;
		startIndex?: number;
		onclose: () => void;
	}

	let { images, open, startIndex = 0, onclose }: Props = $props();
	let index = $state(0);

	$effect(() => {
		if (open) {
			index = Math.max(0, Math.min(startIndex, images.length - 1));
		}
	});

	function next() {
		index = (index + 1) % images.length;
	}

	function prev() {
		index = (index - 1 + images.length) % images.length;
	}

	$effect(() => {
		if (!open) return;

		function onKeyDown(event: KeyboardEvent) {
			if (event.key === 'Escape') onclose();
			if (event.key === 'ArrowRight') next();
			if (event.key === 'ArrowLeft') prev();
		}

		window.addEventListener('keydown', onKeyDown);
		document.body.style.overflow = 'hidden';

		return () => {
			window.removeEventListener('keydown', onKeyDown);
			document.body.style.overflow = '';
		};
	});

	function onBackdropClick(event: MouseEvent) {
		if (event.currentTarget === event.target) {
			onclose();
		}
	}

	function onBackdropKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') onclose();
		if (event.key === 'ArrowRight') next();
		if (event.key === 'ArrowLeft') prev();
	}
</script>

{#if open && images.length}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary/95 backdrop-blur-sm"
		role="dialog"
		aria-modal="true"
		aria-label="Image gallery"
		tabindex="-1"
		onclick={onBackdropClick}
		onkeydown={onBackdropKeyDown}
	>
		<button
			type="button"
			onclick={onclose}
			class="absolute right-4 top-4 flex h-12 w-12 items-center justify-center text-text-primary transition-colors hover:text-accent"
			aria-label="Close gallery"
		>
			<X size={28} />
		</button>

		<button
			type="button"
			onclick={(e) => {
				e.stopPropagation();
				prev();
			}}
			class="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-bg-secondary/80 text-text-primary backdrop-blur-sm transition-colors hover:text-accent"
			aria-label="Previous image"
		>
			<ChevronLeft size={28} />
		</button>

		<img
			src={images[index].src}
			alt={images[index].alt}
			class="max-h-[85vh] max-w-[90vw] object-contain"
		/>

		<button
			type="button"
			onclick={(e) => {
				e.stopPropagation();
				next();
			}}
			class="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-bg-secondary/80 text-text-primary backdrop-blur-sm transition-colors hover:text-accent"
			aria-label="Next image"
		>
			<ChevronRight size={28} />
		</button>

		<p class="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-sm text-text-secondary">
			{index + 1} / {images.length}
		</p>
	</div>
{/if}
