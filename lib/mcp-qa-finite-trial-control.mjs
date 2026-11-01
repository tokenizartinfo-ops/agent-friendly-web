import {createHash} from 'node:crypto';
import {PRIVATE_QA_CLOSED_FLAGS} from './mcp-qa-closed-context.mjs';
import {parseCanaryRestorationPolicy} from './mcp-canary-restoration-policy.mjs';

const ROOT='afw.qa-finite-trial.v1',HEAD=ROOT+':head',SLOT='afw-own-successor-closure-v1';
const LEGACY='afw.canary-restoration-control.v1';
const LEGACY_KEYS=[LEGACY,'afw.private-prepared-dispatch.v1','afw.private-reduction-dispatch.v1','afw.successor-canary-restoration.v1','afw.successor-retirement-handoff.v1'];
const RELEASE_FLAGS=['AFW_RELEASE_OPERATOR_ENABLED','AFW_RELEASE_WORKFLOW_ENABLED','AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED','AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED'];
const FACTS=['subscription','process','saved_event'];
const EFFECTS=['nominal','withdraw','close','seal','canary_restore','qa_restore'];
const pins=new WeakMap();
const fail=()=>{throw Error('Private finite trial unavailable');};
const hash=s=>createHash('sha256').update(s).digest('hex');
const digest=(domain,value)=>hash(domain+'\n'+JSON.stringify(value));
const hex=(v,n=64)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const id=v=>typeof v==='string'&&/^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/.test(v);
const number=v=>Number.isSafeInteger(v)&&v>0;
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
function data(v,k){if(!v||typeof v!=='object')fail();const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();return d.value;}
function fields(v,keys){
 if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();
 return Object.freeze(Object.fromEntries(keys.map(k=>[k,data(v,k)])));
}
function literal(v,depth=0,budget={nodes:0,bytes:0}){
 if(++budget.nodes>4096||depth>16)fail();
 if(v===null||typeof v==='boolean'||typeof v==='number'&&Number.isFinite(v))return v;
 if(typeof v==='string'){budget.bytes+=Buffer.byteLength(v);if(budget.bytes>49152)fail();return v;}
 if(!v||typeof v!=='object'||Object.getPrototypeOf(v)!==(Array.isArray(v)?Array.prototype:Object.prototype))fail();
 const out=Array.isArray(v)?[]:{};
 for(const k of Reflect.ownKeys(v)){if(Array.isArray(v)&&k==='length')continue;if(typeof k!=='string'||['__proto__','constructor','toJSON'].includes(k))fail();out[k]=literal(data(v,k),depth+1,budget);}
 if(Array.isArray(v)&&(out.length!==v.length||Object.keys(out).length!==out.length))fail();
 return Object.freeze(out);
}
function json(raw,max=49152){
 if(typeof raw!=='string'||Buffer.byteLength(raw)>max)fail();const v=JSON.parse(raw);if(JSON.stringify(v)!==raw)fail();return literal(v);
}
function method(v,key){
 for(let p=v,n=0;p&&n<32;p=Object.getPrototypeOf(p),n++){
  const d=Object.getOwnPropertyDescriptor(p,key);if(d){if(!Object.hasOwn(d,'value')||typeof d.value!=='function')fail();return d.value;}
 }
 fail();
}
function legacy(plan,at){
 const p=plan.legacy,c=fields(json(p.control),['purpose','planHash','policy','armedAt','withdrawnAt']),policy=parseCanaryRestorationPolicy(c.policy);
 if(c.armedAt<policy.startAt-600000||c.armedAt>=policy.expiresAt||c.purpose!==LEGACY||hash(JSON.stringify(c))!==p.controlHash||hash(c.policy)!==c.planHash||!time(c.armedAt)||!time(c.withdrawnAt)||c.withdrawnAt<c.armedAt||c.withdrawnAt>at||policy.expiresAt>at)fail();
 const prepared=fields(json(p.preparedDispatch),['purpose','planHash','withdrawalHash','phase','issuedAt','completedAt','dispatchPolicyHash']);
 const reduced=fields(json(p.reductionDispatch),['purpose','planHash','withdrawalHash','phase','issuedAt','completedAt']);
 if(prepared.purpose!==LEGACY_KEYS[1]||reduced.purpose!==LEGACY_KEYS[2]||prepared.phase!=='issued'||prepared.completedAt!==null||reduced.phase!=='complete'||!time(reduced.completedAt)||reduced.completedAt<reduced.issuedAt||reduced.completedAt>at||reduced.completedAt>=policy.expiresAt||hash(JSON.stringify(prepared))!==p.preparedDispatchHash||hash(JSON.stringify(reduced))!==p.reductionDispatchHash)fail();
 for(const j of [prepared,reduced])if(j.planHash!==c.planHash||!hex(j.withdrawalHash)||!time(j.issuedAt)||j.issuedAt<c.armedAt||j.issuedAt>=policy.expiresAt||j.issuedAt>at)fail();
 if(prepared.withdrawalHash!==reduced.withdrawalHash||!hex(prepared.dispatchPolicyHash)||p.restoration!==null||p.retirement!==null)fail();
 return [c,prepared,reduced,undefined,undefined];
}
function parsePlan(raw){
 const p=fields(json(raw),['purpose','intentId','command','source','trialId','grantHash','monitorHash','eventPlanHash','bundleHash','T0','N1','C0','C1','R1','resources','deployments','canaryContainment','selectors','withdrawalPolicyHash','closePolicyHash','workflows','finalizer','legacy']);
 if(p.purpose!=='afw.qa-finite-trial-plan.v1'||!id(p.intentId)||['trialId','grantHash','monitorHash','eventPlanHash','bundleHash','withdrawalPolicyHash','closePolicyHash'].some(k=>!hex(p[k])))fail();
 const command=fields(p.command,['kind','id','createdAt','repository','sourceRevision']);
 const source=fields(p.source,['revision','tree','moduleHash','profileHash','bindingsHash']);
 if(command.kind!=='finite_native_confirmation'||!id(command.id)||command.repository!=='tokenizartinfo-ops/agent-friendly-web'||command.createdAt!==p.T0||command.sourceRevision!==source.revision||!hex(source.revision,40)||!hex(source.tree,40)||['moduleHash','profileHash','bindingsHash'].some(k=>!hex(source[k])))fail();
 if(['T0','N1','C0','C1','R1'].some(k=>!time(p[k]))||p.N1!==p.T0+300000||p.C0!==p.N1-60000||p.C1!==p.N1+120000||p.R1!==p.N1+180000)fail();
 const resources=fields(p.resources,['actorId','containerId','applicationId','namespaceId','qaD1Id','releaseD1Id','canaryActorId']);
 if(['actorId','containerId','canaryActorId'].some(k=>!hex(resources[k]))||!hex(resources.namespaceId,32)||['applicationId','qaD1Id','releaseD1Id'].some(k=>!uuid(resources[k]))||resources.qaD1Id===resources.releaseD1Id)fail();
 const deployments=fields(p.deployments,['qaLive','qaClosed','canaryLive','canaryClosed','operatorClosed']);
 for(const d of Object.values(deployments)){fields(d,['versionId','deploymentId','configurationHash']);if(!uuid(d.versionId)||!uuid(d.deploymentId)||!hex(d.configurationHash))fail();}
 if(deployments.qaLive.versionId===deployments.qaClosed.versionId||deployments.canaryLive.versionId===deployments.canaryClosed.versionId)fail();
 const canaryContainment=fields(p.canaryContainment,['sourceRevision','runtimeVersionId','moduleHash','profileHash','bindingsHash']);
 if(!hex(canaryContainment.sourceRevision,40)||canaryContainment.runtimeVersionId!==deployments.canaryLive.versionId||['moduleHash','profileHash','bindingsHash'].some(k=>!hex(canaryContainment[k])))fail();
 const selectors=fields(p.selectors,['grantId','subject','projectId','clientId','resource','consentHash','programHash','sourceRevision','startAt','expiresAt','saveIdempotencyKey','expectedProjectRevision','goal']);
 if(['grantId','subject','projectId','clientId'].some(k=>!id(selectors[k]))||typeof selectors.resource!=='string'||selectors.resource.length>256||!/^https:\/\/[A-Za-z0-9./_-]+$/.test(selectors.resource)||!hex(selectors.consentHash)||!hex(selectors.programHash)||!hex(selectors.sourceRevision,40)||!time(selectors.startAt)||!time(selectors.expiresAt)||selectors.startAt>p.T0||selectors.expiresAt<=p.T0||selectors.expiresAt-selectors.startAt>600000||!uuid(selectors.saveIdempotencyKey)||!number(selectors.expectedProjectRevision)||selectors.expectedProjectRevision>=Number.MAX_SAFE_INTEGER||!['discovery','content'].includes(selectors.goal)||hash(selectors.grantId)!==p.grantHash)fail();
 const workflows=fields(p.workflows,['confirmation','bootstrap','nominalRunId']);
 if(workflows.confirmation!=='afw-release-'+p.bundleHash||!id(workflows.bootstrap)||!number(workflows.nominalRunId))fail();
 const finalizer=fields(p.finalizer,['repository','runId','attempt','jobId','workflow','sourceRevision','readyStep']);
 if(finalizer.repository!==command.repository||!number(finalizer.runId)||finalizer.runId===workflows.nominalRunId||finalizer.attempt!==1||!number(finalizer.jobId)||finalizer.workflow!=='afw-finite-finalizer'||finalizer.sourceRevision!==source.revision||finalizer.readyStep!=='admit-and-ready')fail();
 const previous=fields(p.legacy,['control','controlHash','preparedDispatch','preparedDispatchHash','reductionDispatch','reductionDispatchHash','restoration','retirement','sourceRevision','sourceHash']);
 if(['controlHash','preparedDispatchHash','reductionDispatchHash','sourceHash'].some(k=>!hex(previous[k]))||!hex(previous.sourceRevision,40))fail();
 const result=literal({...p,command,source,resources,deployments,canaryContainment,selectors,workflows,finalizer,legacy:previous});legacy(result,p.T0);
 if(JSON.stringify(result)!==raw)fail();return result;
}

/** PRIVATE constructor-only coherence pin. Call ONLY from the native DO with its
 * actual ctx/env and compiled revision. Branding prevents DTO impersonation; it
 * does not establish binding class/resource provenance. The fixed primary producer
 * must independently correlate deployed module, bindings and profile. Reads no
 * custody value and never freezes/clones env. This module is not mounted as RPC. */
export function createPrivateQaFiniteTrialNativePin(options){
 const keys=['ctx','env','sourceRevision'],o=fields(options,keys),{ctx,env,sourceRevision}=o;
 if(!hex(sourceRevision,40)||!ctx||!ctx.storage||!ctx.id)fail();
 const storage=ctx.storage,actor=ctx.id,actorString=method(actor,'toString');
 const ns=data(env,'AFW_INDEPENDENT_CLOSURE'),idFromName=method(ns,'idFromName');
 const metadata=data(env,'AFW_QA_VERSION'),version=data(metadata,'id');
 const releaseDb=data(env,'RELEASE_DB'),node=data(env,'AFW_RELEASE_EVENTS_NODE');
 if(!uuid(version)||!releaseDb||!node)fail();
 const actorId=Reflect.apply(actorString,actor,[]),expected=Reflect.apply(idFromName,ns,[SLOT]);
 if(!hex(actorId)||Reflect.apply(method(expected,'toString'),expected,[])!==actorId)fail();
 let invalid=false;
 const check=()=>{
  try{
   if(invalid)fail();const c=fields(options,keys);if(keys.some(k=>c[k]!==o[k])||ctx.storage!==storage||ctx.id!==actor||method(actor,'toString')!==actorString||Reflect.apply(actorString,actor,[])!==actorId||data(env,'AFW_INDEPENDENT_CLOSURE')!==ns||method(ns,'idFromName')!==idFromName||data(env,'AFW_QA_VERSION')!==metadata||data(metadata,'id')!==version||data(env,'RELEASE_DB')!==releaseDb||data(env,'AFW_RELEASE_EVENTS_NODE')!==node||RELEASE_FLAGS.some(k=>data(env,k)!=='true')||PRIVATE_QA_CLOSED_FLAGS.some(k=>data(env,k)!=='false'))fail();
   const expectedNow=Reflect.apply(idFromName,ns,[SLOT]);if(Reflect.apply(method(expectedNow,'toString'),expectedNow,[])!==actorId)fail();
  }catch{invalid=true;fail();}
 };
 check();const token=Object.freeze({});pins.set(token,{storage,check,snapshot:Object.freeze({actorId,runtimeVersionId:version,sourceRevision})});return token;
}
function observation(status,details={}){
 return Object.freeze({purpose:'afw.qa-finite-trial-result.v1',status,...details,authorizesEffects:false,guardLivenessVerified:false,operationalReadiness:false,mayRetry:false});
}
/** INTERNAL unmounted control. All producer methods are trusted fixed capabilities,
 * never public RPC parameters. Task2/4 must install concrete source-qualified
 * primary producers; this validator does not fabricate their evidence.
 * prepare is one attempt; pending/unknown permits cleanup but never nominal work.
 * Nominal claims also require the SAME instance's acknowledged prepare. Restart /
 * hibernation deliberately loses this eligibility, never restarts the command.
 * Returned claims are journal facts, not a substitute for the caller's native
 * authorization and per-effect primary check immediately before its single send. */
export function createPrivateQaFiniteTrialControl(options){
 const keys=['storage','nativePin','plan','readPrimary','now','timeoutMs'],o=fields(options,keys);
 const {storage,nativePin,plan:raw,readPrimary,now,timeoutMs}=o,p=parsePlan(raw),pin=pins.get(nativePin);
 if(!pin||pin.storage!==storage||typeof now!=='function'||!number(timeoutMs)||timeoutMs>5000)fail();
 const primaryKeys=['admission','finalizer','subscription','process','savedEvent','effect'],primary=fields(readPrimary,primaryKeys);
 if(primaryKeys.some(k=>typeof primary[k]!=='function'))fail();
 const storageKeys=['transaction','get','getAlarm'],methods=Object.fromEntries(storageKeys.map(k=>[k,method(storage,k)]));
 const planHash=digest(p.purpose,p),selectorsHash=digest('afw.qa-finite-selectors.v1',p.selectors),prefix=ROOT+':'+p.intentId+':';
 const info=literal({purpose:ROOT+':info',intentId:p.intentId,planHash,plan:raw,native:pin.snapshot});
 const controlHash=digest(ROOT+':control-hash',info);
 const expectedLegacy=legacy(p,p.T0);
 if(pin.snapshot.actorId!==p.resources.actorId||pin.snapshot.runtimeVersionId!==p.deployments.qaLive.versionId||pin.snapshot.sourceRevision!==p.source.revision)fail();
 let invalid=false,lastGlobal=-1,acknowledgedPrepare=false;
 const coherent=()=>{
  try{
   if(invalid)fail();pin.check();const c=fields(options,keys);if(keys.some(k=>c[k]!==o[k])||storageKeys.some(k=>method(storage,k)!==methods[k]))fail();
   const next=fields(readPrimary,primaryKeys);if(primaryKeys.some(k=>next[k]!==primary[k]))fail();
  }catch{invalid=true;fail();}
 };
 coherent();
 function identity(v){
  if(v.intentId!==p.intentId||v.planHash!==planHash||v.sourceRevision!==p.source.revision||v.runtimeVersionId!==pin.snapshot.runtimeVersionId||v.actorId!==p.resources.actorId)fail();
 }
 function fresh(at,current){if(!time(at)||at<p.T0||at>current||current-at>5000)fail();}
 function admission(value,at){
  const v=fields(literal(value),['purpose','intentId','sourceRevision','runtimeVersionId','actorId','planHash','observedAt','command','source','resources','deployments','legacyControlHash','legacyPreparedHash','legacyReductionHash','legacySourceHash','retainedUncertainty','containment','quiescence','consent']);
  identity(v);fresh(v.observedAt,at);
  if(v.purpose!=='afw.qa-finite-primary.v1'||!same(v.command,p.command)||!same(v.source,p.source)||!same(v.resources,p.resources)||!same(v.deployments,p.deployments)||v.legacyControlHash!==p.legacy.controlHash||v.legacyPreparedHash!==p.legacy.preparedDispatchHash||v.legacyReductionHash!==p.legacy.reductionDispatchHash||v.legacySourceHash!==p.legacy.sourceHash||v.retainedUncertainty!==true)fail();
  const c=fields(v.containment,['entrypoint','finiteEntrypoint','sourceRevision','runtimeVersionId','sourceHash','profileHash','bindingsHash','denyBeforeAccess','enteredWritersIsolated','signedPacketsFenced','separateLegacyWritersTerminal','legacyGrantRevoked','legacyMonitorExpired','evidenceHash']);
  if(c.entrypoint!=='legacy_saved_event'||c.finiteEntrypoint!=='finite_trial_event'||c.sourceRevision!==p.canaryContainment.sourceRevision||c.runtimeVersionId!==p.canaryContainment.runtimeVersionId||c.sourceHash!==p.canaryContainment.moduleHash||c.profileHash!==p.canaryContainment.profileHash||c.bindingsHash!==p.canaryContainment.bindingsHash||['denyBeforeAccess','enteredWritersIsolated','signedPacketsFenced','separateLegacyWritersTerminal','legacyGrantRevoked','legacyMonitorExpired'].some(k=>c[k]!==true)||!hex(c.evidenceHash))fail();
  const q=fields(v.quiescence,['currentWriters','newScopeWriters','unresolvedWrites','completeInventory','inventoryHash','receiptsHash','snapshotHash']);
  if(q.currentWriters!==0||q.newScopeWriters!==0||q.unresolvedWrites!==0||q.completeInventory!==true||['inventoryHash','receiptsHash','snapshotHash'].some(k=>!hex(q[k])))fail();
  const cns=fields(v.consent,['grantHash','monitorHash','selectorsHash','valid','expiresAt']);
  if(cns.grantHash!==p.grantHash||cns.monitorHash!==p.monitorHash||cns.selectorsHash!==selectorsHash||typeof cns.valid!=='boolean'||!time(cns.expiresAt)||cns.expiresAt>p.selectors.expiresAt)fail();
  return v;
 }
 function ready(value,at){
  const v=fields(literal(value),['purpose','intentId','sourceRevision','runtimeVersionId','actorId','planHash','observedAt','repository','runId','attempt','workflow','status','job','admission','evidenceHash']);
  identity(v);fresh(v.observedAt,at);
  if(v.purpose!=='afw.qa-finite-finalizer-ready.v1'||['repository','runId','attempt','workflow','sourceRevision'].some(k=>v[k]!==p.finalizer[k])||v.status!=='in_progress'||!hex(v.evidenceHash))fail();
  const j=fields(v.job,['id','status','startedAt','steps']);if(j.id!==p.finalizer.jobId||j.status!=='in_progress'||!time(j.startedAt)||j.startedAt<p.T0||j.startedAt>at||!Array.isArray(j.steps)||j.steps.length!==1)fail();
  const step=fields(j.steps[0],['name','status','conclusion','startedAt','completedAt']);
  if(step.name!==p.finalizer.readyStep||step.status!=='completed'||step.conclusion!=='success'||!time(step.startedAt)||!time(step.completedAt)||step.startedAt<j.startedAt||step.completedAt<step.startedAt||step.completedAt>at)fail();
  const a=fields(v.admission,['commandId','controlPlanHash','R1','resourceHash','custodyHash','validatedAt']);
  if(a.commandId!==p.command.id||a.controlPlanHash!==planHash||a.R1!==p.R1||a.resourceHash!==digest('afw.qa-finite-resources.v1',p.resources)||!hex(a.custodyHash)||!time(a.validatedAt)||a.validatedAt<step.startedAt||a.validatedAt>step.completedAt||at>=p.R1)fail();
  return v;
 }
 function fact(value,kind,at){
  const common=['purpose','intentId','sourceRevision','runtimeVersionId','actorId','planHash','selectorsHash','observedAt','candidates'];
  const extra=kind==='subscription'?['subscriptionId','processGeneration','expiresAt','receiptHash']:kind==='process'?['processGeneration','manifestHash','receiptHash']:['eventId','revision','fingerprint','subscriptionReceiptHash','processReceiptHash','receiptHash'];
  const v=fields(literal(value),[...common,...extra]);identity(v);fresh(v.observedAt,at);
  if(v.purpose!=='afw.qa-finite-'+kind+'.v1'||v.selectorsHash!==selectorsHash||v.candidates!==1||!hex(v.receiptHash))fail();
  if(kind==='subscription'&&(!id(v.subscriptionId)||!id(v.processGeneration)||!time(v.expiresAt)||v.expiresAt<=at||v.expiresAt>Math.min(p.N1,p.selectors.expiresAt)))fail();
  if(kind==='process'&&(!id(v.processGeneration)||!hex(v.manifestHash)))fail();
  if(kind==='saved_event'){
   const event=hash(JSON.stringify(['afw.own-synthetic-save.v1',p.selectors.subject,p.selectors.projectId,p.selectors.saveIdempotencyKey]));
   const fingerprint=hash(JSON.stringify(['afw.own-synthetic-save.v1',p.selectors.grantId,p.selectors.expectedProjectRevision,p.selectors.goal]));
   if(v.eventId!==event||v.revision!==p.selectors.expectedProjectRevision+1||v.fingerprint!==fingerprint||!hex(v.subscriptionReceiptHash)||!hex(v.processReceiptHash))fail();
  }
  // Observation time is evidence freshness, not identity of the immutable fact.
  return literal(Object.fromEntries(Object.entries(v).filter(([k])=>k!=='observedAt')));
 }
 function factRecord(v,kind){
  const r=fields(v,['purpose','intentId','controlHash','kind','factHash','observedAt','fact']);
  if(!same(fact({...r.fact,observedAt:r.observedAt},kind,r.observedAt),r.fact))fail();
  if(r.purpose!==ROOT+':fact'||r.intentId!==p.intentId||r.controlHash!==controlHash||r.kind!==kind||!time(r.observedAt)||r.observedAt<p.T0||r.observedAt>=p.N1||r.factHash!==digest(ROOT+':fact:'+kind,r.fact))fail();
  return r;
 }
 async function invoke(operation,args){
  if(!(['capture','claim','reconcile'].includes(operation)?args.length===1:args.length===0))return observation('blocked');
  const kind=args[0];if(operation==='capture'&&!FACTS.includes(kind)||['claim','reconcile'].includes(operation)&&!EFFECTS.includes(kind))return observation('blocked');
  let issued=false,finished=false,timer,lastWall,lastMono,nominalRequired=false,nominalEnd=Math.min(p.N1,p.selectors.expiresAt);const enteredMono=performance.now();
  const current=()=>{
   coherent();const at=now(),mono=performance.now();
   if(at<lastGlobal||at<lastWall||mono<lastMono){invalid=true;fail();}
   if(nominalRequired&&(at>=nominalEnd||operation==='prepare'&&p.N1-at<180000))fail();
   if(finished||!time(at)||at<p.T0||at<lastGlobal||at<lastWall||at>=lastWallStart+timeoutMs||!Number.isFinite(mono)||mono<lastMono||mono-enteredMono>=timeoutMs)fail();
   lastGlobal=at;lastWall=at;lastMono=mono;return at;
  };
  let lastWallStart;
  const work=async()=>{
   try{
    coherent();lastWallStart=now();lastWall=lastWallStart;lastMono=enteredMono;current();
    const bounded=async fn=>{current();const v=await fn();current();return v;};
    const readPrimaryFixed=name=>bounded(()=>Reflect.apply(primary[name],readPrimary,[]));
    const nominalWindow=()=>{nominalRequired=true;return current();};
    const armWindow=()=>{const at=nominalWindow();if(p.N1-at<180000)fail();return at;};
    const checkConsent=v=>{nominalEnd=Math.min(nominalEnd,v.consent.expiresAt);if(v.consent.valid!==true)fail();nominalWindow();};
    const tx=async fn=>bounded(()=>Reflect.apply(methods.transaction,storage,[async t=>{
     const ks=['get','put','list','setAlarm'],m=Object.fromEntries(ks.map(k=>[k,method(t,k)]));
     const check=()=>{current();if(ks.some(k=>method(t,k)!==m[k]))fail();};
     const get=async k=>{check();const v=await Reflect.apply(m.get,t,[k]);check();return v;};
     const put=async(k,v)=>{check();issued=true;await Reflect.apply(m.put,t,[k,v]);check();};
     const list=async pre=>{check();const v=await Reflect.apply(m.list,t,[{prefix:pre,limit:65}]);check();if(!(v instanceof Map)||v.size>64)fail();return v;};
     const state=async()=>{
      for(let i=0;i<LEGACY_KEYS.length;i++)if(!same(await get(LEGACY_KEYS[i]),expectedLegacy[i]))fail();
      if((await list('afw.qa-generation-')).size)fail();
      const rows=await list(ROOT+':'),head=rows.get(HEAD);
      if(head===undefined){if(rows.size)fail();return null;}
      if(!same(head,{purpose:HEAD,intentId:p.intentId,controlHash,planHash})||!same(rows.get(prefix+'info'),info))fail();
      const allowed=new Set([HEAD,prefix+'info',prefix+'control',prefix+'ready',...FACTS.flatMap(k=>[prefix+'fact:'+k,prefix+'capture:'+k]),...EFFECTS.map(k=>prefix+'effect:'+k)]);
      for(const key of rows.keys())if(!allowed.has(key))fail();
      const c=fields(rows.get(prefix+'control'),['purpose','controlHash','phase','pendingAt','armedAt','withdrawnAt']);
      if(c.purpose!==ROOT+':control'||c.controlHash!==controlHash||!['pending','armed'].includes(c.phase)||!time(c.pendingAt)||c.pendingAt<p.T0||p.N1-c.pendingAt<180000||c.pendingAt>current()||c.armedAt!==null&&(!time(c.armedAt)||c.armedAt<c.pendingAt||p.N1-c.armedAt<180000||c.armedAt>current())||c.phase==='pending'&&c.armedAt!==null||c.phase==='armed'&&c.armedAt===null||c.withdrawnAt!==null&&(!time(c.withdrawnAt)||c.withdrawnAt<c.pendingAt||c.withdrawnAt>current()))fail();
      if(c.phase==='armed'){const evidence=rows.get(prefix+'ready');if(!evidence||evidence.controlHash!==controlHash||evidence.hash!==digest(ROOT+':ready',evidence.value))fail();ready(evidence.value,c.armedAt);}
      const facts={};
      for(const k of FACTS){const v=rows.get(prefix+'fact:'+k);if(v!==undefined){facts[k]=factRecord(v,k);const claim=rows.get(prefix+'capture:'+k);if(!same(claim,{controlHash,kind:k,factHash:facts[k].factHash,phase:'issued'}))fail();}}
      for(const k of FACTS){
       const attempt=rows.get(prefix+'capture:'+k);
       if(attempt!==undefined){fields(attempt,['controlHash','kind','factHash','phase']);if(attempt.controlHash!==controlHash||attempt.kind!==k||!hex(attempt.factHash)||attempt.phase!=='issued')fail();}
      }
      for(const k of EFFECTS){
       const e=rows.get(prefix+'effect:'+k);if(e===undefined)continue;
       fields(e,['purpose','intentId','controlHash','kind','phase','issuedAt','deadline','proofHash']);
       const deadline=k==='nominal'?e.deadline:k==='qa_restore'?p.R1:p.C1;
       if(!time(deadline)||k==='nominal'&&deadline>Math.min(p.N1,p.selectors.expiresAt))fail();
       if(e.purpose!==ROOT+':effect'||e.intentId!==p.intentId||e.controlHash!==controlHash||e.kind!==k||e.phase!=='issued'||!time(e.issuedAt)||e.issuedAt<c.pendingAt||e.issuedAt>=deadline||e.issuedAt>current()||e.deadline!==deadline||(['canary_restore','qa_restore'].includes(k)?!hex(e.proofHash):e.proofHash!==null))fail();
      }
      const canary=rows.get(prefix+'effect:canary_restore'),qa=rows.get(prefix+'effect:qa_restore');
      if(canary&&qa&&canary.proofHash!==qa.proofHash)fail();
      return {rows,control:c,facts};
     };
     return fn({get,put,state,setAlarm:async at=>{check();issued=true;await Reflect.apply(m.setAlarm,t,[at]);check();}});
    }]));
    const readState=()=>tx(async({state})=>state());
    const details=s=>({intentId:p.intentId,controlHash,planHash,phase:s.control.phase,withdrawnAt:s.control.withdrawnAt,T0:p.T0,N1:p.N1,C0:p.C0,C1:p.C1,R1:p.R1});
    if(operation==='prepare'){
     armWindow();const a=admission(await readPrimaryFixed('admission'),armWindow());checkConsent(a);const f=ready(await readPrimaryFixed('finalizer'),armWindow());
     await tx(async({state,put,setAlarm})=>{
      armWindow();if(await state())fail();armWindow();
      await put(prefix+'info',info);await put(prefix+'control',{purpose:ROOT+':control',controlHash,phase:'pending',pendingAt:armWindow(),armedAt:null,withdrawnAt:null});
      await put(HEAD,{purpose:HEAD,intentId:p.intentId,controlHash,planHash});await setAlarm(p.C0);
     });
     // Independent readback, not the transaction's returned objects.
     const stored=await bounded(()=>Reflect.apply(methods.get,storage,[prefix+'info']));
     if(!same(stored,info)||await bounded(()=>Reflect.apply(methods.getAlarm,storage,[]))!==p.C0)fail();
     const again=admission(await readPrimaryFixed('admission'),armWindow());checkConsent(again);
     const final=ready(await readPrimaryFixed('finalizer'),armWindow());if(!same(f.admission,final.admission))fail();
     const s=await tx(async({state,put})=>{
      armWindow();const s=await state();if(!s||s.control.phase!=='pending'||s.control.withdrawnAt!==null||s.rows.has(prefix+'ready'))fail();
      armWindow();const c={...s.control,phase:'armed',armedAt:armWindow()};
      await put(prefix+'ready',{controlHash,hash:digest(ROOT+':ready',final),value:final});await put(prefix+'control',c);return {...s,control:c};
     });armWindow();return observation('armed',details(s));
    }
    if(operation==='read'){
     const s=await readState();if(!s)return observation('absent');let nominalEligible=false;
     if(acknowledgedPrepare&&s.control.phase==='armed'&&s.control.withdrawnAt===null&&!s.rows.has(prefix+'effect:nominal')&&current()<Math.min(p.N1,p.selectors.expiresAt)){
      const a=admission(await readPrimaryFixed('admission'),current());ready(await readPrimaryFixed('finalizer'),current());checkConsent(a);nominalEligible=true;
     }
     return observation('observed',{...details(s),nominalEligible,facts:literal(s.facts)});
    }
    if(operation==='withdraw'){
     const s=await tx(async({state,put})=>{const s=await state();if(!s)fail();if(s.control.withdrawnAt!==null)return s;
      if(current()>=p.R1)fail();const c={...s.control,withdrawnAt:current()};await put(prefix+'control',c);return {...s,control:c};});
     return observation('withdrawn',details(s));
    }
    if(operation==='capture'){
     nominalWindow();const a=admission(await readPrimaryFixed('admission'),current());checkConsent(a);
     const value=await readPrimaryFixed(kind==='saved_event'?'savedEvent':kind);nominalWindow();
     if(value===null)return observation('not_yet_observed');
     const observedAt=current(),actual=fact(value,kind,observedAt);
     const correlate=async()=>{
      if(kind==='subscription')return {};
      const sv=await readPrimaryFixed('subscription');if(sv===null)fail();
      const subscription=fact(sv,'subscription',nominalWindow());let process=null;
      if(kind==='saved_event'){const pv=await readPrimaryFixed('process');if(pv===null)fail();process=fact(pv,'process',nominalWindow());if(subscription.processGeneration!==process.processGeneration)fail();}
      return {subscription,process};
     };
     const related=await correlate(),factHash=digest(ROOT+':fact:'+kind,actual);
     const record=literal({purpose:ROOT+':fact',intentId:p.intentId,controlHash,kind,factHash,observedAt,fact:actual});
     const first=await tx(async({state,put})=>{
      nominalWindow();const s=await state();if(!s||s.control.phase!=='armed'||s.control.withdrawnAt!==null)fail();
      if(kind!=='subscription'&&(!s.facts.subscription||!same(s.facts.subscription.fact,related.subscription)))fail();
      if(kind==='process'&&s.facts.subscription.fact.processGeneration!==actual.processGeneration)fail();
      if(kind==='saved_event'&&(!s.facts.subscription||!s.facts.process||!same(s.facts.process.fact,related.process)||actual.subscriptionReceiptHash!==s.facts.subscription.fact.receiptHash||actual.processReceiptHash!==s.facts.process.fact.receiptHash))fail();
      const previous=s.facts[kind];if(previous){if(previous.factHash!==factHash||!same(previous.fact,actual))fail();return 'observed';}
      const claim=s.rows.get(prefix+'capture:'+kind);if(claim!==undefined){if(!same(claim,{controlHash,kind,factHash,phase:'issued'}))fail();return 'reconcile_only';}
      await put(prefix+'capture:'+kind,{controlHash,kind,factHash,phase:'issued'});return 'new';
     });
     if(first!=='new')return observation(first,{controlHash,kind,factHash});
     const again=await readPrimaryFixed(kind==='saved_event'?'savedEvent':kind);
     if(again===null||!same(fact(again,kind,nominalWindow()),actual)||!same(await correlate(),related))fail();
     await tx(async({state,put})=>{
      nominalWindow();const s=await state();if(!s||s.control.withdrawnAt!==null||s.facts[kind]||!same(s.rows.get(prefix+'capture:'+kind),{controlHash,kind,factHash,phase:'issued'}))fail();
      await put(prefix+'fact:'+kind,record);
     });return observation('captured',{controlHash,kind,factHash});
    }
    if(operation==='claim'){
     let proofHash=null;
     if(kind==='nominal'){
      const a=admission(await readPrimaryFixed('admission'),nominalWindow());checkConsent(a);ready(await readPrimaryFixed('finalizer'),current());
     }else if(['canary_restore','qa_restore'].includes(kind)){
      // Task2/3 trusted producers supply retained validated proof correlation;
      // arbitrary caller evidence is never accepted here.
      const e=await bounded(()=>Reflect.apply(primary.effect,readPrimary,[kind]));
      const v=fields(literal(e),['purpose','intentId','controlHash','kind','proofHash','observedAt','eligible','evidenceHash']);
      if(v.purpose!=='afw.qa-finite-effect-eligibility.v1'||v.intentId!==p.intentId||v.controlHash!==controlHash||v.kind!==kind||!hex(v.proofHash)||v.eligible!==true||!hex(v.evidenceHash))fail();fresh(v.observedAt,current());proofHash=v.proofHash;
     }
     const s=await tx(async({state,put})=>{
      const s=await state();if(!s)fail();const previous=s.rows.get(prefix+'effect:'+kind);
      if(previous!==undefined)return {s,previous};
      if(kind==='nominal'&&(!acknowledgedPrepare||s.control.phase!=='armed'||s.control.withdrawnAt!==null))fail();
      const deadline=kind==='nominal'?nominalEnd:kind==='qa_restore'?p.R1:p.C1;if(current()>=deadline)fail();
      if(proofHash){const other=s.rows.get(prefix+'effect:'+(kind==='canary_restore'?'qa_restore':'canary_restore'));if(other&&other.proofHash!==proofHash)fail();}
      const claim=literal({purpose:ROOT+':effect',intentId:p.intentId,controlHash,kind,phase:'issued',issuedAt:current(),deadline,proofHash});
      await put(prefix+'effect:'+kind,claim);return {s,claim};
     });
     return observation(s.previous?'reconcile_only':'issued',{...details(s.s),kind,claim:s.previous??s.claim});
    }
    const s=await readState();if(!s)fail();const claim=s.rows.get(prefix+'effect:'+kind);if(!claim)return observation('absent');
    // GET-only producer owns exact receipt selection. Never updates/refunds claims.
    const v=await bounded(()=>Reflect.apply(primary.effect,readPrimary,[kind]));
    if(v===null)return observation('unresolved',{controlHash,kind});
    const r=fields(literal(v),['purpose','intentId','controlHash','kind','claimHash','receiptHash','observedAt','outcome']);
    if(r.purpose!=='afw.qa-finite-effect-receipt.v1'||r.intentId!==p.intentId||r.controlHash!==controlHash||r.kind!==kind||r.claimHash!==digest(ROOT+':effect',claim)||!hex(r.receiptHash)||r.outcome!=='complete')fail();fresh(r.observedAt,current());
    return observation('reconciled',{controlHash,kind,receiptHash:r.receiptHash});
   }catch{return observation(issued?'uncertain':'blocked');}
  };
  const deadline=new Promise(resolve=>{timer=setTimeout(()=>{finished=true;resolve(observation(issued?'uncertain':'blocked'));},timeoutMs);});
  try{const result=await Promise.race([work(),deadline]);current();if(operation==='prepare'&&result.status==='armed')acknowledgedPrepare=true;return result;}catch{return observation(issued?'uncertain':'blocked');}finally{finished=true;clearTimeout(timer);}
 }
 return Object.freeze({prepare(...args){return invoke('prepare',args);},read(...args){return invoke('read',args);},captureObservedFacts(...args){return invoke('capture',args);},withdrawNominal(...args){return invoke('withdraw',args);},claimEffect(...args){return invoke('claim',args);},reconcileEffect(...args){return invoke('reconcile',args);}});
}
