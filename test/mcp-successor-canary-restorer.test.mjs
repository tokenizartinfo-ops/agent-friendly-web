import test from 'node:test';
import assert from 'node:assert/strict';
import {restorationFixture,KEY,A,W,OP,ROOT,fixtureConfigHash} from './fixtures/canary-restoration.mjs';
const load=()=>import('../lib/mcp-successor-canary-restorer.mjs');
test('private coordinator restores only one pinned canary and reobserves completion without another effect',async()=>{
 const {createSuccessorCanaryRestorer}=await load(),f=restorationFixture(),r=createSuccessorCanaryRestorer(f.options);
 const one=await r.advance();assert.equal(one.status,'restored_observed');assert.equal(one.versionId,f.ids.closed);assert.equal(one.deploymentId,f.ids.closedDep);assert.equal(one.operationalReadiness,false);assert.equal(one.nativeWithdrawalVerified,false);assert.equal(one.mayRetry,false);assert.equal(f.posts,1);
 const post=f.calls.filter(c=>c.method==='POST');assert.equal(post.length,1);assert.equal(post[0].path,ROOT+'/workers/scripts/'+W+'/deployments');assert.deepEqual(post[0].body.versions,[{version_id:f.ids.closed,percentage:100}]);assert.equal(post[0].body.strategy,'percentage');assert.ok(f.calls.every(c=>c.path.startsWith('/accounts/'+A+'/')));assert.equal(f.state.operator.id,f.ids.opDep);
 const again=await createSuccessorCanaryRestorer(f.options).advance();assert.equal(again.status,'restored_observed');assert.equal(f.posts,1);assert.equal(f.storage.puts,2);assert.equal(f.storage.rows.get(KEY).phase,'complete');
});
test('closed mode caller arguments foreign namespace and expired policy cause no provider or storage writes',async()=>{
 const {createSuccessorCanaryRestorer}=await load();
 for(const change of [f=>f.control.enabled=false,f=>f.advance(120001),f=>f.policy.expiresAt=f.policy.startAt+600001,f=>f.policy.candidate.applicationId='foreign',f=>f.policy.extra='no',f=>f.options.namespace.idFromName=()=>({toString:()=>'e'.repeat(64)})]){
  const f=restorationFixture();change(f);f.savePolicy();const r=await createSuccessorCanaryRestorer(f.options).advance();assert.equal(r.status,'blocked');assert.equal(f.posts,0);assert.equal(f.calls.length,0);assert.equal(f.storage.puts,0);
 }
 const f=restorationFixture();assert.equal((await createSuccessorCanaryRestorer(f.options).advance({versionId:f.ids.closed})).status,'blocked');assert.equal(f.calls.length,0);
});
test('wrong modules resources configuration or flags in a claimed closed version block before issue',async()=>{
 const {createSuccessorCanaryRestorer}=await load();
 for(const change of [f=>f.state.closed.modules[0].content_base64=Buffer.from('wrong').toString('base64'),f=>f.state.closed.bindings.find(b=>b.name==='DB').id='foreign',f=>f.state.closed.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_NODE').namespace_id='e'.repeat(32),f=>f.state.closed.bindings[0].text='true',f=>f.state.operatorVersion.bindings[0].text='true',f=>f.state.closed.urls=['https://foreign.invalid'],f=>f.state.operatorVersion.containers=[{class_name:'foreign'}],f=>f.state.closed.compatibility_flags=[]]){
  const f=restorationFixture();change(f);assert.equal((await createSuccessorCanaryRestorer(f.options).advance()).status,'blocked');assert.equal(f.posts,0);assert.equal(f.storage.puts,0);
 }
 // Matching a newly computed hash must not bypass the actual false-flag gate.
 const f=restorationFixture();f.state.closed.bindings[0].text='true';f.policy.closed.configurationHash=fixtureConfigHash(f.state.closed);f.savePolicy();assert.equal((await createSuccessorCanaryRestorer(f.options).advance()).status,'blocked');assert.equal(f.posts,0);
});
test('unqualified changed or stale handoff is not restoration authority',async()=>{
 const {createSuccessorCanaryRestorer}=await load();
 for(const change of [f=>f.handoff.physicalStopVerified=false,f=>f.handoff.containerId='e'.repeat(64),f=>f.handoff.mayRestoreAdministration=true,f=>f.handoff.status='recorded',f=>f.options.readHandoff=async()=>({...f.handoff,observedAt:f.at-5001})]){
  const f=restorationFixture();change(f);assert.equal((await createSuccessorCanaryRestorer(f.options).advance()).status,'blocked');assert.equal(f.posts,0);assert.equal(f.storage.puts,0);
 }
 const f=restorationFixture();let n=0;f.options.readHandoff=async()=>({...f.handoff,processGeneration:++n===1?'d'.repeat(64):'e'.repeat(64)});assert.equal((await createSuccessorCanaryRestorer(f.options).advance()).status,'blocked');assert.equal(f.posts,0);
});
test('concurrent coordinators claim the single effect once',async()=>{
 const {createSuccessorCanaryRestorer}=await load(),f=restorationFixture();
 const results=await Promise.all([createSuccessorCanaryRestorer(f.options).advance(),createSuccessorCanaryRestorer(f.options).advance()]);
 assert.ok(results.some(x=>x.status==='restored_observed'));assert.equal(f.posts,1);assert.equal(f.storage.rows.get(KEY).phase,'complete');
});
test('lost issued storage ACK cannot dispatch or write again',async()=>{
 const {createSuccessorCanaryRestorer}=await load(),f=restorationFixture(),base=f.storage;let calls=0;
 f.options.storage={transaction:async fn=>{const value=await base.transaction(fn);if(++calls===2)throw Error('committed issued ACK lost');return value;}};
 assert.equal((await createSuccessorCanaryRestorer(f.options).advance()).status,'uncertain');assert.equal(f.posts,0);assert.equal(base.rows.get(KEY).phase,'issued');assert.equal(base.puts,1);
 assert.equal((await createSuccessorCanaryRestorer(f.options).advance()).status,'uncertain');assert.equal(f.posts,0);assert.equal(base.puts,1);
});
test('lost provider ACK remains issued and only observes closure without adopting it',async()=>{
 const {createSuccessorCanaryRestorer}=await load(),f=restorationFixture();
 f.options.request=async x=>{const r=await f.request(x);if(x.method==='POST')throw Error('provider ACK lost');return r;};
 assert.equal((await createSuccessorCanaryRestorer(f.options).advance()).status,'uncertain');assert.equal(f.posts,1);assert.equal(f.storage.rows.get(KEY).phase,'issued');
 assert.equal((await createSuccessorCanaryRestorer(f.options).advance()).status,'closed_observed_uncertain');assert.equal(f.posts,1);assert.equal(f.storage.puts,1);
});
test('unknown final storage ACK recovers by reading complete history with no second deployment',async()=>{
 const {createSuccessorCanaryRestorer}=await load(),f=restorationFixture(),base=f.storage;let calls=0;
 f.options.storage={transaction:async fn=>{const r=await base.transaction(fn);if(++calls===3)throw Error('complete ACK lost');return r;}};
 assert.equal((await createSuccessorCanaryRestorer(f.options).advance()).status,'uncertain');assert.equal(f.posts,1);assert.equal(base.rows.get(KEY).phase,'complete');
 assert.equal((await createSuccessorCanaryRestorer(f.options).advance()).status,'restored_observed');assert.equal(f.posts,1);
});
test('late conflict after issue is uncertain and never overrides a changed deployment',async()=>{
 const {createSuccessorCanaryRestorer}=await load(),f=restorationFixture(),base=f.storage;let calls=0;
 f.options.storage={transaction:async fn=>{const r=await base.transaction(fn);if(++calls===2)f.state.canary.id='77777777-7777-4777-8777-777777777777';return r;}};
 assert.equal((await createSuccessorCanaryRestorer(f.options).advance()).status,'uncertain');assert.equal(f.posts,0);assert.equal(base.rows.get(KEY).phase,'issued');
});
test('active or incompletely paged Workflow inventory blocks without mutating',async()=>{
 const {createSuccessorCanaryRestorer}=await load();
 for(const paged of [false,true]){const f=restorationFixture();f.state.active=!paged;f.options.request=async x=>{const r=await f.request(x);if(paged&&x.path.endsWith('/instances'))r.result_info={per_page:100,count:1,total_count:101};return r;};assert.equal((await createSuccessorCanaryRestorer(f.options).advance()).status,'blocked');assert.equal(f.posts,0);}
});
test('policy withdrawn during an await and a hung provider cannot escape the original lease',async()=>{
 const {createSuccessorCanaryRestorer}=await load(),f=restorationFixture();
 f.options.request=async x=>{const r=await f.request(x);f.control.enabled=false;return r;};assert.equal((await createSuccessorCanaryRestorer(f.options).advance()).status,'blocked');assert.equal(f.posts,0);
 const g=restorationFixture();let signal;g.options.request=x=>{signal=x.signal;return new Promise(()=>{});};
 assert.equal((await createSuccessorCanaryRestorer({...g.options,timeoutMs:30}).advance()).status,'blocked');assert.equal(signal.aborted,true);assert.equal(g.posts,0);
});
test('control and provider accessors are rejected without invoking getters',async()=>{
 const {createSuccessorCanaryRestorer}=await load(),f=restorationFixture();let used=false;
 f.options.readControl=()=>Object.defineProperty({enabled:true},'policy',{enumerable:true,get(){used=true;return f.control.policy;}});
 assert.equal((await createSuccessorCanaryRestorer(f.options).advance()).status,'blocked');assert.equal(used,false);assert.equal(f.posts,0);
 const g=restorationFixture();g.options.request=async x=>{const r=await g.request(x);if(x.path.endsWith('/versions/'+g.ids.closed))Object.defineProperty(r.result,'bindings',{enumerable:true,get(){used=true;return [];} });return r;};assert.equal((await createSuccessorCanaryRestorer(g.options).advance()).status,'blocked');assert.equal(used,false);assert.equal(g.posts,0);
});

test('original deadline includes final post-commit continuation and never reports a late success',async t=>{
 const {createSuccessorCanaryRestorer}=await load(),f=restorationFixture(),base=f.storage;let tick=100,n=0;
 t.mock.method(performance,'now',()=>tick);
 f.options.storage={transaction:async fn=>{const r=await base.transaction(fn);if(++n===3)queueMicrotask(()=>queueMicrotask(()=>queueMicrotask(()=>{tick=131;})));return r;}};
 const r=await createSuccessorCanaryRestorer({...f.options,timeoutMs:30}).advance();assert.equal(r.status,'uncertain');assert.equal(f.posts,1);
});

test('CI-only trace of the rejected synthetic restoration baseline',async()=>{
 const {readFile}=await import('node:fs/promises');
 let source=await readFile(new URL('../lib/mcp-successor-canary-restorer.mjs',import.meta.url),'utf8');
 source=source.replaceAll("from './","from '"+new URL('../lib/',import.meta.url).href);
 const marker="}catch{return outcome(issued?'uncertain':'blocked',planHash?{planHash}:{});}";
 assert.ok(source.includes(marker));
 source=source.replace(marker,"}catch(error){console.log('AFW_CI_DIAGNOSTIC_STACK',String(error.stack).replace(/data:text\\/javascript;base64,[A-Za-z0-9+/=]+/g,'ci-diagnostic'));return outcome(issued?'uncertain':'blocked',planHash?{planHash}:{});}");
 const m=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64')),f=restorationFixture(),r=await m.createSuccessorCanaryRestorer(f.options).advance();
 console.log('AFW_CI_DIAGNOSTIC_RESULT',JSON.stringify({status:r.status,calls:f.calls.length,puts:f.storage.puts}));
 assert.equal(r.status,'restored_observed');
});
