import type { Project } from '$lib/types/furniture';

const tbcImage = '/images/placeholders/needs-photo.svg';

export const projects: Project[] = [
	{
		slug: 'kitchen-example',
		title: 'Kitchen Example',
		category: 'residential',
		location: 'Cabinetry example',
		description: 'Warm materials, clean lines and fitted storage shaped around the room.',
		overview:
			'A cabinetry example showing how a kitchen can combine calm lines, generous storage and surfaces chosen to set the mood of the home.',
		challenge: 'Photo set and final project details are TBC.',
		solution: 'Use as a visual example only until approved imagery and project information are supplied.',
		specs: {
			client: 'Example imagery TBC',
			location: 'Ireland',
			category: 'residential',
			scope: 'kitchen',
			materials: 'Painted fronts, warm finishes and worktop surfaces',
			finishes: 'TBC',
			hardware: 'TBC',
			timeline: 'TBC',
			year: 2026
		},
		media: {
			hero: {
				src: '/images/services/bespoke-kitchens.jpg',
				alt: 'Kitchen cabinetry example with warm materials and fitted storage'
			},
			gallery: []
		},
		featured: true,
		tags: ['Kitchen', 'Fitted Cabinetry', 'Storage']
	},
	{
		slug: 'wardrobe-example',
		title: 'Wardrobe Example',
		category: 'residential',
		location: 'Cabinetry example',
		description: 'Built-in storage designed around proportion, order and calm.',
		overview:
			'A cabinetry example for wardrobes and dressing rooms, focused on proportion, internal order and a quieter bedroom or dressing space.',
		challenge: 'Photo set and final project details are TBC.',
		solution: 'Use as a visual example only until approved imagery and project information are supplied.',
		specs: {
			client: 'Example imagery TBC',
			location: 'Ireland',
			category: 'residential',
			scope: 'wardrobe',
			materials: 'Wood veneers, painted fronts, mirrors and internal systems',
			finishes: 'TBC',
			hardware: 'TBC',
			timeline: 'TBC',
			year: 2026
		},
		media: {
			hero: {
				src: '/images/generated/services/custom-wardrobes-luxury.webp',
				alt: 'Wardrobe cabinetry example with integrated fitted storage'
			},
			gallery: []
		},
		featured: true,
		tags: ['Wardrobe', 'Dressing Room', 'Internal Storage']
	},
	{
		slug: 'fitted-furniture-example',
		title: 'Fitted Furniture Example',
		category: 'residential',
		location: 'Cabinetry example',
		description: 'Bathroom, utility and living spaces with considered fitted pieces.',
		overview:
			'A cabinetry example for fitted pieces beyond kitchens and wardrobes, including bathroom furniture, utility storage, living room units and built-in details.',
		challenge: 'Photo set and final project details are TBC.',
		solution: 'Use as a visual example only until approved imagery and project information are supplied.',
		specs: {
			client: 'Example imagery TBC',
			location: 'Ireland',
			category: 'residential',
			scope: 'living-space',
			materials: 'Painted fronts, veneers, worktops and integrated details',
			finishes: 'TBC',
			hardware: 'TBC',
			timeline: 'TBC',
			year: 2026
		},
		media: {
			hero: {
				src: tbcImage,
				alt: 'Photo to be supplied for fitted furniture cabinetry example'
			},
			gallery: []
		},
		featured: true,
		tags: ['Fitted Furniture', 'Bathroom', 'Utility', 'Living Room']
	},
	{
		slug: 'commercial-cabinetry-example',
		title: 'Commercial Cabinetry Example',
		category: 'commercial',
		location: 'Cabinetry example',
		description: 'Cabinetry for offices, shared spaces and professional interiors.',
		overview:
			'A cabinetry example for trade and commercial spaces, including residential developments, offices, retail, hospitality and specialist rooms.',
		challenge: 'Photo set and final project details are TBC.',
		solution: 'Use as a visual example only until approved imagery and project information are supplied.',
		specs: {
			client: 'Example imagery TBC',
			location: 'Ireland',
			category: 'commercial',
			scope: 'office-fit-out',
			materials: 'Durable cabinetry finishes, storage systems and commercial details',
			finishes: 'TBC',
			hardware: 'TBC',
			timeline: 'TBC',
			year: 2026
		},
		media: {
			hero: {
				src: tbcImage,
				alt: 'Photo to be supplied for commercial cabinetry example'
			},
			gallery: []
		},
		featured: true,
		tags: ['Commercial', 'Trade', 'Developments', 'Professional Interiors']
	}
];
