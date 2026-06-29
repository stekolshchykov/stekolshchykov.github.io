import type { MaterialDetailed } from '$lib/types/furniture';

const tbc = '/images/placeholders/needs-photo.svg';

export const materialsDetailed: MaterialDetailed[] = [
	{
		id: 'painted-fronts',
		name: 'Painted & Lacquered Fronts',
		family: 'painted & lacquered',
		tagline: 'Calm colour. Clean lines. A finished room.',
		description:
			'Painted and lacquered fronts create a quiet architectural surface, from soft neutrals to deeper tones.',
		origin: 'Specified by colour, sheen, durability and the atmosphere the room needs.',
		characteristics: ['Calm colour', 'Clean lines', 'Soft sheen options', 'Premium visual consistency'],
		bestFor: ['Kitchens', 'Wardrobes', 'Bathroom furniture', 'Media walls'],
		maintenance: 'Care guidance is confirmed with the selected finish.',
		sustainability: 'Final material details are confirmed during specification.',
		images: {
			swatch: {
				src: '/images/materials/satin-lacquer/swatch.webp',
				alt: 'Painted and lacquered cabinetry front sample'
			},
			application: {
				src: '/images/materials/satin-lacquer/application.webp',
				alt: 'Painted cabinetry fronts in a calm interior'
			},
			detail: {
				src: tbc,
				alt: 'Photo to be supplied for painted and lacquered cabinetry detail'
			}
		}
	},
	{
		id: 'wood-veneers',
		name: 'Wood Veneers & Warm Wood Finishes',
		family: 'veneers',
		tagline: 'Warmth you see before you touch.',
		description:
			'Wood finishes bring depth, rhythm and warmth to fitted cabinetry without making the room feel heavy.',
		origin: 'Specified by tone, grain direction, scale and how the surface should sit in the room.',
		characteristics: ['Warm tone', 'Visible grain', 'Large-surface consistency', 'Architectural depth'],
		bestFor: ['Kitchens', 'Wardrobes', 'Living rooms', 'Commercial spaces'],
		maintenance: 'Care guidance is confirmed with the selected finish.',
		sustainability: 'Final material details are confirmed during specification.',
		images: {
			swatch: {
				src: '/images/materials/crown-walnut-veneer/swatch.webp',
				alt: 'Warm wood veneer cabinetry finish'
			},
			application: {
				src: '/images/materials/crown-walnut-veneer/application.webp',
				alt: 'Warm wood finish used across fitted cabinetry'
			},
			detail: {
				src: tbc,
				alt: 'Photo to be supplied for warm wood finish detail'
			}
		}
	},
	{
		id: 'stone-worktops',
		name: 'Stone & Worktop Surfaces',
		family: 'stone & composite',
		tagline: 'Surfaces that anchor the whole space.',
		description:
			'Worktops and stone surfaces give the room weight, touch and visual calm, especially around kitchens, vanities and counters.',
		origin: 'Specified by tone, edge detail, surface feel and intended daily use.',
		characteristics: ['Anchoring surface', 'Tactile edge detail', 'Daily-use durability', 'Quiet visual weight'],
		bestFor: ['Kitchen islands', 'Vanity units', 'Utility rooms', 'Commercial counters'],
		maintenance: 'Care guidance is confirmed with the selected surface.',
		sustainability: 'Final material details are confirmed during specification.',
		images: {
			swatch: {
				src: '/images/materials/honed-quartz/swatch.webp',
				alt: 'Stone and worktop surface sample'
			},
			application: {
				src: '/images/materials/honed-quartz/application.webp',
				alt: 'Worktop surface on fitted cabinetry'
			},
			detail: {
				src: tbc,
				alt: 'Photo to be supplied for worktop edge detail'
			}
		}
	},
	{
		id: 'hardware-systems',
		name: 'Hardware & Internal Systems',
		family: 'metals & leather',
		tagline: 'The details you touch every day matter.',
		description:
			'Handles, hinges, drawer systems and internal storage are considered as part of the premium experience of use.',
		origin: 'Specified by movement, touch, access and the level of internal organisation required.',
		characteristics: ['Daily touchpoints', 'Controlled movement', 'Internal organisation', 'Quiet usability'],
		bestFor: ['Drawers', 'Larders', 'Wardrobes', 'Utility storage'],
		maintenance: 'Care guidance is confirmed with the selected hardware and systems.',
		sustainability: 'Final material details are confirmed during specification.',
		images: {
			swatch: {
				src: '/images/materials/aged-brass/swatch.webp',
				alt: 'Hardware and metal detail sample'
			},
			application: {
				src: '/images/materials/aged-brass/application.webp',
				alt: 'Hardware and internal system details in cabinetry'
			},
			detail: {
				src: tbc,
				alt: 'Photo to be supplied for internal hardware detail'
			}
		}
	},
	{
		id: 'glass-mirrors',
		name: 'Glass, Mirrors & Feature Panels',
		family: 'metals & leather',
		tagline: 'Light, reflection and a quieter sense of depth.',
		description:
			'Glass, mirrors and feature panels can make cabinetry feel lighter, deeper and more integrated with the room.',
		origin: 'Specified by reflection, privacy, light and the role of the feature surface.',
		characteristics: ['Reflection', 'Light control', 'Feature depth', 'Visual softness'],
		bestFor: ['Wardrobes', 'Dressing rooms', 'Display storage', 'Feature panels'],
		maintenance: 'Care guidance is confirmed with the selected panel type.',
		sustainability: 'Final material details are confirmed during specification.',
		images: {
			swatch: {
				src: tbc,
				alt: 'Photo to be supplied for glass and mirror finish sample'
			},
			application: {
				src: tbc,
				alt: 'Photo to be supplied for glass and mirror cabinetry application'
			},
			detail: {
				src: tbc,
				alt: 'Photo to be supplied for glass and feature panel detail'
			}
		}
	}
];
