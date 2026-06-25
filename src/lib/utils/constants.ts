import { env } from '$env/dynamic/public';
import { site } from '$lib/data/site';

export const SUPPORTED_LOCALES = ['en', 'fr', 'de', 'es', 'pl'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: SupportedLocale = 'en';

export const FILTER_CATEGORIES = [
	{ value: 'all', labelKey: 'projects.filter_all' },
	{ value: 'residential', labelKey: 'projects.filter_residential' },
	{ value: 'commercial', labelKey: 'projects.filter_commercial' }
] as const;

export const PROJECTS_PER_PAGE = 6;

export const SOCIAL_LINKS = site.social;

export const SITE_URL = env.PUBLIC_SITE_URL || site.seo.siteUrl;
export const WHATSAPP_NUMBER = env.PUBLIC_WHATSAPP_NUMBER || sanitizePhone(site.whatsapp);
export const GA4_ID = env.PUBLIC_GA4_ID || '';
export const FORMSPREE_ID = env.PUBLIC_FORMSPREE_ID || '';
export const META_PIXEL_ID = env.PUBLIC_META_PIXEL_ID || '';
export const MAPS_EMBED_URL = env.PUBLIC_MAPS_EMBED_URL || '';

function sanitizePhone(phone: string): string {
	return phone.replace(/\D/g, '');
}
