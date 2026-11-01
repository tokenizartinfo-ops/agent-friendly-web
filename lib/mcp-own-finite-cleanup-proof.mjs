import {finiteFields as fields,finiteHash as hash,finiteHex as hex,finiteTime as time,finiteData as data,finiteSame as same,finiteControlIdentity} from './mcp-finite-evidence.mjs';
const fail=()=>{throw Error('Finite cleanup proof unavailable');};
const KINDS=['reservation','admission','launch'];
export function finiteAdmissionIdentity(control){const c=finiteControlIdentity(control),p=c.plan;return Object.freeze({intentId:p.intentId,controlHash:c.controlHash,planHash:c.planHash,containerId:p.resources.containerId,applicationId:p.resources.applicationId,grantHash:p.grantHash,trialId:p.trialId,sourceRevision:p.canaryContainment.sourceRevision,runtimeVersionId:p.canaryContainment.runtimeVersionId,T0:p.T0,N1:p.N1,C1:p.C1});}
function validateGate(value,c,at){
 const g=fields(value,['status','identity','identityHash','sealed','seal','sealHash','writers','unresolvedWriters','launchNeverIssued','authorizesEffects','operationalReadiness']);
 const identity=finiteAdmissionIdentity(c),identityHash=hash({purpose:'afw.own-finite-admission.v1',identity});
 if(g.status!=='observed'||!same(g.identity,identity)||g.identityHash!==identityHash||g.sealed!==true||g.authorizesEffects!==false||g.operationalReadiness!==false||g.unresolvedWriters!==0)fail();
 const seal=fields(g.seal,['purpose','identityHash','sealedAt']);
 if(seal.purpose!=='afw.own-finite-admission.v1:seal'||seal.identityHash!==identityHash||!time(seal.sealedAt)||seal.sealedAt<c.plan.T0||seal.sealedAt>=c.plan.C1||seal.sealedAt>at||g.sealHash!==hash(seal))fail();
 fields(g.writers,KINDS);
 for(const kind of KINDS){const w=g.writers[kind];if(w===null)continue;
  fields(w,['claim','settlement']);const x=fields(w.claim,['purpose','identityHash','kind','issuedAt','deadline']);
  if(x.purpose!=='afw.own-finite-admission.v1:writer'||x.identityHash!==identityHash||x.kind!==kind||!time(x.issuedAt)||x.issuedAt<c.plan.T0||x.issuedAt>seal.sealedAt||x.issuedAt>=c.plan.N1||x.deadline!==c.plan.N1)fail();
  const r=fields(w.settlement,['purpose','identityHash','kind','claimHash','primaryRowHash','settledAt']);
  if(r.purpose!=='afw.own-finite-admission.v1:settled'||r.identityHash!==identityHash||r.kind!==kind||r.claimHash!==hash(x)||!hex(r.primaryRowHash)||!time(r.settledAt)||r.settledAt<x.issuedAt||r.settledAt>at||r.settledAt>=c.plan.C1)fail();
 }
 if(g.launchNeverIssued!==(g.writers.launch===null))fail();return g;
}
function primary(value,c,at){
 const v=fields(value,['purpose','intentId','controlHash','observedAt','reservationHash','admissionHash','launchHash','closureHash','processGeneration']);
 if(v.purpose!=='afw.finite-primary-snapshot.v1'||v.intentId!==c.plan.intentId||v.controlHash!==c.controlHash||!time(v.observedAt)||v.observedAt<c.plan.T0||v.observedAt>at||['reservationHash','admissionHash','launchHash','closureHash','processGeneration'].some(k=>v[k]!==null&&!hex(v[k])))fail();
 if((v.admissionHash===null)!==(v.processGeneration===null)||v.launchHash!==null&&v.admissionHash===null)fail();return v;
}
function provider(value,c,at){
 const v=fields(value,['purpose','applicationId','observedAt','instances','totalCount']);
 if(v.purpose!=='afw.finite-provider-inventory.v1'||v.applicationId!==c.plan.resources.applicationId||!time(v.observedAt)||v.observedAt<c.plan.T0||v.observedAt>at||!Array.isArray(v.instances)||v.instances.length>64||v.totalCount!==v.instances.length)fail();
 const ids=new Set();for(const item of v.instances){const x=fields(item,['containerId','applicationId','image','startedAt','stoppedAt','state','exitCode']);if(!hex(x.containerId)||ids.has(x.containerId)||x.applicationId!==v.applicationId||x.image!=='cloudflare/debian-trixie'||x.state!=='stopped'||x.exitCode!==0||!time(x.startedAt)||!time(x.stoppedAt)||x.stoppedAt<x.startedAt||x.stoppedAt>v.observedAt)fail();ids.add(x.containerId);}return v;
}
function retirement(value,c,at){
 const h=fields(value,['status','physicalStopVerified','mayStartSuccessor','mayRestoreAdministration','operationalReadiness','containerId','applicationId','programHash','sourceRevision','processGeneration','closedAt','stoppedAt','capturedAt','observedAt']);
 const p=c.plan;if(h.status!=='retired_handoff_observed'||h.physicalStopVerified!==true||h.mayStartSuccessor!==false||h.mayRestoreAdministration!==false||h.operationalReadiness!==false||h.containerId!==p.resources.containerId||h.applicationId!==p.resources.applicationId||h.programHash!==p.selectors.programHash||h.sourceRevision!==p.selectors.sourceRevision||!hex(h.processGeneration)||['closedAt','stoppedAt','capturedAt','observedAt'].some(k=>!time(h[k]))||h.closedAt<p.T0||h.closedAt>h.capturedAt||h.stoppedAt>h.capturedAt||h.capturedAt>h.observedAt||h.observedAt>at)fail();return h;
}
/** Fact validation, never effect authority. Producer live version is retained
 * provenance; callers restoring QA must separately check the current CLOSED
 * deployment and fresh provider/primary observations, without recalling native. */
export function validatePrivateQaFiniteCleanupProof({proof,support,control,expectedChallenge,now=Date.now}={}){
 const c=finiteControlIdentity(control),p=c.plan,v=data(proof),e=data(support),at=now();
 const common=['purpose','kind','intentId','planHash','controlHash','sourceRevision','runtimeVersionId','containerId','applicationId','grantHash','trialId','sealHash','proofChallenge','observedAt','evidenceHash'];
 const extra=v.kind==='retired_process'?['retirementHandoff']:v.kind==='sealed_without_admission'?['sealedAt','admissionClosed','launchNeverIssued','primaryWriterSetHash','primaryWriterTerminal','primarySnapshotHash','providerAbsenceHash']:null;if(!extra)fail();fields(v,[...common,...extra]);fields(e,['gate','primary','providerBefore','providerAfter']);
 if(!time(at)||!time(v.observedAt)||v.observedAt<p.T0||v.observedAt>=p.C1||v.observedAt>at||v.purpose!=='afw.finite-trial-cleanup-proof.v1'||v.intentId!==p.intentId||v.planHash!==c.planHash||v.controlHash!==c.controlHash||v.sourceRevision!==p.canaryContainment.sourceRevision||v.runtimeVersionId!==p.canaryContainment.runtimeVersionId||v.containerId!==p.resources.containerId||v.applicationId!==p.resources.applicationId||v.grantHash!==p.grantHash||v.trialId!==p.trialId||!hex(expectedChallenge)||v.proofChallenge!==expectedChallenge||v.evidenceHash!==hash({proofChallenge:v.proofChallenge,sealHash:v.sealHash,support:e}))fail();
 const g=validateGate(e.gate,c,v.observedAt),q=primary(e.primary,c,v.observedAt),a=provider(e.providerBefore,c,v.observedAt),b=provider(e.providerAfter,c,v.observedAt);
 if(v.sealHash!==g.sealHash||a.observedAt>q.observedAt||b.observedAt<q.observedAt||q.observedAt<g.seal.sealedAt||b.observedAt-a.observedAt>5000||v.observedAt-a.observedAt>5000)fail();
 for(const kind of KINDS){const w=g.writers[kind];if(w&&(q.observedAt<w.settlement.settledAt||q[kind+'Hash']!==w.settlement.primaryRowHash))fail();if(!w&&q[kind+'Hash']!==null)fail();}
 if(v.kind==='sealed_without_admission'){
  if(g.writers.admission!==null||g.writers.launch!==null||q.admissionHash!==null||q.launchHash!==null||g.launchNeverIssued!==true||v.sealedAt!==g.seal.sealedAt||v.admissionClosed!==true||v.launchNeverIssued!==true||v.primaryWriterTerminal!==true||v.primaryWriterSetHash!==hash(g.writers)||v.primarySnapshotHash!==hash(q)||v.providerAbsenceHash!==hash([a,b])||[a,b].some(x=>x.instances.some(i=>i.containerId===v.containerId)))fail();
 }else{
  const h=retirement(v.retirementHandoff,c,v.observedAt);
  if(!q.reservationHash||!g.writers.reservation||!q.admissionHash||!q.launchHash||!q.closureHash||q.processGeneration!==h.processGeneration||!g.writers.admission||!g.writers.launch)fail();
  for(const x of [a,b]){const matches=x.instances.filter(i=>i.containerId===v.containerId);if(matches.length!==1||matches[0].stoppedAt!==h.stoppedAt)fail();}
 }
 return Object.freeze(v);
}
/** Native producer is PRIVATE. The read-only readiness probe permits bounded
 * alarm observations while physical stop is still pending. It grants no proof.
 * The one native challenge is consumed atomically with the completed capture,
 * after source/primary/provider checks; no failed readiness spends it. */
export function createFiniteNativeCleanupProofProducer({storage,gate,control,primaryRead,providerRead,retirementRead,now=Date.now}={}){
 const c=finiteControlIdentity(control),p=c.plan,key='afw.own-finite-proof.v1:'+p.intentId;
 if(typeof storage?.transaction!=='function'||typeof gate?.read!=='function'||[primaryRead,providerRead,retirementRead,now].some(f=>typeof f!=='function'))fail();
 async function collect(challenge,current){
  const before=await providerRead();current();const first=await gate.read();current();const q=await primaryRead();current();const after=await gate.read();current();if(!same(first,after))fail();
  const last=await providerRead();current();const support=data({gate:after,primary:q,providerBefore:before,providerAfter:last});
  const common={purpose:'afw.finite-trial-cleanup-proof.v1',kind:q.admissionHash===null?'sealed_without_admission':'retired_process',intentId:p.intentId,planHash:c.planHash,controlHash:c.controlHash,sourceRevision:p.canaryContainment.sourceRevision,runtimeVersionId:p.canaryContainment.runtimeVersionId,containerId:p.resources.containerId,applicationId:p.resources.applicationId,grantHash:p.grantHash,trialId:p.trialId,sealHash:after.sealHash,proofChallenge:challenge};
  const extra=common.kind==='retired_process'?{retirementHandoff:await retirementRead()}:{sealedAt:after.seal?.sealedAt,admissionClosed:true,launchNeverIssued:after.launchNeverIssued,primaryWriterSetHash:hash(after.writers),primaryWriterTerminal:after.unresolvedWriters===0,primarySnapshotHash:hash(q),providerAbsenceHash:hash([before,last])};current();
  const proof={...common,observedAt:current(),evidenceHash:hash({proofChallenge:challenge,sealHash:after.sealHash,support}),...extra};
  validatePrivateQaFiniteCleanupProof({proof,support,control:c,expectedChallenge:challenge,now:current});return Object.freeze({proof:data(proof),support});
 }
 async function readiness(current){
  const before=await providerRead();current();const first=await gate.read();current();const snapshot=await primaryRead();current();const after=await gate.read();current();const last=await providerRead();current();
  if(!same(first,after))fail();const at=current(),g=validateGate(after,c,at),q=primary(snapshot,c,at),a=provider(before,c,at),b=provider(last,c,at);
  if(a.observedAt>q.observedAt||b.observedAt<q.observedAt||q.observedAt<g.seal.sealedAt||at-a.observedAt>5000)fail();
  for(const kind of KINDS){const w=g.writers[kind];if(w&&(q.observedAt<w.settlement.settledAt||q[kind+'Hash']!==w.settlement.primaryRowHash)||!w&&q[kind+'Hash']!==null)fail();}
  if(q.admissionHash===null){if(g.writers.admission||g.writers.launch||q.launchHash||[a,b].some(x=>x.instances.some(i=>i.containerId===p.resources.containerId)))fail();}
  else if(!q.launchHash||!q.closureHash||[a,b].some(x=>x.instances.filter(i=>i.containerId===p.resources.containerId).length!==1))fail();
  return Object.freeze({status:'ready_for_capture',intentId:p.intentId,controlHash:c.controlHash,sourceRevision:p.canaryContainment.sourceRevision,runtimeVersionId:p.canaryContainment.runtimeVersionId,observedAt:current()});
 }
 async function invoke(value,probe){
  const x=probe?null:fields(value,['intentId','planHash','proofChallenge']);
  if(!probe&&(x.intentId!==p.intentId||x.planHash!==c.planHash||!hex(x.proofChallenge)))fail();
  const entered=now(),mono=performance.now();let done=false,timer,last=entered;
  const current=()=>{const n=now();if(done||!time(n)||n<last||n>=p.C1||n-entered>=5000||performance.now()-mono>=5000)fail();last=n;return n;};
  const work=async()=>{
   current();if(probe)return readiness(current);
   const result=await collect(x.proofChallenge,current);current();
   await storage.transaction(async tx=>{current();if(await tx.get(key)!==undefined)fail();current();await tx.put(key,{controlHash:c.controlHash,proofChallenge:x.proofChallenge,proofHash:hash(result),capturedAt:current()});current();});current();return result;
  };
  try{return await Promise.race([work(),new Promise((_,reject)=>{timer=setTimeout(()=>{done=true;reject(Error('Finite proof unavailable'));},5000);})]);}
  catch(error){if(probe)return Object.freeze({status:'not_yet_observed'});throw error;}finally{done=true;clearTimeout(timer);}
 }
 return Object.freeze({ready:()=>invoke(null,true),observe:value=>invoke(value,false)});
}
