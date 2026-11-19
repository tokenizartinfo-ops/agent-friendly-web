import test from 'node:test';
import assert from 'node:assert/strict';
import {sealFiniteOwnerCleanupRecord as seal,encodeFiniteOwnerCleanupRecord as encode,decodeFiniteOwnerCleanupRecord as decode} from '../lib/mcp-qa-finite-owner-cleanup-records.mjs';
import {createFiniteOwnerCleanupJournal} from '../lib/mcp-qa-finite-owner-cleanup-journal.mjs';
import {observeFiniteOwnerCleanupWork,observeFiniteReadOnlyWork,retainFiniteOwnerStagePromise} from '../lib/mcp-qa-finite-stage-work.mjs';
const h=c=>c.repeat(64),uuid='11111111-1111-4111-8111-111111111111',I0=1800000000000,C0=I0+900000,C1=C0+180000;
const fields={planHash:h('1'),capsuleHash:h('2'),enrollmentHash:h('3'),preconnectionId:h('4'),sourceRevision:'a'.repeat(40),qaVersionId:uuid,actorId:h('5'),I0,C0,C1};
function identity(){return seal('Identity',{purpose:'afw.finite-owner-cleanup-identity.v1',...fields});}
function send(i=identity(),operation='sdk_revoke'){return seal('Send',{purpose:'afw.finite-owner-cleanup-send.v1',identityHash:i.recordHash,operation,requestId:uuid,requestHash:h('6'),issuedAt:C0+10,deadline:C0+5010});}
function observed(s=send()){return seal('Observed',{purpose:'afw.finite-owner-cleanup-observed.v1',sendHash:s.recordHash,resultHash:h('7'),outcome:'returned',observedAt:C0+100});}
function receipt(i=identity(),s=send(i),o=observed(s)){return seal('Receipt',{purpose:'afw.finite-owner-cleanup-receipt.v1',identityHash:i.recordHash,planHash:i.planHash,fenceHash:h('8'),grantFactHash:h('9'),noticeFactHash:h('a'),sdkSendHash:s?.recordHash??null,sdkObservedHash:o?.recordHash??null,restoreSendHash:h('b'),restoreAckHash:h('c'),baselineVersionId:uuid,baselineDeploymentId:'22222222-2222-4222-8222-222222222222',finalFactsHash:h('d'),observedAt:C0+200,businessAccessClosed:true,sdkReductionReturned:!!s,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false});}
function change(kind,value,delta){const v={...value,...delta};delete v.recordHash;return seal(kind,v);}
// Explicit synthetic component ctx/leases, never native business admission.
function component(){
 const data=new Map(),controller=new AbortController(),actor={toString:()=>fields.actorId};
 const state={syncs:0,reads:0,transactions:0,fail:null};
 const storage={async get(k){state.reads++;if(state.fail==='readback'&&state.syncs)throw Error('SYN lost readback');return data.get(k);},async list({prefix,limit}){return new Map([...data].filter(([k])=>k.startsWith(prefix)).sort().slice(0,limit));},async put(k,v){data.set(k,v);},async transaction(fn){state.transactions++;const result=await fn(storage);if(state.fail==='transaction')throw Error('SYN lost final transaction');return result;},async sync(){state.syncs++;if(state.fail==='sync')throw Error('SYN lost sync');}};
 const ctx={storage,id:actor},env={AFW_INDEPENDENT_CLOSURE:{idFromName:()=>actor},AFW_QA_VERSION:{id:uuid},RELEASE_DB:{withSession(){throw Error('component has no SQL');}}};
 const lease=Object.freeze({signal:controller.signal,assertCurrent(){if(controller.signal.aborted)throw Error('SYN expired component lease');}});
 return {ctx,env,lease,controller,data,state,journal:createFiniteOwnerCleanupJournal({ctx,env})};
}
test('R2 cleanup records roundtrip',()=>{
 const i=identity(),s=send(i),o=observed(s),r=receipt(i,s,o),q=seal('Reconciled',{purpose:'afw.finite-owner-cleanup-reconciled.v1',identityHash:i.recordHash,sendHash:s.recordHash,delivery:1,factsHash:h('e'),observedAt:C0+150});
 for(const [kind,value]of [['Identity',i],['Send',s],['Observed',o],['Receipt',r],['Reconciled',q]])assert.deepEqual(decode(kind,encode(kind,value)),value);
});
test('R2 cleanup hash rejects drift',()=>{const i=identity();assert.throws(()=>encode('Identity',{...i,planHash:h('f')}));assert.throws(()=>decode('Identity',encode('Identity',i)+' '));});
test('R2 cleanup records reject accessors and extra fields',()=>{const i=identity();let reads=0;const a={...i};Object.defineProperty(a,'planHash',{enumerable:true,get(){reads++;return i.planHash;}});assert.throws(()=>encode('Identity',a));assert.equal(reads,0);assert.throws(()=>change('Identity',i,{authority:true}));});
test('R2 cleanup identity binds original plan and clock',()=>{const i=identity();for(const delta of [{C0:C0+1},{C1:C1+1},{I0:I0+1},{sourceRevision:'wrong'},{actorId:'unknown'},{planHash:null}])assert.throws(()=>change('Identity',i,delta));assert.notEqual(change('Identity',i,{planHash:h('f')}).recordHash,i.recordHash);});
test('R2 cleanup send permits only fixed reductions',()=>{const s=send();for(const delta of [{operation:'grant'},{operation:'delete_client'},{deadline:s.deadline+1},{requestId:'sdk-id'}])assert.throws(()=>change('Send',s,delta));assert.equal(send(identity(),'monitoring_revoke').operation,'monitoring_revoke');});
test('R2 cleanup observed requires original send',async()=>{const f=component(),i=identity(),s=send(i);await f.journal.appendIdentity(i,f.lease);const o=observed(s);assert.equal((await f.journal.appendObserved({preconnectionId:i.preconnectionId,operation:'sdk_revoke',record:o},f.lease)).status,'uncertain');await f.journal.appendSend({preconnectionId:i.preconnectionId,record:s},f.lease);assert.equal((await f.journal.appendObserved({preconnectionId:i.preconnectionId,operation:'sdk_revoke',record:change('Observed',o,{observedAt:s.deadline})},f.lease)).status,'uncertain');assert.equal((await f.journal.appendObserved({preconnectionId:i.preconnectionId,operation:'sdk_revoke',record:o},f.lease)).status,'recorded');});
test('R2 cleanup receipt requires business closure',()=>{assert.throws(()=>change('Receipt',receipt(),{businessAccessClosed:false}));assert.throws(()=>change('Receipt',receipt(),{restoreAckHash:null}));});
test('R2 cleanup receipt forbids global drain and namespace claims',()=>{for(const field of ['globalNativeDrainVerified','sdkNamespaceEmptyVerified'])assert.throws(()=>change('Receipt',receipt(),{[field]:true}));});
test('R2 cleanup receipt preserves never-issued null obligations',()=>{const r=receipt(identity(),null,null);assert.equal(r.sdkReductionReturned,false);assert.equal(r.sdkSendHash,null);assert.equal(r.sdkObservedHash,null);assert.equal(change('Receipt',r,{restoreSendHash:null,restoreAckHash:null}).restoreAckHash,null);assert.throws(()=>change('Receipt',r,{sdkReductionReturned:true}));});
test('R2 cleanup journal append is once',async()=>{const f=component(),i=identity(),s=send(i);assert.equal((await f.journal.appendIdentity(i,f.lease)).status,'recorded');assert.equal((await f.journal.appendIdentity(i,f.lease)).status,'existing');assert.equal((await f.journal.appendSend({preconnectionId:i.preconnectionId,record:s},f.lease)).status,'recorded');assert.equal((await f.journal.appendSend({preconnectionId:i.preconnectionId,record:change('Send',s,{requestHash:h('f')})},f.lease)).status,'uncertain');assert.equal(f.data.size,2);});
test('R2 cleanup journal rejects foreign identity and unknown suffix',async()=>{const f=component(),i=identity();assert.equal((await f.journal.appendIdentity(change('Identity',i,{actorId:h('f')}),f.lease)).status,'uncertain');assert.equal(f.data.size,0);await f.journal.appendIdentity(i,f.lease);f.data.set('afw.finite-owner-cleanup.v1:'+i.preconnectionId+':unknown','{}');await assert.rejects(f.journal.read({preconnectionId:i.preconnectionId},f.lease));});
test('R2 cleanup journal requires transaction sync and readback',async()=>{for(const mode of ['transaction','sync','readback']){const f=component();f.state.fail=mode;assert.equal((await f.journal.appendIdentity(identity(),f.lease)).status,'uncertain');assert.equal(f.state.transactions,1);assert.equal(f.data.size,1,'committed row never substitutes for original acknowledgement');}const f=component();assert.equal((await f.journal.appendIdentity(identity(),f.lease)).status,'recorded');assert.equal(f.state.syncs,1);assert(f.state.reads>0);});
test('R2 cleanup scope retains actual work after logical abort',async()=>{const f=component();let release;const actual=new Promise(resolve=>{release=resolve;});await observeFiniteOwnerCleanupWork({ctx:f.ctx,env:f.env,originalLease:f.lease},async()=>{retainFiniteOwnerStagePromise(actual);return 'logical refusal';});f.controller.abort();const other=component();assert.throws(()=>observeFiniteReadOnlyWork({ctx:f.ctx,env:f.env,originalLease:other.lease},async()=>true));release();await actual;await Promise.resolve();assert.equal(await observeFiniteReadOnlyWork({ctx:f.ctx,env:f.env,originalLease:other.lease},async()=>true),true);other.controller.abort();});
test('R2 cleanup scope rejects foreign or nested root',async()=>{const f=component(),other=component();await observeFiniteOwnerCleanupWork({ctx:f.ctx,env:f.env,originalLease:f.lease},async()=>{assert.throws(()=>observeFiniteOwnerCleanupWork({ctx:f.ctx,env:f.env,originalLease:other.lease},async()=>true));assert.throws(()=>observeFiniteOwnerCleanupWork({ctx:f.ctx,env:f.env,originalLease:f.lease},async()=>true));});f.controller.abort();});

const coupledCleanup=await import('../lib/mcp-qa-finite-coupled-cleanup-facts.mjs').catch(()=>({}));
const policyPrefix='afw.finite-policy-effect.v1:',writerHead=policyPrefix+'writer-head';
function coupledFacts(){
 const moduleHash=h('3'),versionId='22222222-2222-4222-8222-222222222222',deploymentId='33333333-3333-4333-8333-333333333333';
 const stage={versionId,deploymentId,moduleHash,stage:'finite'};
 const pin={versionId:'44444444-4444-4444-8444-444444444444',deploymentId:'55555555-5555-4555-8555-555555555555',module:{sha256:moduleHash}};
 const prepId=h('1'),selectionHash=h('2'),intentId=h('4'),sourceRevision='a'.repeat(40),handoffHash=h('5'),cleanupScopeHash=h('6');
 const keys=[['send','ack'],['send','ack','receipt','confirmation']].flatMap((parts,i)=>parts.map(part=>policyPrefix+h(i?'b':'a')+':'+part));
 const policy={keys,writerHead:'SYN policy head',handoffHash,prepId,selectionHash,intentId,sourceRevision,cleanupScopeHash,
  pin,upload:{baselineVersionId:stage.versionId,baselineDeploymentId:stage.deploymentId},rollback:{versionId:uuid}};
 const selected={selection:{selectionHash},preparation:{prepId,sourceRevision},binding:{prepId,selectionHash,intentId,sourceRevision}};
 const scope={prepId,sourceRevision,scopeHash:cleanupScopeHash};
 return {stage,policy,selected,scope,rows:new Map([[writerHead,policy.writerHead],...keys.map(k=>[k,'SYN setup']),[policyPrefix+h('c')+':send','SYN connection']])};
}
test('coupled original cleanup inventories only the six qualified policy rows',()=>{
 const {policy,rows}=coupledFacts(),split=coupledCleanup.partitionFiniteCoupledPolicyEffects;
 assert.equal(typeof split,'function');
 assert.deepEqual([...split(rows,policy)],[[policyPrefix+h('c')+':send','SYN connection']]);
 const extra=policyPrefix+h('a')+':other';
 for(const bad of [new Map([...rows,[extra,'SYN unknown']]),new Map([...rows,[writerHead,'SYN stale writer']]),new Map([...rows].filter(([k])=>k!==policy.keys[0]))]){
  assert.throws(()=>split(bad,policy));
 }
});
test('coupled original cleanup requires the selected approval and third publication of this generation',()=>{
 const {stage,policy,selected,scope}=coupledFacts(),join=coupledCleanup.qualifyFiniteCoupledCleanupSelection;
 assert.equal(typeof join,'function');
 assert.doesNotThrow(()=>join({stage,policy,selected,scope}));
 for(const altered of [{stage:{...stage,versionId:uuid}},{selected:{...selected,binding:null}},{scope:{...scope,scopeHash:h('9')}}]){
  assert.throws(()=>join({stage,policy,selected,scope,...altered}));
 }
});
test('coupled original cleanup distinguishes exact pending and prior restoration evidence',()=>{
 const {policy}=coupledFacts(),classify=coupledCleanup.qualifyFiniteCoupledCleanupPointer;
 assert.equal(typeof classify,'function');
 const pending={kind:'no_restore',handoffHash:policy.handoffHash},pointer={versionId:policy.pin.versionId,deploymentId:policy.pin.deploymentId};
 assert.equal(classify({policy,restore:pending,pointer,deployment:{}}),'original_restore_needed');
 const restore={kind:'retained',handoffHash:policy.handoffHash,versionId:policy.rollback.versionId,deploymentId:uuid,annotation:'SYN exact'};
 const closed={pointer:{versionId:policy.rollback.versionId,deploymentId:uuid},deployment:{annotations:{'workers/message':'SYN exact'}}};
 assert.equal(classify({policy,restore,...closed}),'prior_restore_observed');
 for(const changed of [{restore:{...restore,kind:'ambiguous'}},{pointer},{deployment:{}}]){
  assert.throws(()=>classify({policy,restore,...closed,...changed}));
 }
});

test('coupled original cleanup cannot borrow a fabricated owner snapshot',async()=>{
 const {reducePrivateQaFiniteCoupledOwnerCleanup}=await import('../lib/mcp-qa-finite-owner-cleanup.mjs');
 const f=component(),options={ctx:f.ctx,env:f.env};
 await assert.rejects(()=>reducePrivateQaFiniteCoupledOwnerCleanup(options,f.lease,Object.freeze({}),Object.freeze({})));
 assert.equal(f.state.transactions,0);assert.equal(f.data.size,0);
});
