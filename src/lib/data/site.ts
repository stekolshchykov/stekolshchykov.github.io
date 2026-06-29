import { env } from '$env/dynamic/public';
import type { SiteConfig, WhyUsItem } from '$lib/types/furniture';

const siteUrl = env.PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://arasliving.ie';

export const site: SiteConfig = {
	brand: 'Áras Living',
	tagline: 'Fitted cabinetry for Irish homes and commercial spaces.',
	subTagline: 'Designed with precision and managed from brief to installation.',
	ctaLabel: 'Discuss a Project',
	footerCta: 'Begin your project.',
	companyLegalName: 'Legal company name TBC',
	address: '',
	email: 'arasliving26@gmail.com',
	phone: '',
	whatsapp: '',
	businessHours: {
		monday: '09:00 – 17:30',
		tuesday: '09:00 – 17:30',
		wednesday: '09:00 – 17:30',
		thursday: '09:00 – 17:30',
		friday: '09:00 – 17:30',
		saturday: 'By appointment',
		sunday: 'Closed'
	},
	social: [],
	seo: {
		titleTemplate: '%s — Áras Living',
		defaultTitle: 'Áras Living — Fitted Cabinetry for Irish Homes and Commercial Spaces',
		defaultDescription:
			'Fitted cabinetry, kitchens, wardrobes and furniture packages for private homes, trade professionals and residential developments across Ireland.',
		defaultImage: '/og-default.jpg',
		siteUrl,
		twitterHandle: ''
	}
};

export const whyUsItems: WhyUsItem[] = [
	{
		id: 'bespoke-design',
		title: 'Site Measure in Ireland',
		description:
			'Rooms are measured carefully before specification, so cabinetry can be shaped around real walls, light and movement.',
		icon: 'ruler'
	},
	{
		id: 'clear-specification',
		title: 'Clear Specification',
		description:
			'Layouts, finishes, internal storage and hardware are clarified before production begins.',
		icon: 'clipboard-list'
	},
	{
		id: 'premium-materials',
		title: 'Materials with Mood',
		description:
			'Painted fronts, warm wood finishes, worktops, glass and hardware are chosen for how the room should feel.',
		icon: 'gem'
	},
	{
		id: 'coordinated-install',
		title: 'Coordinated Installation',
		description:
			'Delivery and installation are coordinated in Ireland through the Áras Living team and trusted local fitters.',
		icon: 'square-check'
	},
	{
		id: 'across-ireland',
		title: 'Across Ireland',
		description:
			'Private homes, commercial interiors and residential developments can be discussed across Ireland.',
		icon: 'sparkles'
	},
	{
		id: 'export-ready-production',
		title: 'Export-Ready Production',
		description:
			'Cabinetry packages are prepared from approved specifications so the process stays controlled and legible.',
		icon: 'hammer'
	}
];
