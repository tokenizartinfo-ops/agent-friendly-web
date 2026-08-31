export const LOCALES = Object.freeze(['es', 'en', 'pt']);
export const DEFAULT_LOCALE = 'es';

const ROUTES = Object.freeze({
  home: { es: '', en: '', pt: '' },
  guide: { es: 'guia', en: 'guide', pt: 'guia' },
  aeo: { es: 'aeo-y-crawlers', en: 'aeo-and-crawlers', pt: 'aeo-e-crawlers' },
  sectors: { es: 'sectores', en: 'sectors', pt: 'setores' },
  evolution: { es: 'evolucion-agentica', en: 'agentic-evolution', pt: 'evolucao-agentica' },
  methodology: { es: 'metodologia', en: 'methodology', pt: 'metodologia' },
  measurement: { es: 'medir-mejora', en: 'measure-improvement', pt: 'medir-melhoria' },
  assistant: { es: 'asistente', en: 'assistant', pt: 'assistente' },
  openKnowledge: { es: 'conocimiento-abierto', en: 'open-knowledge', pt: 'conhecimento-aberto' },
  registry: { es: 'registry', en: 'registry', pt: 'registry' },
  cli: { es: 'cli', en: 'cli', pt: 'cli' },
  mcp: { es: 'mcp-readonly', en: 'mcp-readonly', pt: 'mcp-readonly' },
  externalVerification: { es: 'verificacion-externa', en: 'external-verification', pt: 'verificacao-externa' },
  tokenizartCase: { es: 'casos/tokenizart', en: 'cases/tokenizart', pt: 'casos/tokenizart' },
  siteMap: { es: 'mapa-del-sitio', en: 'site-map', pt: 'mapa-do-site' },
  dossier: { es: 'expediente', en: 'dossier', pt: 'dossie' },
  capsule: { es: 'capsula/:projectId', en: 'capsule/:projectId', pt: 'capsula/:projectId' },
});

const SAFE_FRAGMENT = /^[a-z0-9][a-z0-9_-]{0,63}$/i;
const SAFE_PARAM = /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,127}$/;

export function normalizeLocale(value) {
  if (typeof value !== 'string') return null;
  const candidate = value.trim().toLowerCase();
  if (candidate === 'pt-br' || candidate === 'pt-pt') return 'pt';
  if (candidate === 'es-ar' || candidate === 'es-es') return 'es';
  return LOCALES.includes(candidate) ? candidate : null;
}

export function localizedPath(routeKey, locale, options = {}) {
  const safeLocale = normalizeLocale(locale);
  const route = ROUTES[routeKey];
  if (!safeLocale || !route) return null;
  let path = route[safeLocale];
  if (path.includes(':projectId')) {
    const projectId = options.projectId;
    if (typeof projectId !== 'string' || !SAFE_PARAM.test(projectId)) return null;
    path = path.replace(':projectId', projectId);
  }
  const prefix = safeLocale === DEFAULT_LOCALE ? '' : `/${safeLocale}`;
  const pathname = path ? `${prefix}/${path}` : prefix || '/';
  const hash = typeof options.hash === 'string' && SAFE_FRAGMENT.test(options.hash) ? `#${options.hash}` : '';
  return `${pathname}${hash}`;
}

export function languageAlternates(routeKey, options = {}) {
  const es = localizedPath(routeKey, 'es', options);
  const en = localizedPath(routeKey, 'en', options);
  const pt = localizedPath(routeKey, 'pt', options);
  if (!es || !en || !pt) return null;
  return { es, en, pt, 'x-default': es };
}

export function resolveLocalizedRoute(locale, segments) {
  const safeLocale = normalizeLocale(locale);
  if (!safeLocale || safeLocale === DEFAULT_LOCALE || !Array.isArray(segments)) return null;
  const joined = segments.join('/');
  for (const [routeKey, route] of Object.entries(ROUTES)) {
    const template = route[safeLocale];
    if (!template.includes(':projectId') && joined === template) {
      return { locale: safeLocale, routeKey, params: {} };
    }
    if (template.includes(':projectId')) {
      const [prefix] = template.split('/:projectId');
      if (segments.length === 2 && segments[0] === prefix && SAFE_PARAM.test(segments[1])) {
        return { locale: safeLocale, routeKey, params: { projectId: segments[1] } };
      }
    }
  }
  return null;
}

export function routeEntries() {
  return Object.entries(ROUTES).map(([routeKey, paths]) => ({ routeKey, ...paths }));
}
