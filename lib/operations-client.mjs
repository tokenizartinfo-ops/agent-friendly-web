const ORIGIN = 'https://operations-manager.agentfriendlyweb.dev';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const HASH = /^[0-9a-f]{64}$/;
const fields = ['fingerprint', 'resource', 'check', 'version', 'observedAt'];
const failure = () => new Error('Operational request unavailable');
const exact = (value, names) => value && typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === names.length && names.every(name => Object.hasOwn(value, name));
const date = value => typeof value === 'string' && Number.isFinite(Date.parse(value)) && new Date(value).toISOString() === value;
const noticeResource=value=>['afw_delegated_canary','afw_delegated_real_pilot'].includes(value);
const noticeCauses=new Set(['checkpoint_missing','checkpoint_invalid','clock_invalid','configuration_changed','observation_stale','delivery_pending','delivery_stale','service_failed']);
const timestamp=value=>Number.isSafeInteger(value)&&value>=0&&Number.isFinite(new Date(value).getTime());
function noticeMetadata(value){
 if(!exact(value,['resource','revision','kind','condition','observedAt'])||!noticeResource(value.resource)||!Number.isSafeInteger(value.revision)||value.revision<1||!timestamp(value.observedAt))throw failure();
 if(value.kind==='recovered'&&value.condition==='healthy')return {...value};
 try{const causes=JSON.parse(value.condition);if(value.kind!=='attention'||!Array.isArray(causes)||causes.length<1||causes.length>8||causes.some(x=>!noticeCauses.has(x))||new Set(causes).size!==causes.length||JSON.stringify([...causes].sort())!==value.condition)throw failure();}catch{throw failure();}
 return {...value};
}
function metadata(value, reservation = false) {
  const names = reservation ? [...fields, 'runId', 'expiresAt'] : fields;
  if (!exact(value, names) || names.some(name => typeof value[name] !== 'string') || !HASH.test(value.fingerprint) || !UUID.test(value.version) || !date(value.observedAt)) throw failure();
  const valid = value.resource === 'afw_public_web' ? ['public_home', 'public_discovery', 'private_boundary'].includes(value.check)
    : ['afw_delegated_canary', 'afw_delegated_real_pilot'].includes(value.resource) && value.check === 'delegated_edge';
  if (!valid || (reservation && (!UUID.test(value.runId) || !date(value.expiresAt) || Date.parse(value.expiresAt) <= Date.parse(value.observedAt)))) throw failure();
  return Object.fromEntries(names.map(name => [name, value[name]]));
}

/** Uses HTTPS proxy placeholders; never hashes, prints or persists credential values.
 * No retry: the same requestId may be explicitly reused after a lost claim response.
 */
export function createOperationsClient({ env = {}, fetchImpl = fetch, timeoutMs = 10000 } = {}) {
  async function request(path, body) {
    let timer, reader;
    const abort = new AbortController();
    try {
      const id = env.AFW_OPERATIONS_ACCESS_CLIENT_ID, secret = env.AFW_OPERATIONS_ACCESS_CLIENT_SECRET;
      if (![id, secret].every(value => typeof value === 'string' && value.length > 0 && value.length <= 8192) || !Number.isSafeInteger(timeoutMs) || timeoutMs < 10 || timeoutMs > 30000) throw failure();
      const deadline = new Promise((_, reject) => { timer = setTimeout(() => { abort.abort(); reject(failure()); }, timeoutMs); });
      const response = await Promise.race([fetchImpl(new Request(ORIGIN + path, {
        method: body === undefined ? 'GET' : 'POST', redirect: 'manual', signal: abort.signal,
        headers: { 'CF-Access-Client-Id': id, 'CF-Access-Client-Secret': secret, accept: 'application/json', ...(body === undefined ? {} : { 'content-type': 'application/json' }) },
        ...(body === undefined ? {} : { body: JSON.stringify(body) }),
      })), deadline]);
      if (response.status !== 200 || response.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') throw failure();
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
    } catch { throw failure(); }
    finally { clearTimeout(timer); abort.abort(); if (reader) void reader.cancel().catch(() => {}); }
  }
  return {
    async listNotices(){
      const body=await request('/notices');
      if(!exact(body,['notices'])||!Array.isArray(body.notices)||body.notices.length>2)throw failure();
      const notices=body.notices.map(noticeMetadata);
      if(new Set(notices.map(x=>x.resource)).size!==notices.length)throw failure();
      return notices;
    },
    async claimNotice(resource,revision,requestId){
      if(!noticeResource(resource)||!Number.isSafeInteger(revision)||revision<1||typeof requestId!=='string'||!UUID.test(requestId))throw failure();
      const body=await request('/notices/claim',{resource,revision,requestId}),r=body?.reservation;
      if(!exact(body,['reservation'])||!exact(r,['resource','revision','requestId','runId','expiresAt'])||r.resource!==resource||r.revision!==revision||r.requestId!==requestId||typeof r.runId!=='string'||!UUID.test(r.runId)||!timestamp(r.expiresAt))throw failure();
      return {...r};
    },
    async ackNotice(runId){
      if(typeof runId!=='string'||!UUID.test(runId))throw failure();
      const body=await request('/notices/ack',{runId});
      if(!exact(body,['outcome'])||!['accepted','superseded'].includes(body.outcome))throw failure();
      return body.outcome;
    },
    async list() {
      const body = await request('/incidents');
      if (!exact(body, ['incidents']) || !Array.isArray(body.incidents) || body.incidents.length > 10) throw failure();
      return body.incidents.map(value => metadata(value));
    },
    async claim(fingerprint, requestId) {
      if (typeof fingerprint !== 'string' || !HASH.test(fingerprint) || typeof requestId !== 'string' || !UUID.test(requestId)) throw failure();
      const body = await request('/claim', { fingerprint, requestId });
      if (!exact(body, ['reservation'])) throw failure();
      const reservation = metadata(body.reservation, true);
      if (reservation.fingerprint !== fingerprint) throw failure();
      return reservation;
    },
    async finish(runId, outcome) {
      if (typeof runId !== 'string' || !UUID.test(runId) || !['diagnosed', 'blocked'].includes(outcome)) throw failure();
      const body = await request('/finish', { runId, outcome });
      if (!exact(body, ['outcome']) || ![outcome, 'superseded'].includes(body.outcome)) throw failure();
      return body.outcome;
    },
  };
}
