import { previewScanScope } from './scan-scope-transfer.mjs';

export const SCOPE_HANDOFF_KEY = 'afw.scan-scope-handoff.v1';
const MAX_AGE_MS = 30 * 60 * 1000;

/** Same-tab convenience only. The dossier must still review the unverified reference. */
export function saveScopeHandoff(storage, text, now = Date.now()) {
  previewScanScope(text);
  if (!Number.isFinite(now)) throw new Error('Invalid handoff time');
  storage.setItem(SCOPE_HANDOFF_KEY, JSON.stringify({ version: 1, createdAt: now, text }));
}

/** Consume once, including invalid or expired values, without persisting them to a project. */
export function takeScopeHandoff(storage, now = Date.now()) {
  const raw = storage.getItem(SCOPE_HANDOFF_KEY);
  if (raw === null) return null;
  storage.removeItem(SCOPE_HANDOFF_KEY);
  try {
    if (raw.length > 20000) return null;
    const value = JSON.parse(raw);
    if (value.version !== 1 || !Number.isFinite(value.createdAt) || now < value.createdAt || now - value.createdAt > MAX_AGE_MS) return null;
    previewScanScope(value.text);
    return value.text;
  } catch { return null; }
}
