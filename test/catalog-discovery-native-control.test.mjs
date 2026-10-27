import test from 'node:test';
import assert from 'node:assert/strict';
import {runCatalogDiscoveryControl} from '../scripts/catalog-discovery-native-control.mjs';
import {environment,start,end} from './fixtures/catalog-discovery-control.mjs';
const writes=s=>s.calls.filter(o=>['PUT','DELETE'].includes(o.method)||o.method==='POST'&&!o.path.endsWith('/query')&&!o.path.endsWith('/bulk/get'));
const live=r=>({versionId:r.versionId,deploymentId:r.deploymentId,configurationHash:r.configurationHash});
test('closed preflight reads exact material without registry, version or traffic writes',async()=>{
 const s=await environment(),r=await runCatalogDiscoveryControl({...s.params,mode:'preflight'},s.ctx);assert.equal(r.status,'preflight_passed');assert.equal(writes(s).length,0);assert.equal(r.operationalReadiness,false);assert.equal(r.apiCancellationSupported,false);
});
test('one OAuth opening has a bounded public client, one version and one promotion',async()=>{
 const s=await environment(),r=await runCatalogDiscoveryControl(s.params,s.ctx);assert.equal(r.status,'opened');assert.deepEqual(r.mutations,{clientPut:1,versionPost:1,deploymentPost:1,clientDelete:0});assert.equal(s.canary.versions[0].version_id,r.versionId);assert.equal(s.client.expiration,Math.floor(end/1000));assert.equal(s.client.value.tokenEndpointAuthMethod,'none');assert.equal('clientSecret' in s.client.value,false);assert.equal(r.mayRetry,false);assert.equal(r.operationalReadiness,false);assert.equal(s.calls.some(o=>/subscribe|instances$/.test(o.path)&&o.method!=='GET'),false);
});
test('catalog attaches only the genuine primary row to the same original window',async()=>{
 const s=await environment(),first=await runCatalogDiscoveryControl(s.params,s.ctx);s.wall=start+3000;s.rows=[s.grant()];s.activeGrants=1;s.calls=[];
 const r=await runCatalogDiscoveryControl({...s.params,phase:'catalog',live:live(first)},s.ctx);assert.equal(r.status,'catalog_attached');assert.equal(r.mutations.clientPut,0);assert.equal(r.mutations.versionPost,1);const v=s.versions.get(r.versionId),policy=JSON.parse(v.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_POLICY').text);assert.equal(policy.grantId,'own-grant');assert.equal(policy.expiresAt,end);assert.equal(v.bindings.find(b=>b.name==='AFW_DOSSIER_OWN_SAVE_ENABLED').text,'false');assert.equal(s.calls.some(o=>o.method==='POST'&&!o.path.endsWith('/query')&&!o.path.endsWith('/bulk/get')&&!o.path.endsWith('/versions')&&!o.path.endsWith('/deployments')),false);
});
test('ambiguous grant or changed pointer cannot be guessed or overwritten',async()=>{
 const s=await environment(),first=await runCatalogDiscoveryControl(s.params,s.ctx);s.wall=start+3000;s.rows=[s.grant(),s.grant()];s.activeGrants=2;s.calls=[];const r=await runCatalogDiscoveryControl({...s.params,phase:'catalog',live:live(first)},s.ctx);assert.equal(r.status,'blocked');assert.equal(writes(s).length,0);
 const t=await environment();t.interceptor=async(o,next)=>{const r=await next();if(o.method==='POST'&&o.path.endsWith('/versions'))t.canary.id='99999999-1111-4111-8111-111111111111';return r;};const moved=await runCatalogDiscoveryControl(t.params,t.ctx);assert.equal(moved.status,'uncertain');assert.equal(moved.mutations.versionPost,1);assert.equal(moved.mutations.deploymentPost,0);assert.equal(t.canary.id,'99999999-1111-4111-8111-111111111111');
});
test('unknown registry acknowledgement stops before any version or promotion and is not retried',async()=>{
 const s=await environment();s.interceptor=async(o,next)=>{const r=await next();return o.method==='PUT'?{...r,result:{}}:r;};const r=await runCatalogDiscoveryControl(s.params,s.ctx);assert.equal(r.status,'uncertain');assert.equal(r.mutations.clientPut,1);assert.equal(r.mutations.versionPost,0);assert.equal(r.mayRetry,false);assert.equal(s.calls.filter(o=>o.method==='PUT').length,1);
});
test('caller timeout fences late registry completion without claiming API cancellation',async()=>{
 const s=await environment();let release;const held=new Promise(resolve=>{release=resolve;});s.interceptor=async(o,next)=>{if(o.method==='PUT')await held;return next();};const r=await runCatalogDiscoveryControl(s.params,{...s.ctx,timeoutMs:25});assert.equal(r.status,'uncertain');assert.equal(r.deadlineExceeded,true);assert.equal(r.apiCancellationSupported,false);release();await new Promise(resolve=>setTimeout(resolve,15));assert.equal(s.calls.filter(o=>o.method==='PUT').length,1);assert.equal(s.calls.filter(o=>o.method==='POST'&&o.path.endsWith('/versions')).length,0);
});
test('closure after expiry restores exact source and removes only the owned temporary public record',async()=>{
 const s=await environment(),first=await runCatalogDiscoveryControl(s.params,s.ctx);s.wall=end+1;s.calls=[];const r=await runCatalogDiscoveryControl({...s.params,phase:'close',live:live(first)},s.ctx);assert.equal(r.status,'closed');assert.equal(s.canary.versions[0].version_id,s.baseline.pin.baseVersionId);assert.equal(s.client,null);assert.equal(r.activeOwnGrants,0);assert.equal(r.mutations.versionPost,0);assert.equal(r.mutations.deploymentPost,1);assert.equal(r.mutations.clientDelete,1);
 const t=await environment(),opened=await runCatalogDiscoveryControl(t.params,t.ctx);t.client.metadata.trialId='b'.repeat(64);t.wall=end+1;const conflict=await runCatalogDiscoveryControl({...t.params,phase:'close',live:live(opened)},t.ctx);assert.equal(conflict.status,'uncertain');assert.equal(t.canary.versions[0].version_id,t.baseline.pin.baseVersionId);assert.ok(t.client);assert.equal(conflict.mutations.clientDelete,0);
});
test('invalid scope, active reservation or clock rewind fail before any write',async()=>{
 const s=await environment();assert.equal((await runCatalogDiscoveryControl({...s.params,projectId:'other-project'},s.ctx)).status,'blocked');assert.equal(writes(s).length,0);
 const t=await environment();t.reserved=1;assert.equal((await runCatalogDiscoveryControl(t.params,t.ctx)).status,'blocked');assert.equal(writes(t).length,0);
 const u=await environment();u.interceptor=async(o,next)=>{const r=await next();u.wall=start-1;return r;};assert.equal((await runCatalogDiscoveryControl(u.params,u.ctx)).status,'blocked');assert.equal(writes(u).length,0);
});
