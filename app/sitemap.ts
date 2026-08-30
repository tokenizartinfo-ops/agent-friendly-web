import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://agentfriendlyweb.dev';
  return [
    { url: base, lastModified: new Date('2026-08-26'), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/aeo-y-crawlers`, lastModified: new Date('2026-08-27'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/sectores`, lastModified: new Date('2026-08-27'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/en/sectors`, lastModified: new Date('2026-08-27'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/pt/setores`, lastModified: new Date('2026-08-27'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/medir-mejora`, lastModified: new Date('2026-08-27'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/asistente`, lastModified: new Date('2026-08-27'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/guia`, lastModified: new Date('2026-08-27'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/conocimiento-abierto`, lastModified: new Date('2026-08-27'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/metodologia`, lastModified: new Date('2026-08-26'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/evolucion-agentica`, lastModified: new Date('2026-08-26'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/registry`, lastModified: new Date('2026-08-27'), changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/cli`, lastModified: new Date('2026-08-27'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/mcp-readonly`, lastModified: new Date('2026-08-28'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/verificacion-externa`, lastModified: new Date('2026-08-30'), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/casos/tokenizart`, lastModified: new Date('2026-08-26'), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/mapa-del-sitio`, lastModified: new Date('2026-08-26'), changeFrequency: 'monthly', priority: 0.7 },
  ];
}
