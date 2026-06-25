import { env } from '$env/dynamic/public';
import type { SiteConfig, WhyUsItem } from '$lib/types/furniture';

const siteUrl = env.PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://arasliving.ie';

export const site: SiteConfig = {
	brand: 'Áras Living',
	tagline: 'Furniture, measured in millimetres.',
	subTagline: 'Bespoke wardrobes, kitchens, and interior joinery from our Dublin workshop.',
	ctaLabel: 'Discuss a Project',
	footerCta: 'Begin your project.',
	companyLegalName: 'Áras Living Furniture & Interiors Ltd',
	address: 'Unit 4, Grand Canal Street Lower, Dublin 2, D02 A342, Ireland',
	email: 'hello@arasliving.ie',
	phone: '+353 1 234 5678',
	whatsapp: '+353 1 234 5678',
	businessHours: {
		monday: '09:00 – 17:30',
		tuesday: '09:00 – 17:30',
		wednesday: '09:00 – 17:30',
		thursday: '09:00 – 17:30',
		friday: '09:00 – 17:30',
		saturday: 'By appointment',
		sunday: 'Closed'
	},
	social: [
		{
			platform: 'Instagram',
			url: 'https://instagram.com/arasliving',
			handle: '@arasliving'
		},
		{
			platform: 'Pinterest',
			url: 'https://pinterest.com/arasliving',
			handle: '@arasliving'
		},
		{
			platform: 'LinkedIn',
			url: 'https://linkedin.com/company/aras-living',
			handle: 'Áras Living'
		}
	],
	seo: {
		titleTemplate: '%s — Áras Living',
		defaultTitle: 'Áras Living — Bespoke Furniture & Interiors, Dublin',
		defaultDescription:
			'Wardrobes, kitchens, and interior joinery designed around Irish homes and built in our Dublin workshop.',
		defaultImage: '/og-default.jpg',
		siteUrl,
		twitterHandle: '@arasliving'
	}
};

export const whyUsItems: WhyUsItem[] = [
	{
		id: 'bespoke-design',
		title: 'Made to Measure',
		description:
			'Every piece is drawn around your room, your habits, and the light. No standard sizes. No concessions.',
		icon: 'ruler'
	},
	{
		id: 'irish-craft',
		title: 'Dublin Workshop',
		description:
			'Built in our Dublin workshop by makers who understand timber, tolerance, and the weight of a well-made joint.',
		icon: 'hammer'
	},
	{
		id: 'premium-materials',
		title: 'Materials First',
		description:
			'Solid hardwoods, curated veneers, and European hardware chosen for how they age, not just how they look.',
		icon: 'gem'
	},
	{
		id: 'full-service',
		title: 'One Studio',
		description:
			'From first drawing to final installation, the same team designs, builds, and sets every piece in place.',
		icon: 'clipboard-list'
	},
	{
		id: 'quiet-luxury',
		title: 'Quiet Luxury',
		description:
			'Understated detailing, refined proportions, and finishes that settle into a room over decades.',
		icon: 'sparkles'
	},
	{
		id: 'guaranteed-fit',
		title: 'Precision Fit',
		description:
			'Site surveys and meticulous templating ensure every unit sits exactly — even in rooms that refuse straight lines.',
		icon: 'square-check'
	}
];
