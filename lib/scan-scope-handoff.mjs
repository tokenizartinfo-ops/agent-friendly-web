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
export function takeScopeHandoffResult(storage, now = Date.now()) {
  const raw = storage.getItem(SCOPE_HANDOFF_KEY);
  if (raw === null) return { status: 'empty', text: null };
  storage.removeItem(SCOPE_HANDOFF_KEY);
  try {
    if (raw.length > 20000) return { status: 'invalid', text: null };
    const value = JSON.parse(raw);
    if (value.version !== 1 || !Number.isFinite(value.createdAt) || now < value.createdAt) return { status: 'invalid', text: null };
    if (now - value.createdAt > MAX_AGE_MS) return { status: 'expired', text: null };
    previewScanScope(value.text);
    return { status: 'ready', text: value.text };
  } catch { return { status: 'invalid', text: null }; }
}

export function takeScopeHandoff(storage, now = Date.now()) {
  return takeScopeHandoffResult(storage, now).text;
}
