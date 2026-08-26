import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://agentfriendlyweb.dev';
  return [
    { url: base, lastModified: new Date('2026-08-26'), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/metodologia`, lastModified: new Date('2026-08-26'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/casos/tokenizart`, lastModified: new Date('2026-08-26'), changeFrequency: 'weekly', priority: 0.8 },
  ];
}
