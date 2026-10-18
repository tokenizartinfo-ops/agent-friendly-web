import { analyzeIntakeNotes } from './intake-assistant.mjs';
import { reviewCopilotSession } from './copilot-session.mjs';

export function validateCopilotWorkingDraft(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)
    || Object.keys(input).some(key => !['text', 'revision', 'mutationKey', 'locale', 'session'].includes(key))
    || typeof input.text !== 'string' || input.text.length > 5000
    || !Number.isSafeInteger(input.revision) || input.revision < 0
    || typeof input.mutationKey !== 'string' || !/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(input.mutationKey)
    || !['es', 'en', 'pt'].includes(input.locale)) return { ok: false, code: 'invalid_working_draft' };
  if (input.text.trim() && analyzeIntakeNotes(input.text, input.locale).blocked) return { ok: false, code: 'sensitive_working_draft' };
  let session;
  if (Object.hasOwn(input, 'session')) {
    try { session = reviewCopilotSession(input.session, input.text, input.locale); }
    catch { return { ok: false, code: 'invalid_copilot_session' }; }
  }
  return { ok: true, text: input.text, revision: input.revision, mutationKey: input.mutationKey, ...(session ? { session } : {}) };
}

// Client transport for this one private resource. A timeout does not prove that
// a PUT was rejected: recovery reads the saved draft before any further write.
export async function requestCopilotWorkingDraft(projectId, init = {}, { request = globalThis.fetch, timeoutMs = 15_000 } = {}) {
  if (typeof projectId !== 'string' || !/^[a-zA-Z0-9_-]{1,200}$/.test(projectId)
    || !['GET', 'PUT'].includes(init.method || 'GET')
    || !Number.isSafeInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 15_000) throw new Error('invalid_working_draft_request');
  const parent = init.signal;
  if (parent?.aborted) throw new Error('working_draft_cancelled');
  const controller = new AbortController();
  let timer, cancel;
  /** @type {Promise<never>} */
  const boundary = new Promise((_, reject) => {
    cancel = () => { reject(new Error('working_draft_cancelled')); controller.abort(); };
    parent?.addEventListener('abort', cancel, { once: true });
    timer = setTimeout(() => { reject(new Error('working_draft_unconfirmed')); controller.abort(); }, timeoutMs);
  });
  const operation = (async () => {
    const response = await request(`/api/projects/${encodeURIComponent(projectId)}/copilot/working-draft`,
      { ...init, cache: 'no-store', redirect: 'manual', signal: controller.signal });
    if (controller.signal.aborted) throw new Error('working_draft_cancelled');
    if (response.type === 'opaqueredirect' || response.status === 401 || response.status >= 300 && response.status < 400) throw new Error('working_draft_session_required');
    if (!response.headers?.get('content-type')?.toLowerCase().includes('application/json')) throw new Error('invalid_working_draft_response');
    const payload = await response.json();
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw new Error('invalid_working_draft_response');
    return { response, payload };
  })();
  try { return await Promise.race([operation, boundary]); }
  finally { clearTimeout(timer); parent?.removeEventListener('abort', cancel); }
}
