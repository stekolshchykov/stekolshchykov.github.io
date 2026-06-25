import { insights } from '$lib/data/insights';
import type { EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
	return insights.map((a) => ({ slug: a.slug, lang: 'en' }));
};
