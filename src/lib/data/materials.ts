import type { Material } from '$lib/types/furniture';

export const materials: Material[] = [
	{
		id: 'european-oak',
		name: 'European Oak',
		description:
			'Durable, open-grained, and warm. A timber that feels as natural in a period home as in a contemporary interior.',
		image: {
			src: '/images/materials/european-oak.jpg',
			alt: 'European oak timber swatch showing grain and warm tone'
		}
	},
	{
		id: 'american-walnut',
		name: 'American Walnut',
		description:
			'Deep in colour, fine in grain. Prized for its depth and elegant figuring in fine furniture.',
		image: {
			src: '/images/materials/american-walnut.jpg',
			alt: 'American walnut timber swatch showing rich dark grain'
		}
	},
	{
		id: 'white-ash',
		name: 'White Ash',
		description:
			'Pale, even, and quietly textured. Ideal for interiors that need light without sterility.',
		image: {
			src: '/images/materials/white-ash.jpg',
			alt: 'White ash timber swatch showing light clean grain'
		}
	},
	{
		id: 'painted-finishes',
		name: 'Painted Finishes',
		description:
			'Mixed, sprayed, and hand-finished in any colour. From muted neutrals to deep, saturated tones.',
		image: {
			src: '/images/materials/painted-finishes.jpg',
			alt: 'Painted finish sample showing smooth hand-finished surface'
		}
	},
	{
		id: 'veneer-options',
		name: 'Veneer Options',
		description:
			'Premium veneers for large surfaces: consistent grain, stable construction, refined visual impact.',
		image: {
			src: '/images/materials/veneer-options.jpg',
			alt: 'Wood veneer sample showing consistent premium grain'
		}
	},
	{
		id: 'hardware',
		name: 'Hardware',
		description:
			'Hinges, handles, and drawer systems from European specialists — chosen for feel after years of daily use.',
		image: {
			src: '/images/materials/hardware.jpg',
			alt: 'Selection of premium brass and steel furniture hardware'
		}
	}
];
