import test from 'node:test';
import assert from 'node:assert/strict';
import * as api from '../lib/mcp-qa-generation-ledger.mjs';
import {generationFixture,LEGACY,HEAD,INFO,CONTROL,hash} from './fixtures/qa-generation-ledger.mjs';
const make=(f,overrides={})=>api.createPrivateQaGenerationLedger({...f.options(),...overrides});
const copy=rows=>structuredClone([...rows]);
const flags=r=>{for(const k of ['authorizesEffects','guardLivenessVerified','operationalReadiness','mayRetry'])assert.equal(r[k],false);};
test('metadata ledger arms once under two external checks and preserves legacy/journals',async()=>{
 assert.equal(typeof api.createPrivateQaGenerationLedger,'function');
 const f=generationFixture();f.rows.set('afw.old-journal',{state:'preserve'});const old=copy(f.rows),ledger=make(f);
 const r=await ledger.arm();assert.equal(r.status,'armed');flags(r);assert.equal(f.calls,2);assert.equal(f.rows.size,old.length+3);
 for(const [k,v]of old)assert.deepEqual(f.rows.get(k),v);
 assert.equal(r.planHash,hash('afw.qa-generation-plan.v2\n'+JSON.stringify(f.capsule)));
 assert.equal((await ledger.readArmed()).status,'armed');assert.equal((await ledger.arm()).status,'blocked');assert.equal(f.rows.size,old.length+3);
 const info=f.rows.get(INFO+r.planHash);assert.equal(r.infoHash,hash('afw.qa-generation-info.v2\n'+JSON.stringify(info)));
 assert.equal(info.execution.context,'durable_object');assert.equal(info.execution.authorizesEffects,false);
 assert.equal((await ledger.withdraw()).status,'withdrawn');assert.equal((await ledger.readArmed()).status,'blocked');
 const withdrawn=copy(f.rows);assert.equal((await ledger.withdraw()).status,'already_withdrawn');assert.deepEqual(copy(f.rows),withdrawn);
});
test('postcheck failure leaves pending metadata without admitting readArmed or replay',async()=>{
 const f=generationFixture();f.eligibility=async n=>n===1;const ledger=make(f),r=await ledger.arm();assert.equal(r.status,'uncertain');flags(r);
 assert.equal((await ledger.status()).status,'pending');assert.equal((await ledger.readArmed()).status,'blocked');assert.equal((await ledger.arm()).status,'blocked');assert.equal((await ledger.withdraw()).status,'withdrawn');
});
for(const answer of [false,undefined,{eligible:true},1])test('precheck requires literal true: '+String(answer),async()=>{
 const f=generationFixture();f.eligibility=async()=>answer;assert.equal((await make(f).arm()).status,'blocked');assert.equal(f.rows.size,1);
});
for(const transaction of [1,2])test('lost ACK at transaction '+transaction+' never resumes or renews',async()=>{
 const f=generationFixture();f.lost.add(transaction);const ledger=make(f),r=await ledger.arm();assert.equal(r.status,'uncertain');const s=await ledger.status();assert.equal(s.status,transaction===1?'pending':'armed');assert.equal((await ledger.arm()).status,'blocked');const before=f.rows.get(CONTROL+s.planHash).pendingAt;assert.equal((await ledger.withdraw()).status,'withdrawn');assert.equal(f.rows.get(CONTROL+s.planHash).pendingAt,before);
});
test('concurrent ARM has one winner with immutable INFO',async()=>{
 const f=generationFixture(),a=make(f),b=make(f),results=await Promise.all([a.arm(),b.arm()]);assert.equal(results.filter(x=>x.status==='armed').length,1);assert.equal(f.rows.size,4);const before=copy(f.rows);await b.arm();assert.deepEqual(copy(f.rows),before);
});
test('different plans race by HEAD CAS and never overwrite the winner',async()=>{
 const f=generationFixture(),a=make(f);f.capsule={...f.capsule,trialId:'8'.repeat(64),grantId:'other-grant',eventId:'9'.repeat(64)};const b=make(f);
 const r=await Promise.all([a.arm(),b.arm()]);assert.equal(r.filter(x=>x.status==='armed').length,1);assert.equal(f.rows.size,4);
});
test('expired or non-withdrawn exact legacy never opens a generation',async()=>{
 for(const mutate of [r=>r.withdrawnAt=null,r=>r.armedAt=null,r=>r.planHash='0'.repeat(64),r=>r.extra=true]){
  const f=generationFixture();mutate(f.rows.get(LEGACY));assert.equal((await make(f).arm()).status,'blocked');assert.equal(f.rows.size,1);
 }
 const f=generationFixture();const p=JSON.parse(f.legacy.policy);p.expiresAt=f.now()+5000;p.startAt=f.now()-5000;const r={...f.legacy,policy:JSON.stringify(p),planHash:hash(JSON.stringify(p)),armedAt:f.now()-4000,withdrawnAt:f.now()-2000};f.rows.set(LEGACY,r);f.capsule.predecessor.control=JSON.stringify(r);assert.equal((await make(f).arm()).status,'blocked');assert.equal(f.rows.size,1);
});
test('withdraw absent target does not create a permanent fence or HEAD',async()=>{
 const f=generationFixture(),r=await make(f).withdraw();assert.equal(r.status,'absent');flags(r);assert.equal(f.rows.size,1);assert.equal(f.rows.has(HEAD),false);
});
test('second generation requires predecessor withdrawn and expired; historical withdrawal stays isolated',async()=>{
 const f=generationFixture(),old=make(f),r=await old.arm();assert.equal(r.status,'armed');
 const next={...f.capsule,predecessor:{kind:'generation',planHash:r.planHash,infoHash:r.infoHash,sequence:r.sequence},trialId:'8'.repeat(64),grantId:'next-grant',eventId:'9'.repeat(64),startAt:f.now()+70000,expiresAt:f.now()+130000};
 f.capsule=next;assert.equal((await make(f).arm()).status,'blocked');await old.withdraw();assert.equal((await make(f).arm()).status,'blocked');
 f.setNow(f.now()+71000);const newer=make(f),s=await newer.arm();assert.equal(s.status,'armed');assert.equal(s.sequence,2);const current=structuredClone(f.rows.get(CONTROL+s.planHash)),head=structuredClone(f.rows.get(HEAD));
 await old.withdraw();assert.deepEqual(f.rows.get(CONTROL+s.planHash),current);assert.deepEqual(f.rows.get(HEAD),head);assert.equal((await old.status()).status,'withdrawn');assert.equal((await old.readArmed()).status,'blocked');assert.equal((await newer.readArmed()).status,'armed');
});
for(const field of ['trialId','grantId','eventId'])test('identity reuse is rejected for '+field,async()=>{
 const f=generationFixture();f.capsule[field]=f.capsule.predecessor[field];assert.throws(()=>make(f));assert.equal(f.rows.size,1);
});
test('new code can inspect and withdraw old INFO without reviving old UUID authority',async()=>{
 const f=generationFixture(),r=await make(f).arm();assert.equal(r.status,'armed');f.env.AFW_QA_VERSION={id:'22222222-2222-4222-8222-222222222222'};f.pinOptions.expectedVersionId=f.env.AFW_QA_VERSION.id;f.pinOptions.sourceRevision='b'.repeat(40);const newer=make(f);assert.equal((await newer.status()).status,'armed');assert.equal((await newer.readArmed()).status,'blocked');assert.equal((await newer.withdraw()).status,'withdrawn');
});
for(const stage of [1,2])test('pin drift during eligibility '+stage+' never promotes',async()=>{
 const f=generationFixture();f.eligibility=async n=>{if(n===stage)f.env.AFW_QA_VERSION.id='22222222-2222-4222-8222-222222222222';return true;};assert.equal((await make(f).arm()).status,stage===1?'blocked':'uncertain');assert.equal(f.rows.get(HEAD)?f.rows.get(CONTROL+f.rows.get(HEAD).planHash).phase:'absent',stage===1?'absent':'pending');
});
for(const drift of ['deadline','backwards'])test('original wall lease prevents '+drift+' after pending CAS',async()=>{
 const f=generationFixture(),at=f.now();f.eligibility=async n=>{if(n===2)f.setNow(drift==='deadline'?at+5000:at-1);return true;};const ledger=make(f),r=await ledger.arm();assert.equal(r.status,'uncertain');assert.equal(f.rows.get(CONTROL+f.rows.get(HEAD).planHash).phase,'pending');
});
test('readArmed does not extend the original window',async()=>{
 const f=generationFixture(),ledger=make(f);await ledger.arm();f.setNow(f.capsule.expiresAt);assert.equal((await ledger.readArmed()).status,'blocked');assert.equal((await ledger.status()).status,'armed');assert.equal((await ledger.withdraw()).status,'withdrawn');
});
test('methods reject caller selectors without mutating metadata',async()=>{
 const f=generationFixture(),ledger=make(f);for(const method of ['arm','readArmed','status','withdraw'])assert.equal((await ledger[method]('foreign')).status,'blocked');assert.equal(f.rows.size,1);
});
test('strict constructor rejects getters, extra fields, noncanonical JSON and unbounded options',()=>{
 const f=generationFixture(),base=f.options();let getters=0;const getter={...base};Object.defineProperty(getter,'capsule',{enumerable:true,get(){getters++;return base.capsule;}});
 for(const o of [getter,{...base,extra:true},{...base,capsule:' '+base.capsule},{...base,timeoutMs:5001},{...base,timeoutMs:0},{...base,capsule:'x'.repeat(16385)},{...base,executionPin:{assertCurrent(){},snapshot(){return{purpose:'afw.qa-execution-pin.v1',runtimeVersionId:f.env.AFW_QA_VERSION.id,sourceRevision:'a'.repeat(40),context:'workflow',authorizesEffects:false,operationalReadiness:false};}}}])assert.throws(()=>api.createPrivateQaGenerationLedger(o));assert.equal(getters,0);
});
for(const broken of ['head-absent','info-absent','control-absent','head-corrupt','info-corrupt','control-corrupt'])test('incomplete or corrupt metadata fails closed: '+broken,async()=>{
 const f=generationFixture(),ledger=make(f),r=await ledger.arm();const key=broken.startsWith('head')?HEAD:broken.startsWith('info')?INFO+r.planHash:CONTROL+r.planHash;if(broken.endsWith('absent'))f.rows.delete(key);else f.rows.set(key,{foreign:true});const before=copy(f.rows);
 for(const method of ['arm','readArmed','status','withdraw'])assert.equal((await ledger[method]()).status,'blocked');assert.deepEqual(copy(f.rows),before);
});

for(const prefix of [INFO,CONTROL])test('missing HEAD with an unrelated '+prefix+' orphan cannot restart legacy',async()=>{
 const f=generationFixture();f.rows.set(prefix+'f'.repeat(64),{orphan:true});const before=copy(f.rows);for(const method of ['arm','status','withdraw','readArmed'])assert.equal((await make(f)[method]()).status,'blocked');assert.deepEqual(copy(f.rows),before);
});

test('eligibility stays outside storage callbacks and is rechecked after pending commit',async()=>{
 const f=generationFixture();f.eligibility=async n=>{assert.equal(f.storage.transactions,n-1);return true;};assert.equal((await make(f).arm()).status,'armed');
});
for(const stage of [1,2])test('original monotonic lease bounds delayed eligibility '+stage,async()=>{
 const f=generationFixture();f.eligibility=async n=>{if(n===stage)await new Promise(resolve=>setTimeout(resolve,70));return true;};assert.equal((await make(f,{timeoutMs:40}).arm()).status,stage===1?'blocked':'uncertain');assert.equal(f.rows.size,stage===1?1:4);
});
async function advance(f,previous,number){
 f.setNow(f.capsule.expiresAt+1);f.capsule={...f.capsule,predecessor:{kind:'generation',planHash:previous.planHash,infoHash:previous.infoHash,sequence:previous.sequence},trialId:number.toString(16).padStart(64,'0'),grantId:'generation-'+number,eventId:(number+100).toString(16).padStart(64,'0'),startAt:f.now(),expiresAt:f.now()+1000};
 const ledger=make(f),r=await ledger.arm();assert.equal(r.status,'armed');await ledger.withdraw();return r;
}
for(const field of ['trialId','grantId','eventId'])test('G3 cannot reuse a non-immediate G1 '+field,async()=>{
 const f=generationFixture(),firstCapsule=structuredClone(f.capsule),ledger=make(f),first=await ledger.arm();await ledger.withdraw();const second=await advance(f,first,2);
 f.setNow(f.capsule.expiresAt+1);f.capsule={...f.capsule,predecessor:{kind:'generation',planHash:second.planHash,infoHash:second.infoHash,sequence:2},trialId:'b'.repeat(64),grantId:'generation-3',eventId:'c'.repeat(64),startAt:f.now(),expiresAt:f.now()+1000,[field]:firstCapsule[field]};
 const before=copy(f.rows);assert.equal((await make(f).arm()).status,'blocked');assert.deepEqual(copy(f.rows),before);
});
test('lineage admits sequence32 and rejects33 without reset',async()=>{
 const f=generationFixture(),ledger=make(f);let r=await ledger.arm();await ledger.withdraw();
 for(let n=2;n<=32;n++)r=await advance(f,r,n);
 assert.equal(r.sequence,32);const before=copy(f.rows);f.capsule={...f.capsule,predecessor:{kind:'generation',planHash:r.planHash,infoHash:r.infoHash,sequence:32},trialId:'b'.repeat(64),grantId:'generation-33',eventId:'c'.repeat(64),startAt:f.now(),expiresAt:f.now()+1000};assert.throws(()=>make(f));assert.deepEqual(copy(f.rows),before);
});
for(const corrupted of [INFO,CONTROL])test('corruption of an ancestor '+corrupted+' blocks a well-formed HEAD',async()=>{
 const f=generationFixture(),ledger=make(f),first=await ledger.arm();await ledger.withdraw();const second=await advance(f,first,2);f.rows.set(corrupted+first.planHash,{foreign:true});const before=copy(f.rows);
 for(const method of ['status','withdraw','readArmed','arm'])assert.equal((await make(f)[method]()).status,'blocked');assert.deepEqual(copy(f.rows),before);assert.equal(f.rows.get(HEAD).planHash,second.planHash);
});
test('self-referencing or inconsistent sequence capsule is rejected by chain validation',async()=>{
 const f=generationFixture(),ledger=make(f),first=await ledger.arm();await ledger.withdraw();const info=f.rows.get(INFO+first.planHash);info.capsule=JSON.stringify({...JSON.parse(info.capsule),predecessor:{kind:'generation',planHash:first.planHash,infoHash:first.infoHash,sequence:1}});
 const before=copy(f.rows);for(const method of ['status','withdraw','readArmed','arm'])assert.equal((await ledger[method]()).status,'blocked');assert.deepEqual(copy(f.rows),before);
});
test('all observation paths stay explicitly non-authorizing',async()=>{
 const f=generationFixture(),ledger=make(f);flags(await ledger.status());flags(await ledger.readArmed());flags(await ledger.withdraw());flags(await ledger.arm());flags(await ledger.readArmed());flags(await ledger.status());flags(await ledger.withdraw());flags(await ledger.status());flags(await ledger.readArmed());flags(await ledger.arm());
});

test('valid HEAD rolled back to an ancestor cannot hide later metadata',async()=>{
 const f=generationFixture(),ledger=make(f),first=await ledger.arm();await ledger.withdraw();await advance(f,first,2);f.rows.set(HEAD,{purpose:HEAD,sequence:first.sequence,planHash:first.planHash,infoHash:first.infoHash});
 const before=copy(f.rows);for(const method of ['arm','status','withdraw','readArmed'])assert.equal((await ledger[method]()).status,'blocked');assert.deepEqual(copy(f.rows),before);
});
test('expired but still armed predecessor independently blocks the next ARM',async()=>{
 const f=generationFixture(),ledger=make(f),first=await ledger.arm();f.setNow(f.capsule.expiresAt+1);f.capsule={...f.capsule,predecessor:{kind:'generation',planHash:first.planHash,infoHash:first.infoHash,sequence:1},trialId:'8'.repeat(64),grantId:'next-grant',eventId:'9'.repeat(64),startAt:f.now(),expiresAt:f.now()+1000};
 const before=copy(f.rows);assert.equal((await make(f).arm()).status,'blocked');assert.deepEqual(copy(f.rows),before);
});
test('matching expired legacy without withdrawal is invalid independently of byte mismatch',()=>{
 const f=generationFixture();f.legacy.withdrawnAt=null;f.rows.set(LEGACY,f.legacy);f.capsule.predecessor.control=JSON.stringify(f.legacy);assert.throws(()=>make(f));assert.equal(f.rows.size,1);
});
test('canonical field order cannot manufacture another plan identity',()=>{
 const f=generationFixture(),c=f.capsule,o=f.options();const reordered={predecessor:c.predecessor,purpose:c.purpose,...Object.fromEntries(Object.entries(c).filter(([k])=>!['purpose','predecessor'].includes(k)))};
 assert.throws(()=>make(f,{capsule:JSON.stringify(reordered)}));
 const inner=structuredClone(c);inner.predecessor={control:inner.predecessor.control,kind:'legacy',trialId:inner.predecessor.trialId,grantId:inner.predecessor.grantId,eventId:inner.predecessor.eventId};assert.throws(()=>make(f,{capsule:JSON.stringify(inner)}));
 const old=structuredClone(c),r=f.legacy;old.predecessor.control=JSON.stringify({planHash:r.planHash,purpose:r.purpose,policy:r.policy,armedAt:r.armedAt,withdrawnAt:r.withdrawnAt});assert.throws(()=>api.createPrivateQaGenerationLedger({...o,capsule:JSON.stringify(old)}));
});
