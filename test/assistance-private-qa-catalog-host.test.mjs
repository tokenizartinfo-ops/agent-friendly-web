import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fixture} from './fixtures/occurrence-operations.mjs';
import {qaAdministrationFixture} from './fixtures/qa-administrative-composition.mjs';
import {createOccurrenceApprovalCatalog} from '../lib/assistance-occurrence-approvals.mjs';
import {computeOccurrencePlanDigest} from '../lib/assistance-occurrence-digest.mjs';
import {computeQaClosureBaselineRef,createQaClosureCatalog} from '../lib/assistance-qa-closure-catalog.mjs';
const key='afw-private-qa-catalog/v1:current';
const load=()=>import('../lib/assistance-private-qa-catalog-host.mjs');
async function setup(){
 const f=fixture();f.a.exec(readFileSync('worker/operations/assistance-occurrences-v2.sql','utf8'));f.a.exec(readFileSync('worker/operations/assistance-occurrences-v2-reservation-fence.sql','utf8'));
 const approval={manifest:f.m,identityRef:'c'.repeat(64),enrollmentRef:'d'.repeat(64),serverConfigVersion:'e'.repeat(64),planRevision:1};
 await createOccurrenceApprovalCatalog({db:f.db}).approve(approval);
 const admin=await qaAdministrationFixture({createdAt:f.m.startAt,closeAt:f.m.deadline,expiresAt:f.m.deadline+10000}),r=admin.registration;
 r.contract='afw-qa-closure-approval/v2';r.plan.occurrenceId=f.m.occurrenceId;r.approvalDigest=await computeOccurrencePlanDigest({manifest:f.m,identityRef:approval.identityRef,admissionContract:'server-v1',approval});r.plan.baselineRef=await computeQaClosureBaselineRef(r);
 const values=new Map();let clock=f.m.startAt,proof={contract:'afw-qa-provisioning/v1',recordRef:r.plan.baselineRef,state:'exclusive'},hook;
 const storage={get:async k=>structuredClone(values.get(k)),transaction:async fn=>fn({get:async k=>structuredClone(values.get(k)),put:async(k,v)=>values.set(k,structuredClone(v))})};
 const readProvisioning=async()=>{if(hook)await hook();return structuredClone(proof);};
 const catalog=createQaClosureCatalog({storage,registration:r,readProvisioning,now:()=>clock});assert.equal(await catalog.approve(),true);
 values.set(key,{contract:'afw-private-qa-catalog/v1',registration:r});
 const options={storage,db:f.db,readProvisioning,now:()=>clock};
 return {...f,options,values,r,approval,setClock:v=>{clock=v;},setProof:v=>{proof=v;},setHook:v=>{hook=v;}};
}
test('private read reconstructs current catalog and primary full approval without caller authority',async()=>{
 const f=await setup();try{const {createPrivateQaCatalogHost}=await load();for(let i=0;i<2;i++){const h=createPrivateQaCatalogHost(f.options);assert.deepEqual(await h.read({registration:'forged'}),f.r);assert.deepEqual(await h.readOccurrenceApproval({identityRef:'forged'}),f.approval);assert.deepEqual(Object.keys(h),['read','readOccurrenceApproval']);}assert.equal(f.a.prepare('SELECT count(*) n FROM assistance_occurrence_approved_plans').get().n,1);}finally{f.cleanup();}
});
test('missing provisioning, unapproved registration and forged full digest fail closed',async()=>{
 const f=await setup();try{const {createPrivateQaCatalogHost}=await load(),h=createPrivateQaCatalogHost(f.options);f.setProof(null);assert.equal(await h.read(),null);f.setProof({contract:'afw-qa-provisioning/v1',recordRef:f.r.plan.baselineRef,state:'exclusive'});for(const value of [null,{contract:'afw-private-qa-catalog/v1',registration:{...f.r,approvalDigest:'1'.repeat(64)}},{contract:'afw-private-qa-catalog/v1',registration:f.r,secret:'forbidden'}]){f.values.set(key,value);assert.equal(await h.readOccurrenceApproval(),null);}}finally{f.cleanup();}
});
test('pointer withdrawal during awaited proof and persistent QA revocation prevent return',async()=>{
 const f=await setup();try{const {createPrivateQaCatalogHost}=await load(),h=createPrivateQaCatalogHost(f.options);f.setHook(async()=>{f.values.delete(key);});assert.equal(await h.read(),null);f.setHook(null);f.values.set(key,{contract:'afw-private-qa-catalog/v1',registration:f.r});await createQaClosureCatalog({...f.options,registration:f.r}).revoke();assert.equal(await h.readOccurrenceApproval(),null);}finally{f.cleanup();}
});
test('plan revocation preserves authority only for independent closing, after deadline',async()=>{
 const f=await setup();try{const {createPrivateQaCatalogHost}=await load();await createOccurrenceApprovalCatalog({db:f.db}).revoke({occurrenceId:f.m.occurrenceId,reason:'operator_closed'});f.setClock(f.m.deadline);assert.deepEqual(await createPrivateQaCatalogHost(f.options).readOccurrenceApproval(),f.approval);}finally{f.cleanup();}
});
test('bounded proof timeout and regressive clock expose no data and do not approve',async()=>{
 const f=await setup();try{const {createPrivateQaCatalogHost}=await load();f.setHook(()=>new Promise(()=>{}));assert.equal(await createPrivateQaCatalogHost({...f.options,authorizationTimeoutMs:10}).read(),null);f.setHook(null);const h=createPrivateQaCatalogHost(f.options);assert.ok(await h.read());f.setClock(f.m.startAt-1);assert.equal(await h.readOccurrenceApproval(),null);}finally{f.cleanup();}
});

test('QA or provisioning withdrawal during the final pointer await denies returned authority',async()=>{
 for(const mode of ['catalog','provisioning']){
  const f=await setup();try{
   const {createPrivateQaCatalogHost}=await load(),get=f.options.storage.get;let reads=0;
   f.options.storage.get=async k=>{const result=await get(k);if(k===key&&++reads===2){if(mode==='catalog')f.values.set('afw-qa-closure-approval/v1:'+f.m.occurrenceId+':revoked',{recordRef:f.r.plan.baselineRef});else f.setProof(null);}return result;};
   assert.equal(await createPrivateQaCatalogHost(f.options).readOccurrenceApproval(),null);
  }finally{f.cleanup();}
 }
});

test('pointer withdrawal during final provisioning proof denies within the final storage transaction',async()=>{
 const f=await setup();try{
  const {createPrivateQaCatalogHost}=await load();let proofs=0;
  f.setHook(async()=>{if(++proofs===3)f.values.delete(key);});
  assert.equal(await createPrivateQaCatalogHost(f.options).readOccurrenceApproval(),null);
 }finally{f.cleanup();}
});
