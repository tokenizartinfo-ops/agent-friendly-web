import { normalizePublicUrl } from './methodology.mjs';

export function normalizeSitePrefill(value) {
  try {
    const normalized = new URL(normalizePublicUrl(value));
    normalized.search = '';
    normalized.hash = '';
    const path = normalized.pathname === '/' ? '' : normalized.pathname.replace(/\/$/, '');
    return `${normalized.hostname.toLowerCase()}${path}`;
  } catch {
    return '';
  }
}
