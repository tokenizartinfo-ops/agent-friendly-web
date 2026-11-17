import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import { gunzipSync } from 'node:zlib';
import { Miniflare, convertV4MiniflareOptions } from 'miniflare';
import { compileFirstConnectionCandidate, firstConnectionWorkers } from './test/fixtures/finite-first-connection-publication.mjs';

const origin = 'https://delegated-canary.agentfriendlyweb.dev';
const original = origin + '/connections/finite-prepare';
const named = 'AFW_GET_WINNER_EXPECTED_MARKER';
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const actorScript = `
import { DurableObject } from 'cloudflare:workers';
export class Initial extends DurableObject {
  constructor(ctx, env) { super(ctx, env); this.calls = 0; this.qualified = false; }
  fetch(request) {
    this.calls += 1;
    this.qualified = request.method === 'POST'
      && request.url === 'https://afw-private.invalid/_finite-owner/choice'
      && request.headers.get('x-afw-finite-original-method') === 'GET'
      && request.headers.get('x-afw-finite-original-url') === 'https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare'
      && request.headers.get('x-afw-finite-version') === '55555555-5555-4555-8555-555555555555'
      && request.headers.has('x-afw-finite-request-id')
      && request.headers.has('x-afw-finite-boundary')
      && !request.headers.has('x-afw-lab-get-winner');
    return new Response(null, {status: this.qualified ? 413 : 409});
  }
  redState() { return this.calls === 1 && this.qualified; }
}
export default { fetch() { return new Response(null, {status: 410}); } };
`;
const candidate = await compileFirstConnectionCandidate('c'.repeat(40), 'd'.repeat(40), {dropWinner: true});
const positive = Buffer.from(candidate.script);
assert.deepEqual(positive, Buffer.from(candidate.bytes));
assert.deepEqual(positive, gunzipSync(Buffer.from(candidate.resident.content, 'base64')));
assert.equal(candidate.resident.module.bytes, positive.length);
const resident = hash(positive);
assert.equal(candidate.resident.module.sha256, resident);
assert.notEqual(candidate.spyHash, resident);
const qa = {
  name: 'qa-first-connection', modules: true, script: actorScript,
  compatibilityDate: '2026-09-07', compatibilityFlags: ['nodejs_compat'],
  durableObjects: {AFW_INDEPENDENT_CLOSURE: {className:'Initial', useSQLite:true, uniqueKey:'initial-c2a'}},
  outboundService: async () => new Response(null, {status: 503})
};
const config = firstConnectionWorkers(qa, candidate);
assert.deepEqual(config.workers.map(w => w.name), ['canary-first-connection','qa-first-connection','negative-first-connection']);
assert.equal(hash(config.workers[0].script), resident);
assert.deepEqual(config.workers[0].durableObjects.AFW_FINITE_TRIAL_CONTROL,
  {className:'Initial',scriptName:'qa-first-connection',useSQLite:true,uniqueKey:'initial-c2a'});
config.upstream = origin;
const options = convertV4MiniflareOptions(config);
assert.equal(options.upstream, origin);
const converted = options.workers[0].config; assert.equal(converted.type, 'worker'); assert.equal(converted.name, 'canary-first-connection'); const {mainModule, modules} = converted.manifest; assert.equal(typeof mainModule, 'string'); assert.ok(mainModule.length > 0); assert.deepEqual(Object.keys(modules), [mainModule]); const main = modules[mainModule]; assert.equal(main.type, 'esm'); assert.equal(typeof main.contents, 'string'); const mountedBytes = Buffer.from(main.contents, 'utf8'); assert.deepEqual(mountedBytes, positive); assert.equal(hash(mountedBytes), resident);
const mf = new Miniflare(options);
let recorded = false;
try {
  const serialized = await mf.dispatchFetch(original, {method:'GET',redirect:'manual'});
  assert.equal(serialized.status, 413, 'AFW_GET_POSITIVE_ROUTE_STATUS');
  const marker = serialized.headers.get('x-afw-lab-get-winner');
  assert.equal(serialized.headers.get('cache-control'), 'no-store', 'AFW_GET_ORIGINAL_PENDING_HEADERS');
  const body = await serialized.text();
  assert.equal(body, '{"status":"admin_pending","mayRetry":false,"operationalReadiness":false}', 'AFW_GET_ORIGINAL_PENDING_BODY');
  const bindings = await mf.getBindings('qa-first-connection');
  const ns = bindings.AFW_INDEPENDENT_CLOSURE;
  const actor = ns.get(ns.idFromName('afw-own-successor-closure-v1'));
  assert.equal(await actor.redState(), true, 'AFW_GET_POSITIVE_ACTOR_ARRIVAL');
  try {
    assert.equal(marker, 'g1.413.S.413', named);
  } catch (error) {
    if (!(error instanceof assert.AssertionError) || error.code !== 'ERR_ASSERTION' ||
        error.operator !== 'strictEqual' || error.actual !== null ||
        error.expected !== 'g1.413.S.413' || error.message.split('\n', 1)[0] !== named) throw error;
    recorded = true;
  }
  assert.equal(recorded, true, 'AFW_GET_BASELINE_UNEXPECTED_MARKER');
} finally {
  await mf.dispose();
}
await writeFile('red-child.json', JSON.stringify({
  assertion:named, actual:null, expected:'g1.413.S.413', residentSha256:resident,
  residentBytes:positive.length, dispatched:1, originalActorArrived:true, status:413, originalBodyMatched:true,
  miniflareDisposed:true
})+'\n', {flag:'wx', mode:0o600});
process.exitCode = 41;
