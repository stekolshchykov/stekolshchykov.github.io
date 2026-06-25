import type { MaterialDetailed } from '$lib/types/furniture';

export const materialsDetailed: MaterialDetailed[] = [
	{
		id: 'european-oak',
		name: 'European Oak',
		family: 'solid timbers',
		tagline: 'The timber most at home in an Irish room.',
		description:
			'European oak is open-grained, warm in tone, and remarkably versatile. It takes an oil finish beautifully, revealing subtle figuring that deepens over years of light and use. In period homes it feels original; in contemporary spaces it adds quiet substance.',
		origin:
			'Sourced from sustainable forests in France and Germany, air- and kiln-dried in small batches.',
		characteristics: [
			'Prominent but even grain',
			'Warm honey to biscuit tone',
			'Hard-wearing for high-use surfaces',
			'Takes oil, lacquer, or fumed finishes well'
		],
		bestFor: ['Built-in libraries', 'Alcove joinery', 'Kitchen cabinetry', 'Window seats'],
		maintenance:
			'Dust with a soft cloth. Wipe spills promptly with a damp cloth and dry immediately. Re-oil every 18–24 months if an oiled finish is chosen.',
		sustainability:
			'FSC-certified logs from managed forests. Offcuts are reserved for smaller components or passed to local craftspeople.',
		images: {
			swatch: {
				src: '/images/materials/european-oak/swatch.webp',
				alt: 'European oak timber swatch'
			},
			application: {
				src: '/images/materials/european-oak/application.webp',
				alt: 'European oak joinery installed in a period living room'
			},
			detail: {
				src: '/images/materials/european-oak/detail.webp',
				alt: 'Close-up of European oak grain and joinery'
			}
		}
	},
	{
		id: 'american-walnut',
		name: 'American Walnut',
		family: 'solid timbers',
		tagline: 'Depth, drama, and everyday calm.',
		description:
			'American walnut carries a chocolate-brown heartwood with occasional lighter sap lines. It is prized for fine furniture because it machines cleanly and finishes to a soft, reflective surface that never feels ostentatious.',
		origin:
			'Black walnut from the eastern United States, selected for consistent colour and straight grain.',
		characteristics: [
			'Rich chocolate to espresso tone',
			'Fine, even texture',
			'Stable in changing humidity',
			'Deepens in colour with age'
		],
		bestFor: ['Dressing rooms', 'Reception desks', 'Feature cabinetry', 'Headboards'],
		maintenance:
			'Use a soft microfibre cloth for dusting. Avoid silicone sprays. A light application of natural wax once a year revives the lustre.',
		sustainability:
			'Responsibly harvested under US hardwood sustainability programmes; each parcel is fully traceable to region.',
		images: {
			swatch: {
				src: '/images/materials/american-walnut/swatch.webp',
				alt: 'American walnut timber swatch'
			},
			application: {
				src: '/images/materials/american-walnut/application.webp',
				alt: 'American walnut wardrobe and island in a dressing room'
			},
			detail: {
				src: '/images/materials/american-walnut/detail.webp',
				alt: 'Close-up of American walnut joinery detail'
			}
		}
	},
	{
		id: 'white-ash',
		name: 'White Ash',
		family: 'solid timbers',
		tagline: 'Lightness without sterility.',
		description:
			'White ash is pale, open-grained, and naturally bright. It reflects light across a room and pairs crisply with darker accents such as black steel or charcoal stone. Its elasticity also makes it ideal for bent or shaped components.',
		origin: 'Northern European ash, chosen for pale colour and minimal knots.',
		characteristics: [
			'Bright, almost creamy base tone',
			'Distinctive open grain',
			'Excellent for staining or liming',
			'Good shock resistance'
		],
		bestFor: ['Office fit-outs', 'Light kitchens', 'Wall panelling', 'Display shelving'],
		maintenance:
			'Clean with a damp cloth and dry immediately. Oiled ash can be refreshed with a thin coat of hardwax oil every two years.',
		sustainability:
			'Ash is sourced from estates with active replanting schemes. All timber is fully kiln-dried to reduce movement in service.',
		images: {
			swatch: {
				src: '/images/materials/white-ash/swatch.webp',
				alt: 'White ash timber swatch'
			},
			application: {
				src: '/images/materials/white-ash/application.webp',
				alt: 'White ash office reception desk and wall panelling'
			},
			detail: {
				src: '/images/materials/white-ash/detail.webp',
				alt: 'Close-up of white ash grain and edge detail'
			}
		}
	},
	{
		id: 'fumed-oak',
		name: 'Fumed Oak',
		family: 'solid timbers',
		tagline: 'Aged by ammonia, not imitation.',
		description:
			'Fuming darkens oak by reacting tannins with ammonia, a technique used since the Arts and Crafts movement. The result is a silvery-brown tone with muted figuring that looks earned rather than applied.',
		origin: 'European oak, fumed in controlled chambers at our Dublin workshop.',
		characteristics: [
			'Silvery-grey to deep brown tones',
			'Colour penetrates the surface rather than sitting on it',
			'Reduces yellowing over time',
			'Pairs beautifully with brass and linen'
		],
		bestFor: [
			'Statement libraries',
			'Dark kitchens',
			'Aged-looking dressing rooms',
			'Feature doors'
		],
		maintenance:
			'Treat as oiled timber. Avoid harsh detergents. Occasional re-oiling keeps the surface resilient and evens out wear.',
		sustainability:
			'Fuming uses no pigments or heavy solvents, relying on a natural chemical reaction with the wood itself.',
		images: {
			swatch: {
				src: '/images/materials/fumed-oak/swatch.webp',
				alt: 'Fumed oak timber swatch'
			},
			application: {
				src: '/images/materials/fumed-oak/application.webp',
				alt: 'Fumed oak library with brass lighting'
			},
			detail: {
				src: '/images/materials/fumed-oak/detail.webp',
				alt: 'Close-up of fumed oak surface and patina'
			}
		}
	},
	{
		id: 'crown-walnut-veneer',
		name: 'Crown-Cut Walnut Veneer',
		family: 'veneers',
		tagline: 'Consistency across large surfaces.',
		description:
			'Crown-cut walnut veneer is sliced from the log in parallel arcs, producing a gentle, symmetrical figure. It allows large door panels and drawer fronts to share the same visual rhythm without the weight or movement risk of solid timber.',
		origin: 'American walnut, crown-cut and pressed onto stable birch-plywood cores.',
		characteristics: [
			'Symmetrical, flowing grain',
			'Stable across wide panels',
			'Lightweight compared with solid boards',
			'Ideal for matching sequences'
		],
		bestFor: ['Wardrobe doors', 'Large kitchen panels', 'Reception desks', 'Hotel joinery'],
		maintenance:
			'Dust with a soft cloth. Clean with a mild, pH-neutral cleaner. Avoid abrasive pads that can cut through the lacquer layer.',
		sustainability:
			'Veneering makes exceptional timber go further; a single log produces many square metres of usable surface.',
		images: {
			swatch: {
				src: '/images/materials/crown-walnut-veneer/swatch.webp',
				alt: 'Crown-cut walnut veneer swatch'
			},
			application: {
				src: '/images/materials/crown-walnut-veneer/application.webp',
				alt: 'Crown-cut walnut veneer wardrobes in a bedroom'
			},
			detail: {
				src: '/images/materials/crown-walnut-veneer/detail.webp',
				alt: 'Close-up of crown-cut walnut veneer figure'
			}
		}
	},
	{
		id: 'quarter-sawn-oak-veneer',
		name: 'Quarter-Sawn Oak Veneer',
		family: 'veneers',
		tagline: 'The shimmer of stable grain.',
		description:
			'Quarter-sawn oak reveals distinctive ray fleck figure and remains exceptionally stable. It was the signature veneer of twentieth-century modernism and still lends authority to contemporary handleless kitchens and fitted libraries.',
		origin: 'European oak, quarter-sawn and laid on FSC birch plywood.',
		characteristics: [
			'Dramatic ray fleck or tiger-stripe figure',
			'High dimensional stability',
			'Resists cupping and warping',
			'Catches light across the surface'
		],
		bestFor: ['Handleless kitchens', 'Art Deco-inspired interiors', 'Libraries', 'Hotel lobbies'],
		maintenance:
			'Wipe with a damp cloth and dry. A yearly application of furniture wax enriches the figure and protects the surface.',
		sustainability:
			'Quarter-sawn logs maximise structural stability and yield, reducing waste and extending the life of each tree.',
		images: {
			swatch: {
				src: '/images/materials/quarter-sawn-oak-veneer/swatch.webp',
				alt: 'Quarter-sawn oak veneer swatch'
			},
			application: {
				src: '/images/materials/quarter-sawn-oak-veneer/application.webp',
				alt: 'Quarter-sawn oak veneer wall panelling'
			},
			detail: {
				src: '/images/materials/quarter-sawn-oak-veneer/detail.webp',
				alt: 'Close-up of quarter-sawn oak ray fleck'
			}
		}
	},
	{
		id: 'satin-lacquer',
		name: 'Satin Lacquer',
		family: 'painted & lacquered',
		tagline: 'Pigment, precision, and a surface that stays clean.',
		description:
			'Our satin lacquer finish is sprayed in multiple fine coats and hand-flatting between each one. The result is a velvety, non-reflective surface that resists fingerprints and brings colour to life with unusual depth.',
		origin: 'Mixed to order in our spray facility from premium water-based lacquer systems.',
		characteristics: [
			'Smooth, fingerprint-resistant surface',
			'Available in any colour',
			'Hard-wearing for kitchens and bathrooms',
			'Repairs cleanly if damaged'
		],
		bestFor: ['Handleless kitchens', 'Media walls', 'Bathroom vanities', 'Contemporary wardrobes'],
		maintenance:
			'Wipe with a soft cloth and mild soapy water. Avoid solvent-based cleaners and abrasive scourers.',
		sustainability:
			'Low-VOC water-based lacquers reduce airborne emissions during finishing and in the home.',
		images: {
			swatch: {
				src: '/images/materials/satin-lacquer/swatch.webp',
				alt: 'Satin lacquer colour swatch'
			},
			application: {
				src: '/images/materials/satin-lacquer/application.webp',
				alt: 'Satin lacquer kitchen in a muted neutral tone'
			},
			detail: {
				src: '/images/materials/satin-lacquer/detail.webp',
				alt: 'Close-up of satin lacquer surface and edge'
			}
		}
	},
	{
		id: 'deep-charcoal-lacquer',
		name: 'Deep Charcoal Lacquer',
		family: 'painted & lacquered',
		tagline: 'Dark, disciplined, and quietly dramatic.',
		description:
			'A near-black charcoal with a satin sheen, this lacquer absorbs light and frames adjoining materials beautifully. It is the finish we reach for when architecture, timber, and brass need a calm, confident backdrop.',
		origin:
			'Pigmented and sprayed as part of our standard colour library; custom dark tones available.',
		characteristics: [
			'Near-black with warm charcoal undertone',
			'Consistent, velvety surface',
			'Scratch-resistant top coat',
			'Pairs with almost any timber or stone'
		],
		bestFor: ['Handleless kitchens', 'Media walls', 'Bars and joinery', 'Minimal wardrobes'],
		maintenance:
			'Dust regularly; use a microfibre cloth for cleaning. Fingerprints wipe away easily with a damp cloth.',
		sustainability:
			'Long-lasting, repairable finish that extends the usable life of cabinetry and reduces replacement.',
		images: {
			swatch: {
				src: '/images/materials/deep-charcoal-lacquer/swatch.webp',
				alt: 'Deep charcoal lacquer swatch'
			},
			application: {
				src: '/images/materials/deep-charcoal-lacquer/application.webp',
				alt: 'Deep charcoal lacquer kitchen island and cabinetry'
			},
			detail: {
				src: '/images/materials/deep-charcoal-lacquer/detail.webp',
				alt: 'Close-up of deep charcoal lacquer finish'
			}
		}
	},
	{
		id: 'honed-quartz',
		name: 'Honed Quartz Composite',
		family: 'stone & composite',
		tagline: 'Stone practicality with a soft touch.',
		description:
			'Honed quartz offers the resilience of engineered stone with a matte surface that feels more like limestone. It is non-porous, consistent in colour, and well suited to busy kitchens and bathrooms.',
		origin: 'Engineered from natural quartz and resin, sourced from certified European producers.',
		characteristics: [
			'Matte, honed surface',
			'Non-porous and stain-resistant',
			'Consistent colour and veining',
			'No sealing required'
		],
		bestFor: ['Kitchen worktops', 'Island tops', 'Bathroom vanities', 'Reception counters'],
		maintenance:
			'Clean with warm soapy water. Avoid harsh acids or alkalis. Stubborn marks respond to a non-abrasive cream cleaner.',
		sustainability:
			'Long lifespan and minimal maintenance reduce lifetime environmental impact compared with porous natural stones.',
		images: {
			swatch: {
				src: '/images/materials/honed-quartz/swatch.webp',
				alt: 'Honed quartz composite swatch'
			},
			application: {
				src: '/images/materials/honed-quartz/application.webp',
				alt: 'Honed quartz worktop on a kitchen island'
			},
			detail: {
				src: '/images/materials/honed-quartz/detail.webp',
				alt: 'Close-up of honed quartz surface texture'
			}
		}
	},
	{
		id: 'aged-brass',
		name: 'Aged Brass',
		family: 'metals & leather',
		tagline: 'Warm metal that grows richer with time.',
		description:
			'Aged brass begins bright and settles into a darker, softer patina. We use it for handles, trims, inlays, and hanging rails — any detail that benefits from a material that improves rather than deteriorates with handling.',
		origin: 'Solid brass components from European foundries, hand-aged in our finishing room.',
		characteristics: [
			'Warm golden-brown base tone',
			'Develops a living patina',
			'Solid and substantial in the hand',
			'Can be sealed or left to age naturally'
		],
		bestFor: ['Handles and pulls', 'Hanging rails', 'Inlays and trims', 'Leather-backed panels'],
		maintenance:
			'Unsealed brass can be revived with a soft brass cleaner. Sealed brass needs only occasional dusting.',
		sustainability:
			'Solid brass is highly recyclable, and its longevity means hardware rarely needs replacement.',
		images: {
			swatch: {
				src: '/images/materials/aged-brass/swatch.webp',
				alt: 'Aged brass metal swatch'
			},
			application: {
				src: '/images/materials/aged-brass/application.webp',
				alt: 'Aged brass handles and hanging rails in a dressing room'
			},
			detail: {
				src: '/images/materials/aged-brass/detail.webp',
				alt: 'Close-up of aged brass handle and patina'
			}
		}
	}
];
