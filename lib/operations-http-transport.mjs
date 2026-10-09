const ORIGIN='https://operations-manager.agentfriendlyweb.dev';
const failure=()=>new Error('Operational request unavailable');
const routes={
 GET:['/incidents','/notices','/notices/receipts','/dossiers','/assistance'],
 POST:['/claim','/finish','/notices/claim','/notices/ack','/dossiers/claim','/dossiers/finish','/assistance/claim','/assistance/finish','/assistance/custody/confirm',
 ...['create','list','admit-claim','claim','admit-finish','finish','stop'].map(x=>'/assistance/occurrences/'+x)],
};
/** Canonical bounded HTTP transport only. Does not validate business receipts,
 * authorize a plan, count attempts, mount routes, or retry ambiguous responses.
 * Callers validate the reply inside their attempt-counted callback.
 */
export function createOperationsHttpTransport({env={},fetchImpl=fetch,timeoutMs=10000,onDiagnostic}={}){
  // Only fixed categories and HTTP metadata leave the transport boundary.
  // Never pass credentials, request data, response bodies or caught errors.
  function report(value) {
    try { const pending = typeof onDiagnostic === 'function' && onDiagnostic(Object.freeze(value));
      if (pending && typeof pending.catch === 'function') void pending.catch(() => {});
    } catch { /* Diagnostics must not affect the operational request. */ }
  }
  async function request(path, body) {
    let timer, reader, stage = 'configuration', reported = false, timedOut = false;
    const abort = new AbortController();
    try {
      const method=body===undefined?'GET':'POST';
      if(typeof path!=='string'||!routes[method].includes(path))throw failure();
      if(body!==undefined&&(!body||typeof body!=='object'||Array.isArray(body)))throw failure();
      const encoded=body===undefined?undefined:JSON.stringify(body);
      if(encoded!==undefined&&new TextEncoder().encode(encoded).byteLength>1024)throw failure();
      const id = env.AFW_OPERATIONS_ACCESS_CLIENT_ID, secret = env.AFW_OPERATIONS_ACCESS_CLIENT_SECRET;
      if (![id, secret].every(value => typeof value === 'string' && value.length > 0 && value.length <= 8192) || !Number.isSafeInteger(timeoutMs) || timeoutMs < 10 || timeoutMs > 30000) throw failure();
      const deadline = new Promise((_, reject) => { timer = setTimeout(() => { timedOut = true; abort.abort(); reject(failure()); }, timeoutMs); });
      stage = 'transport';
      const response = await Promise.race([fetchImpl(new Request(ORIGIN + path, {
        method, redirect: 'manual', signal: abort.signal,
        headers: { 'CF-Access-Client-Id': id, 'CF-Access-Client-Secret': secret, accept: 'application/json', ...(body === undefined ? {} : { 'content-type': 'application/json' }) },
        ...(body === undefined ? {} : { body: encoded }),
      })), deadline]);
      const media = response.headers.get('content-type')?.split(';')[0].trim().toLowerCase();
      report({ stage: 'response', status: Number.isInteger(response.status) && response.status >= 100 && response.status <= 599 ? response.status : 0,
        format: media === 'application/json' ? 'json' : media === 'text/html' ? 'html' : 'other' });
      reported = true;
      if (response.status !== 200 || media !== 'application/json') throw failure();
      stage = 'body';
      reader = response.body?.getReader(); if (!reader) throw failure();
      let length = 0; const chunks = [];
      while (true) {
        const { value, done } = await Promise.race([reader.read(), deadline]);
        if (done) break;
        length += value.byteLength; if (length > 8192) throw failure(); chunks.push(value);
      }
      const bytes = new Uint8Array(length); let offset = 0;
      for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
      return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
    } catch { if (!reported || stage === 'body') report({ stage: timedOut ? 'timeout' : stage }); throw failure(); }
    finally { clearTimeout(timer); abort.abort(); if (reader) void reader.cancel().catch(() => {}); }
  }
  return request;
}
