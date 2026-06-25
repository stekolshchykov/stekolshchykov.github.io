export type SeoPageType = 'website' | 'article' | 'product' | 'creativeWork';

export interface SeoProps {
	title: string;
	description: string;
	image?: string;
	canonical?: string;
	type?: SeoPageType;
	noindex?: boolean;
	nofollow?: boolean;
	publishedAt?: string;
	modifiedAt?: string;
	author?: string;
	keywords?: string[];
}

export interface BreadcrumbItem {
	name: string;
	url: string;
}

export interface StructuredDataOrganization {
	'@context': string;
	'@type': 'Organization';
	name: string;
	url: string;
	logo: string;
	email: string;
	telephone: string;
	address: {
		'@type': 'PostalAddress';
		addressLocality: string;
		addressCountry: string;
	};
	sameAs?: string[];
}

export interface StructuredDataWebSite {
	'@context': string;
	'@type': 'WebSite';
	url: string;
	name: string;
	potentialAction?: {
		'@type': 'SearchAction';
		target: string;
		'query-input': string;
	};
}
