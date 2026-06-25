import type { Project } from '$lib/types/furniture';

export const projects: Project[] = [
	{
		slug: 'penthouse-wardrobe-suite',
		title: 'Dublin Bay Dressing Room',
		category: 'residential',
		location: 'Dublin 4',
		description:
			'A master-suite dressing room in American walnut, designed to follow the ceiling line and frame the bay.',
		overview:
			'A new penthouse overlooking Dublin Bay needed a dressing room that matched the scale of the view. The brief was for storage that felt calm, generous, and quietly luxurious.',
		challenge:
			'Full-height glazing and a sloping ceiling ruled out standard cabinetry. The client needed hanging, shoe display, and accessory storage without crowding the room.',
		solution:
			'We designed a perimeter system of American walnut cabinetry that followed the ceiling line, with a central island for folded items and jewellery. Integrated LED strips with dimming zones highlight display areas while soft-close Blum drawers keep everyday items silent and smooth.',
		craftNotes:
			'Every drawer front was sequenced from the same walnut flitch so the grain flowed continuously around the room. The island top was templated on site to align exactly with the herringbone floor.',
		makerCredits: [
			'Conor Byrne — design',
			'Sean Murphy — lead maker',
			'Niamh Kelly — workshop coordination'
		],
		clientOutcome:
			'The dressing room now functions as a calm morning ritual space and a quiet evening retreat, with every item visible and within reach.',
		relatedServices: ['custom-wardrobes', 'walk-in-closets'],
		specs: {
			client: 'Private Residence',
			location: 'Dublin 4',
			category: 'residential',
			scope: 'walk-in-closet',
			materials: 'American Walnut, Brass',
			finishes: 'Hand-rubbed oil, satin lacquer',
			hardware: 'Blum soft-close, LED strips',
			timeline: '8 weeks',
			year: 2024
		},
		media: {
			hero: {
				src: '/images/projects/penthouse-wardrobe-suite/hero.jpg',
				alt: 'Penthouse walk-in wardrobe suite in American walnut with brass hardware'
			},
			gallery: [
				{
					src: '/images/projects/penthouse-wardrobe-suite/detail-1.jpg',
					alt: 'Floor-to-ceiling walnut cabinetry with integrated lighting'
				},
				{
					src: '/images/projects/penthouse-wardrobe-suite/detail-2.jpg',
					alt: 'Central island with soft-close drawers and jewellery tray'
				},
				{
					src: '/images/projects/penthouse-wardrobe-suite/detail-3.jpg',
					alt: 'Brass hanging rail and shoe display shelving'
				},
				{
					src: '/images/projects/penthouse-wardrobe-suite/detail-4.jpg',
					alt: 'LED-lit accessory display niches'
				},
				{
					src: '/images/projects/penthouse-wardrobe-suite/detail-5.jpg',
					alt: 'Detail of satin lacquer finish and brass handle'
				},
				{
					src: '/images/projects/penthouse-wardrobe-suite/detail-6.jpg',
					alt: 'Full-height mirror panel reflecting the bay view'
				}
			],
			video: {
				src: '/videos/projects/penthouse-wardrobe-suite/overview.mp4',
				alt: 'Walkthrough of the penthouse wardrobe suite',
				type: 'video',
				poster: '/images/projects/penthouse-wardrobe-suite/video-poster.jpg'
			}
		},
		featured: true,
		tags: ['Walk-in Closet', 'Walnut', 'Brass', 'LED Lighting', 'Penthouse']
	},
	{
		slug: 'blackrock-kitchen',
		title: 'Blackrock Family Kitchen',
		category: 'residential',
		location: 'Blackrock, Co. Dublin',
		description:
			'A handleless charcoal kitchen with island and honed stone worktop, set within a Victorian house in Blackrock.',
		overview:
			'A full kitchen redesign for a Victorian-era home in Blackrock. The family wanted a contemporary kitchen that respected the original proportions of the house and could absorb both weekday routine and larger gatherings.',
		challenge:
			'Ceiling heights varied across the room, and the existing chimney breast limited wall-run continuity. The client also requested a large island with seating without sacrificing circulation.',
		solution:
			'We wrapped the chimney breast in handleless charcoal lacquer and extended the run with floor-to-ceiling units. The island houses a sink, bin, and breakfast storage beneath a honed quartz worktop. Oak internals add warmth each time a door opens.',
		craftNotes:
			'The J-pull recesses were machined to a consistent shadow line around the chimney breast, turning a structural obstacle into a focal point. Oak internals were finished with a hardwax oil that will patina with use.',
		makerCredits: [
			'Conor Byrne — design',
			'Niamh Kelly — project management',
			'Senior team — spray finishing'
		],
		clientOutcome:
			'The family now has a kitchen that handles school mornings and dinner parties with equal ease, and the Victorian proportions feel enhanced rather than contradicted.',
		relatedServices: ['bespoke-kitchens'],
		specs: {
			client: 'Private Residence',
			location: 'Blackrock, Co. Dublin',
			category: 'residential',
			scope: 'kitchen',
			materials: 'Charcoal lacquer, quartz worktop, oak internals',
			finishes: 'Matte satin lacquer, honed stone',
			hardware: 'Grass drawer systems, soft-close hinges',
			timeline: '10 weeks',
			year: 2024
		},
		media: {
			hero: {
				src: '/images/projects/blackrock-kitchen/hero.jpg',
				alt: 'Handleless matte charcoal kitchen with island and stone worktop'
			},
			gallery: [
				{
					src: '/images/projects/blackrock-kitchen/detail-1.jpg',
					alt: 'Kitchen island with quartz worktop and pendant lighting'
				},
				{
					src: '/images/projects/blackrock-kitchen/detail-2.jpg',
					alt: 'Integrated appliances behind handleless cabinetry'
				},
				{
					src: '/images/projects/blackrock-kitchen/detail-3.jpg',
					alt: 'Charcoal lacquer cabinets with oak internal shelving'
				},
				{
					src: '/images/projects/blackrock-kitchen/detail-4.jpg',
					alt: 'Dining view from kitchen island'
				},
				{
					src: '/images/projects/blackrock-kitchen/detail-5.jpg',
					alt: 'Detail of honed stone worktop and undermount sink'
				},
				{
					src: '/images/projects/blackrock-kitchen/detail-6.jpg',
					alt: 'Breakfast pantry with pull-out storage'
				},
				{
					src: '/images/projects/blackrock-kitchen/detail-7.jpg',
					alt: 'Evening view of the kitchen with ambient lighting'
				}
			]
		},
		featured: true,
		tags: ['Kitchen', 'Handleless', 'Charcoal', 'Quartz', 'Island']
	},
	{
		slug: 'shelbourne-fittings',
		title: 'Hotel Reception & Lounge',
		category: 'commercial',
		location: 'Dublin 2',
		description:
			'Reception joinery and lounge seating for a five-star Dublin hotel, built to withstand high traffic while feeling residential.',
		overview:
			'A commission to create reception joinery and lounge seating for a landmark five-star hotel in Dublin city centre. The work needed to feel established yet fresh, and to endure constant guest traffic.',
		challenge:
			'The hotel remained open throughout, so every installation happened in narrow overnight windows. Materials had to meet fire-retardant and durability standards while retaining a warm, residential feel.',
		solution:
			'We built the reception desk in American walnut with brass inlays and a leather-wrapped front counter. Lounge seating combined walnut frames with velvet upholstery in a deep forest tone. Every joint and finish was specified for daily commercial use.',
		craftNotes:
			'The leather counter front was hand-stitched in panels to allow future replacement of individual sections. Brass inlays were set flush to avoid catching bags and luggage.',
		makerCredits: [
			'Conor Byrne — design lead',
			'Niamh Kelly — commercial coordination',
			'Workshop team — batch fabrication'
		],
		clientOutcome:
			'The hotel reports that guests frequently comment on the warmth of the reception area, and the joinery has held its appearance through eighteen months of continuous use.',
		relatedServices: ['hospitality', 'custom-solutions'],
		specs: {
			client: 'Luxury Hotel Group',
			location: 'Dublin 2',
			category: 'commercial',
			scope: 'hospitality',
			materials: 'American Walnut, brass, velvet upholstery',
			finishes: 'Satin lacquer, brushed brass, stain-resistant velvet',
			hardware: 'Commercial-grade fixings, concealed connectors',
			timeline: '12 weeks',
			year: 2023
		},
		media: {
			hero: {
				src: '/images/projects/shelbourne-fittings/hero.jpg',
				alt: 'Hotel lobby with walnut reception desk and lounge seating'
			},
			gallery: [
				{
					src: '/images/projects/shelbourne-fittings/detail-1.jpg',
					alt: 'Reception desk with brass inlay and leather front'
				},
				{
					src: '/images/projects/shelbourne-fittings/detail-2.jpg',
					alt: 'Lounge seating with walnut frames and velvet cushions'
				},
				{
					src: '/images/projects/shelbourne-fittings/detail-3.jpg',
					alt: 'Detail of brass and walnut reception counter'
				},
				{
					src: '/images/projects/shelbourne-fittings/detail-4.jpg',
					alt: 'Lobby seating arrangement from entrance view'
				},
				{
					src: '/images/projects/shelbourne-fittings/detail-5.jpg',
					alt: 'Close-up of velvet upholstery and joinery detail'
				}
			]
		},
		featured: true,
		tags: ['Hospitality', 'Hotel', 'Walnut', 'Brass', 'Commercial']
	},
	{
		slug: 'ranelagh-alcove-library',
		title: 'Ranelagh Alcove Library',
		category: 'residential',
		location: 'Ranelagh, Dublin 6',
		description:
			'Built-in bookshelves and window seat in European oak, designed around a period bay window.',
		overview:
			'A ground-floor reception room in a period red-brick house. The clients wanted a reading nook and library that felt original to the house, with storage concealed behind elegant panelling.',
		challenge:
			'Walls were out of plumb and the bay window had uneven reveals. The design needed to accommodate existing skirting boards, picture rails, and a working fireplace.',
		solution:
			'We built European oak bookcases with a hand-painted backing in a soft clay tone. The window seat opens on gas struts for hidden storage, and LED strips illuminate the shelves in the evening. The whole piece is scribed to the walls for a seamless fit.',
		craftNotes:
			'The window seat was built as a torsion box to remain rigid without excessive weight. Each shelf was scribed individually to the curved bay wall.',
		makerCredits: [
			'Conor Byrne — design',
			'Sean Murphy — lead maker',
			'Installation team — on-site scribing'
		],
		clientOutcome:
			"The library has become the household's favourite room, used for reading, working, and entertaining around the fire.",
		relatedServices: ['living-spaces'],
		specs: {
			client: 'Private Residence',
			location: 'Ranelagh, Dublin 6',
			category: 'residential',
			scope: 'living-space',
			materials: 'European Oak, hand-painted backing',
			finishes: 'Natural oil, matte painted panels',
			hardware: 'LED strip lighting, gas-strut seat hinges',
			timeline: '6 weeks',
			year: 2024
		},
		media: {
			hero: {
				src: '/images/projects/ranelagh-alcove-library/hero.jpg',
				alt: 'Built-in oak library shelving around a period bay window'
			},
			gallery: [
				{
					src: '/images/projects/ranelagh-alcove-library/detail-1.jpg',
					alt: 'Window seat with hidden storage and cushions'
				},
				{
					src: '/images/projects/ranelagh-alcove-library/detail-2.jpg',
					alt: 'Bookshelves with integrated LED lighting'
				},
				{
					src: '/images/projects/ranelagh-alcove-library/detail-3.jpg',
					alt: 'Detail of scribed cabinet against period wall'
				},
				{
					src: '/images/projects/ranelagh-alcove-library/detail-4.jpg',
					alt: 'Reading nook with fireplace view'
				},
				{
					src: '/images/projects/ranelagh-alcove-library/detail-5.jpg',
					alt: 'Painted backing and oak shelf junction'
				}
			]
		},
		featured: false,
		tags: ['Library', 'Oak', 'Living Space', 'Period Home', 'Window Seat']
	},
	{
		slug: 'dublin-office-fitout',
		title: 'Dublin Office Fit-out',
		category: 'commercial',
		location: 'Dublin 1',
		description: 'Reception desk, boardroom table, and breakout kitchen for a creative agency.',
		overview:
			'A new headquarters for a growing creative agency. The brief was for a calm, confident interior in warm materials.',
		challenge:
			'The space was an open shell with exposed services and limited natural light. Acoustics, cable management, and flexible working zones all needed to be addressed within one joinery package.',
		solution:
			'White ash was used for the reception desk and wall panelling to reflect light, while Fenix worktops and black steel frames grounded the breakout kitchen. A single boardroom table seats fourteen and conceals power and data.',
		craftNotes:
			'The boardroom table was built with a cable spine running the full length, accessible through lidded channels. Ash panels were book-matched to carry grain across the reception wall.',
		makerCredits: [
			'Conor Byrne — design lead',
			'Niamh Kelly — commercial coordination',
			'Workshop team — fabrication'
		],
		clientOutcome:
			"The agency's new space supports both focused work and client presentations, with joinery that quietly reinforces the brand.",
		relatedServices: ['office-fit-outs', 'custom-solutions'],
		specs: {
			client: 'Creative Agency',
			location: 'Dublin 1',
			category: 'commercial',
			scope: 'office-fit-out',
			materials: 'White Ash, Fenix worktops, black steel',
			finishes: 'Natural ash oil, matte Fenix, powder-coated steel',
			hardware: 'Cable management trays, soft-close storage',
			timeline: '14 weeks',
			year: 2023
		},
		media: {
			hero: {
				src: '/images/projects/dublin-office-fitout/hero.jpg',
				alt: 'Creative agency reception with ash desk and black steel details'
			},
			gallery: [
				{
					src: '/images/projects/dublin-office-fitout/detail-1.jpg',
					alt: 'Reception desk with integrated lighting'
				},
				{
					src: '/images/projects/dublin-office-fitout/detail-2.jpg',
					alt: 'Boardroom table seating fourteen'
				},
				{
					src: '/images/projects/dublin-office-fitout/detail-3.jpg',
					alt: 'Breakout kitchen with Fenix worktops'
				},
				{
					src: '/images/projects/dublin-office-fitout/detail-4.jpg',
					alt: 'Ash wall panelling and acoustic treatment'
				},
				{
					src: '/images/projects/dublin-office-fitout/detail-5.jpg',
					alt: 'Detail of black steel frame and ash joinery'
				},
				{
					src: '/images/projects/dublin-office-fitout/detail-6.jpg',
					alt: 'Open-plan view from reception to workspace'
				},
				{
					src: '/images/projects/dublin-office-fitout/detail-7.jpg',
					alt: 'Storage wall with sliding black steel doors'
				},
				{
					src: '/images/projects/dublin-office-fitout/detail-8.jpg',
					alt: 'Close-up of Fenix worktop and ash cabinet'
				}
			]
		},
		featured: false,
		tags: ['Office', 'Ash', 'Fenix', 'Commercial', 'Boardroom']
	},
	{
		slug: 'howth-walk-in-closet',
		title: 'Howth Dressing Room',
		category: 'residential',
		location: 'Howth, Co. Dublin',
		description:
			'A coastal dressing room in American walnut, with a central island and full-height mirror.',
		overview:
			'A coastal home in Howth called for a dressing room that was calm, organised, and light. The space connects directly to the master bedroom and en-suite.',
		challenge:
			'Natural light was strong but variable, and the client wanted the space to feel bright in the morning and warm in the evening. Storage had to accommodate an extensive clothing and accessories collection.',
		solution:
			'American walnut joinery is paired with brushed brass handles and a full-height mirror wall. A central island houses watch and jewellery drawers, while sensor-activated LED lighting responds as the client moves through the space.',
		craftNotes:
			'The mirror wall was installed with a hidden aluminium framework to keep the surface perfectly flat. Brass handles were aged in-house to a tone that complements the walnut.',
		makerCredits: [
			"Aoife O'Brien — design consultation",
			'Sean Murphy — lead maker',
			'Installation team — fitting'
		],
		clientOutcome:
			'The client describes the dressing room as feeling like a five-star hotel suite tailored precisely to her routine.',
		relatedServices: ['walk-in-closets', 'custom-wardrobes'],
		specs: {
			client: 'Private Residence',
			location: 'Howth, Co. Dublin',
			category: 'residential',
			scope: 'walk-in-closet',
			materials: 'American Walnut, brushed brass, glass',
			finishes: 'Satin oil, brushed metal',
			hardware: 'Hettich sliding systems, LED sensors',
			timeline: '9 weeks',
			year: 2024
		},
		media: {
			hero: {
				src: '/images/projects/howth-walk-in-closet/hero.jpg',
				alt: 'Boutique-style walk-in closet with walnut island and mirror wall'
			},
			gallery: [
				{
					src: '/images/projects/howth-walk-in-closet/detail-1.jpg',
					alt: 'Central island with glass-top jewellery display'
				},
				{
					src: '/images/projects/howth-walk-in-closet/detail-2.jpg',
					alt: 'Full-height mirror reflecting walnut cabinetry'
				},
				{
					src: '/images/projects/howth-walk-in-closet/detail-3.jpg',
					alt: 'Brushed brass hanging rails and shelving'
				},
				{
					src: '/images/projects/howth-walk-in-closet/detail-4.jpg',
					alt: 'Sensor-activated LED lighting in shelving'
				},
				{
					src: '/images/projects/howth-walk-in-closet/detail-5.jpg',
					alt: 'Shoe display with glass fronts'
				},
				{
					src: '/images/projects/howth-walk-in-closet/detail-6.jpg',
					alt: 'Detail of walnut drawer interior with velvet lining'
				}
			]
		},
		featured: false,
		tags: ['Walk-in Closet', 'Walnut', 'Brass', 'Mirror', 'Sensor Lighting']
	},
	{
		slug: 'dalkey-retail-interior',
		title: 'Dalkey Boutique',
		category: 'commercial',
		location: 'Dalkey, Co. Dublin',
		description:
			'Bespoke display shelving, counter, and fitting-room joinery for an independent boutique.',
		overview:
			'An independent fashion boutique in Dalkey village. The owner wanted an interior that felt curated, with flexibility to change displays by season.',
		challenge:
			'The shop is long and narrow, so sightlines and circulation were critical. Fittings needed to be robust enough for daily use yet light enough to let the products stand out.',
		solution:
			'European oak display shelving with adjustable brass rods allows reconfiguration by season. The counter combines oak with a micro-cement top, and fitting-room doors are full-height mirrors framed in the same timber.',
		craftNotes:
			'Brass rods were drilled through solid oak uprights at precise centres so shelves could be repositioned without visible brackets. Mirror frames were mitred and dowelled for clean corners.',
		makerCredits: [
			"Aoife O'Brien — design consultation",
			'Workshop team — fabrication',
			'Installation team — on-site fitting'
		],
		clientOutcome:
			'The owner reports that the interior photographs beautifully and the adjustable system makes seasonal changes quick and inexpensive.',
		relatedServices: ['retail-interiors'],
		specs: {
			client: 'Independent Boutique',
			location: 'Dalkey, Co. Dublin',
			category: 'commercial',
			scope: 'retail-interior',
			materials: 'European Oak, brass, micro-cement',
			finishes: 'Natural oil, sealed micro-cement, brushed brass',
			hardware: 'Adjustable shelf brackets, concealed hinges',
			timeline: '8 weeks',
			year: 2024
		},
		media: {
			hero: {
				src: '/images/projects/dalkey-retail-interior/hero.jpg',
				alt: 'Boutique interior with oak shelving and micro-cement counter'
			},
			gallery: [
				{
					src: '/images/projects/dalkey-retail-interior/detail-1.jpg',
					alt: 'Display shelving with brass rods and seasonal products'
				},
				{
					src: '/images/projects/dalkey-retail-interior/detail-2.jpg',
					alt: 'Sales counter in oak and micro-cement'
				},
				{
					src: '/images/projects/dalkey-retail-interior/detail-3.jpg',
					alt: 'Fitting-room doors with full-height mirrors'
				},
				{
					src: '/images/projects/dalkey-retail-interior/detail-4.jpg',
					alt: 'Long shop view showing circulation and display rhythm'
				},
				{
					src: '/images/projects/dalkey-retail-interior/detail-5.jpg',
					alt: 'Detail of micro-cement counter edge and brass fixture'
				},
				{
					src: '/images/projects/dalkey-retail-interior/detail-6.jpg',
					alt: 'Window display plinth and shelving'
				}
			]
		},
		featured: false,
		tags: ['Retail', 'Oak', 'Brass', 'Micro-cement', 'Boutique']
	},
	{
		slug: 'malahide-media-wall',
		title: 'Malahide Media Wall',
		category: 'residential',
		location: 'Malahide, Co. Dublin',
		description:
			'Floor-to-ceiling media unit with concealed cable management and integrated storage.',
		overview:
			'A family home in Malahide needed a media wall to house a large screen, soundbar, gaming consoles, and storage — without visible cables.',
		challenge:
			'The wall had multiple socket locations at different heights and the client wanted the unit to feel like architecture rather than furniture. Ventilation for equipment was also essential.',
		solution:
			'We designed a painted floor-to-ceiling unit with oak shelving niches and black steel frames. Push-latch doors conceal storage and cable runs, while ventilation gaps behind equipment keep everything cool and quiet.',
		craftNotes:
			'Cable routing was planned before the unit was built, with removable back panels for future access. Steel frames were powder-coated off-site and fitted last to avoid damage during installation.',
		makerCredits: [
			'Conor Byrne — design',
			'Workshop team — cabinet fabrication',
			'Installation team — on-site assembly'
		],
		clientOutcome:
			'The family gained a clutter-free living room where the technology disappears and the joinery becomes the feature.',
		relatedServices: ['living-spaces'],
		specs: {
			client: 'Private Residence',
			location: 'Malahide, Co. Dublin',
			category: 'residential',
			scope: 'living-space',
			materials: 'Painted finish, oak shelving, black steel',
			finishes: 'Matte painted cabinet, natural oak, powder-coated steel',
			hardware: 'Push-latch doors, soft-close hinges',
			timeline: '7 weeks',
			year: 2024
		},
		media: {
			hero: {
				src: '/images/projects/malahide-media-wall/hero.jpg',
				alt: 'Floor-to-ceiling media wall with painted cabinets and oak shelving'
			},
			gallery: [
				{
					src: '/images/projects/malahide-media-wall/detail-1.jpg',
					alt: 'Media unit with screen and concealed soundbar shelf'
				},
				{
					src: '/images/projects/malahide-media-wall/detail-2.jpg',
					alt: 'Open shelving displaying books and objects'
				},
				{
					src: '/images/projects/malahide-media-wall/detail-3.jpg',
					alt: 'Push-latch cabinet doors with hidden storage'
				},
				{
					src: '/images/projects/malahide-media-wall/detail-4.jpg',
					alt: 'Black steel frame detail around shelving niche'
				},
				{
					src: '/images/projects/malahide-media-wall/detail-5.jpg',
					alt: 'Evening view with ambient shelf lighting'
				},
				{
					src: '/images/projects/malahide-media-wall/detail-6.jpg',
					alt: 'Closed storage cabinets keeping the room clear'
				},
				{
					src: '/images/projects/malahide-media-wall/detail-7.jpg',
					alt: 'Detail of oak and painted cabinet junction'
				}
			]
		},
		featured: false,
		tags: ['Media Wall', 'Painted', 'Oak', 'Living Space', 'Storage']
	}
];
