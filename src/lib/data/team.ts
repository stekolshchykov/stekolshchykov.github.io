import type { TeamMember } from '$lib/types/furniture';

// NOTE: Names below are placeholder examples.
// Replace with real team names and verify roles before launch.

export const team: TeamMember[] = [
	{
		name: 'Conor Byrne',
		role: 'Founder & Lead Designer',
		bio: 'Two decades of designing and building bespoke furniture and interiors for homes and spaces across Ireland.',
		photo: {
			src: '/images/team/founder.jpg',
			alt: 'Portrait of Áras Living founder and lead designer'
		}
	},
	{
		name: 'Niamh Kelly',
		role: 'Workshop Manager',
		bio: 'Ensures every project moves seamlessly from workshop drawings to finished piece, on time and to exacting standards.',
		photo: {
			src: '/images/team/workshop-manager.jpg',
			alt: 'Portrait of Áras Living workshop manager'
		}
	},
	{
		name: 'Sean Murphy',
		role: 'Senior Craftsman',
		bio: 'Specialist in solid timber joinery, veneer work, and the quiet details that distinguish an Áras Living piece.',
		photo: {
			src: '/images/team/senior-craftsman.jpg',
			alt: 'Portrait of Áras Living senior craftsman'
		}
	},
	{
		name: "Aoife O'Brien",
		role: 'Design Consultant',
		bio: 'Guides clients through materials, layouts, and finishes, translating ideas into practical, beautiful designs.',
		photo: {
			src: '/images/team/design-consultant.jpg',
			alt: 'Portrait of Áras Living design consultant'
		}
	}
];
