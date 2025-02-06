import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	const url = process.env.NEXT_PUBLIC_DOMAIN || 'undefined';
	return {
		rules: {
			userAgent: '*',
			allow: ['/', 'poll/create', 'poll/mine', 'poll/[id]/results'],
			// disallow: '/',
		},
		sitemap: url + '/sitemap.xml',
	}
}