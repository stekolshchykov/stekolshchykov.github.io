const imageModules = import.meta.glob('/static/images/**/*.{jpg,jpeg,png,webp,gif}', {
	eager: true,
	import: 'default'
});

const availablePaths = new Set(Object.keys(imageModules).map((key) => key.replace('/static', '')));

/**
 * Returns `src` if the file exists in the static image directory,
 * otherwise returns a known fallback image so pages render and build pass.
 */
export function imageWithFallback(
	src: string | undefined,
	fallback = '/images/hero-poster.jpg'
): string {
	if (!src) return fallback;
	return availablePaths.has(src) ? src : fallback;
}

/**
 * Returns `src` only if it exists; useful when a missing image should be omitted entirely.
 */
export function imageIfExists(src: string | undefined): string | undefined {
	if (!src) return undefined;
	return availablePaths.has(src) ? src : undefined;
}
