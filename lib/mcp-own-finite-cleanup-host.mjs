import {finiteControlIdentity,finiteFields as fields,finiteSame as same} from './mcp-finite-evidence.mjs';
import {finiteAdmissionIdentity,createFiniteNativeCleanupProofProducer} from './mcp-own-finite-cleanup-proof.mjs';
import {createFiniteAdmissionGate} from './mcp-own-finite-admission-gate.mjs';
import {createFiniteNativePrimaryReader} from './mcp-own-finite-primary.mjs';
import {createSuccessorRetirementHandoff} from './mcp-successor-retirement-handoff.mjs';
const fail=()=>{throw Error('Finite native cleanup unavailable');};
const hosts=new WeakSet();let factory;
/** Private constructor, called only by Task4's compiled actual-binding resolver.
 * AFW_FINITE_TRIAL_VERSION is a NEW required version_metadata binding. Its
 * absence in a closed/legacy profile denies these RPCs; this source adds none.
 * Provider/custody readers are fixed server adapters, never RPC payloads. */
export function createFiniteOwnNativeCleanupHost({ctx,env,control,sourceRevision,providerRead,readCustody,readInstance,readNominalControl,now=Date.now}={}){
 const c=finiteControlIdentity(control),p=c.plan,storage=ctx?.storage,id=ctx?.id,db=env?.DB,namespace=env?.AFW_DOSSIER_EVENTS_NODE,version=env?.AFW_FINITE_TRIAL_VERSION;
 if(typeof storage?.transaction!=='function'||typeof storage?.get!=='function'||typeof db?.withSession!=='function'||typeof namespace?.idFromName!=='function'||sourceRevision!==p.canaryContainment.sourceRevision||version?.id!==p.canaryContainment.runtimeVersionId||[providerRead,readCustody,readInstance,readNominalControl,now].some(x=>typeof x!=='function'))fail();
 const ns=namespace.idFromName,transaction=storage.transaction,get=storage.get;
 const current=()=>{if(ctx.storage!==storage||ctx.id!==id||env.DB!==db||env.AFW_DOSSIER_EVENTS_NODE!==namespace||env.AFW_FINITE_TRIAL_VERSION!==version||version.id!==p.canaryContainment.runtimeVersionId||namespace.idFromName!==ns||id.toString()!==p.resources.containerId||ns.call(namespace,'afw-own-event-first-successor-v1').toString()!==p.resources.containerId||storage.transaction!==transaction||storage.get!==get)fail();return now();};current();
 const primary=createFiniteNativePrimaryReader({db,control:c,now:current}),gate=createFiniteAdmissionGate({storage,identity:finiteAdmissionIdentity(c),readPrimary:{reservation:primary.reservation,admission:primary.admission,launch:primary.launch},readNominalControl,nominalIdentity:{sourceRevision:p.source.revision,runtimeVersionId:p.deployments.qaLive.versionId,actorId:p.resources.actorId,monitorHash:p.monitorHash,consentExpiresAt:p.selectors.expiresAt},now:current,timeoutMs:5000});
 // Reuse the existing physical-retirement primitive in a finite-only namespace.
 // No legacy handoff record is reset or interpreted as this generation.
 const prefix='afw.own-finite-retirement.v1:'+p.intentId+':';
 const detached={transaction:fn=>storage.transaction(tx=>fn({get:k=>tx.get(prefix+k),put:(k,v)=>tx.put(prefix+k,v)}))};
 const producer=createFiniteNativeCleanupProofProducer({storage,gate,control:c,primaryRead:primary.read,providerRead,retirementRead:async({assertCurrent})=>{
  const lease=()=>{assertCurrent();const at=current();if(at>=p.C1)fail();return at;};lease();
  const handoff=createSuccessorRetirementHandoff({storage:detached,original:{containerId:p.resources.containerId,applicationId:p.resources.applicationId,programHash:p.selectors.programHash,sourceRevision:p.selectors.sourceRevision},readCustody,readInstance,now:lease,assertCurrent:lease,timeoutMs:5000});
  let r=await handoff.observe();lease();if(r.status!=='retired_handoff_observed'){await handoff.capture();lease();r=await handoff.observe();lease();}return r;
 },now:current});
 const refs=(value,keys)=>{const x=fields(value,keys);current();if(x.intentId!==p.intentId||Object.hasOwn(x,'planHash')&&x.planHash!==c.planHash||Object.hasOwn(x,'controlHash')&&x.controlHash!==c.controlHash)fail();return x;};
 const invoke=async(value,keys,fn)=>{refs(value,keys);const r=await fn();current();return r;};
 const host=Object.freeze({identity:c,gate,
  beginFiniteTrialReservation:value=>invoke(value,['intentId','controlHash'],gate.beginReservation),
  settleFiniteTrialReservation:value=>invoke(value,['intentId','controlHash'],gate.settleReservation),
  sealFiniteTrialAdmission:value=>invoke(value,['intentId','planHash'],gate.seal),
  readFiniteTrialCleanupReadiness:value=>invoke(value,['intentId','planHash'],producer.ready),
  observeFiniteTrialCleanup:value=>invoke(value,['intentId','planHash','proofChallenge'],()=>producer.observe(value))
 });hosts.add(host);return host;
}
/** Build-time internal mount only, no env/RPC function, arbitrary operation name,
 * payload writer fact, new public authorization option or nominal reset. */
export function installFiniteOwnNativeCleanupFactory(value){if(factory!==undefined||typeof value!=='function')fail();factory=value;}
export async function resolveFiniteOwnNativeCleanupHost({ctx,env}){
 if(typeof factory!=='function')fail();const host=await factory({ctx,env});
 if(!hosts.has(host)||!same(host.identity,finiteControlIdentity(host.identity)))fail();return host;
}
