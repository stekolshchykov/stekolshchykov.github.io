import type { Service } from '$lib/types/furniture';

const tbcImage = '/images/placeholders/needs-photo.svg';

export const services: Service[] = [
	{
		id: 'kitchens',
		title: 'Kitchens',
		description:
			'Fitted kitchens, islands, pantry storage, tall cabinetry and worktops planned around the room, the budget and daily use.',
		longDescription:
			'Kitchen cabinetry should feel architectural before it feels technical. We shape storage, surfaces and internal movement around the rhythm of the home, from quiet morning routines to rooms made for gathering.',
		features: ['Fitted kitchens', 'Islands', 'Pantry and larder storage', 'Tall storage', 'Worktops'],
		process: ['Brief', 'Site measure', 'Specification', 'Production', 'Delivery & installation'],
		deliverables: ['Layout direction', 'Finish specification', 'Internal storage brief', 'Installation coordination'],
		relatedMaterials: ['painted-fronts', 'wood-veneers', 'stone-worktops', 'hardware-systems'],
		gallery: [],
		image: {
			src: '/images/services/bespoke-kitchens.jpg',
			alt: 'Premium fitted kitchen with island, storage and calm architectural cabinetry'
		},
		category: 'residential'
	},
	{
		id: 'wardrobes-dressing-rooms',
		title: 'Wardrobes & Dressing Rooms',
		description:
			'Built-in wardrobes, dressing rooms, sliding or hinged doors and internal storage designed around proportion, order and calm.',
		longDescription:
			'Wardrobes should make a room quieter. We consider door rhythm, internal access, lighting, mirrors and storage zones so the cabinetry feels fitted to the way the room is used.',
		features: [
			'Built-in wardrobes',
			'Dressing rooms',
			'Sliding and hinged doors',
			'Internal storage',
			'Mirrors and lighting where specified'
		],
		process: ['Brief', 'Site measure', 'Specification', 'Production', 'Delivery & installation'],
		deliverables: ['Storage brief', 'Door and finish direction', 'Interior configuration', 'Installation coordination'],
		relatedMaterials: ['wood-veneers', 'painted-fronts', 'glass-mirrors', 'hardware-systems'],
		gallery: [],
		image: {
			src: '/images/generated/services/custom-wardrobes-luxury.webp',
			alt: 'Built-in wardrobe and dressing room cabinetry with warm lighting'
		},
		category: 'residential'
	},
	{
		id: 'bathroom-furniture',
		title: 'Bathroom Furniture',
		description:
			'Vanity units, bathroom storage, mirror cabinets and fitted bathroom pieces that make smaller rooms feel composed.',
		longDescription:
			'Bathroom furniture needs to feel precise without becoming clinical. We focus on storage, surface, reflection and moisture-aware detailing while keeping the room calm and desirable.',
		features: ['Vanity units', 'Bathroom storage', 'Mirror cabinets', 'Fitted bathroom pieces'],
		process: ['Brief', 'Site measure', 'Specification', 'Production', 'Delivery & installation'],
		deliverables: ['Bathroom storage plan', 'Finish direction', 'Mirror and surface notes', 'Installation coordination'],
		relatedMaterials: ['painted-fronts', 'stone-worktops', 'glass-mirrors', 'hardware-systems'],
		gallery: [],
		image: {
			src: tbcImage,
			alt: 'Photo to be supplied for premium fitted bathroom furniture'
		},
		category: 'residential'
	},
	{
		id: 'utility-laundry-rooms',
		title: 'Utility & Laundry Rooms',
		description:
			'Utility units, laundry storage, tall cabinets and practical fitted storage made calm, durable and easy to use.',
		longDescription:
			'The most practical rooms deserve the same visual discipline as the kitchen. We make storage legible, appliances integrated and daily tasks feel less exposed.',
		features: ['Utility units', 'Laundry storage', 'Tall cabinets', 'Practical fitted storage'],
		process: ['Brief', 'Site measure', 'Specification', 'Production', 'Delivery & installation'],
		deliverables: ['Utility storage plan', 'Appliance integration notes', 'Finish direction', 'Installation coordination'],
		relatedMaterials: ['painted-fronts', 'hardware-systems', 'stone-worktops'],
		gallery: [],
		image: {
			src: tbcImage,
			alt: 'Photo to be supplied for premium utility and laundry cabinetry'
		},
		category: 'residential'
	},
	{
		id: 'living-rooms-media-walls',
		title: 'Living Rooms & Media Walls',
		description:
			'Media walls, TV units, storage walls, shelving and wall panels that make technology and storage feel architectural.',
		longDescription:
			'Living cabinetry should settle into the room rather than dominate it. We use fitted storage, panels, shelving and media integration to create a quieter visual field.',
		features: ['Media walls', 'TV units', 'Storage walls', 'Shelving', 'Wall panels'],
		process: ['Brief', 'Site measure', 'Specification', 'Production', 'Delivery & installation'],
		deliverables: ['Elevation direction', 'Storage brief', 'Cable and equipment notes', 'Installation coordination'],
		relatedMaterials: ['wood-veneers', 'painted-fronts', 'hardware-systems'],
		gallery: [],
		image: {
			src: '/images/services/living-spaces.jpg',
			alt: 'Fitted living room storage and media wall cabinetry'
		},
		category: 'residential'
	},
	{
		id: 'hallway-built-in-storage',
		title: 'Hallway & Built-in Storage',
		description:
			'Entrance furniture, cloakroom storage, shoe storage and fitted hallway solutions that bring order before the room begins.',
		longDescription:
			'Entrances carry coats, shoes, keys, bags and first impressions. We turn those practical needs into fitted storage that feels intentional rather than improvised.',
		features: ['Hallway furniture', 'Cloakroom storage', 'Shoe storage', 'Fitted entrance solutions'],
		process: ['Brief', 'Site measure', 'Specification', 'Production', 'Delivery & installation'],
		deliverables: ['Entrance storage brief', 'Finish direction', 'Internal layout notes', 'Installation coordination'],
		relatedMaterials: ['painted-fronts', 'wood-veneers', 'hardware-systems'],
		gallery: [],
		image: {
			src: tbcImage,
			alt: 'Photo to be supplied for premium hallway and built-in storage'
		},
		category: 'residential'
	},
	{
		id: 'commercial-trade-packages',
		title: 'Commercial & Trade Packages',
		description:
			'Cabinetry packages for residential developments, offices, retail, hospitality, clinics and salons.',
		longDescription:
			'Trade and commercial work needs clear specification, consistent packages and calm coordination. We help turn drawings, plans or a brief into cabinetry that can be priced, produced and installed with confidence.',
		features: [
			'Residential developments',
			'Offices',
			'Retail',
			'Hospitality',
			'Clinics and salons'
		],
		process: ['Brief', 'Drawings review', 'Specification', 'Production', 'Delivery & installation'],
		deliverables: ['Cabinetry package brief', 'Finish direction', 'Project scale notes', 'Trade enquiry route'],
		relatedMaterials: ['painted-fronts', 'wood-veneers', 'stone-worktops', 'hardware-systems'],
		gallery: [],
		image: {
			src: tbcImage,
			alt: 'Photo to be supplied for commercial and trade cabinetry packages'
		},
		category: 'commercial'
	}
];
