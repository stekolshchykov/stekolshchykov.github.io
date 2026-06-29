export type ProjectCategory = 'residential' | 'commercial';

export type ProjectScope =
	| 'wardrobe'
	| 'kitchen'
	| 'walk-in-closet'
	| 'living-space'
	| 'office-fit-out'
	| 'retail-interior'
	| 'hospitality'
	| 'custom-solution';

export interface MediaItem {
	src: string;
	alt: string;
	caption?: string;
	type?: 'image' | 'video';
	poster?: string;
}

export interface ProjectSpecs {
	client: string;
	location: string;
	category: ProjectCategory;
	scope: ProjectScope;
	materials: string;
	finishes: string;
	hardware: string;
	timeline: string;
	year: number;
}

export interface Project {
	slug: string;
	title: string;
	category: ProjectCategory;
	location: string;
	description: string;
	overview: string;
	challenge: string;
	solution: string;
	specs: ProjectSpecs;
	media: {
		hero: MediaItem;
		gallery: MediaItem[];
		video?: MediaItem;
	};
	featured: boolean;
	tags: string[];
	// v3 enrichment
	craftNotes?: string;
	makerCredits?: string[];
	clientOutcome?: string;
	relatedServices?: string[];
}

export interface Service {
	id: string;
	title: string;
	description: string;
	features: string[];
	image: MediaItem;
	category: ProjectCategory;
	// v3 enrichment
	longDescription?: string;
	process?: string[];
	deliverables?: string[];
	relatedMaterials?: string[];
	gallery?: MediaItem[];
	testimonial?: Testimonial;
}

export interface Material {
	id: string;
	name: string;
	description: string;
	image: MediaItem;
}

export type MaterialFamily =
	| 'solid timbers'
	| 'veneers'
	| 'painted & lacquered'
	| 'stone & composite'
	| 'metals & leather';

export interface MaterialDetailed {
	id: string;
	name: string;
	family: MaterialFamily;
	tagline: string;
	description: string;
	origin: string;
	characteristics: string[];
	bestFor: string[];
	maintenance: string;
	sustainability: string;
	images: {
		swatch: MediaItem;
		application: MediaItem;
		detail: MediaItem;
	};
}

export interface ProcessMoment {
	id: string;
	number: number;
	title: string;
	subtitle: string;
	description: string;
	paragraphs: string[];
	craftNote: string;
	image: MediaItem;
	duration: string;
}

export interface InsightSection {
	heading: string;
	paragraphs: string[];
}

export interface Insight {
	slug: string;
	title: string;
	excerpt: string;
	category: string;
	date: string;
	readTime: string;
	author: string;
	heroImage: MediaItem;
	body: InsightSection[];
	quote: {
		text: string;
		attribution?: string;
	};
	relatedProjects: string[];
}

export interface FAQItem {
	id: string;
	category: string;
	question: string;
	answer: string;
}

export interface ServiceDetail {
	serviceId: string;
	longDescription: string;
	process: string[];
	deliverables: string[];
	relatedMaterials: string[];
	gallery: MediaItem[];
	testimonial: Testimonial;
}

export interface Testimonial {
	quote: string;
	name: string;
	location: string;
}

export interface TeamMember {
	name: string;
	role: string;
	bio: string;
	photo: MediaItem;
}

export interface ProcessStep {
	number: number;
	title: string;
	description: string;
}

export interface WhyUsItem {
	id: string;
	title: string;
	description: string;
	icon: string;
}

export interface SocialLink {
	platform: string;
	url: string;
	handle: string;
}

export interface BusinessHours {
	monday: string;
	tuesday: string;
	wednesday: string;
	thursday: string;
	friday: string;
	saturday: string;
	sunday: string;
}

export interface SiteConfig {
	brand: string;
	tagline: string;
	subTagline: string;
	ctaLabel: string;
	footerCta: string;
	companyLegalName: string;
	address: string;
	email: string;
	phone: string;
	whatsapp: string;
	businessHours: BusinessHours;
	social: SocialLink[];
	seo: {
		titleTemplate: string;
		defaultTitle: string;
		defaultDescription: string;
		defaultImage: string;
		siteUrl: string;
		twitterHandle: string;
	};
}
