import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { Miniflare, convertV4MiniflareOptions } from 'miniflare';
import { readFileSync } from 'node:fs';
import { generateKeyPair, SignJWT, exportJWK } from 'jose';
import worker from '../worker/operations-manager/index.mjs';

test('operations manager is closed by default, has no cron and never accepts a public origin', async () => {
  for (const origin of ['https://operations-manager.agentfriendlyweb.dev', 'https://agentfriendlyweb.dev']) {
    for (const path of ['/incidents', '/claim', '/finish']) assert.equal((await worker.fetch(new Request(origin + path), {})).status, 404);
  }
  assert.equal(Object.hasOwn(worker, 'scheduled'), false);
});

test('Workers runtime verifies signed identity and persists an atomic D1 diagnostic receipt', async () => {
  const { privateKey, publicKey } = await generateKeyPair('RS256');
  const jwk = await exportJWK(publicKey), current = Date.now();
  const jwt = await new SignJWT({ type: 'app', common_name: 'runtime-service.access' }).setSubject('').setIssuer('https://test.cloudflareaccess.com')
    .setAudience('runtime-operations-only').setExpirationTime('5m').setProtectedHeader({ alg: 'RS256' }).sign(privateKey);
  const bundle = await build({ stdin: { contents: `import {importJWK} from 'jose';
    import {createOperationsServiceControls} from './lib/operations-service-controls.mjs';
    import {recordSignal} from './lib/operations-ledger.mjs';
    const key=await importJWK(${JSON.stringify(jwk)},'RS256');
    export default {async fetch(request,env){
      if(new URL(request.url).pathname==='/synthetic-fixture')return Response.json(await recordSignal(env.DB,{eventId:'workerd-synthetic',resource:'afw_public_web',check:'public_home',version:'d09bcf52-6fae-4c34-bfec-40b715384205',observedAt:new Date(${current}).toISOString(),result:'failed'},${current}));
      return createOperationsServiceControls({db:env.DB,keySet:key,config:{enabled:true,origin:'https://operations-manager.agentfriendlyweb.dev',teamDomain:'test.cloudflareaccess.com',audience:'runtime-operations-only',clientId:'runtime-service.access'},limiter:{limit:async()=>({success:true})}})(request);
    }};`, resolveDir: process.cwd() }, bundle: true, write: false, format: 'esm', platform: 'browser' });
  const runtime = new Miniflare(convertV4MiniflareOptions({ modules: true, compatibilityDate: '2026-09-07', script: bundle.outputFiles[0].text, d1Databases: { DB: 'operations-consumer-test' } }));
  try {
    const db = await runtime.getD1Database('DB');
    // Execute real schemas one statement at a time (D1 exec does not accept multiline SQL).
    for (const name of ['schema.sql', 'consumer-state.sql']) {
      const schema = readFileSync(new URL('../worker/operations/' + name, import.meta.url), 'utf8').replace(/--[^\n]*/g, '');
      for (const statement of schema.split(';').map(s => s.trim()).filter(Boolean)) await db.prepare(statement).run();
    }
    const origin = 'https://operations-manager.agentfriendlyweb.dev';
    const { fingerprint } = await (await runtime.dispatchFetch(origin + '/synthetic-fixture')).json();
    assert.equal((await runtime.dispatchFetch(origin + '/incidents')).status, 401);
    const headers = { 'Cf-Access-Jwt-Assertion': jwt, 'content-type': 'application/json' };
    const claim = await runtime.dispatchFetch(origin + '/claim', { method: 'POST', headers, body: JSON.stringify({ fingerprint, requestId: crypto.randomUUID() }) });
    assert.equal(claim.status, 200); const { reservation } = await claim.json();
    const finish = await runtime.dispatchFetch(origin + '/finish', { method: 'POST', headers, body: JSON.stringify({ runId: reservation.runId, outcome: 'diagnosed' }) });
    assert.deepEqual(await finish.json(), { outcome: 'diagnosed' });
    assert.deepEqual(await db.prepare('SELECT state,phase FROM operations_incidents').first(), { state: 'failed', phase: 'review' });
  } finally { await runtime.dispose(); }
});
