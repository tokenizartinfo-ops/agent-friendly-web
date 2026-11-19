import {createHash} from 'node:crypto';
import {ownSubscriptionReceiptEligibilitySql,ownSubscriptionReceiptFields as subscriptionFields} from './mcp-own-subscription-receipt.mjs';
import {createPrivateQaFiniteTrialNativePin,readPrivateQaFiniteControlIdentity} from './mcp-qa-finite-trial-control.mjs';
import {createFiniteNativePrimaryReader} from './mcp-own-finite-primary.mjs';
import {validateFiniteRecoverySnapshot} from './mcp-qa-finite-recovery-record.mjs';
import {finiteControlIdentity,finiteFields as fields,finiteHash as hash,finiteHex as hex,finiteTime as time} from './mcp-finite-evidence.mjs';

const fail=()=>{throw Error('Finite business primary unavailable');};
const identifier=value=>typeof value==='string'&&/^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/.test(value);
const sha=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
// Read all three facts together. A missing or incompatible launch record
// cannot turn a subscription receipt into evidence of process or event.
const processFields=['processCreatedAt','processExpiresAt','launchTrial','launchContainer','launchGeneration','launchManifest','claimedAt',
 'reservationContainer','reservationProgram','reservationSource','reservationApplication','reservationManifest',
 'reservationStart','reservationExpiry','reservedAt','reservationBudget','reservationState'];
const eventFields=['savedId','savedType','savedAt','savedPayload','projectRevision'];
const query=`
 SELECT r.*,
  n.created_at AS processCreatedAt,n.expires_at AS processExpiresAt,
  l.trial_id AS launchTrial,l.container_id AS launchContainer,l.process_generation AS launchGeneration,l.scope_hash AS launchManifest,l.claimed_at AS claimedAt,
  q.container_id AS reservationContainer,q.program_hash AS reservationProgram,q.source_revision AS reservationSource,
  q.application_id AS reservationApplication,q.scope_hash AS reservationManifest,q.start_at AS reservationStart,q.expires_at AS reservationExpiry,
  q.reserved_at AS reservedAt,q.budget AS reservationBudget,q.state AS reservationState,
  e.id AS savedId,e.type AS savedType,e.created_at AS savedAt,e.payload_json AS savedPayload,p.revision AS projectRevision
 FROM (${ownSubscriptionReceiptEligibilitySql}) r
 JOIN dossier_node_process_admissions n ON n.grant_id=r.grant_id
 JOIN site_projects p ON p.id=r.project_id AND p.user_id=r.user_id
 LEFT JOIN dossier_successor_launch_claims l ON l.grant_id=r.grant_id
 LEFT JOIN dossier_successor_reservations q ON q.trial_id=l.trial_id
 LEFT JOIN project_events e ON e.id=? AND e.project_id=r.project_id AND e.user_id=r.user_id
 LIMIT 2`;

export function createPrivateQaFiniteBusinessPrimary({ctx,env,control,now=Date.now}={}){
 const c=finiteControlIdentity(control),p=c.plan,s=p.selectors,db=env.RELEASE_DB,withSession=db?.withSession;
 const nativePin=createPrivateQaFiniteTrialNativePin({ctx,env,sourceRevision:p.source.revision}),raw=JSON.stringify(p);
 const currentIdentity=()=>readPrivateQaFiniteControlIdentity({nativePin,raw});
 const identity=currentIdentity();
 if(identity.controlHash!==c.controlHash||identity.planHash!==c.planHash||typeof withSession!=='function'||typeof now!=='function')fail();
 const end=Math.min(p.N1,s.expiresAt);
 const eventId=sha(['afw.own-synthetic-save.v1',s.subject,s.projectId,s.saveIdempotencyKey]);
 const fingerprint=sha(['afw.own-synthetic-save.v1',s.grantId,s.expectedProjectRevision,s.goal]);
 const revision=s.expectedProjectRevision+1,payload=JSON.stringify({changedFields:['goals'],revision,fingerprint});
 const pins=[s.grantId,s.subject,s.projectId,s.clientId,s.resource,p.resources.containerId,s.programHash,s.sourceRevision];
 const common={intentId:p.intentId,sourceRevision:p.source.revision,runtimeVersionId:p.deployments.qaLive.versionId,
  actorId:p.resources.actorId,planHash:c.planHash,selectorsHash:identity.selectorsHash,candidates:1};
 let last=-1;
 const current=()=>{
  currentIdentity();
  const at=now();
  if(env.RELEASE_DB!==db||db.withSession!==withSession||!time(at)||at<Math.max(p.T0,s.startAt)||at<last||at>=end)fail();
  last=at;
  return at;
 };
 async function read(){
  current();
  const d=Reflect.apply(withSession,db,['first-primary']);
  const value=await d.prepare(query).bind(...pins,eventId).all();
  const at=current();
  if(value?.success!==true||!Array.isArray(value.results)||value.results.length>1)fail();
  if(value.results.length===0)return null;
  const row=fields(value.results[0],[...subscriptionFields,...processFields,...eventFields]);
  const validAt=value=>time(value)&&value>=p.T0&&value<=at;
  if(!identifier(row.subscription_id)||!identifier(row.process_generation)||!validAt(row.observed_at)||!validAt(row.recorded_at)||
     row.observed_at>row.recorded_at||!time(row.expires_at)||row.expires_at<=at||row.expires_at>end)fail();
  return row;
 }
 const project=(kind,body)=>Object.freeze({purpose:'afw.qa-finite-'+kind+'.v1',...common,observedAt:current(),...body});
 const subscription=row=>({
  subscriptionId:row.subscription_id,processGeneration:row.process_generation,expiresAt:row.expires_at,
  receiptHash:hash(Object.fromEntries(subscriptionFields.map(key=>[key,row[key]]))),
 });
 function process(row){
  const {processCreatedAt,processExpiresAt,launchTrial,launchContainer,launchGeneration,launchManifest,claimedAt,reservedAt}=row;
  if(launchTrial===null)return null;
  if(launchTrial!==p.trialId||launchContainer!==p.resources.containerId||launchGeneration!==row.process_generation||
     !hex(launchManifest)||row.reservationManifest!==launchManifest||row.reservationContainer!==p.resources.containerId||
     row.reservationProgram!==s.programHash||row.reservationSource!==s.sourceRevision||row.reservationApplication!==p.resources.applicationId||
     row.reservationStart!==s.startAt||!time(row.reservationExpiry)||row.reservationExpiry<row.expires_at||row.reservationExpiry>end||
     row.reservationBudget!==1||row.reservationState!=='prepared'||!time(processCreatedAt)||!time(processExpiresAt)||
     processExpiresAt<row.expires_at||processExpiresAt>end||!time(reservedAt)||!time(claimedAt)||
     reservedAt<p.T0||reservedAt>processCreatedAt||processCreatedAt>claimedAt||claimedAt>row.observed_at)fail();
  return {processGeneration:launchGeneration,manifestHash:launchManifest,
   receiptHash:hash(Object.fromEntries(processFields.map(key=>[key,row[key]])))};
 }
 function savedEvent(row){
  if(!row||row.savedId===null)return null;
  const processEvidence=process(row);
  const at=Date.parse(row.savedAt);
  if(!processEvidence||row.savedId!==eventId||row.savedType!=='project_updated'||row.savedPayload!==payload||
     row.projectRevision!==revision||!time(at)||new Date(at).toISOString()!==row.savedAt||at<row.recorded_at||at>current())fail();
  return {eventId,revision,fingerprint,subscriptionReceiptHash:subscription(row).receiptHash,
   processReceiptHash:processEvidence.receiptHash,receiptHash:hash({eventId,revision,fingerprint,createdAt:row.savedAt})};
 }
 return Object.freeze({
  async subscription(){const row=await read();return row&&project('subscription',subscription(row));},
  async process(){const row=await read(),evidence=row&&process(row);return evidence&&project('process',evidence);},
  async savedEvent(){const event=savedEvent(await read());return event&&project('saved_event',event);},
  async saveTarget(){
   const row=await read();
   if(!row||row.savedId!==null||row.projectRevision!==s.expectedProjectRevision)return null;
   const processEvidence=process(row);
   if(!processEvidence)return null;
   const target=Object.freeze({eventId,revision,fingerprint,subscriptionReceiptHash:subscription(row).receiptHash,
    processReceiptHash:processEvidence.receiptHash});
   return Object.freeze({target,expiresAt:row.expires_at});
  },
  async notice(){
   const row=await read(),event=savedEvent(row);
   if(!event)return null;
   const {receiptHash,...notice}=event;
   return Object.freeze({notice:Object.freeze(notice),expiresAt:row.expires_at});
  },
 });
}

/** Hash the pinned row facts so they can be compared across observation times. */
export function hashFinitePrimarySnapshot(snapshot){
 const {observedAt,...facts}=snapshot;
 return hash(facts);
}

/** Read the original admitted process from QA's primary after owner cleanup. */
export async function readPrivateQaFiniteFinalPrimary({ctx,env,control,retainedPrimary,check}={}){
 const c=finiteControlIdentity(control),p=c.plan,db=env.RELEASE_DB,raw=JSON.stringify(p);
 const pin=createPrivateQaFiniteTrialNativePin({ctx,env,sourceRevision:p.source.revision});
 if(typeof check!=='function'||db===env.DB)fail();
 const current=()=>{
  const at=check(),identity=readPrivateQaFiniteControlIdentity({nativePin:pin,raw});
  if(!time(at)||env.RELEASE_DB!==db||identity.controlHash!==c.controlHash||identity.planHash!==c.planHash)fail();
  return at;
 };
 const retained=validateFiniteRecoverySnapshot(retainedPrimary,c,retainedPrimary?.observedAt);
 if(['reservationHash','admissionHash','launchHash','closureHash','processGeneration'].some(key=>!hex(retained[key])))fail();
 const primaryHash=hashFinitePrimarySnapshot(retained);
 const primary=createFiniteNativePrimaryReader({db,control:c,now:current});
 for(let observation=0;observation<2;observation++){
  const snapshot=validateFiniteRecoverySnapshot(await primary.read(),c,current());
  if(snapshot.observedAt<retained.observedAt||hashFinitePrimarySnapshot(snapshot)!==primaryHash)fail();
 }
 return Object.freeze({primaryHash,observedAt:current()});
}
