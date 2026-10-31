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

test('empty passive inventories cannot qualify incomplete or ambiguous primary pages',async t=>{
 const {createSuccessorCanaryRestorer}=await load();
 const cases=[
  {suffix:'/instances-v2',missing:true},
  {suffix:'/instances-v2',info:null},
  {suffix:'/instances-v2',info:{per_page:100,page:2,total_pages:2}},
  {suffix:'/instances-v2',info:{per_page:100,next_page_token:'remaining'}},
  {suffix:'/instances-v2',info:{per_page:100,page_token:'previous'}},
  {suffix:'/instances-v2',info:{per_page:1}},
  {suffix:'/instances-v2',info:{per_page:100,total_count:1}},
  ...[W,OP].flatMap(n=>['schedules','tails'].flatMap(part=>[
   {suffix:'/workers/scripts/'+n+'/'+part,info:{page:2,total_pages:2}},
   {suffix:'/workers/scripts/'+n+'/'+part,info:{has_more:true}},
   {suffix:'/workers/scripts/'+n+'/'+part,info:{next_page_token:'remaining'}}
  ]))
 ];
 for(const c of cases)await t.test(JSON.stringify(c),async()=>{
  const f=restorationFixture();f.options.request=async x=>{const r=await f.request(x);if(x.path.endsWith(c.suffix)){if(c.missing)delete r.result_info;else r.result_info=c.info;}return r;};
  const r=await createSuccessorCanaryRestorer(f.options).advance();
  assert.equal(r.status,'blocked',JSON.stringify(c));assert.equal(f.posts,0);assert.equal(f.storage.puts,0);
 });
});

test('partial passive readback after dispatch stays issued uncertain and cannot retry',async t=>{
 const {createSuccessorCanaryRestorer}=await load();
 for(const c of [
  {suffix:'/instances-v2',info:{per_page:100,page_token:'previous'}},
  {suffix:'/workers/scripts/'+W+'/tails',info:{next_cursor:'remaining'}}
 ])await t.test(c.suffix,async()=>{
  const f=restorationFixture();f.options.request=async x=>{const r=await f.request(x);if(f.posts>0&&x.path.endsWith(c.suffix))r.result_info=c.info;return r;};
  const one=await createSuccessorCanaryRestorer(f.options).advance();assert.equal(one.status,'uncertain');assert.equal(f.posts,1);assert.equal(f.storage.rows.get(KEY).phase,'issued');
  assert.equal((await createSuccessorCanaryRestorer(f.options).advance()).status,'uncertain');assert.equal(f.posts,1);assert.equal(f.storage.puts,1);
 });
});

const QF=ROOT+'/workflows/afw-own-qa-private-confirmation';
for(const status of ['queued','running','paused','unknown','waitingForPause','waiting','rollingBack'])test('new private QA confirmator must be terminal before canary restore: '+status,async()=>{
 const {createSuccessorCanaryRestorer}=await load(),f=restorationFixture();f.options.request=async x=>{const r=await f.request(x);if(x.path===QF+'/instances')r.result[0].status=status;return r;};
 assert.equal((await createSuccessorCanaryRestorer(f.options).advance()).status,'blocked');assert.equal(f.posts,0);assert.equal(f.storage.puts,0);
});
for(const change of [f=>f.id='77777777-7777-4777-8777-777777777777',f=>f.script_name=OP,f=>f.class_name='PrivateQaBootstrap',f=>f.script_deleted=true,f=>f.schedules=['unexpected']])test('foreign or scheduled private QA definition is never restoration evidence '+change.toString(),async()=>{
 const {createSuccessorCanaryRestorer}=await load(),f=restorationFixture();f.options.request=async x=>{const r=await f.request(x);if(x.path===QF)change(r.result);return r;};assert.equal((await createSuccessorCanaryRestorer(f.options).advance()).status,'blocked');assert.equal(f.posts,0);
});
test('bounded cursor inventory reads every terminal page for both fixed workflows before restore',async()=>{
 const {createSuccessorCanaryRestorer}=await load(),f=restorationFixture();f.options.request=async x=>{const r=await f.request(x);if([QF+'/instances',ROOT+'/workflows/afw-release-administrative/instances'].includes(x.path)){const second=!!x.query.cursor;r.result=[{id:(x.path===QF+'/instances'?'qa':'admin')+'-page-'+(second?'2':'1'),workflow_id:x.path===QF+'/instances'?'707e5440-2af3-4a0c-8fff-d40efc9895c4':'0ee9231b-8952-46bd-8124-a0c5dbb06dd0',status:'complete'}];r.result_info={per_page:100,count:1,total_count:2,...second?{}:{cursor:'next-page'}};}return r;};
 assert.equal((await createSuccessorCanaryRestorer(f.options).advance()).status,'restored_observed');assert.equal(f.posts,1);assert.ok(f.calls.some(x=>x.path===QF+'/instances'&&x.query?.cursor==='next-page'));assert.ok(f.calls.some(x=>x.path.includes('afw-release-administrative/instances')&&x.query?.cursor==='next-page'));
});
for(const bad of ['second-active','duplicate-id','repeated-cursor','over-four-pages','oversized-cursor','missing-next-cursor'])test('ambiguous or active later QA page blocks before issue: '+bad,async()=>{
 const {createSuccessorCanaryRestorer}=await load(),f=restorationFixture();f.options.request=async x=>{const r=await f.request(x);if(x.path!==QF+'/instances')return r;const n=x.query.cursor?Number(x.query.cursor.split('-').at(-1)):0;
 r.result=[{id:bad==='duplicate-id'?'same-id':'qa-page-'+n,workflow_id:'707e5440-2af3-4a0c-8fff-d40efc9895c4',status:bad==='second-active'&&n?'running':'complete'}];r.result_info={per_page:100,count:1,total_count:bad==='over-four-pages'?5:2};
 if(!n)r.result_info.cursor=bad==='oversized-cursor'?'x'.repeat(1025):'next-1';
 else if(bad==='repeated-cursor')r.result_info.cursor='next-1';else if(bad==='over-four-pages')r.result_info.cursor='next-'+(n+1);
 if(bad==='missing-next-cursor')delete r.result_info.cursor;return r;};
 assert.equal((await createSuccessorCanaryRestorer(f.options).advance()).status,'blocked');assert.equal(f.posts,0);assert.equal(f.storage.puts,0);assert.ok(f.calls.filter(x=>x.path===QF+'/instances').length<=4);
});

for(const path of [QF+'/instances',ROOT+'/workflows/afw-release-administrative/instances'])for(const variant of ['foreign','absent'])test('listed instance must belong to the exact fixed definition '+path+' '+variant,async()=>{
 const {createSuccessorCanaryRestorer}=await load(),f=restorationFixture();f.options.request=async x=>{const r=await f.request(x);if(x.path===path){if(variant==='foreign')r.result[0].workflow_id='77777777-7777-4777-8777-777777777777';else delete r.result[0].workflow_id;}return r;};assert.equal((await createSuccessorCanaryRestorer(f.options).advance()).status,'blocked');assert.equal(f.posts,0);assert.equal(f.storage.puts,0);
});
