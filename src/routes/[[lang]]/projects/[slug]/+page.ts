import { projects } from '$lib/data/projects';
import type { EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
	return projects.map((p) => ({ slug: p.slug, lang: 'en' }));
};
