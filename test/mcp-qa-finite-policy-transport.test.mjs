import test from 'node:test';
import assert from 'node:assert/strict';
import {setup} from './fixtures/finite-transport-native.mjs';
test('actual consumed owner approval without original native cleanup capsule remains pending and has no SEND/POST',async t=>{
 const f=await setup(t),screen=await f.screen(),r=await f.publish(screen);
 assert.deepEqual(r,{status:'admin_pending',mayRetry:false,operationalReadiness:false});assert.equal(f.posts(),0);
 const rows=await f.json('/fixture/rows',{});assert.equal(rows.filter(([k])=>k.endsWith(':connection:approval')).length,1);
 assert.equal(rows.filter(([k])=>k.startsWith('owner-ticket:')&&k.endsWith(':use')).length,1);
 assert.equal(rows.filter(([k])=>k.startsWith('afw.finite-policy-effect.v1:')).length,0);
 assert.equal((await f.publish(screen)).status,'admin_pending');assert.equal(f.posts(),0);
 assert.deepEqual(await f.json('/fixture/rows',{}),rows);
});
for(const mode of ['lost','late','not_found','unexpected_reconciliation','foreign','held_claim','extra_binding','namespace','wrong_secret'])test('owner boundary '+mode+' never reaches retired upload segment without original capsule',async t=>{
 const f=await setup(t,mode);assert.equal((await f.publish(await f.screen())).status,'admin_pending');assert.equal(f.posts(),0);
 assert.equal((await f.json('/fixture/rows',{})).filter(([k])=>k.startsWith('afw.finite-policy-effect.v1:')).length,0);
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

test('Task3 original parent finish retains actual pending source work even without a durable SEND',async t=>{
 const f=await setup(t,'held_source');
 assert.equal((await f.publish(await f.screen())).status,'admin_pending');assert.equal(f.posts(),0);
 assert.deepEqual(await f.json('/fixture/source-hold-state',{}),{used:true,settled:false});
 assert.equal((await f.publish(await f.screen())).status,'admin_pending');assert.equal(f.posts(),0);
 assert.equal((await f.json('/fixture/rows',{})).filter(([k])=>k.endsWith(':send')).length,0);
 await new Promise(r=>setTimeout(r,1400));
 assert.deepEqual(await f.json('/fixture/source-hold-state',{}),{used:true,settled:true});
 assert.equal(f.posts(),0);assert.equal((await f.json('/fixture/rows',{})).filter(([k])=>k.endsWith(':send')).length,0);
});
