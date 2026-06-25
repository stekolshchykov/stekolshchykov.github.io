import type { Showroom } from '$lib/types/furniture';

export const showroom: Showroom = {
	address: 'Unit 4B, The Glassworks, Dublin Industrial Estate, Dublin 3, D03 X123, Ireland',
	location: 'Dublin 3',
	directions:
		'The Glassworks is ten minutes from Dublin city centre by car and is served by regular bus routes along the North Strand. Visitor parking is available at the front of the building.',
	hours: {
		monday: 'By appointment',
		tuesday: '09:30 – 17:30',
		wednesday: '09:30 – 17:30',
		thursday: '09:30 – 17:30',
		friday: '09:30 – 17:30',
		saturday: '10:00 – 14:00',
		sunday: 'Closed'
	},
	atmosphere:
		'The showroom is arranged as a series of quiet rooms rather than a conventional trade space. Full-size kitchen, wardrobe, and library installations sit alongside material sample walls, so clients can open drawers, feel handles, and see how timber responds to natural light.',
	spotlights: [
		{
			name: 'Conor Byrne',
			role: 'Founder & Lead Designer',
			quote:
				'Every piece begins with the room. I want people to leave the showroom thinking about how they actually live, not just how a photograph looks.',
			image: {
				src: '/images/showroom/conor-byrne.webp',
				alt: 'Conor Byrne in the Áras Living showroom'
			}
		},
		{
			name: 'Niamh Kelly',
			role: 'Workshop Manager',
			quote:
				'My job is to make sure that what the client falls in love with in the showroom is exactly what we deliver to their home.',
			image: {
				src: '/images/showroom/niamh-kelly.webp',
				alt: 'Niamh Kelly discussing material samples'
			}
		},
		{
			name: 'Sean Murphy',
			role: 'Senior Craftsman',
			quote:
				'The small details are what separate good joinery from furniture you want to keep touching. We show those details openly here.',
			image: {
				src: '/images/showroom/sean-murphy.webp',
				alt: 'Sean Murphy beside a finished cabinet'
			}
		}
	],
	bookingCta:
		'Appointments are recommended so we can give you our full attention and have relevant samples ready. Walk-ins are welcome on Saturday mornings.',
	virtualTourTeaser:
		'Not in Dublin? Our virtual showroom tour lets you explore the main displays and material library from your own screen. A member of the team can join the call to answer questions.'
};
