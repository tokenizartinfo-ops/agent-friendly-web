import assert from 'node:assert/strict';
import test from 'node:test';
import {readFile} from 'node:fs/promises';
import {createObservationSaveAttempt,observationRequestIds} from '../lib/observation-save-attempt.mjs';

test('uncertain observation response reuses the same request; confirmed save gets a new key',async()=>{
 const attempt=createObservationSaveAttempt();
 const first=attempt.prepare('owned-project','https://example.com/');
 assert.equal(first.request.method,'POST');
 assert.equal(JSON.parse(first.request.body).confirmSave,true);
 assert.deepEqual(attempt.prepare('owned-project','https://example.com/'),first);
 attempt.confirmed('wrong-key');
 assert.deepEqual(attempt.prepare('owned-project','https://example.com/'),first);
 attempt.confirmed(first.key);
 assert.notEqual(attempt.prepare('owned-project','https://example.com/').key,first.key);
 assert.notEqual(attempt.prepare('another-project','https://example.com/').key,first.key);
});

test('deterministic receipts are isolated by owner, project and key',async()=>{
 const key='8198ef2a-5423-4d2a-9b3b-2f3994879111';
 const first=await observationRequestIds('alice','project-a',key);
 assert.deepEqual(await observationRequestIds('alice','project-a',key),first);
 assert.notDeepEqual(await observationRequestIds('bob','project-a',key),first);
 assert.notDeepEqual(await observationRequestIds('alice','project-b',key),first);
 assert.notEqual(first.observationId,first.eventId);
});

test('private route checks an existing receipt before scanning and recovers after ambiguous writes',async()=>{
 const route=await readFile('app/api/projects/[projectId]/observations/route.ts','utf8');
 assert.match(route,/idempotency-key/);
 assert.match(route,/const prior = await recover\(\);[\s\S]*?if \(prior\) return prior;[\s\S]*?runPublicAudit/);
 assert.match(route,/catch \{[\s\S]*?const committed = await recover\(\)/);
 assert.match(route,/\.onConflictDoNothing\(\)\.returning/);
 assert.match(route,/eq\(scanObservations\.userId, user\.userId\)/);
});
