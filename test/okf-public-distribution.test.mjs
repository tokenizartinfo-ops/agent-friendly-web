import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { parse as parseYaml } from 'yaml';
import {
  buildChecksumFile,
  extractMarkdownSection,
  generatePublicOkf,
  parseOkfDocument,
  renderOkfDocument,
  resolveBundleLink,
  validatePublicText,
  validatePublicOkf,
  validateReservedDocuments,
  verifyChecksumFile,
} from '../lib/okf-public.mjs';

const EXPECTED_CONCEPTS = [
  'method/agent-friendly-web-method.md',
  'method/maturity-levels-af0-af5.md',
  'method/evidence-and-scoring.md',
  'method/home-and-maturity-path.md',
  'discovery/public-audit.md',
  'discovery/aeo-and-crawler-policy.md',
  'discovery/current-public-readiness.md',
  'discovery/infrastructure-status.md',
  'discovery/public-discovery-resources.md',
  'registry/registry-and-provenance-states.md',
  'registry/domain-verification-boundary.md',
  'assistance/intake-assistant-boundary.md',
  'assistance/readiness-comparison-boundary.md',
  'assistance/public-faq-and-guide.md',
  'cases/tokenizart-first-integral-case.md',
];

const PUBLIC_SOURCE_ALLOWLIST = new Set([
  'docs/METHODOLOGY.es.md',
  'docs/AEO-AND-CRAWLER-POLICY.es.md',
  'docs/SECURITY.md',
  'docs/SPECIFICATION.es.md',
  'docs/TOKENIZART-CASE-2026-08-26.md',
  'docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md',
  'docs/BLOCK-3-INTAKE-ASSISTANT-CONTRACT.es.md',
  'docs/BLOCK-2-SECTOR-MULTILINGUAL-MEASUREMENT.es.md',
  'docs/HOME-AND-MATURITY-PATH.es.md',
  'docs/PUBLIC-FAQ-AND-GUIDE.es.md',
  'docs/PUBLIC-READINESS-REFERENCE-2026-08-31.md',
  'docs/CLOUDFLARE-NATIVE-ORIGIN-SPEC-V1.md',
  'public/.well-known/agent-readiness.json',
  'public/.well-known/readiness-comparison-contract.json',
]);

async function loadSourceManifest() {
  return JSON.parse(await readFile('config/okf-public-sources.v1.json', 'utf8'));
}

test('OKF source manifest fixes the approved public release contract', async () => {
  const manifest = await loadSourceManifest();

  assert.equal(manifest.schema, 'agent-friendly-web.okf-public-sources.v1');
  assert.equal(manifest.okf_version, '0.2');
  assert.equal(manifest.canonical_origin, 'https://agentfriendlyweb.dev');
  assert.equal(manifest.license, 'CC-BY-4.0');
  assert.equal(manifest.marks, 'reserved');
  assert.equal(manifest.release.id, '2026-09-01-public-v3');
  assert.equal(manifest.release.verified_by, 'human:gabriel-mucchiut');
  assert.equal(manifest.release.stale_after, '2026-11-30T00:00:00Z');
  assert.match(manifest.release.generated_at, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);
  assert.match(manifest.release.verified_at, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);
  assert.match(manifest.release.stale_after, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);

  const outputs = manifest.concepts.map((concept) => concept.output).sort();
  assert.deepEqual(outputs, [...EXPECTED_CONCEPTS].sort());
  assert.equal(new Set(outputs).size, EXPECTED_CONCEPTS.length);

  for (const concept of manifest.concepts) {
    assert.ok(concept.title);
    assert.ok(concept.description);
    assert.ok(concept.type);
    assert.match(concept.resource, /^https:\/\/agentfriendlyweb\.dev\//);
    assert.ok(Array.isArray(concept.sources) && concept.sources.length > 0);
    for (const source of concept.sources) {
      assert.ok(PUBLIC_SOURCE_ALLOWLIST.has(source.path), `${source.path} is not an approved public source`);
      assert.ok(Array.isArray(source.sections) && source.sections.length > 0);
    }
  }

  for (const source of Object.values(manifest.source_catalog)) {
    assert.match(source.last_modified, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);
    assert.match(source.resource, /^https:\/\//);
    assert.doesNotMatch(source.resource, /\/blob\/main\//);
  }
});

test('generated OKF artifacts keep LF endings so committed checksums remain portable', async () => {
  const attributes = await readFile('.gitattributes', 'utf8');
  assert.match(attributes, /public\/okf\/\*\*\/\*\s+text\s+eol=lf/);
});

test('extractMarkdownSection returns one exact heading scope', () => {
  const markdown = [
    '# Root',
    '',
    'Intro.',
    '',
    '## Selected',
    '',
    'Body.',
    '',
    '### Child',
    '',
    'Child body.',
    '',
    '## Next',
    '',
    'Outside.',
  ].join('\n');

  assert.equal(
    extractMarkdownSection(markdown, 'Selected'),
    ['## Selected', '', 'Body.', '', '### Child', '', 'Child body.'].join('\n'),
  );
  assert.throws(() => extractMarkdownSection(markdown, 'Missing'), /section.*Missing.*not found/i);
});

test('renderOkfDocument produces parseable deterministic YAML and Markdown', () => {
  const metadata = {
    type: 'Reference',
    title: 'Public example',
    description: 'One line.',
    resource: 'https://agentfriendlyweb.dev/example',
    tags: ['agent-friendly-web', 'example'],
    status: 'stable',
    stale_after: '2026-11-25T00:00:00Z',
    generated: { by: 'process:agent-friendly-web-okf-generator', at: '2026-08-27T00:00:00Z' },
    verified: [{ by: 'human:gabriel-mucchiut', at: '2026-08-27T00:00:00Z' }],
    sources: [{ id: 'canonical-source', resource: 'https://example.com/source', title: 'Source' }],
  };

  const first = renderOkfDocument({ metadata, body: '# Body\n\nVerified content.' });
  const second = renderOkfDocument({ metadata, body: '# Body\n\nVerified content.' });
  assert.equal(first, second);
  const parsed = parseOkfDocument(first);
  assert.deepEqual(parsed.frontmatter, parseYaml(first.split('---\n')[1]));
  assert.equal(parsed.frontmatter.type, 'Reference');
  assert.equal(parsed.body, '# Body\n\nVerified content.\n');
});

test('validatePublicText rejects local paths, probable secrets and non-public resources', () => {
  assert.throws(() => validatePublicText('C:\\Users\\gabri\\secret.txt', 'concept.md'), /local path/i);
  assert.throws(() => validatePublicText('api_key = sk-live-12345678901234567890', 'concept.md'), /secret/i);
  assert.throws(() => validatePublicText('resource: http://localhost:8787/private', 'concept.md'), /public HTTPS/i);
  assert.doesNotThrow(() => validatePublicText('resource: https://agentfriendlyweb.dev/metodologia', 'concept.md'));
});

test('resolveBundleLink confines relative links to known bundle concepts', () => {
  const known = new Set(['method/a.md', 'method/b.md', 'index.md']);
  assert.equal(resolveBundleLink('method/a.md', './b.md', known), 'method/b.md');
  assert.equal(resolveBundleLink('method/a.md', '/index.md', known), 'index.md');
  assert.throws(() => resolveBundleLink('method/a.md', '../../private.md', known), /outside the bundle/i);
  assert.throws(() => resolveBundleLink('method/a.md', './missing.md', known), /unknown bundle target/i);
});

test('checksum helpers sort entries and detect tampering', () => {
  const files = new Map([
    ['z.md', 'last\n'],
    ['a.md', 'first\n'],
  ]);
  const checksums = buildChecksumFile(files);
  const expectedFirst = createHash('sha256').update('first\n').digest('hex');
  assert.equal(checksums.split('\n')[0], `${expectedFirst}  a.md`);
  assert.doesNotThrow(() => verifyChecksumFile(files, checksums));
  files.set('a.md', 'changed\n');
  assert.throws(() => verifyChecksumFile(files, checksums), /checksum mismatch.*a\.md/i);
});

test('reserved index and log documents follow OKF v0.2 conventions', () => {
  const index = ['---', 'okf_version: "0.2"', '---', '# Agent Friendly Web', '', '* [Method](method/a.md) - Description.'].join('\n');
  const log = ['# Agent Friendly Web Update Log', '', '## 2026-08-27', '', '* **Creation**: Published the public bundle.'].join('\n');
  assert.doesNotThrow(() => validateReservedDocuments({ index, log }));
  assert.throws(() => validateReservedDocuments({ index: '# Missing version', log }), /okf_version/i);
  assert.throws(() => validateReservedDocuments({ index, log: '# Log\n\n## August 27' }), /ISO 8601/i);
});

async function listFilesRecursively(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(root, entry.name);
    if (entry.isDirectory()) {
      for (const child of await listFilesRecursively(absolute)) files.push(path.posix.join(entry.name, child));
    } else {
      files.push(entry.name);
    }
  }
  return files.sort();
}

async function readTree(root) {
  const files = await listFilesRecursively(root);
  return new Map(await Promise.all(files.map(async (filePath) => [filePath, await readFile(path.join(root, filePath), 'utf8')])));
}

test('generatePublicOkf creates a complete reproducible bundle that validates independently', async (context) => {
  const outputDir = await mkdtemp(path.join(tmpdir(), 'agent-friendly-web-okf-'));
  context.after(() => rm(outputDir, { recursive: true, force: true }));

  const generation = await generatePublicOkf({
    rootDir: process.cwd(),
    manifestPath: 'config/okf-public-sources.v1.json',
    outputDir,
  });

  assert.equal(generation.conceptCount, EXPECTED_CONCEPTS.length);
  const firstTree = await readTree(outputDir);
  assert.deepEqual(
    [...firstTree.keys()],
    ['CHECKSUMS.sha256', ...EXPECTED_CONCEPTS, 'index.md', 'log.md', 'manifest.json'].sort(),
  );

  const index = parseOkfDocument(firstTree.get('index.md'));
  assert.equal(index.frontmatter.okf_version, '0.2');
  for (const conceptPath of EXPECTED_CONCEPTS) {
    const concept = parseOkfDocument(firstTree.get(conceptPath));
    assert.ok(concept.frontmatter.type, `${conceptPath} has no type`);
    assert.equal(concept.frontmatter.generated.at, '2026-09-01T00:00:00Z');
    assert.equal(concept.frontmatter.verified[0].by, 'human:gabriel-mucchiut');
  }

  const distributionManifest = JSON.parse(firstTree.get('manifest.json'));
  assert.equal(distributionManifest.schema, 'agent-friendly-web.okf-distribution.v1');
  assert.equal(distributionManifest.okf_version, '0.2');
  assert.equal(distributionManifest.files.length, 17);
  assert.equal(distributionManifest.extensions.manifest, true);
  assert.equal(distributionManifest.extensions.checksums, true);
  assert.match(distributionManifest.convention, /project extension.*not.*OKF requirement/i);

  const validation = await validatePublicOkf({
    rootDir: process.cwd(),
    manifestPath: 'config/okf-public-sources.v1.json',
    outputDir,
  });
  assert.equal(validation.conceptCount, EXPECTED_CONCEPTS.length);
  assert.equal(validation.fileCount, 19);

  await generatePublicOkf({ rootDir: process.cwd(), manifestPath: 'config/okf-public-sources.v1.json', outputDir });
  assert.deepEqual(await readTree(outputDir), firstTree);
});

test('the human open knowledge page explains and links the public bundle without capability inflation', async () => {
  const page = await readFile('app/conocimiento-abierto/page.tsx', 'utf8');
  for (const phrase of ['OKF v0.2', 'read-only', 'CC BY 4.0', 'no es una certificacion', 'no es una API', 'no es un MCP']) {
    assert.match(page, new RegExp(phrase, 'i'));
  }
  for (const href of ['/okf/v0.2/index.md', '/okf/v0.2/manifest.json', '/okf/v0.2/CHECKSUMS.sha256']) {
    assert.ok(page.includes(`href="${href}"`), `open knowledge page is missing ${href}`);
  }
  assert.match(page, /Tokenizart.*primer caso integral/is);
  assert.match(page, /<SiteHeader\s+routeKey="openKnowledge"\s*\/>/);
  assert.match(page, /<SiteFooter\s*\/>/);
});

test('sitemap and discovery sources publish the human OKF route and machine bundle entry', async () => {
  const sitemap = await readFile('app/sitemap.ts', 'utf8');
  assert.match(sitemap, /'openKnowledge'/);
  const footer = await readFile('app/components/site-footer.tsx', 'utf8');
  assert.match(footer, /\/okf\/v0\.2\/index\.md/);
  const map = await readFile('app/mapa-del-sitio/page.tsx', 'utf8');
  assert.match(map, /\/conocimiento-abierto/);
  assert.match(map, /\/okf\/v0\.2\/manifest\.json/);
});

test('the checksum endpoint serves the generated bytes as plain text', async () => {
  const route = await readFile('app/okf/v0.2/CHECKSUMS.sha256/route.ts', 'utf8');
  assert.match(route, /OKF_V02_CHECKSUMS/);
  assert.match(route, /['"]Content-Type['"]:\s*['"]text\/plain; charset=utf-8['"]/);

  const generatedModule = await readFile('app/okf/v0.2/CHECKSUMS.sha256/checksums.generated.ts', 'utf8');
  const match = /export const OKF_V02_CHECKSUMS = ("[\s\S]*");\r?\n?$/.exec(generatedModule);
  assert.ok(match, 'generated checksum module must export one JSON string literal');
  const publicTree = await readTree('public/okf/v0.2');
  assert.equal(publicTree.has('CHECKSUMS.sha256'), false, 'the dynamic route must not be shadowed by a static file');
  assert.equal(JSON.parse(match[1]), buildChecksumFile(publicTree));
});
