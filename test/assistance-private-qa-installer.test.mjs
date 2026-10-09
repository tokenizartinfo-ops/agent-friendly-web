import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fixture} from './fixtures/occurrence-operations.mjs';
import {qaAdministrationFixture} from './fixtures/qa-administrative-composition.mjs';
import {computeOccurrencePlanDigest} from '../lib/assistance-occurrence-digest.mjs';
import {computeQaClosureBaselineRef} from '../lib/assistance-qa-closure-catalog.mjs';
import {createOccurrenceApprovalCatalog} from '../lib/assistance-occurrence-approvals.mjs';
import {createPrivateQaCatalogHost} from '../lib/assistance-private-qa-catalog-host.mjs';
const pointer='afw-private-qa-catalog/v1:current';
const load=()=>import('../lib/assistance-private-qa-installer.mjs');
async function setup(){
 const f=fixture();f.a.exec(readFileSync('worker/operations/assistance-occurrences-v2.sql','utf8'));f.a.exec(readFileSync('worker/operations/assistance-occurrences-v2-reservation-fence.sql','utf8'));
 const approval={manifest:f.m,identityRef:'c'.repeat(64),enrollmentRef:'d'.repeat(64),serverConfigVersion:'e'.repeat(64),planRevision:1};
 const {registration:r}=await qaAdministrationFixture({createdAt:f.m.startAt,closeAt:f.m.deadline,expiresAt:f.m.deadline+10000});
 r.contract='afw-qa-closure-approval/v2';r.plan.occurrenceId=f.m.occurrenceId;r.approvalDigest=await computeOccurrencePlanDigest({manifest:f.m,identityRef:approval.identityRef,admissionContract:'server-v1',approval});r.plan.baselineRef=await computeQaClosureBaselineRef(r);
 let values=new Map(),clock=f.m.startAt,proof=true,reads=0,hook,putHook,source={registration:r,approval};
 const storage={get:async k=>structuredClone(values.get(k)),transaction:async fn=>{const pending=new Map(values);const result=await fn({get:async k=>structuredClone(pending.get(k)),put:async(k,v)=>{pending.set(k,structuredClone(v));if(putHook)await putHook(k);}});values=pending;return result;}};
 const options={storage,db:f.db,now:()=>clock,readInstallation:async()=>structuredClone(source),readProvisioning:async()=>{if(hook)await hook(++reads);return proof?{contract:'afw-qa-provisioning/v2',scope:'own-resource-reservation',recordRef:r.plan.baselineRef,state:'reserved'}:null;}};
 return {...f,r,approval,options,get values(){return values;},setProof:v=>{proof=v;},setClock:v=>{clock=v;},setSource:v=>{source=v;},setHook:v=>{hook=v;},setPutHook:v=>{putHook=v;}};
}
test('private installation ignores caller authority and makes current reader reconstructible',async()=>{
 const f=await setup();try{const {createPrivateQaInstaller}=await load(),h=createPrivateQaInstaller(f.options);assert.deepEqual(Object.keys(h),['install']);assert.equal(await h.install({registration:'forged'}),'installed');assert.deepEqual(await createPrivateQaCatalogHost(f.options).readOccurrenceApproval(),f.approval);const before=structuredClone([...f.values]);assert.equal(await h.install(),'installed');assert.deepEqual([...f.values],before);assert.equal(f.a.prepare('SELECT count(*) n FROM assistance_occurrence_approved_plans').get().n,1);}finally{f.cleanup();}
});
test('missing trusted input, missing proof and mismatched approval create no authority',async()=>{
 for(const mode of ['source','proof','digest']){const f=await setup();try{const {createPrivateQaInstaller}=await load();if(mode==='source')f.setSource(null);if(mode==='proof')f.setProof(false);if(mode==='digest')f.r.approvalDigest='0'.repeat(64);assert.equal(await createPrivateQaInstaller(f.options).install(),'unavailable');assert.equal(f.values.size,0);assert.equal(f.a.prepare('SELECT count(*) n FROM assistance_occurrence_approved_plans').get().n,0);}finally{f.cleanup();}}
});
test('withdrawal after primary approval closes partial installation and preserves primary history',async()=>{
 const f=await setup();try{const {createPrivateQaInstaller}=await load();f.setHook(n=>{if(n===2)f.setProof(false);});assert.equal(await createPrivateQaInstaller(f.options).install(),'unavailable');assert.equal(f.values.has(pointer),false);assert.equal((await createOccurrenceApprovalCatalog({db:f.db}).read(f.m.occurrenceId)).revoked,true);f.setHook(null);f.setProof(true);assert.equal(await createPrivateQaInstaller(f.options).install(),'unavailable');}finally{f.cleanup();}
});
test('late pointer write rolls back the entire DO installation and revokes own primary row',async()=>{
 const f=await setup();try{const {createPrivateQaInstaller}=await load();f.setPutHook(k=>{if(k===pointer)f.setClock(f.m.deadline);});assert.equal(await createPrivateQaInstaller(f.options).install(),'unavailable');assert.equal(f.values.has(pointer),false);assert.equal(f.values.has('afw-qa-closure-token/v1:'+f.r.resources.accountId+':'+f.r.resources.tokenId),false);assert.equal((await createOccurrenceApprovalCatalog({db:f.db}).read(f.m.occurrenceId)).revoked,true);}finally{f.cleanup();}
});
test('existing approval, pointer and token owner are preserved without adoption',async()=>{
 for(const mode of ['approval','pointer','token']){const f=await setup();try{const {createPrivateQaInstaller}=await load();if(mode==='approval')await createOccurrenceApprovalCatalog({db:f.db}).approve({...f.approval,identityRef:'f'.repeat(64)});else f.values.set(mode==='pointer'?pointer:'afw-qa-closure-token/v1:'+f.r.resources.accountId+':'+f.r.resources.tokenId,'existing');const before=structuredClone([...f.values]);assert.equal(await createPrivateQaInstaller(f.options).install(),'unavailable');for(const [k,v] of before)assert.deepEqual(f.values.get(k),v);if(mode==='approval')assert.equal((await createOccurrenceApprovalCatalog({db:f.db}).read(f.m.occurrenceId)).revoked,false);}finally{f.cleanup();}}
});
test('completed replay never reports an already revoked primary plan as installed',async()=>{
 const f=await setup();try{const {createPrivateQaInstaller}=await load(),h=createPrivateQaInstaller(f.options);assert.equal(await h.install(),'installed');await createOccurrenceApprovalCatalog({db:f.db}).revoke({occurrenceId:f.m.occurrenceId,reason:'operator_closed'});assert.equal(await h.install(),'unavailable');}finally{f.cleanup();}
});
test('stranded pending reservation does not resume or create a primary approval',async()=>{
 const f=await setup();try{const {createPrivateQaInstaller}=await load();f.values.set('afw-private-qa-installation/v1:current',{recordRef:f.r.plan.baselineRef,state:'pending'});assert.equal(await createPrivateQaInstaller(f.options).install(),'unavailable');assert.equal(f.values.has(pointer),false);assert.equal(f.a.prepare('SELECT count(*) n FROM assistance_occurrence_approved_plans').get().n,0);}finally{f.cleanup();}
});
test('primary commit with lost acknowledgment retains ambiguous history behind a pending recovery gate',async()=>{
 const f=await setup();try{const {createPrivateQaInstaller}=await load(),db=f.db;
 f.options.db={...db,prepare:sql=>{const s=db.prepare(sql);if(!sql.startsWith('INSERT INTO assistance_occurrence_approved_plans'))return s;return {...s,bind:(...args)=>{const b=s.bind(...args);return {...b,run:async()=>{await b.run();throw Error('synthetic lost ACK');}};}};}};
 assert.equal(await createPrivateQaInstaller(f.options).install(),'unavailable');assert.equal((await createOccurrenceApprovalCatalog({db}).read(f.m.occurrenceId)).revoked,false);assert.equal(f.values.has(pointer),false);assert.equal(f.values.get('afw-private-qa-installation/v1:current').state,'pending');
 }finally{f.cleanup();}
});
test('a concurrent identical primary approval is not revoked on a definitive insertion conflict',async()=>{
 const f=await setup();try{const {createPrivateQaInstaller}=await load(),db=f.db;
 f.options.db={...db,prepare:sql=>{const s=db.prepare(sql);if(!sql.startsWith('INSERT INTO assistance_occurrence_approved_plans'))return s;return {...s,bind:(...args)=>{const b=s.bind(...args);return {...b,run:async()=>{await createOccurrenceApprovalCatalog({db}).approve(f.approval);return b.run();}};}};}};
 assert.equal(await createPrivateQaInstaller(f.options).install(),'unavailable');assert.equal((await createOccurrenceApprovalCatalog({db}).read(f.m.occurrenceId)).revoked,false);assert.equal(f.values.has(pointer),false);
 }finally{f.cleanup();}
});
test('unknown primary cleanup keeps a pending operator recovery gate',async()=>{
 const f=await setup();try{const {createPrivateQaInstaller}=await load(),db=f.db;let uncertain=false;
 f.options.db={...db,prepare:sql=>{const s=db.prepare(sql);if(sql==='SELECT * FROM assistance_occurrence_approved_plans WHERE occurrence_id=?')return {...s,bind:(...args)=>{const b=s.bind(...args);return {...b,first:async()=>{if(uncertain)throw Error('synthetic unavailable primary');return b.first();}};}};if(!sql.startsWith('INSERT INTO assistance_occurrence_approved_plans'))return s;return {...s,bind:()=>({...s,run:async()=>{uncertain=true;throw Error('synthetic unknown commit');}})};}};
 assert.equal(await createPrivateQaInstaller(f.options).install(),'unavailable');assert.equal(f.values.get('afw-private-qa-installation/v1:current').state,'pending');assert.equal(f.values.has(pointer),false);
 }finally{f.cleanup();}
});
test('completed replay rejects another valid registration sharing the same primary approval',async()=>{
 const f=await setup();try{const {createPrivateQaInstaller}=await load(),h=createPrivateQaInstaller(f.options);assert.equal(await h.install(),'installed');const b=structuredClone(f.r);b.provisioning.creationRef='4'.repeat(64);b.plan.baselineRef=await computeQaClosureBaselineRef(b);
 f.values.set(pointer,{contract:'afw-private-qa-catalog/v1',registration:b});f.values.set('afw-qa-closure-approval/v1:'+b.plan.occurrenceId,b);f.values.set('afw-qa-closure-token/v1:'+b.resources.accountId+':'+b.resources.tokenId,b.plan.baselineRef);
 f.options.readProvisioning=async ref=>({contract:'afw-qa-provisioning/v2',scope:'own-resource-reservation',recordRef:ref===b.provisioning.creationRef?b.plan.baselineRef:f.r.plan.baselineRef,state:'reserved'});
 assert.equal(await createPrivateQaInstaller(f.options).install(),'unavailable');
 }finally{f.cleanup();}
});
test('replay rejects pointer drift during its last primary await',async()=>{
 const f=await setup();try{const {createPrivateQaInstaller}=await load();assert.equal(await createPrivateQaInstaller(f.options).install(),'installed');const b=structuredClone(f.r);b.provisioning.creationRef='4'.repeat(64);b.plan.baselineRef=await computeQaClosureBaselineRef(b);let reads=0;const db=f.db;
 f.options.readProvisioning=async ref=>({contract:'afw-qa-provisioning/v2',scope:'own-resource-reservation',recordRef:ref===b.provisioning.creationRef?b.plan.baselineRef:f.r.plan.baselineRef,state:'reserved'});
 f.options.db={...db,prepare:sql=>{const s=db.prepare(sql);if(sql!=='SELECT * FROM assistance_occurrence_approved_plans WHERE occurrence_id=?')return s;return {...s,bind:(...args)=>{const bound=s.bind(...args);return {...bound,first:async()=>{const result=await bound.first();if(++reads===5){f.values.set(pointer,{contract:'afw-private-qa-catalog/v1',registration:b});f.values.set('afw-qa-closure-approval/v1:'+b.plan.occurrenceId,b);f.values.set('afw-qa-closure-token/v1:'+b.resources.accountId+':'+b.resources.tokenId,b.plan.baselineRef);}return result;}};}};}};
 assert.equal(await createPrivateQaInstaller(f.options).install(),'unavailable');assert.ok(reads>=5);
 }finally{f.cleanup();}
});

test('installer rejects legacy exclusive authority before reserving or writing',async()=>{const f=await setup();try{const {createPrivateQaInstaller}=await load();f.options.readProvisioning=async()=>({contract:'afw-qa-provisioning/v1',recordRef:f.r.plan.baselineRef,state:'exclusive'});assert.equal(await createPrivateQaInstaller(f.options).install(),'unavailable');assert.equal(f.values.size,0);assert.equal(await createOccurrenceApprovalCatalog({db:f.db}).read(f.approval.manifest.occurrenceId),null);}finally{f.cleanup();}});
