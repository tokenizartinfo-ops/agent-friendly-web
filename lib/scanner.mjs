const contains = (value, pattern) => pattern.test(String(value || ''));

export function isPrivateIp(value = '') {
  const ip = String(value).trim().toLowerCase().replace(/^\[|\]$/g, '');
  const parts = ip.split('.').map(Number);

  if (parts.length === 4 && parts.every((part) => Number.isInteger(part) && part >= 0 && part <= 255)) {
    const [a, b] = parts;
    return (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      a >= 224
    );
  }

  if (ip.includes(':')) {
    if (ip === '::' || ip === '::1') return true;
    if (ip.startsWith('fc') || ip.startsWith('fd') || /^fe[89ab]/.test(ip)) return true;
    if (ip.startsWith('::ffff:')) return isPrivateIp(ip.slice(7));
  }

  return false;
}

export function analyzeHome(html = '', headers = {}) {
  const source = String(html);
  const linkHeader = String(headers.link || headers.Link || '');

  return {
    structuredData: contains(source, /<script[^>]+type=["']application\/ld\+json["']/i),
    directAnswers:
      contains(source, /<(h1|h2|h3)[^>]*>[^<]*(how|what|why|como|que|por que|para que)[^<]*<\//i) &&
      contains(source, /<p[^>]*>[^<]{24,}<\/p>/i),
    linkHeaders: contains(linkHeader, /rel\s*=\s*["']?(sitemap|alternate|describedby)/i),
    markdown:
      contains(source, /type=["']text\/markdown["']/i) ||
      contains(linkHeader, /type\s*=\s*["']?text\/markdown/i),
    mcp: contains(source, /(\.well-known\/mcp(\.json|\/server-card\.json)|model context protocol|\bmcp server\b)/i),
    openapi: contains(source, /(openapi\.json|swagger\.json|openapi\s*[:=])/i),
    skills: contains(source, /(skills\.md|\/skills\/|agent skill)/i),
    webmcp: contains(source, /(webmcp|navigator\.modelContext|model-context)/i),
  };
}

export function analyzeRobots(body = '') {
  const source = String(body);
  const groups = [];
  let current = null;

  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.replace(/\s+#.*$/, '').trim();
    if (!line) continue;

    const userAgent = line.match(/^user-agent\s*:\s*(.+)$/i);
    if (userAgent) {
      if (!current || current.directives.length > 0) {
        current = { agents: [], directives: [] };
        groups.push(current);
      }
      current.agents.push(userAgent[1].trim().toLowerCase());
      continue;
    }

    if (current) current.directives.push(line);
  }

  const wildcardGroups = groups.filter((group) => group.agents.includes('*'));
  const wildcardDirectives = wildcardGroups.flatMap((group) => group.directives);
  const wildcardBlocksAll =
    wildcardDirectives.some((line) => /^disallow\s*:\s*\/$/i.test(line)) &&
    !wildcardDirectives.some((line) => /^allow\s*:\s*\/$/i.test(line));

  return {
    contentSignals: /content-signal\s*:\s*[^\r\n]*(search|ai-input|ai-train)\s*=\s*(yes|no)/i.test(source),
    explicitAiCrawlerPolicy:
      /user-agent\s*:\s*(gptbot|oai-searchbot|chatgpt-user|claudebot|claude-searchbot|claude-user|perplexitybot|perplexity-user|google-extended|applebot-extended|amazonbot|meta-externalagent|cohere-ai|ccbot)/i.test(source),
    allowsPublicCrawl: wildcardGroups.length > 0 && !wildcardBlocksAll,
  };
}

export function evidenceFromProbe(probe = {}) {
  return Number(probe.status) >= 200 && Number(probe.status) < 300 && Number(probe.bytes) > 0;
}

export function matchesResource(probe = {}, kind = '') {
  if (!evidenceFromProbe(probe)) return false;
  const contentType = String(probe.contentType || '').toLowerCase();
  const body = String(probe.body || '').trim();

  if (kind === 'robots') return /user-agent\s*:/i.test(body) && !contentType.includes('text/html');
  if (kind === 'sitemap') return /<(urlset|sitemapindex)(\s|>)/i.test(body) && /(xml|text\/plain)/i.test(contentType);
  if (kind === 'llms') return !contentType.includes('text/html') && /^#\s+\S/m.test(body);
  if (kind === 'mcp') {
    if (!contentType.includes('json')) return false;
    try {
      const parsed = JSON.parse(body);
      return Boolean(
        parsed &&
        typeof parsed === 'object' &&
        (
          'mcp' in parsed ||
          'servers' in parsed ||
          'tools' in parsed ||
          (typeof parsed.name === 'string' && Array.isArray(parsed.transports))
        ),
      );
    } catch {
      return false;
    }
  }
  if (kind === 'openapi') {
    if (!contentType.includes('json') && !/ya?ml|text\/plain/.test(contentType)) return false;
    return /["']?(openapi|swagger)["']?\s*[:=]/i.test(body);
  }
  if (kind === 'skills') return !contentType.includes('text/html') && /(skill|instructions|capabilit)/i.test(body);
  if (kind === 'agentSkills') {
    if (!contentType.includes('json')) return false;
    try {
      const parsed = JSON.parse(body);
      return Boolean(parsed && typeof parsed === 'object' && Array.isArray(parsed.skills));
    } catch {
      return false;
    }
  }
  if (kind === 'aiCatalog') {
    if (!contentType.includes('json')) return false;
    try {
      const parsed = JSON.parse(body);
      return Boolean(parsed && typeof parsed === 'object' && Array.isArray(parsed.resources));
    } catch {
      return false;
    }
  }
  if (kind === 'apiCatalog') {
    if (!/(json|text\/plain|octet-stream)/.test(contentType)) return false;
    try {
      const parsed = JSON.parse(body);
      return Boolean(parsed && typeof parsed === 'object' && Array.isArray(parsed.linkset));
    } catch {
      return false;
    }
  }
  if (kind === 'markdown') return /text\/(markdown|plain)/i.test(contentType) && !contentType.includes('text/html');
  return true;
}
