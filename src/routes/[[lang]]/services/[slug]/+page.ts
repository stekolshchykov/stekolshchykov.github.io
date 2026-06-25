import { services } from '$lib/data/services';
import type { EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
	return services.map((s) => ({ slug: s.id, lang: 'en' }));
};
