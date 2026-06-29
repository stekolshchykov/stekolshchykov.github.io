import type { FAQItem } from '$lib/types/furniture';

export const faqItems: FAQItem[] = [
	{
		id: 'timeline',
		category: 'process',
		question: 'How long does a project take?',
		answer:
			'Timelines are confirmed after brief, site measure and specification. As a guide, many projects move from approved specification to installation within approximately 10-12 weeks, depending on scope and production schedule.'
	},
	{
		id: 'design-specification',
		category: 'process',
		question: 'Can you work from existing drawings?',
		answer:
			'We can work from existing drawings or help develop the layout, finishes and production specification, depending on the project.'
	},
	{
		id: 'delivery-installation',
		category: 'installation',
		question: 'How are delivery and installation handled?',
		answer:
			'We coordinate delivery and installation in Ireland through our own team and trusted local fitters.'
	},
	{
		id: 'pricing',
		category: 'pricing',
		question: 'How is pricing confirmed?',
		answer:
			'Every project is specified around the brief, space and budget. Materials, hardware, finishes and installation requirements all affect the final cost, so we confirm pricing after the initial brief and specification rather than using a standard price list.'
	},
	{
		id: 'materials',
		category: 'materials',
		question: 'Can I choose materials and internal storage together?',
		answer:
			'Yes. Materials, fronts, worktops, hardware, internal storage, lighting and small details are considered together so the cabinetry feels coherent in daily use.'
	},
	{
		id: 'trade',
		category: 'trade',
		question: 'Do you work with trade professionals and developers?',
		answer:
			'Yes. Trade enquiries can start from drawings, plans or a brief. We help turn them into a clear cabinetry specification for residential developments, offices, retail, hospitality and specialist spaces.'
	}
];
