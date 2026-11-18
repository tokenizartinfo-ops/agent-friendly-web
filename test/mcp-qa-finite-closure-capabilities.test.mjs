import test from 'node:test';
import assert from 'node:assert/strict';
import {finiteRestorationFixture} from './fixtures/finite-restoration.mjs';
import {finiteAdmissionIdentity} from '../lib/mcp-own-finite-cleanup-proof.mjs';
import {finiteHash} from '../lib/mcp-finite-evidence.mjs';

const api=await import('../lib/mcp-qa-finite-closure-capabilities.mjs').catch(error=>{
 if(error.code!=='ERR_MODULE_NOT_FOUND'||!error.message.includes('mcp-qa-finite-closure-capabilities.mjs'))throw error;
 return {};
});
const create=options=>{
 assert.equal(typeof api.createPrivateQaFiniteClosureCapabilities,'function','native closure composition missing');
 return api.createPrivateQaFiniteClosureCapabilities(options);
};

async function fixture(){
 const f=await finiteRestorationFixture(),{identity,qualifiedExecution}=f,p=identity.plan;
 const calls=[],journalIdentity=finiteAdmissionIdentity(identity);
 const purpose='afw.own-finite-admission.v1',identityHash=finiteHash({purpose,identity:journalIdentity});
 let seal=null,withdraw=null,close=null;
 const refs={intentId:p.intentId,controlHash:identity.controlHash};
 const planned={intentId:p.intentId,planHash:identity.planHash};
 const stub={
  async withdrawFiniteTrialPermissions(x){
   assert.deepEqual(x,refs);calls.push('withdraw');
   withdraw={purpose:'afw.own-permissions-only-reduction.v1',permissionsWithdrawn:true};
   throw Error('lost write acknowledgement');
  },
  async closeFiniteTrial(x){
   assert.deepEqual(x,refs);calls.push('close');close={closed:true,runtimeStopRequested:true};return close;
  },
  async readFiniteTrialReductionReceipts(x){
   assert.deepEqual(x,refs);calls.push('read_reductions');return {withdraw,close};
  },
  async sealFiniteTrialAdmission(x){
   assert.deepEqual(x,planned);calls.push('seal');seal={purpose:purpose+':seal',identityHash,sealedAt:f.f.now()};
   return {status:'sealed'};
  },
  async readFiniteTrialAdmissionJournal(x){
   assert.deepEqual(x,refs);calls.push('read_seal');
   return {status:'observed',identity:journalIdentity,identityHash,sealed:seal!==null,seal,sealHash:seal?finiteHash(seal):null,writers:{},unresolvedWriters:0,launchNeverIssued:true,authorizesEffects:false,operationalReadiness:false};
  },
  async readFiniteTrialCleanupReadiness(){throw Error('retained proof must be reused');}
 };
 const id={toString:()=>p.resources.containerId};
 f.f.env.AFW_RELEASE_EVENTS_NODE={
  idFromName(name){assert.equal(name,'afw-own-event-first-successor-v1');return id;},
  get(value){assert.equal(value,id);return stub;}
 };
 const options={ctx:f.f.ctx,env:f.f.env,identity,now:f.f.now,source:{
  readPrimary:f.options.primaryRead,qualifiedExecution,readReadCredential:async()=>'synthetic-reader-credential',
  readPublishCredential:async()=>'synthetic-publisher-credential'
 }};
 const issue=async kind=>{
  const claim={purpose:'afw.qa-finite-trial.v1:effect',intentId:p.intentId,controlHash:identity.controlHash,kind,phase:'issued',issuedAt:f.f.now(),deadline:p.C1,proofHash:null};
  f.f.rows.set('afw.qa-finite-trial.v1:'+p.intentId+':effect:'+kind,claim);return {claim,proofHash:null};
 };
 return {...f,options,issue,calls,stub,get posts(){return f.posts;}};
}

test('withdraw, close and seal use exact native actor; uncertain withdraw is reconciled by GET',async()=>{
 const f=await fixture(),caps=create(f.options),parent=()=>{};
 const w=await f.issue('withdraw'),c=await f.issue('close'),s=await f.issue('seal');
 await assert.rejects(()=>caps.withdraw.execute(w,parent),/acknowledgement/);
 assert.equal((await caps.withdraw.reconcile(w,parent)).permissionsWithdrawn,true);
 await caps.close.execute(c,parent);
 assert.deepEqual(await caps.close.reconcile(c,parent),{closed:true,runtimeStopRequested:true});
 assert.equal(await caps.seal.reconcile(s,parent),null);
 await caps.seal.execute(s,parent);
 assert.equal((await caps.seal.reconcile(s,parent)).sealedAt,f.f.now());
 assert.deepEqual(f.calls,['withdraw','read_reductions','close','read_reductions','read_seal','seal','read_seal']);
});

test('foreign or changed native actor, mismatched claim and expired parent do not send',async()=>{
 const f=await fixture(),caps=create(f.options),c=await f.issue('close');
 await assert.rejects(()=>caps.close.execute({...c,claim:{...c.claim,issuedAt:c.claim.issuedAt+1}},()=>{}));
 await assert.rejects(()=>caps.close.execute(c,()=>{throw Error('expired original parent');}),/expired/);
 f.options.env.AFW_RELEASE_EVENTS_NODE.get=()=>f.stub;
 await assert.rejects(()=>caps.close.execute(c,()=>{}));
 assert.deepEqual(f.calls,[]);
 const g=await fixture();
 g.options.env.AFW_RELEASE_EVENTS_NODE.idFromName=()=>({toString:()=> '0'.repeat(64)});
 assert.throws(()=>create(g.options),/Finite native closure unavailable/);
 assert.deepEqual(g.calls,[]);
});

test('one qualified restoration POST, with the same retained proof and independent closed readback',async t=>{
 const f=await fixture();
 t.mock.method(globalThis,'fetch',async(url,init)=>{
  const u=new URL(url);
  assert.equal(u.origin,'https://api.cloudflare.com');
  const r=await f.request({method:init.method,path:u.pathname.replace('/client/v4',''),
   query:Object.fromEntries([...u.searchParams].map(([k,v])=>[k,['per_page','page'].includes(k)?Number(v):v])),
   ...(init.body?{body:JSON.parse(init.body)}:{})});
  const {status,...body}=r;return Response.json(body,{status});
 });
 const caps=create(f.options);
 assert.equal((await caps.proof.read(()=>{})).record.proofHash,f.input.proofHash);
 await caps.canary_restore.execute(f.input,()=>{});
 await assert.rejects(()=>caps.canary_restore.execute(f.input,()=>{}));
 assert.equal((await caps.canary_restore.reconcile(f.input,()=>{})).versionId,f.identity.plan.deployments.canaryClosed.versionId);
 assert.equal(f.posts,1);
});
