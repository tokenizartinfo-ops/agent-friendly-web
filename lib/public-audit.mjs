import { calculateReadiness, normalizePublicUrl } from './methodology.mjs';
import {
  analyzeHome,
  analyzeRobots,
  evidenceFromProbe,
  hasOwnershipEvidence,
  matchesResource,
} from './scanner.mjs';
import { assertPublicHostname, fetchLimitedPublicUrl } from './public-network.mjs';

export const PUBLIC_AUDIT_PROBES = Object.freeze([
  Object.freeze({ id: 'home', path: '/', accept: 'text/html,*/*;q=0.8' }),
  Object.freeze({ id: 'robots', path: '/robots.txt', accept: 'text/plain,*/*;q=0.8' }),
  Object.freeze({ id: 'sitemap', path: '/sitemap.xml', accept: 'application/xml,text/xml,*/*;q=0.8' }),
  Object.freeze({ id: 'wp-sitemap', path: '/wp-sitemap.xml', accept: 'application/xml,text/xml,*/*;q=0.8' }),
  Object.freeze({ id: 'llms', path: '/llms.txt', accept: 'text/plain,text/markdown,*/*;q=0.8' }),
  Object.freeze({ id: 'llms-full', path: '/llms-full.txt', accept: 'text/plain,text/markdown,*/*;q=0.8' }),
  Object.freeze({ id: 'mcp', path: '/.well-known/mcp.json', accept: 'application/json,*/*;q=0.8' }),
  Object.freeze({ id: 'mcp-server-card', path: '/.well-known/mcp/server-card.json', accept: 'application/json,*/*;q=0.8' }),
  Object.freeze({ id: 'openapi', path: '/openapi.json', accept: 'application/json,*/*;q=0.8' }),
  Object.freeze({ id: 'api-openapi', path: '/api/openapi.json', accept: 'application/json,*/*;q=0.8' }),
  Object.freeze({ id: 'api-catalog', path: '/.well-known/api-catalog', accept: 'application/linkset+json,application/json,*/*;q=0.8' }),
  Object.freeze({ id: 'ai-catalog', path: '/.well-known/ai-catalog.json', accept: 'application/json,*/*;q=0.8' }),
  Object.freeze({ id: 'skills', path: '/skills/index.md', accept: 'text/markdown,text/plain,*/*;q=0.8' }),
  Object.freeze({ id: 'agent-skills', path: '/.well-known/agent-skills/index.json', accept: 'application/json,*/*;q=0.8' }),
  Object.freeze({ id: 'markdown', path: '/', accept: 'text/markdown' }),
]);

async function probe(origin, validatedHostname, id, path, accept) {
  try {
    const response = await fetchLimitedPublicUrl(new URL(path, origin), { accept, validatedHostname });
    return { id, path, status: response.status, bytes: response.bytes, contentType: response.contentType, link: response.link, body: response.body };
  } catch (error) {
    return {
      id, path, status: 0, bytes: 0, contentType: '', link: '', body: '',
      error: error instanceof Error ? error.message : 'No se pudo consultar el recurso.',
    };
  }
}

export async function runPublicAudit(input) {
  const normalized = normalizePublicUrl(input);
  const target = new URL(normalized);
  const origin = target.origin;
  await assertPublicHostname(target.hostname);

  const probes = await Promise.all(
    PUBLIC_AUDIT_PROBES.map(({ id, path, accept }) => probe(origin, target.hostname, id, path, accept)),
  );
  const byId = Object.fromEntries(probes.map((item) => [item.id, item]));
  const homeSignals = analyzeHome(byId.home.body, { link: byId.home.link });
  const robotsSignals = analyzeRobots(byId.robots.body);
  const evidence = {
    robots: matchesResource(byId.robots, 'robots'),
    sitemap: matchesResource(byId.sitemap, 'sitemap') || matchesResource(byId['wp-sitemap'], 'sitemap'),
    linkHeaders: homeSignals.linkHeaders,
    structuredData: homeSignals.structuredData,
    directAnswers: homeSignals.directAnswers,
    llms: matchesResource(byId.llms, 'llms') || matchesResource(byId['llms-full'], 'llms'),
    markdown: homeSignals.markdown || matchesResource(byId.markdown, 'markdown'),
    contentSignals: robotsSignals.contentSignals,
    explicitAiCrawlerPolicy: robotsSignals.explicitAiCrawlerPolicy,
    allowsPublicCrawl: robotsSignals.allowsPublicCrawl,
    mcp: homeSignals.mcp || matchesResource(byId.mcp, 'mcp') || matchesResource(byId['mcp-server-card'], 'mcp'),
    openapi: homeSignals.openapi || matchesResource(byId.openapi, 'openapi') || matchesResource(byId['api-openapi'], 'openapi'),
    apiCatalog: matchesResource(byId['api-catalog'], 'apiCatalog'),
    aiCatalog: matchesResource(byId['ai-catalog'], 'aiCatalog'),
    skills: homeSignals.skills || matchesResource(byId.skills, 'skills') || matchesResource(byId['agent-skills'], 'agentSkills'),
    webmcp: homeSignals.webmcp,
    ownership: hasOwnershipEvidence(byId.home.body),
    sources: /(<cite|footnote|bibliograph|fuentes|sources|references)/i.test(byId.home.body),
    payments: /\b(x402|payment-required|payment request|machine payment|mpp)\b/i.test(byId.home.body),
  };

  return {
    target: origin,
    checkedAt: new Date().toISOString(),
    evidence,
    readiness: calculateReadiness(evidence),
    probes: probes.map((item) => ({
      id: item.id, path: item.path, status: item.status, bytes: item.bytes,
      contentType: item.contentType, link: item.link, error: item.error,
      detected: evidenceFromProbe(item),
    })),
    limits: [
      'La auditoria observa recursos publicos; no acredita implementaciones privadas.',
      'WebMCP, llms.txt y pagos agenticos se informan con su estado normativo real.',
      'No se siguen redirecciones ni se solicitan credenciales.',
    ],
  };
}

function safeBooleanObject(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(([, item]) => typeof item === 'boolean').slice(0, 80));
}

function safeReadiness(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const categories = {};
  if (value.categories && typeof value.categories === 'object' && !Array.isArray(value.categories)) {
    for (const [key, category] of Object.entries(value.categories).slice(0, 20)) {
      if (!category || typeof category !== 'object' || Array.isArray(category)) continue;
      categories[String(key).slice(0, 80)] = {
        label: String(category.label || '').slice(0, 120),
        score: Number.isFinite(category.score) ? category.score : 0,
        weight: Number.isFinite(category.weight) ? category.weight : 0,
        status: String(category.status || '').slice(0, 40),
      };
    }
  }
  return {
    methodology: String(value.methodology || '').slice(0, 160),
    score: Number.isFinite(value.score) ? Math.max(0, Math.min(100, Math.round(value.score))) : 0,
    level: String(value.level || '').slice(0, 80),
    categories,
  };
}

function safeTarget(value) {
  try {
    const url = new URL(String(value || ''));
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error();
    return url.origin;
  } catch {
    throw new Error('Observation target must be a public HTTP URL');
  }
}

export function sanitizeObservation(audit = {}) {
  return {
    target: safeTarget(audit.target),
    checkedAt: new Date(audit.checkedAt || Date.now()).toISOString(),
    evidence: safeBooleanObject(audit.evidence),
    readiness: safeReadiness(audit.readiness),
    probes: Array.isArray(audit.probes) ? audit.probes.slice(0, 40).map((item) => ({
      id: String(item?.id || '').slice(0, 80),
      path: String(item?.path || '').slice(0, 300),
      status: Number.isFinite(item?.status) ? item.status : 0,
      bytes: Number.isFinite(item?.bytes) ? item.bytes : 0,
      contentType: String(item?.contentType || '').slice(0, 160),
      link: String(item?.link || '').slice(0, 1000),
      detected: item?.detected === true,
    })) : [],
    limits: Array.isArray(audit.limits)
      ? audit.limits.map((item) => String(item || '').slice(0, 500)).filter(Boolean).slice(0, 12)
      : [],
  };
}
