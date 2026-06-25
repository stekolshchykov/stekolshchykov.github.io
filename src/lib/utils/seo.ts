import { site } from '$lib/data/site';
import type { SeoPageType, SeoProps } from '$lib/types/seo';

export interface CreateSeoOptions {
	title?: string;
	description?: string;
	image?: string;
	path?: string;
	type?: SeoPageType;
	noindex?: boolean;
	nofollow?: boolean;
	publishedAt?: string;
	modifiedAt?: string;
	author?: string;
	keywords?: string[];
}

export function createSeo(options: CreateSeoOptions = {}): SeoProps {
	const title = options.title
		? site.seo.titleTemplate.replace('%s', options.title)
		: site.seo.defaultTitle;

	const description = options.description ?? site.seo.defaultDescription;

	const baseImage = options.image ?? site.seo.defaultImage;
	const image = baseImage.startsWith('http') ? baseImage : `${site.seo.siteUrl}${baseImage}`;

	const canonical = options.path ? `${site.seo.siteUrl}${options.path}` : site.seo.siteUrl;

	return {
		title,
		description,
		image,
		canonical,
		type: options.type ?? 'website',
		noindex: options.noindex,
		nofollow: options.nofollow,
		publishedAt: options.publishedAt,
		modifiedAt: options.modifiedAt,
		author: options.author,
		keywords: options.keywords
	};
}
