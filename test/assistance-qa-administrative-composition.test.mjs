import test from 'node:test';
import assert from 'node:assert/strict';
import {createQaAdministrativeClosureActions} from '../lib/assistance-qa-administrative-composition.mjs';
import {createIndependentClosureCoordinator} from '../lib/assistance-independent-closure.mjs';
import {qaAdministrationFixture} from './fixtures/qa-administrative-composition.mjs';
const unknown={verified:false,state:'unknown'};
test('approved scope composes one exact disable with full two-pass V2 verification',async()=>{
 const f=await qaAdministrationFixture(),a=await createQaAdministrativeClosureActions(f.options);
 assert.deepEqual(await a.restoreAdministration(f.registration.plan),{verified:true,state:'restored'});
 const writes=f.calls.filter(c=>c.method==='PUT');assert.equal(writes.length,1);assert.deepEqual(JSON.parse(writes[0].body),{enabled:false,name:'owned-qa'});
 assert.equal(f.calls.filter(c=>c.method==='GET').length,10);assert.ok(f.calls.every(c=>c.path.startsWith('/client/v4/accounts/'+f.registration.resources.accountId+'/')));
});
test('disabled identity with settings drift is never accepted as restored',async()=>{
 const f=await qaAdministrationFixture();f.results.settings.bindings.push({name:'OTHER',type:'plain_text',text:'changed'});
 const a=await createQaAdministrativeClosureActions(f.options);assert.deepEqual(await a.restoreAdministration(f.registration.plan),unknown);assert.equal(f.results.token.enabled,false);
 assert.deepEqual(await a.readIssuedReceipt({...f.registration.plan,step:'restoreAdministration'}),unknown);assert.equal(f.calls.filter(c=>c.method==='PUT').length,1);
});
test('withdrawal during credential custody denies actual provider dispatch',async()=>{
 const f=await qaAdministrationFixture();const a=await createQaAdministrativeClosureActions({...f.options,readIdentityCredential:async()=>{f.setApproved(false);return 'synthetic-custody-placeholder';}});
 assert.deepEqual(await a.restoreAdministration(f.registration.plan),unknown);assert.equal(f.calls.length,0);
});
test('wrong plan hash or changed catalog denies construction or later calls',async()=>{
 const f=await qaAdministrationFixture();assert.equal(await createQaAdministrativeClosureActions({...f.options,plan:{...f.registration.plan,baselineRef:'9'.repeat(64)}}),null);
 const a=await createQaAdministrativeClosureActions(f.options);f.registration.identity.name='other';assert.deepEqual(await a.restoreAdministration(f.registration.plan),unknown);assert.equal(f.calls.length,0);
});
test('receipt recovery is GET-only and invalid steps or early clock cause zero dispatch',async()=>{
 const f=await qaAdministrationFixture(),a=await createQaAdministrativeClosureActions(f.options);
 assert.deepEqual(await a.readIssuedReceipt({...f.registration.plan,step:'closeLedger'}),unknown);assert.equal(f.calls.length,0);
 f.setClock(f.registration.plan.closeAt-1);assert.deepEqual(await a.restoreAdministration(f.registration.plan),unknown);assert.equal(f.calls.length,0);
});
test('persistent issued coordinator reconstructs lost acknowledgment without a second PUT',async()=>{
 const f=await qaAdministrationFixture();f.loseAck();const data=new Map();let queue=Promise.resolve();
 const storage={transaction(fn){const task=queue.then(async()=>{const draft=new Map(structuredClone([...data]));const result=await fn({get:async k=>structuredClone(draft.get(k)),put:async(k,v)=>{draft.set(k,structuredClone(v));}});data.clear();for(const [k,v] of draft)data.set(k,v);return result;});queue=task.catch(()=>{});return task;}};
 const make=async()=>{const actions=await createQaAdministrativeClosureActions(f.options);return createIndependentClosureCoordinator({storage,plan:f.registration.plan,now:f.options.now,revokePlan:async()=>({verified:true,state:'revoked'}),closeLedger:async()=>({verified:true,state:'stopped'}),...actions});};
 assert.deepEqual(await(await make()).tick(),{state:'intervention_required',step:'restoreAdministration'});assert.equal(f.calls.filter(c=>c.method==='PUT').length,1);
 assert.deepEqual(await(await make()).tick(),{state:'intervention_required',step:'restoreAdministration'});
 assert.deepEqual(await(await make()).reconcile(),{state:'complete',step:null});assert.equal(f.calls.filter(c=>c.method==='PUT').length,1);
});
test('caller plan mutation during awaited PUT authorization prevents the write',async()=>{
 const f=await qaAdministrationFixture(),input={...f.registration.plan};let reads=0;
 const a=await createQaAdministrativeClosureActions({...f.options,catalog:{read:async()=>{if(++reads===4)input.baselineRef='9'.repeat(64);return structuredClone(f.registration);}}});
 assert.deepEqual(await a.restoreAdministration(input),unknown);assert.equal(f.calls.filter(c=>c.method==='PUT').length,0);
});
test('authorization lookup is bounded and cannot dispatch after its timeout',async()=>{
 const f=await qaAdministrationFixture();let reads=0,release;
 const a=await createQaAdministrativeClosureActions({...f.options,authorizationTimeoutMs:15,catalog:{read:async()=>++reads===1?structuredClone(f.registration):new Promise(resolve=>{release=resolve;})}});
 try{const outcome=await Promise.race([a.restoreAdministration(f.registration.plan),new Promise(resolve=>setTimeout(()=>resolve('hung'),100))]);assert.deepEqual(outcome,unknown);assert.equal(f.calls.length,0);}finally{release?.(null);}
});
