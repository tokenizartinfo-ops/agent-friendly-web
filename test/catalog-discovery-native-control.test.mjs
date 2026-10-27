import test from 'node:test';
import assert from 'node:assert/strict';
import {runCatalogDiscoveryControl} from '../scripts/catalog-discovery-native-control.mjs';
import {environment,start,end} from './fixtures/catalog-discovery-control.mjs';
const writes=s=>s.calls.filter(o=>['PUT','DELETE'].includes(o.method)||o.method==='POST'&&!o.path.endsWith('/query')&&!o.path.endsWith('/bulk/get'));
const live=r=>({versionId:r.versionId,deploymentId:r.deploymentId,configurationHash:r.configurationHash});
test('closed preflight reads exact material without registry, version or traffic writes',async()=>{
 const s=await environment(),r=await runCatalogDiscoveryControl({...s.params,mode:'preflight'},s.ctx);assert.equal(r.status,'preflight_passed',JSON.stringify(r));assert.equal(writes(s).length,0);assert.equal(r.operationalReadiness,false);assert.equal(r.apiCancellationSupported,false);
});
test('one OAuth opening has a bounded public client, one version and one promotion',async()=>{
 const s=await environment(),r=await runCatalogDiscoveryControl(s.params,s.ctx);assert.equal(r.status,'opened',JSON.stringify(r));assert.deepEqual(r.mutations,{clientPut:1,versionPost:1,deploymentPost:1,clientDelete:0});assert.equal(s.canary.versions[0].version_id,r.versionId);assert.equal(s.client.expiration,Math.floor(end/1000));assert.equal(s.client.value.tokenEndpointAuthMethod,'none');assert.equal('clientSecret' in s.client.value,false);assert.equal(r.mayRetry,false);assert.equal(r.operationalReadiness,false);assert.equal(s.calls.some(o=>/subscribe|instances$/.test(o.path)&&o.method!=='GET'),false);
});
test('catalog attaches only the genuine primary row to the same original window',async()=>{
 const s=await environment(),first=await runCatalogDiscoveryControl(s.params,s.ctx);s.wall=start+3000;s.rows=[s.grant()];s.activeGrants=1;s.calls=[];
 const r=await runCatalogDiscoveryControl({...s.params,phase:'catalog',live:live(first)},s.ctx);assert.equal(r.status,'catalog_attached',JSON.stringify(r));assert.equal(r.mutations.clientPut,0);assert.equal(r.mutations.versionPost,1);const v=s.versions.get(r.versionId),policy=JSON.parse(v.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_POLICY').text);assert.equal(policy.grantId,'own-grant');assert.equal(policy.expiresAt,end);assert.equal(v.bindings.find(b=>b.name==='AFW_DOSSIER_OWN_SAVE_ENABLED').text,'false');assert.equal(s.calls.some(o=>o.method==='POST'&&!o.path.endsWith('/query')&&!o.path.endsWith('/bulk/get')&&!o.path.endsWith('/versions')&&!o.path.endsWith('/deployments')),false);
});
test('ambiguous grant or changed pointer cannot be guessed or overwritten',async()=>{
 const s=await environment(),first=await runCatalogDiscoveryControl(s.params,s.ctx);s.wall=start+3000;s.rows=[s.grant(),s.grant()];s.activeGrants=2;s.calls=[];const r=await runCatalogDiscoveryControl({...s.params,phase:'catalog',live:live(first)},s.ctx);assert.equal(r.status,'blocked');assert.equal(writes(s).length,0);
 const t=await environment();t.interceptor=async(o,next)=>{const r=await next();if(o.method==='POST'&&o.path.endsWith('/versions'))t.canary.id='99999999-1111-4111-8111-111111111111';return r;};const moved=await runCatalogDiscoveryControl(t.params,t.ctx);assert.equal(moved.status,'uncertain');assert.equal(moved.mutations.versionPost,1);assert.equal(moved.mutations.deploymentPost,0);assert.equal(t.canary.id,'99999999-1111-4111-8111-111111111111');
});
test('unknown registry acknowledgement stops before any version or promotion and is not retried',async()=>{
 const s=await environment();s.interceptor=async(o,next)=>{const r=await next();return o.method==='PUT'?{...r,result:{}}:r;};const r=await runCatalogDiscoveryControl(s.params,s.ctx);assert.equal(r.status,'uncertain',JSON.stringify(r));assert.equal(r.mutations.clientPut,1);assert.equal(r.mutations.versionPost,0);assert.equal(r.mayRetry,false);assert.equal(s.calls.filter(o=>o.method==='PUT').length,1);
});
test('caller timeout fences late registry completion without claiming API cancellation',async()=>{
 const s=await environment();let release;const held=new Promise(resolve=>{release=resolve;});s.interceptor=async(o,next)=>{if(o.method==='PUT')await held;return next();};const r=await runCatalogDiscoveryControl(s.params,{...s.ctx,timeoutMs:3000});assert.equal(r.status,'uncertain',JSON.stringify(r));assert.equal(r.deadlineExceeded,true);assert.equal(r.apiCancellationSupported,false);release();await new Promise(resolve=>setTimeout(resolve,15));assert.equal(s.calls.filter(o=>o.method==='PUT').length,1);assert.equal(s.calls.filter(o=>o.method==='POST'&&o.path.endsWith('/versions')).length,0);
});
test('closure after expiry restores exact source and removes only the owned temporary public record',async()=>{
 const s=await environment(),first=await runCatalogDiscoveryControl(s.params,s.ctx);s.wall=end+1;s.calls=[];const r=await runCatalogDiscoveryControl({...s.params,phase:'close',live:live(first)},s.ctx);assert.equal(r.status,'closed',JSON.stringify(r));assert.equal(s.canary.versions[0].version_id,s.baseline.pin.baseVersionId);assert.equal(s.client,null);assert.equal(r.activeOwnGrants,0);assert.equal(r.mutations.versionPost,0);assert.equal(r.mutations.deploymentPost,1);assert.equal(r.mutations.clientDelete,1);
 const t=await environment(),opened=await runCatalogDiscoveryControl(t.params,t.ctx);t.client.metadata.trialId='b'.repeat(64);t.wall=end+1;const conflict=await runCatalogDiscoveryControl({...t.params,phase:'close',live:live(opened)},t.ctx);assert.equal(conflict.status,'uncertain');assert.equal(t.canary.versions[0].version_id,t.baseline.pin.baseVersionId);assert.ok(t.client);assert.equal(conflict.mutations.clientDelete,0);
});
test('invalid scope, active reservation or clock rewind fail before any write',async()=>{
 const s=await environment();assert.equal((await runCatalogDiscoveryControl({...s.params,projectId:'other-project'},s.ctx)).status,'blocked');assert.equal(writes(s).length,0);
 const t=await environment();t.reserved=1;assert.equal((await runCatalogDiscoveryControl(t.params,t.ctx)).status,'blocked');assert.equal(writes(t).length,0);
 const u=await environment();u.interceptor=async(o,next)=>{const r=await next();u.wall=start-1;return r;};assert.equal((await runCatalogDiscoveryControl(u.params,u.ctx)).status,'blocked');assert.equal(writes(u).length,0);
});

test('native instance pagination may omit page fields only with a complete matching total',async()=>{
 const s=await environment();s.interceptor=async(o,next)=>{const r=await next();if(o.method==='GET'&&o.path.endsWith('/instances')){delete r.result_info.page;delete r.result_info.total_pages;}return r;};assert.equal((await runCatalogDiscoveryControl({...s.params,mode:'preflight'},s.ctx)).status,'preflight_passed');assert.equal(writes(s).length,0);
 for(const change of [r=>r.result_info.total_count=1,r=>delete r.result_info.total_count,r=>r.result_info.cursor='next',r=>r.result_info.has_more=true]){const t=await environment();t.interceptor=async(o,next)=>{const r=await next();if(o.method==='GET'&&o.path.endsWith('/instances')){delete r.result_info.page;delete r.result_info.total_pages;change(r);}return r;};assert.equal((await runCatalogDiscoveryControl(t.params,t.ctx)).status,'blocked');assert.equal(writes(t).length,0);}
});
test('request function replacement after a read is fenced before the replacement runs',async()=>{
 const s=await environment();let substituted=0;s.interceptor=async(o,next)=>{const r=await next();s.ctx.request=async()=>{substituted++;throw Error('untrusted replacement');};return r;};const r=await runCatalogDiscoveryControl(s.params,s.ctx);assert.equal(r.status,'blocked');assert.equal(substituted,0);assert.equal(writes(s).length,0);
});

test('observed grant withdrawal or ambiguity fences catalog writes and the same grant must remain selected',async()=>{
 for(const scenario of ['withdraw-before-version','replace-before-version','ambiguity-before-promotion']){
  const s=await environment(),first=await runCatalogDiscoveryControl(s.params,s.ctx);s.wall=start+3000;s.rows=[s.grant()];s.activeGrants=1;s.calls=[];let grantReads=0,counts=0;
  s.interceptor=async(o,next)=>{
   if(o.method==='POST'&&o.path.endsWith('/query')){
    if(o.body.sql.includes('AS project_owner')){grantReads++;if(scenario==='replace-before-version'&&grantReads===2)s.rows[0]={...s.rows[0],id:'different-current-grant'};}
    else {counts++;if(scenario==='withdraw-before-version'&&counts===2){s.activeGrants=0;s.rows[0].revoked_at=new Date(start+2500).toISOString();}}
   }
   const r=await next();if(scenario==='ambiguity-before-promotion'&&o.method==='POST'&&o.path.endsWith('/versions')){s.activeGrants=2;s.rows=[s.grant(),{...s.grant(),id:'second-grant'}];}return r;
  };
  const r=await runCatalogDiscoveryControl({...s.params,phase:'catalog',live:live(first)},s.ctx);
  assert.equal(r.status,scenario==='ambiguity-before-promotion'?'uncertain':'blocked');assert.equal(r.mutations.deploymentPost,0);assert.equal(r.mutations.versionPost,scenario==='ambiguity-before-promotion'?1:0);
 }
});
test('grant withdrawal observed after promotion is uncertain and retains the intended hash for closure',async()=>{
 const s=await environment(),first=await runCatalogDiscoveryControl(s.params,s.ctx);s.wall=start+3000;s.rows=[s.grant()];s.activeGrants=1;s.calls=[];
 s.interceptor=async(o,next)=>{const r=await next();if(o.method==='POST'&&o.path.endsWith('/deployments')){s.activeGrants=0;s.rows[0].revoked_at=new Date(start+2500).toISOString();}return r;};
 const r=await runCatalogDiscoveryControl({...s.params,phase:'catalog',live:live(first)},s.ctx);assert.equal(r.status,'uncertain',JSON.stringify(r));assert.equal(r.mutations.deploymentPost,1);assert.match(r.configurationHash,/^[a-f0-9]{64}$/);assert.ok(r.candidate);assert.ok(r.liveDeployment);
});

test('acknowledged public client may become visible on a later bounded read without another PUT',async t=>{
 t.mock.timers.enable({apis:['setTimeout']});
 const s=await environment();let written=false,read=0,release;
 const stale=new Promise(resolve=>{release=resolve;});
 s.interceptor=async(o,next)=>{const r=await next();if(o.method==='PUT')written=true;if(written&&o.path.endsWith('/bulk/get')&&++read===1){release();return{...r,result:{values:{'client:afw-chatgpt-pilot-20261003':null}}};}return r;};
 const pending=runCatalogDiscoveryControl(s.params,s.ctx);await Promise.race([stale,pending]);await new Promise(resolve=>setImmediate(resolve));t.mock.timers.tick(7500);
 const r=await pending;assert.equal(r.status,'opened',JSON.stringify(r));assert.equal(s.calls.filter(o=>o.method==='PUT').length,1);assert.equal(r.mutations.versionPost,1);assert.equal(r.mutations.deploymentPost,1);assert.equal(s.client.expiration,Math.floor(end/1000));assert.equal(r.originalExpiresAt,end);
});
test('invisible acknowledged public client exhausts bounded observations without version, promotion or PUT replay',async t=>{
 t.mock.timers.enable({apis:['setTimeout']});
 const s=await environment();let written=false,read=0;const releases=[],seen=Array.from({length:9},()=>new Promise(resolve=>releases.push(resolve)));
 s.interceptor=async(o,next)=>{const r=await next();if(o.method==='PUT')written=true;if(written&&o.path.endsWith('/bulk/get')){releases[read++]?.();return{...r,result:{values:{'client:afw-chatgpt-pilot-20261003':null}}};}return r;};
 const pending=runCatalogDiscoveryControl(s.params,s.ctx);
 for(let n=0;n<8;n++){await Promise.race([seen[n],pending]);await new Promise(resolve=>setImmediate(resolve));t.mock.timers.tick(7500);}
 const r=await pending;assert.equal(r.status,'uncertain');assert.equal(r.stage,'registry_readback_timeout');assert.equal(read,9);assert.equal(s.calls.filter(o=>o.method==='PUT').length,1);assert.equal(r.mutations.versionPost,0);assert.equal(r.mutations.deploymentPost,0);assert.equal(r.mayRetry,false);
});
test('foreign registry value after an absent observation is rejected without traffic changes',async t=>{
 t.mock.timers.enable({apis:['setTimeout']});
 const s=await environment();let written=false,read=0,release;const stale=new Promise(resolve=>{release=resolve;});
 s.interceptor=async(o,next)=>{const r=await next();if(o.method==='PUT')written=true;if(written&&o.path.endsWith('/bulk/get')){read++;if(read===1){release();return{...r,result:{values:{'client:afw-chatgpt-pilot-20261003':null}}};}s.client.metadata.trialId='b'.repeat(64);return{...r,result:{values:{'client:afw-chatgpt-pilot-20261003':s.client}}};}return r;};
 const pending=runCatalogDiscoveryControl(s.params,s.ctx);await Promise.race([stale,pending]);await new Promise(resolve=>setImmediate(resolve));t.mock.timers.tick(7500);const r=await pending;
 assert.equal(r.status,'uncertain');assert.equal(read,2);assert.equal(r.mutations.versionPost,0);assert.equal(r.mutations.deploymentPost,0);assert.equal(s.client.metadata.trialId,'b'.repeat(64));assert.equal(r.mutations.clientDelete,0);
});
test('closure observes delayed tombstone after one DELETE while keeping the host closed',async t=>{
 t.mock.timers.enable({apis:['setTimeout']});
 const s=await environment(),opened=await runCatalogDiscoveryControl(s.params,s.ctx);s.wall=end+1;s.calls=[];let deleted=false,staleOnce=false,release,previous;const stale=new Promise(resolve=>{release=resolve;});
 s.interceptor=async(o,next)=>{if(o.method==='DELETE')previous=structuredClone(s.client);const r=await next();if(o.method==='DELETE')deleted=true;if(deleted&&!staleOnce&&o.path.endsWith('/bulk/get')){staleOnce=true;release();return{...r,result:{values:{'client:afw-chatgpt-pilot-20261003':previous}}};}return r;};
 const pending=runCatalogDiscoveryControl({...s.params,phase:'close',live:live(opened)},s.ctx);await Promise.race([stale,pending]);await new Promise(resolve=>setImmediate(resolve));t.mock.timers.tick(7500);const r=await pending;
 assert.equal(r.status,'closed',JSON.stringify(r));assert.equal(s.canary.versions[0].version_id,s.baseline.pin.baseVersionId);assert.equal(s.calls.filter(o=>o.method==='DELETE').length,1);assert.equal(s.client,null);assert.equal(r.permissionWithdrawalProven,false);
});
test('visibility wait respects the original deadline and never starts a late version write',async t=>{
 t.mock.timers.enable({apis:['setTimeout']});
 const s=await environment();let written=false,release;const stale=new Promise(resolve=>{release=resolve;});
 s.interceptor=async(o,next)=>{const r=await next();if(o.method==='PUT')written=true;if(written&&o.path.endsWith('/bulk/get')){release();return{...r,result:{values:{'client:afw-chatgpt-pilot-20261003':null}}};}return r;};
 const pending=runCatalogDiscoveryControl(s.params,s.ctx);await Promise.race([stale,pending]);s.wall=end-89999;await new Promise(resolve=>setImmediate(resolve));t.mock.timers.tick(7500);const r=await pending;
 assert.equal(r.status,'uncertain');assert.equal(r.mutations.clientPut,1);assert.equal(r.mutations.versionPost,0);assert.equal(r.mutations.deploymentPost,0);assert.equal(r.mayRetry,false);
});

function delayedRegistryWithFourVersionPages(s,delays){
 let written=false,reads=0;const releases=[],seen=Array.from({length:delays},()=>new Promise(resolve=>releases.push(resolve)));
 s.interceptor=async(o,next)=>{
  const r=await next();
  if(o.method==='GET'&&o.path.endsWith('/workers/workers/agent-friendly-web-delegated-canary/versions')){
   const all=[{id:s.baseline.pin.baseVersionId},...Array.from({length:300},(_,i)=>({id:(1000+i).toString(16).padStart(8,'0')+'-2222-4222-8222-222222222222'}))];
   const page=o.query.page,rows=all.slice((page-1)*100,page*100);
   return{...r,result:rows,result_info:{page,per_page:100,count:rows.length,total_count:301,total_pages:4}};
  }
  if(o.method==='PUT')written=true;
  if(written&&o.path.endsWith('/bulk/get')&&++reads<=delays){releases[reads-1]();return{...r,result:{values:{'client:afw-chatgpt-pilot-20261003':null}}};}
  return r;
 };
 return seen;
}
test('four version pages and eight delayed observations stop before version creation when the final tail cannot fit',async t=>{
 t.mock.timers.enable({apis:['setTimeout']});const s=await environment(),seen=delayedRegistryWithFourVersionPages(s,8);
 const pending=runCatalogDiscoveryControl(s.params,s.ctx);for(const ready of seen){await Promise.race([ready,pending]);await new Promise(resolve=>setImmediate(resolve));t.mock.timers.tick(7500);}
 const r=await pending;assert.equal(r.status,'uncertain');assert.equal(r.stage,'version_budget_admission');assert.equal(r.mutations.clientPut,1);assert.equal(r.mutations.versionPost,0);assert.equal(r.mutations.deploymentPost,0);assert.equal(s.canary.versions[0].version_id,s.baseline.pin.baseVersionId);assert.equal(r.mayRetry,false);
});
test('four version pages and seven delayed observations leave exactly64 reads for a complete successful opening',async t=>{
 t.mock.timers.enable({apis:['setTimeout']});const s=await environment(),seen=delayedRegistryWithFourVersionPages(s,7);
 const pending=runCatalogDiscoveryControl(s.params,s.ctx);for(const ready of seen){await Promise.race([ready,pending]);await new Promise(resolve=>setImmediate(resolve));t.mock.timers.tick(7500);}
 const r=await pending;assert.equal(r.status,'opened',JSON.stringify(r));assert.equal(r.apiReads,64);assert.equal(r.mutations.clientPut,1);assert.equal(r.mutations.versionPost,1);assert.equal(r.mutations.deploymentPost,1);assert.equal(r.originalExpiresAt,end);
});

for(const scenario of ['open-version','open-promotion','catalog-existing','catalog-version','catalog-promotion']){
 test('transient public registry absence at '+scenario+' is observed without replaying writes',async t=>{
  t.mock.timers.enable({apis:['setTimeout']});const s=await environment();let p=s.params;
  if(scenario.startsWith('catalog')){const first=await runCatalogDiscoveryControl(p,s.ctx);s.wall=start+3000;s.rows=[s.grant()];s.activeGrants=1;s.calls=[];p={...p,phase:'catalog',live:live(first)};}
  let written=scenario.startsWith('catalog'),read=0,release;const stale=new Promise(resolve=>{release=resolve;});
  const at=scenario==='open-version'||scenario==='catalog-version'?2:scenario==='catalog-existing'?1:3;
  s.interceptor=async(o,next)=>{const r=await next();if(o.method==='PUT')written=true;if(written&&o.path.endsWith('/bulk/get')&&++read===at){release();return{...r,result:{values:{'client:afw-chatgpt-pilot-20261003':null}}};}return r;};
  const pending=runCatalogDiscoveryControl(p,s.ctx);await Promise.race([stale,pending]);await new Promise(resolve=>setImmediate(resolve));t.mock.timers.tick(7500);const r=await pending;
  assert.equal(r.status,scenario.startsWith('catalog')?'catalog_attached':'opened',JSON.stringify(r));assert.equal(r.mutations.clientPut,scenario.startsWith('catalog')?0:1);assert.equal(r.mutations.versionPost,1);assert.equal(r.mutations.deploymentPost,1);assert.equal(r.registryRechecks,1);assert.equal(r.originalExpiresAt,end);assert.ok(r.apiReads<=64);
 });
}
test('registry rechecks share one budget across opening admission points',async t=>{
 t.mock.timers.enable({apis:['setTimeout']});const s=await environment();let written=false,read=0,delayed=0;const releases=[],seen=Array.from({length:9},()=>new Promise(resolve=>releases.push(resolve)));
 s.interceptor=async(o,next)=>{const r=await next();if(o.method==='PUT')written=true;if(written&&o.path.endsWith('/bulk/get')){read++;if(read<=4||read>=6&&read<=10){releases[delayed++]?.();return{...r,result:{values:{'client:afw-chatgpt-pilot-20261003':null}}};}}return r;};
 const pending=runCatalogDiscoveryControl(s.params,s.ctx);for(const ready of seen){await Promise.race([ready,pending]);await new Promise(resolve=>setImmediate(resolve));t.mock.timers.tick(7500);}
 const r=await pending;assert.equal(r.status,'uncertain');assert.equal(r.registryRechecks,8);assert.equal(read,10);assert.equal(r.mutations.clientPut,1);assert.equal(r.mutations.versionPost,0);assert.equal(r.mutations.deploymentPost,0);assert.equal(r.mayRetry,false);
});
test('pointer drift during a later registry wait is revalidated before version creation',async t=>{
 t.mock.timers.enable({apis:['setTimeout']});const s=await environment();let written=false,read=0,release;const stale=new Promise(resolve=>{release=resolve;});
 s.interceptor=async(o,next)=>{const r=await next();if(o.method==='PUT')written=true;if(written&&o.path.endsWith('/bulk/get')&&++read===2){s.canary.id='99999999-1111-4111-8111-111111111111';release();return{...r,result:{values:{'client:afw-chatgpt-pilot-20261003':null}}};}return r;};
 const pending=runCatalogDiscoveryControl(s.params,s.ctx);await Promise.race([stale,pending]);await new Promise(resolve=>setImmediate(resolve));t.mock.timers.tick(7500);const r=await pending;
 assert.equal(r.status,'uncertain');assert.equal(r.mutations.versionPost,0);assert.equal(r.mutations.deploymentPost,0);assert.equal(s.canary.id,'99999999-1111-4111-8111-111111111111');
});
test('later visibility observations reserve the promotion tail before changing traffic',async t=>{
 t.mock.timers.enable({apis:['setTimeout']});const s=await environment(),seen=delayedRegistryWithFourVersionPages(s,0);void seen;
 const pageRequest=s.interceptor;let written=false,read=0;const releases=[],waits=Array.from({length:8},()=>new Promise(resolve=>releases.push(resolve)));
 s.interceptor=async(o,next)=>{const r=await pageRequest(o,next);if(o.method==='PUT')written=true;if(written&&o.path.endsWith('/bulk/get')&&++read>=3&&read<=10){releases[read-3]();return{...r,result:{values:{'client:afw-chatgpt-pilot-20261003':null}}};}return r;};
 const pending=runCatalogDiscoveryControl(s.params,s.ctx);for(const ready of waits){await Promise.race([ready,pending]);await new Promise(resolve=>setImmediate(resolve));t.mock.timers.tick(7500);}
 const r=await pending;assert.equal(r.status,'uncertain');assert.equal(r.stage,'promotion_budget_admission');assert.equal(r.mutations.clientPut,1);assert.equal(r.mutations.versionPost,1);assert.equal(r.mutations.deploymentPost,0);assert.equal(s.canary.versions[0].version_id,s.baseline.pin.baseVersionId);
});

for(const phase of ['open','catalog']){
 test('passive activity appearing during '+phase+' version registry wait prevents inactive version creation',async t=>{
  t.mock.timers.enable({apis:['setTimeout']});const s=await environment();let p=s.params;
  if(phase==='catalog'){const first=await runCatalogDiscoveryControl(p,s.ctx);s.wall=start+3000;s.rows=[s.grant()];s.activeGrants=1;s.calls=[];p={...p,phase:'catalog',live:live(first)};}
  let written=phase==='catalog',read=0,active=false,release;const stale=new Promise(resolve=>{release=resolve;});
  s.interceptor=async(o,next)=>{
   const r=await next();if(o.method==='PUT')written=true;
   if(written&&o.path.endsWith('/bulk/get')&&++read===2){active=true;release();return{...r,result:{values:{'client:afw-chatgpt-pilot-20261003':null}}};}
   if(active&&o.method==='GET'&&o.path.endsWith('/workflows/afw-release-administrative/instances'))return{...r,result:[{id:'new-active-workflow',status:'running'}],result_info:{page:1,per_page:100,count:1,total_count:1,total_pages:1}};
   return r;
  };
  const pending=runCatalogDiscoveryControl(p,s.ctx);await Promise.race([stale,pending]);await new Promise(resolve=>setImmediate(resolve));t.mock.timers.tick(7500);const r=await pending;
  assert.equal(r.status,phase==='open'?'uncertain':'blocked');assert.equal(r.mutations.versionPost,0);assert.equal(r.mutations.deploymentPost,0);assert.equal(s.canary.versions[0].version_id,p.live?.versionId??s.baseline.pin.baseVersionId);
 });
}

test('catalog receipt exposes the conservative dispatch deadline, closure removes diagnostics',async()=>{
 const s=await environment(),first=await runCatalogDiscoveryControl(s.params,s.ctx);s.wall=start+3000;s.rows=[s.grant()];s.activeGrants=1;
 const r=await runCatalogDiscoveryControl({...s.params,phase:'catalog',live:live(first)},s.ctx);
 assert.equal(r.status,'catalog_attached',JSON.stringify(r));assert.equal(r.catalogDispatchBefore,start+242000);
 const fields=s.versions.get(r.versionId).bindings.filter(b=>b.name.startsWith('AFW_MCP_DISCOVERY_DIAGNOSTIC_'));
 assert.equal(fields.length,3);assert.equal(fields.find(b=>b.name.endsWith('_EXPIRES_AT')).text,String(end));
 s.wall=end+1;s.activeGrants=0;s.calls=[];
 const closed=await runCatalogDiscoveryControl({...s.params,phase:'close',live:live(r)},s.ctx);assert.equal(closed.status,'closed',JSON.stringify(closed));
 const v=s.versions.get(s.canary.versions[0].version_id);assert.equal(v.bindings.length,29);assert.equal(v.bindings.some(b=>b.name.startsWith('AFW_MCP_DISCOVERY_DIAGNOSTIC_')),false);
});
test('late catalog admission stops without a new version or promotion despite an active ten-minute grant',async()=>{
 const s=await environment(),first=await runCatalogDiscoveryControl(s.params,s.ctx);s.wall=start+242000;s.rows=[s.grant()];s.activeGrants=1;s.calls=[];
 const r=await runCatalogDiscoveryControl({...s.params,phase:'catalog',live:live(first)},s.ctx);
 assert.equal(r.status,'blocked',JSON.stringify(r));assert.equal(writes(s).length,0);assert.equal(s.canary.versions[0].version_id,first.versionId);
});
test('grant query latency consumes dispatch budget before version creation',async()=>{
 const s=await environment(),first=await runCatalogDiscoveryControl(s.params,s.ctx);s.wall=start+3000;s.rows=[s.grant()];s.activeGrants=1;s.calls=[];let reads=0;
 s.interceptor=async(o,next)=>{const r=await next();if(o.method==='POST'&&o.path.endsWith('/query')&&o.body.sql.includes('AS project_owner')&&++reads===2)s.wall=start+242000;return r;};
 const r=await runCatalogDiscoveryControl({...s.params,phase:'catalog',live:live(first)},s.ctx);
 assert.equal(r.status,'blocked',JSON.stringify(r));assert.equal(r.mutations.versionPost,0);assert.equal(r.mutations.deploymentPost,0);
});
test('version acknowledgement latency prevents promotion after the dispatch deadline',async()=>{
 const s=await environment(),first=await runCatalogDiscoveryControl(s.params,s.ctx);s.wall=start+3000;s.rows=[s.grant()];s.activeGrants=1;s.calls=[];
 s.interceptor=async(o,next)=>{const r=await next();if(o.method==='POST'&&o.path.endsWith('/versions'))s.wall=start+242000;return r;};
 const r=await runCatalogDiscoveryControl({...s.params,phase:'catalog',live:live(first)},s.ctx);
 assert.equal(r.status,'uncertain',JSON.stringify(r));assert.equal(r.mutations.versionPost,1);assert.equal(r.mutations.deploymentPost,0);assert.equal(s.canary.versions[0].version_id,first.versionId);
});

test('time crossing after the final grant observation is fenced at the effect boundary',async()=>{
 const s=await environment(),first=await runCatalogDiscoveryControl(s.params,s.ctx);s.wall=start+3000;s.rows=[s.grant()];s.activeGrants=1;s.calls=[];
 let primary=0,armed=false,checks=0;
 s.ctx.now=()=>armed?start+242000-(checks++<2?1:0):s.wall;
 s.interceptor=async(o,next)=>{const r=await next();if(o.method==='POST'&&o.path.endsWith('/query')&&o.body.sql.includes('AS project_owner')&&++primary===2)armed=true;return r;};
 const r=await runCatalogDiscoveryControl({...s.params,phase:'catalog',live:live(first)},s.ctx);
 assert.equal(r.status,'blocked',JSON.stringify(r));assert.equal(r.mutations.versionPost,0);assert.equal(r.mutations.deploymentPost,0);
});

test('observed invocation deadline after initial read is preserved in the blocked receipt',async()=>{
 const s=await environment();s.interceptor=async(o,next)=>{const r=await next();s.mono=110000;return r;};
 const r=await runCatalogDiscoveryControl(s.params,s.ctx);assert.equal(r.status,'blocked');assert.equal(r.deadlineExceeded,true);
 assert.equal(writes(s).length,0);assert.equal(r.apiCancellationSupported,false);assert.equal(r.mayRetry,false);
});
test('observed invocation deadline after registry ACK stays uncertain without replay',async()=>{
 const s=await environment();s.interceptor=async(o,next)=>{const r=await next();if(o.method==='PUT')s.mono=110000;return r;};
 const r=await runCatalogDiscoveryControl(s.params,s.ctx);assert.equal(r.status,'uncertain');assert.equal(r.deadlineExceeded,true);
 assert.equal(r.mutations.clientPut,1);assert.equal(r.mutations.versionPost,0);assert.equal(s.calls.filter(o=>o.method==='PUT').length,1);assert.ok(s.client);assert.equal(r.mayRetry,false);
});
test('observed invocation deadline reading the new module retains the inactive candidate',async()=>{
 const s=await environment();let made;
 s.interceptor=async(o,next)=>{const r=await next();if(o.method==='POST'&&o.path.endsWith('/versions'))made=r.result.id;if(made&&o.method==='GET'&&o.path.endsWith('/versions/'+made))s.mono=110000;return r;};
 const r=await runCatalogDiscoveryControl(s.params,s.ctx);assert.equal(r.status,'uncertain');assert.equal(r.stage,'inactive_version');assert.equal(r.deadlineExceeded,true);
 assert.equal(r.candidate,made);assert.equal(r.mutations.versionPost,1);assert.equal(r.mutations.deploymentPost,0);assert.ok(s.versions.has(made));assert.equal(s.canary.versions[0].version_id,s.baseline.pin.baseVersionId);assert.equal(r.apiCancellationSupported,false);
});
test('business window and catalog dispatch cutoff are distinct from invocation timeout',async()=>{
 const s=await environment();s.wall=end;const expired=await runCatalogDiscoveryControl(s.params,s.ctx);assert.equal(expired.status,'blocked');assert.notEqual(expired.deadlineExceeded,true);assert.equal(writes(s).length,0);
 const t=await environment(),opened=await runCatalogDiscoveryControl(t.params,t.ctx);t.wall=start+242000;t.rows=[t.grant()];t.activeGrants=1;t.calls=[];
 const cut=await runCatalogDiscoveryControl({...t.params,phase:'catalog',live:live(opened)},t.ctx);assert.equal(cut.status,'blocked');assert.notEqual(cut.deadlineExceeded,true);assert.equal(writes(t).length,0);
});
test('invalid or unrepresentable monotonic readings are not reported as elapsed budget',async()=>{
 for(const value of [NaN,Infinity,-1]){const s=await environment();s.interceptor=async(o,next)=>{const r=await next();s.mono=value;return r;};const r=await runCatalogDiscoveryControl(s.params,s.ctx);assert.equal(r.status,'blocked');assert.notEqual(r.deadlineExceeded,true);assert.equal(writes(s).length,0);}
 const s=await environment();s.ctx.monotonic=()=>1e308;const r=await runCatalogDiscoveryControl(s.params,s.ctx);assert.equal(r.status,'blocked');assert.notEqual(r.deadlineExceeded,true);assert.equal(writes(s).length,0);
});
