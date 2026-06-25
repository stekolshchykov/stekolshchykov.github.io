import { materialsDetailed } from '$lib/data/materialsDetailed';
import type { EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
	return materialsDetailed.map((m) => ({ slug: m.id, lang: 'en' }));
};
