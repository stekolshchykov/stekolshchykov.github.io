import type { ProcessMoment } from '$lib/types/furniture';

export const processMoments: ProcessMoment[] = [
	{
		id: 'discovery',
		number: 1,
		title: 'Discovery',
		subtitle: 'Understanding how you live and what you need.',
		description:
			'Every project begins with a conversation. We listen to the way a room is used, the objects it must hold, and the atmosphere you want to live inside.',
		paragraphs: [
			'This first meeting can take place at your home, at our showroom, or by video call. We ask about routines, storage habits, existing architecture, and any pieces or materials you have already fallen for. Nothing is assumed.',
			'By the end of discovery, we have a written brief, an initial sense of budget, and a shared understanding of what success looks like.'
		],
		craftNote: 'The best furniture is shaped by the small details of daily life.',
		image: {
			src: '/images/process/discovery.webp',
			alt: 'Design consultation with material samples and drawings'
		},
		duration: '1–2 weeks'
	},
	{
		id: 'site-survey',
		number: 2,
		title: 'Site Survey',
		subtitle: 'Measuring the space as it truly is.',
		description:
			'Rooms are rarely straight, level, or square. We survey every surface, outlet, and opening so the design fits the reality of the site.',
		paragraphs: [
			'Our team takes detailed measurements, photographs, and notes on services, access, and finishes. In complex spaces, we work with a surveyor to produce accurate drawings.',
			'These measurements become the foundation of the design. They prevent surprises later and ensure every unit arrives ready to fit.'
		],
		craftNote: 'We measure twice so the workshop only cuts once.',
		image: {
			src: '/images/process/site-survey.webp',
			alt: 'Craftsman measuring a room with laser tools'
		},
		duration: '1 week'
	},
	{
		id: 'concept-design',
		number: 3,
		title: 'Concept Design',
		subtitle: 'Drawings, samples, and the first glimpse of the finished room.',
		description:
			'We translate the brief into scale drawings, mood material, and 3D visuals that let you see proportion, material, and light before anything is built.',
		paragraphs: [
			'Concepts are presented as a coherent package: plan drawings, elevations, sample boards, and rendered views. We revise until the design feels right in both form and function.',
			'This is also when we confirm material selections, hardware, and finishes, locking the palette that will guide the rest of the project.'
		],
		craftNote: 'A good drawing answers questions before they become expensive problems.',
		image: {
			src: '/images/process/concept-design.webp',
			alt: 'Design drawings and material sample board'
		},
		duration: '2–3 weeks'
	},
	{
		id: 'material-selection',
		number: 4,
		title: 'Material Selection',
		subtitle: 'Choosing surfaces that will age beautifully.',
		description:
			'Materials are chosen for how they feel, wear, and respond to light. We bring samples into the actual space so decisions are made in context.',
		paragraphs: [
			"Clients handle timber swatches, stone offcuts, hardware, and leather under the room's own light. We discuss maintenance, sustainability, and how each material will settle over time.",
			'Once approved, materials are ordered and booked into production. Lead times for special items are confirmed at this stage.'
		],
		craftNote: 'Timber looks different at nine in the morning and six in the evening.',
		image: {
			src: '/images/process/material-selection.webp',
			alt: 'Material samples laid out on a studio table'
		},
		duration: '1–2 weeks'
	},
	{
		id: 'technical-drawings',
		number: 5,
		title: 'Technical Drawings',
		subtitle: 'Every joint, cut-out, and fixing defined.',
		description:
			'Technical drawings convert the design into precise instructions for the workshop and installation team.',
		paragraphs: [
			'We produce cutting lists, CNC files, joinery details, and installation packs. Each component is labelled, sequenced, and checked against the site survey.',
			'Clients receive a final sign-off pack before production begins. Any last adjustments are made now, because after this point, changes carry significant cost.'
		],
		craftNote: 'The drawing is the conversation between designer and maker.',
		image: {
			src: '/images/process/technical-drawings.webp',
			alt: 'Detailed technical workshop drawings'
		},
		duration: '1–2 weeks'
	},
	{
		id: 'workshop-craft',
		number: 6,
		title: 'Workshop Craft',
		subtitle: 'Where drawings become objects.',
		description:
			'In our Dublin workshop, components are machined, assembled, and finished by hand. This is the longest and quietest phase of the project.',
		paragraphs: [
			'Solid timber is selected for grain and colour, veneer leaves are sequenced, and panels are pressed. Joints are cut, clamped, and left to settle before final assembly.',
			'Finishing is done in controlled conditions: sprayed, hand-flatted, oiled, or waxed depending on the material. Every surface is inspected before it leaves the workshop.'
		],
		craftNote: 'Patience in the workshop saves time on site.',
		image: {
			src: '/images/process/workshop-craft.webp',
			alt: 'Craftsman assembling timber components in a workshop'
		},
		duration: '4–10 weeks'
	},
	{
		id: 'finishing',
		number: 7,
		title: 'Finishing',
		subtitle: 'The surface that will be touched every day.',
		description:
			'A finish is not just colour; it is protection, texture, and the way a material catches morning light.',
		paragraphs: [
			'We apply oils, lacquers, waxes, and stains in thin, even coats, allowing proper curing between each one. Final inspection happens under daylight and studio lighting.',
			'Hardware is fitted, drawers are tuned, and doors are adjusted. Only then is the piece wrapped and scheduled for delivery.'
		],
		craftNote: 'The finish is the first thing people touch and the last thing we apply.',
		image: {
			src: '/images/process/finishing.webp',
			alt: 'Hand-applying oil finish to a timber surface'
		},
		duration: '1–2 weeks'
	},
	{
		id: 'installation-care',
		number: 8,
		title: 'Installation & Care',
		subtitle: 'Placing every piece exactly where it belongs.',
		description:
			'Our installers treat your home with the same care as the workshop. Pieces are positioned, levelled, scribed, and adjusted until everything sits perfectly.',
		paragraphs: [
			'We protect floors and furnishings during installation, remove packaging, and leave the space clean. Every door, drawer, and hinge is tested in front of you.',
			'After handover, we provide care guidance and remain available for any adjustments. Most clients receive a follow-up visit after the first season has passed.'
		],
		craftNote: 'Installation is the final craft moment.',
		image: {
			src: '/images/process/installation-care.webp',
			alt: 'Installer fitting a cabinet into a finished room'
		},
		duration: '1–5 days'
	}
];
