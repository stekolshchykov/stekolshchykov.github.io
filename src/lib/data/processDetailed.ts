import type { ProcessMoment } from '$lib/types/furniture';

export const processMoments: ProcessMoment[] = [
	{
		id: 'brief',
		number: 1,
		title: 'Brief',
		subtitle: 'Start with the room, the drawings or the idea.',
		description:
			'You can send plans, photographs, a mood, a problem area or a short description. We clarify what the cabinetry needs to do and how the space should feel.',
		paragraphs: [
			'The first step is deliberately simple: understand the room, the people using it, the storage needs, the budget direction and the desired atmosphere.',
			'For trade projects, drawings, unit counts, schedules or moodboards can be used to shape the initial cabinetry package.'
		],
		craftNote: 'A clear brief protects the design from becoming a catalogue of parts.',
		image: {
			src: '/images/process/discovery.webp',
			alt: 'Cabinetry brief with plans, materials and room notes'
		},
		duration: 'First step'
	},
	{
		id: 'site-measure',
		number: 2,
		title: 'Site Measure',
		subtitle: 'Measured in Ireland before specification is finalised.',
		description:
			'Measurements are handled by the Áras Living team so the specification can respond to real walls, ceiling lines, services and access.',
		paragraphs: [
			'Site measure gives the design a reliable foundation. It helps avoid assumptions about room dimensions, awkward corners and installation constraints.',
			'For larger or trade packages, existing drawings can be reviewed first and then refined into a practical specification route.'
		],
		craftNote: 'The room decides the proportions.',
		image: {
			src: '/images/process/site-survey.webp',
			alt: 'Site measure for fitted cabinetry in Ireland'
		},
		duration: 'After brief'
	},
	{
		id: 'specification',
		number: 3,
		title: 'Specification',
		subtitle: 'Layout, finishes, internal systems and production details.',
		description:
			'We can work from existing drawings or help develop the layout, finishes, materials, hardware and production specification, depending on the project.',
		paragraphs: [
			'This is where desire becomes clear: painted fronts, warm finishes, worktops, glass, mirrors, internal storage, hardware and lighting are brought into one coherent direction.',
			'The specification should be precise enough to price and produce, but still focused on how the finished room will feel.'
		],
		craftNote: 'Choose the feeling first. The finish follows.',
		image: {
			src: '/images/process/material-selection.webp',
			alt: 'Material and internal solution specification for fitted cabinetry'
		},
		duration: 'Specification stage'
	},
	{
		id: 'production',
		number: 4,
		title: 'Production',
		subtitle: 'Cabinetry produced from the approved specification.',
		description:
			'Once the specification is approved, the cabinetry package is prepared for production with the details needed for delivery and installation.',
		paragraphs: [
			'The important promise for launch is clarity: a controlled specification and a managed route from brief to installation.',
			'Any manufacturer-specific statistics, warranty language or production claims remain off-site until confirmed.'
		],
		craftNote: 'Clarity before production keeps the result calm.',
		image: {
			src: '/images/placeholders/needs-photo.svg',
			alt: 'Approved production image to be supplied'
		},
		duration: 'After approval'
	},
	{
		id: 'delivery-installation',
		number: 5,
		title: 'Delivery & Installation',
		subtitle: 'Coordinated in Ireland.',
		description:
			'Delivery and installation are coordinated in Ireland through our own team and trusted local fitters.',
		paragraphs: [
			'The final stage is planned around access, sequence and the condition of the space. The goal is a measured installation route rather than a rushed handover.',
			'After installation, the client should understand how to use and care for the cabinetry and who to contact with questions.'
		],
		craftNote: 'The final impression is built from small, quiet decisions.',
		image: {
			src: '/images/process/installation-care.webp',
			alt: 'Coordinated cabinetry installation in Ireland'
		},
		duration: 'Final stage'
	}
];
