import type { ProcessStep } from '$lib/types/furniture';

export const processSteps: ProcessStep[] = [
	{
		number: 1,
		title: 'Brief',
		description:
			'Send an idea, plans, photographs or a short description. We clarify the room, the budget, the mood and the next step.'
	},
	{
		number: 2,
		title: 'Site Measure',
		description:
			'Measurements in Ireland are handled by the Áras Living team so the specification can respond to the real space.'
	},
	{
		number: 3,
		title: 'Specification',
		description:
			'Layouts, finishes, materials, internal systems and production details are shaped into a clear cabinetry package.'
	},
	{
		number: 4,
		title: 'Production',
		description:
			'Cabinetry is produced from the approved specification, with details prepared for delivery and installation.'
	},
	{
		number: 5,
		title: 'Delivery & Installation',
		description:
			'Delivery and installation are coordinated in Ireland through our team and trusted local fitters.'
	}
];
