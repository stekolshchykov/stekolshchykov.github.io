import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: true,
			strict: true
		}),
		prerender: {
			entries: ['*'],
			crawl: true,
			handleHttpError: ({ path, message }) => {
				if (/\.(mp4|webm|jpg|jpeg|png|webp|svg|gif|ico|woff2?)$/i.test(path)) {
					console.warn(`Ignoring missing asset during prerender: ${path}`);
					return;
				}
				throw new Error(message);
			}
		}
	}
};

export default config;
