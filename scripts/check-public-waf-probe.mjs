import { pathToFileURL } from 'node:url';

const TARGET = new URL('https://agentfriendlyweb.dev/guia');
TARGET.searchParams.set('afw_waf_probe', '<script>alert("afw-own-synthetic-v1")</script>');
const MAX_TIMEOUT_MS = 10_000;

function cancelWithoutWaiting(body) {
  try { Promise.resolve(body?.cancel()).catch(() => {}); } catch { /* Never wait for cancellation ACK. */ }
}

export async function runPublicWafProbe({ startUnix, endUnix, fetchImpl = fetch, requestTimeoutMs = MAX_TIMEOUT_MS } = {}) {
  const result = {
    contract_version: 'agentfriendly.public-waf-probe.v1',
    checked_at: new Date().toISOString(), origin: 'https://agentfriendlyweb.dev',
    path: '/guia', marker_id: 'afw-own-synthetic-v1', method: 'GET',
    status: null, ray_id: null, outcome: 'window_closed',
    wafEnforcementAccepted: false, operationalReadiness: false, pcOffAccepted: false,
    processDrainAccepted: false,
  };
  if (!Number.isSafeInteger(requestTimeoutMs) || requestTimeoutMs <= 0 || requestTimeoutMs > MAX_TIMEOUT_MS) {
    return { ...result, outcome: 'invalid_limits' };
  }
  const nowMs = Date.now();
  if (!Number.isSafeInteger(startUnix) || !Number.isSafeInteger(endUnix) ||
    startUnix <= 0 || endUnix <= startUnix || endUnix - startUnix > 900 ||
    nowMs < startUnix * 1000 || nowMs >= endUnix * 1000) return result;
  result.start_unix = startUnix;
  result.end_unix = endUnix;
  const controller = new AbortController();
  const startedMonotonic = performance.now();
  let timer;
  const timeoutMs = Math.min(requestTimeoutMs, endUnix * 1000 - nowMs);
  const operation = async () => {
    const response = await fetchImpl(new URL(TARGET), {
      method: 'GET', redirect: 'manual', credentials: 'omit', signal: controller.signal,
      headers: { accept: 'text/html', 'user-agent': 'AFW-Public-WAF-QA/1.0' },
    });
    cancelWithoutWaiting(response.body);
    if (controller.signal.aborted) return;
    if (performance.now() - startedMonotonic >= timeoutMs) {
      controller.abort();
      result.outcome = 'request_timeout';
      return;
    }
    if (Date.now() >= endUnix * 1000) return;
    result.status = response.status;
    const ray = (response.headers.get('cf-ray') || '').match(/^([a-f0-9]{16})(?:-[a-z]{3})?$/i);
    result.ray_id = ray ? ray[1].toLowerCase() : null;
    if (response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge') {
      result.outcome = 'unexpected_challenge';
    } else if (response.status === 403) {
      result.outcome = result.ray_id ? 'blocked_pending_correlation' : 'block_without_ray';
    } else {
      result.outcome = response.status === 200 ? 'not_blocked' : 'unexpected_response';
    }
  };
  const timeout = new Promise(resolve => {
    timer = setTimeout(() => {
      controller.abort();
      result.outcome = 'request_timeout';
      resolve();
    }, timeoutMs);
  });
  try {
    await Promise.race([operation(), timeout]);
  } catch {
    controller.abort();
    result.outcome = 'transport_error';
  } finally {
    clearTimeout(timer);
  }
  // Returning a copy prevents a late transport from changing the reported outcome.
  return { ...result };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.length !== 2) {
    console.error('No arguments accepted; use the fixed workflow window inputs.');
    process.exitCode = 1;
  } else {
    const start = process.env.AFW_WAF_PROBE_START || '0';
    const end = process.env.AFW_WAF_PROBE_END || '1';
    const digits = /^[0-9]{1,10}$/;
    const result = await runPublicWafProbe({
      startUnix: digits.test(start) ? Number(start) : NaN,
      endUnix: digits.test(end) ? Number(end) : NaN,
    });
    console.log(JSON.stringify(result, null, 2));
    process.exitCode = result.outcome === 'blocked_pending_correlation' ? 0 : 1;
  }
}
