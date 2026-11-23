import { observationOrigin } from './observation-current-origin.mjs';

const MAX_TEXT_LENGTH = 4000;
const MAX_LINES = 50;
const invalid = code => ({ status: 'invalid', code });

function readPages(lines, origin) {
  const pages = new Set();
  for (const line of lines) {
    const address = line.trim();
    if (!address) continue;
    if ((!address.startsWith('/') && !/^https?:\/\//i.test(address)) || address.startsWith('//') ||
        /[\u0000-\u001f\u007f\\?#*\s]/u.test(address) || /(?:^|\/)(?:\.|%2e){1,2}(?:\/|$)/i.test(address) ||
        /%(?![0-9a-f]{2})/i.test(address)) return null;
    let url;
    try {
      url = new URL(address, origin);
    } catch {
      return null;
    }
    if (url.origin !== origin || url.username || url.password) return null;
    const path = url.pathname.replace(/%[0-9a-f]{2}/gi, escape => {
      const character = String.fromCharCode(Number.parseInt(escape.slice(1), 16));
      return /^[A-Za-z0-9._~-]$/.test(character) ? character : escape.toUpperCase();
    });
    if (path.startsWith('//')) return null;
    pages.add(path);
  }
  return [...pages];
}

/** Prepare a user-written draft without fetching its pages or contacting a provider.
 * @param {{website?:string,include?:string,exclude?:string,now?:number}} [input]
 */
export function prepareAiIndexPageScope({ website, include = '', exclude = '', now = Date.now() } = {}) {
  const origin = observationOrigin(website);
  if (!origin) return invalid('origin');
  const prepared = new Date(now);
  if (!Number.isFinite(prepared.getTime())) return invalid('date');
  if (typeof include !== 'string' || typeof exclude !== 'string' ||
      include.length + exclude.length > MAX_TEXT_LENGTH) return invalid('length');

  const includedLines = include.split(/\r\n?|\n/).filter(line => line.trim());
  const excludedLines = exclude.split(/\r\n?|\n/).filter(line => line.trim());
  if (includedLines.length + excludedLines.length > MAX_LINES) return invalid('length');

  const includeForReview = readPages(includedLines, origin);
  const excludeFromProposal = readPages(excludedLines, origin);
  if (!includeForReview || !excludeFromProposal) return invalid('page');
  if (includeForReview.some(path => excludeFromProposal.includes(path))) return invalid('conflict');
  if (!includeForReview.length && !excludeFromProposal.length) return invalid('empty');

  return { status: 'ready', draft: {
    contract: 'afw.ai-index-page-scope.v1',
    origin,
    preparedAt: prepared.toISOString(),
    includeForReview,
    excludeFromProposal,
    status: 'draft',
  } };
}

