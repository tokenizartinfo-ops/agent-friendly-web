import test from 'node:test';
import assert from 'node:assert/strict';
import {finiteFixture,ROOT,HEAD,digest} from './fixtures/qa-finite-trial.mjs';
import {finiteHash} from '../lib/mcp-finite-evidence.mjs';
import {createPrivateQaFiniteTrialNativePin,readPrivateQaFiniteControlIdentity} from '../lib/mcp-qa-finite-trial-control.mjs';

const api=await import('../lib/mcp-qa-finite-reduction-control.mjs').catch(error=>{
 if(error.code!=='ERR_MODULE_NOT_FOUND'||!error.message.includes('mcp-qa-finite-reduction-control.mjs'))throw error;
 return {};
});
function fixture(){
 const f=finiteFixture();
 const nativePin=createPrivateQaFiniteTrialNativePin({ctx:f.ctx,env:f.env,sourceRevision:f.plan.source.revision});
 const c=readPrivateQaFiniteControlIdentity({nativePin,raw:JSON.stringify(f.plan)}),p=f.plan;
 const prefix=ROOT+':'+p.intentId+':',guardPrefix='afw.qa-finite-guard.v1:'+p.intentId+':effect:';
 const refs={intentId:p.intentId,controlHash:c.controlHash};
 f.rows.set(HEAD,{purpose:HEAD,...refs,planHash:c.planHash});
 f.rows.set(prefix+'info',c.info);
 f.rows.set(prefix+'control',{purpose:ROOT+':control',controlHash:c.controlHash,phase:'armed',
  pendingAt:p.T0,armedAt:p.T0+1,withdrawnAt:p.C0});
 const claim=kind=>({purpose:ROOT+':effect',...refs,kind,phase:'issued',issuedAt:p.C0+10,deadline:p.C1,proofHash:null});
 const allow=(kind,guard=true)=>{
  const row=claim(kind);f.rows.set(prefix+'effect:'+kind,row);
  if(guard)f.rows.set(guardPrefix+kind,{purpose:'afw.finite-guard-effect.v1',controlHash:c.controlHash,kind,
   claimHash:finiteHash(row),phase:'issued',receipt:null,completedAt:null});
 };
 f.setNow(p.C0+11);
 return {f,p,c,refs,prefix,guardPrefix,allow};
}
const read=()=>{assert.equal(typeof api.readPrivateQaFiniteReductionControl,'function','native QA cleanup control required');return api.readPrivateQaFiniteReductionControl;};
test('fixed QA control serves the matching acknowledged cleanup claim only during its original window',async()=>{
 const {f,p,c,refs,allow}=fixture(),get=read();
 const call=(operation,input=refs)=>get({ctx:f.ctx,env:f.env,compiledRevision:p.source.revision,now:f.now,refs:{...input,operation}});
 await assert.rejects(call('withdraw'));
 allow('withdraw',false);await assert.rejects(call('withdraw'));
 allow('withdraw');
 const result=await call('withdraw');
 assert.deepEqual(result.control,{plan:p,planHash:c.planHash,controlHash:c.controlHash});
 assert.equal(result.operation,'withdraw');
 assert.equal(result.expiresAt,p.C1);
 assert.deepEqual((await call('observe')).control,result.control);
 await assert.rejects(call('close'));
 allow('close');assert.equal((await call('close')).operation,'close');
 await assert.rejects(call('seal'));
 await assert.rejects(call('withdraw',{...refs,controlHash:'f'.repeat(64)}));
 f.setNow(p.C1);await assert.rejects(call('withdraw'));
 assert.equal(f.puts,0,'read-only proof never claims a write');
});
test('a wrong native version, guard hash or unwithdrawn business window never exports the cleanup control',async()=>{
 const {f,p,refs,prefix,guardPrefix,allow}=fixture(),get=read();
 const call=()=>get({ctx:f.ctx,env:f.env,compiledRevision:p.source.revision,now:f.now,refs:{...refs,operation:'withdraw'}});
 const version=f.env.AFW_QA_VERSION;
 allow('withdraw');f.env.AFW_QA_VERSION={id:'44444444-4444-4444-8444-444444444444'};
 await assert.rejects(call());f.env.AFW_QA_VERSION=version;
 const key=guardPrefix+'withdraw',row=f.rows.get(key);f.rows.set(key,{...row,claimHash:'f'.repeat(64)});
 await assert.rejects(call());f.rows.set(key,row);
 const stateKey=prefix+'control';f.rows.set(stateKey,{...f.rows.get(stateKey),withdrawnAt:null});
 await assert.rejects(call());
});

test('the candidate uses the existing private QA namespace and rejects changed expiry or canary version',async()=>{
 assert.equal(typeof api.readFiniteCanaryReductionControl,'function');
 const {f,p,refs,c}=fixture();
 const revision=p.selectors.sourceRevision;p.canaryContainment.sourceRevision=revision;
 const plan=structuredClone(p),version=plan.deployments.canaryLive.versionId;
 const control={plan,planHash:digest(plan.purpose,plan),controlHash:c.controlHash};
 const own={toString:()=>plan.resources.containerId},peer={toString:()=>plan.resources.actorId};
 let calls=0,expiresAt=plan.C1;
 const env={AFW_FINITE_TRIAL_VERSION:{id:version},AFW_DOSSIER_EVENTS_NODE:{idFromName(name){
  assert.equal(name,'afw-own-event-first-successor-v1');return own;
 }},AFW_FINITE_TRIAL_CONTROL:{idFromName(name){assert.equal(name,'afw-own-successor-closure-v1');return peer;},
  get(id){assert.equal(id,peer);return {async readFiniteCanaryReductionControl(value){
   assert.deepEqual(value,{...refs,operation:'close'});calls++;
   return {purpose:'afw.qa-finite-reduction-control.v1',operation:'close',control,observedAt:f.now(),expiresAt};
  }};}
 }};
 const call=()=>api.readFiniteCanaryReductionControl({ctx:{id:own,storage:{}},env,sourceRevision:revision,refs,operation:'close',now:f.now});
 assert.deepEqual(await call(),control);
 expiresAt++;await assert.rejects(call());expiresAt=plan.C1;
 env.AFW_FINITE_TRIAL_VERSION={id:'99999999-9999-4999-8999-999999999999'};
 await assert.rejects(call());assert.equal(calls,3);
});

test('the finite canary can seal only the issued QA seal for the exact committed plan',async()=>{
 const {f,p,c,refs,allow}=fixture(),get=read();
 const seal=(planHash=c.planHash)=>get({ctx:f.ctx,env:f.env,compiledRevision:p.source.revision,now:f.now,
  refs:{intentId:p.intentId,planHash,operation:'seal'}});
 const readSeal=()=>get({ctx:f.ctx,env:f.env,compiledRevision:p.source.revision,now:f.now,
  refs:{...refs,operation:'observeSeal'}});
 allow('withdraw');await assert.rejects(seal());await assert.rejects(readSeal());
 allow('seal',false);await assert.rejects(seal());
 allow('seal');const result=await seal();
 assert.equal(result.control.planHash,c.planHash);assert.equal(result.operation,'seal');
 await assert.rejects(seal('f'.repeat(64)));
 assert.equal((await readSeal()).control.controlHash,c.controlHash);
 assert.equal(f.puts,0);
});

test('the candidate cleanup journal can seal and read the original record without exposing launch writes',async()=>{
 const {createFiniteOwnCleanupAdmissionJournal}=await import('../lib/mcp-own-finite-cleanup-host.mjs');
 const {f,p,c}=fixture(),s=p.selectors,own={toString:()=>p.resources.containerId};
 const ctx={storage:f.storage,id:own},db={prepare(){throw Error('cleanup seal must not invoke D1');},withSession(){throw Error('cleanup seal must not invoke D1');}};
 const env={DB:db,AFW_FINITE_TRIAL_VERSION:{id:p.canaryContainment.runtimeVersionId},AFW_DOSSIER_EVENTS_ENABLED:'false',
  AFW_DOSSIER_EVENTS_NODE_NAME:'afw-own-event-first-successor-v1',AFW_DOSSIER_EVENTS_NODE:{idFromName:()=>own,idFromString:()=>own,get:()=>null},
  AFW_DOSSIER_EVENTS_POLICY:JSON.stringify({grantId:s.grantId,subject:s.subject,projectId:s.projectId,clientId:s.clientId,resource:s.resource,startAt:s.startAt,expiresAt:s.expiresAt}),
  AFW_DOSSIER_EVENTS_PROJECTION_SECRET:'z'.repeat(32),AFW_OAUTH_ISSUER:'https://fixed.invalid',
  AFW_OAUTH_PILOT_CLIENT_ID:s.clientId,AFW_OAUTH_PILOT_PROJECT_ID:s.projectId,AFW_OAUTH_RESOURCE:s.resource};
 const journal=createFiniteOwnCleanupAdmissionJournal({ctx,env,control:{plan:p,planHash:c.planHash,controlHash:c.controlHash},sourceRevision:p.canaryContainment.sourceRevision,now:f.now});
 assert.deepEqual(Object.keys(journal),['seal','read']);
 assert.equal((await journal.read()).sealed,false);
 const result=await journal.seal();assert.equal(result.status,'sealed');
 assert.equal((await journal.read()).sealHash,result.sealHash);
 assert.equal((await journal.seal()).status,'reconcile_only');assert.equal(f.puts,1);
 f.setNow(p.C1);await assert.rejects(journal.read());assert.equal(f.puts,1);
});

test('native QA proof reads require completed reduction and the original outstanding challenge',async()=>{
 const {f,p,c,guardPrefix,allow}=fixture(),get=read();
 const planRefs={intentId:p.intentId,planHash:c.planHash},proofChallenge='a'.repeat(64);
 const options={ctx:f.ctx,env:f.env,compiledRevision:p.source.revision,now:f.now};
 const readiness=()=>get({...options,refs:{...planRefs,operation:'proofReadiness'}});
 const capture=(challenge=proofChallenge)=>get({...options,refs:{...planRefs,operation:'proofCapture',proofChallenge:challenge}});
 for(const kind of ['withdraw','close','seal'])allow(kind);
 await assert.rejects(readiness());
 for(const kind of ['withdraw','close','seal']){
  const key=guardPrefix+kind;f.rows.set(key,{...f.rows.get(key),phase:'complete',receipt:{completed:true},completedAt:f.now()});
 }
 assert.equal((await readiness()).control.planHash,c.planHash);
 await assert.rejects(capture());
 const prefix='afw.qa-finite-cleanup.v1:'+p.intentId+':',issuedAt=f.now();
 f.rows.set(prefix+'capture',{purpose:prefix+'capture',controlHash:c.controlHash,challenge:proofChallenge,issuedAt});
 await assert.rejects(readiness());await assert.rejects(capture('b'.repeat(64)));
 assert.equal((await capture()).control.controlHash,c.controlHash);
 f.rows.set(prefix+'proof',{});
 await assert.rejects(capture());assert.equal(f.puts,0);
});

test('native QA reads only the authorized application inventory with the private reader',async t=>{
 const {readPrivateQaFiniteProofInventory}=await import('../lib/mcp-qa-finite-proof-inventory.mjs');
 const {f,p,c,guardPrefix,allow}=fixture();
 f.env.AFW_MCP_CLOSURE_READ_TOKEN='fixture-read-only-token';
 const fetch=globalThis.fetch,requests=[];
 t.after(()=>{globalThis.fetch=fetch;});
 globalThis.fetch=async(url,options)=>{
  requests.push({url,method:options.method});
  assert.equal(options.headers.Authorization,'Bearer fixture-read-only-token');
  assert.equal(options.redirect,'manual');
  return Response.json({success:true,errors:[],result:[],result_info:{per_page:100}});
 };
 const refs={intentId:p.intentId,planHash:c.planHash,operation:'proofReadiness'};
 const call=(request=refs)=>readPrivateQaFiniteProofInventory({ctx:f.ctx,env:f.env,compiledRevision:p.source.revision,now:f.now,refs:request});
 await assert.rejects(call());assert.equal(requests.length,0);
 for(const kind of ['withdraw','close','seal']){
  allow(kind);const key=guardPrefix+kind;
  f.rows.set(key,{...f.rows.get(key),phase:'complete',receipt:{completed:true},completedAt:f.now()});
 }
 const value=await call();
 assert.deepEqual(value,{purpose:'afw.finite-provider-inventory.v1',applicationId:p.resources.applicationId,observedAt:f.now(),instances:[],totalCount:0});
 assert.equal(requests.length,1);assert.equal(requests[0].method,'GET');
 assert.equal(new URL(requests[0].url).pathname.endsWith('/containers/applications/'+p.resources.applicationId+'/instances-v2'),true);
 await assert.rejects(call({...refs,operation:'seal'}));
 await assert.rejects(call({...refs,applicationId:'other'}));
 assert.equal(requests.length,1);assert.equal(f.puts,0);
});
