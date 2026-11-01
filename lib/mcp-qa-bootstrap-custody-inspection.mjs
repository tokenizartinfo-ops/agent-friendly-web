import {performance} from 'node:perf_hooks';

const PURPOSE = 'afw.qa-bootstrap-custody-inspection.v1';
const ENDPOINT = 'https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/tokens/verify';
const EXPECTED_ID = '9db7901af95faf07e6f7ef378045328e';
const REPOSITORY = 'tokenizartinfo-ops/agent-friendly-web';
const OWNER = 'tokenizartinfo-ops';
const SHA = /^[a-f0-9]{40}$/;
const DATE = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{3})?Z$/;
const deny = (code) => { throw new Error(code); };
const own = (value, key) => {
  if (!value || typeof value !== 'object') deny('admission_denied');
  const property = Object.getOwnPropertyDescriptor(value, key);
  if (!property || !Object.hasOwn(property, 'value')) deny('admission_denied');
  return property.value;
};
const optional = (value, key) => Object.hasOwn(value, key) ? own(value, key) : undefined;
const id = (value) => {
  if ((typeof value !== 'number' && typeof value !== 'string') || !/^[1-9]\d{0,15}$/.test(String(value)) || !Number.isSafeInteger(Number(value))) deny('admission_denied');
  return String(value);
};
const timestamp = (value) => {
  if (typeof value !== 'string' || !DATE.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().replace('.000Z', 'Z') !== value.replace('.000Z', 'Z')) deny('invalid_response');
  return value;
};
const identity = (value) => own(value, 'id') === 290715446 && own(value, 'login') === OWNER && own(value, 'type') === 'User';
const exactKeys = (object, required, allowed = required) => {
  if (!object || typeof object !== 'object' || Array.isArray(object) || Object.getPrototypeOf(object) !== Object.prototype ||
      required.some(key => !Object.hasOwn(object, key)) || Object.keys(object).some(key => !allowed.includes(key))) deny('invalid_response');
};
const blank = () => ({
  purpose: PURPOSE, observedAt: null, sourceRevision: null, commentId: null, runId: null,
  tokenId: null, tokenStatus: null, notBefore: null, expiresAt: null, expectedTokenMatch: null,
  readOnly: true, scopeVerified: false, workflowCreateVerified: false,
  operationalReadiness: false, mayRetry: false, status: 'blocked', failure: 'admission_denied',
  httpStatus: null, errorCodes: [],
});

/** Fixed account-token self-verification only. Metadata grants no resource authority. */
export async function runQaBootstrapCustodyInspection({
  event, context, readCredential, fetchImpl = fetch,
  now = {wall: () => Date.now(), monotonic: () => performance.now()}, signal,
} = {}) {
  const dto = blank();
  const controller = new AbortController();
  let timer, abortListener, previousWall, previousMono, originalEnd, originalMonoEnd, requestEnd, requestMonoEnd;
  let stage = 'admission_denied', reader;
  const clock = () => {
    const wall = now.wall(), mono = now.monotonic();
    if (!Number.isFinite(wall) || !Number.isFinite(mono) ||
        (previousWall !== undefined && wall < previousWall) || (previousMono !== undefined && mono < previousMono)) deny('clock_invalid');
    previousWall = wall; previousMono = mono;
    if (signal?.aborted || controller.signal.aborted) deny('aborted');
    if ((originalEnd !== undefined && (wall >= originalEnd || mono >= originalMonoEnd)) ||
        (requestEnd !== undefined && (wall >= requestEnd || mono >= requestMonoEnd))) deny('deadline_exceeded');
    return {wall, mono};
  };
  const wait = async (operation) => {
    clock();
    let listener;
    const aborted = new Promise((_, reject) => {
      listener = () => reject(new Error('aborted'));
      controller.signal.addEventListener('abort', listener, {once: true});
    });
    try {
      const value = await Promise.race([Promise.resolve().then(() => { clock(); return operation(); }), aborted]);
      clock();
      return value;
    } finally {
      controller.signal.removeEventListener('abort', listener);
    }
  };
  try {
    const start = clock();
    if (own(context, 'repository') !== REPOSITORY || own(context, 'repositoryId') !== '1347578006' ||
        own(context, 'repositoryOwner') !== OWNER || own(context, 'repositoryOwnerId') !== '290715446' ||
        own(context, 'actor') !== OWNER || own(context, 'actorId') !== '290715446' ||
        own(context, 'ref') !== 'refs/heads/main' || own(context, 'eventName') !== 'issue_comment' ||
        own(context, 'runAttempt') !== '1') deny('admission_denied');
    const revision = own(context, 'sourceRevision');
    if (typeof revision !== 'string' || !SHA.test(revision)) deny('admission_denied');
    const repository = own(event, 'repository'), comment = own(event, 'comment'), issue = own(event, 'issue');
    if (own(repository, 'id') !== 1347578006 || own(repository, 'full_name') !== REPOSITORY ||
        own(repository, 'default_branch') !== 'main' || !identity(own(repository, 'owner')) ||
        !identity(own(event, 'sender')) || !identity(own(comment, 'user')) ||
        own(comment, 'author_association') !== 'OWNER' || own(event, 'action') !== 'created' ||
        own(issue, 'number') !== 497 || Object.hasOwn(issue, 'pull_request') ||
        own(comment, 'body') !== '/afw-qa-bootstrap-custody-inspect v1 ' + revision) deny('admission_denied');
    const created = Date.parse(timestamp(own(comment, 'created_at')));
    if (created > start.wall || start.wall - created >= 300000) deny('admission_denied');
    originalEnd = created + 300000;
    originalMonoEnd = start.mono + (originalEnd - start.wall);
    const commentId = id(own(comment, 'id')), runId = id(own(context, 'runId'));
    clock();
    dto.sourceRevision = revision; dto.commentId = commentId; dto.runId = runId;
    const current = clock();
    requestEnd = Math.min(originalEnd, current.wall + 5000);
    requestMonoEnd = Math.min(originalMonoEnd, current.mono + 5000);
    abortListener = () => controller.abort();
    signal?.addEventListener('abort', abortListener, {once: true});
    timer = setTimeout(() => controller.abort(), Math.max(0, Math.min(requestEnd - current.wall, requestMonoEnd - current.mono)));
    stage = 'credential_unavailable';
    if (typeof readCredential !== 'function' || typeof fetchImpl !== 'function') deny(stage);
    const credential = await wait(() => readCredential());
    clock();
    if (typeof credential !== 'string' || credential.length < 1 || credential.length > 4096 || !/^[\x21-\x7e]+$/.test(credential)) deny(stage);
    stage = 'request_failed';
    const response = await wait(() => fetchImpl(ENDPOINT, {
      method: 'GET', redirect: 'error', cache: 'no-store',
      headers: {Authorization: 'Bearer ' + credential, Accept: 'application/json', 'Cache-Control': 'no-cache'},
      signal: controller.signal,
    }));
    clock();
    stage = 'invalid_response';
    const status = response.status;
    if (!Number.isInteger(status) || status < 100 || status > 599) deny(stage);
    dto.httpStatus = status;
    const serverDate = response.headers.get('date');
    const age = response.headers.get('age');
    const cache = response.headers.get('cf-cache-status');
    const date = Date.parse(serverDate);
    const time = clock();
    if (typeof serverDate !== 'string' || !Number.isFinite(date) || time.wall - date > 5000 ||
        date - time.wall > 1000 || (age !== null && age !== '0') ||
        (cache !== null && !['DYNAMIC', 'BYPASS', 'MISS', 'NONE'].includes(cache))) deny(stage);
    const length = response.headers.get('content-length');
    if (length !== null && (!/^\d{1,5}$/.test(length) || Number(length) > 8192)) deny(stage);
    reader = response.body.getReader();
    const chunks = [];
    let size = 0;
    while (true) {
      const part = await wait(() => reader.read());
      clock();
      if (part.done) break;
      if (!(part.value instanceof Uint8Array)) deny(stage);
      size += part.value.byteLength;
      if (size > 8192) deny(stage);
      chunks.push(part.value);
    }
    clock();
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    const envelope = JSON.parse(new TextDecoder('utf-8', {fatal: true}).decode(bytes));
    exactKeys(envelope, ['success', 'errors', 'messages', 'result']);
    if (!Array.isArray(envelope.errors) || envelope.errors.length > 16 ||
        !Array.isArray(envelope.messages) || envelope.messages.length > 16) deny(stage);
    if (status !== 200 || envelope.success !== true) {
      dto.errorCodes = [...new Set(envelope.errors.flatMap(error =>
        error && typeof error === 'object' && Number.isSafeInteger(error.code) && error.code >= 0 && error.code <= 2147483647 ? [error.code] : []))].slice(0, 16);
      stage = 'http_rejected';
      deny(stage);
    }
    if (envelope.errors.length !== 0) deny(stage);
    for (const message of envelope.messages) {
      exactKeys(message, ['code', 'message'], ['code', 'message', 'documentation_url', 'source']);
      if (!Number.isSafeInteger(message.code) || message.code < 0 || message.code > 2147483647 ||
          typeof message.message !== 'string' || message.message.length > 2048) deny(stage);
      if (Object.hasOwn(message, 'documentation_url') &&
          (typeof message.documentation_url !== 'string' || message.documentation_url.length > 2048)) deny(stage);
      if (Object.hasOwn(message, 'source')) {
        exactKeys(message.source, [], ['pointer']);
        if (Object.hasOwn(message.source, 'pointer') &&
            (typeof message.source.pointer !== 'string' || message.source.pointer.length > 2048)) deny(stage);
      }
    }
    const result = envelope.result;
    exactKeys(result, ['id', 'status'], ['id', 'status', 'expires_on', 'not_before']);
    if (typeof result.id !== 'string' || !/^[a-f0-9]{32}$/.test(result.id) || result.id === credential ||
        !['active', 'disabled', 'expired'].includes(result.status)) deny(stage);
    const expiresAt = optional(result, 'expires_on') === undefined ? null : timestamp(result.expires_on);
    const notBefore = optional(result, 'not_before') === undefined ? null : timestamp(result.not_before);
    if (expiresAt !== null && notBefore !== null && Date.parse(expiresAt) <= Date.parse(notBefore)) deny(stage);
    const final = clock();
    if (final.wall - date > 5000) deny(stage);
    Object.assign(dto, {status: 'verified', failure: null, observedAt: new Date(final.wall).toISOString(),
      tokenId: result.id, tokenStatus: result.status, expiresAt, notBefore, expectedTokenMatch: result.id === EXPECTED_ID});
    clock();
  } catch {
    // Neither caught exceptions nor provider text enter the result.
    Object.assign(dto, {status: 'blocked', failure: controller.signal.aborted || signal?.aborted ? 'aborted' : stage,
      observedAt: null, tokenId: null, tokenStatus: null, expiresAt: null, notBefore: null, expectedTokenMatch: null});
  } finally {
    clearTimeout(timer);
    if (abortListener) signal?.removeEventListener('abort', abortListener);
    if (reader) {
      try { void Promise.resolve(reader.cancel()).catch(() => {}); } catch { /* Fixed cleanup only. */ }
      try { reader.releaseLock(); } catch { /* Pending ignored-abort readers may retain a lock. */ }
    }
    try { clock(); } catch {
      Object.assign(dto, {status: 'blocked', failure: 'deadline_or_abort', observedAt: null,
        tokenId: null, tokenStatus: null, expiresAt: null, notBefore: null, expectedTokenMatch: null});
    }
    controller.abort();
  }
  return Object.freeze(dto);
}
