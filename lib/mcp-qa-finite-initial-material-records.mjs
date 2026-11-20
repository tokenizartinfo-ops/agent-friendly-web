import {createHash} from 'node:crypto';
import {finiteData,finiteFields} from './mcp-finite-evidence.mjs';
import {decodeFiniteQaBootstrap,bootstrapCanonical} from './mcp-qa-finite-bootstrap-record.mjs';
const fail=()=>{throw Error('Finite initial material unavailable');};
export const initialCanonical=bootstrapCanonical;
export const initialHash=(domain,value)=>createHash('sha256').update(domain+'\n'+initialCanonical(value)).digest('hex');
export const initialHex=(v,n=64)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const id=v=>typeof v==='string'&&v.length>0&&v.length<=200&&!/[\u0000-\u001f\u007f]/.test(v);
const check=v=>{if(!v)fail();};
export function initialFields(v,keys){return finiteFields(v,keys);}
export function initialOwn(value){
 let nodes=0;
 const copy=(v,depth=0)=>{
  if(++nodes>16384||depth>24)fail();
  if(v===null||typeof v==='boolean'||typeof v==='number'&&Number.isSafeInteger(v))return v;
  if(typeof v==='string'){if(Buffer.byteLength(v)>65536)fail();return v;}
  const array=Array.isArray(v);
  if(!v||Object.getPrototypeOf(v)!==(array?Array.prototype:Object.prototype))fail();
  const keys=Reflect.ownKeys(v);if(array&&(v.length>2048||keys.length!==v.length+1))fail();
  const out=array?[]:{};
  for(const k of keys.filter(k=>!(array&&k==='length')).sort()){
   const d=Object.getOwnPropertyDescriptor(v,k);
   if(typeof k!=='string'||['__proto__','constructor','prototype','toJSON'].includes(k)||!d?.enumerable||!Object.hasOwn(d,'value')||array&&!/^(0|[1-9][0-9]*)$/.test(k))fail();
   out[k]=copy(d.value,depth+1);
  }
  return Object.freeze(out);
 };
 const out=copy(value);if(Buffer.byteLength(initialCanonical(out))>65536)fail();return out;
}
export function initialInstanceId({commandId,sourceRevision,qaVersionId}){
 check(Number.isSafeInteger(commandId)&&commandId>0&&initialHex(sourceRevision,40)&&uuid(qaVersionId));
 return 'afw-finite-initial-'+initialHash('afw.finite-initial-instance.v1',{operation:'finite_initial_preparation',commandId,sourceRevision,qaVersionId});
}
function intent(input){
 const v=initialFields(input,['purpose','repository','commandId','sourceRevision','sourceTree','qaVersionId','initialInstanceId','I0','initialDeadline','goal']);
 check(v.purpose==='afw.finite-initial-intent.v1'&&v.repository==='tokenizartinfo-ops/agent-friendly-web'&&initialHex(v.sourceRevision,40)&&initialHex(v.sourceTree,40)&&uuid(v.qaVersionId)&&time(v.I0)&&v.initialDeadline===v.I0+300000&&v.goal==='content'&&v.initialInstanceId===initialInstanceId(v));return v;
}
function ids(input){
 const v=initialFields(input,['preconnectionId','trialId','activationKey','withdrawalRequestId','saveIdempotencyKey']);
 check(['preconnectionId','trialId','activationKey'].every(k=>initialHex(v[k]))&&uuid(v.withdrawalRequestId)&&uuid(v.saveIdempotencyKey));return v;
}
export function validateFiniteInitialOriginalContext(input){
 // Preserve Task4 v1: finiteData limits BEFORE its recursively sorted digest.
 const v=finiteData(initialFields(input,['artifact','scope','original','publication','cancellations','retirementPolicy','withdrawalRequestId','saveIdempotencyKey','legacy','trialId']));
 const a=initialFields(v.artifact,['sourceRevision','sourceTree','programHash','workerHash','sourceCheck']);
 check(initialHex(a.sourceRevision,40)&&initialHex(a.sourceTree,40)&&initialHex(a.programHash)&&initialHex(a.workerHash)&&a.sourceCheck==='git-inputs-before-after-v1');
 const s=initialFields(v.scope,['accountId','workerName','namespaceId','applicationId','ownerRef','projectRef','resource']);
 check(s.accountId==='85d0d5dadac3341a564f22ce885e9eec'&&s.workerName==='agent-friendly-web-delegated-canary'&&s.namespaceId==='d6fc71552de7494a863aca20365a572d'&&s.applicationId===s.namespaceId&&initialHex(s.ownerRef)&&initialHex(s.projectRef)&&s.resource==='https://delegated-canary.agentfriendlyweb.dev/mcp');
 const o=initialFields(v.original,['containerId','applicationId','programHash','sourceRevision']);
 check(initialHex(o.containerId)&&o.applicationId===s.applicationId&&initialHex(o.programHash)&&initialHex(o.sourceRevision,40));
 const p=initialFields(v.publication,['artifactKey','workerHash','activationKey']);
 check(Object.values(p).every(x=>initialHex(x))&&p.workerHash===a.workerHash&&p.artifactKey===createHash('sha256').update(JSON.stringify([s.accountId,s.workerName,a.workerHash])).digest('hex'));
 check(Array.isArray(v.cancellations)&&v.cancellations.length>=1&&v.cancellations.length<=8);
 for(const c of v.cancellations){initialFields(c,['grantId','containerId','programHash','sourceRevision','image','closedAt','revokedAt','monitorSequence','monitorRevision','monitorRevokedAt']);check(id(c.grantId)&&initialHex(c.containerId)&&initialHex(c.programHash)&&initialHex(c.sourceRevision,40)&&c.image==='cloudflare/debian-trixie'&&time(c.closedAt)&&time(c.monitorRevokedAt)&&Number.isSafeInteger(c.monitorSequence)&&c.monitorSequence>0&&Number.isSafeInteger(c.monitorRevision)&&c.monitorRevision>0&&typeof c.revokedAt==='string'&&Number.isSafeInteger(Date.parse(c.revokedAt))&&new Date(Date.parse(c.revokedAt)).toISOString()===c.revokedAt);}
 check(typeof v.retirementPolicy==='string'&&v.retirementPolicy.length>0&&Buffer.byteLength(v.retirementPolicy)<=4096&&uuid(v.withdrawalRequestId)&&uuid(v.saveIdempotencyKey)&&initialHex(v.trialId));
 const l=initialFields(v.legacy,['control','controlHash','preparedDispatch','preparedDispatchHash','reductionDispatch','reductionDispatchHash','restoration','retirement','sourceRevision','sourceHash']);
 check(['control','preparedDispatch','reductionDispatch'].every(k=>typeof l[k]==='string'&&l[k].length>0)&&['controlHash','preparedDispatchHash','reductionDispatchHash','sourceHash'].every(k=>initialHex(l[k]))&&initialHex(l.sourceRevision,40)&&l.restoration===null&&l.retirement===null);return v;
}
function selection(v){
 initialFields(v,['subject','project','clientId','resource','goal','access','limiter']);initialFields(v.project,['projectId','revision','synthetic']);initialFields(v.access,['teamDomain','audience']);
 check(id(v.subject)&&id(v.project.projectId)&&Number.isSafeInteger(v.project.revision)&&v.project.revision>0&&v.project.synthetic===true&&id(v.clientId)&&v.resource==='https://delegated-canary.agentfriendlyweb.dev/mcp'&&v.goal==='content'&&/^[a-z0-9-]+\.cloudflareaccess\.com$/.test(v.access.teamDomain)&&id(v.access.audience));
 const l=initialFields(v.limiter,['name','type','namespace_id','simple']);initialFields(l.simple,['limit','period']);
 check(l.name==='DELEGATED_RATE_LIMITER'&&l.type==='ratelimit'&&typeof l.namespace_id==='string'&&/^\d+$/.test(l.namespace_id)&&Number.isSafeInteger(l.simple.limit)&&l.simple.limit>0&&[10,60].includes(l.simple.period));
}
function evidence(v,M,tree){
 initialFields(v,['purpose','reader','artifactReceiptHash','metadataProofHash','bindingsHash','legacyHash','historyHash']);initialFields(v.reader,['sourceRevision','sourceTree']);
 check(v.purpose==='afw.finite-historical-evidence.v1'&&v.reader.sourceRevision===M&&v.reader.sourceTree===tree&&['artifactReceiptHash','metadataProofHash','bindingsHash','legacyHash','historyHash'].every(k=>initialHex(v[k])));
}
const definitions={
 InitialClaim:['afw.finite-initial-claim.v1',['intent','commandHash','ids','claimedAt','deadline','claimHash'],'claimHash',8192],
 InitialMaterial:['afw.finite-initial-material.v1',['intent','claimHash','preconnectionId','qaBootstrap','historicalEvidence','ownerSelection','originalContext','observedAt','materialHash'],'materialHash',65536],
 InitialSelector:['afw.finite-initial-selector.v1',['intentHash','claimHash','materialHash','sourceRevision','qaVersionId','preconnectionId'],null,2048],
 InitialAck:['afw.finite-initial-material-ack.v1',['intentHash','claimHash','materialHash','selectorHash','acknowledgedAt'],null,2048]
};
function validate(kind,input,hashing=false){
 check(Object.hasOwn(definitions,kind));const [purpose,keys,self,cap]=definitions[kind],v=initialOwn(input),names=['purpose',...keys];
 if(hashing&&self&&!Object.hasOwn(v,self))names.splice(names.indexOf(self),1);
 initialFields(v,names);check(v.purpose===purpose&&Buffer.byteLength(initialCanonical(v))<=cap);
 for(const[k,x]of Object.entries(v)){if(k.endsWith('Hash'))check(initialHex(x));if(k==='sourceRevision')check(initialHex(x,40));if(k==='qaVersionId')check(uuid(x));if(k==='preconnectionId')check(initialHex(x));}
 if(kind==='InitialClaim'){intent(v.intent);ids(v.ids);check(time(v.claimedAt)&&time(v.deadline)&&v.claimedAt>=v.intent.I0&&v.claimedAt<v.deadline&&v.deadline<=v.intent.initialDeadline&&v.deadline-v.claimedAt<=30000);}
 if(kind==='InitialMaterial'){
  const i=intent(v.intent);check(time(v.observedAt)&&v.observedAt>=i.I0&&v.observedAt<i.initialDeadline);selection(v.ownerSelection);
  const q=v.qaBootstrap;initialFields(q,['purpose','record','recordHash','tagSha','primaryEvidence','currentPointer','observedAt','qaPublicationBridgeVerified','qaCodeProvenanceVerified','sourceIdentityVerified','scopeVerified','authorizesEffects','operationalReadiness','completePackage','repositoryWriterTrustAssumed','historicalRefNonmutationVerified']);
  const r=decodeFiniteQaBootstrap(initialCanonical({record:q.record,recordHash:q.recordHash})).record;
  check(q.purpose==='afw.finite-qa-bootstrap-evidence.v1'&&initialHex(q.tagSha,40)&&time(q.observedAt)&&q.qaPublicationBridgeVerified===true&&q.repositoryWriterTrustAssumed===true&&['qaCodeProvenanceVerified','sourceIdentityVerified','scopeVerified','authorizesEffects','operationalReadiness','completePackage','historicalRefNonmutationVerified'].every(k=>q[k]===false)&&r.sourceRevision===i.sourceRevision&&r.sourceTree===i.sourceTree&&r.qaLive.versionId===i.qaVersionId);
  const pe=initialFields(q.primaryEvidence,['P0','Pend','jobId','jobStartedAt','stepStartedAt','stepCompletedAt','jobCompletedAt']),cp=initialFields(q.currentPointer,['versionId','deploymentId']);
  check(['P0','Pend','jobId','jobStartedAt','stepStartedAt'].every(k=>pe[k]===r[k])&&time(pe.stepCompletedAt)&&time(pe.jobCompletedAt)&&pe.stepCompletedAt>=r.observedAt&&pe.jobCompletedAt>=pe.stepCompletedAt&&pe.jobCompletedAt<r.Pend&&pe.jobCompletedAt<=q.observedAt&&cp.versionId===r.qaLive.versionId&&cp.deploymentId===r.qaLive.deploymentId);
  const p=validateFiniteInitialOriginalContext(v.originalContext);evidence(v.historicalEvidence,i.sourceRevision,i.sourceTree);
  check(p.artifact.sourceRevision===i.sourceRevision&&p.artifact.sourceTree===i.sourceTree&&p.legacy.sourceRevision===i.sourceRevision&&p.legacy.sourceHash===initialHash('afw.finite-historical-evidence.v1',v.historicalEvidence));
 }
 if(kind==='InitialAck')check(time(v.acknowledgedAt));
 if(self&&!hashing)check(v[self]===hashBody(kind,v));return v;
}
function hashBody(kind,v){const [domain,,self]=definitions[kind];return initialHash(domain,Object.fromEntries(Object.entries(v).filter(([k])=>k!==self)));}
export function hashFiniteInitialMaterialRecord(kind,value){return hashBody(kind,validate(kind,value,true));}
export function validateFiniteInitialMaterialRecord(kind,value){return validate(kind,value);}
export function encodeFiniteInitialMaterialRecord(kind,value){return initialCanonical(validate(kind,value));}
export function decodeFiniteInitialMaterialRecord(kind,text){check(typeof text==='string'&&Buffer.byteLength(text)<=65536);const v=validate(kind,JSON.parse(text));check(initialCanonical(v)===text);return v;}
