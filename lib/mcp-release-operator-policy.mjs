import {createHash} from 'node:crypto';
import {activationConfigurationHash} from './mcp-activation-observer.mjs';
export const RELEASE_TARGET=Object.freeze({accountId:'85d0d5dadac3341a564f22ce885e9eec',workerName:'agent-friendly-web-delegated-canary',namespaceId:'d6fc71552de7494a863aca20365a572d',databaseId:'6a728254-1494-4039-802e-b39288a55fcc',kvId:'6b94ff702e504e14a7730cee73a0f6ff'});
const fail=()=>{throw Error('Release operator plan unavailable');};
const exact=(v,keys)=>{if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length||keys.some(k=>{const d=Object.getOwnPropertyDescriptor(v,k);return !d?.enumerable||!Object.hasOwn(d,'value');}))fail();};
const hex=(v,n)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(v);
export function validateReleaseOperatorBundle(bundle){
 exact(bundle,['artifact','policy']);const a=bundle.artifact,p=bundle.policy;
 exact(a,['script','sourceRevision','sourceTree','programHash','workerHash','sourceCheck']);
 if(typeof a.script!=='string'||!a.script.length||Buffer.byteLength(a.script)>2097152||!hex(a.sourceRevision,40)||!hex(a.sourceTree,40)||!hex(a.programHash,64)||!hex(a.workerHash,64)||a.sourceCheck!=='git-inputs-before-after-v1'||createHash('sha256').update(a.script).digest('hex')!==a.workerHash)fail();
 const operation=p&&Object.getOwnPropertyDescriptor(p,'operation');if(!operation||!Object.hasOwn(operation,'value')||!['publish','confirm'].includes(operation.value))fail();exact(p,operation.value==='publish'?['operation','startAt','expiresAt','pins']:['operation','startAt','expiresAt','plan','observation']);
 if(!Number.isSafeInteger(p.startAt)||p.startAt<0||!Number.isSafeInteger(p.expiresAt)||p.expiresAt<=p.startAt||p.expiresAt-p.startAt>600000)fail();
 if(p.operation==='publish'){
  exact(p.pins,[...Object.keys(RELEASE_TARGET),'baseVersionId']);if(Object.entries(RELEASE_TARGET).some(([k,v])=>p.pins[k]!==v)||!uuid(p.pins.baseVersionId))fail();
 }else{
  const q=p.plan,o=p.observation;exact(q,['activationKey','artifactKey','trialId','scopeHash','configurationHash','startAt','expiresAt']);
  if(['activationKey','artifactKey','trialId','scopeHash','configurationHash'].some(k=>!hex(q[k],64))||q.startAt!==p.startAt||q.expiresAt!==p.expiresAt)fail();
  exact(o,['versionId','deploymentId','namespaceId','applicationId','configuration']);if(!uuid(o.versionId)||!uuid(o.deploymentId)||o.namespaceId!==RELEASE_TARGET.namespaceId||o.applicationId!==RELEASE_TARGET.namespaceId||activationConfigurationHash(o.configuration)!==q.configurationHash)fail();
  const db=o.configuration.bindings.find(b=>b.name==='DB'),node=o.configuration.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_NODE'),kv=o.configuration.bindings.find(b=>b.name==='OAUTH_KV');
  if(db?.type!=='d1'||db.id!==RELEASE_TARGET.databaseId||node?.type!=='durable_object_namespace'||node.namespace_id!==RELEASE_TARGET.namespaceId||kv?.type!=='kv_namespace'||kv.namespace_id!==RELEASE_TARGET.kvId)fail();
  if(q.artifactKey!==createHash('sha256').update(JSON.stringify([RELEASE_TARGET.accountId,RELEASE_TARGET.workerName,a.workerHash])).digest('hex'))fail();
 }
 return true;
}
