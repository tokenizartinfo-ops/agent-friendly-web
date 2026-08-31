import { HOME_COPY } from './home-copy.mjs';
import { privateUiCopy } from './private-ui-copy.mjs';
import { publicPageCopy } from './public-page-copy.mjs';
import { publicToolsCopy } from './public-tools-copy.mjs';
import { SECTOR_CONTENT } from './sector-content.mjs';
import { languageAlternates, localizedPath, normalizeLocale } from './site-i18n.mjs';

const PRIVATE_ROUTE_KEYS = new Set(['dossier', 'capsule']);

function routeCopy(routeKey, locale) {
  const page = publicPageCopy(routeKey, locale);
  if (page) return { title: page.title, description: page.intro };
  if (routeKey === 'home') return { title: HOME_COPY[locale].title, description: HOME_COPY[locale].intro };
  if (routeKey === 'sectors') return { title: SECTOR_CONTENT[locale].title, description: SECTOR_CONTENT[locale].intro };

  const tools = publicToolsCopy(locale);
  if (routeKey === 'guide') return { title: tools.guide.title, description: tools.guide.intro };
  if (routeKey === 'measurement') return { title: tools.measure.title, description: tools.measure.intro };
  if (routeKey === 'assistant') return { title: tools.assistant.title, description: tools.assistant.intro };

  const privateCopy = privateUiCopy(locale);
  if (routeKey === 'registry') return { title: privateCopy.registry.title, description: privateCopy.registry.intro };
  if (routeKey === 'registryProfile') return { title: privateCopy.profile.publicProfile, description: privateCopy.profile.identityBody };
  if (routeKey === 'dossier') return { title: privateCopy.dossier.title, description: privateCopy.dossier.intro };
  if (routeKey === 'capsule') return { title: privateCopy.capsule.pageTitle, description: privateCopy.capsule.pageIntro };
  return null;
}

export function localizedRouteMetadata(routeKey, locale, params = {}) {
  const safeLocale = normalizeLocale(locale);
  const canonical = safeLocale ? localizedPath(routeKey, safeLocale, params) : null;
  const languages = languageAlternates(routeKey, params);
  const copy = safeLocale ? routeCopy(routeKey, safeLocale) : null;
  if (!safeLocale || !canonical || !languages || !copy) return {};

  const privateRoute = PRIVATE_ROUTE_KEYS.has(routeKey);
  return {
    title: `${copy.title} | Agent Friendly Web`,
    description: copy.description,
    alternates: { canonical, languages },
    robots: privateRoute ? { index: false, follow: false } : undefined,
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: canonical,
      locale: safeLocale === 'en' ? 'en_US' : safeLocale === 'pt' ? 'pt_BR' : 'es_AR',
      images: [{ url: '/og.png', width: 1728, height: 909, alt: 'Agent Friendly Web' }],
    },
  };
}
