const CONTRACT = 'agentfriendly.public-profile.v1';

const provenanceLabels = {
  owner_declared: 'Owner declared',
  observed: 'Observed',
  verified: 'Verified',
  curated_owner_attribution: 'Curated owner attribution',
  not_observed: 'Not observed',
};

function text(value, field, max = 500) {
  const cleaned = String(value ?? '').replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max);
  if (/<\/?[a-z][\s\S]*>/i.test(cleaned)) throw new Error(`${field} cannot contain HTML`);
  return cleaned;
}

function list(value, field, maxItems = 24) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.map((item) => text(item, field, 120)).filter(Boolean))].slice(0, maxItems);
}

function publicUrl(value, field) {
  try {
    const url = new URL(text(value, field, 1000));
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error();
    url.hash = '';
    return url.toString().replace(/\/$/, '');
  } catch {
    throw new Error(`${field} must be a public HTTP URL`);
  }
}

function optionalDate(value, field) {
  const cleaned = text(value, field, 50);
  if (!cleaned) return '';
  if (Number.isNaN(Date.parse(cleaned))) throw new Error(`${field} must be an ISO date`);
  return new Date(cleaned).toISOString();
}

function state(value, fallback = 'owner_declared') {
  const cleaned = text(value, 'state', 40);
  return Object.hasOwn(provenanceLabels, cleaned) ? cleaned : fallback;
}

function sourceEntry(entry = {}) {
  return {
    title: text(entry.title, 'source title', 160),
    url: publicUrl(entry.url, 'source URL'),
    state: state(entry.state),
    observedAt: optionalDate(entry.observedAt, 'source observedAt'),
  };
}

function resourceEntry(entry = {}) {
  return {
    type: text(entry.type, 'resource type', 80),
    url: publicUrl(entry.url, 'resource URL'),
    state: state(entry.state, 'observed'),
    observedAt: optionalDate(entry.observedAt, 'resource observedAt'),
  };
}

export function buildPublicProfile(input = {}) {
  const publishedAt = optionalDate(input.publishedAt, 'publishedAt');
  const verification = input.verification || {};
  const readiness = input.readiness || {};
  const organization = text(input.organization, 'organization', 200);
  const canonicalOrigin = publicUrl(input.canonicalOrigin, 'canonicalOrigin');
  const readinessState = state(readiness.state, 'not_observed');
  const score = Number.isFinite(readiness.score) ? Math.max(0, Math.min(100, Math.round(readiness.score))) : null;

  if (!organization) throw new Error('organization is required');
  if (!publishedAt) throw new Error('publishedAt is required');

  return {
    contract: CONTRACT,
    slug: text(input.slug, 'slug', 100),
    version: Math.max(1, Number.parseInt(input.version, 10) || 1),
    publishedAt,
    canonicalUrl: publicUrl(input.canonicalUrl, 'canonicalUrl'),
    organization,
    canonicalOrigin,
    siteType: text(input.siteType, 'siteType', 100),
    sectors: list(input.sectors, 'sectors'),
    audiences: list(input.audiences, 'audiences'),
    languages: list(input.languages, 'languages'),
    publicSources: Array.isArray(input.publicSources) ? input.publicSources.map(sourceEntry) : [],
    declaredCapabilities: list(input.declaredCapabilities, 'declaredCapabilities'),
    observedResources: Array.isArray(input.observedResources) ? input.observedResources.map(resourceEntry) : [],
    verification: {
      status: text(verification.status, 'verification status', 40),
      hostname: text(verification.hostname, 'verification hostname', 253),
      method: text(verification.method, 'verification method', 40),
      verifiedAt: optionalDate(verification.verifiedAt, 'verifiedAt'),
      verifiedUntil: optionalDate(verification.verifiedUntil, 'verifiedUntil'),
    },
    readiness: {
      level: text(readiness.level, 'readiness level', 40) || 'Not assessed',
      score,
      state: readinessState,
      observedAt: optionalDate(readiness.observedAt, 'readiness observedAt'),
    },
    assertions: {
      organization: {
        value: organization,
        state: 'owner_declared',
        source: 'owner_attestation',
        observedAt: publishedAt,
      },
      canonicalOrigin: {
        value: canonicalOrigin,
        state: verification.status === 'verified' ? 'verified' : 'owner_declared',
        source: verification.method ? `domain_claim:${text(verification.method, 'verification method', 40)}` : 'owner_attestation',
        observedAt: optionalDate(verification.verifiedAt, 'verifiedAt') || publishedAt,
      },
      readiness: {
        value: { level: text(readiness.level, 'readiness level', 40) || 'Not assessed', score },
        state: readinessState,
        source: readinessState === 'observed' ? 'public_audit' : 'not_assessed',
        observedAt: optionalDate(readiness.observedAt, 'readiness observedAt'),
      },
    },
    historyUrl: publicUrl(input.historyUrl, 'historyUrl'),
    limits: list(input.limits, 'limits', 12),
  };
}

function markdownText(value) {
  return String(value ?? '').replace(/([\\`*_{}\[\]()#+.!|>~-])/g, '\\$1');
}

function dateLabel(value) {
  return value ? value.slice(0, 10) : 'Not recorded';
}

export function renderPublicProfileMarkdown(profile) {
  const lines = [
    `# ${markdownText(profile.organization)}`,
    '',
    `- **Canonical site:** [${markdownText(profile.canonicalOrigin)}](${profile.canonicalOrigin})`,
    `- **Profile version:** ${profile.version}`,
    `- **Published:** ${dateLabel(profile.publishedAt)}`,
    `- **Organization:** ${markdownText(profile.organization)} (${provenanceLabels[profile.assertions.organization.state]})`,
    `- **Domain:** ${markdownText(profile.verification.hostname)} (${provenanceLabels[profile.assertions.canonicalOrigin.state]})`,
    `- **Readiness:** ${markdownText(profile.readiness.level)}${profile.readiness.score === null ? '' : `, ${profile.readiness.score}/100`} (${provenanceLabels[profile.readiness.state]})`,
    '',
    '## Public description',
    '',
    `- **Site type:** ${markdownText(profile.siteType || 'Not declared')}`,
    `- **Sectors:** ${profile.sectors.map(markdownText).join(', ') || 'Not declared'}`,
    `- **Audiences:** ${profile.audiences.map(markdownText).join(', ') || 'Not declared'}`,
    `- **Languages:** ${profile.languages.map(markdownText).join(', ') || 'Not declared'}`,
    '',
    '## Declared capabilities',
    '',
    ...(profile.declaredCapabilities.length ? profile.declaredCapabilities.map((item) => `- ${markdownText(item)} (Owner declared)`) : ['- None declared']),
    '',
    '## Observed public resources',
    '',
    ...(profile.observedResources.length
      ? profile.observedResources.map((item) => `- [${markdownText(item.type)}](${item.url}) - ${provenanceLabels[item.state]} ${dateLabel(item.observedAt)}`)
      : ['- No public resources have been observed yet.']),
    '',
    '## Public sources',
    '',
    ...(profile.publicSources.length
      ? profile.publicSources.map((item) => `- [${markdownText(item.title)}](${item.url}) - ${provenanceLabels[item.state]} ${dateLabel(item.observedAt)}`)
      : ['- No public sources declared.']),
    '',
    '## Verification',
    '',
    `- **Status:** ${provenanceLabels[profile.verification.status] || markdownText(profile.verification.status || 'Not verified')}`,
    `- **Method:** ${markdownText(profile.verification.method || 'Not recorded')}`,
    `- **Verified:** ${dateLabel(profile.verification.verifiedAt)}`,
    `- **Valid until:** ${dateLabel(profile.verification.verifiedUntil)}`,
    '',
    '## Limits',
    '',
    ...profile.limits.map((item) => `- ${markdownText(item)}`),
    '',
    `History: [versioned profile history](${profile.historyUrl})`,
    '',
  ];
  return lines.join('\n');
}

export const PUBLIC_PROFILE_CONTRACT = CONTRACT;
