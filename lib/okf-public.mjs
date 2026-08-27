import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';

const WINDOWS_LOCAL_PATH = /\b[A-Za-z]:\\(?:Users|Documents and Settings|ProgramData|Windows)\\/i;
const UNIX_LOCAL_PATH = /(?:^|[\s"'`])\/(?:Users|home|root|private|var\/folders)\//i;
const EMAIL_ADDRESS = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const PROBABLE_SECRET = /(?:\b(?:api[_-]?key|secret|private[_-]?key|access[_-]?token)\b\s*[:=]\s*|\bsk-(?:live|test|proj)?-?)["']?[A-Za-z0-9_\-]{16,}/i;
const NON_PUBLIC_RESOURCE = /\bresource:\s*["']?http:\/\/(?:localhost|127\.0\.0\.1|\[?::1\]?|10\.|192\.168\.|172\.(?:1[6-9]|2\d|3[01])\.|[^\s"']+)/i;

function normalizeNewlines(value) {
  return String(value).replace(/\r\n?/g, '\n');
}

export function extractMarkdownSection(markdown, requestedHeading) {
  const normalized = normalizeNewlines(markdown);
  const lines = normalized.split('\n');
  const matches = [];

  for (let index = 0; index < lines.length; index += 1) {
    const match = /^(#{1,6})\s+(.+?)\s*$/.exec(lines[index]);
    if (match && match[2].trim() === requestedHeading.trim()) {
      matches.push({ index, level: match[1].length });
    }
  }

  if (matches.length === 0) {
    throw new Error(`Markdown section "${requestedHeading}" not found`);
  }
  if (matches.length > 1) {
    throw new Error(`Markdown section "${requestedHeading}" is ambiguous`);
  }

  const start = matches[0];
  let end = lines.length;
  for (let index = start.index + 1; index < lines.length; index += 1) {
    const match = /^(#{1,6})\s+/.exec(lines[index]);
    if (match && match[1].length <= start.level) {
      end = index;
      break;
    }
  }

  return lines.slice(start.index, end).join('\n').trimEnd();
}

export function renderOkfDocument({ metadata, body }) {
  if (!metadata || typeof metadata !== 'object' || !metadata.type) {
    throw new Error('OKF concept metadata requires a non-empty type');
  }
  const yaml = stringifyYaml(metadata, { lineWidth: 0 }).trimEnd();
  return `---\n${yaml}\n---\n${normalizeNewlines(body).trim()}\n`;
}

export function parseOkfDocument(document) {
  const normalized = normalizeNewlines(document);
  const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(normalized);
  if (!match) {
    throw new Error('OKF document requires YAML frontmatter delimited by ---');
  }
  const frontmatter = parseYaml(match[1]);
  if (!frontmatter || typeof frontmatter !== 'object' || Array.isArray(frontmatter)) {
    throw new Error('OKF frontmatter must parse to an object');
  }
  return { frontmatter, body: `${match[2].trimEnd()}\n` };
}

export function validatePublicText(text, label = 'public output') {
  const normalized = normalizeNewlines(text);
  if (WINDOWS_LOCAL_PATH.test(normalized) || UNIX_LOCAL_PATH.test(normalized)) {
    throw new Error(`${label} contains a local path`);
  }
  if (EMAIL_ADDRESS.test(normalized)) {
    throw new Error(`${label} contains an email address`);
  }
  if (PROBABLE_SECRET.test(normalized)) {
    throw new Error(`${label} contains a probable secret`);
  }
  if (NON_PUBLIC_RESOURCE.test(normalized)) {
    throw new Error(`${label} contains a resource that is not public HTTPS`);
  }
}

export function resolveBundleLink(fromPath, href, knownPaths) {
  if (/^(?:https?:|mailto:|#)/i.test(href)) return href;
  const withoutFragment = href.split('#')[0].split('?')[0];
  if (!withoutFragment) return fromPath;

  const candidate = withoutFragment.startsWith('/')
    ? path.posix.normalize(withoutFragment.slice(1))
    : path.posix.normalize(path.posix.join(path.posix.dirname(fromPath), withoutFragment));

  if (candidate === '..' || candidate.startsWith('../') || path.posix.isAbsolute(candidate)) {
    throw new Error(`Link from ${fromPath} points outside the bundle: ${href}`);
  }
  if (!knownPaths.has(candidate)) {
    throw new Error(`Link from ${fromPath} points to unknown bundle target: ${href}`);
  }
  return candidate;
}

export function sha256(content) {
  return createHash('sha256').update(content).digest('hex');
}

export function buildChecksumFile(files) {
  return [...files.entries()]
    .sort(([left], [right]) => left.localeCompare(right, 'en'))
    .map(([filePath, content]) => `${sha256(content)}  ${filePath}`)
    .join('\n') + '\n';
}

export function verifyChecksumFile(files, checksumFile) {
  const expected = new Map();
  for (const line of normalizeNewlines(checksumFile).trim().split('\n')) {
    const match = /^([a-f0-9]{64})\s{2}(.+)$/.exec(line);
    if (!match) throw new Error(`Invalid checksum line: ${line}`);
    expected.set(match[2], match[1]);
  }

  for (const [filePath, content] of files.entries()) {
    if (expected.get(filePath) !== sha256(content)) {
      throw new Error(`Checksum mismatch for ${filePath}`);
    }
  }
  for (const filePath of expected.keys()) {
    if (!files.has(filePath)) throw new Error(`Checksum references missing file ${filePath}`);
  }
}

export function validateReservedDocuments({ index, log }) {
  let parsedIndex;
  try {
    parsedIndex = parseOkfDocument(index);
  } catch {
    throw new Error('Root index.md must declare okf_version 0.2');
  }
  if (parsedIndex.frontmatter.okf_version !== '0.2') {
    throw new Error('Root index.md must declare okf_version 0.2');
  }
  const unexpected = Object.keys(parsedIndex.frontmatter).filter((key) => key !== 'okf_version');
  if (unexpected.length > 0) {
    throw new Error(`Root index.md has unsupported frontmatter keys: ${unexpected.join(', ')}`);
  }

  const dateHeadings = [...normalizeNewlines(log).matchAll(/^##\s+(.+)$/gm)].map((match) => match[1].trim());
  if (dateHeadings.length === 0 || dateHeadings.some((value) => !/^\d{4}-\d{2}-\d{2}$/.test(value))) {
    throw new Error('log.md date headings must use ISO 8601 YYYY-MM-DD form');
  }
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, 'utf8'));
}

function resolveInside(rootDir, relativePath, label) {
  const root = path.resolve(rootDir);
  const resolved = path.resolve(root, relativePath);
  if (resolved !== root && !resolved.startsWith(`${root}${path.sep}`)) {
    throw new Error(`${label} points outside the configured root: ${relativePath}`);
  }
  return resolved;
}

function validateSourceManifest(manifest) {
  if (manifest.schema !== 'agent-friendly-web.okf-public-sources.v1') throw new Error('Unsupported OKF source manifest schema');
  if (manifest.okf_version !== '0.2') throw new Error('Only OKF v0.2 is supported');
  if (!Array.isArray(manifest.concepts) || manifest.concepts.length === 0) throw new Error('The OKF source manifest has no concepts');

  const outputs = new Set();
  for (const concept of manifest.concepts) {
    if (!concept.type) throw new Error(`Concept ${concept.output ?? '<unknown>'} has no type`);
    if (!concept.output || concept.output === 'index.md' || concept.output === 'log.md') throw new Error(`Invalid concept output: ${concept.output}`);
    if (concept.output.includes('\\') || concept.output.startsWith('/') || concept.output.split('/').includes('..')) {
      throw new Error(`Concept output points outside the bundle: ${concept.output}`);
    }
    if (outputs.has(concept.output)) throw new Error(`Duplicate concept output: ${concept.output}`);
    outputs.add(concept.output);
    if (!/^https:\/\//.test(concept.resource)) throw new Error(`Concept ${concept.output} requires a public HTTPS resource`);
    for (const source of concept.sources ?? []) {
      if (!manifest.source_catalog[source.path]) throw new Error(`Source ${source.path} is not in source_catalog`);
      if (!Array.isArray(source.sections) || source.sections.length === 0) throw new Error(`Source ${source.path} requires section selectors`);
    }
  }
  return outputs;
}

function conceptMetadata(manifest, concept) {
  return {
    type: concept.type,
    title: concept.title,
    description: concept.description,
    resource: concept.resource,
    tags: concept.tags,
    status: concept.status,
    stale_after: manifest.release.stale_after,
    generated: {
      by: 'process:agent-friendly-web-okf-generator',
      at: manifest.release.generated_at,
    },
    verified: [{
      by: manifest.release.verified_by,
      at: manifest.release.verified_at,
    }],
    sources: concept.sources.map((source, index) => {
      const catalog = manifest.source_catalog[source.path];
      return {
        id: `source-${index + 1}`,
        resource: catalog.resource,
        title: catalog.title,
        author: catalog.author,
        last_modified: catalog.last_modified,
      };
    }),
  };
}

async function renderConcept(rootDir, manifest, concept) {
  const sections = [];
  for (const source of concept.sources) {
    const sourcePath = resolveInside(rootDir, source.path, 'Source');
    const markdown = await readFile(sourcePath, 'utf8');
    for (const heading of source.sections) sections.push(extractMarkdownSection(markdown, heading));
  }
  const body = `# ${concept.title}\n\n${sections.join('\n\n')}`;
  const document = renderOkfDocument({ metadata: conceptMetadata(manifest, concept), body });
  validatePublicText(document, concept.output);
  return document;
}

function groupConcepts(concepts) {
  const groups = new Map();
  for (const concept of concepts) {
    const group = concept.output.split('/')[0];
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(concept);
  }
  return groups;
}

function renderIndex(manifest) {
  const labels = {
    method: 'Metodo',
    discovery: 'Descubrimiento',
    registry: 'Registry',
    assistance: 'Asistencia',
    cases: 'Casos',
  };
  const sections = [];
  for (const [group, concepts] of groupConcepts(manifest.concepts)) {
    const entries = concepts
      .map((concept) => `* [${concept.title}](${concept.output}) - ${concept.description}`)
      .join('\n');
    sections.push(`## ${labels[group] ?? group}\n\n${entries}`);
  }
  return `---\nokf_version: "0.2"\n---\n# Conocimiento publico de Agent Friendly Web\n\nBundle read-only, versionado y verificable. La escala AF-0 a AF-5 es una metodologia propia y no una certificacion oficial.\n\n${sections.join('\n\n')}\n`;
}

function renderLog(manifest) {
  return `# Agent Friendly Web Update Log\n\n## ${manifest.release.generated_at.slice(0, 10)}\n\n* **Creation**: Published OKF v${manifest.okf_version} public bundle ${manifest.release.id}.\n`;
}

function distributionManifest(manifest, contentFiles) {
  return {
    schema: 'agent-friendly-web.okf-distribution.v1',
    convention: 'Agent Friendly Web project extension for distribution; not an OKF requirement.',
    okf_version: manifest.okf_version,
    release: manifest.release.id,
    canonical_url: `${manifest.canonical_origin}/okf/v0.2/index.md`,
    generated_at: manifest.release.generated_at,
    verified: { by: manifest.release.verified_by, at: manifest.release.verified_at },
    stale_after: manifest.release.stale_after,
    status: 'published',
    license: manifest.license,
    marks: manifest.marks,
    extensions: { manifest: true, checksums: true },
    files: [...contentFiles.entries()]
      .sort(([left], [right]) => left.localeCompare(right, 'en'))
      .map(([filePath, content]) => ({
        path: filePath,
        sha256: sha256(content),
        media_type: 'text/markdown; charset=utf-8',
        okf_document: filePath.endsWith('.md'),
      })),
  };
}

async function listFiles(rootDir, prefix = '') {
  let entries;
  try {
    entries = await readdir(path.join(rootDir, prefix), { withFileTypes: true });
  } catch (error) {
    if (error?.code === 'ENOENT') return [];
    throw error;
  }
  const files = [];
  for (const entry of entries) {
    const relative = path.posix.join(prefix.replaceAll('\\', '/'), entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(rootDir, relative));
    else files.push(relative);
  }
  return files.sort();
}

async function writeBundle(outputDir, files) {
  for (const [filePath, content] of files) {
    const absolute = path.join(outputDir, filePath);
    await mkdir(path.dirname(absolute), { recursive: true });
    await writeFile(absolute, content, 'utf8');
  }
}

export async function generatePublicOkf({ rootDir, manifestPath, outputDir }) {
  const manifest = await readJson(resolveInside(rootDir, manifestPath, 'Manifest'));
  const conceptPaths = validateSourceManifest(manifest);
  const expectedPaths = new Set(['index.md', 'log.md', 'manifest.json', 'CHECKSUMS.sha256', ...conceptPaths]);
  for (const existing of await listFiles(outputDir)) {
    if (!expectedPaths.has(existing)) throw new Error(`Unexpected file in generated bundle: ${existing}`);
  }

  const contentFiles = new Map();
  contentFiles.set('index.md', renderIndex(manifest));
  contentFiles.set('log.md', renderLog(manifest));
  for (const concept of manifest.concepts) {
    contentFiles.set(concept.output, await renderConcept(rootDir, manifest, concept));
  }
  for (const [filePath, content] of contentFiles) validatePublicText(content, filePath);

  const distribution = `${JSON.stringify(distributionManifest(manifest, contentFiles), null, 2)}\n`;
  validatePublicText(distribution, 'manifest.json');
  const checksummed = new Map([...contentFiles, ['manifest.json', distribution]]);
  const files = new Map([...checksummed, ['CHECKSUMS.sha256', buildChecksumFile(checksummed)]]);
  await writeBundle(outputDir, files);
  return { conceptCount: manifest.concepts.length, fileCount: files.size };
}

function validateMarkdownLinks(filePath, document, knownPaths) {
  for (const match of normalizeNewlines(document).matchAll(/\[[^\]]*\]\(([^)\s]+)(?:\s+[^)]*)?\)/g)) {
    resolveBundleLink(filePath, match[1], knownPaths);
  }
}

export async function validatePublicOkf({ rootDir, manifestPath, outputDir, checksumText = null }) {
  const sourceManifest = await readJson(resolveInside(rootDir, manifestPath, 'Manifest'));
  const conceptPaths = validateSourceManifest(sourceManifest);
  const expectedPaths = new Set(['index.md', 'log.md', 'manifest.json', ...conceptPaths]);
  if (checksumText === null) expectedPaths.add('CHECKSUMS.sha256');
  const actualPaths = await listFiles(outputDir);
  if (actualPaths.length !== expectedPaths.size || actualPaths.some((filePath) => !expectedPaths.has(filePath))) {
    throw new Error(`Bundle file inventory mismatch: ${actualPaths.join(', ')}`);
  }

  const files = new Map(await Promise.all(actualPaths.map(async (filePath) => [filePath, await readFile(path.join(outputDir, filePath), 'utf8')])));
  validateReservedDocuments({ index: files.get('index.md'), log: files.get('log.md') });
  const knownMarkdownPaths = new Set(['index.md', 'log.md', ...conceptPaths]);

  for (const conceptPath of conceptPaths) {
    const document = files.get(conceptPath);
    validatePublicText(document, conceptPath);
    const parsed = parseOkfDocument(document);
    if (!parsed.frontmatter.type) throw new Error(`${conceptPath} has no type`);
    if (!/^https:\/\//.test(parsed.frontmatter.resource)) throw new Error(`${conceptPath} requires a public HTTPS resource`);
    if (parsed.frontmatter.stale_after !== sourceManifest.release.stale_after) throw new Error(`${conceptPath} has inconsistent stale_after`);
    validateMarkdownLinks(conceptPath, parsed.body, knownMarkdownPaths);
  }
  validateMarkdownLinks('index.md', parseOkfDocument(files.get('index.md')).body, knownMarkdownPaths);

  const distribution = JSON.parse(files.get('manifest.json'));
  if (distribution.schema !== 'agent-friendly-web.okf-distribution.v1') throw new Error('Unsupported distribution manifest schema');
  if (distribution.okf_version !== sourceManifest.okf_version) throw new Error('Distribution OKF version mismatch');
  const checksummed = new Map([...files].filter(([filePath]) => filePath !== 'CHECKSUMS.sha256'));
  verifyChecksumFile(checksummed, checksumText ?? files.get('CHECKSUMS.sha256'));
  for (const entry of distribution.files) {
    if (!checksummed.has(entry.path) || sha256(checksummed.get(entry.path)) !== entry.sha256) {
      throw new Error(`Distribution manifest checksum mismatch for ${entry.path}`);
    }
  }
  if (distribution.files.length !== sourceManifest.concepts.length + 2) throw new Error('Distribution manifest inventory is incomplete');
  validatePublicText(files.get('manifest.json'), 'manifest.json');

  return { conceptCount: conceptPaths.size, fileCount: actualPaths.length + (checksumText === null ? 0 : 1) };
}
