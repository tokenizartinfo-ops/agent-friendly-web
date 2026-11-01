import {randomBytes,createHash} from 'node:crypto';
import {finiteFields as fields,finiteHash as hash,finiteHex as hex,finiteTime as time,finiteData as data,finiteSame as same,finiteControlIdentity} from './mcp-finite-evidence.mjs';
import {validatePrivateQaFiniteCleanupProof} from './mcp-own-finite-cleanup-proof.mjs';
const ROOT='afw.qa-finite-trial.v1',KEY='afw.qa-finite-cleanup.v1:',GUARD='afw.qa-finite-guard.v1:';
const fail=()=>{throw Error('Retained finite cleanup unavailable');};
const digest=(purpose,v)=>createHash('sha256').update(purpose+'\n'+JSON.stringify(v)).digest('hex');
const out=(status,extra={})=>Object.freeze({status,...extra,authorizesEffects:false,operationalReadiness:false});
/** Bounded fixed-control read, never latest/global selection or live authority. */
export async function readFiniteCleanupControl({storage,intentId,controlHash}){
 if(typeof intentId!=='string'||!/^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/.test(intentId)||!hex(controlHash)||typeof storage?.get!=='function')fail();
 const head=fields(await storage.get(ROOT+':head'),['purpose','intentId','controlHash','planHash']);
 if(head.purpose!==ROOT+':head'||head.intentId!==intentId||head.controlHash!==controlHash||!hex(head.planHash))fail();
 const info=fields(await storage.get(ROOT+':'+intentId+':info'),['purpose','intentId','planHash','plan','native']);
 if(info.purpose!==ROOT+':info'||info.intentId!==intentId||info.planHash!==head.planHash||typeof info.plan!=='string'||Buffer.byteLength(info.plan)>49152||digest(ROOT+':control-hash',info)!==controlHash)fail();
 const plan=JSON.parse(info.plan);if(JSON.stringify(plan)!==info.plan)fail();
 const c=finiteControlIdentity({plan,planHash:head.planHash,controlHash}),native=fields(info.native,['actorId','runtimeVersionId','sourceRevision']);
 if(native.actorId!==plan.resources.actorId||native.runtimeVersionId!==plan.deployments.qaLive.versionId||native.sourceRevision!==plan.source.revision)fail();
 const state=fields(await storage.get(ROOT+':'+intentId+':control'),['purpose','controlHash','phase','pendingAt','armedAt','withdrawnAt']);
 if(state.purpose!==ROOT+':control'||state.controlHash!==controlHash||!['pending','armed'].includes(state.phase))fail();
 const again=await storage.get(ROOT+':head');if(!same(again,head))fail();return c;
}
function retained(value,c){
 const r=fields(data(value),['purpose','intentId','controlHash','planHash','proofHash','capturedAt','proof','support']);
 if(r.purpose!=='afw.qa-finite-retained-proof.v1'||r.intentId!==c.plan.intentId||r.controlHash!==c.controlHash||r.planHash!==c.planHash||!time(r.capturedAt)||r.capturedAt<r.proof.observedAt||r.capturedAt>=c.plan.C1)fail();
 const {proofHash:ignored,...body}=r;void ignored;if(r.proofHash!==hash(body))fail();
 validatePrivateQaFiniteCleanupProof({proof:r.proof,support:r.support,control:c,expectedChallenge:r.proof.proofChallenge,now:()=>r.capturedAt});return r;
}
/** Private writer; only its fixed READ methods are RPC mounted. A consumed
 * capture without retained bytes stays pending forever: no native rechallenge. */
export function createPrivateQaFiniteCleanupStore({storage,control,now=Date.now}={}){
 const c=finiteControlIdentity(control),p=c.plan,prefix=KEY+p.intentId+':';
 if(typeof storage?.transaction!=='function'||typeof storage?.get!=='function'||typeof now!=='function')fail();
 const checked=()=>readFiniteCleanupControl({storage,intentId:p.intentId,controlHash:c.controlHash});
 let capturing=false;
 async function read(){
  await checked();const value=await storage.get(prefix+'proof');if(value===undefined)return out('not_yet_observed');
  const r=retained(value,c),capture=fields(await storage.get(prefix+'capture'),['purpose','controlHash','challenge','issuedAt']);
  if(capture.purpose!==prefix+'capture'||capture.controlHash!==c.controlHash||capture.challenge!==r.proof.proofChallenge||!time(capture.issuedAt)||capture.issuedAt>r.proof.observedAt)fail();
  return out('observed',{record:r});
 }
 async function capture(producer){
  if(capturing||typeof producer!=='function')return out('admin_pending');capturing=true;
  let wrote=false,finished=false,timer;const entered=now(),mono=performance.now();
  const check=()=>{const n=now();if(finished||!time(n)||n<entered||n>=p.C1||n-entered>=5000||performance.now()-mono>=5000)fail();return n;};
  const work=async()=>{
   await checked();check();const existing=await read();check();if(existing.status==='observed')return existing;
   const challenge=randomBytes(32).toString('hex');
   await storage.transaction(async tx=>{check();if(await tx.get(prefix+'capture')!==undefined)fail();check();wrote=true;await tx.put(prefix+'capture',{purpose:prefix+'capture',controlHash:c.controlHash,challenge,issuedAt:check()});check();});check();
   const value=fields(data(await producer(challenge)),['proof','support']);check();
   const proof=validatePrivateQaFiniteCleanupProof({...value,control:c,expectedChallenge:challenge,now:check});
   const body={purpose:'afw.qa-finite-retained-proof.v1',intentId:p.intentId,controlHash:c.controlHash,planHash:c.planHash,capturedAt:check(),proof,support:value.support},record=data({...body,proofHash:hash(body)});
   await storage.transaction(async tx=>{check();const claim=await tx.get(prefix+'capture');check();if(claim?.challenge!==challenge||claim.controlHash!==c.controlHash||await tx.get(prefix+'proof')!==undefined)fail();check();await tx.put(prefix+'proof',record);check();});check();
   // Independent storage readback is mandatory before any restore POST.
   const seen=await read();check();if(seen.status!=='observed'||!same(seen.record,record))fail();return seen;
  };
  try{return await Promise.race([work(),new Promise(resolve=>{timer=setTimeout(()=>{finished=true;resolve(out(wrote?'uncertain':'admin_pending'));},5000);})]);}catch{return out(wrote?'uncertain':'admin_pending');}finally{finished=true;clearTimeout(timer);capturing=false;}
 }
 async function completion(){
  const proof=await read();if(proof.status!=='observed')return out('not_yet_observed');
  const raw=await storage.get(prefix+'completion');if(raw===undefined)return out('not_yet_observed');
  const r=fields(data(raw),['purpose','intentId','controlHash','proofHash','completedAt','canaryVersionId','canaryDeploymentId','readbackHash','effectReceipts','receiptHash']);
  const {receiptHash:ignored,...body}=r;void ignored;
  if(r.purpose!=='afw.finite-cleanup-completion.v1'||r.intentId!==p.intentId||r.controlHash!==c.controlHash||r.proofHash!==proof.record.proofHash||!time(r.completedAt)||r.completedAt<proof.record.capturedAt||r.completedAt>=p.C1||r.canaryVersionId!==p.deployments.canaryClosed.versionId||!hex(r.readbackHash)||r.receiptHash!==hash(body))fail();
  fields(r.effectReceipts,['withdraw','close','seal','canary_restore']);if(Object.values(r.effectReceipts).some(v=>!hex(v)))fail();
  return out('complete',{receipt:r});
 }
 async function retainCompletion(){
  await checked();const existing=await completion();if(existing.status==='complete')return existing;
  const proof=await read();if(proof.status!=='observed'||now()>=p.C1)return out('admin_pending');
  const rows={};
  for(const kind of ['withdraw','close','seal','canary_restore']){
   const r=fields(await storage.get(GUARD+p.intentId+':effect:'+kind),['purpose','controlHash','kind','claimHash','phase','receipt','completedAt']);
   if(r.purpose!=='afw.finite-guard-effect.v1'||r.controlHash!==c.controlHash||r.kind!==kind||r.phase!=='complete'||!hex(r.claimHash)||!time(r.completedAt)||r.completedAt>=p.C1)fail();rows[kind]=r;
  }
  const last=fields(rows.canary_restore.receipt,['purpose','intentId','controlHash','proofHash','versionId','deploymentId','readbackHash','observedAt']);
  if(last.purpose!=='afw.finite-canary-restored.v1'||last.intentId!==p.intentId||last.controlHash!==c.controlHash||last.proofHash!==proof.record.proofHash||last.versionId!==p.deployments.canaryClosed.versionId||!hex(last.readbackHash)||!time(last.observedAt)||last.observedAt<proof.record.capturedAt||last.observedAt>=p.C1)fail();
  const body={purpose:'afw.finite-cleanup-completion.v1',intentId:p.intentId,controlHash:c.controlHash,proofHash:proof.record.proofHash,completedAt:now(),canaryVersionId:last.versionId,canaryDeploymentId:last.deploymentId,readbackHash:last.readbackHash,effectReceipts:Object.fromEntries(Object.entries(rows).map(([k,v])=>[k,hash(v)]))};
  if(body.completedAt>=p.C1)fail();
  const receipt=data({...body,receiptHash:hash(body)});
  await storage.transaction(async tx=>{if(now()>=p.C1||await tx.get(prefix+'completion')!==undefined)fail();for(const kind of Object.keys(rows))if(!same(await tx.get(GUARD+p.intentId+':effect:'+kind),rows[kind]))fail();if(now()>=p.C1)fail();await tx.put(prefix+'completion',receipt);if(now()>=p.C1)fail();});
  if(now()>=p.C1)return out('uncertain');const seen=await completion();if(!same(seen.receipt,receipt))fail();return seen;
 }
 return Object.freeze({identity:c,capture,read,completion,retainCompletion});
}
export async function readFiniteTrialCleanupProofHead({storage,...refs}){
 const x=fields(refs,['intentId','controlHash']),c=await readFiniteCleanupControl({storage,...x}),r=await createPrivateQaFiniteCleanupStore({storage,control:c}).read();
 return r.status==='observed'?out('observed',{intentId:x.intentId,controlHash:x.controlHash,proofHash:r.record.proofHash}):out('not_yet_observed');
}
export async function readRetainedFiniteCleanupProof({storage,...refs}){
 const x=fields(refs,['intentId','proofHash']);if(!hex(x.proofHash))fail();
 const head=await storage.get(ROOT+':head');if(head?.intentId!==x.intentId)fail();
 const c=await readFiniteCleanupControl({storage,intentId:x.intentId,controlHash:head.controlHash}),r=await createPrivateQaFiniteCleanupStore({storage,control:c}).read();
 if(r.status!=='observed')return r;if(r.record.proofHash!==x.proofHash)fail();return r;
}
export async function readFiniteTrialCleanupCompletion({storage,...refs}){
 const x=fields(refs,['intentId','controlHash','proofHash']);if(!hex(x.proofHash))fail();
 const c=await readFiniteCleanupControl({storage,intentId:x.intentId,controlHash:x.controlHash}),s=createPrivateQaFiniteCleanupStore({storage,control:c}),r=await s.read();
 if(r.status!=='observed')return out('not_yet_observed');if(r.record.proofHash!==x.proofHash)fail();return s.completion();
}
