import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
test('private restoration source config adds no migration namespace route cron or enabled authority',async()=>{
 const c=JSON.parse(await readFile(new URL('../wrangler.independent-closure-qa.jsonc',import.meta.url),'utf8'));
 assert.equal(c.name,'agent-friendly-web-independent-closure-qa');assert.equal(c.workers_dev,false);assert.equal(c.preview_urls,false);assert.deepEqual(c.triggers.crons,[]);
 assert.equal(c.vars.AFW_MCP_CLOSURE_ENABLED,'false');assert.equal(c.vars.AFW_MCP_CLOSURE_POLICY,'');assert.equal(Object.keys(c.vars).some(x=>x.endsWith('_TOKEN')),false);
 assert.deepEqual(c.migrations.map(x=>x.tag),['afw-own-qa-closed-v1','afw-private-preregistry-v1']);
 assert.equal(c.d1_databases.length,1);assert.equal(c.d1_databases[0].database_id,'676ca49e-af71-4f2f-a12d-11f13de78a51');assert.deepEqual(c.workflows,[{name:'afw-own-qa-private-bootstrap',binding:'AFW_QA_BOOTSTRAP',class_name:'PrivateQaBootstrap'},{name:'afw-own-qa-private-confirmation',binding:'AFW_QA_NAMED_CONFIRMATION',class_name:'PrivateQaNamedConfirmation'}]);assert.deepEqual(c.version_metadata,{binding:'AFW_QA_VERSION'});
 for(const [name,value] of Object.entries(c.vars))if(name.endsWith('_ENABLED'))assert.equal(value,'false');
 assert.deepEqual(c.routes.map(x=>x.pattern),['https://operations-manager.agentfriendlyweb.dev/assistance/occurrences/*','https://operations-manager.agentfriendlyweb.dev/assistance/custody/confirm']);
 assert.deepEqual(c.durable_objects.bindings.find(x=>x.name==='AFW_MCP_CLOSURE_NODE'),{name:'AFW_MCP_CLOSURE_NODE',class_name:'AfwOwnEventNode',script_name:'agent-friendly-web-delegated-canary'});
});
