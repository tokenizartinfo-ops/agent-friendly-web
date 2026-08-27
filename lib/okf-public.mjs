import { createHash } from 'node:crypto';
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
