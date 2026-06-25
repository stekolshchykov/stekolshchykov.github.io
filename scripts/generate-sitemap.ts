import { writeFileSync } from 'node:fs';
import { projects } from '../src/lib/data/projects';
import { materialsDetailed } from '../src/lib/data/materialsDetailed';
import { insights } from '../src/lib/data/insights';
import { services } from '../src/lib/data/services';

const SITE_URL = process.env.PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://arasliving.ie';
const TODAY = new Date().toISOString().split('T')[0];

interface SitemapUrl {
	loc: string;
	lastmod: string;
	changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
	priority: string;
}

const staticRoutes: SitemapUrl[] = [
	{ loc: '/', lastmod: TODAY, changefreq: 'weekly', priority: '1.0' },
	{ loc: '/about/', lastmod: TODAY, changefreq: 'monthly', priority: '0.7' },
	{ loc: '/services/', lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
	{ loc: '/projects/', lastmod: TODAY, changefreq: 'weekly', priority: '0.8' },
	{ loc: '/contact/', lastmod: TODAY, changefreq: 'monthly', priority: '0.7' },
	{ loc: '/materials/', lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
	{ loc: '/process/', lastmod: TODAY, changefreq: 'monthly', priority: '0.7' },
	{ loc: '/showroom/', lastmod: TODAY, changefreq: 'monthly', priority: '0.7' },
	{ loc: '/commercial/', lastmod: TODAY, changefreq: 'monthly', priority: '0.7' },
	{ loc: '/insights/', lastmod: TODAY, changefreq: 'weekly', priority: '0.7' },
	{ loc: '/faq/', lastmod: TODAY, changefreq: 'monthly', priority: '0.6' },
	{ loc: '/privacy/', lastmod: TODAY, changefreq: 'yearly', priority: '0.3' },
	{ loc: '/terms/', lastmod: TODAY, changefreq: 'yearly', priority: '0.3' },
	{ loc: '/cookies/', lastmod: TODAY, changefreq: 'yearly', priority: '0.3' }
];

const projectRoutes: SitemapUrl[] = projects.map((project) => ({
	loc: `/projects/${project.slug}/`,
	lastmod: TODAY,
	changefreq: 'monthly',
	priority: project.featured ? '0.9' : '0.6'
}));

const materialRoutes: SitemapUrl[] = materialsDetailed.map((material) => ({
	loc: `/materials/${material.id}/`,
	lastmod: TODAY,
	changefreq: 'monthly',
	priority: '0.6'
}));

const insightRoutes: SitemapUrl[] = insights.map((article) => ({
	loc: `/insights/${article.slug}/`,
	lastmod: TODAY,
	changefreq: 'monthly',
	priority: '0.6'
}));

const serviceRoutes: SitemapUrl[] = services.map((service) => ({
	loc: `/services/${service.id}/`,
	lastmod: TODAY,
	changefreq: 'monthly',
	priority: '0.6'
}));

const allRoutes = [
	...staticRoutes,
	...projectRoutes,
	...materialRoutes,
	...insightRoutes,
	...serviceRoutes
];

function escapeXml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

function buildSitemap(urls: SitemapUrl[]): string {
	const urlEntries = urls
		.map(
			(url) =>
				`  <url>\n` +
				`    <loc>${escapeXml(`${SITE_URL}${url.loc}`)}</loc>\n` +
				`    <lastmod>${url.lastmod}</lastmod>\n` +
				`    <changefreq>${url.changefreq}</changefreq>\n` +
				`    <priority>${url.priority}</priority>\n` +
				`  </url>`
		)
		.join('\n');

	return (
		`<?xml version="1.0" encoding="UTF-8"?>\n` +
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
		`${urlEntries}\n` +
		`</urlset>\n`
	);
}

const sitemap = buildSitemap(allRoutes);
writeFileSync('static/sitemap.xml', sitemap, 'utf-8');

console.log(`Generated static/sitemap.xml with ${allRoutes.length} URLs.`);
