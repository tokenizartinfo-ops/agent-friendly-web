import { calculateReadiness, normalizePublicUrl } from '../../../lib/methodology.mjs';
import {
  analyzeHome,
  analyzeRobots,
  evidenceFromProbe,
  hasOwnershipEvidence,
  matchesResource,
} from '../../../lib/scanner.mjs';
import {
  assertPublicHostname,
  fetchLimitedPublicUrl,
} from '../../../lib/public-network.mjs';

type Probe = {
  id: string;
  path: string;
  status: number;
  bytes: number;
  contentType: string;
  link: string;
  body: string;
  error?: string;
};

async function probe(
  origin: string,
  validatedHostname: string,
  id: string,
  path: string,
  accept = 'text/html,*/*;q=0.8',
): Promise<Probe> {
  try {
    const response = await fetchLimitedPublicUrl(new URL(path, origin), {
      accept,
      validatedHostname,
    });
    return {
      id,
      path,
      status: response.status,
      bytes: response.bytes,
      contentType: response.contentType,
      link: response.link,
      body: response.body,
    };
  } catch (error) {
    return {
      id,
      path,
      status: 0,
      bytes: 0,
      contentType: '',
      link: '',
      body: '',
      error: error instanceof Error ? error.message : 'No se pudo consultar el recurso.',
    };
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { url?: string };
    const normalized = normalizePublicUrl(body.url);
    const target = new URL(normalized);
    const origin = target.origin;
    await assertPublicHostname(target.hostname);

    const [
      home,
      robots,
      sitemap,
      wpSitemap,
      llms,
      llmsFull,
      mcp,
      mcpServerCard,
      openapi,
      apiOpenapi,
      apiCatalog,
      aiCatalog,
      skills,
      agentSkills,
      markdown,
    ] =
      await Promise.all([
        probe(origin, target.hostname, 'home', '/'),
        probe(origin, target.hostname, 'robots', '/robots.txt', 'text/plain,*/*;q=0.8'),
        probe(origin, target.hostname, 'sitemap', '/sitemap.xml', 'application/xml,text/xml,*/*;q=0.8'),
        probe(origin, target.hostname, 'wp-sitemap', '/wp-sitemap.xml', 'application/xml,text/xml,*/*;q=0.8'),
        probe(origin, target.hostname, 'llms', '/llms.txt', 'text/plain,text/markdown,*/*;q=0.8'),
        probe(origin, target.hostname, 'llms-full', '/llms-full.txt', 'text/plain,text/markdown,*/*;q=0.8'),
        probe(origin, target.hostname, 'mcp', '/.well-known/mcp.json', 'application/json,*/*;q=0.8'),
        probe(origin, target.hostname, 'mcp-server-card', '/.well-known/mcp/server-card.json', 'application/json,*/*;q=0.8'),
        probe(origin, target.hostname, 'openapi', '/openapi.json', 'application/json,*/*;q=0.8'),
        probe(origin, target.hostname, 'api-openapi', '/api/openapi.json', 'application/json,*/*;q=0.8'),
        probe(origin, target.hostname, 'api-catalog', '/.well-known/api-catalog', 'application/linkset+json,application/json,*/*;q=0.8'),
        probe(origin, target.hostname, 'ai-catalog', '/.well-known/ai-catalog.json', 'application/json,*/*;q=0.8'),
        probe(origin, target.hostname, 'skills', '/skills/index.md', 'text/markdown,text/plain,*/*;q=0.8'),
        probe(origin, target.hostname, 'agent-skills', '/.well-known/agent-skills/index.json', 'application/json,*/*;q=0.8'),
        probe(origin, target.hostname, 'markdown', '/', 'text/markdown'),
      ]);

    const homeSignals = analyzeHome(home.body, { link: home.link });
    const robotsSignals = analyzeRobots(robots.body);
    const evidence = {
      robots: matchesResource(robots, 'robots'),
      sitemap: matchesResource(sitemap, 'sitemap') || matchesResource(wpSitemap, 'sitemap'),
      linkHeaders: homeSignals.linkHeaders,
      structuredData: homeSignals.structuredData,
      directAnswers: homeSignals.directAnswers,
      llms: matchesResource(llms, 'llms') || matchesResource(llmsFull, 'llms'),
      markdown:
        homeSignals.markdown ||
        matchesResource(markdown, 'markdown'),
      contentSignals: robotsSignals.contentSignals,
      explicitAiCrawlerPolicy: robotsSignals.explicitAiCrawlerPolicy,
      allowsPublicCrawl: robotsSignals.allowsPublicCrawl,
      mcp: homeSignals.mcp || matchesResource(mcp, 'mcp') || matchesResource(mcpServerCard, 'mcp'),
      openapi: homeSignals.openapi || matchesResource(openapi, 'openapi') || matchesResource(apiOpenapi, 'openapi'),
      apiCatalog: matchesResource(apiCatalog, 'apiCatalog'),
      aiCatalog: matchesResource(aiCatalog, 'aiCatalog'),
      skills: homeSignals.skills || matchesResource(skills, 'skills') || matchesResource(agentSkills, 'agentSkills'),
      webmcp: homeSignals.webmcp,
      ownership: hasOwnershipEvidence(home.body),
      sources: /(<cite|footnote|bibliograph|fuentes|sources|references)/i.test(home.body),
      payments: /\b(x402|payment-required|payment request|machine payment|mpp)\b/i.test(home.body),
    };

    const readiness = calculateReadiness(evidence);
    const probes = [
      home,
      robots,
      sitemap,
      wpSitemap,
      llms,
      llmsFull,
      mcp,
      mcpServerCard,
      openapi,
      apiOpenapi,
      apiCatalog,
      aiCatalog,
      skills,
      agentSkills,
      markdown,
    ]
      .map((item) => ({
        id: item.id,
        path: item.path,
        status: item.status,
        bytes: item.bytes,
        contentType: item.contentType,
        link: item.link,
        error: item.error,
        detected: evidenceFromProbe(item),
      }));

    return Response.json(
      {
        target: origin,
        checkedAt: new Date().toISOString(),
        evidence,
        readiness,
        probes,
        limits: [
          'La auditoria observa recursos publicos; no acredita implementaciones privadas.',
          'WebMCP, llms.txt y pagos agenticos se informan con su estado normativo real.',
          'No se siguen redirecciones ni se solicitan credenciales.',
        ],
      },
      { headers: { 'cache-control': 'no-store' } },
    );
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'No se pudo realizar la auditoria.' },
      { status: 400, headers: { 'cache-control': 'no-store' } },
    );
  }
}
