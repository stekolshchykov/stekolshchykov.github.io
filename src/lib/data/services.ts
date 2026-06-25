import type { Service } from '$lib/types/furniture';

export const services: Service[] = [
	// Residential
	{
		id: 'custom-wardrobes',
		title: 'Wardrobes & Dressing Rooms',
		description:
			'Fitted wardrobes designed around the architecture of your room and the rhythm of your day.',
		longDescription:
			'Our wardrobes are drawn around alcoves, ceiling lines, and awkward corners that off-the-shelf furniture cannot reach. Every hanging rail, drawer, and shelf is positioned for the garments and routines you actually have.',
		features: [
			'Fitted designs that follow ceiling lines and alcoves',
			'Hinged, sliding, or flush door options',
			'Integrated lighting and tailored interiors'
		],
		process: [
			'In-home consultation and measurement',
			'Concept drawings and 3D visuals',
			'Material and hardware selection',
			'Workshop fabrication',
			'Installation and final adjustment'
		],
		deliverables: [
			'Scale drawings and renders',
			'Fitted wardrobe carcasses and doors',
			'Internal hardware and lighting',
			'Care and maintenance guide'
		],
		relatedMaterials: [
			'european-oak',
			'american-walnut',
			'crown-walnut-veneer',
			'satin-lacquer',
			'aged-brass'
		],
		gallery: [
			{
				src: '/images/services/custom-wardrobes/detail-1.webp',
				alt: 'Wardrobe interior with integrated lighting and drawers'
			},
			{
				src: '/images/services/custom-wardrobes/detail-2.webp',
				alt: 'Flush wardrobe doors in a muted lacquer finish'
			},
			{
				src: '/images/services/custom-wardrobes/detail-3.webp',
				alt: 'Brass hanging rail and shoe shelving detail'
			}
		],
		testimonial: {
			quote:
				'Every drawer, every light, every joint feels considered. The dressing room has become the calmest room in the house.',
			name: 'Sarah M.',
			location: 'Dublin 6'
		},
		image: {
			src: '/images/generated/services/custom-wardrobes-luxury.webp',
			alt: 'Bespoke fitted wardrobe with soft-close drawers and integrated lighting'
		},
		category: 'residential'
	},
	{
		id: 'bespoke-kitchens',
		title: 'Kitchens',
		description:
			'Kitchens built for how you cook, gather, and live. Handleless contemporary, classic timber, or something quietly in between.',
		longDescription:
			'An Áras Living kitchen is planned around workflow, light, and the social rhythm of the household. We design cabinetry, islands, pantries, and appliance housing as one coherent piece of joinery rather than a collection of units.',
		features: [
			'Handleless, timber, or painted cabinetry',
			'Stone, timber, or composite worktops',
			'Integrated appliances and custom pantries'
		],
		process: [
			'Discovery meeting and site survey',
			'Layout and elevation design',
			'Worktop, appliance, and material specification',
			'Carcass and door fabrication',
			'Installation, templating, and worktop fitting'
		],
		deliverables: [
			'Kitchen layout and elevation drawings',
			'Bespoke cabinetry and doors',
			'Worktop supply and installation',
			'Integrated appliance coordination'
		],
		relatedMaterials: [
			'deep-charcoal-lacquer',
			'european-oak',
			'honed-quartz',
			'satin-lacquer',
			'aged-brass'
		],
		gallery: [
			{
				src: '/images/services/bespoke-kitchens/detail-1.webp',
				alt: 'Handleless kitchen island with stone worktop'
			},
			{
				src: '/images/services/bespoke-kitchens/detail-2.webp',
				alt: 'Integrated appliances behind handleless cabinetry'
			},
			{
				src: '/images/services/bespoke-kitchens/detail-3.webp',
				alt: 'Breakfast pantry with pull-out storage'
			}
		],
		testimonial: {
			quote:
				'They understood the house before they designed the kitchen. The result respects the original rooms and works for how we live.',
			name: 'David & Aileen K.',
			location: 'Blackrock'
		},
		image: {
			src: '/images/services/bespoke-kitchens.jpg',
			alt: 'Bespoke kitchen with island, stone worktop, and integrated appliances'
		},
		category: 'residential'
	},
	{
		id: 'walk-in-closets',
		title: 'Dressing Rooms',
		description:
			'Calm, organised dressing rooms where every garment has its place and every morning starts with ease.',
		longDescription:
			'Dressing rooms are among the most personal spaces we design. We map every category of clothing and accessory, then arrange storage so the daily routine feels effortless and the room feels like a private boutique.',
		features: [
			'Central islands with accessory storage',
			'Full-height mirrors and dressing areas',
			'Sensor or automated lighting'
		],
		process: [
			'Wardrobe audit and lifestyle interview',
			'3D visualisation of the dressing room',
			'Material and lighting selection',
			'Cabinetry and island fabrication',
			'Installation and lighting commissioning'
		],
		deliverables: [
			'Detailed layout and renders',
			'Full-height cabinetry and island',
			'Jewellery, watch, and accessory storage',
			'Integrated lighting and mirror panels'
		],
		relatedMaterials: [
			'american-walnut',
			'crown-walnut-veneer',
			'aged-brass',
			'satin-lacquer',
			'honed-quartz'
		],
		gallery: [
			{
				src: '/images/services/walk-in-closets/detail-1.webp',
				alt: 'Central island with glass-top jewellery display'
			},
			{
				src: '/images/services/walk-in-closets/detail-2.webp',
				alt: 'Full-height mirror reflecting walnut cabinetry'
			},
			{
				src: '/images/services/walk-in-closets/detail-3.webp',
				alt: 'Sensor-activated LED lighting in shelving'
			}
		],
		testimonial: {
			quote:
				'Every drawer, every light, every joint feels considered. The dressing room has become the calmest room in the house.',
			name: 'Sarah M.',
			location: 'Dublin 6'
		},
		image: {
			src: '/images/services/walk-in-closets.jpg',
			alt: 'Boutique-style walk-in closet with central island and mirror'
		},
		category: 'residential'
	},
	{
		id: 'living-spaces',
		title: 'Living Joinery',
		description:
			'Media walls, libraries, alcove cabinets, and window seats that bring order and warmth to the rooms you use most.',
		longDescription:
			'Living joinery turns walls into architecture. Whether it is a media unit that hides cables, a library that frames a fireplace, or a window seat that conceals storage, each piece is built to fit the room exactly.',
		features: [
			'Media walls with concealed cable management',
			'Alcove shelving and window seats',
			'Bookshelves and display units'
		],
		process: [
			'Room survey and function brief',
			'Design of shelving, storage, and seating',
			'Material and finish selection',
			'Workshop fabrication',
			'Scribed installation and lighting setup'
		],
		deliverables: [
			'Elevation drawings and renders',
			'Built-in joinery and shelving',
			'Concealed storage and cable routing',
			'Lighting integration where specified'
		],
		relatedMaterials: [
			'european-oak',
			'fumed-oak',
			'satin-lacquer',
			'deep-charcoal-lacquer',
			'aged-brass'
		],
		gallery: [
			{
				src: '/images/services/living-spaces/detail-1.webp',
				alt: 'Built-in media wall with painted cabinets and oak shelving'
			},
			{
				src: '/images/services/living-spaces/detail-2.webp',
				alt: 'Alcove library with window seat and integrated lighting'
			},
			{
				src: '/images/services/living-spaces/detail-3.webp',
				alt: 'Bookshelves scribed to period walls'
			}
		],
		testimonial: {
			quote:
				'They understood the house before they designed the kitchen. The result respects the original rooms and works for how we live.',
			name: 'David & Aileen K.',
			location: 'Blackrock'
		},
		image: {
			src: '/images/services/living-spaces.jpg',
			alt: 'Built-in living room shelving and media unit with warm lighting'
		},
		category: 'residential'
	},
	// Commercial
	{
		id: 'office-fit-outs',
		title: 'Workplaces',
		description:
			'Reception desks, boardroom tables, and breakout joinery that communicate quality before anyone sits down.',
		longDescription:
			'Workplace joinery must balance durability with atmosphere. We design reception desks, meeting tables, storage walls, and breakout kitchens that feel considered and perform under constant daily use.',
		features: [
			'Reception desks and boardroom tables',
			'Breakout kitchens and storage',
			'Acoustic and cable-management systems'
		],
		process: [
			'Space planning and workplace audit',
			'Joinery design with power and data integration',
			'Durability and material specification',
			'Workshop fabrication',
			'Out-of-hours or phased installation'
		],
		deliverables: [
			'Joinery layout and technical drawings',
			'Reception, meeting, and breakout furniture',
			'Cable management and power integration',
			'Handover pack and aftercare schedule'
		],
		relatedMaterials: [
			'white-ash',
			'satin-lacquer',
			'honed-quartz',
			'deep-charcoal-lacquer',
			'aged-brass'
		],
		gallery: [
			{
				src: '/images/services/office-fit-outs/detail-1.webp',
				alt: 'Reception desk with integrated lighting'
			},
			{
				src: '/images/services/office-fit-outs/detail-2.webp',
				alt: 'Boardroom table seating fourteen'
			},
			{
				src: '/images/services/office-fit-outs/detail-3.webp',
				alt: 'Breakout kitchen with Fenix worktops'
			}
		],
		testimonial: {
			quote:
				'Our customers notice the joinery before they notice the product. That is exactly what we wanted.',
			name: 'James T.',
			location: 'Dublin 2'
		},
		image: {
			src: '/images/generated/services/workplaces-luxury.webp',
			alt: 'Modern office reception desk and boardroom joinery'
		},
		category: 'commercial'
	},
	{
		id: 'retail-interiors',
		title: 'Retail Spaces',
		description:
			'Display shelving, counters, and fitting-room joinery that let the merchandise speak.',
		longDescription:
			'Retail joinery needs to be flexible, durable, and visually quiet. We design display systems, counters, and fitting rooms that adapt to seasonal changes and withstand constant customer traffic.',
		features: [
			'Display shelving and counters',
			'Fitting rooms and mirrors',
			'Seasonal reconfiguration'
		],
		process: [
			'Brand and merchandising brief',
			'Space planning and customer flow design',
			'Prototype sampling for key pieces',
			'Batch fabrication and finishing',
			'Installation during closed hours'
		],
		deliverables: [
			'Retail layout and fixture drawings',
			'Display shelving, counters, and mirrors',
			'Fitting-room joinery',
			'Reconfiguration guide for seasonal change'
		],
		relatedMaterials: [
			'european-oak',
			'aged-brass',
			'honed-quartz',
			'satin-lacquer',
			'crown-walnut-veneer'
		],
		gallery: [
			{
				src: '/images/services/retail-interiors/detail-1.webp',
				alt: 'Display shelving with brass rods and seasonal products'
			},
			{
				src: '/images/services/retail-interiors/detail-2.webp',
				alt: 'Sales counter in oak and micro-cement'
			},
			{
				src: '/images/services/retail-interiors/detail-3.webp',
				alt: 'Fitting-room doors with full-height mirrors'
			}
		],
		testimonial: {
			quote:
				'Our customers notice the joinery before they notice the product. That is exactly what we wanted.',
			name: 'James T.',
			location: 'Dublin 2'
		},
		image: {
			src: '/images/services/retail-interiors.jpg',
			alt: 'Retail interior with bespoke display shelving and counter'
		},
		category: 'commercial'
	},
	{
		id: 'hospitality',
		title: 'Hotels & Restaurants',
		description:
			'Bars, banquettes, wardrobes, and reception joinery built to endure daily use without losing character.',
		longDescription:
			'Hospitality spaces demand joinery that looks refined after years of service. We design bars, banquette seating, reception desks, and guest-room furniture to meet fire, durability, and cleaning standards without sacrificing warmth.',
		features: [
			'Banquette seating and bar joinery',
			'Hotel wardrobes and headboards',
			'Reception and lobby furniture'
		],
		process: [
			'Operational brief and compliance review',
			'Concept design and sample prototyping',
			'Fire-retardant and durability specification',
			'Workshop fabrication in batches',
			'Overnight or phased installation'
		],
		deliverables: [
			'Joinery package drawings',
			'Bar, banquette, and reception pieces',
			'Guest-room wardrobes and headboards',
			'Compliance and care documentation'
		],
		relatedMaterials: [
			'american-walnut',
			'crown-walnut-veneer',
			'aged-brass',
			'deep-charcoal-lacquer',
			'honed-quartz'
		],
		gallery: [
			{
				src: '/images/services/hospitality/detail-1.webp',
				alt: 'Hotel reception desk with brass inlay'
			},
			{
				src: '/images/services/hospitality/detail-2.webp',
				alt: 'Banquette seating with walnut frames'
			},
			{
				src: '/images/services/hospitality/detail-3.webp',
				alt: 'Hotel wardrobe with integrated lighting'
			}
		],
		testimonial: {
			quote:
				'Our customers notice the joinery before they notice the product. That is exactly what we wanted.',
			name: 'James T.',
			location: 'Dublin 2'
		},
		image: {
			src: '/images/services/hospitality.jpg',
			alt: 'Hospitality interior with banquette seating and bar joinery'
		},
		category: 'commercial'
	},
	{
		id: 'custom-solutions',
		title: 'One-Off Commissions',
		description:
			'Unusual briefs and singular pieces. If the drawing exists, we can find the right way to make it.',
		longDescription:
			'Some projects do not fit a category. We work with architects, designers, and private clients on singular pieces — sculptural tables, experimental storage, heritage repairs, and bespoke installations that require inventive making.',
		features: [
			'Singular pieces and unusual briefs',
			'Prototype and concept development',
			'Collaboration with architects and designers'
		],
		process: [
			'Brief exploration and feasibility study',
			'Sketch design and prototype options',
			'Material research and sample making',
			'Full-scale fabrication',
			'Delivery and installation'
		],
		deliverables: [
			'Sketches, renders, or prototypes',
			'Bespoke finished piece or installation',
			'Fitting and adjustment on site',
			'Documentation for future reference'
		],
		relatedMaterials: [
			'american-walnut',
			'european-oak',
			'fumed-oak',
			'aged-brass',
			'honed-quartz'
		],
		gallery: [
			{
				src: '/images/services/custom-solutions/detail-1.webp',
				alt: 'Unique sculptural table in walnut and brass'
			},
			{
				src: '/images/services/custom-solutions/detail-2.webp',
				alt: 'Bespoke storage piece in an architectural setting'
			},
			{
				src: '/images/services/custom-solutions/detail-3.webp',
				alt: 'Detail of an unusual joinery commission'
			}
		],
		testimonial: {
			quote:
				'Our customers notice the joinery before they notice the product. That is exactly what we wanted.',
			name: 'James T.',
			location: 'Dublin 2'
		},
		image: {
			src: '/images/services/custom-solutions.jpg',
			alt: 'Unique custom furniture piece in a contemporary interior'
		},
		category: 'commercial'
	}
];
