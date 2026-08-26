// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { calculateReadiness, normalizePublicUrl } from '../../../lib/methodology.mjs';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { analyzeHome, analyzeRobots, evidenceFromProbe, isPrivateIp, matchesResource } from '../../../lib/scanner.mjs';

const MAX_BYTES = 250_000;
const REQUEST_TIMEOUT_MS = 8_000;

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

async function readLimited(response: Response) {
  if (!response.body) return '';
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let output = '';
  let bytes = 0;

  while (bytes < MAX_BYTES) {
    const { value, done } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    output += decoder.decode(value, { stream: true });
    if (bytes >= MAX_BYTES) break;
  }
  await reader.cancel().catch(() => undefined);
  return output.slice(0, MAX_BYTES);
}

async function assertPublicResolution(hostname: string) {
  if (/^[\d.]+$/.test(hostname) || hostname.includes(':')) {
    if (isPrivateIp(hostname)) throw new Error('El destino no es una direccion publica auditable.');
    return;
  }

  const answers = await Promise.all(
    ['A', 'AAAA'].map(async (type) => {
      const response = await fetch(
        `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(hostname)}&type=${type}`,
        { headers: { accept: 'application/dns-json' }, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) },
      );
      if (!response.ok) throw new Error('No se pudo verificar el destino con seguridad.');
      const payload = (await response.json()) as { Answer?: Array<{ type: number; data: string }> };
      return (payload.Answer || [])
        .filter((answer) => answer.type === 1 || answer.type === 28)
        .map((answer) => answer.data);
    }),
  );

  const addresses = answers.flat();
  if (!addresses.length || addresses.some(isPrivateIp)) {
    throw new Error('El destino no tiene una resolucion publica auditable.');
  }
}

async function probe(origin: string, id: string, path: string, accept = 'text/html,*/*;q=0.8'): Promise<Probe> {
  try {
    const response = await fetch(new URL(path, origin), {
      headers: {
        accept,
        'user-agent': 'AgentFriendlyWebAuditor/0.1',
      },
      redirect: 'manual',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    const body = await readLimited(response);
    return {
      id,
      path,
      status: response.status,
      bytes: new TextEncoder().encode(body).byteLength,
      contentType: response.headers.get('content-type') || '',
      link: response.headers.get('link') || '',
      body,
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
    await assertPublicResolution(target.hostname);

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
        probe(origin, 'home', '/'),
        probe(origin, 'robots', '/robots.txt', 'text/plain,*/*;q=0.8'),
        probe(origin, 'sitemap', '/sitemap.xml', 'application/xml,text/xml,*/*;q=0.8'),
        probe(origin, 'wp-sitemap', '/wp-sitemap.xml', 'application/xml,text/xml,*/*;q=0.8'),
        probe(origin, 'llms', '/llms.txt', 'text/plain,text/markdown,*/*;q=0.8'),
        probe(origin, 'llms-full', '/llms-full.txt', 'text/plain,text/markdown,*/*;q=0.8'),
        probe(origin, 'mcp', '/.well-known/mcp.json', 'application/json,*/*;q=0.8'),
        probe(origin, 'mcp-server-card', '/.well-known/mcp/server-card.json', 'application/json,*/*;q=0.8'),
        probe(origin, 'openapi', '/openapi.json', 'application/json,*/*;q=0.8'),
        probe(origin, 'api-openapi', '/api/openapi.json', 'application/json,*/*;q=0.8'),
        probe(origin, 'api-catalog', '/.well-known/api-catalog', 'application/linkset+json,application/json,*/*;q=0.8'),
        probe(origin, 'ai-catalog', '/.well-known/ai-catalog.json', 'application/json,*/*;q=0.8'),
        probe(origin, 'skills', '/skills/index.md', 'text/markdown,text/plain,*/*;q=0.8'),
        probe(origin, 'agent-skills', '/.well-known/agent-skills/index.json', 'application/json,*/*;q=0.8'),
        probe(origin, 'markdown', '/', 'text/markdown'),
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
      ownership: /(@type["']?\s*:\s*["']organization|\/about|\/contact|mailto:|©|copyright)/i.test(home.body),
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
