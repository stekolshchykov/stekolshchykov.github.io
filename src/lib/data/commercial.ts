import type { CommercialPageData } from '$lib/types/furniture';

export const commercialData: CommercialPageData = {
	sectors: [
		{
			id: 'offices',
			title: 'Workplaces',
			description:
				'Reception desks, boardroom tables, breakout kitchens, and storage that signal quality before anyone sits down. Built for daily use and frequent reconfiguration.',
			image: {
				src: '/images/commercial/offices.webp',
				alt: 'Reception desk and boardroom joinery in a contemporary office'
			}
		},
		{
			id: 'retail',
			title: 'Retail Spaces',
			description:
				'Display shelving, counters, fitting rooms, and seasonal fixtures designed to let merchandise take centre stage.',
			image: {
				src: '/images/commercial/retail.webp',
				alt: 'Boutique interior with bespoke oak display shelving'
			}
		},
		{
			id: 'hospitality',
			title: 'Hotels & Restaurants',
			description:
				'Bars, banquettes, reception desks, and guest-room joinery that withstand high traffic without losing warmth or character.',
			image: {
				src: '/images/commercial/hospitality.webp',
				alt: 'Hotel lobby with walnut reception desk and lounge seating'
			}
		},
		{
			id: 'developments',
			title: 'Developments',
			description:
				'Fitted kitchens, wardrobes, and joinery packages for premium residential and mixed-use schemes, delivered on programme and to consistent standards.',
			image: {
				src: '/images/commercial/developments.webp',
				alt: 'Fitted kitchen in a premium residential development'
			}
		}
	],
	caseStudies: [
		{
			id: 'dublin-office-fitout',
			client: 'Creative Agency',
			sector: 'Workplaces',
			location: 'Dublin 1',
			scope:
				'Reception desk, ash wall panelling, fourteen-seat boardroom table with integrated power, and breakout kitchen with Fenix worktops.',
			outcome:
				"A calm, confident headquarters that reflected the agency's creative identity while solving acoustic and cable-management issues in a single joinery package.",
			image: {
				src: '/images/projects/dublin-office-fitout/hero.jpg',
				alt: 'Creative agency reception and boardroom'
			}
		},
		{
			id: 'shelbourne-fittings',
			client: 'Luxury Hotel Group',
			sector: 'Hotels & Restaurants',
			location: 'Dublin 2',
			scope:
				'Walnut reception desk with brass inlay, leather-wrapped counter, and lounge seating with velvet upholstery.',
			outcome:
				'A residential feel in a five-star commercial setting, installed in overnight windows while the hotel remained fully operational.',
			image: {
				src: '/images/projects/shelbourne-fittings/hero.jpg',
				alt: 'Hotel lobby reception and lounge seating'
			}
		},
		{
			id: 'dalkey-retail-interior',
			client: 'Independent Boutique',
			sector: 'Retail Spaces',
			location: 'Dalkey, Co. Dublin',
			scope:
				'Adjustable oak display shelving with brass rods, micro-cement-topped counter, and full-height mirrored fitting-room doors.',
			outcome:
				'A narrow village shop transformed into a flexible, curated retail environment that adapts easily to seasonal displays.',
			image: {
				src: '/images/projects/dalkey-retail-interior/hero.jpg',
				alt: 'Boutique interior with bespoke display joinery'
			}
		}
	],
	b2bDifferences: [
		'Dedicated account manager and single point of contact throughout the project',
		'Programme alignment with contractors, architects, and site managers',
		'Fire-retardant, durability, and accessibility certifications specified where required',
		'Bulk and repeat-order pricing for development and multi-site clients',
		'Out-of-hours installation to minimise disruption to trading operations',
		'Detailed handover packs and aftercare support for facilities teams'
	],
	formFields: [
		'Company name',
		'Sector',
		'Project location',
		'Approximate budget range',
		'Required programme or opening date',
		'Scope of joinery required',
		'Sustainability or certification requirements',
		'Architect or contractor details'
	]
};
