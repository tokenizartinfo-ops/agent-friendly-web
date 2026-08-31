import type { MetadataRoute } from 'next';
import { localizedPath, routeEntries } from '../lib/site-i18n.mjs';

export const PUBLIC_SITEMAP_ROUTE_KEYS = Object.freeze([
  'home', 'guide', 'faq', 'aeo', 'sectors', 'evolution', 'methodology', 'measurement',
  'assistant', 'openKnowledge', 'registry', 'cli', 'mcp', 'externalVerification',
  'tokenizartCase', 'siteMap',
]);

const priorities: Record<string, number> = {
  home: 1, guide: 0.9, faq: 0.9, aeo: 0.9, sectors: 0.9, registry: 0.8,
};

function absolute(base: string, path: string | null) {
  return `${base}${path === '/' ? '' : path || ''}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://agentfriendlyweb.dev';
  const declaredRoutes = new Set(routeEntries().map(({ routeKey }) => routeKey));
  return PUBLIC_SITEMAP_ROUTE_KEYS
    .filter((routeKey) => declaredRoutes.has(routeKey))
    .flatMap((routeKey) => (['es', 'en', 'pt'] as const).map((locale) => ({
      url: absolute(base, localizedPath(routeKey, locale)),
      lastModified: new Date('2026-08-31'),
      changeFrequency: routeKey === 'registry' ? 'daily' as const : 'weekly' as const,
      priority: priorities[routeKey] || 0.8,
      alternates: {
        languages: {
          es: absolute(base, localizedPath(routeKey, 'es')),
          en: absolute(base, localizedPath(routeKey, 'en')),
          pt: absolute(base, localizedPath(routeKey, 'pt')),
        },
      },
    })));
}
