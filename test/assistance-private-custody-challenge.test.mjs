import test from 'node:test';
import assert from 'node:assert/strict';
import {fixture} from './fixtures/occurrence-operations.mjs';
import {qaAdministrationFixture} from './fixtures/qa-administrative-composition.mjs';
import {computeOccurrencePlanDigest} from '../lib/assistance-occurrence-digest.mjs';
import {computeQaClosureBaselineRef} from '../lib/assistance-qa-closure-catalog.mjs';
const load=()=>import('../lib/assistance-private-custody-challenge.mjs');
async function setup(){
 const f=fixture(),approval={manifest:f.m,identityRef:'c'.repeat(64),enrollmentRef:'d'.repeat(64),serverConfigVersion:'e'.repeat(64),planRevision:1};
 const {registration:r}=await qaAdministrationFixture({createdAt:f.m.startAt,closeAt:f.m.deadline,expiresAt:f.m.deadline+10000});
 r.contract='afw-qa-closure-approval/v2';r.plan.occurrenceId=f.m.occurrenceId;r.approvalDigest=await computeOccurrencePlanDigest({manifest:f.m,identityRef:approval.identityRef,admissionContract:'server-v1',approval});r.plan.baselineRef=await computeQaClosureBaselineRef(r);
 let values=new Map(),clock=f.m.startAt,source={registration:r,approval},identity={principalRef:approval.identityRef,expiresAt:f.m.deadline+10000},hook;
 const storage={get:async k=>structuredClone(values.get(k)),transaction:async fn=>{const next=new Map(values);const result=await fn({get:async k=>structuredClone(next.get(k)),put:async(k,v)=>{next.set(k,structuredClone(v));if(hook)await hook(k);}});values=next;return result;}};
 const options={storage,readInstallation:()=>source,readServiceIdentity:()=>identity,now:()=>clock};
 return {options,r,approval,cleanup:f.cleanup,get values(){return values;},clock:v=>clock=v,source:v=>source=v,identity:v=>identity=v,hook:v=>hook=v};
}
test('challenge uses fixed operator registration and never persists the returned nonce',async()=>{
 const f=await setup();try{const {createPrivateCustodyChallenge}=await load(),h=createPrivateCustodyChallenge(f.options),issued=await h.issue({registration:'forged'});assert.match(issued.nonce,/^[0-9a-f]{64}$/);assert.equal(issued.recordRef,f.r.plan.baselineRef);assert.equal(JSON.stringify([...f.values]).includes(issued.nonce),false);assert.equal(await h.issue(),null);assert.deepEqual(Object.keys(h),['issue','consume','status','withdraw']);}finally{f.cleanup();}
});
test('identity supplied by caller cannot authenticate; wrong nonce and expired identity deny',async()=>{
 const f=await setup();try{const {createPrivateCustodyChallenge}=await load(),h=createPrivateCustodyChallenge(f.options),issued=await h.issue();f.identity({principalRef:'f'.repeat(64),expiresAt:f.approval.manifest.deadline});assert.equal(await h.consume({nonce:issued.nonce,principalRef:f.approval.identityRef}),null);assert.equal(await h.consume({nonce:issued.nonce}),null);f.identity({principalRef:f.approval.identityRef,expiresAt:f.approval.manifest.startAt});assert.equal(await h.consume({nonce:issued.nonce}),null);}finally{f.cleanup();}
});
test('consume is single-use across reconstruction; metadata omits nonce and preserves dated result',async()=>{
 const f=await setup();try{const {createPrivateCustodyChallenge}=await load(),h=createPrivateCustodyChallenge(f.options),issued=await h.issue();assert.equal(await h.consume({nonce:'0'.repeat(64)}),null);const result=await h.consume({nonce:issued.nonce});assert.equal(result.state,'confirmed');const restarted=createPrivateCustodyChallenge(f.options);assert.equal(await restarted.consume({nonce:issued.nonce}),null);f.clock(f.approval.manifest.deadline+1);assert.deepEqual(await restarted.status(),result);assert.equal(JSON.stringify(result).includes(issued.nonce),false);}finally{f.cleanup();}
});
test('withdrawal is permanent and cannot be undone by issue or consume',async()=>{
 const f=await setup();try{const {createPrivateCustodyChallenge}=await load(),h=createPrivateCustodyChallenge(f.options),issued=await h.issue();assert.equal(await h.withdraw(),true);assert.equal(await h.consume({nonce:issued.nonce}),null);assert.equal(await h.issue(),null);assert.equal((await h.status()).state,'withdrawn');}finally{f.cleanup();}
});
test('missing or asynchronous operator context is not administrative authority',async()=>{
 const f=await setup();try{const {createPrivateCustodyChallenge}=await load();f.source(null);assert.equal(await createPrivateCustodyChallenge(f.options).issue(),null);f.source(Promise.resolve({registration:f.r,approval:f.approval}));assert.equal(await createPrivateCustodyChallenge(f.options).issue(),null);}finally{f.cleanup();}
});
test('deadline and operator withdrawal after awaited write roll back issuance',async()=>{
 for(const mode of ['deadline','withdraw']){const f=await setup();try{const {createPrivateCustodyChallenge}=await load();f.hook(()=>mode==='deadline'?f.clock(f.approval.manifest.deadline):f.source(null));assert.equal(await createPrivateCustodyChallenge(f.options).issue(),null);assert.equal(f.values.size,0);}finally{f.cleanup();}}
});
test('identity withdrawal during confirmation rolls back and leaves challenge issued',async()=>{
 const f=await setup();try{const {createPrivateCustodyChallenge}=await load(),h=createPrivateCustodyChallenge(f.options),issued=await h.issue();f.hook(()=>f.identity(null));assert.equal(await h.consume({nonce:issued.nonce}),null);assert.equal((await h.status()).state,'issued');}finally{f.cleanup();}
});
test('lost commit acknowledgement cannot issue a second nonce or repeat confirmation',async()=>{
 const f=await setup();try{
 const {createPrivateCustodyChallenge}=await load(),base=f.options.storage;
 const uncertain={...f.options,storage:{get:k=>base.get(k),transaction:async fn=>{await base.transaction(fn);throw Error('Lost acknowledgement');}}};
 assert.equal(await createPrivateCustodyChallenge(uncertain).issue(),null);
 const h=createPrivateCustodyChallenge(f.options);assert.equal((await h.status()).state,'issued');assert.equal(await h.issue(),null);
 }finally{f.cleanup();}
 const f2=await setup();try{
 const {createPrivateCustodyChallenge}=await load(),h=createPrivateCustodyChallenge(f2.options),issued=await h.issue(),base=f2.options.storage;
 const uncertain=createPrivateCustodyChallenge({...f2.options,storage:{get:k=>base.get(k),transaction:async fn=>{await base.transaction(fn);throw Error('Lost acknowledgement');}}});
 assert.equal(await uncertain.consume({nonce:issued.nonce}),null);assert.equal((await h.status()).state,'confirmed');assert.equal(await h.consume({nonce:issued.nonce}),null);
 }finally{f2.cleanup();}
});
test('permission withdrawn while commit acknowledgement is pending cannot return success',async()=>{
 for(const mode of ['issue','consume']){
 const f=await setup();try{
 const {createPrivateCustodyChallenge}=await load(),h=createPrivateCustodyChallenge(f.options),issued=mode==='consume'?await h.issue():null,base=f.options.storage;
 const late=createPrivateCustodyChallenge({...f.options,storage:{get:k=>base.get(k),transaction:async fn=>{const result=await base.transaction(fn);if(mode==='issue')f.source(null);else f.identity(null);return result;}}});
 assert.equal(mode==='issue'?await late.issue():await late.consume({nonce:issued.nonce}),null);
 assert.equal((await h.status()).state,mode==='issue'?'issued':'confirmed');assert.equal(await h.issue(),null);
 }finally{f.cleanup();}}
});
test('status cannot mix an issued record with a later confirmed withdrawal',async()=>{
 const f=await setup();try{
 const {createPrivateCustodyChallenge}=await load(),h=createPrivateCustodyChallenge(f.options),issued=await h.issue(),base=f.options.storage;
 let raced=false;
 const reader=createPrivateCustodyChallenge({...f.options,storage:{transaction:fn=>base.transaction(fn),get:async k=>{const value=await base.get(k);if(!raced){raced=true;await h.consume({nonce:issued.nonce});await h.withdraw();}return value;}}});
 const result=await reader.status();assert.ok(result.state==='issued'||result.state==='withdrawn'&&Number.isSafeInteger(result.consumedAt));
 }finally{f.cleanup();}
});
