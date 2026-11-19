import {createHash} from 'node:crypto';
import {projectDossierEventId} from './dossier-supervision.mjs';
import {readDossierEventHostPolicy} from './dossier-event-rpc-authority.mjs';
import {resolveSuccessorPreparation} from './mcp-successor-manifest.mjs';
import {signMcpVerification} from './mcp-signed-envelope.mjs';
import {finiteControlIdentity,finiteFields as fields,finiteHash as hash,finiteTime as time} from './mcp-finite-evidence.mjs';

const fail=()=>{throw Error('Finite candidate launch observation unavailable');};
const prefixes=['afw.own-finite-admission.v1:','afw.node-process-custody.v1:','afw-mcp-subscription/v1:'];

/** Read only: prove that the finite actor is distinct and pristine and sign
 * the fixed receiver challenge. This does not start custody or a subscription. */
export async function observeFiniteOwnPrelaunch({ctx,env,program,sourceRevision,refs,now=Date.now}){
 const {control,challenge}=fields(refs,['control','challenge']),c=finiteControlIdentity(control),p=c.plan,s=p.selectors;
 const metadata=env.AFW_FINITE_TRIAL_VERSION,namespace=env.AFW_DOSSIER_EVENTS_NODE,qa=env.AFW_FINITE_TRIAL_CONTROL;
 const storage=ctx.storage,container=ctx.container,nodeId=ctx.id.toString(),secret=env.AFW_DOSSIER_FINITE_CALLBACK_SECRET;
 const reader=env.AFW_DOSSIER_PROVIDER_READ_TOKEN;
 const entered=now(),mono=performance.now();
 let last=entered;
 const at=()=>{
  const t=now();
  if(!time(t)||t<last||t<p.T0||t>=Math.min(entered+4800,p.launchPolicy.lastCreateAt,s.expiresAt)||
     performance.now()-mono>=4800||ctx.storage!==storage||ctx.container!==container||container?.running!==false||
     ctx.id.toString()!==nodeId||env.AFW_FINITE_TRIAL_VERSION!==metadata||metadata?.id!==p.deployments.canaryLive.versionId||
     env.AFW_DOSSIER_EVENTS_NODE!==namespace||env.AFW_FINITE_TRIAL_CONTROL!==qa||
     env.AFW_DOSSIER_FINITE_CALLBACK_SECRET!==secret||env.AFW_DOSSIER_PROVIDER_READ_TOKEN!==reader)fail();
  last=t;return t;
 };
 at();
 if(typeof reader!=='string'||!/^[-A-Za-z0-9_]{16,4096}$/.test(reader)||
    typeof challenge!=='string'||!/^[A-Za-z0-9_-]{43}$/.test(challenge)||
    nodeId!==p.resources.containerId||namespace.idFromName('afw-own-event-first-successor-v1').toString()!==nodeId||
    qa.idFromName('afw-own-successor-closure-v1').toString()!==p.resources.actorId||
    sourceRevision!==p.canaryContainment.sourceRevision||sourceRevision!==s.sourceRevision||
    createHash('sha256').update(program).digest('hex')!==s.programHash||s.projectId!=='oauth-canary-owner'||
    env.AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED!=='false'||env.AFW_DOSSIER_OWN_SAVE_ENABLED!=='false')fail();
 const native=readDossierEventHostPolicy({enabled:true,env,now:at}),n=native.policy;
 const eventPlanHash=createHash('sha256').update(native.pins.AFW_DOSSIER_EVENTS_POLICY).digest('hex');
 if(eventPlanHash!==p.eventPlanHash||n.containerId!==nodeId||
    ['grantId','subject','projectId','clientId','resource','startAt','expiresAt'].some(k=>n[k]!==s[k]))fail();
 const cfg=fields(JSON.parse(native.pins.AFW_DOSSIER_SUCCESSOR_POLICY),['scope','original','candidate','publication']);
 const {manifest,original,candidate}=resolveSuccessorPreparation({scope:cfg.scope,original:cfg.original,candidate:cfg.candidate,namespace});
 if(original.containerId===nodeId||candidate.containerId!==nodeId||candidate.trialId!==p.trialId||
    candidate.sourceRevision!==sourceRevision||candidate.programHash!==s.programHash||
    manifest.scope.namespaceId!==p.resources.namespaceId||manifest.scope.applicationId!==p.resources.applicationId)fail();
 const inspect=async()=>{
  const rows=await Promise.all(prefixes.map(prefix=>storage.list({prefix,limit:1})));
  native.current();at();
  if(rows.some(rows=>!(rows instanceof Map)||rows.size!==0))fail();
 };
 await inspect();
 const raw=hash(['afw.own-synthetic-save.v1',s.subject,s.projectId,s.saveIdempotencyKey]);
 const eventId=await projectDossierEventId({id:raw,projectId:s.projectId},native.pins.AFW_DOSSIER_EVENTS_PROJECTION_SECRET);
 await inspect();
 const tagged=hash(['afw.finite-prelaunch-channel.v1',c.controlHash,challenge]);
 const observedAt=at();
 const envelope=signMcpVerification(challenge,'verify_'+tagged,'sub_'+tagged,secret,observedAt);
 return {isolation:{observedAt,containerId:nodeId,sourceRevision,runtimeVersionId:metadata.id,eventPlanHash,pristine:true},
  signed:{challenge,projectRef:manifest.scope.projectRef,eventId,controlHash:c.controlHash,revision:s.expectedProjectRevision+1,envelope}};
}
