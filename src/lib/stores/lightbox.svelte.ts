import type { MediaItem } from '$lib/types/furniture';

function createLightbox() {
	let open = $state(false);
	let index = $state(0);
	let images = $state<MediaItem[]>([]);

	function setImages(items: MediaItem[]) {
		images = items;
	}

	function openAt(position = 0) {
		index = images.length ? Math.max(0, Math.min(position, images.length - 1)) : 0;
		open = true;
	}

	function close() {
		open = false;
	}

	function next() {
		if (!images.length) return;
		index = (index + 1) % images.length;
	}

	function prev() {
		if (!images.length) return;
		index = (index - 1 + images.length) % images.length;
	}

	return {
		get isOpen() {
			return open;
		},
		get index() {
			return index;
		},
		get images() {
			return images;
		},
		get current() {
			return images[index];
		},
		setImages,
		open: openAt,
		close,
		next,
		prev
	};
}

export const lightbox = createLightbox();
