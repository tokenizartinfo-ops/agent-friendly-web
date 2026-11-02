import test from 'node:test';
import assert from 'node:assert/strict';
const V='22222222-2222-4222-8222-222222222222',D='33333333-3333-4333-8333-333333333333';
import {setup} from './fixtures/finite-transport-native.mjs';

test('Task3 actual owner admission and native journal issue fixed Beta JSON upload and fixed activation',async t=>{
 const f=await setup(t),screen=await f.screen(),r=await f.publish(screen);
 assert.equal(r.status,'installed');assert.equal(r.receipt.versionId,V);assert.equal(r.receipt.deploymentId,D);assert.equal(f.posts(),2);
 const rows=await f.json('/fixture/rows',{});assert.equal(rows.filter(([k])=>k.endsWith(':send')).length,2);assert.equal(rows.filter(([k])=>k.endsWith(':ack')).length,2);
 assert.equal((await f.publish(screen)).status,'admin_pending');assert.equal(f.posts(),2);
});
for(const mode of ['lost','late'])test('Task3 '+mode+' actual upload ACK never activates or resends from another preparation',async t=>{
 const f=await setup(t,mode),r=await f.publish(await f.screen());
 assert.equal(r.status,'admin_pending');assert.equal(f.posts(),1);
 assert.equal((await f.publish(await f.screen())).status,'admin_pending');assert.equal(f.posts(),1);
 const rows=await f.json('/fixture/rows',{});assert.equal(rows.filter(([k])=>k.endsWith(':send')).length,1);assert.equal(rows.filter(([k])=>k.endsWith(':ack')).length,0);
});
test('Task3 foreign pointer denies before native publication SEND',async t=>{
 const f=await setup(t,'foreign');assert.equal((await f.publish(await f.screen())).status,'admin_pending');assert.equal(f.posts(),0);
 assert.equal((await f.json('/fixture/rows',{})).filter(([k])=>k.endsWith(':send')).length,0);
});

import {qualifyFiniteConnectionProfile} from '../lib/mcp-qa-finite-connection-profile.mjs';
import {syntheticPreparation} from './fixtures/finite-connection-source.mjs';
test('Task3 preparation grammar preserves Access/limiter and closed business flags in each exact phase',()=>{
 const source={clientId:'SYNTHETIC_CLIENT',project:{projectId:'SYNTHETIC_PROJECT'},access:{audience:'SYNTHETIC_AUD',teamDomain:'synthetic.cloudflareaccess.com'},window:{expiresAt:1000000}};
 for(const phase of ['closed_ui','read_consent']){
  const metadata=syntheticPreparation(phase,source),r=qualifyFiniteConnectionProfile({phase,metadata});
  assert.deepEqual(r,metadata);assert(Object.isFrozen(r));
  for(const mutate of [v=>v.bindings.pop(),v=>v.bindings.push({name:'UNAPPROVED',type:'plain_text',text:'x'}),v=>v.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_ENABLED').text='true',v=>delete v.exports.AfwOwnEventNode.container]){
   const v=structuredClone(metadata);mutate(v);assert.throws(()=>qualifyFiniteConnectionProfile({phase,metadata:v}));
  }
 }
 assert.throws(()=>qualifyFiniteConnectionProfile({phase:'finite_prearm',metadata:syntheticPreparation('closed_ui',source)}));
});

test('Task3 actual native SEND claim ACK consumes the same child budget before any HTTP send',async t=>{
 const f=await setup(t,'held_claim'),answer=await f.publish(await f.screen());
 assert.equal(answer.status,'admin_pending');assert.equal(f.posts(),0);
 let rows=await f.json('/fixture/rows',{});const send=JSON.parse(rows.find(([k])=>k.endsWith(':send'))[1]);
 assert(send.deadline-send.issuedAt<=5000);assert(send.deadline<=Date.now());
 assert.equal(rows.filter(([k])=>k.endsWith(':ack')).length,0);
 assert.equal((await f.publish(await f.screen())).status,'admin_pending');assert.equal(f.posts(),0);
 await new Promise(r=>setTimeout(r,1300));
 assert.equal((await f.publish(await f.screen())).status,'admin_pending');assert.equal(f.posts(),0);
 rows=await f.json('/fixture/rows',{});assert.equal(rows.filter(([k])=>k.endsWith(':send')).length,1);
});
for(const mode of ['extra_binding','namespace'])test('Task3 actual primary '+mode+' drift prevents any durable SEND',async t=>{
 const f=await setup(t,mode);assert.equal((await f.publish(await f.screen())).status,'admin_pending');assert.equal(f.posts(),0);
 assert.equal((await f.json('/fixture/rows',{})).filter(([k])=>k.endsWith(':send')).length,0);
});
test('Task3 acknowledged upload with rejected private secret readback blocks another preparation',async t=>{
 const f=await setup(t,'wrong_secret');
 assert.equal((await f.publish(await f.screen())).status,'admin_pending');assert.equal(f.posts(),1);
 assert.equal((await f.publish(await f.screen())).status,'admin_pending');assert.equal(f.posts(),1);
 const rows=await f.json('/fixture/rows',{});assert.equal(rows.filter(([k])=>k.endsWith(':send')).length,1);assert.equal(rows.filter(([k])=>k.endsWith(':ack')).length,1);
});
