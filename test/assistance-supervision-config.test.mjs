import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
test('assistance producer is unrouted, disabled and cannot declare private enrollment in plain vars',async()=>{
 const config=JSON.parse(await readFile('wrangler.assistance-supervision-producer.jsonc','utf8'));
 assert.equal(config.vars.AFW_ASSISTANCE_SUPERVISION_ENABLED,'false');assert.deepEqual(config.triggers.crons,[]);
 assert.equal(config.vars.AFW_ASSISTANCE_FEEDBACK_ENABLED,'false');
 assert.equal(config.workers_dev,false);assert.equal(config.preview_urls,false);assert.equal(config.observability.enabled,false);
 for(const name of ['AFW_ASSISTANCE_ENROLLMENTS','AFW_ASSISTANCE_SIGNING_SECRET','AFW_OPERATIONS_WINDOW_EXPIRES_AT'])assert.equal(Object.hasOwn(config.vars,name),false);
 assert.equal(Object.hasOwn(config,'d1_databases'),false);assert.equal(Object.hasOwn(config,'routes'),false);
 assert.equal(config.services[0].service,'agent-friendly-web-operations');
});
test('manager deployment retains symmetric assistance budget admission even between pilot modes',async()=>{
 const config=JSON.parse(await readFile('wrangler.operations-manager.jsonc','utf8'));
 assert.equal(config.vars.AFW_OPERATIONS_CONSUMER_ENABLED,'false');
 assert.equal(config.vars.AFW_ASSISTANCE_SUPERVISION_ENABLED,'false');
 assert.equal(config.vars.AFW_OPERATIONS_SHARED_ASSISTANCE_BUDGET_ENABLED,'true');
 assert.deepEqual(config.triggers.crons,[]);
});
