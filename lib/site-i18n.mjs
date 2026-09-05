export const LOCALES = Object.freeze(['es', 'en', 'pt']);
export const DEFAULT_LOCALE = 'es';

const ROUTES = Object.freeze({
  home: { es: '', en: '', pt: '' },
  guide: { es: 'guia', en: 'guide', pt: 'guia' },
  faq: { es: 'preguntas-frecuentes', en: 'frequently-asked-questions', pt: 'perguntas-frequentes' },
  privacy: { es: 'privacidad', en: 'privacy', pt: 'privacidade' },
  aeo: { es: 'aeo-y-crawlers', en: 'aeo-and-crawlers', pt: 'aeo-e-crawlers' },
  sectors: { es: 'sectores', en: 'sectors', pt: 'setores' },
  evolution: { es: 'evolucion-agentica', en: 'agentic-evolution', pt: 'evolucao-agentica' },
  methodology: { es: 'metodologia', en: 'methodology', pt: 'metodologia' },
  measurement: { es: 'medir-mejora', en: 'measure-improvement', pt: 'medir-melhoria' },
  assistant: { es: 'asistente', en: 'assistant', pt: 'assistente' },
  openKnowledge: { es: 'conocimiento-abierto', en: 'open-knowledge', pt: 'conhecimento-aberto' },
  registry: { es: 'registry', en: 'registry', pt: 'registry' },
  registryProfile: { es: 'registry/:slug', en: 'registry/:slug', pt: 'registry/:slug' },
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
  for (const parameter of path.matchAll(/:([A-Za-z][A-Za-z0-9]*)/g)) {
    const value = options[parameter[1]];
    if (typeof value !== 'string' || !SAFE_PARAM.test(value)) return null;
    path = path.replace(parameter[0], value);
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
    if (!template.includes(':') && joined === template) {
      return { locale: safeLocale, routeKey, params: {} };
    }
    if (template.includes(':')) {
      const expected = template.split('/');
      if (segments.length !== expected.length) continue;
      const params = {};
      let matches = true;
      for (let index = 0; index < expected.length; index += 1) {
        const part = expected[index];
        if (part.startsWith(':')) {
          if (!SAFE_PARAM.test(segments[index])) { matches = false; break; }
          params[part.slice(1)] = segments[index];
        } else if (part !== segments[index]) {
          matches = false;
          break;
        }
      }
      if (matches) return { locale: safeLocale, routeKey, params };
    }
  }
  return null;
}

export function routeEntries() {
  return Object.entries(ROUTES).map(([routeKey, paths]) => ({ routeKey, ...paths }));
}
