import test from 'node:test';
import assert from 'node:assert/strict';
import {computeQaClosureBaselineRef,createQaClosureCatalog} from '../lib/assistance-qa-closure-catalog.mjs';
export async function fixture(){
 const registration={contract:'afw-qa-closure-approval/v1',plan:{occurrenceId:'11111111-1111-4111-8111-111111111111',baselineRef:'a'.repeat(64),closeAt:1000},planRevision:1,resources:{accountId:'a'.repeat(32),tokenId:'22222222-2222-4222-8222-222222222222',workerName:'afw-own-qa',applicationId:'33333333-3333-4333-8333-333333333333',policyId:'44444444-4444-4444-8444-444444444444'},digests:{token:'b'.repeat(64),settings:'c'.repeat(64),schedules:'d'.repeat(64),policy:'e'.repeat(64)},identity:{name:'owned-qa',metadataDigest:'f'.repeat(64)},provisioning:{creationRef:'1'.repeat(64),custodyRef:'2'.repeat(64),inventoryRef:'3'.repeat(64),createdAt:100,expiresAt:12000}};
 registration.plan.baselineRef=await computeQaClosureBaselineRef(registration);
 const data=new Map();let queue=Promise.resolve(),clock=200,receipt={contract:'afw-qa-provisioning/v1',recordRef:registration.plan.baselineRef,state:'exclusive'},reads=0;
 const storage={transaction(fn){const task=queue.then(()=>fn({get:async k=>structuredClone(data.get(k)),put:async(k,v)=>{data.set(k,structuredClone(v));}}));queue=task.catch(()=>{});return task;}};
 const options={storage,registration,now:()=>clock,readProvisioning:async ref=>{assert.equal(ref,registration.provisioning.creationRef);reads++;return structuredClone(receipt);}};
 return {registration,options,data,reads:()=>reads,setClock(v){clock=v;},setReceipt(v){receipt=v;},make:()=>createQaClosureCatalog(options)};
}
test('only a primary exact provisioning receipt admits immutable server registration',async()=>{
 const f=await fixture(),a=f.make();assert.equal(await a.read(),null);assert.equal(await a.approve(),true);assert.deepEqual(await a.read(),f.registration);assert.equal(await a.approve(),true);assert.equal(f.data.size,2);
 assert.ok(Object.isFrozen(await a.read()));assert.ok(f.reads()>0);
});
test('a token is reserved once across occurrences in shared primary catalog storage',async()=>{
 const f=await fixture();assert.equal(await f.make().approve(),true);
 const r=structuredClone(f.registration);r.plan.occurrenceId='55555555-5555-4555-8555-555555555555';r.plan.baselineRef=await computeQaClosureBaselineRef(r);
 const other=createQaClosureCatalog({...f.options,registration:r,readProvisioning:async()=>({contract:'afw-qa-provisioning/v1',recordRef:r.plan.baselineRef,state:'exclusive'})});
 assert.equal(await other.approve(),false);assert.equal(await other.read(),null);assert.deepEqual(await f.make().read(),f.registration);
});
test('missing wrong revoked malformed provisioning fails without authority or private error',async()=>{
 for(const value of [null,{contract:'other',recordRef:'a'.repeat(64),state:'exclusive'},{contract:'afw-qa-provisioning/v1',recordRef:'a'.repeat(64),state:'exclusive'},{contract:'afw-qa-provisioning/v1',recordRef:null,state:'revoked'},{contract:'afw-qa-provisioning/v1',recordRef:'a'.repeat(64),state:'exclusive',secret:'private'}]){const f=await fixture();f.setReceipt(value);assert.equal(await f.make().approve(),false);assert.equal(f.data.size,0);}
 const f=await fixture();const a=createQaClosureCatalog({...f.options,readProvisioning:async()=>{throw Error('private');}});assert.equal(await a.approve(),false);assert.equal(await a.read(),null);
});
test('registration collision cannot replace another plan resource digest or provenance',async()=>{
 const f=await fixture();assert.equal(await f.make().approve(),true);const saved=structuredClone([...f.data]);
 for(const mutate of [r=>r.planRevision++,r=>r.resources.workerName='different',r=>r.digests.token='9'.repeat(64),r=>r.identity.name='different',r=>r.provisioning.inventoryRef='9'.repeat(64)]){const r=structuredClone(f.registration);mutate(r);r.plan.baselineRef=await computeQaClosureBaselineRef(r);const a=createQaClosureCatalog({...f.options,registration:r,readProvisioning:async()=>({contract:'afw-qa-provisioning/v1',recordRef:r.plan.baselineRef,state:'exclusive'})});assert.equal(await a.approve(),false);assert.equal(await a.read(),null);assert.deepEqual([...f.data],saved);}
});
test('strict schema excludes consumer booleans secrets accessors and invalid resource or timing',async()=>{
 const f=await fixture();let getters=0;const accessor=structuredClone(f.registration);Object.defineProperty(accessor.identity,'name',{enumerable:true,get(){getters++;return 'owned-qa';}});
 for(const r of [{...f.registration,exclusiveQa:true},{...f.registration,secret:'private'},accessor])assert.throws(()=>createQaClosureCatalog({...f.options,registration:r}));assert.equal(getters,0);
 for(const mutate of [r=>r.resources.workerName='../other',r=>r.plan.closeAt=12000,r=>r.provisioning.createdAt=1001,r=>r.digests.token='bad',r=>r.planRevision=0]){const r=structuredClone(f.registration);mutate(r);assert.throws(()=>createQaClosureCatalog({...f.options,registration:r}));}
});
test('pinned copies deadline and clock regression prevent late or changed approval',async()=>{
 const f=await fixture(),a=f.make();f.registration.identity.name='other';assert.equal(await a.approve(),true);assert.equal((await a.read()).identity.name,'owned-qa');
 const late=await fixture();late.setClock(1000);assert.equal(await late.make().approve(),false);assert.equal(late.reads(),0);
 const reg=await fixture();const a2=createQaClosureCatalog({...reg.options,readProvisioning:async()=>{reg.setClock(199);return {contract:'afw-qa-provisioning/v1',recordRef:reg.registration.plan.baselineRef,state:'exclusive'};}});assert.equal(await a2.approve(),false);assert.equal(reg.data.size,0);
 const changed=await fixture();changed.registration.plan.baselineRef='9'.repeat(64);assert.equal(await changed.make().approve(),false);assert.equal(changed.data.size,0);
});
test('restart revocation is sticky and fresh receipt withdrawal blocks every read',async()=>{
 const f=await fixture(),a=f.make();assert.equal(await a.approve(),true);assert.deepEqual(await f.make().read(),f.registration);f.setReceipt(null);assert.equal(await f.make().read(),null);
 assert.equal(await a.revoke(),true);assert.equal(await f.make().read(),null);assert.equal(await f.make().approve(),false);assert.equal(f.data.size,3);assert.equal(await f.make().revoke(),true);
});
test('withdrawal during primary receipt await is observed before returning authority',async()=>{
 const f=await fixture();assert.equal(await f.make().approve(),true);
 const a=createQaClosureCatalog({...f.options,readProvisioning:async()=>{assert.equal(await f.make().revoke(),true);return {contract:'afw-qa-provisioning/v1',recordRef:f.registration.plan.baselineRef,state:'exclusive'};}});
 assert.equal(await a.read(),null);
});

