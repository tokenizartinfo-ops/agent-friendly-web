import {createHash} from 'node:crypto';
import {activationConfigurationHash} from './mcp-activation-observer.mjs';
import {resolveSuccessorPreparation} from './mcp-successor-manifest.mjs';
import {prepareKnownCancellationHistory} from './mcp-successor-cancellation-history.mjs';
export const RELEASE_TARGET=Object.freeze({accountId:'85d0d5dadac3341a564f22ce885e9eec',workerName:'agent-friendly-web-delegated-canary',namespaceId:'d6fc71552de7494a863aca20365a572d',databaseId:'6a728254-1494-4039-802e-b39288a55fcc',kvId:'6b94ff702e504e14a7730cee73a0f6ff'});
const fail=()=>{throw Error('Release operator plan unavailable');};
const exact=(v,keys)=>{if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length||keys.some(k=>{const d=Object.getOwnPropertyDescriptor(v,k);return !d?.enumerable||!Object.hasOwn(d,'value');}))fail();};
const hex=(v,n)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(v);
export function validateReleaseOperatorBundle(bundle){
 exact(bundle,['artifact','policy']);const a=bundle.artifact,p=bundle.policy;
 exact(a,['script','sourceRevision','sourceTree','programHash','workerHash','sourceCheck']);
 if(typeof a.script!=='string'||!a.script.length||Buffer.byteLength(a.script)>2097152||!hex(a.sourceRevision,40)||!hex(a.sourceTree,40)||!hex(a.programHash,64)||!hex(a.workerHash,64)||a.sourceCheck!=='git-inputs-before-after-v1'||createHash('sha256').update(a.script).digest('hex')!==a.workerHash)fail();
 const operation=p&&Object.getOwnPropertyDescriptor(p,'operation');if(!operation||!Object.hasOwn(operation,'value')||!['publish','confirm','confirm_named'].includes(operation.value))fail();exact(p,operation.value==='publish'?['operation','startAt','expiresAt','pins']:['operation','startAt','expiresAt','plan','observation']);
 if(!Number.isSafeInteger(p.startAt)||p.startAt<0||!Number.isSafeInteger(p.expiresAt)||p.expiresAt<=p.startAt||p.expiresAt-p.startAt>600000)fail();
 if(p.operation==='publish'){
  exact(p.pins,[...Object.keys(RELEASE_TARGET),'baseVersionId']);if(Object.entries(RELEASE_TARGET).some(([k,v])=>p.pins[k]!==v)||!uuid(p.pins.baseVersionId))fail();
 }else{
  const q=p.plan,o=p.observation,hashes=['activationKey','artifactKey','trialId',...(p.operation==='confirm'?['scopeHash']:[]),'configurationHash'];exact(q,[...hashes,'startAt','expiresAt']);
  if(hashes.some(k=>!hex(q[k],64))||q.startAt!==p.startAt||q.expiresAt!==p.expiresAt)fail();
  exact(o,['versionId','deploymentId','namespaceId','applicationId','configuration']);if(!uuid(o.versionId)||!uuid(o.deploymentId)||o.namespaceId!==RELEASE_TARGET.namespaceId||o.applicationId!==RELEASE_TARGET.namespaceId||activationConfigurationHash(o.configuration)!==q.configurationHash)fail();
  const db=o.configuration.bindings.find(b=>b.name==='DB'),node=o.configuration.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_NODE'),kv=o.configuration.bindings.find(b=>b.name==='OAUTH_KV');
  if(db?.type!=='d1'||db.id!==RELEASE_TARGET.databaseId||node?.type!=='durable_object_namespace'||node.namespace_id!==RELEASE_TARGET.namespaceId||kv?.type!=='kv_namespace'||kv.namespace_id!==RELEASE_TARGET.kvId)fail();
  if(q.artifactKey!==createHash('sha256').update(JSON.stringify([RELEASE_TARGET.accountId,RELEASE_TARGET.workerName,a.workerHash])).digest('hex'))fail();
  if(p.operation==='confirm_named')readNamedManifest(bundle);
 }
 return true;
}

function readNamedManifest({artifact:a,policy:p}){
 const bindings=p.observation.configuration.bindings,text=name=>{const b=bindings.find(b=>b.name===name);if(b?.type!=='plain_text'||typeof b.text!=='string')fail();return b.text;};
 if(text('AFW_DOSSIER_EVENTS_NODE_NAME')!=='afw-own-event-first-successor-v1'||text('AFW_DOSSIER_SUCCESSOR_ENABLED')!=='true'||text('AFW_DOSSIER_EVENTS_ENABLED')!=='true')fail();
 const raw=text('AFW_DOSSIER_SUCCESSOR_POLICY');if(raw.length>8192)fail();
 const m=JSON.parse(raw);exact(m,['scope','original','candidate','publication']);
 const s=m.scope,o=m.original,c=m.candidate,r=m.publication,q=p.plan;
 const eventRaw=text('AFW_DOSSIER_EVENTS_POLICY');if(eventRaw.length>4096)fail();const events=JSON.parse(eventRaw);
 exact(events,['grantId','subject','projectId','clientId','resource','startAt','expiresAt']);
 if(['grantId','subject','projectId','clientId','resource'].some(k=>typeof events[k]!=='string'||!events[k].length||events[k].length>200||events[k].trim()!==events[k])||events.startAt!==q.startAt||events.expiresAt!==q.expiresAt||events.resource!==s.resource||events.resource!==text('AFW_OAUTH_RESOURCE')||events.resource!==text('AFW_OAUTH_ISSUER')+'/mcp'||events.clientId!==text('AFW_OAUTH_PILOT_CLIENT_ID')||events.projectId!==text('AFW_OAUTH_PILOT_PROJECT_ID'))fail();
 exact(s,['accountId','workerName','namespaceId','applicationId','ownerRef','projectRef','resource']);exact(o,['containerId','applicationId','programHash','sourceRevision']);exact(c,['trialId','programHash','sourceRevision','startAt','expiresAt','budget']);exact(r,['artifactKey','workerHash','activationKey']);
 if(s.accountId!==RELEASE_TARGET.accountId||s.workerName!==RELEASE_TARGET.workerName||s.namespaceId!==RELEASE_TARGET.namespaceId||s.applicationId!==RELEASE_TARGET.namespaceId||s.resource!=='https://delegated-canary.agentfriendlyweb.dev/mcp'||!hex(s.ownerRef,64)||!hex(s.projectRef,64)||o.applicationId!==s.applicationId||!hex(o.containerId,64)||!hex(o.programHash,64)||!hex(o.sourceRevision,40)||c.trialId!==q.trialId||c.programHash!==a.programHash||c.sourceRevision!==a.sourceRevision||c.startAt!==q.startAt||c.expiresAt!==q.expiresAt||c.budget!==1||r.artifactKey!==q.artifactKey||r.workerHash!==a.workerHash||r.activationKey!==q.activationKey)fail();
 return m;
}

/** Private operator only: same remote binding, pure identity resolution.
 * Never calls get, starts an actor or changes the caller's approved bundle. */
export function resolveNamedActivationPlan(bundle,namespace){
 validateReleaseOperatorBundle(bundle);if(bundle.policy.operation!=='confirm_named')fail();
 const m=readNamedManifest(bundle),idFromName=namespace?.idFromName,idFromString=namespace?.idFromString;
 if(typeof idFromName!=='function'||typeof idFromString!=='function')fail();
 const resolved=resolveSuccessorPreparation({scope:m.scope,original:m.original,candidate:m.candidate,namespace});
 const current=()=>{if(namespace.idFromName!==idFromName||namespace.idFromString!==idFromString||namespace.idFromName('afw-own-event-one-occurrence-v1').toString()!==m.original.containerId||namespace.idFromName('afw-own-event-first-successor-v1').toString()!==resolved.candidate.containerId||namespace.idFromString(resolved.candidate.containerId).toString()!==resolved.candidate.containerId)fail();};current();
 return Object.freeze({plan:Object.freeze({...bundle.policy.plan,scopeHash:resolved.candidate.scopeHash}),current});
}

/** Private server input only. A same-scope grant is not interchangeable with
 * the exact grant captured by the named bundle. Does not read D1 or authorize. */
export function validateNamedCancellationHistory(bundle,raw){
 validateReleaseOperatorBundle(bundle);if(bundle.policy.operation!=='confirm_named')fail();
 prepareKnownCancellationHistory(raw,bundle.policy.plan);
 const binding=bundle.policy.observation.configuration.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_POLICY');
 if(JSON.parse(raw).currentGrant.grantId!==JSON.parse(binding.text).grantId)fail();
 return true;
}
