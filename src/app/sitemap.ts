import type { MetadataRoute } from 'next'



export default function sitemap(): MetadataRoute.Sitemap {
  const url = process.env.NEXT_PUBLIC_DOMAIN || 'undefined';

  return [
    {
      url: url,
      lastModified: new Date(),
    },
    {
      url: url + '/poll/create',
      lastModified: new Date(),
    },
    {
      url: url + '/poll/mine',
      lastModified: new Date(),
    },
  ]
}
