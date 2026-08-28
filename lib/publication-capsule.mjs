import { createHash } from 'node:crypto';

export const PUBLICATION_CAPSULE_CONTRACT = 'agentfriendly.publication-capsule.v1';
export const CAPSULE_DECISION_CONTRACT = 'agentfriendly.capsule-decision.v1';

const GENERABLE_RESOURCES = new Set(['llms', 'llms_full', 'robots', 'sitemap', 'jsonld']);
const NON_GENERABLE_RESOURCES = new Set(['openapi', 'mcp', 'skills']);
const PACKAGE_PATH = /^(files|proposals)\/[a-z0-9][a-z0-9._-]{0,119}$/;
const HASH = /^[a-f0-9]{64}$/;
const MAX_FILE_BYTES = 128 * 1024;

const goalLabels = {
  discovery: 'Aparecer en respuestas y busquedas',
  content: 'Explicar mejor productos o servicios',
  tools: 'Exponer APIs, MCP o skills verificables',
  actions: 'Preparar acciones delegadas futuras',
  payments: 'Preparar pagos entre agentes para servicios definidos',
};

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function cleanText(value, max = 1000) {
  return String(value ?? '').replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max);
}

function cleanList(value, max = 24) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.map((item) => cleanText(item, 120)).filter(Boolean))].slice(0, max);
}

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stableValue(value[key])]));
}

function stableJson(value) {
  return `${JSON.stringify(stableValue(value), null, 2)}\n`;
}

function publicHttpsOrigin(value) {
  let url;
  try {
    url = new URL(cleanText(value, 1000));
  } catch {
    throw new Error('Capsule target must be a public HTTPS origin');
  }
  const hostname = url.hostname.toLowerCase();
  if (
    url.protocol !== 'https:' ||
    url.origin !== cleanText(value, 1000).replace(/\/$/, '') ||
    hostname === 'localhost' ||
    hostname.endsWith('.localhost') ||
    /^(127\.|10\.|192\.168\.|169\.254\.)/.test(hostname) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(hostname)
  ) {
    throw new Error('Capsule target must be a public HTTPS origin');
  }
  return url.origin;
}

function probableSecret(value) {
  const source = String(value || '');
  return (
    /-----BEGIN (?:RSA |EC |OPENSSH |PGP )?PRIVATE KEY-----/i.test(source) ||
    /\b(?:password|passwd|api[_-]?key|client[_-]?secret|access[_-]?token|private[_-]?key)\s*[:=]\s*\S{6,}/i.test(source) ||
    /\b(?:ghp|github_pat|sk_live|sk_test|xox[baprs])-[_a-z0-9]{12,}\b/i.test(source)
  );
}

function xmlEscape(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function markdownList(values, fallback = 'No declarado') {
  return values.length ? values.map((value) => `- ${value}`).join('\n') : `- ${fallback}`;
}

function renderLlms(input) {
  const goals = input.goals.map((goal) => goalLabels[goal] || goal);
  return [
    `# ${input.organization}`,
    '',
    '> Documento publico propuesto para descubrimiento agentico. Requiere publicacion en el origen para considerarse desplegado.',
    '',
    `- Sitio canonico: ${input.origin}`,
    `- Tipo de sitio: ${input.siteType || 'No declarado'}`,
    `- Audiencia: ${input.audience || 'No declarada'}`,
    '',
    '## Objetivos declarados',
    '',
    markdownList(goals),
    '',
    '## Idiomas',
    '',
    markdownList(input.languages),
    '',
    '## Limites',
    '',
    '- Este archivo expresa una propuesta preparada desde datos aprobados por el owner.',
    '- No acredita que APIs, MCP, skills, acciones o pagos esten disponibles.',
    '- La evidencia observada y las capacidades desplegadas deben verificarse por separado.',
    '',
  ].join('\n');
}

function renderLlmsFull(input) {
  return [
    `# ${input.organization}: contexto publico ampliado`,
    '',
    `Origen canonico propuesto: ${input.origin}`,
    '',
    '## A quien sirve',
    '',
    input.audience || 'El owner todavia no declaro una audiencia publica.',
    '',
    '## Que quiere facilitar',
    '',
    markdownList(input.goals.map((goal) => goalLabels[goal] || goal)),
    '',
    '## Idiomas declarados',
    '',
    markdownList(input.languages),
    '',
    '## Recursos de descubrimiento preparados en esta capsula',
    '',
    markdownList(input.selectedResources.map((resource) => `\`${resource}\``)),
    '',
    '## Procedencia y estado',
    '',
    '- Fuente: expediente privado y proyeccion publica allowlisted del owner.',
    `- Preparado: ${input.createdAt}`,
    '- Estado: propuesta; no desplegado hasta que el origen responda con estos bytes.',
    '- Integridad: cada archivo tiene SHA-256 en el manifiesto de la capsula.',
    '',
    '## Limites',
    '',
    '- No se incluyen notas privadas, emails operativos, credenciales ni secretos.',
    '- Un checksum detecta cambios de bytes; no es una firma juridica ni prueba la verdad de las afirmaciones.',
    '- Las herramientas solo se describen como disponibles cuando existe una superficie verificable.',
    '',
  ].join('\n');
}

function renderRobotsSnippet(input) {
  const searchDirective = input.crawlerSearchPolicy === 'deny' ? 'Disallow: /' : 'Allow: /';
  const trainingDirective = input.crawlerTrainingPolicy === 'allow' ? 'Allow: /' : 'Disallow: /';
  return [
    '# Agent Friendly Web proposal: merge these groups into the current robots.txt.',
    '# Do not replace existing security, private-path or crawler rules without review.',
    '',
    'User-agent: OAI-SearchBot',
    searchDirective,
    '',
    'User-agent: ChatGPT-User',
    searchDirective,
    '',
    'User-agent: Claude-SearchBot',
    searchDirective,
    '',
    'User-agent: Claude-User',
    searchDirective,
    '',
    'User-agent: PerplexityBot',
    searchDirective,
    '',
    'User-agent: Perplexity-User',
    searchDirective,
    '',
    'User-agent: GPTBot',
    trainingDirective,
    '',
    'User-agent: ClaudeBot',
    trainingDirective,
    '',
  ].join('\n');
}

function renderSitemapEntries(input) {
  const urls = [];
  if (input.selectedResources.includes('llms')) urls.push(`${input.origin}/llms.txt`);
  if (input.selectedResources.includes('llms_full')) urls.push(`${input.origin}/llms-full.txt`);
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<!-- Proposed entries only. Merge into the current sitemap or sitemap index after review. -->',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url) => `  <url><loc>${xmlEscape(url)}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n');
}

function renderJsonLd(input) {
  return stableJson({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: input.organization,
    url: input.origin,
    ...(input.languages.length ? { inLanguage: input.languages } : {}),
  });
}

function fileRecord(packagePath, destinationPath, operation, mediaType, content) {
  if (!PACKAGE_PATH.test(packagePath)) throw new Error(`Package path is not allowlisted: ${packagePath}`);
  const bytes = Buffer.byteLength(content, 'utf8');
  if (!content || bytes > MAX_FILE_BYTES) throw new Error(`Generated file size is invalid: ${packagePath}`);
  if (probableSecret(content)) throw new Error(`Generated file contains a probable secret: ${packagePath}`);
  return { packagePath, destinationPath, operation, mediaType, bytes, sha256: sha256(content), content };
}

function unsupportedResource(id) {
  return {
    id,
    state: 'requires_separate_implementation',
    reason: `${id} requires a real deployed tool, a verifiable contract and a separate security gate.`,
  };
}

export function buildPublicationCapsule(raw = {}) {
  const origin = publicHttpsOrigin(raw.canonicalOrigin);
  const organization = cleanText(raw.organization, 200);
  const selectedResources = cleanList(raw.selectedResources).filter((item) => GENERABLE_RESOURCES.has(item) || NON_GENERABLE_RESOURCES.has(item));
  const generable = selectedResources.filter((item) => GENERABLE_RESOURCES.has(item));
  if (!organization) throw new Error('Organization is required');
  if (!generable.length) throw new Error('Capsule has no generable resources');

  const input = {
    origin,
    organization,
    siteType: cleanText(raw.siteType, 80),
    audience: cleanText(raw.audience, 1000),
    goals: cleanList(raw.goals),
    languages: cleanList(raw.languages),
    selectedResources,
    crawlerSearchPolicy: cleanText(raw.crawlerSearchPolicy, 40),
    crawlerTrainingPolicy: cleanText(raw.crawlerTrainingPolicy, 40),
    createdAt: new Date(raw.createdAt).toISOString(),
  };

  const files = [];
  if (selectedResources.includes('llms')) files.push(fileRecord('files/llms.txt', '/llms.txt', 'create_or_replace', 'text/plain; charset=utf-8', renderLlms(input)));
  if (selectedResources.includes('llms_full')) files.push(fileRecord('files/llms-full.txt', '/llms-full.txt', 'create_or_replace', 'text/plain; charset=utf-8', renderLlmsFull(input)));
  if (selectedResources.includes('robots')) files.push(fileRecord('proposals/robots.agent-friendly-snippet.txt', '/robots.txt', 'manual_merge', 'text/plain; charset=utf-8', renderRobotsSnippet(input)));
  if (selectedResources.includes('sitemap')) files.push(fileRecord('proposals/sitemap.agent-friendly-entries.xml', '/sitemap.xml', 'manual_merge', 'application/xml; charset=utf-8', renderSitemapEntries(input)));
  if (selectedResources.includes('jsonld')) files.push(fileRecord('proposals/organization.jsonld', '/', 'manual_embed', 'application/ld+json; charset=utf-8', renderJsonLd(input)));

  const requiredRoles = raw.maintainerRequired === true ? ['owner', 'maintainer'] : ['owner'];
  const checksums = `${files.map((file) => `${file.sha256}  ${file.packagePath}`).join('\n')}\n`;
  const manifest = {
    contract: PUBLICATION_CAPSULE_CONTRACT,
    capsuleId: cleanText(raw.capsuleId, 120),
    projectRef: cleanText(raw.projectId, 120),
    siteRef: cleanText(raw.siteId, 120),
    version: Number(raw.version),
    mode: 'manual_handoff',
    target: { origin, hostname: new URL(origin).hostname },
    organization,
    createdAt: input.createdAt,
    expiresAt: new Date(raw.expiresAt).toISOString(),
    ownerRef: cleanText(raw.ownerRef, 160),
    maintainerRef: raw.maintainerRequired === true ? cleanText(raw.maintainerRef, 160) : '',
    files: files.map((file) => ({
      packagePath: file.packagePath,
      destinationPath: file.destinationPath,
      operation: file.operation,
      mediaType: file.mediaType,
      bytes: file.bytes,
      sha256: file.sha256,
    })),
    unsupportedResources: selectedResources.filter((item) => NON_GENERABLE_RESOURCES.has(item)).map(unsupportedResource),
    approvals: { requiredRoles },
    postApplyChecks: files.map((file) => ({ path: file.destinationPath, expectedSha256: file.sha256, mode: 'manual_http_verification' })),
    rollback: files.map((file) => ({ path: file.destinationPath, mode: 'restore_previous_version_or_remove_created_file' })),
  };

  if (!manifest.capsuleId || !manifest.projectRef || !manifest.siteRef || !Number.isInteger(manifest.version) || manifest.version < 1) {
    throw new Error('Capsule identity and version are required');
  }
  if (probableSecret(stableJson(manifest))) throw new Error('Capsule manifest contains a probable secret');

  const manifestSha256 = sha256(stableJson(manifest));
  const idempotencyKey = sha256(`${origin}\n${manifest.version}\n${manifestSha256}\n`);
  return {
    contract: PUBLICATION_CAPSULE_CONTRACT,
    capsuleId: manifest.capsuleId,
    version: manifest.version,
    mode: 'manual_handoff',
    status: 'owner_approval_pending',
    createdAt: manifest.createdAt,
    expiresAt: manifest.expiresAt,
    target: manifest.target,
    organization,
    files,
    unsupportedResources: manifest.unsupportedResources,
    approvals: {
      requiredRoles,
      owner: 'pending',
      maintainer: requiredRoles.includes('maintainer') ? 'pending' : 'not_required',
    },
    checksums,
    manifest,
    integrity: {
      algorithm: 'sha256',
      manifestSha256,
      checksumsSha256: sha256(checksums),
      signature: null,
    },
    idempotencyKey,
    limits: [
      'This capsule does not write to the target site.',
      'SHA-256 verifies bytes; it is not a cryptographic service signature or a legal attestation.',
      'Manual merge and embed operations require a human review of the current origin.',
    ],
  };
}

export function capsuleState({ requiredRoles = ['owner'], approvals = [], expiresAt, now = new Date().toISOString() } = {}) {
  if (new Date(now).getTime() >= new Date(expiresAt).getTime()) return 'expired';
  if (approvals.some((approval) => approval?.decision === 'rejected')) return 'rejected';
  const approvedRoles = new Set(approvals.filter((approval) => approval?.decision === 'approved').map((approval) => approval.role));
  if (!approvedRoles.has('owner')) return 'owner_approval_pending';
  if (requiredRoles.includes('maintainer') && !approvedRoles.has('maintainer')) return 'maintainer_approval_pending';
  return 'approved_for_manual_handoff';
}

export function validateCapsuleDecision(raw = {}) {
  if (raw.contract !== CAPSULE_DECISION_CONTRACT) throw new Error('Capsule decision contract is invalid');
  if (!['approved', 'rejected'].includes(raw.decision)) throw new Error('Capsule decision must be approved or rejected');
  const manifestSha256 = cleanText(raw.manifestSha256, 64).toLowerCase();
  if (!HASH.test(manifestSha256)) throw new Error('Capsule decision manifest hash is invalid');
  const idempotencyKey = cleanText(raw.idempotencyKey, 120);
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._:-]{7,119}$/.test(idempotencyKey)) throw new Error('Capsule decision idempotency key is invalid');
  const note = cleanText(raw.note, 500);
  if (probableSecret(note)) throw new Error('Capsule decision note must not contain credentials');
  return {
    contract: CAPSULE_DECISION_CONTRACT,
    decision: raw.decision,
    manifestSha256,
    idempotencyKey,
    note,
  };
}
