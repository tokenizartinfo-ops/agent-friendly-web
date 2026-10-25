import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ENDPOINT = 'https://agentfriendlyweb.dev/mcp';
const PROTOCOLS = new Set(['2024-11-05', '2025-03-26', '2025-06-18', '2025-11-25']);
const SOURCES = ['https://agentfriendlyweb.dev/metodologia', 'https://agentfriendlyweb.dev/.well-known/agent-readiness.json'];
const BLOCKED = ['credentials', 'private-expedients', 'registry-write', 'publish', 'deploy', 'dns', 'billing', 'payments', 'owner-data', 'website-mutation'];
const LEVEL_BOUNDS = [[0, 17], [18, 35], [36, 53], [54, 71], [72, 89], [90, 100]];
const boundedText = (value, max) => typeof value === 'string' && value.trim().length > 0 && value.length <= max;
const fail = code => { throw Object.assign(new Error(code), { observationCode: code }); };
const requireThat = (condition, code) => { if (!condition) fail(code); };
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);

function decode(bytes, contentType, id) {
  const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  let value;
  if (contentType === 'application/json') value = JSON.parse(text);
  else if (contentType === 'text/event-stream') {
    const frames = [];
    let data = [], event = 'message', hasData = false, count = 0;
    const lines = text.replace(/\r\n?/g, '\n').split('\n');
    requireThat(lines.pop() === '', 'response_unconfirmed');
    for (const line of lines) {
      if (line === '') {
        if (hasData) {
          requireThat(++count <= 8, 'response_unconfirmed');
          const raw = data.join('\n');
          if (raw.trim()) {
            requireThat(event === '' || event === 'message', 'response_unconfirmed');
            frames.push(JSON.parse(raw));
          }
        }
        data = []; event = 'message'; hasData = false;
      } else if (!line.startsWith(':')) {
        const colon = line.indexOf(':');
        const field = colon < 0 ? line : line.slice(0, colon);
        let part = colon < 0 ? '' : line.slice(colon + 1);
        if (part.startsWith(' ')) part = part.slice(1);
        if (field === 'data') { hasData = true; data.push(part); }
        else if (field === 'event') event = part;
        // id/retry/unknown fields never cause resumption or another request.
      }
    }
    requireThat(!hasData && frames.length === 1, 'response_unconfirmed');
    value = frames[0];
  } else fail('response_unconfirmed');
  requireThat(object(value) && value.jsonrpc === '2.0' && value.id === id
    && !Object.hasOwn(value, 'error') && object(value.result), 'rpc_unconfirmed');
  return value.result;
}

function raceAbort(promise, signal) {
  if (signal.aborted) fail('deadline');
  let abort;
  const stopped = new Promise((_, reject) => {
    abort = () => reject(Object.assign(new Error('deadline'), { observationCode: 'deadline' }));
    signal.addEventListener('abort', abort, { once: true });
  });
  return Promise.race([promise, stopped]).finally(() => signal.removeEventListener('abort', abort));
}

function methodologyResult(result, wallNow) {
  requireThat(object(result) && result.isError !== true, 'methodology_unconfirmed');
  const e = result.structuredContent;
  requireThat(object(e) && e.contract === 'agent-friendly-web.mcp-result.v1'
    && e.server_version === '0.1.0' && e.tool === 'get_afw_methodology'
    && e.status === 'ok' && e.input?.section === 'overview', 'methodology_unconfirmed');
  const generated = Date.parse(e.generated_at);
  requireThat(Number.isFinite(generated) && new Date(generated).toISOString() === e.generated_at
    && Math.abs(generated - wallNow) <= 30000, 'methodology_unconfirmed');
  const m = e.result;
  requireThat(object(m) && m.methodology === 'Gabriel Mucchiut Agent Friendly Web Method v1'
    && m.scale === 'AF-0 to AF-5'
    && m.normative_status === 'Metodologia propia transparente; no es una certificacion oficial ni un estandar de industria.',
  'methodology_unconfirmed');
  requireThat(Array.isArray(m.levels) && m.levels.length === 6
    && m.levels.every((level, index) => object(level) && level.id === 'AF-' + index
      && boundedText(level.label, 200) && level.score_min === LEVEL_BOUNDS[index][0]
      && level.score_max === LEVEL_BOUNDS[index][1]),
  'methodology_unconfirmed');
  requireThat(Array.isArray(m.categories) && m.categories.length > 0 && m.categories.length <= 32
    && m.categories.every(category => object(category) && boundedText(category.id, 64)
      && boundedText(category.label, 200) && Number.isFinite(category.weight) && category.weight > 0 && category.weight <= 100
      && Array.isArray(category.checks) && category.checks.length > 0 && category.checks.length <= 128
      && category.checks.every(check => object(check) && boundedText(check.check, 100)
        && Number.isFinite(check.points) && check.points >= 0 && check.points <= 100)), 'methodology_unconfirmed');
  requireThat(Array.isArray(e.sources) && e.sources.length === 2
    && SOURCES.every(url => e.sources.some(source => object(source) && source.url === url))
    && Array.isArray(e.limits) && e.limits.length > 0 && e.limits.length <= 32 && e.limits.every(limit => boundedText(limit, 1000))
    && Array.isArray(e.blocked_actions) && e.blocked_actions.length === BLOCKED.length && BLOCKED.every(action => e.blocked_actions.includes(action)),
  'methodology_unconfirmed');
  const bytes = Buffer.from(JSON.stringify(e));
  return { schemaVerified: true, levels: m.levels.length, categories: m.categories.length,
    generatedAt: e.generated_at, bytes: bytes.length, sha256: crypto.createHash('sha256').update(bytes).digest('hex') };
}

export async function observeMethodologyOnce({ notBefore, notAfter, fetchImpl = fetch,
  now = Date.now, monotonic = () => performance.now() } = {}) {
  const report = { kind: 'afw_public_methodology_once', status: 'unconfirmed', origin: ENDPOINT,
    requestsSent: 0, steps: [], toolCallAttempted: false, postRetries: 0, redirectsFollowed: false,
    operationalReadiness: false, protocolVersion: null };
  let phase = 'preflight', totalBytes = 0, startWall, startMono, lastWall, lastMono;
  const guard = () => {
    const wall = now(), mono = monotonic();
    requireThat(Number.isSafeInteger(wall) && Number.isFinite(mono)
      && wall >= lastWall && mono >= lastMono, 'clock_unconfirmed');
    lastWall = wall; lastMono = mono;
    requireThat(wall >= notBefore && wall < notAfter && mono - startMono < 30000, 'deadline');
    return Math.min(10000, notAfter - wall, 30000 - (mono - startMono));
  };
  async function send(name, message, id) {
    phase = name;
    const remaining = guard();
    const sendWall = lastWall, sendMono = lastMono;
    const stepGuard = () => {
      guard();
      requireThat(lastWall - sendWall < 10000 && lastMono - sendMono < 10000, 'deadline');
    };
    requireThat(report.requestsSent < 4, 'request_budget');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), Math.max(1, Math.floor(remaining)));
    const step = { phase: name, status: 0, bytes: 0, contentType: 'other', ok: false };
    report.steps.push(step);
    let reader, complete = false;
    try {
      const headers = { accept: 'application/json, text/event-stream', 'content-type': 'application/json' };
      if (report.protocolVersion) headers['mcp-protocol-version'] = report.protocolVersion;
      report.requestsSent++;
      if (name === 'call') report.toolCallAttempted = true;
      const response = await raceAbort(Promise.resolve().then(() => fetchImpl(ENDPOINT, {
        method: 'POST', headers, body: JSON.stringify(message), credentials: 'omit',
        redirect: 'error', signal: controller.signal,
      })), controller.signal);
      step.status = response.status;
      reader = response.body?.getReader();
      stepGuard();
      requireThat(!response.headers.get('mcp-session-id'), 'session_unconfirmed');
      const mime = (response.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
      const chunks = [];
      if (reader) for (;;) {
        stepGuard();
        const part = await raceAbort(reader.read(), controller.signal);
        stepGuard();
        if (part.done) { complete = true; break; }
        step.bytes += part.value.byteLength; totalBytes += part.value.byteLength;
        requireThat(step.bytes <= 65536 && totalBytes <= 262144, 'response_too_large');
        chunks.push(part.value);
      }
      const bytes = Buffer.concat(chunks);
      step.contentType = bytes.length === 0 ? 'empty' : mime === 'application/json' ? 'json'
        : mime === 'text/event-stream' ? 'sse' : 'other';
      let result;
      if (id === null) requireThat([202, 204].includes(response.status) && bytes.length === 0, 'notification_unconfirmed');
      else {
        requireThat(response.status === 200, 'response_unconfirmed');
        result = decode(bytes, mime, id);
      }
      stepGuard(); step.ok = true;
      return result;
    } finally {
      clearTimeout(timer); controller.abort();
      if (reader) {
        if (!complete) void reader.cancel().catch(() => {});
        try { reader.releaseLock(); } catch { /* Pending reads are cancelled and never reused. */ }
      }
    }
  }
  try {
    startWall = now(); startMono = monotonic(); lastWall = startWall; lastMono = startMono;
    requireThat(Number.isSafeInteger(notBefore) && Number.isSafeInteger(notAfter)
      && notBefore > 0 && notAfter > notBefore && notAfter - notBefore <= 600000
      && Number.isSafeInteger(startWall) && Number.isFinite(startMono), 'window_unconfirmed');
    report.originalWindow = { notBefore, notAfter };
    guard(); report.startedAt = new Date(startWall).toISOString();
    const init = await send('initialize', { jsonrpc: '2.0', id: 1, method: 'initialize',
      params: { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'afw-public-methodology-once', version: '1' } } }, 1);
    requireThat(init.serverInfo?.name === 'agent-friendly-web-public' && PROTOCOLS.has(init.protocolVersion), 'protocol_unconfirmed');
    report.protocolVersion = init.protocolVersion;
    await send('initialized', { jsonrpc: '2.0', method: 'notifications/initialized' }, null);
    const catalog = await send('catalog', { jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} }, 2);
    const tools = catalog.tools;
    const selected = Array.isArray(tools) ? tools.filter(tool => tool?.name === 'get_afw_methodology') : [];
    requireThat(selected.length === 1 && selected[0].annotations?.readOnlyHint === true
      && selected[0].annotations?.destructiveHint === false && selected[0].annotations?.openWorldHint === false,
    'catalog_unconfirmed');
    const result = await send('call', { jsonrpc: '2.0', id: 3, method: 'tools/call',
      params: { name: 'get_afw_methodology', arguments: { section: 'overview' } } }, 3);
    guard(); report.methodology = methodologyResult(result, now()); guard();
    report.status = 'accepted';
  } catch (error) {
    if (report.steps.length) report.steps.at(-1).ok = false;
    const known = new Set(['clock_unconfirmed', 'deadline', 'request_budget', 'session_unconfirmed',
      'response_too_large', 'notification_unconfirmed', 'response_unconfirmed', 'rpc_unconfirmed',
      'window_unconfirmed', 'protocol_unconfirmed', 'catalog_unconfirmed', 'methodology_unconfirmed']);
    report.failure = { phase, code: known.has(error?.observationCode) ? error.observationCode : 'observation_unconfirmed' };
    delete report.methodology;
  }
  const endWall = now(), endMono = monotonic();
  report.finishedAt = Number.isSafeInteger(endWall) ? new Date(endWall).toISOString() : null;
  report.elapsedMs = Number.isFinite(endMono) && Number.isFinite(startMono) ? Math.max(0, endMono - startMono) : null;
  report.totalBytes = totalBytes;
  return report;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  let report;
  const env = process.env;
  const context = env.GITHUB_ACTIONS === 'true' && env.GITHUB_REPOSITORY === 'tokenizartinfo-ops/agent-friendly-web'
    && env.GITHUB_EVENT_NAME === 'workflow_dispatch' && env.GITHUB_REF === 'refs/heads/main'
    && env.GITHUB_RUN_ATTEMPT === '1' && /^[1-9][0-9]*$/.test(env.GITHUB_RUN_ID || '');
  if (!context) report = { kind: 'afw_public_methodology_once', status: 'unconfirmed', requestsSent: 0,
    failure: { phase: 'preflight', code: 'github_context_unconfirmed' }, operationalReadiness: false };
  else report = await observeMethodologyOnce({
    notBefore: Number(env.AFW_PUBLIC_TRIAL_START_MS), notAfter: Number(env.AFW_PUBLIC_TRIAL_END_MS),
  });
  report.github = { repository: 'tokenizartinfo-ops/agent-friendly-web',
    runId: /^[1-9][0-9]*$/.test(env.GITHUB_RUN_ID || '') ? env.GITHUB_RUN_ID : null,
    attempt: env.GITHUB_RUN_ATTEMPT === '1' ? 1 : null,
    sourceRevision: /^[0-9a-f]{40}$/.test(env.GITHUB_SHA || '') ? env.GITHUB_SHA : null };
  process.stdout.write(JSON.stringify(report) + '\n');
  process.exitCode = report.status === 'accepted' ? 0 : 1;
}
