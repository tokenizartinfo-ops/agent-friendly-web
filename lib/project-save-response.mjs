export async function readProjectSaveResponse(response) {
  if (response.status === 401 || response.type === 'opaqueredirect' ||
      (response.status >= 300 && response.status < 400)) return { sessionRequired: true };
  if (!response.headers?.get('content-type')?.toLowerCase().includes('application/json')) {
    throw new Error('invalid_save_response');
  }
  let payload;
  try { payload = await response.json(); } catch { throw new Error('invalid_save_response'); }
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw new Error('invalid_save_response');
  return { sessionRequired: false, payload };
}

export const PROJECT_SAVE_TIMEOUT_MS = 15_000;

// One bounded attempt, including its response body. A timeout is an unknown
// outcome, not a rollback: the caller retains its draft and idempotency key.
export async function saveProjectDraft(request, attempt, { timeoutMs = PROJECT_SAVE_TIMEOUT_MS } = {}) {
  if (!Number.isSafeInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > PROJECT_SAVE_TIMEOUT_MS) {
    throw new RangeError('invalid_save_timeout');
  }
  const controller = new AbortController();
  let timer;
  /** @type {Promise<never>} */
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error('response_lost'));
      controller.abort();
    }, timeoutMs);
  });
  const operation = (async () => {
    let response;
    try { response = await request('/api/projects', { ...attempt, signal: controller.signal }); }
    catch { throw new Error('response_lost'); }
    const parsed = await readProjectSaveResponse(response);
    return { response, parsed };
  })();
  try { return await Promise.race([operation, timeout]); }
  finally { clearTimeout(timer); }
}
